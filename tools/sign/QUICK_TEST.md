# 🚀 Quick Test Guide (No Payment - Free Version)

Payment removed! Sekarang 100% gratis untuk testing.

---

## ✅ Changes Made:

1. **Removed payment modal** - Langsung generate links
2. **Added drag & drop fields** - Kayak DocuSign!
3. **4 field types:**
   - ✍️ Signature
   - 👤 Name  
   - 📅 Date Signed
   - 📝 Text

4. **DocuSign-style UI:**
   - Left sidebar: Signers + draggable fields
   - Right side: PDF viewer
   - Top bar: Upload button + Generate button

---

## 🎯 How to Test (After Supabase Setup):

### Step 1: Upload PDF
1. Open `/sign/create.html`
2. Click "📁 Upload PDF" button
3. Choose any PDF file
4. PDF akan muncul di kanan

### Step 2: Add Signers
1. Di sidebar kiri, ketik nama (e.g., "John Doe")
2. Click "+" atau tekan Enter
3. Signer muncul dengan color badge
4. Add another signer (e.g., "Jane Smith")
5. Each signer gets different color (blue, green, orange, dll)

### Step 3: Drag & Drop Fields
1. Di dropdown "Pilih penandatangan", pilih signer (e.g., John Doe)
2. **DRAG** field dari sidebar (e.g., "Signature")
3. **DROP** ke posisi di PDF
4. Field muncul dengan color signer-nya!
5. Repeat: Drag "Name", "Date", "Text" fields
6. Switch signer dropdown untuk place fields untuk signer lain
7. Hover field → "×" button muncul untuk delete
8. Drag field lagi untuk reposition

### Step 4: Generate Links
1. Click "Generate Links" (top right)
2. Loading modal...
3. **Links modal muncul!**
4. Each signer dapat unique link dengan warna badge mereka
5. Ada "Copy" button
6. Ada "📱 Kirim via WhatsApp" button
7. Track link di bawah (untuk monitor status)

### Step 5: Test Signing
1. Copy salah satu signer link
2. Open di new tab (atau incognito)
3. PDF muncul dengan highlighted fields
4. Click "Mulai Tanda Tangan"
5. Click field pertama → Signature modal muncul
6. 3 tabs:
   - ✍️ Gambar: Draw with mouse
   - ⌨️ Ketik: Type your name
   - 📁 Upload: Upload image
7. Choose one method → "Gunakan Tanda Tangan Ini"
8. Field filled! Auto move to next field
9. Complete all fields → Click "Selesai ✓"

### Step 6: Track Status
1. Copy track link
2. Open in new tab
3. See all signers with status:
   - ✓ Signed (green badge)
   - ⏳ Pending (yellow badge)
4. Progress bar shows completion
5. Auto-refresh setiap 30 detik
6. When all done → "📥 Download PDF" button muncul

---

## 🎨 UI Features (Like DocuSign):

**Create Page:**
- Clean 2-column layout
- Left sidebar: Signer list + draggable fields
- Right side: PDF with drop zones
- Color-coded per signer
- Fields have icons (✍️👤📅📝)
- Hover effects
- Delete on hover

**Signing Page:**
- PDF with highlighted fields
- Bottom navigation bar
- Next/Previous field buttons
- Signature modal with 3 methods
- Auto-move to next field
- Progress indicator

**Status Page:**
- Clean dashboard
- Color-coded status badges
- Progress bar
- Auto-refresh
- Download button when complete

---

## 🐛 Troubleshooting:

### "Drag tidak work"
- Make sure you have PDF uploaded
- Make sure you have signer selected di dropdown
- Try refresh page

### "Fields tidak muncul di PDF"
- Check if you selected signer di dropdown
- Make sure you drop INSIDE the PDF area (white area)

### "Generate button disabled"
- Need: PDF uploaded + at least 1 signer + at least 1 field placed

### Error saat generate
- Check Supabase setup (config.js filled?)
- Check browser console (F12) for error details
- Make sure storage bucket exists

---

## 🎉 Ready to Test!

Sekarang UI nya persis kayak DocuSign tapi simpler!

**Drag & drop** field dari sidebar → place di PDF → generate links → signers tanda tangan → track status → download PDF!

Go try it! 🚀

