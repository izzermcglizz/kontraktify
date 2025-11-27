# Supabase Update Guide for Draft Support

This guide will help you update your Supabase database to support the new draft functionality and enhanced eSign flow.

## Quick Start

1. **Open Supabase Dashboard** → Go to your project → SQL Editor

2. **Run the Update Script**:
   - Copy the contents of `update-draft-support.sql`
   - Paste into SQL Editor
   - Click "Run" or press `Ctrl/Cmd + Enter`

3. **Verify the Update**:
   - Check that all tables have the new columns
   - Verify RLS policies are active
   - Test storage bucket permissions

## What Gets Updated

### 1. **Envelopes Table**
- ✅ `status` column (supports: 'draft', 'sent', 'completed', 'declined', 'expired')
- ✅ `updated_at` column (auto-updates on changes)
- ✅ `title` column (document name)
- ✅ `track_token` column (for tracking sent documents)

### 2. **Recipients Table**
- ✅ `order_num` column (signing order)
- ✅ `role` column ('signer' or 'cc')
- ✅ `sent_at`, `viewed_at`, `signed_at` timestamps

### 3. **Signature Fields Table**
- ✅ `label` column (field label)
- ✅ `required` column (boolean)
- ✅ `placeholder` column (optional placeholder text)

### 4. **RLS Policies**
- ✅ Users can view/insert/update/delete their own envelopes
- ✅ Users can manage recipients of their envelopes
- ✅ Users can manage signature fields of their envelopes

### 5. **Storage Policies**
- ✅ Authenticated users can upload/view/update/delete documents
- ✅ Documents bucket created if it doesn't exist

### 6. **Performance Indexes**
- ✅ Indexes on `user_id`, `status`, `track_token`
- ✅ Indexes on foreign keys for faster queries

## Manual Verification Steps

After running the script, verify:

1. **Check Tables**:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'envelopes';
   ```

2. **Check RLS Policies**:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'envelopes';
   ```

3. **Check Storage Bucket**:
   - Go to Storage → Check if 'documents' bucket exists
   - Verify policies are active

4. **Test Draft Creation**:
   - Try creating a draft from the eSign dashboard
   - Verify it appears in the "Drafts" section

## Troubleshooting

### Issue: "permission denied for table envelopes"
**Solution**: Make sure RLS policies are created and enabled. Run the script again.

### Issue: "bucket does not exist"
**Solution**: The script should create it automatically. If not, manually create the 'documents' bucket in Storage.

### Issue: "column does not exist"
**Solution**: The script uses `DO $$` blocks to safely add columns. If you see this error, the column might already exist. Check the table structure first.

### Issue: Drafts not showing in dashboard
**Solution**: 
1. Check that `status = 'draft'` is being set correctly
2. Verify RLS policies allow SELECT on envelopes
3. Check browser console for errors

## Rollback (if needed)

If you need to rollback changes:

```sql
-- Remove new columns (be careful - this will delete data!)
ALTER TABLE envelopes DROP COLUMN IF EXISTS status;
ALTER TABLE envelopes DROP COLUMN IF EXISTS updated_at;
-- ... etc

-- Remove policies
DROP POLICY IF EXISTS "Users can view their own envelopes" ON envelopes;
-- ... etc
```

## Next Steps

After updating:
1. ✅ Test creating a draft
2. ✅ Test saving a draft
3. ✅ Test loading a draft
4. ✅ Test sending a document for signature
5. ✅ Verify drafts appear in dashboard

## Support

If you encounter any issues:
1. Check the Supabase logs (Dashboard → Logs)
2. Check browser console for errors
3. Verify all columns exist in the tables
4. Verify RLS policies are active

