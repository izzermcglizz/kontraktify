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

// Replace variables in template (forPreview adds data-field for live preview scroll/highlight)
function replaceVariables(template, data, forPreview = false) {
  let result = template;
  const previewData = { ...data };
  
  // Format dates for preview
  if (previewData.tanggal_mulai) {
    previewData.tanggal_mulai = formatDate(previewData.tanggal_mulai);
  }
  if (previewData.tanggal_akhir) {
    previewData.tanggal_akhir = formatDate(previewData.tanggal_akhir);
  }
  
  Object.keys(variableMapping).forEach(key => {
    const value = previewData[key];
    const regex = new RegExp(`{{${key}}}`, 'g');
    const fieldName = key.replace(/_/g, ' ');
    
    if (value && value !== '') {
      if (forPreview) {
        result = result.replace(regex, `<span class="filled-field preview-field" data-field="${key}">${value}</span>`);
      } else {
        result = result.replace(regex, value);
      }
    } else {
      if (forPreview) {
        result = result.replace(regex, `<span class="placeholder-field preview-field" data-field="${key}">[${fieldName}]</span>`);
      } else {
        result = result.replace(regex, `<mark style="background-color: #F5F5F5; padding: 2px 4px;">[${fieldName}]</mark>`);
      }
    }
  });
  
  return result;
}

// Generate preview with highlighted sections
function generatePreview(formData) {
  const preview = document.getElementById('documentPreview');
  if (!preview) return;
  
  let htmlContent = replaceVariables(documentTemplate, formData, true);
  
  const bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
  if (bodyMatch) {
    htmlContent = bodyMatch[1];
  }
  
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
  
  const emailElement = form.elements['email'];
  if (emailElement) {
    data.email = emailElement.value || '';
  }
  
  return data;
}

// Generate full document preview for preview view
function generateFullDocumentPreview(formData) {
  const fullPreview = document.getElementById('fullDocumentPreview');
  if (!fullPreview) return;
  
  let htmlContent = documentTemplate;
  const bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
  if (bodyMatch) {
    htmlContent = bodyMatch[1];
  }
  
  const previewData = { ...formData };
  if (previewData.tanggal_mulai) previewData.tanggal_mulai = formatDate(previewData.tanggal_mulai);
  if (previewData.tanggal_akhir) previewData.tanggal_akhir = formatDate(previewData.tanggal_akhir);
  
  Object.keys(variableMapping).forEach(key => {
    const value = previewData[key];
    const regex = new RegExp(`{{${key}}}`, 'g');
    if (value && value !== '') {
      htmlContent = htmlContent.replace(regex, `<span class="filled-field">${value}</span>`);
    } else {
      const fieldName = key.replace(/_/g, ' ');
      htmlContent = htmlContent.replace(regex, `<span class="placeholder-field">[${fieldName}]</span>`);
    }
  });
  
  fullPreview.innerHTML = htmlContent;
}

// Create minimal formData for fallback download when session/localStorage data is lost
function createFallbackFormData(buyerName, buyerEmail) {
  const fallback = {};
  Object.keys(variableMapping).forEach(key => { fallback[key] = ''; });
  if (buyerName && buyerName !== '-') fallback.nama_pihak_pertama = buyerName;
  if (buyerEmail && buyerEmail !== '-') fallback.email = buyerEmail;
  return fallback;
}

// Download document after payment confirmation
function downloadDocument(formData) {
  if (!formData) {
    const pendingDoc = sessionStorage.getItem('pendingDocument');
    if (pendingDoc) {
      const parsed = JSON.parse(pendingDoc);
      formData = parsed.formData;
    }
  }
  if (formData) {
    generateWordDocument(formData);
    sessionStorage.removeItem('pendingDocument');
  }
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
  
  // Initialize preview
  generatePreview({});
  updateProgress();
  
  // ===== WIZARD LOGIC =====
  let currentWizardStep = 1;
  const totalSteps = 4;
  const stepGroups = {
    1: ['informasi-umum'],
    2: ['pihak-pertama', 'pihak-kedua'],
    3: ['ruang-lingkup', 'hak-kewajiban', 'jangka-waktu', 'pembagian-hasil', 'kontribusi'],
    4: ['kerahasiaan', 'pengakhiran', 'penyelesaian']
  };
  
  function updateWizardStep() {
    document.querySelectorAll('.step-new').forEach((step, index) => {
      const stepNum = index + 1;
      const circle = step.querySelector('.step-circle-new');
      if (stepNum < currentWizardStep) {
        step.classList.add('completed');
        step.classList.remove('active');
        circle.textContent = '✓';
      } else if (stepNum === currentWizardStep) {
        step.classList.add('active');
        step.classList.remove('completed');
        circle.textContent = stepNum;
      } else {
        step.classList.remove('active', 'completed');
        circle.textContent = stepNum;
      }
    });
    
    const currentGroups = stepGroups[currentWizardStep] || [];
    document.querySelectorAll('.form-group[data-group]').forEach(group => {
      const groupName = group.getAttribute('data-group');
      if (currentGroups.includes(groupName)) {
        group.style.display = 'block';
        group.classList.add('is-expanded');
      } else {
        group.style.display = 'none';
      }
    });
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const generateBtn = document.getElementById('generateBtn');
    if (currentWizardStep === 1) prevBtn.style.display = 'none';
    else prevBtn.style.display = 'flex';
    if (currentWizardStep === totalSteps) {
      nextBtn.style.display = 'none';
      generateBtn.style.display = 'flex';
    } else {
      nextBtn.style.display = 'flex';
      generateBtn.style.display = 'none';
    }
    document.querySelector('.wizard-header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  document.getElementById('nextBtn')?.addEventListener('click', () => {
    if (currentWizardStep < totalSteps) {
      currentWizardStep++;
      updateWizardStep();
    }
  });
  document.getElementById('prevBtn')?.addEventListener('click', () => {
    if (currentWizardStep > 1) {
      currentWizardStep--;
      updateWizardStep();
    }
  });
  document.getElementById('generateBtn')?.addEventListener('click', () => {
    form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  });
  
  updateWizardStep();
  
  // Update progress on input. Don't call generatePreview here - it replaces
  // entire innerHTML and resets scroll. Per-field handlers update spans.
  form.addEventListener('input', () => {
    updateProgress();
  });
  
  // Live preview: scroll and highlight on focus
  let currentActiveField = null;
  function scrollToPreview(fieldName) {
    if (!fieldName) return;
    if (currentActiveField) currentActiveField.classList.remove('active-editing');
    const placeholders = document.querySelectorAll(`.preview-field[data-field="${fieldName}"]`);
    if (placeholders.length > 0) {
      const placeholder = placeholders[0];
      placeholder.classList.add('active-editing');
      currentActiveField = placeholder;
      const scrollContainer = document.querySelector('.preview-panel-new');
      if (scrollContainer) {
        requestAnimationFrame(() => {
          const placeholderRect = placeholder.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();
          const relativeTop = placeholderRect.top - containerRect.top + scrollContainer.scrollTop;
          scrollContainer.scrollTo({ top: Math.max(0, relativeTop - scrollContainer.clientHeight / 3), behavior: 'smooth' });
        });
      }
    }
  }
  
  document.addEventListener('click', (e) => {
    const isFormField = e.target.closest('#documentForm input, #documentForm textarea, #documentForm select');
    if (!isFormField && currentActiveField) {
      currentActiveField.classList.remove('active-editing');
      currentActiveField = null;
    }
  });
  
  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', function() {
      scrollToPreview(this.id || this.name);
    });
    input.addEventListener('input', function() {
      const fieldName = this.id || this.name;
      const fieldValue = this.value.trim();
      const placeholderText = fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      document.querySelectorAll(`.preview-field[data-field="${fieldName}"]`).forEach(pf => {
        pf.textContent = fieldValue || `[${placeholderText}]`;
        pf.classList.toggle('filled', !!fieldValue);
      });
      scrollToPreview(fieldName);
    });
  });
  
  // Handle form submission — redirect to preview page (payment flow)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = collectFormData();
    const loader = document.getElementById('downloadLoader');
    const generateBtn = document.getElementById('generateBtn');
    
    if (loader) loader.classList.add('is-visible');
    if (generateBtn) {
      generateBtn.disabled = true;
      generateBtn.innerHTML = '<span style="display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.8s linear infinite;margin-right:8px;vertical-align:middle;"></span> Memproses...';
    }
    
    try {
      sessionStorage.setItem('previewDocumentData', JSON.stringify(formData));
      
      setTimeout(() => {
        const spinner = document.getElementById('loaderSpinner');
        const success = document.getElementById('loaderSuccess');
        const loaderText = document.getElementById('loaderText');
        if (spinner) spinner.style.display = 'none';
        if (success) success.style.display = 'block';
        if (loaderText) loaderText.textContent = 'Dokumen berhasil dibuat!';
        
        setTimeout(() => {
          window.location.href = 'preview.html';
        }, 800);
      }, 1200);
    } catch (error) {
      console.error('Error:', error);
      if (loader) loader.classList.remove('is-visible');
      if (generateBtn) {
        generateBtn.disabled = false;
        generateBtn.innerHTML = 'Generate Dokumen';
      }
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  });
});
