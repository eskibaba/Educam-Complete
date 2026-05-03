// EduCam — AI Chat Serverless Function
// Uses Node.js built-in https — no external packages needed

const https = require('https')

function anthropicRequest(apiKey, messages, system) {
  return new Promise(function (resolve, reject) {
    const body = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: system,
      messages: messages,
    })

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body),
      },
    }

    const req = https.request(options, function (res) {
      let data = ''
      res.on('data', function (chunk) { data += chunk })
      res.on('end', function () {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) })
        } catch (e) {
          reject(new Error('Failed to parse Anthropic response: ' + data))
        }
      })
    })

    req.on('error', function (err) {
      reject(new Error('HTTPS request failed: ' + err.message))
    })

    req.setTimeout(25000, function () {
      req.destroy()
      reject(new Error('Request timed out after 25 seconds'))
    })

    req.write(body)
    req.end()
  })
}

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

  if (!ANTHROPIC_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'ANTHROPIC_API_KEY is not set. Please add it in Netlify environment variables.' })
    }
  }

  let messages, system

  try {
    const parsed = JSON.parse(event.body)
    messages = parsed.messages
    system = parsed.system
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request body.' }) }
  }

  if (!messages || !system) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing messages or system in request.' }) }
  }

  try {
    const result = await anthropicRequest(ANTHROPIC_API_KEY, messages, system)

    if (result.data.error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Anthropic error: ' + result.data.error.message })
      }
    }

    const reply = result.data.content
      ? result.data.content.map(function (b) { return b.text || '' }).join('')
      : 'Sorry, I could not generate a response. Please try again.'

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: reply })
    }

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Chat function error: ' + err.message })
    }
  }
}
