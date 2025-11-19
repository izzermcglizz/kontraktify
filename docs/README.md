# Kontraktify Documentation

## Overview

Kontraktify is a multi-subdomain legal tools platform providing:
- **Templates**: 150+ legal document templates
- **E-Signature**: Digital document signing with multi-signer support
- **Document Compare**: Visual comparison tool for document versions

## Architecture

### Subdomain Structure

- `kontraktify.com` → Main landing page (navigation hub)
- `templates.kontraktify.com` → Template marketplace
- `sign.kontraktify.com` → E-signature tool
- `compare.kontraktify.com` → Document comparison tool

### Technology Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Backend**: Supabase (PostgreSQL, Storage, Edge Functions)
- **Payment**: iPaymu
- **PDF Processing**: PDF.js, PDF-LIB

## Getting Started

### Local Development

1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/kontraktify.git
   cd kontraktify
   ```

2. Setup Supabase:
   - Create Supabase project
   - Run database migrations (see `supabase/migrations/`)
   - Update `shared/config/supabase.js` with your credentials

3. Setup iPaymu:
   - Get API credentials from iPaymu dashboard
   - Update `shared/config/payment.js`

4. Test locally:
   ```bash
   # Main site
   cd www
   python -m http.server 8000
   
   # Templates
   cd templates
   python -m http.server 8001
   ```

## Documentation Index

- [Deployment Guide](./DEPLOYMENT.md) - How to deploy to production
- [Setup Guide](../sign/SETUP_GUIDE.md) - Detailed setup instructions
- [Payment Setup](../sign/IPAYMU_SETUP.md) - iPaymu integration guide

## Project Structure

```
kontraktify/
├── www/                    # Main landing page
├── templates/              # Template marketplace
├── sign/                   # E-signature tool
├── compare/                # Document comparison (future)
├── shared/                 # Shared components & config
│   ├── config/            # Supabase, payment config
│   └── components/        # Reusable UI components
├── asset/                  # Shared assets
└── docs/                   # Documentation
```

## Development Roadmap

### Phase 1: Foundation ✅
- [x] Subdomain structure
- [x] Shared configuration
- [x] Main landing page redesign

### Phase 2: Templates Enhancement (In Progress)
- [ ] Pay-per-use integration
- [ ] Payment flow
- [ ] Download tracking

### Phase 3: E-Signature Cleanup
- [ ] Clean up sign folder
- [ ] Fix upload functionality
- [ ] Add pay-per-use

### Phase 4: Document Compare
- [ ] Build comparison tool
- [ ] PDF text extraction
- [ ] Visual diff interface

### Phase 5: Client Portal (Future)
- [ ] Lawyer dashboard
- [ ] Client management
- [ ] Document library

## Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Submit pull request

## License

© 2024 Kontraktify oleh CV Cipta Kontrak Teknologi. Hak cipta dilindungi.

