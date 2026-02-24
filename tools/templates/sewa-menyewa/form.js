// HTML Document template with proper styling
const documentTemplate = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perjanjian Sewa Menyewa Tempat</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap');
        
        body {
            font-family: 'Manrope', sans-serif;
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
    <h1>PERJANJIAN SEWA MENYEWA TEMPAT</h1>

    <p>Perjanjian sewa menyewa tempat ini (untuk selanjutnya disebut "<strong>Perjanjian Sewa</strong>") ditandatangani dan dilangsungkan di {{tempat_penandatanganan}}, pada hari {{hari}}, tanggal {{tanggal}} bulan {{bulan}} tahun {{tahun}}, oleh dan antara:</p>

    <ol>
        <li>{{nama_pemberi_sewa}}, pemilik KTP dengan nomor {{ktp_pemberi_sewa}} bertempat tinggal permanen di {{alamat_pemberi_sewa}}, untuk selanjutnya disebut "<strong>Pemberi Sewa</strong>"; dan</li>
        <li>{{nama_penyewa}}, pemilik KTP dengan nomor {{ktp_penyewa}} bertempat tinggal permanen di {{alamat_penyewa}}, untuk selanjutnya disebut "<strong>Penyewa</strong>",</li>
    </ol>

    <p>secara bersama-sama disebut sebagai <strong>PARA PIHAK</strong>.</p>

    <p><strong>Pemberi Sewa</strong> dan <strong>Penyewa</strong> dengan ini terlebih dahulu menerangkan hal-hal sebagai berikut:</p>

    <ol>
        <li>Bahwa, Pemberi Sewa adalah pemilik yang sah atas suatu tempat yang berdiri di atas tanah hak atas tanah milik dengan Sertifikat Hak Milik (SHM) Nomor: {{nomor_shm}} atas nama {{nama_pemilik_shm}} yang setempat dikenal sebagai {{alamat_lengkap_tempat}} (selanjutnya disebut "<strong>Tempat</strong>").</li>
        <li>Bahwa, Pemberi Sewa bermaksud untuk menyewakan Tempat tersebut kepada Penyewa sebagaimana Penyewa bermaksud untuk menyewa Tempat tersebut dari Pemberi Sewa.</li>
        <li>Bahwa berdasarkan hal-hal tersebut di atas, Para Pihak menyatakan sepakat dan setuju untuk mengadakan dan menandatangani Perjanjian Sewa yang dilaksanakan dengan ketentuan dan syarat-syarat sebagai berikut:</li>
    </ol>

    <div class="section-title">PASAL 1<br>KESEPAKATAN SEWA-MENYEWA</div>

    <ol>
        <li>Pemberi Sewa dengan ini sepakat untuk menyewakan Tempat kepada Penyewa sebagaimana Penyewa dengan ini sepakat untuk menyewa Tempat tersebut dari Pemberi Sewa.</li>
        <li>Sewa menyewa Tempat sebagaimana dimaksud ayat (1) dilaksanakan dengan ketentuan sebagai berikut:
            <ol>
                <li>Harga Sewa sebesar Rp {{harga_sewa_angka}} <strong>({{harga_sewa_huruf}})</strong> ("<strong>Harga Sewa</strong>").</li>
                <li>Jangka Waktu Sewa adalah untuk selama {{durasi_sewa}} bulan/tahun*, yang dimulai pada tanggal {{tanggal_mulai}} dan berakhir pada tanggal {{tanggal_akhir}} ("<strong>Masa Sewa</strong>").</li>
            </ol>
        </li>
    </ol>

    <div class="section-title">PASAL 2<br>PEMBAYARAN</div>

    <ol>
        <li>Pembayaran atas Harga Sewa dilakukan oleh Penyewa kepada Pemberi Sewa melalui transfer ke rekening bank atas nama {{nama_pemilik_rekening}} pada {{nama_bank}}, nomor rekening <strong>{{nomor_rekening}}</strong>, selambat-lambatnya pada saat penandatanganan Perjanjian ini, kecuali disepakati lain secara tertulis oleh Para Pihak.</li>
        {{CONDITIONAL_PEMBAYARAN_BERTAHAP}}
        <li>Apabila terjadi keterlambatan pembayaran, Penyewa dikenakan denda keterlambatan sebesar <strong>{{persentase_denda}}%</strong> dari jumlah yang tertunda per hari kalender keterlambatan, kecuali keterlambatan disebabkan oleh force majeure yang dibuktikan secara memadai.</li>
        <li>Setiap pembayaran yang dilakukan oleh Penyewa wajib disertai dengan bukti transfer yang sah, dan Pemberi Sewa akan memberikan kuitansi atau tanda terima resmi sebagai bukti penerimaan.</li>
    </ol>

    <div class="section-title">PASAL 3<br>JAMINAN</div>

    <ol>
        <li>Pemberi Sewa memberikan jaminan sebagai berikut:
            <ol>
                <li>Tempat yang disewakan berdasarkan Perjanjian ini sepenuhnya merupakan milik sah Pemberi Sewa, tidak sedang dijaminkan, tidak sedang dijual, tidak dalam keadaan disewa kepada pihak lain, dan bebas dari sengketa atau klaim hak dari pihak ketiga mana pun.</li>
                <li>Penyewa berhak sepenuhnya untuk menggunakan dan menikmati Tempat selama Masa Sewa tanpa gangguan, tuntutan, gugatan, atau klaim dari pihak mana pun sehubungan dengan hak atas penggunaan Tempat tersebut.</li>
                <li>Apabila di kemudian hari terbukti bahwa jaminan yang diberikan Pemberi Sewa tidak benar dan menimbulkan kerugian bagi Penyewa, maka Pemberi Sewa wajib memberikan ganti rugi penuh atas kerugian yang timbul, termasuk namun tidak terbatas pada pengembalian Harga Sewa, biaya relokasi, dan kompensasi lain yang wajar.</li>
            </ol>
        </li>
        <li>Penyewa menjamin bahwa selama Masa Sewa, Tempat akan digunakan dengan itikad baik, sesuai peruntukannya, tidak dialihsewakan tanpa persetujuan tertulis dari Pemberi Sewa, dan tidak digunakan untuk kegiatan yang melanggar hukum, peraturan perundang-undangan, atau ketertiban umum.</li>
    </ol>

    <div class="section-title">PASAL 4<br>PEMBEBANAN BIAYA DAN PERAWATAN</div>

    <ol>
        <li>Penyewa berhak menggunakan fasilitas yang telah tersedia pada Tempat, termasuk tetapi tidak terbatas pada aliran listrik, saluran telepon, dan air bersih (misalnya dari PDAM), sepanjang biaya penggunaannya ditanggung oleh Penyewa.</li>
        <li>Penyewa berkewajiban membayar seluruh tagihan, rekening, dan biaya-biaya lain yang timbul akibat penggunaan fasilitas sebagaimana dimaksud dalam ayat (1), tepat waktu dan sesuai ketentuan dari masing-masing penyedia jasa.</li>
        <li>Segala kerugian atau kerusakan yang timbul akibat kelalaian atau pelanggaran oleh Penyewa atas kewajiban dalam Perjanjian ini sepenuhnya menjadi tanggung jawab Penyewa.</li>
        <li>Penyewa wajib menjaga, merawat, dan mempertahankan Tempat dalam kondisi baik dan layak digunakan sebagaimana saat pertama kali diserahterimakan, termasuk memelihara kebersihan dan kelestarian lingkungan serta prasarana umum yang berada dalam penguasaannya.</li>
        <li>Perawatan struktural, termasuk perbaikan atas kerusakan besar yang bukan disebabkan oleh Penyewa, menjadi tanggung jawab Pemberi Sewa, kecuali disepakati lain secara tertulis oleh Para Pihak.</li>
    </ol>

    <div class="section-title">PASAL 5<br>HAK DAN KEWAJIBAN</div>

    <ol>
        <li>Selama masa berlakunya Perjanjian ini, Penyewa tidak diperkenankan untuk melakukan hal-hal berikut tanpa persetujuan tertulis terlebih dahulu dari Pemberi Sewa:
            <ol>
                <li>Mengalihkan, memindahtangankan, atau menyerahkan sebagian atau seluruh hak sewa kepada pihak ketiga, baik dalam bentuk sewa ulang (<em>sublease</em>), pengalihan hak, atau bentuk perikatan lainnya;</li>
                <li>Menggunakan Tempat untuk tujuan lain selain yang secara tegas disepakati dalam Perjanjian ini;</li>
                <li>Mendirikan bangunan tambahan, melakukan penggalian, atau pembangunan lainnya di dalam atau di sekitar Tempat, termasuk pembuatan sumur bor, tanpa izin tertulis dari Pemberi Sewa; dan/atau</li>
                <li>Mengubah, memodifikasi, atau membongkar bagian dari struktur dan/atau instalasi tetap yang terdapat dalam Tempat, termasuk tetapi tidak terbatas pada instalasi listrik, saluran air, partisi permanen, atau sistem bangunan lainnya.</li>
            </ol>
        </li>
        <li>Yang dimaksud dengan struktur dalam ketentuan ini mencakup seluruh bagian konstruksi tetap dari Tempat yang berfungsi menopang atau membentuk bangunan, termasuk namun tidak terbatas pada fondasi, balok, kolom, lantai, dinding, dan atap.</li>
    </ol>

    <div class="section-title">PASAL 6<br>KERUSAKAN DAN BENCANA ALAM</div>

    <ol>
        <li>Kerusakan pada struktur atau bagian lain dari Tempat yang timbul akibat penggunaan atau kelalaian selama masa sewa sepenuhnya menjadi tanggung jawab Penyewa, termasuk biaya perbaikan dan penggantian.</li>
        <li>Penyewa dibebaskan dari segala tuntutan, ganti rugi, atau kewajiban kepada Pemberi Sewa atas kerusakan Tempat yang secara langsung disebabkan oleh kejadian Force Majeure, sepanjang Penyewa dapat membuktikan bahwa kerusakan tersebut bukan akibat kelalaian atau pelanggaran terhadap ketentuan Perjanjian ini.</li>
        <li>Yang dimaksud dengan "<strong>Force Majeure</strong>" dalam Perjanjian ini mencakup namun tidak terbatas pada:
            <ol>
                <li>Bencana alam, seperti banjir, gempa bumi, tanah longsor, petir, angin topan, dan kebakaran yang disebabkan oleh faktor eksternal yang berada di luar kendali Para Pihak;</li>
                <li>Kerusuhan massal, huru-hara, pemberontakan, aksi terorisme, sabotase, serta perang (baik dinyatakan maupun tidak dinyatakan); dan/atau</li>
                <li>Tindakan pemerintah, peraturan baru, atau kebijakan otoritas yang secara langsung menghalangi pelaksanaan sebagian atau seluruh kewajiban dalam Perjanjian ini.</li>
            </ol>
        </li>
    </ol>

    <div class="section-title">PASAL 7<br>SYARAT PEMUTUSAN HUBUNGAN OLEH PENYEWA</div>

    <p>Penyewa hanya dapat mengakhiri Perjanjian ini sebelum berakhirnya Masa Sewa, dengan syarat dan ketentuan sebagai berikut:</p>

    <ol>
        <li>Penyewa wajib memberitahukan maksud pengakhiran secara tertulis kepada Pemberi Sewa paling lambat {{jumlah_hari_pemberitahuan}} ({{huruf_hari_pemberitahuan}}) sebelum tanggal pengakhiran yang dimaksud.</li>
        <li>Sebelum tanggal efektif pengakhiran, Penyewa telah:
            <ol>
                <li>Membayar seluruh tagihan, rekening, dan biaya lain yang timbul dari penggunaan Tempat; dan</li>
                <li>Menyerahkan kembali Tempat dalam kondisi sebagaimana disyaratkan dalam Perjanjian ini, kecuali untuk keausan normal (wear and tear).</li>
            </ol>
        </li>
        <li>Dalam hal pemutusan dilakukan oleh Penyewa sebelum berakhirnya Masa Sewa, Penyewa tidak berhak menuntut pengembalian sebagian atau seluruh Harga Sewa atas sisa masa sewa yang belum dijalani, kecuali disepakati lain secara tertulis oleh Para Pihak.</li>
    </ol>

    <div class="section-title">PASAL 8<br>SYARAT PEMUTUSAN HUBUNGAN OLEH PEMBERI SEWA</div>

    <ol>
        <li>Pemberi Sewa berhak mengakhiri Perjanjian ini sebelum berakhirnya Masa Sewa, dengan syarat-syarat berikut:
            <ol>
                <li>Penyewa melanggar atau lalai melaksanakan salah satu ketentuan atau kewajiban dalam Perjanjian ini, dan tidak memperbaiki pelanggaran tersebut dalam jangka waktu {{jumlah_hari_pelanggaran}} ({{huruf_hari_pelanggaran}}) hari kalender sejak tanggal pemberitahuan tertulis dari Pemberi Sewa; atau</li>
                <li>Penyewa lalai membayar Harga Sewa, biaya perawatan, dan/atau tagihan lain yang menjadi kewajiban Penyewa, selama lebih dari {{jumlah_hari_bulan_keterlambatan}} ({{huruf_keterlambatan}}) hari/bulan* setelah tanggal jatuh tempo pembayaran.</li>
            </ol>
        </li>
        <li>Dalam hal Perjanjian ini diakhiri oleh Pemberi Sewa berdasarkan ayat (1), maka:
            <ol>
                <li>Penyewa wajib segera menyerahkan kembali Tempat kepada Pemberi Sewa paling lambat 14 (empat belas) hari setelah tanggal efektif pengakhiran; dan</li>
                <li>Pemberi Sewa tidak berkewajiban untuk mengembalikan Harga Sewa atas sisa waktu sewa yang belum dijalani, serta berhak menuntut ganti rugi atas kerugian yang timbul akibat pelanggaran tersebut.</li>
            </ol>
        </li>
    </ol>

    <div class="section-title">PASAL 9<br>MASA BERAKHIR KONTRAK</div>

    <p>Setelah berakhirnya Masa Sewa sesuai dengan ketentuan dalam Perjanjian ini, Penyewa wajib mengosongkan dan menyerahkan kembali Tempat kepada Pemberi Sewa dalam keadaan baik, bersih, dan layak pakai, serta telah memenuhi seluruh kewajiban lainnya berdasarkan Perjanjian ini, kecuali apabila Para Pihak secara tertulis menyepakati perpanjangan masa sewa.</p>

    <div class="section-title">PASAL 10<br>HUKUM YANG BERLAKU</div>

    <p>Perjanjian ini dan interpretasinya, penerapan dan seluruh sengketa yang timbul sehubungan dengan Perjanjian ini akan diatur dan ditafsirkan berdasarkan hukum Republik Indonesia.</p>

    <div class="section-title">PASAL 11<br>PERSELISIHAN DAN PENYELESAIAN PERSELISIHAN</div>

    <p>Bilamana dalam pelaksanaan Perjanjian Sewa ini terdapat perselisihan antara Para Pihak baik dalam pelaksanaannya ataupun dalam penafsiran salah satu Pasal dalam Perjanjian Sewa ini, maka Para Pihak sepakat untuk sedapat mungkin menyelesaikan perselisihan tersebut dengan cara musyawarah dalam waktu {{batas_waktu_penyelesaian}} hari sejak salah satu pihak yang merasa dirugikan menyatakan maksudnya untuk menyelesaikan perselisihan secara tertulis kepada pihak lainnya. Apabila musyawarah telah dilakukan oleh Para Pihak, namun ternyata tidak berhasil mencapai suatu kemufakatan maka Para Pihak sepakat bahwa segala perselisihan yang timbul dari perjanjian ini akan diselesaikan melalui Pengadilan Negeri.</p>

    <div class="section-title">PASAL 12<br>KETENTUAN PENUTUP</div>

    <p>Hal-hal yang belum diatur atau belum cukup diatur dalam Perjanjian Sewa ini apabila dikemudian hari dibutuhkan dan dianggap perlu akan ditetapkan tersendiri secara musyawarah dan selanjutnya akan ditetapkan dalam suatu Addendum yang berlaku mengikat Para Pihak, yang akan direkatkan dan merupakan bagian yang tidak terpisahkan dari Perjanjian Sewa ini.</p>

    <p>Demikianlah Perjanjian Investasi ini dibuat dalam rangkap 2 (dua), untuk masing-masing pihak, yang ditandatangani di atas kertas bermaterai cukup, yang masing-masing mempunyai kekuatan hukum yang sama dan berlaku sejak ditandatangani.</p>

    <table class="signature-table">
        <tr>
            <td>
                <strong>PIHAK PERTAMA</strong>
                <div class="signature-line"></div>
                <p>{{nama_pemberi_sewa}}</p>
            </td>
            <td>
                <strong>PIHAK KEDUA</strong>
                <div class="signature-line"></div>
                <p>{{nama_penyewa}}</p>
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
  nama_pemberi_sewa: 'nama_pemberi_sewa',
  ktp_pemberi_sewa: 'ktp_pemberi_sewa',
  alamat_pemberi_sewa: 'alamat_pemberi_sewa',
  nama_penyewa: 'nama_penyewa',
  ktp_penyewa: 'ktp_penyewa',
  alamat_penyewa: 'alamat_penyewa',
  nomor_shm: 'nomor_shm',
  nama_pemilik_shm: 'nama_pemilik_shm',
  alamat_lengkap_tempat: 'alamat_lengkap_tempat',
  harga_sewa_angka: 'harga_sewa_angka',
  harga_sewa_huruf: 'harga_sewa_huruf',
  durasi_sewa: 'durasi_sewa',
  tanggal_mulai: 'tanggal_mulai',
  tanggal_akhir: 'tanggal_akhir',
  nama_pemilik_rekening: 'nama_pemilik_rekening',
  nama_bank: 'nama_bank',
  nomor_rekening: 'nomor_rekening',
  nominal_deposit: 'nominal_deposit',
  nominal_deposit_huruf: 'nominal_deposit_huruf',
  jumlah_cicilan: 'jumlah_cicilan',
  nominal_cicilan: 'nominal_cicilan',
  tanggal_pembayaran: 'tanggal_pembayaran',
  batas_akhir_pelunasan: 'batas_akhir_pelunasan',
  persentase_denda: 'persentase_denda',
  jumlah_hari_pemberitahuan: 'jumlah_hari_pemberitahuan',
  huruf_hari_pemberitahuan: 'huruf_hari_pemberitahuan',
  jumlah_hari_pelanggaran: 'jumlah_hari_pelanggaran',
  huruf_hari_pelanggaran: 'huruf_hari_pelanggaran',
  jumlah_hari_bulan_keterlambatan: 'jumlah_hari_bulan_keterlambatan',
  huruf_keterlambatan: 'huruf_keterlambatan',
  batas_waktu_penyelesaian: 'batas_waktu_penyelesaian'
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
  
  // Handle conditional pembayaran bertahap
  const conditionalContent = data.pembayaran_bertahap ? `
        <li>Apabila disepakati pembayaran secara bertahap, maka:
            <ol>
                <li>Penyewa wajib membayar deposit awal sebesar Rp <strong>${data.nominal_deposit || '[nominal deposit]'}</strong> (<strong>${data.nominal_deposit_huruf || '[deposit huruf]'}</strong>) pada saat penandatanganan Perjanjian ini; dan</li>
                <li>Sisa Harga Sewa dibayarkan dalam <strong>${data.jumlah_cicilan || '[jumlah cicilan]'}</strong> kali cicilan, masing-masing sebesar Rp <strong>${data.nominal_cicilan || '[nominal cicilan]'}</strong>, paling lambat setiap tanggal <strong>${data.tanggal_pembayaran || '[tanggal pembayaran]'}</strong>;</li>
                <li>Seluruh Harga Sewa harus telah dibayar lunas paling lambat pada tanggal <strong>${formatDate(data.batas_akhir_pelunasan) || '[batas akhir pelunasan]'}</strong>.</li>
            </ol>
        </li>` : '';
  
  result = result.replace('{{CONDITIONAL_PEMBAYARAN_BERTAHAP}}', conditionalContent);
  
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
  
  // Handle checkbox
  data.pembayaran_bertahap = document.getElementById('pembayaran_bertahap')?.checked || false;
  
  // Collect email (not in variableMapping but needed for payment)
  const emailElement = form.elements['email'];
  if (emailElement) {
    data.email = emailElement.value || '';
  }
  
  return data;
}

// Save progress to localStorage
function saveProgressToLocalStorage() {
  const formData = collectFormData();
  const timestamp = Date.now();
  const saveKey = `formsewamenyewa_progress_${timestamp}`;
  
  // Also save to a "latest" key for easy retrieval
  const latestKey = 'formsewamenyewa_progress_latest';
  
  const saveData = {
    data: formData,
    timestamp: timestamp,
    savedAt: new Date().toISOString()
  };
  
  try {
    localStorage.setItem(saveKey, JSON.stringify(saveData));
    localStorage.setItem(latestKey, JSON.stringify(saveData));
    
    // Show save indicator
    const indicator = document.getElementById('saveProgressIndicator');
    if (indicator) {
      indicator.style.display = 'flex';
      setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => {
          indicator.style.display = 'none';
          indicator.style.opacity = '1';
        }, 300);
      }, 2000);
    }
    
    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
}

// Load progress from localStorage
function loadProgressFromLocalStorage() {
  const latestKey = 'formsewamenyewa_progress_latest';
  
  try {
    const savedData = localStorage.getItem(latestKey);
    if (!savedData) return false;
    
    const parsed = JSON.parse(savedData);
    const formData = parsed.data;
    
    // Restore form fields
    Object.keys(formData).forEach(key => {
      const element = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
      if (element) {
        if (element.type === 'checkbox') {
          element.checked = formData[key];
        } else {
          element.value = formData[key] || '';
        }
      }
    });
    
    // Trigger change event for checkbox to show/hide conditional fields
    const pembayaranBertahap = document.getElementById('pembayaran_bertahap');
    if (pembayaranBertahap) {
      pembayaranBertahap.dispatchEvent(new Event('change'));
    }
    
    // Update preview and progress
    generatePreview(formData);
    updateProgress();
    
    return true;
  } catch (error) {
    console.error('Error loading progress:', error);
    return false;
  }
}

// Debounce function for auto-save
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Auto-save function (debounced)
const autoSave = debounce(() => {
  saveProgressToLocalStorage();
}, 2000);

// Update progress bar
function updateProgress() {
  const form = document.getElementById('documentForm');
  if (!form) return;
  const allFields = form.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea');
  
  let filledCount = 0;
  let totalCount = 0;
  
  allFields.forEach(field => {
    // Skip conditional fields if checkbox is not checked
    const isConditionalField = field.closest('#pembayaran_bertahap_fields');
    const isCheckboxChecked = document.getElementById('pembayaran_bertahap')?.checked;
    
    if (isConditionalField && !isCheckboxChecked) {
      return; // Skip this field
    }
    
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

// Generate full document preview for preview view
function generateFullDocumentPreview(formData) {
  const fullPreview = document.getElementById('fullDocumentPreview');
  if (!fullPreview) return;
  
  // Start with original template (before variable replacement)
  let htmlContent = documentTemplate;
  
  // Extract body content only
  const bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
  if (bodyMatch) {
    htmlContent = bodyMatch[1];
  }
  
  // Format dates for preview
  const previewData = { ...formData };
  if (previewData.tanggal_mulai) {
    previewData.tanggal_mulai = formatDate(previewData.tanggal_mulai);
  }
  if (previewData.tanggal_akhir) {
    previewData.tanggal_akhir = formatDate(previewData.tanggal_akhir);
  }
  if (previewData.batas_akhir_pelunasan) {
    previewData.batas_akhir_pelunasan = formatDate(previewData.batas_akhir_pelunasan);
  }
  
  // Handle conditional pembayaran bertahap
  const conditionalContent = previewData.pembayaran_bertahap ? `
        <li>Apabila disepakati pembayaran secara bertahap, maka:
            <ol>
                <li>Penyewa wajib membayar deposit awal sebesar Rp <strong>${previewData.nominal_deposit || '[nominal deposit]'}</strong> (<strong>${previewData.nominal_deposit_huruf || '[deposit huruf]'}</strong>) pada saat penandatanganan Perjanjian ini; dan</li>
                <li>Sisa Harga Sewa dibayarkan dalam <strong>${previewData.jumlah_cicilan || '[jumlah cicilan]'}</strong> kali cicilan, masing-masing sebesar Rp <strong>${previewData.nominal_cicilan || '[nominal cicilan]'}</strong>, paling lambat setiap tanggal <strong>${previewData.tanggal_pembayaran || '[tanggal pembayaran]'}</strong>;</li>
                <li>Seluruh Harga Sewa harus telah dibayar lunas paling lambat pada tanggal <strong>${previewData.batas_akhir_pelunasan || '[batas akhir pelunasan]'}</strong>.</li>
            </ol>
        </li>` : '';
  
  htmlContent = htmlContent.replace('{{CONDITIONAL_PEMBAYARAN_BERTAHAP}}', conditionalContent);
  
  // Replace variables: filled ones get blue highlight, empty ones get placeholder
  Object.keys(variableMapping).forEach(key => {
    const value = previewData[key];
    const regex = new RegExp(`{{${key}}}`, 'g');
    
    if (value && value !== '') {
      // Filled field - highlight in blue
      htmlContent = htmlContent.replace(regex, `<span class="filled-field">${value}</span>`);
    } else {
      // Empty field - show placeholder
      const fieldName = key.replace(/_/g, ' ');
      htmlContent = htmlContent.replace(regex, `<span class="placeholder-field">[${fieldName}]</span>`);
    }
  });
  
  // No blur on form page - users should see full preview while editing
  // Blur will be applied on the preview.html page before payment
  
  fullPreview.innerHTML = htmlContent;
}

// Preview view functions removed - now using separate page

// Replace variables in TXT template (perjanjian_sewa_menyewa_template_variables.txt)
function replaceTxtTemplateVariables(txt, data) {
  let result = txt;
  const d = Object.assign({}, data || {});

  // Format dates for display in document
  if (d.tanggal_mulai) d.tanggal_mulai = formatDate(d.tanggal_mulai);
  if (d.tanggal_akhir) d.tanggal_akhir = formatDate(d.tanggal_akhir);
  if (d.batas_akhir_pelunasan) d.batas_akhir_pelunasan = formatDate(d.batas_akhir_pelunasan);

  // First line: tempat, hari, tanggal, bulan, tahun (replace blanks)
  result = result.replace(/ditandatangani dan dilangsungkan di\s+, pada hari\s+, tanggal\s+bulan\s+tahun\s+,/,
    `ditandatangani dan dilangsungkan di ${d.tempat_penandatanganan || ''}, pada hari ${d.hari || ''}, tanggal ${d.tanggal || ''} bulan ${d.bulan || ''} tahun ${d.tahun || ''},`);

  // Duplicate vars: {{nama}}, {{nomor_ktp}}, {{alamat_tinggal}} — first=pemberi, second=penyewa
  let n = 0;
  result = result.replace(/\{\{nama\}\}/g, () => (++n === 1 ? (d.nama_pemberi_sewa || '') : (d.nama_penyewa || '')));
  n = 0;
  result = result.replace(/\{\{nomor_ktp\}\}/g, () => (++n === 1 ? (d.ktp_pemberi_sewa || '') : (d.ktp_penyewa || '')));
  n = 0;
  result = result.replace(/\{\{alamat_tinggal\}\}/g, () => (++n === 1 ? (d.alamat_pemberi_sewa || '') : (d.alamat_penyewa || '')));

  // TXT-specific var names -> form data
  const txtMapping = {
    masukan_nomor_shm: 'nomor_shm',
    masukan_nama_pemilik: 'nama_pemilik_shm',
    masukan_alamat_lengkap_jalan_no_rt_rw_kelurahan_kecamatan_kabupaten_kota_provinsi_kode_pos: 'alamat_lengkap_tempat',
    angka_nominal: 'harga_sewa_angka',
    huruf_rupiah: 'harga_sewa_huruf',
    durasi: 'durasi_sewa',
    jumlah_hari_bulan: 'jumlah_hari_pemberitahuan',
    huruf: 'huruf_hari_pemberitahuan',
    jumlah_hari: 'jumlah_hari_pelanggaran',
    batas_waktu: 'batas_waktu_penyelesaian'
  };

  Object.keys(variableMapping).forEach(key => {
    const val = d[key];
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), val !== undefined && val !== '' ? val : '');
  });
  Object.entries(txtMapping).forEach(([txtKey, formKey]) => {
    const val = d[formKey];
    result = result.replace(new RegExp(`\\{\\{${txtKey}\\}\\}`, 'g'), val !== undefined && val !== '' ? val : '');
  });

  // Conditional: remove pembayaran bertahap block if not applicable
  if (!d.pembayaran_bertahap) {
    result = result.replace(/Apabila disepakati pembayaran secara bertahap, maka:[\s\S]*?(?=Apabila terjadi keterlambatan)/m,
      '');
  }

  return result;
}

// Generate Word from TXT template (tools/templates/documents/perjanjian_sewa_menyewa_template_variables.txt)
async function generateWordFromTxtTemplate(formData) {
  const url = '../documents/perjanjian_sewa_menyewa_template_variables.txt';

  let txtContent;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Template tidak ditemukan');
    txtContent = await res.text();
  } catch (e) {
    console.warn('TXT template fetch failed, using embedded HTML:', e);
    const fullHtml = replaceVariables(documentTemplate, formData);
    const wordHtml = fullHtml.replace('<html lang="id">',
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" lang="id">');
    return downloadWordBlob(wordHtml);
  }

  const bodyText = replaceTxtTemplateVariables(txtContent, formData);
  const escaped = bodyText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const paragraphs = escaped.split(/\n\n+/).filter(p => p.trim()).map(p => `<p style="margin: 0 0 1em 0; text-align: justify;">${p.replace(/\n/g, '<br>')}</p>`).join('');
  const wordHtml = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" lang="id">
<head><meta charset="UTF-8"><title>Perjanjian Sewa Menyewa Tempat</title></head>
<body style="font-family: 'Times New Roman', serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6;">
${paragraphs}
</body>
</html>`;

  downloadWordBlob(wordHtml);
}

function downloadWordBlob(html) {
  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Perjanjian_Sewa_Menyewa_Tempat.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Generate and download Word document (uses TXT template, fallback to HTML)
function generateWordDocument(formData) {
  generateWordFromTxtTemplate(formData);
}

// SHA256 and HMAC-SHA256 using Web Crypto API (native browser, no CSP issues)
// This avoids CSP errors from crypto-js library
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hmacSha256(message, key) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Clean function to remove special characters and null values
// According to iPaymu docs: "Can be caused by illegal characters (like ` or special quotes) or sending data with null values"
function cleanPaymentData(data) {
  const cleaned = {};
  
  Object.keys(data).forEach(key => {
    let value = data[key];
    
    // Skip null or undefined values
    if (value === null || value === undefined) {
      return;
    }
    
    // Keep numbers as numbers (for amount field)
    if (typeof value === 'number') {
      cleaned[key] = value;
      return;
    }
    
    // Handle arrays
    if (Array.isArray(value)) {
      cleaned[key] = value.map(item => {
        if (item === null || item === undefined) return '';
        // Remove special characters that might interfere with signature
        return String(item).replace(/[`'"]/g, '').trim();
      });
    } else {
      // Remove special characters and ensure no null
      cleaned[key] = String(value).replace(/[`'"]/g, '').trim();
    }
  });
  
  return cleaned;
}

// Show payment information on payment page
function showPaymentInfo(paymentInfo) {
  // Check if we're on payment page
  if (!window.location.pathname.includes('payment.html')) {
    // If not on payment page, redirect to payment page with info
    sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
    window.location.href = 'payment.html?payment=success';
    return;
  }
  
  // Show payment info card
  const paymentInfoCard = document.getElementById('paymentInfoCard');
  const paymentInfoContent = document.getElementById('paymentInfoContent');
  
  if (paymentInfoCard && paymentInfoContent) {
    let infoHTML = '';
    
    if (paymentInfo.paymentNo) {
      infoHTML += `
        <div class="payment-info-item">
          <span class="payment-info-label">Nomor ${paymentInfo.method}:</span>
          <span class="payment-info-value">${paymentInfo.paymentNo}</span>
        </div>
      `;
    }
    
    infoHTML += `
      <div class="payment-info-item">
        <span class="payment-info-label">Jumlah:</span>
        <span class="payment-info-value">Rp ${paymentInfo.amount.toLocaleString('id-ID')}</span>
      </div>
    `;
    
    if (paymentInfo.expired) {
      infoHTML += `
        <div class="payment-info-item">
          <span class="payment-info-label">Batas Waktu:</span>
          <span class="payment-info-value">${paymentInfo.expired}</span>
        </div>
      `;
    }
    
    infoHTML += `
      <div class="payment-info-item">
        <span class="payment-info-label">Reference ID:</span>
        <span class="payment-info-value">${paymentInfo.referenceId}</span>
      </div>
    `;
    
    paymentInfoContent.innerHTML = infoHTML;
    paymentInfoCard.style.display = 'block';
    
    // Scroll to payment info
    paymentInfoCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide payment method selection
    const paymentMethods = document.querySelector('.payment-methods');
    const proceedBtn = document.getElementById('proceedPaymentBtn');
    if (paymentMethods) paymentMethods.style.display = 'none';
    if (proceedBtn) proceedBtn.style.display = 'none';
  }
}

// Generate signature for iPaymu API v2
// According to iPaymu PHP sample: https://github.com/ipaymu/ipaymu-payment-v2-sample-php
// Format: 
// 1. requestBody = SHA256(jsonBody) (lowercase)
// 2. stringToSign = "POST:va:requestBody:apiKey"
// 3. signature = HMAC-SHA256(stringToSign, apiKey)
async function generateIpaymuSignature(va, apiKey, bodyString, timestamp) {
  try {
    // Step 1: Hash body with SHA256 (lowercase)
    const requestBody = await sha256(bodyString);
    
    // Step 2: Create string to sign: POST:va:requestBody:apiKey
    const stringToSign = `POST:${va}:${requestBody}:${apiKey}`;
    
    // Step 3: Generate HMAC-SHA256 signature
    const signature = await hmacSha256(stringToSign, apiKey);
    
    // Debug log - remove in production
    console.log('=== iPaymu Signature Debug (v2) ===');
    console.log('VA:', va);
    console.log('API Key (first 10):', apiKey.substring(0, 10) + '...');
    console.log('Body (JSON):', bodyString);
    console.log('RequestBody (SHA256 of body):', requestBody);
    console.log('String to sign:', stringToSign);
    console.log('Signature (HMAC-SHA256):', signature);
    console.log('Timestamp:', timestamp);
    console.log('===================================');
    
    return signature;
  } catch (error) {
    console.error('Error generating signature:', error);
    throw new Error('Crypto API not available. Please use a modern browser.');
  }
}

// NOTE: initiatePayment function has been moved to payment.js
// This function is now handled by Supabase Edge Function
// Keeping this comment for reference - do not use this old implementation
/*
// OLD IMPLEMENTATION - REMOVED
// Initiate payment with iPaymu
async function initiatePayment_OLD(formData, paymentMethod = null, paymentChannel = null) {
  try {
    // Use direct values to avoid conflict with payment.js
    // These match the credentials from iPaymu dashboard
    const IPAYMU_VA = '0000005776604685';
    const IPAYMU_API_KEY = 'SANDBOX98A25EA0-9F38-49BC-82C1-9DD6EB48AFBC';
    const PRICE = 350000;
    
    // Get proper base URL (handle file:// protocol for local testing)
    let baseUrl = window.location.origin;
    if (baseUrl.startsWith('file://')) {
      // For local testing, use a placeholder URL that iPaymu can redirect to
      // In production, this should be your actual domain
      baseUrl = 'https://kontraktify.com'; // Change to your actual domain
    }
    
    // Clean pathname - remove local file paths
    let cleanPath = window.location.pathname;
    if (cleanPath.includes('/Users/') || cleanPath.includes('kontraktify/')) {
      // Extract just the filename or use a simple path
      cleanPath = cleanPath.split('/').pop() || '/tools/templates/forms/formsewamenyewa.html';
    }
    
    // Generate unique reference ID
    // iPaymu referenceId should be alphanumeric, max 50 characters
    // Format: alphanumeric only, no special characters
    const refTimestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 9).toUpperCase();
    const referenceId = `SEWA${refTimestamp}${randomStr}`.substring(0, 50); // Max 50 chars
    
    // Get timestamp for iPaymu (format: YYYYMMDDHHmmss)
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');
    
    // Prepare request body for iPaymu API v2 (JSON format)
    // According to iPaymu PHP sample: https://github.com/ipaymu/ipaymu-payment-v2-sample-php
    // Format: name, phone, email, amount, notifyUrl, referenceId, paymentMethod, paymentChannel
    // Use paymentMethod and paymentChannel from parameters if provided, otherwise use defaults
    const defaultPaymentMethod = paymentMethod || 'qris'; // Default to QRIS for easier payment
    const defaultPaymentChannel = paymentChannel || 'qris'; // Default to QRIS
    
    const rawRequestBody = {
      name: (formData.nama_penyewa || 'Customer').trim(),
      phone: (formData.phone || '081234567890').trim(),
      email: (formData.email || 'customer@example.com').trim(),
      amount: PRICE, // Number, not string
      notifyUrl: `${baseUrl}/api/payment/notify`,
      referenceId: referenceId,
      paymentMethod: defaultPaymentMethod,
      paymentChannel: defaultPaymentChannel
    };
    
    // Clean the data - remove special characters and null values
    // This is critical to avoid "unauthorized signature" error
    const requestBody = cleanPaymentData(rawRequestBody);
    
    // Validate - ensure no null values
    Object.keys(requestBody).forEach(key => {
      if (requestBody[key] === null || requestBody[key] === undefined) {
        throw new Error(`Parameter ${key} cannot be null or undefined`);
      }
    });
    
    // Store form data in sessionStorage for after payment
    sessionStorage.setItem('pendingDocument', JSON.stringify({
      formData: formData,
      referenceId: referenceId,
      timestamp: Date.now()
    }));
    
    // Convert body to JSON string - must be same for signature and request
    // According to iPaymu PHP sample, use JSON_UNESCAPED_SLASHES equivalent
    // Sort parameters alphabetically for consistency
    const sortedBody = {};
    Object.keys(requestBody).sort().forEach(key => {
      sortedBody[key] = requestBody[key];
    });
    // JSON.stringify with no escaped slashes (like JSON_UNESCAPED_SLASHES in PHP)
    const bodyString = JSON.stringify(sortedBody).replace(/\\\//g, '/');
    
    // Generate signature using iPaymu v2 format (HMAC-SHA256, not MD5!)
    const signature = await generateIpaymuSignature(IPAYMU_VA, IPAYMU_API_KEY, bodyString, timestamp);
    
    // Call iPaymu API (Sandbox)
    const response = await fetch('https://sandbox.ipaymu.com/api/v2/payment/direct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'va': IPAYMU_VA,
        'signature': signature,
        'timestamp': timestamp
      },
      body: bodyString // Use same sorted body for request
    });
    
    const result = await response.json();
    
    // Debug: Log full response
    console.log('iPaymu API Response:', result);
    console.log('Response Data:', result.Data);
    console.log('Data type:', typeof result.Data);
    console.log('Data keys:', result.Data ? Object.keys(result.Data) : 'No Data');
    console.log('ReferenceId used:', referenceId);
    
    // Check for success response
    if (result.Status === 200 && result.Success === true) {
      // Log all Data properties for debugging
      if (result.Data) {
        console.log('All Data properties:', Object.keys(result.Data));
        Object.keys(result.Data).forEach(key => {
          console.log(`  ${key}:`, result.Data[key], typeof result.Data[key]);
        });
      }
      
      // Check for payment URL in different possible locations
      // iPaymu might return URL in different formats
      const paymentUrl = result.Data?.Url || 
                        result.Data?.url || 
                        result.Data?.paymentUrl || 
                        result.Data?.PaymentUrl ||
                        result.Data?.SessionUrl ||
                        result.Data?.redirectUrl ||
                        result.Data?.RedirectUrl ||
                        result.Url || 
                        result.url;
      
      if (paymentUrl) {
        // Redirect to iPaymu payment page
        console.log('✅ Payment successful! Redirecting to:', paymentUrl);
        window.location.href = paymentUrl;
        return; // Exit function successfully
      } else {
        // If no URL but success, log the full response structure for debugging
        console.warn('⚠️ Payment successful but no URL found.');
        console.warn('Full response:', JSON.stringify(result, null, 2));
        console.warn('Data keys:', result.Data ? Object.keys(result.Data) : 'No Data object');
        console.warn('ReferenceId used:', referenceId);
        
        // iPaymu doesn't return payment URL for Virtual Account (VA) payments
        // Instead, it returns Virtual Account number that user needs to pay
        const paymentData = result.Data;
        const paymentNo = paymentData?.PaymentNo || paymentData?.paymentNo;
        const totalAmount = paymentData?.Total || paymentData?.total || PRICE;
        const expired = paymentData?.Expired || paymentData?.expired;
        const channel = paymentData?.Channel || paymentData?.channel || 'BCA';
        const via = paymentData?.Via || paymentData?.via || 'VA';
        
        console.log('⚠️ No payment URL in response (VA payment)');
        console.log('Payment Data:', paymentData);
        
        // Show payment information on payment page
        showPaymentInfo({
          method: via === 'VA' ? 'Virtual Account' : via,
          channel: channel,
          paymentNo: paymentNo,
          amount: totalAmount,
          expired: expired,
          referenceId: referenceId
        });
        
        console.log('Payment created successfully. User needs to pay to VA number:', paymentNo);
        return;
      }
    } else {
      // More detailed error message
      const errorMsg = result.Keterangan || result.Message || result.Error || 'Payment initiation failed';
      console.error('Payment failed:', result);
      throw new Error(errorMsg);
    }
  } catch (error) {
    console.error('Payment error:', error);
    alert(`Terjadi kesalahan saat memproses pembayaran: ${error.message}\n\nSilakan coba lagi atau hubungi support jika masalah berlanjut.`);
  }
}
*/

// Download document after payment confirmation
function downloadDocument(formData) {
  if (!formData) {
    // Try to get from sessionStorage
    const pendingDoc = sessionStorage.getItem('pendingDocument');
    if (pendingDoc) {
      const parsed = JSON.parse(pendingDoc);
      formData = parsed.formData;
    }
  }
  
  if (formData) {
    generateWordDocument(formData);
    // Clear sessionStorage after download
    sessionStorage.removeItem('pendingDocument');
  }
}

// Check payment status from URL parameters
function checkPaymentStatus() {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get('payment');
  
  if (paymentStatus === 'success') {
    // Payment successful, enable download
    const pendingDoc = sessionStorage.getItem('pendingDocument');
    if (pendingDoc) {
      const parsed = JSON.parse(pendingDoc);
      const formData = parsed.formData;
      
      // Generate preview if on preview page
      if (window.location.pathname.includes('preview.html')) {
        generateFullDocumentPreview(formData);
        
        // Enable download button
        const payBtn = document.getElementById('payAndDownloadBtn');
        if (payBtn) {
          payBtn.textContent = 'Download Dokumen';
          payBtn.onclick = () => downloadDocument(formData);
        }
      }
    }
  } else if (paymentStatus === 'cancel') {
    // Payment cancelled
    alert('Pembayaran dibatalkan. Anda dapat mencoba lagi nanti.');
  }
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
  
  // Handle pembayaran bertahap checkbox
  const pembayaranBertahapCheckbox = document.getElementById('pembayaran_bertahap');
  const pembayaranBertahapFields = document.getElementById('pembayaran_bertahap_fields');
  
  if (pembayaranBertahapCheckbox && pembayaranBertahapFields) {
    pembayaranBertahapCheckbox.addEventListener('change', (e) => {
      pembayaranBertahapFields.style.display = e.target.checked ? 'block' : 'none';
    });
  }
  
  // Update preview and progress on input (with auto-save)
  form.addEventListener('input', () => {
    const formData = collectFormData();
    generatePreview(formData);
    updateProgress();
    autoSave(); // Auto-save on input
  });
  
  // Also update when checkbox changes
  if (pembayaranBertahapCheckbox) {
    pembayaranBertahapCheckbox.addEventListener('change', () => {
      const formData = collectFormData();
      generatePreview(formData);
      updateProgress();
      autoSave(); // Auto-save on checkbox change
    });
  }
  
  // Manual save button
  const saveProgressBtn = document.getElementById('saveProgressBtn');
  if (saveProgressBtn) {
    saveProgressBtn.addEventListener('click', () => {
      saveProgressToLocalStorage();
    });
  }
  
  // Load progress on page load
  loadProgressFromLocalStorage();
  
  
  // Handle form submission - show preview instead of download
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
        
        // Save form data to sessionStorage for preview page
        sessionStorage.setItem('previewDocumentData', JSON.stringify(formData));
        
        // Redirect to preview page after delay
        setTimeout(() => {
          if (loader) loader.style.display = 'none';
          if (generateBtn) generateBtn.disabled = false;
          if (spinner) spinner.style.display = 'block';
          if (success) success.style.display = 'none';
          if (loaderText) loaderText.textContent = 'Memproses dokumen Anda...';
          
          // Redirect to preview page
          window.location.href = 'preview.html';
        }, 1000);
      }, 1500);
      
    } catch (error) {
      console.error('Error generating document:', error);
      if (loader) loader.style.display = 'none';
      if (generateBtn) generateBtn.disabled = false;
      alert('Terjadi kesalahan saat membuat dokumen. Silakan coba lagi.');
    }
  });
  
  // Preview view buttons removed - now handled in preview.html
  
  // Check payment status on page load (only for preview page)
  if (window.location.pathname.includes('preview.html')) {
    checkPaymentStatus();
  }
  
  // ===== REAL-TIME LIVE PREVIEW =====
  // Track currently active field
  let currentActiveField = null;
  
  // Scroll preview to show the relevant field and highlight it
  function scrollToPreview(fieldName) {
    if (!fieldName) {
      console.log('⚠️ No fieldName provided to scrollToPreview');
      return;
    }
    
    console.log('🔍 Scrolling to field:', fieldName);
    
    // Remove highlight from previously active field
    if (currentActiveField) {
      currentActiveField.classList.remove('active-editing');
      console.log('✅ Removed active-editing from previous field');
    }
    
    // Find the corresponding placeholder in preview using data-field attribute
    const placeholders = document.querySelectorAll(`.preview-field[data-field="${fieldName}"]`);
    console.log(`📍 Found ${placeholders.length} placeholder(s) for "${fieldName}"`);
    
    if (placeholders.length > 0) {
      const placeholder = placeholders[0]; // Get first match
      
      // Add active editing class to highlight
      placeholder.classList.add('active-editing');
      currentActiveField = placeholder;
      console.log('✨ Added active-editing class to placeholder');
      
      // Get the scrollable container (preview-panel-new)
      const scrollContainer = document.querySelector('.preview-panel-new');
      console.log('📦 Scroll container found:', !!scrollContainer);
      
      if (scrollContainer) {
        // Small delay to ensure DOM is ready
        requestAnimationFrame(() => {
          // Calculate position
          const placeholderRect = placeholder.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();
          const relativeTop = placeholderRect.top - containerRect.top + scrollContainer.scrollTop;
          
          // Scroll to position the placeholder in upper third of view
          const scrollTo = relativeTop - (scrollContainer.clientHeight / 3);
          
          console.log('📜 Scrolling to position:', scrollTo);
          scrollContainer.scrollTo({
            top: Math.max(0, scrollTo),
            behavior: 'smooth'
          });
        });
      }
    } else {
      console.warn('❌ No preview field found for:', fieldName);
    }
  }
  
  // Remove active highlight when user clicks outside form fields
  document.addEventListener('click', (e) => {
    const isFormField = e.target.closest('#documentForm input, #documentForm textarea, #documentForm select');
    if (!isFormField && currentActiveField) {
      currentActiveField.classList.remove('active-editing');
      currentActiveField = null;
      console.log('👋 Removed highlight (clicked outside)');
    }
  });
  
  function updateLivePreview() {
    console.log('🚀 Initializing live preview...');
    
    // Get all form inputs
    const formInputs = document.querySelectorAll('#documentForm input, #documentForm textarea, #documentForm select');
    console.log(`📝 Found ${formInputs.length} form inputs`);
    
    formInputs.forEach((input, index) => {
      // Focus event - scroll and highlight
      input.addEventListener('focus', function() {
        const fieldName = this.id || this.name;
        console.log(`👆 Focus on field #${index + 1}:`, fieldName);
        scrollToPreview(fieldName);
      });
      
      // Input event - update text and maintain highlight
      input.addEventListener('input', function() {
        const fieldName = this.id || this.name;
        const fieldValue = this.value.trim();
        console.log(`⌨️ Input on field "${fieldName}":`, fieldValue);
        
        // Find all preview fields with matching data-field attribute
        const previewFields = document.querySelectorAll(`.preview-field[data-field="${fieldName}"]`);
        
        previewFields.forEach(previewField => {
          if (fieldValue) {
            previewField.textContent = fieldValue;
            previewField.classList.add('filled');
            previewField.classList.remove('active-editing');
            previewField.classList.add('active-editing'); // Re-add to maintain highlight
          } else {
            // Reset to placeholder
            const placeholder = previewField.getAttribute('data-field')
              .replace(/_/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase());
            previewField.textContent = `[${placeholder}]`;
            previewField.classList.remove('filled');
          }
        });
        
        // Special handling for harga_sewa - auto convert to terbilang
        if (fieldName === 'harga_sewa_angka') {
          const terbilangField = document.querySelector('.preview-field[data-field="harga_sewa_huruf"]');
          if (terbilangField && fieldValue) {
            const angka = parseInt(fieldValue.replace(/\D/g, ''));
            if (!isNaN(angka)) {
              terbilangField.textContent = numberToWords(angka) + ' Rupiah';
              terbilangField.classList.add('filled');
            }
          }
        }
        
        // Auto-scroll preview to show this field
        scrollToPreview(fieldName);
      });
    });
    
    console.log('✅ Live preview initialized!');
  }
  
  // Convert number to Indonesian words
  function numberToWords(num) {
    if (num === 0) return 'Nol';
    
    const ones = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
    const tens = ['', '', 'Dua Puluh', 'Tiga Puluh', 'Empat Puluh', 'Lima Puluh', 'Enam Puluh', 'Tujuh Puluh', 'Delapan Puluh', 'Sembilan Puluh'];
    const teens = ['Sepuluh', 'Sebelas', 'Dua Belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas', 'Enam Belas', 'Tujuh Belas', 'Delapan Belas', 'Sembilan Belas'];
    
    if (num < 10) return ones[num];
    if (num >= 10 && num < 20) return teens[num - 10];
    if (num >= 20 && num < 100) {
      return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    }
    if (num >= 100 && num < 1000) {
      const hundred = Math.floor(num / 100);
      const rest = num % 100;
      return (hundred === 1 ? 'Seratus' : ones[hundred] + ' Ratus') + (rest ? ' ' + numberToWords(rest) : '');
    }
    if (num >= 1000 && num < 1000000) {
      const thousand = Math.floor(num / 1000);
      const rest = num % 1000;
      return (thousand === 1 ? 'Seribu' : numberToWords(thousand) + ' Ribu') + (rest ? ' ' + numberToWords(rest) : '');
    }
    if (num >= 1000000) {
      const million = Math.floor(num / 1000000);
      const rest = num % 1000000;
      return numberToWords(million) + ' Juta' + (rest ? ' ' + numberToWords(rest) : '');
    }
    
    return num.toString();
  }
  
  // Initialize live preview
  console.log('🔄 About to initialize live preview...');
  updateLivePreview();
  console.log('✅ Live preview initialization complete!');
  
  // ===== WIZARD NAVIGATION LOGIC =====
  let currentWizardStep = 1;
  const totalSteps = 4;
  
  // Map steps to form groups
  const stepGroups = {
    1: ['informasi-umum'],
    2: ['pemberi-sewa', 'penyewa'],
    3: ['informasi-tempat'],
    4: ['ketentuan-sewa', 'informasi-pembayaran', 'ketentuan-lainnya']
  };
  
  function updateWizardStep() {
    // Update progress circles
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
    
    // Show/hide form groups based on current step
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
    
    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const generateBtn = document.getElementById('generateBtn');
    
    // Show/hide prev button
    if (currentWizardStep === 1) {
      prevBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
    }
    
    // Show/hide next vs generate button
    if (currentWizardStep === totalSteps) {
      nextBtn.style.display = 'none';
      generateBtn.style.display = 'flex';
    } else {
      nextBtn.style.display = 'flex';
      generateBtn.style.display = 'none';
    }
    
    // Scroll to top of form
    document.querySelector('.wizard-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Next button handler
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentWizardStep < totalSteps) {
        currentWizardStep++;
        updateWizardStep();
      }
    });
  }
  
  // Previous button handler
  const prevBtn = document.getElementById('prevBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentWizardStep > 1) {
        currentWizardStep--;
        updateWizardStep();
      }
    });
  }
  
  // Generate button handler
  const generateBtnWizard = document.getElementById('generateBtn');
  if (generateBtnWizard) {
    generateBtnWizard.addEventListener('click', () => {
      // Trigger form submission
      const form = document.getElementById('documentForm');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    });
  }
  
  // Initialize wizard on page load
  updateWizardStep();
});
