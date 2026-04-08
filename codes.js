// Netlify serverless function — manages codes in Supabase database
// All codes are stored in the cloud — work on ANY device anywhere

import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) throw new Error('Supabase not configured')
  return createClient(url, key)
}

export default async (req, context) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }

  if (req.method === 'OPTIONS') return new Response('', { status: 200, headers })
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })

  try {
    const body = await req.json()
    const { action } = body
    const supabase = getSupabase()

    // ── SAVE a new code (after payment or admin generation) ──
    if (action === 'save') {
      const { code, planId, phone, note, source, expiresAt, maxUses, maxDevices } = body
      const { error } = await supabase.from('codes').insert({
        code: code.toUpperCase(),
        plan_id: planId,
        phone: phone || '',
        note: note || '',
        source: source || 'campay',
        expires_at: new Date(expiresAt).toISOString(),
        max_uses: maxUses,
        max_devices: maxDevices || 3,
        used_count: 0,
        device_ids: [],
        created_at: new Date().toISOString(),
      })
      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers })
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
    }

    // ── VALIDATE a code (check if it can be used on this device) ──
    if (action === 'validate') {
      const { code, deviceId } = body
      const { data, error } = await supabase.from('codes').select('*').eq('code', code.toUpperCase()).single()
      if (error || !data) return new Response(JSON.stringify({ valid: false, reason: 'Code not found. Check and try again.' }), { status: 200, headers })

      const now = new Date()
      const expires = new Date(data.expires_at)
      if (now > expires) return new Response(JSON.stringify({ valid: false, reason: 'This code has expired.' }), { status: 200, headers })

      const deviceIds = data.device_ids || []
      const isKnownDevice = deviceIds.includes(deviceId)
      const maxDev = data.max_devices || 3

      // If new device, check device limit (school = unlimited = 9999)
      if (!isKnownDevice && deviceIds.length >= maxDev) {
        return new Response(JSON.stringify({ valid: false, reason: `This code is already active on ${maxDev} device(s). Max devices reached.` }), { status: 200, headers })
      }

      // Register device if new
      if (!isKnownDevice) {
        const newDevices = [...deviceIds, deviceId]
        await supabase.from('codes').update({ device_ids: newDevices, used_count: data.used_count + 1 }).eq('code', code.toUpperCase())
      }

      return new Response(JSON.stringify({
        valid: true,
        entry: {
          planId: data.plan_id,
          phone: data.phone,
          note: data.note,
          source: data.source,
          expiresAt: new Date(data.expires_at).getTime(),
          maxUses: data.max_uses,
          usedCount: data.used_count,
          maxDevices: data.max_devices,
          deviceCount: deviceIds.length,
        }
      }), { status: 200, headers })
    }

    // ── GET ALL CODES (admin panel) ──
    if (action === 'getAll') {
      const { data, error } = await supabase.from('codes').select('*').order('created_at', { ascending: false })
      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers })
      return new Response(JSON.stringify({ codes: data }), { status: 200, headers })
    }

    // ── REVOKE a code (admin) ──
    if (action === 'revoke') {
      const { code } = body
      const { error } = await supabase.from('codes').update({ expires_at: new Date(0).toISOString() }).eq('code', code.toUpperCase())
      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers })
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400, headers })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers })
  }
}

export const config = { path: '/api/codes' }
