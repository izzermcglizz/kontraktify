-- AGGRESSIVE FIX for Row Level Security (RLS) Policies
-- This script will DISABLE RLS temporarily, then re-enable with proper policies
-- Use this if the previous script didn't work

-- ============================================
-- STEP 1: DISABLE RLS TEMPORARILY (for testing)
-- ============================================
-- Uncomment the lines below to temporarily disable RLS for testing:
-- ALTER TABLE envelopes DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE recipients DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE signature_fields DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE history_tokens DISABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: DROP ALL EXISTING POLICIES
-- ============================================
-- Drop all policies on envelopes
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'envelopes') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON envelopes';
    END LOOP;
END $$;

-- Drop all policies on recipients
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'recipients') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON recipients';
    END LOOP;
END $$;

-- Drop all policies on signature_fields
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'signature_fields') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON signature_fields';
    END LOOP;
END $$;

-- Drop all policies on history_tokens
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'history_tokens') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON history_tokens';
    END LOOP;
END $$;

-- ============================================
-- STEP 3: ENABLE RLS
-- ============================================
ALTER TABLE envelopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE signature_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE history_tokens ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 4: CREATE PERMISSIVE POLICIES
-- ============================================

-- Envelopes: Allow ALL operations for anon and authenticated
CREATE POLICY "anon_envelopes_all" ON envelopes
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Recipients: Allow ALL operations for anon and authenticated
CREATE POLICY "anon_recipients_all" ON recipients
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Signature Fields: Allow ALL operations for anon and authenticated
CREATE POLICY "anon_signature_fields_all" ON signature_fields
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- History Tokens: Allow ALL operations for anon and authenticated
CREATE POLICY "anon_history_tokens_all" ON history_tokens
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- STEP 5: VERIFY POLICIES
-- ============================================
-- Run this to see all policies:
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename IN ('envelopes', 'recipients', 'signature_fields', 'history_tokens')
ORDER BY tablename, policyname;

-- ============================================
-- IMPORTANT: STORAGE BUCKET POLICIES
-- ============================================
-- You MUST also set up storage bucket policies in Supabase Dashboard:
-- 1. Go to Storage > Policies
-- 2. Select the 'documents' bucket
-- 3. Create policies for:
--    - INSERT (anon, authenticated)
--    - SELECT (anon, authenticated)
--    - UPDATE (anon, authenticated)
--    - DELETE (anon, authenticated)
-- 
-- Or use this SQL (if storage policies can be set via SQL):
-- Note: Storage policies might need to be set via Dashboard UI

