-- Complete Fix for Row Level Security (RLS) Policies
-- Run this in Supabase SQL Editor to allow inserts without authentication
-- This script includes ALL tables and storage buckets used by the e-signature feature

-- ============================================
-- PART 1: DATABASE TABLES SETUP
-- ============================================

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

-- 1. Enable RLS on ALL tables used by the e-signature feature
ALTER TABLE envelopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE signature_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE history_tokens ENABLE ROW LEVEL SECURITY;

-- 2. Drop ALL existing policies to start fresh (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous inserts on envelopes" ON envelopes;
DROP POLICY IF EXISTS "Allow anonymous reads on envelopes" ON envelopes;
DROP POLICY IF EXISTS "Allow anonymous updates on envelopes" ON envelopes;
DROP POLICY IF EXISTS "Allow anonymous deletes on envelopes" ON envelopes;

DROP POLICY IF EXISTS "Allow anonymous inserts on recipients" ON recipients;
DROP POLICY IF EXISTS "Allow anonymous reads on recipients" ON recipients;
DROP POLICY IF EXISTS "Allow anonymous updates on recipients" ON recipients;
DROP POLICY IF EXISTS "Allow anonymous deletes on recipients" ON recipients;

DROP POLICY IF EXISTS "Allow anonymous inserts on signature_fields" ON signature_fields;
DROP POLICY IF EXISTS "Allow anonymous reads on signature_fields" ON signature_fields;
DROP POLICY IF EXISTS "Allow anonymous updates on signature_fields" ON signature_fields;
DROP POLICY IF EXISTS "Allow anonymous deletes on signature_fields" ON signature_fields;

DROP POLICY IF EXISTS "Allow anonymous inserts on history_tokens" ON history_tokens;
DROP POLICY IF EXISTS "Allow anonymous reads on history_tokens" ON history_tokens;
DROP POLICY IF EXISTS "Allow anonymous updates on history_tokens" ON history_tokens;
DROP POLICY IF EXISTS "Allow anonymous deletes on history_tokens" ON history_tokens;

-- 3. Create comprehensive policies to allow anonymous access (for email-based system)
-- Envelopes: Full CRUD access
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

CREATE POLICY "Allow anonymous updates on envelopes"
ON envelopes
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow anonymous deletes on envelopes"
ON envelopes
FOR DELETE
TO anon, authenticated
USING (true);

-- Recipients: Full CRUD access
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

CREATE POLICY "Allow anonymous updates on recipients"
ON recipients
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow anonymous deletes on recipients"
ON recipients
FOR DELETE
TO anon, authenticated
USING (true);

-- Signature Fields: Full CRUD access
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

CREATE POLICY "Allow anonymous updates on signature_fields"
ON signature_fields
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow anonymous deletes on signature_fields"
ON signature_fields
FOR DELETE
TO anon, authenticated
USING (true);

-- History Tokens: Full CRUD access
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

CREATE POLICY "Allow anonymous updates on history_tokens"
ON history_tokens
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow anonymous deletes on history_tokens"
ON history_tokens
FOR DELETE
TO anon, authenticated
USING (true);

-- ============================================
-- PART 2: STORAGE BUCKET POLICIES
-- ============================================
-- Note: Storage policies need to be set up in Supabase Dashboard > Storage
-- Go to Storage > Policies and create these policies for the 'documents' bucket:

-- For INSERT (upload):
-- Policy Name: "Allow anonymous uploads"
-- Allowed operation: INSERT
-- Target roles: anon, authenticated
-- Policy definition: (bucket_id = 'documents')

-- For SELECT (download):
-- Policy Name: "Allow anonymous downloads"
-- Allowed operation: SELECT
-- Target roles: anon, authenticated
-- Policy definition: (bucket_id = 'documents')

-- For UPDATE (replace):
-- Policy Name: "Allow anonymous updates"
-- Allowed operation: UPDATE
-- Target roles: anon, authenticated
-- Policy definition: (bucket_id = 'documents')

-- For DELETE:
-- Policy Name: "Allow anonymous deletes"
-- Allowed operation: DELETE
-- Target roles: anon, authenticated
-- Policy definition: (bucket_id = 'documents')

-- ============================================
-- VERIFICATION
-- ============================================
-- To verify policies were created, run:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd
-- FROM pg_policies
-- WHERE tablename IN ('envelopes', 'recipients', 'signature_fields', 'history_tokens')
-- ORDER BY tablename, policyname;

-- Note: These policies allow anonymous access for development/testing.
-- For production, you may want to restrict based on email or token validation.
