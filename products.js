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
  { name: 'Perjanjian Waralaba (Tanpa Pendaftaran)', category: 'Kontrak Bisnis', color: 'teal', icon: 'franchise', available: true },
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

// Emoji icons - sesuai daftar final
const emojiIcons = {
  // Komersial / Bisnis
  lease: '🏠',
  sale: '🛍️',
  jointventure: '🤝',
  agency: '📣',
  offerletter: '📤',
  nda: '🔒',
  franchise: '🏪',
  distribution: '🚚',
  service: '🛠️',
  manufacturing: '🏭',
  borrow: '🔄',
  termination: '✂️',
  
  // Korporasi & Investasi
  shareholder: '👥',
  stockinvestment: '📈',
  profitsharing: '💰',
  stocktrade: '🎟️',
  capitalcontribution: '💸',
  termsheet: '✅',
  
  // Ketenagakerjaan
  pkwt: '⏱️',
  pkwtt: '🛡️',
  freelancer: '💻',
  companypolicy: '📚',
  joboffer: '✉️',
  layoff: '❌',
  internship: '🎓',
  warning: '⚠️',
  
  // RUPS / Tata Kelola
  rupsinvitation: '📅',
  rupsminutes: '📝',
  rupspower: '✋',
  boardminutes: '🖊️',
  circulardecision: '🔁',
  directorappointment: '🪑',
  paidcapital: '💳',
  shareholderapproval: '🟦',
  
  // Marketing / Kreatif
  endorsement: '📸',
  eo: '🎤',
  marketingagency: '📢',
  saas: '☁️',
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
  const emoji = emojiIcons[template.icon] || emojiIcons.lease;
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
          <span class="template-card__emoji">${emoji}</span>
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
          <span class="template-card__emoji">${emoji}</span>
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
