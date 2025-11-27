-- Fix Row Level Security (RLS) Policies for E-Signature Feature
-- Run this in Supabase SQL Editor to allow inserts without authentication

-- 0. First, ensure all required tables and columns exist
-- Add email and history_token columns to envelopes table (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'envelopes' AND column_name = 'user_email') THEN
        ALTER TABLE envelopes ADD COLUMN user_email TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'envelopes' AND column_name = 'history_token') THEN
        ALTER TABLE envelopes ADD COLUMN history_token TEXT UNIQUE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'envelopes' AND column_name = 'created_at') THEN
        ALTER TABLE envelopes ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Create indexes on envelopes (if not exists)
CREATE INDEX IF NOT EXISTS idx_envelopes_user_email ON envelopes(user_email);
CREATE INDEX IF NOT EXISTS idx_envelopes_history_token ON envelopes(history_token);

-- Create history_tokens table (if not exists)
CREATE TABLE IF NOT EXISTS history_tokens (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    document_id UUID REFERENCES envelopes(id) ON DELETE CASCADE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes on history_tokens (if not exists)
CREATE INDEX IF NOT EXISTS idx_history_tokens_token ON history_tokens(token);
CREATE INDEX IF NOT EXISTS idx_history_tokens_email ON history_tokens(email);

-- Update existing records to have created_at (if column was just added)
UPDATE envelopes 
SET created_at = NOW() 
WHERE created_at IS NULL;

-- 1. Enable RLS on tables (if not already enabled)
ALTER TABLE envelopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE signature_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE history_tokens ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous inserts on envelopes" ON envelopes;
DROP POLICY IF EXISTS "Allow anonymous reads on envelopes" ON envelopes;
DROP POLICY IF EXISTS "Allow anonymous inserts on recipients" ON recipients;
DROP POLICY IF EXISTS "Allow anonymous reads on recipients" ON recipients;
DROP POLICY IF EXISTS "Allow anonymous inserts on signature_fields" ON signature_fields;
DROP POLICY IF EXISTS "Allow anonymous reads on signature_fields" ON signature_fields;
DROP POLICY IF EXISTS "Allow anonymous inserts on history_tokens" ON history_tokens;
DROP POLICY IF EXISTS "Allow anonymous reads on history_tokens" ON history_tokens;

-- 3. Create policies to allow anonymous inserts (for email-based system)
-- Envelopes: Allow anyone to create and read their own documents
CREATE POLICY "Allow anonymous inserts on envelopes"
ON envelopes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow anonymous reads on envelopes"
ON envelopes
FOR SELECT
TO anon, authenticated
USING (true);

-- Recipients: Allow anyone to create and read recipients
CREATE POLICY "Allow anonymous inserts on recipients"
ON recipients
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow anonymous reads on recipients"
ON recipients
FOR SELECT
TO anon, authenticated
USING (true);

-- Signature Fields: Allow anyone to create and read signature fields
CREATE POLICY "Allow anonymous inserts on signature_fields"
ON signature_fields
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow anonymous reads on signature_fields"
ON signature_fields
FOR SELECT
TO anon, authenticated
USING (true);

-- History Tokens: Allow anyone to create and read history tokens
CREATE POLICY "Allow anonymous inserts on history_tokens"
ON history_tokens
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow anonymous reads on history_tokens"
ON history_tokens
FOR SELECT
TO anon, authenticated
USING (true);

-- 4. Allow updates for recipients (for signature status)
CREATE POLICY "Allow anonymous updates on recipients"
ON recipients
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 5. Allow updates for envelopes (for status tracking)
CREATE POLICY "Allow anonymous updates on envelopes"
ON envelopes
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Note: These policies allow anonymous access for development/testing.
-- For production, you may want to restrict based on email or token validation.
-- Example production policy:
-- CREATE POLICY "Allow reads by email"
-- ON envelopes
-- FOR SELECT
-- TO anon, authenticated
-- USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

