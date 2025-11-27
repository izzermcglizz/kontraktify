-- Add signature_data column to signature_fields table
-- Run this in Supabase SQL Editor

-- Add signature_data column if it doesn't exist
ALTER TABLE signature_fields 
ADD COLUMN IF NOT EXISTS signature_data TEXT;

-- Add columns to envelopes for signed and final PDF URLs
ALTER TABLE envelopes 
ADD COLUMN IF NOT EXISTS signed_pdf_url TEXT,
ADD COLUMN IF NOT EXISTS final_pdf_url TEXT;

-- Add comment to explain the columns
COMMENT ON COLUMN signature_fields.signature_data IS 'Base64 encoded signature image or text data';
COMMENT ON COLUMN envelopes.signed_pdf_url IS 'URL to PDF with signatures from individual recipient';
COMMENT ON COLUMN envelopes.final_pdf_url IS 'URL to final PDF with all signatures from all recipients';

