# Kontraktify Sign - Setup Instructions

## Step 1: Supabase Setup (15 minutes)

### 1.1 Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up (free tier is perfect!)

### 1.2 Create New Project
1. Click "New Project"
2. Name: `kontraktify-sign`
3. Database Password: (choose a strong password and save it)
4. Region: Choose closest to your users
5. Click "Create new project"
6. Wait ~2 minutes for setup

### 1.3 Get API Credentials
1. In your project dashboard, click "Settings" (gear icon on left sidebar)
2. Click "API" in settings menu
3. Copy these two values:
   - **Project URL** (starts with https://...)
   - **anon public** key (under "Project API keys")

### 1.4 Update config.js
Open `/sign/js/config.js` and replace:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

With your actual values:
```javascript
const SUPABASE_URL = 'https://yourproject.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 1.5 Create Database Tables
1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "New Query"
3. Copy and paste this entire SQL script:

```sql
-- Envelopes (signing sessions)
CREATE TABLE envelopes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  creator_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  track_token VARCHAR(100) UNIQUE NOT NULL,
  pdf_url TEXT NOT NULL,
  final_pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- Recipients (signers)
CREATE TABLE recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  envelope_id UUID REFERENCES envelopes(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  order_num INTEGER NOT NULL,
  magic_token VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  signature_data TEXT,
  signed_at TIMESTAMPTZ
);

-- Fields (signature/date boxes)
CREATE TABLE signature_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  envelope_id UUID REFERENCES envelopes(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES recipients(id) ON DELETE CASCADE,
  field_type VARCHAR(50) NOT NULL,
  page_num INTEGER NOT NULL,
  x FLOAT NOT NULL,
  y FLOAT NOT NULL,
  width FLOAT NOT NULL,
  height FLOAT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE envelopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE signature_fields ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can read envelopes" ON envelopes FOR SELECT USING (true);
CREATE POLICY "Anyone can update envelopes" ON envelopes FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert envelopes" ON envelopes FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read recipients" ON recipients FOR SELECT USING (true);
CREATE POLICY "Anyone can update recipients" ON recipients FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert recipients" ON recipients FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read fields" ON signature_fields FOR SELECT USING (true);
CREATE POLICY "Anyone can insert fields" ON signature_fields FOR INSERT WITH CHECK (true);
```

4. Click "Run" button (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned" - that's good!

### 1.6 Create Storage Bucket
1. In Supabase dashboard, click "Storage" (left sidebar)
2. Click "New bucket"
3. Name: `documents`
4. **Important:** Toggle "Public bucket" to ON
5. Click "Create bucket"

## Step 2: Download Required Libraries

### 2.1 Supabase JS Client
1. Go to https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js
2. Right-click → "Save As"
3. Save to `/sign/lib/supabase.js`

### 2.2 PDF.js
1. Go to https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js
2. Right-click → "Save As"
3. Save to `/sign/lib/pdf.min.js`

4. Go to https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js
5. Right-click → "Save As"
6. Save to `/sign/lib/pdf.worker.min.js`

### 2.3 PDF-lib
1. Go to https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js
2. Right-click → "Save As"
3. Save to `/sign/lib/pdf-lib.min.js`

### 2.4 Signature Pad
1. Go to https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js
2. Right-click → "Save As"
3. Save to `/sign/lib/signature_pad.min.js`

## Step 3: Test It!

1. Open `/sign/index.html` in your browser
2. You should see the landing page
3. Click "Get Started"
4. Try uploading a PDF

If you see errors:
- Check browser console (F12)
- Verify all libraries are downloaded
- Verify config.js has correct Supabase credentials

## Troubleshooting

**"supabase is not defined" error:**
- Make sure supabase.js is loaded before config.js
- Check file path is correct

**"Can't upload PDF" error:**
- Verify storage bucket is created and set to PUBLIC
- Check Supabase credentials in config.js

**PDF not rendering:**
- Verify pdf.min.js and pdf.worker.min.js are downloaded
- Check they're in the /sign/lib/ folder

## Next Steps

Once setup is complete, you can:
1. Upload a test PDF
2. Add signers
3. Place signature fields
4. Generate shareable links
5. Test the signing flow

Need help? Check the console for errors and verify all setup steps!

