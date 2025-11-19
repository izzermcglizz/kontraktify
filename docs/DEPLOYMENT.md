# Kontraktify Deployment Guide

## Overview

Kontraktify menggunakan struktur multi-subdomain dengan setiap tool di subdomain terpisah:
- `kontraktify.com` / `www.kontraktify.com` → Main landing page (`www/` folder)
- `templates.kontraktify.com` → Template marketplace (`templates/` folder)
- `sign.kontraktify.com` → E-signature tool (`sign/` folder)
- `compare.kontraktify.com` → Document comparison tool (`compare/` folder)

## Folder Structure

```
kontraktify/
├── www/                    # Main landing (root domain)
├── templates/              # templates.kontraktify.com
├── sign/                   # sign.kontraktify.com
├── compare/                # compare.kontraktify.com (future)
├── shared/                 # Shared components & config
│   ├── config/
│   │   ├── supabase.js
│   │   └── payment.js
│   └── components/
├── asset/                  # Shared assets (favicon, images)
└── docs/                   # Documentation
```

## Deployment Options

### Option 1: GitHub Pages (Recommended for Static Sites)

#### Setup for Main Domain (kontraktify.com)

1. **Repository Setup:**
   - Create repository: `kontraktify` or use existing
   - Enable GitHub Pages in repository settings
   - Set source to `main` branch, root directory

2. **DNS Configuration:**
   - Add `CNAME` file in root with content: `www.kontraktify.com`
   - In your DNS provider, add:
     - `A` record: `@` → GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
     - `CNAME` record: `www` → `yourusername.github.io`

3. **Subdomain Setup:**
   - For each subdomain, you have two options:

   **Option A: Separate Repositories**
   - Create separate repos: `kontraktify-templates`, `kontraktify-sign`, `kontraktify-compare`
   - Each repo has its own GitHub Pages
   - DNS: `CNAME` record for each subdomain pointing to respective GitHub Pages URL

   **Option B: GitHub Pages with Custom Paths (Advanced)**
   - Use GitHub Actions to deploy each folder to separate Pages
   - Or use a monorepo with custom build process

#### Recommended: Separate Repositories

For each subdomain:

1. **Create separate repository:**
   ```bash
   # For templates
   git clone https://github.com/yourusername/kontraktify.git kontraktify-templates
   cd kontraktify-templates
   # Copy templates/ folder contents to root
   # Remove other folders
   git remote set-url origin https://github.com/yourusername/kontraktify-templates.git
   ```

2. **Enable GitHub Pages:**
   - Settings → Pages → Source: `main` branch, `/ (root)`

3. **DNS Configuration:**
   - Add `CNAME` file: `templates.kontraktify.com`
   - In DNS provider:
     - `CNAME` record: `templates` → `yourusername.github.io`

### Option 2: Netlify (Easier Multi-Subdomain Setup)

1. **Main Site:**
   - Connect repository to Netlify
   - Build command: (none, static site)
   - Publish directory: `www`
   - Custom domain: `kontraktify.com`

2. **Subdomains:**
   - Create separate Netlify sites for each subdomain
   - Or use Netlify's branch subdomains feature
   - Each site points to respective folder

3. **DNS:**
   - Point all subdomains to Netlify's DNS or use CNAME records

### Option 3: Vercel (Similar to Netlify)

1. **Setup:**
   - Connect repository
   - Configure build settings for each subdomain
   - Use Vercel's subdomain routing

## DNS Configuration

### Required DNS Records

For each subdomain, add CNAME records:

```
Type    Name              Value
CNAME   www               yourhosting.com
CNAME   templates         yourhosting.com
CNAME   sign              yourhosting.com
CNAME   compare           yourhosting.com
```

Or if using separate hosting:

```
Type    Name              Value
CNAME   www               www.github.io
CNAME   templates         templates.github.io
CNAME   sign              sign.github.io
CNAME   compare           compare.github.io
```

### DNS Propagation

- DNS changes can take 24-48 hours to propagate
- Use `dig` or online DNS checker to verify:
  ```bash
  dig templates.kontraktify.com
  ```

## Environment Variables

### Supabase Configuration

All subdomains use shared Supabase config from `shared/config/supabase.js`:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon/public key

### iPaymu Configuration

Payment config in `shared/config/payment.js`:
- `IPAYMU_VA`: Virtual Account number
- `IPAYMU_API_KEY`: API Key from iPaymu dashboard

**Important:** For production, consider using environment variables or a secure config service instead of hardcoding in JS files.

## Build & Deploy Process

### Local Development

1. **Test locally:**
   ```bash
   # For www
   cd www
   python -m http.server 8000
   # Visit http://localhost:8000
   
   # For templates
   cd templates
   python -m http.server 8001
   # Visit http://localhost:8001
   ```

2. **Update paths:**
   - Ensure all relative paths work from each subdomain's root
   - Test cross-subdomain links

### Production Deployment

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Update for Phase 1 deployment"
   git push origin main
   ```

2. **Deploy each subdomain:**
   - Follow deployment steps for your chosen hosting
   - Verify each subdomain is accessible
   - Test all links and functionality

## Post-Deployment Checklist

- [ ] All subdomains accessible
- [ ] Links between subdomains work
- [ ] Assets (images, CSS, JS) load correctly
- [ ] Supabase connection works on all subdomains
- [ ] Payment integration functional (test mode first)
- [ ] Mobile responsive on all pages
- [ ] SSL certificates active (HTTPS)
- [ ] Analytics/tracking setup (if needed)

## Troubleshooting

### Subdomain Not Loading

1. Check DNS propagation: `dig subdomain.kontraktify.com`
2. Verify CNAME record points to correct hosting
3. Check hosting provider's subdomain configuration
4. Ensure SSL certificate covers subdomain

### Assets Not Loading

1. Check path references (relative vs absolute)
2. Verify asset folder structure
3. Check browser console for 404 errors
4. Ensure CORS settings allow cross-subdomain assets

### Supabase Connection Issues

1. Verify Supabase URL and key in `shared/config/supabase.js`
2. Check Supabase project settings (allowed origins)
3. Verify Row Level Security (RLS) policies
4. Check browser console for errors

## Security Considerations

1. **API Keys:**
   - Never commit API keys to public repositories
   - Use environment variables or secure config service
   - Rotate keys regularly

2. **CORS:**
   - Configure Supabase to allow requests from all subdomains
   - Use wildcard: `*.kontraktify.com`

3. **HTTPS:**
   - Ensure all subdomains use HTTPS
   - Set up SSL certificates (automatic with most hosting)

## Support

For deployment issues, check:
- Hosting provider documentation
- DNS provider documentation
- Supabase documentation
- GitHub Pages / Netlify / Vercel docs

