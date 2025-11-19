# 🔧 Quick Fix untuk "Row-Level Security" Error

## Problem:
Error: "new row violates row-level security policy"

## Solution (2 menit):

### Step 1: Go to Supabase
1. Open: https://pkujwqglpqbfpmspzwhw.supabase.co
2. Click **SQL Editor**
3. Click **New query**

### Step 2: Run Fix SQL
Copy paste semua ini:

```sql
-- Drop old policies
DROP POLICY IF EXISTS "Anyone can read envelopes" ON envelopes;
DROP POLICY IF EXISTS "Anyone can update envelopes" ON envelopes;
DROP POLICY IF EXISTS "Anyone can insert envelopes" ON envelopes;

DROP POLICY IF EXISTS "Anyone can read recipients" ON recipients;
DROP POLICY IF EXISTS "Anyone can update recipients" ON recipients;
DROP POLICY IF EXISTS "Anyone can insert recipients" ON recipients;

DROP POLICY IF EXISTS "Anyone can read fields" ON signature_fields;
DROP POLICY IF EXISTS "Anyone can insert fields" ON signature_fields;

-- Create fixed policies
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
```

### Step 3: Click RUN

Should see: "Success. No rows returned"

### Step 4: Try Again!

Go back to create.html → Try generate links → Should work now! ✅

---

## What Was Wrong:

The RLS (Row Level Security) policies were blocking INSERT operations. The fix makes policies more permissive for this demo app.

**Note:** For production with real user data, you'd want tighter security. But for e-signature dengan magic links (no accounts), this is fine!

---

## ✅ After Fix:

Generate Links will work!
- Upload PDF ✓
- Add signers ✓
- Place fields ✓
- Generate links ✓
- Everything works! 🚀

