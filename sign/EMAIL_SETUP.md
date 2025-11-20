# Email Setup Guide

Untuk mengirim email otomatis, Anda perlu setup Supabase Edge Function dengan Resend API.

## Option 1: Menggunakan Resend (Recommended)

1. **Daftar di Resend**: https://resend.com
2. **Dapatkan API Key** dari dashboard Resend
3. **Setup Supabase Edge Function**:
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login ke Supabase
   supabase login
   
   # Link ke project
   supabase link --project-ref YOUR_PROJECT_REF
   
   # Set environment variable
   supabase secrets set RESEND_API_KEY=your_resend_api_key_here
   
   # Deploy function
   supabase functions deploy send-email
   ```

4. **Verify domain di Resend** (untuk production)

## Option 2: Menggunakan SendGrid

1. Daftar di SendGrid
2. Dapatkan API Key
3. Update `sign/supabase/functions/send-email/index.ts` untuk menggunakan SendGrid API
4. Set `SENDGRID_API_KEY` sebagai secret

## Option 3: Menggunakan SMTP (via Nodemailer)

1. Setup SMTP credentials
2. Update Edge Function untuk menggunakan Nodemailer
3. Set SMTP credentials sebagai secrets

## Testing

Setelah deploy, test dengan:
```javascript
// Di browser console atau test script
const response = await supabase.functions.invoke('send-email', {
  body: {
    to: 'test@example.com',
    subject: 'Test Email',
    signerLinks: [{ name: 'Test', url: 'https://example.com' }],
    trackLink: 'https://example.com/track',
    historyLink: 'https://example.com/history'
  }
})
```

## Fallback

Jika Edge Function tidak tersedia, sistem akan menggunakan `mailto:` link sebagai fallback.

