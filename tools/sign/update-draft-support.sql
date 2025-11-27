-- Update Supabase for Draft Support and Enhanced eSign Flow
-- Run this script in your Supabase SQL Editor

-- 0. FIRST: Ensure user_id column exists (required for RLS policies)
DO $$ 
BEGIN
    -- Add user_id column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'envelopes' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE envelopes ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
        
        -- Create index for faster queries
        CREATE INDEX IF NOT EXISTS idx_envelopes_user_id ON envelopes(user_id);
    END IF;
END $$;

-- 1. Ensure envelopes table has all necessary columns
DO $$ 
BEGIN
    -- Add status column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'envelopes' AND column_name = 'status'
    ) THEN
        ALTER TABLE envelopes ADD COLUMN status TEXT DEFAULT NULL;
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'envelopes' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE envelopes ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
    
    -- Add title column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'envelopes' AND column_name = 'title'
    ) THEN
        ALTER TABLE envelopes ADD COLUMN title TEXT;
    END IF;
    
    -- Add track_token column if it doesn't exist (for sent documents)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'envelopes' AND column_name = 'track_token'
    ) THEN
        ALTER TABLE envelopes ADD COLUMN track_token TEXT;
    END IF;
    
    -- Add unique constraint to track_token if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'envelopes_track_token_key'
    ) THEN
        ALTER TABLE envelopes ADD CONSTRAINT envelopes_track_token_key UNIQUE (track_token);
    END IF;
END $$;

-- 2. Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_envelopes_updated_at ON envelopes;
CREATE TRIGGER update_envelopes_updated_at
    BEFORE UPDATE ON envelopes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Ensure recipients table has order_num column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'recipients' AND column_name = 'order_num'
    ) THEN
        ALTER TABLE recipients ADD COLUMN order_num INTEGER DEFAULT 1;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'recipients' AND column_name = 'role'
    ) THEN
        ALTER TABLE recipients ADD COLUMN role TEXT DEFAULT 'signer';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'recipients' AND column_name = 'sent_at'
    ) THEN
        ALTER TABLE recipients ADD COLUMN sent_at TIMESTAMPTZ;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'recipients' AND column_name = 'viewed_at'
    ) THEN
        ALTER TABLE recipients ADD COLUMN viewed_at TIMESTAMPTZ;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'recipients' AND column_name = 'signed_at'
    ) THEN
        ALTER TABLE recipients ADD COLUMN signed_at TIMESTAMPTZ;
    END IF;
END $$;

-- 5. Ensure signature_fields table has all necessary columns
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'signature_fields' AND column_name = 'label'
    ) THEN
        ALTER TABLE signature_fields ADD COLUMN label TEXT;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'signature_fields' AND column_name = 'required'
    ) THEN
        ALTER TABLE signature_fields ADD COLUMN required BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'signature_fields' AND column_name = 'placeholder'
    ) THEN
        ALTER TABLE signature_fields ADD COLUMN placeholder TEXT;
    END IF;
END $$;

-- 6. Enable RLS on envelopes table
ALTER TABLE envelopes ENABLE ROW LEVEL SECURITY;

-- 7. Update RLS policies to allow draft operations
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own envelopes" ON envelopes;
DROP POLICY IF EXISTS "Users can insert their own envelopes" ON envelopes;
DROP POLICY IF EXISTS "Users can update their own envelopes" ON envelopes;
DROP POLICY IF EXISTS "Users can delete their own envelopes" ON envelopes;
DROP POLICY IF EXISTS "Anonymous can view envelopes via recipients" ON envelopes;

-- Create comprehensive RLS policies for envelopes
CREATE POLICY "Users can view their own envelopes"
    ON envelopes FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own envelopes"
    ON envelopes FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own envelopes"
    ON envelopes FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own envelopes"
    ON envelopes FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Allow anonymous access for signing (recipients can view envelopes via magic token)
CREATE POLICY "Anonymous can view envelopes via recipients"
    ON envelopes FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM recipients
            WHERE recipients.envelope_id = envelopes.id
        )
    );

-- 8. Enable RLS on recipients and signature_fields
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE signature_fields ENABLE ROW LEVEL SECURITY;

-- 9. Update RLS policies for recipients
DROP POLICY IF EXISTS "Users can manage recipients of their envelopes" ON recipients;
DROP POLICY IF EXISTS "Anonymous can view recipients via magic token" ON recipients;

CREATE POLICY "Users can manage recipients of their envelopes"
    ON recipients FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM envelopes 
            WHERE envelopes.id = recipients.envelope_id 
            AND envelopes.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM envelopes 
            WHERE envelopes.id = recipients.envelope_id 
            AND envelopes.user_id = auth.uid()
        )
    );

-- Allow anonymous access for signing
CREATE POLICY "Anonymous can view recipients via magic token"
    ON recipients FOR SELECT
    TO anon, authenticated
    USING (true);

-- 10. Update RLS policies for signature_fields
DROP POLICY IF EXISTS "Users can manage fields of their envelopes" ON signature_fields;
DROP POLICY IF EXISTS "Anonymous can view fields via magic token" ON signature_fields;

CREATE POLICY "Users can manage fields of their envelopes"
    ON signature_fields FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM envelopes 
            WHERE envelopes.id = signature_fields.envelope_id 
            AND envelopes.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM envelopes 
            WHERE envelopes.id = signature_fields.envelope_id 
            AND envelopes.user_id = auth.uid()
        )
    );

-- Allow anonymous access for signing
CREATE POLICY "Anonymous can view fields via magic token"
    ON signature_fields FOR SELECT
    TO anon, authenticated
    USING (true);

-- 11. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_envelopes_user_id ON envelopes(user_id);
CREATE INDEX IF NOT EXISTS idx_envelopes_status ON envelopes(status);
CREATE INDEX IF NOT EXISTS idx_envelopes_track_token ON envelopes(track_token);
CREATE INDEX IF NOT EXISTS idx_recipients_envelope_id ON recipients(envelope_id);
CREATE INDEX IF NOT EXISTS idx_signature_fields_envelope_id ON signature_fields(envelope_id);
CREATE INDEX IF NOT EXISTS idx_signature_fields_recipient_id ON signature_fields(recipient_id);

-- 12. Storage policies for documents bucket
-- Make sure the 'documents' bucket exists and has proper policies

-- Allow authenticated users to upload to their own folder
-- Note: Adjust the bucket name if different
DO $$
BEGIN
    -- Check if bucket exists, if not create it
    IF NOT EXISTS (
        SELECT 1 FROM storage.buckets WHERE name = 'documents'
    ) THEN
        INSERT INTO storage.buckets (id, name, public)
        VALUES ('documents', 'documents', false);
    END IF;
END $$;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;

-- Create storage policies for documents bucket
CREATE POLICY "Users can upload their own documents"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'documents' 
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Users can view their own documents"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'documents' 
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Users can update their own documents"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'documents' 
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Users can delete their own documents"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'documents' 
        AND auth.role() = 'authenticated'
    );

-- 13. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON envelopes TO authenticated;
GRANT ALL ON recipients TO authenticated;
GRANT ALL ON signature_fields TO authenticated;

-- Summary message
DO $$
BEGIN
    RAISE NOTICE '✅ Database updated successfully!';
    RAISE NOTICE '✅ Draft support enabled';
    RAISE NOTICE '✅ RLS policies updated';
    RAISE NOTICE '✅ Storage policies configured';
END $$;

