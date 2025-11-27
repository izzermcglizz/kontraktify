-- Unified Dashboard Database Schema
-- This schema supports tracking all user activities: e-signature, template purchases, and compare history

-- Template Purchases Table
CREATE TABLE IF NOT EXISTS template_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template_name TEXT NOT NULL,
    template_slug TEXT NOT NULL,
    template_category TEXT,
    purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    download_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compare History Table
CREATE TABLE IF NOT EXISTS compare_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    document1_name TEXT NOT NULL,
    document2_name TEXT NOT NULL,
    document1_url TEXT,
    document2_url TEXT,
    result_url TEXT,
    compared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE template_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE compare_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for template_purchases
DROP POLICY IF EXISTS "Users can view their own template purchases" ON template_purchases;
CREATE POLICY "Users can view their own template purchases"
    ON template_purchases FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own template purchases" ON template_purchases;
CREATE POLICY "Users can insert their own template purchases"
    ON template_purchases FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own template purchases" ON template_purchases;
CREATE POLICY "Users can update their own template purchases"
    ON template_purchases FOR UPDATE
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own template purchases" ON template_purchases;
CREATE POLICY "Users can delete their own template purchases"
    ON template_purchases FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for compare_history
DROP POLICY IF EXISTS "Users can view their own compare history" ON compare_history;
CREATE POLICY "Users can view their own compare history"
    ON compare_history FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own compare history" ON compare_history;
CREATE POLICY "Users can insert their own compare history"
    ON compare_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own compare history" ON compare_history;
CREATE POLICY "Users can update their own compare history"
    ON compare_history FOR UPDATE
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own compare history" ON compare_history;
CREATE POLICY "Users can delete their own compare history"
    ON compare_history FOR DELETE
    USING (auth.uid() = user_id);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_template_purchases_user_id ON template_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_template_purchases_created_at ON template_purchases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_compare_history_user_id ON compare_history(user_id);
CREATE INDEX IF NOT EXISTS idx_compare_history_compared_at ON compare_history(compared_at DESC);

