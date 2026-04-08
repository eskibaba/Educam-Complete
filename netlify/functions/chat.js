// EduCam — Secure AI Chat Function
// Proxies requests to Anthropic — your API key never reaches the browser

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
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in environment variables.' }) }
  }

  try {
    const { messages, system } = JSON.parse(event.body)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: system,
        messages: messages,
      }),
    })

    const data = await response.json()

    if (data.error) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: data.error.message }) }
    }

    const reply = data.content
      ? data.content.map(function (b) { return b.text || '' }).join('')
      : 'Sorry, please try again.'

    return { statusCode: 200, headers, body: JSON.stringify({ reply: reply }) }
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error: ' + err.message }) }
  }
}
