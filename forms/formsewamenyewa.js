// Document template
const documentTemplate = `PERJANJIAN SEWA MENYEWA TEMPAT

Perjanjian sewa menyewa tempat ini (untuk selanjutnya disebut "Perjanjian Sewa") ditandatangani dan dilangsungkan di {{tempat_penandatanganan}}, pada hari {{hari}}, tanggal {{tanggal}} bulan {{bulan}} tahun {{tahun}}, oleh dan antara:

{{nama_pemberi_sewa}}, pemilik KTP dengan nomor {{ktp_pemberi_sewa}} bertempat tinggal permanen di {{alamat_pemberi_sewa}}, untuk selanjutnya disebut "Pemberi Sewa"; dan

{{nama_penyewa}}, pemilik KTP dengan nomor {{ktp_penyewa}} bertempat tinggal permanen di {{alamat_penyewa}}, untuk selanjutnya disebut "Penyewa",

secara bersama-sama disebut sebagai PARA PIHAK.

Pemberi Sewa dan Penyewa dengan ini terlebih dahulu menerangkan hal-hal sebagai berikut:

Bahwa, Pemberi Sewa adalah pemilik yang sah atas suatu tempat yang berdiri di atas tanah hak atas tanah milik dengan Sertifikat Hak Milik (SHM) Nomor: {{nomor_shm}} atas nama {{nama_pemilik_shm}} yang setempat dikenal sebagai {{alamat_lengkap_tempat}} (selanjutnya disebut "Tempat").

Bahwa, Pemberi Sewa bermaksud untuk menyewakan Tempat tersebut kepada Penyewa sebagaimana Penyewa bermaksud untuk menyewa Tempat tersebut dari Pemberi Sewa.

Bahwa berdasarkan hal-hal tersebut di atas, Para Pihak menyatakan sepakat dan setuju untuk mengadakan dan menandatangani Perjanjian Sewa yang dilaksanakan dengan ketentuan dan syarat-syarat sebagai berikut:

PASAL 1
KESEPAKATAN SEWA-MENYEWA

Pemberi Sewa dengan ini sepakat untuk menyewakan Tempat kepada Penyewa sebagaimana Penyewa dengan ini sepakat untuk menyewa Tempat tersebut dari Pemberi Sewa.

Sewa menyewa Tempat sebagaimana dimaksud ayat (1) dilaksanakan dengan ketentuan sebagai berikut:

a. Harga Sewa sebesar Rp {{harga_sewa_angka}} ({{harga_sewa_huruf}}) ("Harga Sewa").

b. Jangka Waktu Sewa adalah untuk selama {{durasi_sewa}} bulan/tahun*, yang dimulai pada tanggal {{tanggal_mulai}} dan berakhir pada tanggal {{tanggal_akhir}} ("Masa Sewa").

PASAL 2
PEMBAYARAN

Pembayaran atas Harga Sewa dilakukan oleh Penyewa kepada Pemberi Sewa melalui transfer ke rekening bank atas nama {{nama_pemilik_rekening}} pada {{nama_bank}}, nomor rekening {{nomor_rekening}}, selambat-lambatnya pada saat penandatanganan Perjanjian ini, kecuali disepakati lain secara tertulis oleh Para Pihak.

{{#if pembayaran_bertahap}}
Apabila disepakati pembayaran secara bertahap, maka:

a. Penyewa wajib membayar deposit awal sebesar Rp {{nominal_deposit}} ({{nominal_deposit_huruf}}) pada saat penandatanganan Perjanjian ini; dan

b. Sisa Harga Sewa dibayarkan dalam {{jumlah_cicilan}} kali cicilan, masing-masing sebesar Rp {{nominal_cicilan}}, paling lambat setiap tanggal {{tanggal_pembayaran}};

c. Seluruh Harga Sewa harus telah dibayar lunas paling lambat pada tanggal {{batas_akhir_pelunasan}}.
{{/if}}

Apabila terjadi keterlambatan pembayaran, Penyewa dikenakan denda keterlambatan sebesar {{persentase_denda}}% dari jumlah yang tertunda per hari kalender keterlambatan, kecuali keterlambatan disebabkan oleh force majeure yang dibuktikan secara memadai.

Setiap pembayaran yang dilakukan oleh Penyewa wajib disertai dengan bukti transfer yang sah, dan Pemberi Sewa akan memberikan kuitansi atau tanda terima resmi sebagai bukti penerimaan.

PASAL 3
JAMINAN

Pemberi Sewa memberikan jaminan sebagai berikut:

a. Tempat yang disewakan berdasarkan Perjanjian ini sepenuhnya merupakan milik sah Pemberi Sewa, tidak sedang dijaminkan, tidak sedang dijual, tidak dalam keadaan disewa kepada pihak lain, dan bebas dari sengketa atau klaim hak dari pihak ketiga mana pun.

b. Penyewa berhak sepenuhnya untuk menggunakan dan menikmati Tempat selama Masa Sewa tanpa gangguan, tuntutan, gugatan, atau klaim dari pihak mana pun sehubungan dengan hak atas penggunaan Tempat tersebut.

Apabila di kemudian hari terbukti bahwa jaminan yang diberikan Pemberi Sewa tidak benar dan menimbulkan kerugian bagi Penyewa, maka Pemberi Sewa wajib memberikan ganti rugi penuh atas kerugian yang timbul, termasuk namun tidak terbatas pada pengembalian Harga Sewa, biaya relokasi, dan kompensasi lain yang wajar.

Penyewa menjamin bahwa selama Masa Sewa, Tempat akan digunakan dengan itikad baik, sesuai peruntukannya, tidak dialihsewakan tanpa persetujuan tertulis dari Pemberi Sewa, dan tidak digunakan untuk kegiatan yang melanggar hukum, peraturan perundang-undangan, atau ketertiban umum.

PASAL 4
PEMBEBANAN BIAYA DAN PERAWATAN

Penyewa berhak menggunakan fasilitas yang telah tersedia pada Tempat, termasuk tetapi tidak terbatas pada aliran listrik, saluran telepon, dan air bersih (misalnya dari PDAM), sepanjang biaya penggunaannya ditanggung oleh Penyewa.

Penyewa berkewajiban membayar seluruh tagihan, rekening, dan biaya-biaya lain yang timbul akibat penggunaan fasilitas sebagaimana dimaksud dalam ayat (1), tepat waktu dan sesuai ketentuan dari masing-masing penyedia jasa.

Segala kerugian atau kerusakan yang timbul akibat kelalaian atau pelanggaran oleh Penyewa atas kewajiban dalam Perjanjian ini sepenuhnya menjadi tanggung jawab Penyewa.

Penyewa wajib menjaga, merawat, dan mempertahankan Tempat dalam kondisi baik dan layak digunakan sebagaimana saat pertama kali diserahterimakan, termasuk memelihara kebersihan dan kelestarian lingkungan serta prasarana umum yang berada dalam penguasaannya.

Perawatan struktural, termasuk perbaikan atas kerusakan besar yang bukan disebabkan oleh Penyewa, menjadi tanggung jawab Pemberi Sewa, kecuali disepakati lain secara tertulis oleh Para Pihak.

PASAL 5
HAK DAN KEWAJIBAN

Selama masa berlakunya Perjanjian ini, Penyewa tidak diperkenankan untuk melakukan hal-hal berikut tanpa persetujuan tertulis terlebih dahulu dari Pemberi Sewa:

a. Mengalihkan, memindahtangankan, atau menyerahkan sebagian atau seluruh hak sewa kepada pihak ketiga, baik dalam bentuk sewa ulang (sublease), pengalihan hak, atau bentuk perikatan lainnya;

b. Menggunakan Tempat untuk tujuan lain selain yang secara tegas disepakati dalam Perjanjian ini;

c. Mendirikan bangunan tambahan, melakukan penggalian, atau pembangunan lainnya di dalam atau di sekitar Tempat, termasuk pembuatan sumur bor, tanpa izin tertulis dari Pemberi Sewa; dan/atau

d. Mengubah, memodifikasi, atau membongkar bagian dari struktur dan/atau instalasi tetap yang terdapat dalam Tempat, termasuk tetapi tidak terbatas pada instalasi listrik, saluran air, partisi permanen, atau sistem bangunan lainnya.

Yang dimaksud dengan struktur dalam ketentuan ini mencakup seluruh bagian konstruksi tetap dari Tempat yang berfungsi menopang atau membentuk bangunan, termasuk namun tidak terbatas pada fondasi, balok, kolom, lantai, dinding, dan atap.

PASAL 6
KERUSAKAN DAN BENCANA ALAM

Kerusakan pada struktur atau bagian lain dari Tempat yang timbul akibat penggunaan atau kelalaian selama masa sewa sepenuhnya menjadi tanggung jawab Penyewa, termasuk biaya perbaikan dan penggantian.

Penyewa dibebaskan dari segala tuntutan, ganti rugi, atau kewajiban kepada Pemberi Sewa atas kerusakan Tempat yang secara langsung disebabkan oleh kejadian Force Majeure, sepanjang Penyewa dapat membuktikan bahwa kerusakan tersebut bukan akibat kelalaian atau pelanggaran terhadap ketentuan Perjanjian ini.

Yang dimaksud dengan "Force Majeure" dalam Perjanjian ini mencakup namun tidak terbatas pada:

a. Bencana alam, seperti banjir, gempa bumi, tanah longsor, petir, angin topan, dan kebakaran yang disebabkan oleh faktor eksternal yang berada di luar kendali Para Pihak;

b. Kerusuhan massal, huru-hara, pemberontakan, aksi terorisme, sabotase, serta perang (baik dinyatakan maupun tidak dinyatakan); dan/atau

c. Tindakan pemerintah, peraturan baru, atau kebijakan otoritas yang secara langsung menghalangi pelaksanaan sebagian atau seluruh kewajiban dalam Perjanjian ini.

PASAL 7
SYARAT PEMUTUSAN HUBUNGAN OLEH PENYEWA

Penyewa hanya dapat mengakhiri Perjanjian ini sebelum berakhirnya Masa Sewa, dengan syarat dan ketentuan sebagai berikut:

a. Penyewa wajib memberitahukan maksud pengakhiran secara tertulis kepada Pemberi Sewa paling lambat {{jumlah_hari_pemberitahuan}} ({{huruf_hari_pemberitahuan}}) sebelum tanggal pengakhiran yang dimaksud.

Sebelum tanggal efektif pengakhiran, Penyewa telah:

a. Membayar seluruh tagihan, rekening, dan biaya lain yang timbul dari penggunaan Tempat; dan

b. Menyerahkan kembali Tempat dalam kondisi sebagaimana disyaratkan dalam Perjanjian ini, kecuali untuk keausan normal (wear and tear).

Dalam hal pemutusan dilakukan oleh Penyewa sebelum berakhirnya Masa Sewa, Penyewa tidak berhak menuntut pengembalian sebagian atau seluruh Harga Sewa atas sisa masa sewa yang belum dijalani, kecuali disepakati lain secara tertulis oleh Para Pihak.

PASAL 8
SYARAT PEMUTUSAN HUBUNGAN OLEH PEMBERI SEWA

Pemberi Sewa berhak mengakhiri Perjanjian ini sebelum berakhirnya Masa Sewa, dengan syarat-syarat berikut:

a. Penyewa melanggar atau lalai melaksanakan salah satu ketentuan atau kewajiban dalam Perjanjian ini, dan tidak memperbaiki pelanggaran tersebut dalam jangka waktu {{jumlah_hari_pelanggaran}} ({{huruf_hari_pelanggaran}}) hari kalender sejak tanggal pemberitahuan tertulis dari Pemberi Sewa; atau

b. Penyewa lalai membayar Harga Sewa, biaya perawatan, dan/atau tagihan lain yang menjadi kewajiban Penyewa, selama lebih dari {{jumlah_hari_bulan_keterlambatan}} ({{huruf_keterlambatan}}) hari/bulan* setelah tanggal jatuh tempo pembayaran.

Dalam hal Perjanjian ini diakhiri oleh Pemberi Sewa berdasarkan ayat (1), maka:

a. Penyewa wajib segera menyerahkan kembali Tempat kepada Pemberi Sewa paling lambat {{jumlah_hari_pelanggaran}} ({{huruf_hari_pelanggaran}}) hari setelah tanggal efektif pengakhiran; dan

b. Pemberi Sewa tidak berkewajiban untuk mengembalikan Harga Sewa atas sisa waktu sewa yang belum dijalani, serta berhak menuntut ganti rugi atas kerugian yang timbul akibat pelanggaran tersebut.

PASAL 9
MASA BERAKHIR KONTRAK

Setelah berakhirnya Masa Sewa sesuai dengan ketentuan dalam Perjanjian ini, Penyewa wajib mengosongkan dan menyerahkan kembali Tempat kepada Pemberi Sewa dalam keadaan baik, bersih, dan layak pakai, serta telah memenuhi seluruh kewajiban lainnya berdasarkan Perjanjian ini, kecuali apabila Para Pihak secara tertulis menyepakati perpanjangan masa sewa.

PASAL 10
HUKUM YANG BERLAKU

Perjanjian ini dan interpretasinya, penerapan dan seluruh sengketa yang timbul sehubungan dengan Perjanjian ini akan diatur dan ditafsirkan berdasarkan hukum Republik Indonesia.

PASAL 11
PERSELISIHAN DAN PENYELESAIAN PERSELISIHAN

Bilamana dalam pelaksanaan Perjanjian Sewa ini terdapat perselisihan antara Para Pihak baik dalam pelaksanaannya ataupun dalam penafsiran salah satu Pasal dalam Perjanjian Sewa ini, maka Para Pihak sepakat untuk sedapat mungkin menyelesaikan perselisihan tersebut dengan cara musyawarah dalam waktu {{batas_waktu_penyelesaian}} hari sejak salah satu pihak yang merasa dirugikan menyatakan maksudnya untuk menyelesaikan perselisihan secara tertulis kepada pihak lainnya. Apabila musyawarah telah dilakukan oleh Para Pihak, namun ternyata tidak berhasil mencapai suatu kemufakatan maka Para Pihak sepakat bahwa segala perselisihan yang timbul dari perjanjian ini akan diselesaikan melalui Pengadilan Negeri.

PASAL 12
KETENTUAN PENUTUP

Hal-hal yang belum diatur atau belum cukup diatur dalam Perjanjian Sewa ini apabila dikemudian hari dibutuhkan dan dianggap perlu akan ditetapkan tersendiri secara musyawarah dan selanjutnya akan ditetapkan dalam suatu Addendum yang berlaku mengikat Para Pihak, yang akan direkatkan dan merupakan bagian yang tidak terpisahkan dari Perjanjian Sewa ini.

Demikianlah Perjanjian Sewa Menyewa Tempat ini dibuat dalam rangkap 2 (dua), untuk masing-masing pihak, yang ditandatangani di atas kertas bermaterai cukup, yang masing-masing mempunyai kekuatan hukum yang sama dan berlaku sejak ditandatangani.`;

// Variables mapping from form to template
const variableMapping = {
  'tempat_penandatanganan': 'tempat_penandatanganan',
  'hari': 'hari',
  'tanggal': 'tanggal',
  'bulan': 'bulan',
  'tahun': 'tahun',
  'nama_pemberi_sewa': 'nama_pemberi_sewa',
  'ktp_pemberi_sewa': 'ktp_pemberi_sewa',
  'alamat_pemberi_sewa': 'alamat_pemberi_sewa',
  'nama_penyewa': 'nama_penyewa',
  'ktp_penyewa': 'ktp_penyewa',
  'alamat_penyewa': 'alamat_penyewa',
  'nomor_shm': 'nomor_shm',
  'nama_pemilik_shm': 'nama_pemilik_shm',
  'alamat_lengkap_tempat': 'alamat_lengkap_tempat',
  'harga_sewa_angka': 'harga_sewa_angka',
  'harga_sewa_huruf': 'harga_sewa_huruf',
  'durasi_sewa': 'durasi_sewa',
  'tanggal_mulai': 'tanggal_mulai',
  'tanggal_akhir': 'tanggal_akhir',
  'nama_pemilik_rekening': 'nama_pemilik_rekening',
  'nama_bank': 'nama_bank',
  'nomor_rekening': 'nomor_rekening',
  'nominal_deposit': 'nominal_deposit',
  'nominal_deposit_huruf': 'nominal_deposit_huruf',
  'jumlah_cicilan': 'jumlah_cicilan',
  'nominal_cicilan': 'nominal_cicilan',
  'tanggal_pembayaran': 'tanggal_pembayaran',
  'batas_akhir_pelunasan': 'batas_akhir_pelunasan',
  'persentase_denda': 'persentase_denda',
  'jumlah_hari_pemberitahuan': 'jumlah_hari_pemberitahuan',
  'huruf_hari_pemberitahuan': 'huruf_hari_pemberitahuan',
  'jumlah_hari_pelanggaran': 'jumlah_hari_pelanggaran',
  'huruf_hari_pelanggaran': 'huruf_hari_pelanggaran',
  'jumlah_hari_bulan_keterlambatan': 'jumlah_hari_bulan_keterlambatan',
  'huruf_keterlambatan': 'huruf_keterlambatan',
  'batas_waktu_penyelesaian': 'batas_waktu_penyelesaian'
};

// Format date to Indonesian format
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate();
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// Format date to simple format
function formatDateSimple(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Replace variables in template
function replaceVariables(template, formData) {
  let result = template;
  
  // Replace all variables - use placeholder if empty with background color for Word
  Object.keys(variableMapping).forEach(key => {
    const value = formData[key] || '';
    const placeholder = `{{${variableMapping[key]}}}`;
    // If value is empty, use placeholder with simple background that Word can render
    const replacement = value || `<mark style="background-color: #fffbe6; color: #000; padding: 2px 4px;">[${key.replace(/_/g, ' ')}]</mark>`;
    result = result.replace(new RegExp(placeholder, 'g'), replacement);
  });
  
  // Handle conditional sections
  if (!formData.pembayaran_bertahap) {
    result = result.replace(/\{\{#if pembayaran_bertahap\}\}[\s\S]*?\{\{\/if\}\}/g, '');
  } else {
    result = result.replace(/\{\{#if pembayaran_bertahap\}\}/g, '');
    result = result.replace(/\{\{\/if\}\}/g, '');
  }
  
  // Format dates - use placeholder if empty with background color for Word
  if (formData.tanggal_mulai) {
    result = result.replace(/{{tanggal_mulai}}/g, formatDate(formData.tanggal_mulai));
  } else {
    result = result.replace(/{{tanggal_mulai}}/g, '<mark style="background-color: #fffbe6; color: #000; padding: 2px 4px;">[Tanggal Mulai]</mark>');
  }
  if (formData.tanggal_akhir) {
    result = result.replace(/{{tanggal_akhir}}/g, formatDate(formData.tanggal_akhir));
  } else {
    result = result.replace(/{{tanggal_akhir}}/g, '<mark style="background-color: #fffbe6; color: #000; padding: 2px 4px;">[Tanggal Akhir]</mark>');
  }
  if (formData.batas_akhir_pelunasan) {
    result = result.replace(/{{batas_akhir_pelunasan}}/g, formatDate(formData.batas_akhir_pelunasan));
  } else {
    result = result.replace(/{{batas_akhir_pelunasan}}/g, '<mark style="background-color: #fffbe6; color: #000; padding: 2px 4px;">[Batas Akhir Pelunasan]</mark>');
  }
  
  return result;
}

// Map form fields to preview sections
const fieldToSectionMap = {
  'tempat_penandatanganan': 'section-0',
  'hari': 'section-0',
  'tanggal': 'section-0',
  'bulan': 'section-0',
  'tahun': 'section-0',
  'nama_pemberi_sewa': 'section-1',
  'ktp_pemberi_sewa': 'section-1',
  'alamat_pemberi_sewa': 'section-1',
  'nama_penyewa': 'section-2',
  'ktp_penyewa': 'section-2',
  'alamat_penyewa': 'section-2',
  'nomor_shm': 'section-3',
  'nama_pemilik_shm': 'section-3',
  'alamat_lengkap_tempat': 'section-3',
  'harga_sewa_angka': 'section-4',
  'harga_sewa_huruf': 'section-4',
  'durasi_sewa': 'section-4',
  'tanggal_mulai': 'section-4',
  'tanggal_akhir': 'section-4',
  'nama_pemilik_rekening': 'section-5',
  'nama_bank': 'section-5',
  'nomor_rekening': 'section-5',
  'pembayaran_bertahap': 'section-5',
  'nominal_deposit': 'section-5',
  'nominal_deposit_huruf': 'section-5',
  'jumlah_cicilan': 'section-5',
  'nominal_cicilan': 'section-5',
  'tanggal_pembayaran': 'section-5',
  'batas_akhir_pelunasan': 'section-5',
  'persentase_denda': 'section-5',
  'jumlah_hari_pemberitahuan': 'section-6',
  'huruf_hari_pemberitahuan': 'section-6',
  'jumlah_hari_pelanggaran': 'section-7',
  'huruf_hari_pelanggaran': 'section-7',
  'jumlah_hari_bulan_keterlambatan': 'section-7',
  'huruf_keterlambatan': 'section-7',
  'batas_waktu_penyelesaian': 'section-8'
};

// Scroll to preview section when form field is focused
function scrollToPreviewSection(fieldName) {
  const sectionId = fieldToSectionMap[fieldName];
  if (!sectionId) return;
  
  const previewSection = document.getElementById(sectionId);
  if (previewSection) {
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    previewSection.classList.add('preview-section--active');
    setTimeout(() => {
      previewSection.classList.remove('preview-section--active');
    }, 2000);
  }
}

// Generate preview HTML with blur effect
function generatePreview(formData) {
  const preview = document.getElementById('documentPreview');
  if (!preview) return;
  
  const template = documentTemplate;
  const sections = template.split(/\n\n+/);
  
  let html = '<div class="preview-document-content">';
  let sectionIndex = 0;
  
  sections.forEach((section, index) => {
    const hasVariable = /{{[^}]+}}/.test(section);
    
    if (hasVariable) {
      // Section with variables - show with placeholders
      let sectionHtml = section;
      const sectionId = `section-${sectionIndex}`;
      
      // Replace variables with form data or show placeholder
      Object.keys(variableMapping).forEach(key => {
        const value = formData[key] || '';
        const placeholder = `{{${variableMapping[key]}}}`;
        if (value) {
          sectionHtml = sectionHtml.replace(new RegExp(placeholder, 'g'), `<span class="filled-field">${value}</span>`);
        } else {
          sectionHtml = sectionHtml.replace(new RegExp(placeholder, 'g'), `<span class="placeholder-field">[${key.replace(/_/g, ' ')}]</span>`);
        }
      });
      
      // Format dates
      if (formData.tanggal_mulai) {
        sectionHtml = sectionHtml.replace(/{{tanggal_mulai}}/g, `<span class="filled-field">${formatDate(formData.tanggal_mulai)}</span>`);
      }
      if (formData.tanggal_akhir) {
        sectionHtml = sectionHtml.replace(/{{tanggal_akhir}}/g, `<span class="filled-field">${formatDate(formData.tanggal_akhir)}</span>`);
      }
      if (formData.batas_akhir_pelunasan) {
        sectionHtml = sectionHtml.replace(/{{batas_akhir_pelunasan}}/g, `<span class="filled-field">${formatDate(formData.batas_akhir_pelunasan)}</span>`);
      }
      
      // Handle conditional
      if (section.includes('{{#if pembayaran_bertahap}}')) {
        if (formData.pembayaran_bertahap) {
          sectionHtml = sectionHtml.replace(/\{\{#if pembayaran_bertahap\}\}/g, '');
          sectionHtml = sectionHtml.replace(/\{\{\/if\}\}/g, '');
        } else {
          sectionHtml = '';
        }
      }
      
      sectionHtml = sectionHtml.replace(/\n/g, '<br>');
      html += `<div id="${sectionId}" class="preview-section preview-section--has-variable">${sectionHtml}</div>`;
      sectionIndex++;
    } else {
      // Section without variables - blur it
      const blurredText = section.replace(/\n/g, '<br>');
      html += `<div class="preview-section preview-section--blurred">${blurredText}</div>`;
    }
  });
  
  html += '</div>';
  preview.innerHTML = html;
}

// Collect form data
function collectFormData() {
  const form = document.getElementById('documentForm');
  const formData = new FormData(form);
  const data = {};
  
  // Get all form values
  formData.forEach((value, key) => {
    data[key] = value;
  });
  
  // Handle checkbox
  data.pembayaran_bertahap = document.getElementById('pembayaran_bertahap').checked;
  
  return data;
}

// Calculate and update progress
function updateProgress() {
  const formData = collectFormData();
  const form = document.getElementById('documentForm');
  const allFields = form.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea');
  
  let filledCount = 0;
  let totalFields = 0;
  
  allFields.forEach(field => {
    // Skip fields that are conditionally hidden
    if (field.closest('#pembayaran_bertahap_fields') && !formData.pembayaran_bertahap) {
      return;
    }
    
    totalFields++;
    if (field.value && field.value.trim() !== '') {
      filledCount++;
    }
  });
  
  // Also count checkbox
  totalFields++;
  if (formData.pembayaran_bertahap) {
    filledCount++;
  }
  
  const percentage = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;
  
  // Update progress bar
  const progressBarFill = document.getElementById('progressBarFill');
  const progressPercentage = document.getElementById('progressPercentage');
  
  if (progressBarFill) {
    progressBarFill.style.width = `${percentage}%`;
  }
  
  if (progressPercentage) {
    progressPercentage.textContent = `${percentage}%`;
  }
}

// Helper function to bold text within quotation marks (excluding HTML attributes)
function boldQuotedText(text) {
  // First, protect HTML tags and attributes by replacing them temporarily
  const htmlPlaceholders = [];
  let protectedText = text.replace(/<[^>]+>/g, (match) => {
    const index = htmlPlaceholders.length;
    htmlPlaceholders.push(match);
    return `__HTML_PLACEHOLDER_${index}__`;
  });
  
  // Now apply bold to quoted text
  protectedText = protectedText.replace(/"([^"]+)"/g, '<strong>"$1"</strong>');
  
  // Restore HTML tags
  htmlPlaceholders.forEach((html, index) => {
    protectedText = protectedText.replace(`__HTML_PLACEHOLDER_${index}__`, html);
  });
  
  return protectedText;
}

// Generate Word document using HTML to Word conversion
function generateWordDocument(formData) {
  const fullDocument = replaceVariables(documentTemplate, formData);
  const sections = fullDocument.split('\n\n');
  
  // Separate title from content
  let titleSection = '';
  let contentSections = [];
  let foundTitle = false;
  
  sections.forEach(para => {
    if (!foundTitle && para.trim().includes('PERJANJIAN')) {
      titleSection = para.trim();
      foundTitle = true;
    } else if (foundTitle) {
      contentSections.push(para);
    }
  });
  
  // Create HTML content for Word document
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        :root {
          --page-width: 800px;
          --page-padding: 48px;
          --radius: 10px;
          --border: 1px solid rgba(0,0,0,.08);
          --shadow: 0 10px 30px rgba(0,0,0,.08);
          --text: #1d1d1f;
          --muted: #6b7280;
        }
        
        * { box-sizing: border-box; }
        
        html, body { height: 100%; }
        
        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
          line-height: 1.65;
          color: var(--text);
          background: transparent;
          display: flex;
          justify-content: center;
          padding: 40px 16px;
        }
        
        .doc {
          width: 100%;
          max-width: var(--page-width);
          background: #fff;
          border: var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: var(--page-padding);
        }
        
        h1, h2, h3 {
          margin: 0 0 14px 0;
          font-weight: 650;
          letter-spacing: .2px;
          text-align: center;
        }
        
        h1 { 
          font-size: 26px; 
          text-transform: uppercase;
          page-break-after: always;
        }
        
        h2 { 
          font-size: 18px; 
          padding-top: 12px; 
          border-top: 1px solid #eee;
          page-break-after: avoid;
        }
        
        h3 { font-size: 16px; color: var(--muted); text-transform: uppercase; }
        
        p { 
          margin: 10px 0;
          text-align: justify;
        }
        
        .spacer { height: 10px; }
        
        hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }
        
        .signature-page {
          margin-top: 40px;
          page-break-before: always;
        }
        
        .signature-box {
          border: 2px solid #000;
          padding: 40px 30px;
          display: grid;
          grid-template-columns: 1fr 2px 1fr;
          gap: 0;
          min-height: 300px;
        }
        
        .signature-column {
          display: flex;
          flex-direction: column;
          padding: 0 20px;
        }
        
        .signature-divider {
          width: 2px;
          background: #000;
          margin: 0;
        }
        
        .party-title {
          margin: 0 0 20px 0;
          font-weight: 700;
          font-size: 16px;
          text-align: left;
          letter-spacing: 0.5px;
        }
        
        .signature-space {
          flex: 1;
          min-height: 120px;
        }
        
        .signature-line {
          border-bottom: 2px solid #000;
          margin: 0 0 8px 0;
        }
        
        .name-label {
          margin: 0;
          font-size: 14px;
          text-align: left;
          font-weight: 400;
        }
        
        .note { color: var(--muted); font-size: 13px; }
        
        .placeholder { 
          background: #fffbe6; 
          border: 1px dashed #f1c40f; 
          padding: 2px 4px; 
          border-radius: 4px; 
        }
        
        strong { font-weight: 700; }
      </style>
    </head>
    <body>
      <div class="doc">
        <!-- Title Page -->
        <h1>${boldQuotedText(titleSection)}</h1>
        
        <!-- Content Pages -->
        ${contentSections.map(para => {
          if (para.trim().startsWith('PASAL')) {
            return `<h2>${boldQuotedText(para.replace(/\n/g, '<br>'))}</h2>`;
          } else {
            return `<p>${boldQuotedText(para.replace(/\n/g, '<br>'))}</p>`;
          }
        }).join('')}
        
        <div class="spacer"></div>
        <hr>
        
        <div style="margin-top: 40px; page-break-before: always;">
          <table style="width: 100%; border: 2px solid #000; border-collapse: collapse;">
            <tr>
              <td style="width: 50%; padding: 40px 30px; border-right: 2px solid #000; vertical-align: top;">
                <p style="margin: 0 0 100px 0; font-weight: 700; font-size: 16px;"><strong>PIHAK PERTAMA</strong></p>
                <hr style="border: none; border-bottom: 2px solid #000; margin: 0 0 8px 0;">
                <p style="margin: 0; font-size: 14px;">Nama:</p>
              </td>
              <td style="width: 50%; padding: 40px 30px; vertical-align: top;">
                <p style="margin: 0 0 100px 0; font-weight: 700; font-size: 16px;"><strong>PIHAK KEDUA</strong></p>
                <hr style="border: none; border-bottom: 2px solid #000; margin: 0 0 8px 0;">
                <p style="margin: 0; font-size: 14px;">Nama:</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Create blob and download
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword'
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Perjanjian_Sewa_Menyewa_Tempat.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('documentForm');
  const preview = document.getElementById('documentPreview');
  
  if (!form || !preview) return;
  
  // Handle navigation sidebar
  const navSections = document.querySelectorAll('.form-nav-section');
  const navItems = document.querySelectorAll('.form-nav-item');
  const formGroups = document.querySelectorAll('.form-group--collapsible');
  
  // Expand first section by default
  if (navSections.length > 0) {
    navSections[0].classList.add('is-expanded');
  }
  
  // Handle parent nav item clicks (expand/collapse)
  navSections.forEach(section => {
    const parentButton = section.querySelector('.form-nav-item--parent');
    if (parentButton) {
      parentButton.addEventListener('click', () => {
        section.classList.toggle('is-expanded');
      });
    }
  });
  
  // Handle submenu nav item clicks (navigate to form group)
  navItems.forEach(item => {
    if (!item.classList.contains('form-nav-item--parent')) {
      item.addEventListener('click', () => {
        const groupId = item.dataset.group;
        
        // Update active state
        navItems.forEach(i => {
          if (!i.classList.contains('form-nav-item--parent')) {
            i.classList.remove('is-active');
          }
        });
        item.classList.add('is-active');
        
        // Close all form groups, then open only the selected one
        formGroups.forEach(group => {
          group.classList.remove('is-expanded');
        });
        
        // Show only the relevant form group
        formGroups.forEach(group => {
          if (group.dataset.group === groupId) {
            group.classList.add('is-expanded');
          }
        });
      });
    }
  });
  
  
  // Toggle pembayaran bertahap fields
  const pembayaranBertahapCheckbox = document.getElementById('pembayaran_bertahap');
  const pembayaranBertahapFields = document.getElementById('pembayaran_bertahap_fields');
  
  if (pembayaranBertahapCheckbox && pembayaranBertahapFields) {
    pembayaranBertahapCheckbox.addEventListener('change', (e) => {
      pembayaranBertahapFields.style.display = e.target.checked ? 'block' : 'none';
    });
  }
  
  // Update preview and progress on input
  form.addEventListener('input', () => {
    const formData = collectFormData();
    generatePreview(formData);
    updateProgress();
  });
  
  // Update progress on checkbox change
  if (pembayaranBertahapCheckbox) {
    pembayaranBertahapCheckbox.addEventListener('change', () => {
      updateProgress();
    });
  }
  
  // Add focus event listeners to all form fields for auto-scroll
  const formFields = form.querySelectorAll('input, textarea, select');
  formFields.forEach(field => {
    field.addEventListener('focus', () => {
      scrollToPreviewSection(field.name || field.id);
    });
  });
  
  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = collectFormData();
    
    // Show loading overlay
    const loader = document.getElementById('downloadLoader');
    if (loader) {
      loader.classList.add('is-visible');
    }
    
    // Disable button
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = true;
    generateBtn.textContent = 'Processing...';
    
    // Wait 1.2 seconds for processing animation
    setTimeout(() => {
      try {
        // Show success state
        const spinner = document.getElementById('loaderSpinner');
        const success = document.getElementById('loaderSuccess');
        const loaderText = document.getElementById('loaderText');
        
        if (spinner) spinner.style.display = 'none';
        if (success) success.style.display = 'block';
        if (loaderText) loaderText.textContent = 'Dokumen siap diunduh!';
        
        // Generate document after success animation
        setTimeout(() => {
          generateWordDocument(formData);
          
          // Hide loader after download starts
          setTimeout(() => {
            if (loader) {
              loader.classList.remove('is-visible');
            }
            // Reset loader state
            if (spinner) spinner.style.display = 'block';
            if (success) success.style.display = 'none';
            if (loaderText) loaderText.textContent = 'Memproses dokumen Anda...';
            
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate & Download Dokumen';
          }, 800);
        }, 600);
      } catch (error) {
        console.error('Error generating document:', error);
        if (loader) {
          loader.classList.remove('is-visible');
        }
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate & Download Dokumen';
        alert('Terjadi kesalahan saat membuat dokumen. Silakan coba lagi.');
      }
    }, 1200);
  });
  
  // Initial preview and progress
  generatePreview({});
  updateProgress();
});

