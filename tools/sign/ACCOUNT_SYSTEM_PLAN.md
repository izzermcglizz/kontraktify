# Account System Implementation Plan

## Overview
Implement user accounts and dashboard so users can manage all their documents in one place.

## Features to Implement

### 1. Authentication System
- **Sign Up** - Email/password registration
- **Sign In** - Email/password login
- **Sign Out** - Logout functionality
- **Password Reset** - Forgot password flow
- **Session Management** - Keep user logged in

### 2. Dashboard
- **My Documents** - List all user's documents (templates, e-signatures, comparisons)
- **Document Status** - Track status of each document
- **Quick Actions** - Create new document, view history, etc.
- **Filters** - Filter by type, status, date

### 3. Database Changes
- Link `envelopes` table to user accounts
- Add `user_id` column to relevant tables
- Update RLS policies for user-based access

### 4. UI Pages
- `/sign/login.html` - Login page
- `/sign/register.html` - Registration page
- `/sign/dashboard.html` - User dashboard
- Update navigation to show user menu when logged in

## Implementation Steps

1. **Setup Supabase Auth** (already available)
2. **Create login/register pages**
3. **Create dashboard page**
4. **Update database schema**
5. **Update RLS policies**
6. **Update create.js to associate with user**
7. **Update status/history pages to filter by user**

