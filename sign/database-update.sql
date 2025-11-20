-- Database Schema Updates for Email-Based History Tracking
-- Run this in Supabase SQL Editor

-- 1. Add email and history_token columns to envelopes table
ALTER TABLE envelopes 
ADD COLUMN IF NOT EXISTS user_email TEXT,
ADD COLUMN IF NOT EXISTS history_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 2. Create index on user_email for faster queries
CREATE INDEX IF NOT EXISTS idx_envelopes_user_email ON envelopes(user_email);

-- 3. Create index on history_token for faster lookups
CREATE INDEX IF NOT EXISTS idx_envelopes_history_token ON envelopes(history_token);

-- 4. Create history_tokens table for secure access (optional, for additional security)
CREATE TABLE IF NOT EXISTS history_tokens (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    document_id UUID REFERENCES envelopes(id) ON DELETE CASCADE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create index on history_tokens for faster lookups
CREATE INDEX IF NOT EXISTS idx_history_tokens_token ON history_tokens(token);
CREATE INDEX IF NOT EXISTS idx_history_tokens_email ON history_tokens(email);

-- 6. Update existing records to have created_at (if column was just added)
UPDATE envelopes 
SET created_at = NOW() 
WHERE created_at IS NULL;

-- Note: For Compare and Templates history, you may need to create similar columns
-- in their respective tables when those features are implemented.

