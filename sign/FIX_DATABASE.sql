-- FIX untuk "row-level security policy" error
-- Run this di Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read envelopes" ON envelopes;
DROP POLICY IF EXISTS "Anyone can update envelopes" ON envelopes;
DROP POLICY IF EXISTS "Anyone can insert envelopes" ON envelopes;

DROP POLICY IF EXISTS "Anyone can read recipients" ON recipients;
DROP POLICY IF EXISTS "Anyone can update recipients" ON recipients;
DROP POLICY IF EXISTS "Anyone can insert recipients" ON recipients;

DROP POLICY IF EXISTS "Anyone can read fields" ON signature_fields;
DROP POLICY IF EXISTS "Anyone can insert fields" ON signature_fields;

-- Create new policies (more permissive for testing)
CREATE POLICY "Public read envelopes" ON envelopes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public insert envelopes" ON envelopes 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public update envelopes" ON envelopes 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Public read recipients" ON recipients 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public insert recipients" ON recipients 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public update recipients" ON recipients 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Public read fields" ON signature_fields 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public insert fields" ON signature_fields 
  FOR INSERT 
  WITH CHECK (true);

-- Done! Try generate links again

