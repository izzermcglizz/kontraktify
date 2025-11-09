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
      result = result.replace(regex, `<mark style="background-color: #fffbe6; padding: 2px 4px;">[${key.replace(/_/g, ' ')}]</mark>`);
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
  
  return data;
}

// Update progress bar
function updateProgress() {
  const form = document.getElementById('documentForm');
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
  
  // Update preview and progress on input
  form.addEventListener('input', () => {
    const formData = collectFormData();
    generatePreview(formData);
    updateProgress();
  });
  
  // Also update when checkbox changes
  if (pembayaranBertahapCheckbox) {
    pembayaranBertahapCheckbox.addEventListener('change', () => {
      const formData = collectFormData();
      generatePreview(formData);
      updateProgress();
    });
  }
  
  // Auto-scroll preview to corresponding section when field is focused
  const formFields = form.querySelectorAll('input, textarea, select');
  formFields.forEach(field => {
    field.addEventListener('focus', () => {
      const fieldName = field.getAttribute('name') || field.getAttribute('id');
      if (!fieldName || !preview) return;
      
      // Convert field name to search term (e.g., "nama_pemberi_sewa" -> "nama pemberi sewa")
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
