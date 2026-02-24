# 🔧 Template Restructuring - Bug Fixes

## Issues Found & Fixed (Feb 24, 2026)

### 1. ❌ Broken: kerja-sama/landing.html

**Problems:**
- Button had inline `onclick` instead of `data-form-url` attribute
- Loading screen animation wasn't working
- Asset paths were wrong (`../../asset/` instead of `../../../asset/`)
- Navigation links were broken (pointed to local `index.html` instead of `../index.html`)
- Style and script paths were incorrect

**Fixed:**
- ✅ Changed button from `onclick="window.location.href='form.html'"` to `data-form-url="form.html"`
- ✅ Fixed all asset paths: `../../asset/` → `../../../asset/`
- ✅ Fixed style path: `../../style.css` → `../../../style.css`
- ✅ Fixed script path: `../../script.js` → `../../../script.js`
- ✅ Fixed all navigation links: `index.html` → `../index.html`
- ✅ Fixed breadcrumb navigation to point to correct templates index

### 2. ❌ Broken: sewa-menyewa/landing.html

**Problems:**
- Same asset path issues as kerja-sama
- All `../../` paths needed to be `../../../` after moving to subfolder

**Fixed:**
- ✅ Fixed all asset paths: `../../asset/` → `../../../asset/`
- ✅ Fixed style path: `../../style.css` → `../../../style.css`
- ✅ Fixed script path: `../../script.js` → `../../../script.js`
- ✅ Fixed legal-aid links: `../../legal-aid/` → `../../../legal-aid/`

### 3. ⚠️ Incomplete: kerja-sama flow (Not a bug, but missing features)

**Current State:**
- ✅ landing.html - Complete
- ✅ form.html - Complete
- ✅ form.js - Complete (downloads DOCX directly)
- ❌ preview.html - Placeholder only ("Coming soon")
- ❌ payment.html - Placeholder only ("Coming soon")
- ❌ receipt.html - Placeholder only ("Coming soon")

**Note:** kerja-sama currently skips preview/payment/receipt flow and downloads the Word document directly from the form. This is intentional for now (free template).

## Path Structure Reference

From template subfolder (`tools/templates/[template-name]/`):

```
Landing page is at: tools/templates/[template-name]/landing.html

Correct paths:
- Assets:  ../../../asset/favicon-removebg-preview.png
- Styles:  ../../../style.css
- Scripts: ../../../script.js
- Home:    ../../../index.html
- Templates catalog: ../index.html
- Legal aid: ../../../legal-aid/
```

## Testing Checklist

After restructuring, test these for each template:

- [ ] Landing page loads (no 404s in console)
- [ ] Logo/favicon displays correctly
- [ ] Styles are applied
- [ ] "Buat Dokumen" button works with loading animation
- [ ] Navigation links work (header, breadcrumb, footer)
- [ ] Form page loads
- [ ] Form → Preview → Payment → Receipt flow works (if applicable)

## Files Modified

### Restructuring (Initial)
- Created: `sewa-menyewa/` folder with complete flow
- Created: `kerja-sama/` folder with complete flow
- Created: `_shared/` folder with utilities
- Updated: `products.js` with URL mapping
- Deleted: `forms/` folder (old structure)
- Deleted: Root landing pages (old structure)

### Bug Fixes (This session)
- Fixed: `kerja-sama/landing.html` (button, paths, navigation)
- Fixed: `sewa-menyewa/landing.html` (paths)

## Next Steps (Optional)

If you want kerja-sama to have the full payment flow like sewa-menyewa:

1. **Copy working pages from sewa-menyewa:**
   ```bash
   cp sewa-menyewa/preview.html kerja-sama/preview.html
   cp sewa-menyewa/payment.html kerja-sama/payment.html
   cp sewa-menyewa/receipt.html kerja-sama/receipt.html
   ```

2. **Update content:** Change "Sewa Menyewa" references to "Kerja Sama Usaha"

3. **Update form.js:** Change from direct download to redirect to preview page

4. **Update price:** Set appropriate price in payment page

---

**Status:** ✅ All critical path issues fixed  
**Date:** February 24, 2026  
**Tested:** Landing pages now load correctly with all assets
