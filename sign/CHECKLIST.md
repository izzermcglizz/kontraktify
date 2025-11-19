# ✅ Kontraktify Sign - Setup Checklist

Ikuti checklist ini step by step!

---

## ✅ DONE - Yang Udah Selesai:

- [x] Folder structure created
- [x] 4 HTML pages (index, create, sign, status)
- [x] 3 JavaScript files (create.js, sign.js, status.js)
- [x] CSS styling (sign.css)
- [x] Config template (config.js)
- [x] Payment modal UI
- [x] Payment integration code
- [x] Edge function template
- [x] Database schema SQL
- [x] Setup guides

**Semua code sudah ready!** Tinggal setup service aja.

---

## 🔲 TODO - Yang Perlu Kamu Lakukan:

### □ 1. Supabase Setup (15 menit)

**Steps:**
1. [ ] Create account di supabase.com
2. [ ] Create project "kontraktify-sign"
3. [ ] Copy URL & anon key
4. [ ] Paste di `/sign/js/config.js` (line 3-4)
5. [ ] Run SQL di SQL Editor (copy dari SETUP_GUIDE.md)
6. [ ] Create storage bucket "documents" (set PUBLIC)

**📖 Full guide:** `SETUP_GUIDE.md`

---

### □ 2. Midtrans Setup (15 menit)

**Steps:**
1. [ ] Create account di midtrans.com
2. [ ] Verify email
3. [ ] Get Sandbox keys (Settings → Access Keys)
   - [ ] Client Key
   - [ ] Server Key
4. [ ] Paste Client Key di `/sign/js/config.js` (line 8)
5. [ ] Add Server Key to Supabase secrets

**📖 Full guide:** `MIDTRANS_SETUP.md`

---

### □ 3. Deploy Edge Function (10 menit)

**Steps:**
1. [ ] Install Supabase CLI: `brew install supabase/tap/supabase`
2. [ ] Login: `supabase login`
3. [ ] Link project: `supabase link --project-ref YOUR_REF`
4. [ ] Deploy: `supabase functions deploy get-snap-token`

**📖 Full guide:** `MIDTRANS_SETUP.md` (Part 4)

---

### □ 4. Testing (10 menit)

**Steps:**
1. [ ] Open `/sign/index.html` in browser
2. [ ] Click "Mulai Sekarang"
3. [ ] Upload test PDF
4. [ ] Add 2 signers
5. [ ] Place signature fields on PDF
6. [ ] Click "Lanjut ke Pembayaran"
7. [ ] Modal payment muncul
8. [ ] Click "Bayar Sekarang"
9. [ ] Use test card: 4811 1111 1111 1114
10. [ ] Complete payment
11. [ ] Links generated!
12. [ ] Copy link → open in new tab
13. [ ] Test signing flow

---

### □ 5. Production (When Ready)

**Steps:**
1. [ ] Complete Midtrans merchant verification
2. [ ] Get production keys
3. [ ] Update config.js with production keys
4. [ ] Update Snap URL (remove 'sandbox')
5. [ ] Redeploy edge function
6. [ ] Test with real payment
7. [ ] **GO LIVE!** 🚀

---

## 📂 File Structure (What You Have)

```
/sign/
├── index.html ✅               Landing page
├── create.html ✅              Upload & prepare
├── sign.html ✅                Signing interface
├── status.html ✅              Track status
│
├── /js/
│   ├── config.js ✅            Supabase + Midtrans config
│   ├── create.js ✅            Create logic + payment
│   ├── sign.js ✅              Signing logic
│   └── status.js ✅            Status tracking
│
├── /css/
│   └── sign.css ✅             All styles
│
├── /lib/
│   └── README.md ✅            Library instructions
│
├── /supabase/
│   └── /functions/
│       └── /get-snap-token/
│           └── index.ts ✅     Payment backend
│
└── Guides:
    ├── START_HERE.md ✅        Main overview
    ├── SETUP_GUIDE.md ✅       Supabase setup
    ├── MIDTRANS_SETUP.md ✅    Payment setup
    ├── PAYMENT_SETUP.md ✅     Payment overview
    └── CHECKLIST.md ✅         This file!
```

---

## 🎯 Current Status:

**Code:** 100% complete ✅  
**Supabase:** Need to setup ⏳  
**Midtrans:** Need to setup ⏳  
**Testing:** Ready after setup ⏳

---

## ⏱️ Time Estimate:

- **Supabase setup:** 15 minutes
- **Midtrans setup:** 15 minutes
- **Deploy edge function:** 10 minutes
- **Testing:** 10 minutes

**Total: ~50 minutes to live!**

---

## 💰 Revenue Calculator:

| Customers/Month | Revenue | Your Profit* |
|----------------|---------|--------------|
| 10 docs | Rp 500,000 | ~Rp 465,000 |
| 50 docs | Rp 2,500,000 | ~Rp 2,325,000 |
| 100 docs | Rp 5,000,000 | ~Rp 4,650,000 |
| 500 docs | Rp 25,000,000 | ~Rp 23,250,000 |

*After Midtrans fees (~7%)

---

## 🆘 If You Get Stuck:

1. **Check which step you're on** (use this checklist)
2. **Read the relevant guide:**
   - Supabase issues → `SETUP_GUIDE.md`
   - Payment issues → `MIDTRANS_SETUP.md`
3. **Check browser console** (F12) for errors
4. **Ask me!** Screenshot the error

---

## 🎊 What Happens After Setup:

**User journey:**
1. User upload PDF + add signers → **Free**
2. User click "Generate Link" → **Payment Rp 50k**
3. User bayar via BCA/GoPay/dll
4. Links generated instantly
5. User copy & share via WhatsApp
6. Signers klik link → tanda tangan → **Free untuk signers**
7. All done → Download final PDF → **Free**

**You earn:** Rp 46,550 per document! 💰

---

## 🚀 Ready?

**Start with:** `SETUP_GUIDE.md` untuk Supabase setup

Good luck! You got this! 💪

