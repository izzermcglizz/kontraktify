// Supabase Edge Function to send email
// Deploy this to Supabase: supabase functions deploy send-email

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || ''

serve(async (req) => {
  try {
    const { to, subject, signerLinks, trackLink, historyLink } = await req.json()

    if (!to || !subject) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Build email HTML
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0f0f10; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 24px; background: #0f0f10; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
          .link-box { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #0f0f10; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Kontraktify E-Signature</h1>
          </div>
          <div class="content">
            <h2>Dokumen Anda Siap!</h2>
            <p>Halo,</p>
            <p>Dokumen E-Signature Anda sudah siap. Berikut adalah link-link yang Anda perlukan:</p>
    `

    if (signerLinks && signerLinks.length > 0) {
      htmlContent += `
        <h3>📝 Link untuk Signer (Bagikan ke penandatangan):</h3>
      `
      signerLinks.forEach((link, index) => {
        htmlContent += `
          <div class="link-box">
            <strong>${link.name}</strong><br>
            <a href="${link.url}" class="button">Buka Link Signing</a>
          </div>
        `
      })
    }

    if (trackLink) {
      htmlContent += `
        <h3>🔍 Link Tracking:</h3>
        <div class="link-box">
          <p>Gunakan link ini untuk melacak progress penandatanganan:</p>
          <a href="${trackLink}" class="button">Lacak Progress</a>
        </div>
      `
    }

    if (historyLink) {
      htmlContent += `
        <h3>📋 Link History:</h3>
        <div class="link-box">
          <p>Lihat riwayat dokumen Anda:</p>
          <a href="${historyLink}" class="button">Lihat History</a>
        </div>
      `
    }

    htmlContent += `
            <p>Terima kasih,<br>Kontraktify</p>
          </div>
          <div class="footer">
            <p>Email ini dikirim otomatis dari Kontraktify E-Signature</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email using Resend API
    if (RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Kontraktify <noreply@kontraktify.com>', // Update with your verified domain
          to: [to],
          subject: subject,
          html: htmlContent,
        }),
      })

      if (!resendResponse.ok) {
        const error = await resendResponse.text()
        console.error('Resend API error:', error)
        throw new Error('Failed to send email via Resend')
      }

      const result = await resendResponse.json()
      return new Response(
        JSON.stringify({ success: true, messageId: result.id }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      // Fallback: Log email (for development)
      console.log('Email would be sent to:', to)
      console.log('Subject:', subject)
      console.log('Content:', htmlContent)
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email logged (RESEND_API_KEY not configured)',
          email: { to, subject }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

