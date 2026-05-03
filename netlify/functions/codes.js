// EduCam — Code Management Function
// Saves and validates codes in Supabase cloud database

const https = require('https')

// Simple Supabase REST API helper (no SDK needed — avoids import issues)
function supabaseRequest(method, path, body, supabaseUrl, serviceKey) {
  return new Promise(function (resolve, reject) {
    const url = new URL(supabaseUrl + '/rest/v1/' + path)
    const bodyStr = body ? JSON.stringify(body) : null

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal',
      },
    }

    if (bodyStr) {
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr)
    }

    const req = https.request(options, function (res) {
      let data = ''
      res.on('data', function (chunk) { data += chunk })
      res.on('end', function () {
        try {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null })
        } catch (e) {
          resolve({ status: res.statusCode, data: data })
        }
      })
    })

    req.on('error', reject)
    if (bodyStr) req.write(bodyStr)
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

  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Supabase environment variables not set. Add SUPABASE_URL and SUPABASE_SERVICE_KEY in Netlify.' })
    }
  }

  try {
    const body = JSON.parse(event.body)
    const action = body.action

    // ── SAVE a new code ───────────────────────────────────
    if (action === 'save') {
      const result = await supabaseRequest(
        'POST',
        'codes',
        {
          code: body.code.toUpperCase(),
          plan_id: body.planId,
          phone: body.phone || '',
          note: body.note || '',
          source: body.source || 'campay',
          expires_at: new Date(body.expiresAt).toISOString(),
          max_uses: body.maxUses || 999999,
          max_devices: body.maxDevices || 3,
          used_count: 0,
          device_ids: [],
        },
        SUPABASE_URL,
        SUPABASE_SERVICE_KEY
      )

      if (result.status >= 400) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to save code: ' + JSON.stringify(result.data) }) }
      }

      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) }
    }

    // ── VALIDATE a code ───────────────────────────────────
    if (action === 'validate') {
      const code = body.code.toUpperCase().trim()
      const deviceId = body.deviceId

      const result = await supabaseRequest(
        'GET',
        'codes?code=eq.' + encodeURIComponent(code) + '&limit=1',
        null,
        SUPABASE_URL,
        SUPABASE_SERVICE_KEY
      )

      if (result.status >= 400 || !result.data || result.data.length === 0) {
        return { statusCode: 200, headers, body: JSON.stringify({ valid: false, reason: 'Code not found. Check your code and try again.' }) }
      }

      const entry = result.data[0]
      const now = new Date()
      const expires = new Date(entry.expires_at)

      if (now > expires) {
        return { statusCode: 200, headers, body: JSON.stringify({ valid: false, reason: 'This code has expired.' }) }
      }

      const deviceIds = entry.device_ids || []
      const isKnownDevice = deviceIds.includes(deviceId)
      const maxDev = entry.max_devices || 3

      // If new device, check device limit
      if (!isKnownDevice && deviceIds.length >= maxDev) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ valid: false, reason: 'This code is already active on the maximum number of devices (' + maxDev + ').' })
        }
      }

      // Register device if new
      if (!isKnownDevice) {
        const newDevices = deviceIds.concat([deviceId])
        await supabaseRequest(
          'PATCH',
          'codes?code=eq.' + encodeURIComponent(code),
          { device_ids: newDevices, used_count: entry.used_count + 1 },
          SUPABASE_URL,
          SUPABASE_SERVICE_KEY
        )
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          valid: true,
          entry: {
            planId: entry.plan_id,
            phone: entry.phone,
            note: entry.note,
            source: entry.source,
            expiresAt: new Date(entry.expires_at).getTime(),
            maxUses: entry.max_uses,
            usedCount: entry.used_count,
            maxDevices: entry.max_devices,
            deviceCount: deviceIds.length,
          }
        })
      }
    }

    // ── GET ALL CODES (admin) ─────────────────────────────
    if (action === 'getAll') {
      const result = await supabaseRequest(
        'GET',
        'codes?order=created_at.desc',
        null,
        SUPABASE_URL,
        SUPABASE_SERVICE_KEY
      )

      if (result.status >= 400) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to fetch codes.' }) }
      }

      return { statusCode: 200, headers, body: JSON.stringify({ codes: result.data || [] }) }
    }

    // ── REVOKE a code (admin) ─────────────────────────────
    if (action === 'revoke') {
      const code = body.code.toUpperCase().trim()
      await supabaseRequest(
        'PATCH',
        'codes?code=eq.' + encodeURIComponent(code),
        { expires_at: new Date(0).toISOString() },
        SUPABASE_URL,
        SUPABASE_SERVICE_KEY
      )
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) }
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Unknown action: ' + action }) }

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Function error: ' + err.message }) }
  }
}
