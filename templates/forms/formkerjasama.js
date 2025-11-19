// HTML Document template with proper styling
const documentTemplate = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perjanjian Kerjasama</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        
        body {
            font-family: 'Poppins', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            line-height: 1.6;
            color: #000;
            background: #fff;
        }
        h1 {
            text-align: center;
            font-weight: bold;
            margin-bottom: 30px;
        }
        p {
            text-align: justify;
            margin: 15px 0;
        }
        .section-title {
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
        ol {
            margin-left: 20px;
        }
        ol ol {
            list-style-type: lower-alpha;
        }
        li {
            margin: 10px 0;
        }
        .signature-table {
            width: 100%;
            margin-top: 40px;
            border-collapse: collapse;
        }
        .signature-table td {
            width: 50%;
            padding: 20px;
            vertical-align: top;
            text-align: center;
        }
        .signature-line {
            margin-top: 80px;
            border-bottom: 1px solid #000;
            width: 200px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
    <h1>PERJANJIAN KERJASAMA</h1>

    <p>Perjanjian kerjasama ini (untuk selanjutnya disebut "<strong>Perjanjian</strong>") ditandatangani dan dilangsungkan di {{tempat_penandatanganan}}, pada hari {{hari}}, tanggal {{tanggal}} bulan {{bulan}} tahun {{tahun}}, oleh dan antara:</p>

    <ol>
        <li>{{nama_pihak_pertama}}, pemilik KTP dengan nomor {{ktp_pihak_pertama}} bertempat tinggal permanen di {{alamat_pihak_pertama}}, untuk selanjutnya disebut "<strong>Pihak Pertama</strong>"; dan</li>
        <li>{{nama_pihak_kedua}}, pemilik KTP dengan nomor {{ktp_pihak_kedua}} bertempat tinggal permanen di {{alamat_pihak_kedua}}, untuk selanjutnya disebut "<strong>Pihak Kedua</strong>",</li>
    </ol>

    <p>secara bersama-sama disebut sebagai <strong>PARA PIHAK</strong>.</p>

    <p><strong>Pihak Pertama</strong> dan <strong>Pihak Kedua</strong> dengan ini terlebih dahulu menerangkan hal-hal sebagai berikut:</p>

    <ol>
        <li>Bahwa Pihak Pertama adalah {{deskripsi_pihak_pertama}}.</li>
        <li>Bahwa Pihak Kedua adalah {{deskripsi_pihak_kedua}}.</li>
        <li>Bahwa Para Pihak bermaksud untuk mengadakan kerjasama dalam bidang {{bidang_kerjasama}}.</li>
        <li>Bahwa Para Pihak sepakat untuk mengatur hak dan kewajiban masing-masing dalam kerjasama ini melalui Perjanjian ini.</li>
    </ol>

    <p>Maka dengan ini, Para Pihak sepakat untuk membuat dan menandatangani Perjanjian Kerjasama ini dengan syarat dan ketentuan sebagai berikut:</p>

    <div class="section-title">PASAL 1<br>RUANG LINGKUP KERJASAMA</div>

    <ol>
        <li>Para Pihak sepakat untuk melakukan kerjasama dalam bidang {{bidang_kerjasama}}.</li>
        <li>Ruang lingkup kerjasama meliputi:
            <ol>
                <li>{{ruang_lingkup_1}}</li>
                <li>{{ruang_lingkup_2}}</li>
                <li>{{ruang_lingkup_3}}</li>
            </ol>
        </li>
        <li>Kerjasama ini dilakukan di wilayah {{wilayah_kerjasama}}.</li>
    </ol>

    <div class="section-title">PASAL 2<br>HAK DAN KEWAJIBAN PIHAK PERTAMA</div>

    <ol>
        <li>Pihak Pertama berhak:
            <ol>
                <li>{{hak_pihak_pertama_1}}</li>
                <li>{{hak_pihak_pertama_2}}</li>
                <li>{{hak_pihak_pertama_3}}</li>
            </ol>
        </li>
        <li>Pihak Pertama berkewajiban:
            <ol>
                <li>{{kewajiban_pihak_pertama_1}}</li>
                <li>{{kewajiban_pihak_pertama_2}}</li>
                <li>{{kewajiban_pihak_pertama_3}}</li>
            </ol>
        </li>
    </ol>

    <div class="section-title">PASAL 3<br>HAK DAN KEWAJIBAN PIHAK KEDUA</div>

    <ol>
        <li>Pihak Kedua berhak:
            <ol>
                <li>{{hak_pihak_kedua_1}}</li>
                <li>{{hak_pihak_kedua_2}}</li>
                <li>{{hak_pihak_kedua_3}}</li>
            </ol>
        </li>
        <li>Pihak Kedua berkewajiban:
            <ol>
                <li>{{kewajiban_pihak_kedua_1}}</li>
                <li>{{kewajiban_pihak_kedua_2}}</li>
                <li>{{kewajiban_pihak_kedua_3}}</li>
            </ol>
        </li>
    </ol>

    <div class="section-title">PASAL 4<br>JANGKA WAKTU</div>

    <p>Perjanjian ini berlaku selama {{jangka_waktu}} terhitung sejak tanggal {{tanggal_mulai}} sampai dengan tanggal {{tanggal_akhir}}.</p>

    <div class="section-title">PASAL 5<br>PEMBAGIAN HASIL</div>

    <ol>
        <li>Para Pihak sepakat bahwa pembagian hasil dari kerjasama ini adalah sebagai berikut:
            <ol>
                <li>Pihak Pertama memperoleh {{persen_pihak_pertama}}% dari hasil kerjasama.</li>
                <li>Pihak Kedua memperoleh {{persen_pihak_kedua}}% dari hasil kerjasama.</li>
            </ol>
        </li>
        <li>Pembagian hasil dilakukan setiap {{periode_pembagian}}.</li>
        <li>Perhitungan dan pembagian hasil harus disertai dengan laporan keuangan yang transparan.</li>
    </ol>

    <div class="section-title">PASAL 6<br>KONTRIBUSI DAN BIAYA</div>

    <ol>
        <li>Pihak Pertama berkontribusi berupa {{kontribusi_pihak_pertama}}.</li>
        <li>Pihak Kedua berkontribusi berupa {{kontribusi_pihak_kedua}}.</li>
        <li>Biaya operasional kerjasama ditanggung oleh {{penanggung_jawab_biaya}}.</li>
        <li>Segala biaya yang timbul dalam pelaksanaan kerjasama ini akan diatur lebih lanjut berdasarkan kesepakatan Para Pihak.</li>
    </ol>

    <div class="section-title">PASAL 7<br>KERAHASIAAN</div>

    <ol>
        <li>Para Pihak sepakat untuk menjaga kerahasiaan informasi yang diperoleh selama masa kerjasama.</li>
        <li>Informasi yang bersifat rahasia meliputi namun tidak terbatas pada data bisnis, strategi pemasaran, informasi keuangan, dan hal-hal lain yang disepakati sebagai rahasia.</li>
        <li>Kewajiban kerahasiaan ini tetap berlaku selama {{masa_kerahasiaan}} setelah berakhirnya Perjanjian ini.</li>
        <li>Pelanggaran terhadap ketentuan kerahasiaan dapat mengakibatkan pengakhiran Perjanjian dan tuntutan ganti rugi.</li>
    </ol>

    <div class="section-title">PASAL 8<br>PERPANJANGAN DAN PENGAKHIRAN</div>

    <ol>
        <li>Perjanjian ini dapat diperpanjang atas kesepakatan kedua belah pihak secara tertulis paling lambat {{waktu_notifikasi_perpanjangan}} sebelum berakhirnya jangka waktu Perjanjian.</li>
        <li>Perjanjian ini dapat diakhiri sebelum jangka waktu berakhir apabila:
            <ol>
                <li>Terjadi kesepakatan tertulis dari kedua belah pihak untuk mengakhiri kerjasama.</li>
                <li>Salah satu pihak melanggar ketentuan Perjanjian ini secara material dan tidak melakukan perbaikan dalam waktu {{waktu_perbaikan}} setelah menerima pemberitahuan tertulis.</li>
                <li>Salah satu pihak dinyatakan pailit atau dalam proses likuidasi.</li>
                <li>Terjadi force majeure yang berlangsung lebih dari {{durasi_force_majeure}}.</li>
            </ol>
        </li>
        <li>Pihak yang ingin mengakhiri Perjanjian wajib memberitahukan secara tertulis kepada pihak lainnya paling lambat {{waktu_notifikasi_pengakhiran}} sebelum tanggal pengakhiran yang diinginkan.</li>
        <li>Dalam hal pengakhiran, Para Pihak wajib menyelesaikan seluruh hak dan kewajiban yang telah timbul hingga tanggal efektif pengakhiran.</li>
    </ol>

    <div class="section-title">PASAL 9<br>FORCE MAJEURE</div>

    <ol>
        <li>Yang dimaksud dengan force majeure adalah kejadian yang terjadi di luar kemampuan dan kekuasaan Para Pihak, termasuk namun tidak terbatas pada bencana alam, perang, huru-hara, kebakaran, wabah penyakit, dan kebijakan pemerintah yang berdampak langsung pada pelaksanaan Perjanjian ini.</li>
        <li>Pihak yang mengalami force majeure wajib memberitahukan kepada pihak lainnya secara tertulis dalam waktu paling lambat {{waktu_notifikasi_force_majeure}} sejak terjadinya kejadian force majeure.</li>
        <li>Selama terjadinya force majeure, kewajiban Para Pihak yang terhalang oleh force majeure akan ditangguhkan.</li>
        <li>Apabila force majeure berlangsung lebih dari {{durasi_max_force_majeure}}, maka Para Pihak berhak untuk mengakhiri Perjanjian ini tanpa ada kewajiban ganti rugi.</li>
    </ol>

    <div class="section-title">PASAL 10<br>PENYELESAIAN SENGKETA</div>

    <ol>
        <li>Setiap perselisihan atau perbedaan pendapat yang timbul dari pelaksanaan Perjanjian ini akan diselesaikan terlebih dahulu melalui musyawarah untuk mufakat dalam waktu paling lambat {{waktu_musyawarah}} sejak terjadinya sengketa.</li>
        <li>Apabila penyelesaian melalui musyawarah tidak tercapai, maka Para Pihak sepakat untuk menyelesaikan sengketa melalui {{forum_penyelesaian_sengketa}}.</li>
        <li>Selama proses penyelesaian sengketa berlangsung, Para Pihak tetap melaksanakan kewajiban yang tidak berhubungan dengan pokok sengketa.</li>
    </ol>

    <div class="section-title">PASAL 11<br>KETENTUAN LAIN-LAIN</div>

    <ol>
        <li>Perjanjian ini dibuat dalam bahasa Indonesia dan tunduk pada hukum Republik Indonesia.</li>
        <li>Segala perubahan atau penambahan terhadap Perjanjian ini harus dilakukan secara tertulis dan ditandatangani oleh kedua belah pihak.</li>
        <li>Apabila salah satu ketentuan dalam Perjanjian ini dinyatakan tidak sah atau tidak dapat dilaksanakan, maka hal tersebut tidak mempengaruhi keabsahan ketentuan lainnya.</li>
        <li>Para Pihak tidak diperkenankan untuk mengalihkan hak dan kewajiban berdasarkan Perjanjian ini kepada pihak ketiga tanpa persetujuan tertulis dari pihak lainnya.</li>
    </ol>

    <div class="section-title">PASAL 12<br>KETENTUAN PENUTUP</div>

    <p>Hal-hal yang belum diatur atau belum cukup diatur dalam Perjanjian ini akan diatur kemudian dalam suatu addendum yang disepakati oleh Para Pihak dan merupakan bagian yang tidak terpisahkan dari Perjanjian ini.</p>

    <p>Demikianlah Perjanjian ini dibuat dalam rangkap 2 (dua), bermaterai cukup, untuk masing-masing pihak dan mempunyai kekuatan hukum yang sama.</p>

    <table class="signature-table">
        <tr>
            <td>
                <strong>PIHAK PERTAMA</strong>
                <div class="signature-line"></div>
                <p>Nama:</p>
            </td>
            <td>
                <strong>PIHAK KEDUA</strong>
                <div class="signature-line"></div>
                <p>Nama:</p>
            </td>
        </tr>
    </table>
</body>
</html>`;

// Variable mapping
const variableMapping = {
  tempat_penandatanganan: 'tempat_penandatanganan',
  hari: 'hari',
  tanggal: 'tanggal',
  bulan: 'bulan',
  tahun: 'tahun',
  nama_pihak_pertama: 'nama_pihak_pertama',
  ktp_pihak_pertama: 'ktp_pihak_pertama',
  alamat_pihak_pertama: 'alamat_pihak_pertama',
  nama_pihak_kedua: 'nama_pihak_kedua',
  ktp_pihak_kedua: 'ktp_pihak_kedua',
  alamat_pihak_kedua: 'alamat_pihak_kedua',
  deskripsi_pihak_pertama: 'deskripsi_pihak_pertama',
  deskripsi_pihak_kedua: 'deskripsi_pihak_kedua',
  bidang_kerjasama: 'bidang_kerjasama',
  ruang_lingkup_1: 'ruang_lingkup_1',
  ruang_lingkup_2: 'ruang_lingkup_2',
  ruang_lingkup_3: 'ruang_lingkup_3',
  wilayah_kerjasama: 'wilayah_kerjasama',
  hak_pihak_pertama_1: 'hak_pihak_pertama_1',
  hak_pihak_pertama_2: 'hak_pihak_pertama_2',
  hak_pihak_pertama_3: 'hak_pihak_pertama_3',
  kewajiban_pihak_pertama_1: 'kewajiban_pihak_pertama_1',
  kewajiban_pihak_pertama_2: 'kewajiban_pihak_pertama_2',
  kewajiban_pihak_pertama_3: 'kewajiban_pihak_pertama_3',
  hak_pihak_kedua_1: 'hak_pihak_kedua_1',
  hak_pihak_kedua_2: 'hak_pihak_kedua_2',
  hak_pihak_kedua_3: 'hak_pihak_kedua_3',
  kewajiban_pihak_kedua_1: 'kewajiban_pihak_kedua_1',
  kewajiban_pihak_kedua_2: 'kewajiban_pihak_kedua_2',
  kewajiban_pihak_kedua_3: 'kewajiban_pihak_kedua_3',
  jangka_waktu: 'jangka_waktu',
  tanggal_mulai: 'tanggal_mulai',
  tanggal_akhir: 'tanggal_akhir',
  persen_pihak_pertama: 'persen_pihak_pertama',
  persen_pihak_kedua: 'persen_pihak_kedua',
  periode_pembagian: 'periode_pembagian',
  kontribusi_pihak_pertama: 'kontribusi_pihak_pertama',
  kontribusi_pihak_kedua: 'kontribusi_pihak_kedua',
  penanggung_jawab_biaya: 'penanggung_jawab_biaya',
  masa_kerahasiaan: 'masa_kerahasiaan',
  waktu_notifikasi_perpanjangan: 'waktu_notifikasi_perpanjangan',
  waktu_perbaikan: 'waktu_perbaikan',
  durasi_force_majeure: 'durasi_force_majeure',
  waktu_notifikasi_pengakhiran: 'waktu_notifikasi_pengakhiran',
  waktu_notifikasi_force_majeure: 'waktu_notifikasi_force_majeure',
  durasi_max_force_majeure: 'durasi_max_force_majeure',
  waktu_musyawarah: 'waktu_musyawarah',
  forum_penyelesaian_sengketa: 'forum_penyelesaian_sengketa'
};

// Format date to Indonesian
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Replace variables in template
function replaceVariables(template, data) {
  let result = template;
  
  // Format dates
  if (data.tanggal_mulai) {
    data.tanggal_mulai = formatDate(data.tanggal_mulai);
  }
  if (data.tanggal_akhir) {
    data.tanggal_akhir = formatDate(data.tanggal_akhir);
  }
  
  // Replace all variables with highlight for empty values
  Object.keys(variableMapping).forEach(key => {
    const value = data[key];
    const regex = new RegExp(`{{${key}}}`, 'g');
    
    if (value && value !== '') {
      result = result.replace(regex, value);
    } else {
      // For Word document, use highlighted placeholder
      result = result.replace(regex, `<mark style="background-color: #F5F5F5; padding: 2px 4px;">[${key.replace(/_/g, ' ')}]</mark>`);
    }
  });
  
  return result;
}

// Generate preview with highlighted sections
function generatePreview(formData) {
  const preview = document.getElementById('documentPreview');
  if (!preview) return;
  
  let htmlContent = replaceVariables(documentTemplate, formData);
  
  // Extract body content only for preview
  const bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
  if (bodyMatch) {
    htmlContent = bodyMatch[1];
  }
  
  // For preview, convert mark tags to placeholder-field spans with better styling
  htmlContent = htmlContent.replace(/<mark[^>]*>\[([^\]]+)\]<\/mark>/g, 
    '<span class="placeholder-field">[$1]</span>');
  
  preview.innerHTML = htmlContent;
}

// Collect form data
function collectFormData() {
  const form = document.getElementById('documentForm');
  const data = {};
  
  Object.keys(variableMapping).forEach(key => {
    const element = form.elements[key];
    if (element) {
      data[key] = element.value || '';
    }
  });
  
  return data;
}

// Update progress bar
function updateProgress() {
  const form = document.getElementById('documentForm');
  const allFields = form.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea');
  
  let filledCount = 0;
  let totalCount = 0;
  
  allFields.forEach(field => {
    totalCount++;
    if (field.value && field.value.trim() !== '') {
      filledCount++;
    }
  });
  
  const percentage = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;
  
  const progressBarFill = document.getElementById('progressBarFill');
  const progressPercentage = document.getElementById('progressPercentage');
  
  if (progressBarFill) {
    progressBarFill.style.width = `${percentage}%`;
  }
  if (progressPercentage) {
    progressPercentage.textContent = `${percentage}%`;
  }
}

// Generate and download Word document
function generateWordDocument(formData) {
  const fullHtml = replaceVariables(documentTemplate, formData);
  
  // Create blob
  const blob = new Blob(['\ufeff', fullHtml], {
    type: 'application/msword'
  });
  
  // Download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Perjanjian_Kerjasama.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('documentForm');
  const preview = document.getElementById('documentPreview');
  
  // Initialize preview
  generatePreview({});
  updateProgress();
  
  // Navigation functionality
  const navSections = document.querySelectorAll('.form-nav-section');
  const navItems = document.querySelectorAll('.form-nav-item');
  const formGroups = document.querySelectorAll('.form-group--collapsible');
  
  // Handle parent section toggle
  navSections.forEach(section => {
    const parentButton = section.querySelector('.form-nav-item--parent');
    if (parentButton) {
      parentButton.addEventListener('click', () => {
        section.classList.toggle('is-expanded');
      });
    }
  });
  
  // Handle navigation item clicks
  navItems.forEach(item => {
    if (!item.classList.contains('form-nav-item--parent')) {
      item.addEventListener('click', () => {
        // Remove active from all items
        navItems.forEach(i => i.classList.remove('is-active'));
        // Add active to clicked item
        item.classList.add('is-active');
        
        // Get group name
        const groupName = item.getAttribute('data-group');
        if (!groupName) return;
        
        // Close all form groups
        formGroups.forEach(group => {
          group.classList.remove('is-expanded');
        });
        
        // Open target group
        const group = document.querySelector(`[data-group="${groupName}"].form-group--collapsible`);
        if (group) {
            group.classList.add('is-expanded');
          }
      });
    }
  });
  
  // Update preview and progress on input
  form.addEventListener('input', () => {
    const formData = collectFormData();
    generatePreview(formData);
    updateProgress();
  });
  
  // Auto-scroll preview to corresponding section when field is focused
  const formFields = form.querySelectorAll('input, textarea, select');
  formFields.forEach(field => {
    field.addEventListener('focus', () => {
      const fieldName = field.getAttribute('name') || field.getAttribute('id');
      if (!fieldName || !preview) return;
      
      // Convert field name to search term (e.g., "nama_pihak_pertama" -> "nama pihak pertama")
      const searchTerm = fieldName.replace(/_/g, ' ').toLowerCase();
      
      // Get all text content and find matches
      const previewHTML = preview.innerHTML.toLowerCase();
      const searchPattern = `[${searchTerm}]`;
      
      if (previewHTML.includes(searchPattern)) {
        // Find the placeholder element
        const placeholders = preview.querySelectorAll('.placeholder-field');
        
        for (const placeholder of placeholders) {
          const placeholderText = placeholder.textContent.toLowerCase();
          
          if (placeholderText.includes(searchTerm)) {
            // Get the scrollable container (preview-content parent)
            const scrollContainer = preview.closest('.preview-content');
            
            if (scrollContainer) {
              // Calculate position
              const placeholderRect = placeholder.getBoundingClientRect();
              const containerRect = scrollContainer.getBoundingClientRect();
              const relativeTop = placeholderRect.top - containerRect.top + scrollContainer.scrollTop;
              
              // Scroll to center the placeholder in view
              const scrollTo = relativeTop - (scrollContainer.clientHeight / 2) + (placeholderRect.height / 2);
              
              scrollContainer.scrollTo({
                top: Math.max(0, scrollTo),
                behavior: 'smooth'
              });
              
              // Add temporary highlight
              placeholder.style.transition = 'all 0.3s ease';
              placeholder.style.transform = 'scale(1.05)';
              placeholder.style.boxShadow = '0 0 0 3px rgba(245, 198, 68, 0.3)';
              
              setTimeout(() => {
                placeholder.style.transform = 'scale(1)';
                placeholder.style.boxShadow = '';
              }, 1500);
            }
            break;
          }
        }
      }
    });
  });
  
  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = collectFormData();
    const loader = document.getElementById('downloadLoader');
    
    if (loader) {
      loader.style.display = 'flex';
    }
    
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
    generateBtn.disabled = true;
    }
    
    try {
      // Simulate processing with animation
    setTimeout(() => {
        const spinner = document.getElementById('loaderSpinner');
        const success = document.getElementById('loaderSuccess');
        const loaderText = document.getElementById('loaderText');
        
        if (spinner) spinner.style.display = 'none';
        if (success) success.style.display = 'block';
        if (loaderText) loaderText.textContent = 'Dokumen berhasil dibuat!';
        
        // Generate document
        generateWordDocument(formData);
        
        // Hide loader after download
        setTimeout(() => {
          if (loader) loader.style.display = 'none';
          if (generateBtn) generateBtn.disabled = false;
            if (spinner) spinner.style.display = 'block';
            if (success) success.style.display = 'none';
            if (loaderText) loaderText.textContent = 'Memproses dokumen Anda...';
        }, 2000);
      }, 1500);
            
      } catch (error) {
        console.error('Error generating document:', error);
      if (loader) loader.style.display = 'none';
      if (generateBtn) generateBtn.disabled = false;
        alert('Terjadi kesalahan saat membuat dokumen. Silakan coba lagi.');
      }
  });
});
