// Template data
const templates = [
  // Kontrak Bisnis
  // Note: "Perjanjian Sewa Menyewa Tempat" links to perjanjian-sewa-menyewa-tempat.html
  { name: 'Perjanjian Sewa Menyewa Tempat', category: 'Kontrak Bisnis', color: 'green', icon: 'lease', available: true },
  { name: 'Perjanjian Jual Beli', category: 'Kontrak Bisnis', color: 'blue', icon: 'sale', available: false },
  { name: 'Perjanjian Kerja Sama Usaha (Joint Venture)', category: 'Kontrak Bisnis', color: 'yellow', icon: 'jointventure', available: true },
  { name: 'Perjanjian Keagenan', category: 'Kontrak Bisnis', color: 'purple', icon: 'agency', available: false },
  { name: 'Surat Penawaran Kerja Sama', category: 'Kontrak Bisnis', color: 'orange', icon: 'offerletter', available: false },
  { name: 'Perjanjian Rahasia Dagang (NDA)', category: 'Kontrak Bisnis', color: 'red', icon: 'nda', available: false },
  { name: 'Perjanjian Waralaba (Tanpa Pendaftaran)', category: 'Kontrak Bisnis', color: 'teal', icon: 'franchise', available: false },
  { name: 'Perjanjian Distribusi', category: 'Kontrak Bisnis', color: 'green', icon: 'distribution', available: false },
  { name: 'Perjanjian Jasa (Service Agreement)', category: 'Kontrak Bisnis', color: 'blue', icon: 'service', available: false },
  { name: 'Perjanjian Pembuatan Barang', category: 'Kontrak Bisnis', color: 'yellow', icon: 'manufacturing', available: false },
  { name: 'Perjanjian Pinjam Pakai', category: 'Kontrak Bisnis', color: 'purple', icon: 'borrow', available: false },
  { name: 'Surat Pemutusan Kontrak', category: 'Kontrak Bisnis', color: 'red', icon: 'termination', available: false },
  
  // Kepemilikan & Saham
  { name: 'Perjanjian Pemegang Saham', category: 'Kepemilikan & Saham', color: 'black', icon: 'shareholder', available: false },
  { name: 'Perjanjian Investasi Saham', category: 'Kepemilikan & Saham', color: 'blue', icon: 'stockinvestment', available: false },
  { name: 'Perjanjian Investasi Bagi Hasil', category: 'Kepemilikan & Saham', color: 'green', icon: 'profitsharing', available: false },
  { name: 'Perjanjian Jual Beli Saham', category: 'Kepemilikan & Saham', color: 'purple', icon: 'stocktrade', available: false },
  { name: 'Perjanjian Penyertaan Modal', category: 'Kepemilikan & Saham', color: 'orange', icon: 'capitalcontribution', available: false },
  { name: 'Term Sheet Investasi', category: 'Kepemilikan & Saham', color: 'teal', icon: 'termsheet', available: false },
  
  // Ketenagakerjaan
  { name: 'PKWT (Perjanjian Kerja Waktu Tertentu)', category: 'Ketenagakerjaan', color: 'gray', icon: 'pkwt', available: false },
  { name: 'PKWTT (Perjanjian Kerja Waktu Tidak Tertentu)', category: 'Ketenagakerjaan', color: 'blue', icon: 'pkwtt', available: false },
  { name: 'Kontrak Freelancer / Konsultan Independen', category: 'Ketenagakerjaan', color: 'yellow', icon: 'freelancer', available: false },
  { name: 'Kebijakan Perusahaan', category: 'Ketenagakerjaan', color: 'purple', icon: 'companypolicy', available: false },
  { name: 'Surat Penawaran Kerja', category: 'Ketenagakerjaan', color: 'green', icon: 'joboffer', available: false },
  { name: 'Surat Pemutusan Hubungan Kerja', category: 'Ketenagakerjaan', color: 'red', icon: 'layoff', available: false },
  { name: 'Perjanjian Magang', category: 'Ketenagakerjaan', color: 'orange', icon: 'internship', available: false },
  { name: 'Surat Peringatan (SP1, SP2, SP3)', category: 'Ketenagakerjaan', color: 'teal', icon: 'warning', available: false },
  
  // Tata Kelola Korporasi
  { name: 'Surat Undangan RUPS', category: 'Tata Kelola Korporasi', color: 'red', icon: 'rupsinvitation', available: false },
  { name: 'Risalah RUPS', category: 'Tata Kelola Korporasi', color: 'blue', icon: 'rupsminutes', available: false },
  { name: 'Surat Kuasa Menghadiri RUPS', category: 'Tata Kelola Korporasi', color: 'green', icon: 'rupspower', available: false },
  { name: 'Notulen Rapat Direksi / Komisaris', category: 'Tata Kelola Korporasi', color: 'purple', icon: 'boardminutes', available: false },
  { name: 'Keputusan Sirkuler Direksi / Komisaris', category: 'Tata Kelola Korporasi', color: 'orange', icon: 'circulardecision', available: false },
  { name: 'Surat Pengangkatan / Pemberhentian Direksi / Komisaris (Internal)', category: 'Tata Kelola Korporasi', color: 'teal', icon: 'directorappointment', available: false },
  { name: 'Surat Pernyataan Modal Disetor', category: 'Tata Kelola Korporasi', color: 'yellow', icon: 'paidcapital', available: false },
  { name: 'Surat Persetujuan Pemegang Saham atas Aksi Korporasi', category: 'Tata Kelola Korporasi', color: 'red', icon: 'shareholderapproval', available: false },
  
  // Lainnya
  { name: 'Perjanjian Endorsement / Influencer', category: 'Lainnya', color: 'pink', icon: 'endorsement', available: false },
  { name: 'Perjanjian Kerja Sama (EO)', category: 'Lainnya', color: 'blue', icon: 'eo', available: false },
  { name: 'Perjanjian Agency untuk Marketing', category: 'Lainnya', color: 'green', icon: 'marketingagency', available: false },
  { name: 'Perjanjian Kerja Sama Platform Digital / SaaS', category: 'Lainnya', color: 'purple', icon: 'saas', available: false },
];

// Professional SVG Icons
const svgIcons = {
  // Komersial / Bisnis
  lease: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  sale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  jointventure: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>',
  agency: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  offerletter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  nda: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  franchise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/><path d="M12 13v4M8 15h8"/></svg>',
  distribution: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  service: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  manufacturing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="10" width="20" height="12" rx="2"/><path d="M7 10V4h4v6M17 10V4h4v6M12 10V6"/></svg>',
  borrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  termination: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  
  // Korporasi & Investasi
  shareholder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  stockinvestment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  profitsharing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  stocktrade: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  capitalcontribution: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  termsheet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  
  // Ketenagakerjaan
  pkwt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  pkwtt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  freelancer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  companypolicy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  joboffer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  layoff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  internship: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  
  // RUPS / Tata Kelola
  rupsinvitation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  rupsminutes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  rupspower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  boardminutes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  circulardecision: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  directorappointment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  paidcapital: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  shareholderapproval: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  
  // Marketing / Kreatif
  endorsement: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  eo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  marketingagency: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  saas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
};

// Color classes mapping
const colorClasses = {
  green: 'template-card__image--green',
  blue: 'template-card__image--blue',
  yellow: 'template-card__image--yellow',
  purple: 'template-card__image--purple',
  red: 'template-card__image--red',
  gray: 'template-card__image--gray',
  orange: 'template-card__image--orange',
  teal: 'template-card__image--teal',
  black: 'template-card__image--black',
  pink: 'template-card__image--pink',
};

// Convert template name to URL slug
function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Generate template card HTML
function createTemplateCard(template) {
  const svgIcon = svgIcons[template.icon] || svgIcons.lease;
  const colorClass = colorClasses[template.color] || colorClasses.blue;
  const isAvailable = template.available !== false;
  const comingSoonClass = isAvailable ? '' : 'template-card--coming-soon';
  const slug = nameToSlug(template.name);
  const productUrl = isAvailable ? `${slug}.html` : '#';
  
  // If available, make the entire card a clickable link
  if (isAvailable) {
    return `
      <a href="${productUrl}" class="template-card ${comingSoonClass}" data-category="${template.category}" data-name="${template.name.toLowerCase()}">
        <div class="template-card__image ${colorClass}">
          <span class="template-card__icon">${svgIcon}</span>
        </div>
        <h3>${template.name}</h3>
        <p>Template profesional siap pakai untuk ${template.name.toLowerCase()}.</p>
        <span class="template-card__link">Lihat Template</span>
      </a>
    `;
  } else {
    // Coming soon cards remain as div
    return `
      <div class="template-card ${comingSoonClass}" data-category="${template.category}" data-name="${template.name.toLowerCase()}">
        <div class="template-card__image ${colorClass}">
          <span class="template-card__icon">${svgIcon}</span>
          <div class="coming-soon-overlay"><div class="coming-soon-badge"><span class="coming-soon-text">Coming Soon</span><div class="coming-soon-pulse"></div></div></div>
        </div>
        <h3>${template.name}</h3>
        <p>Template profesional siap pakai untuk ${template.name.toLowerCase()}.</p>
        <span class="template-card__link template-card__link--disabled">Coming Soon</span>
      </div>
    `;
  }
}

// Initialize template grid
function renderTemplates(category = 'Kontrak Bisnis') {
  const grid = document.getElementById('templateGrid');
  if (!grid) return;
  
  const filteredTemplates = category === 'Semua Dokumen' 
    ? templates 
    : templates.filter(t => t.category === category);
  
  grid.innerHTML = filteredTemplates.map(createTemplateCard).join('');
  
  // Prevent clicks on coming soon cards
  const comingSoonCards = grid.querySelectorAll('.template-card--coming-soon');
  comingSoonCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });
}

// Tab switching
(() => {
  const tabs = document.querySelectorAll('.category-tab');
  let activeCategory = 'Kontrak Bisnis';
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      
      // Update active category
      activeCategory = tab.getAttribute('data-category');
      
      // Render templates
      renderTemplates(activeCategory);
      
      // Clear search
      const searchInput = document.getElementById('templateSearch');
      if (searchInput) {
        searchInput.value = '';
        performSearch('');
      }
    });
  });
  
  // Initial render
  renderTemplates(activeCategory);
})();

// Fixed search functionality
function performSearch(query) {
  const grid = document.getElementById('templateGrid');
  const resultsCount = document.getElementById('searchResultsCount');
  if (!grid) return;
  
  const cards = grid.querySelectorAll('.template-card');
  const lowerQuery = query.toLowerCase().trim();
  let visibleCount = 0;
  
  cards.forEach(card => {
    const name = card.getAttribute('data-name') || '';
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const description = card.querySelector('p')?.textContent.toLowerCase() || '';
    
    const matches = !lowerQuery || name.includes(lowerQuery) || 
                    title.includes(lowerQuery) || 
                    description.includes(lowerQuery);
    
    if (matches) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Update results count
  if (resultsCount && lowerQuery) {
    resultsCount.textContent = `${visibleCount} hasil`;
    resultsCount.classList.add('show');
  } else if (resultsCount) {
    resultsCount.classList.remove('show');
  }
  
  // Scroll to templates section if there's a query
  if (lowerQuery && visibleCount > 0) {
    const templatesSection = document.querySelector('.templates-by-category');
    if (templatesSection) {
      setTimeout(() => {
        templatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}

// Search functionality
(() => {
  const searchInput = document.getElementById('templateSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    performSearch(query);
  });
})();

// Popular tags click handler
(() => {
  const popularTags = document.querySelectorAll('.popular-tag');
  const searchInput = document.getElementById('templateSearch');

  popularTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      const text = tag.textContent.trim();
      if (searchInput) {
        searchInput.value = text;
        searchInput.focus();
        performSearch(text);
      }
    });
  });
})();

// FAQ Accordion functionality
(() => {
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      if (!question) return;
      
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
          }
        });
        
        // Toggle current item
        if (isOpen) {
          item.classList.remove('is-open');
        } else {
          item.classList.add('is-open');
        }
      });
    });
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
  } else {
    initFAQ();
  }
})();

// Page loader for products.html (disabled - no loading screen)
(() => {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  // Hide loader immediately - no loading screen for template page
  loader.classList.remove('is-loading');
})();

// Smooth scroll for anchor links
(() => {
  const handleSmoothScroll = (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    
    const target = document.querySelector(href);
    if (!target) return;
    
    e.preventDefault();
    
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
  
  document.addEventListener('click', handleSmoothScroll);
})();

// Make templates and svgIcons globally accessible
window.templates = templates;
window.svgIcons = svgIcons;
