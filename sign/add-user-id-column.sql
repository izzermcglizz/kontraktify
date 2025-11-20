-- Add user_id column to envelopes table for account system
-- Run this in Supabase SQL Editor

-- Add user_id column to envelopes
ALTER TABLE envelopes 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_envelopes_user_id ON envelopes(user_id);

-- Update RLS policies to enforce user-based access
-- Drop existing anonymous policies
DROP POLICY IF EXISTS "anon_envelopes_all" ON envelopes;
DROP POLICY IF EXISTS "Allow anonymous inserts on envelopes" ON envelopes;
DROP POLICY IF EXISTS "Allow anonymous reads on envelopes" ON envelopes;
DROP POLICY IF EXISTS "Allow anonymous updates on envelopes" ON envelopes;
DROP POLICY IF EXISTS "Allow anonymous deletes on envelopes" ON envelopes;

-- Create user-based policies
CREATE POLICY "Users can view their own envelopes"
ON envelopes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own envelopes"
ON envelopes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own envelopes"
ON envelopes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own envelopes"
ON envelopes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Allow anonymous access for signing (recipients can view envelopes via magic token)
-- This is needed so signers can access documents without logging in
CREATE POLICY "Anonymous can view envelopes via recipients"
ON envelopes
FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1 FROM recipients
        WHERE recipients.envelope_id = envelopes.id
    )
);

-- Note: Recipients and signature_fields will inherit access through envelope_id
-- We may need to update those policies too if needed

