// Header scroll shrink effect with smooth transparency
(() => {
  const header = document.querySelector('.top-bar');
  const container = document.querySelector('.top-bar__container');
  if (!header || !container) return;
  
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 50;
    
    // Add/remove scrolled class
    if (currentScrollY > scrollThreshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    
    // Smooth opacity transition based on scroll position
    const maxScroll = 200;
    const scrollProgress = Math.min(currentScrollY / maxScroll, 1);
    
    // Calculate background opacity (0.5 to 0.9)
    const baseOpacity = 0.5;
    const maxOpacity = 0.9;
    const currentOpacity = baseOpacity + (maxOpacity - baseOpacity) * scrollProgress;
    
    // Apply dynamic background
    container.style.background = `rgba(255, 255, 255, ${currentOpacity})`;
    
    // Adjust shadow intensity
    const shadowIntensity = 0.06 + (0.1 - 0.06) * scrollProgress;
    container.style.boxShadow = `0 ${4 + scrollProgress * 4}px ${16 + scrollProgress * 8}px rgba(0, 0, 0, ${shadowIntensity}), 0 0 0 1px rgba(255, 255, 255, ${0.5 + scrollProgress * 0.3})`;
    
    lastScrollY = currentScrollY;
  };
  
  // Throttle scroll events
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial check
  handleScroll();
})();

// Page loader for navigation (disabled for Template link)
(() => {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  // Show loader when clicking any navigation link (except anchor links, Template, and external links)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Skip loading screen for:
    // - Template link
    // - Anchor links
    // - External links (mailto, tel, WhatsApp, etc.)
    if (link.classList.contains('nav-link-template') || 
        href.includes('products.html') ||
        href.startsWith('#') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') ||
        href.includes('wa.me') ||
        href.startsWith('http://') ||
        href.startsWith('https://')) {
      return;
    }
    
    // Show loader for other internal page links
    if (href) {
      // Check if it's a different page
      const currentPath = window.location.pathname;
      const linkPath = new URL(link.href, window.location.origin).pathname;
      
      if (linkPath !== currentPath) {
        loader.classList.add('is-loading');
      }
    }
  });

  // Hide loader when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.remove('is-loading');
    }, 200);
  });

  // Hide loader immediately if page is already loaded
  if (document.readyState === 'complete') {
    loader.classList.remove('is-loading');
  }
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
    
    // Calculate offset for header (if needed)
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    // Smooth scroll with easing
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
  
  // Handle all anchor links
  document.addEventListener('click', handleSmoothScroll);
  
  // Also handle data-scroll-target for backward compatibility
  const scrollTriggers = document.querySelectorAll('[data-scroll-target]');
  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const selector = trigger.getAttribute('data-scroll-target');
      if (!selector) return;
      const target = document.querySelector(selector);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();

// Legacy builder (kept for reference) — demo below is the primary experience
const builder = document.querySelector('.builder');

if (builder) {
  const templates = [
    {
      id: 'sales-contract',
      category: 'Kontrak Bisnis',
      name: 'Perjanjian Jual Beli Barang',
      description:
        'Melindungi transaksi penjualan barang atau jasa dengan klausul pembayaran, pengiriman, dan garansi yang jelas.',
      duration: '10 menit',
      basePrice: 450_000,
    },
    {
      id: 'partnership-agreement',
      category: 'Kontrak Bisnis',
      name: 'Perjanjian Kerjasama Dagang (MoA)',
      description:
        'Mengatur ruang lingkup kerjasama, pembagian keuntungan, dan mekanisme penyelesaian sengketa antar pihak.',
      duration: '15 menit',
      basePrice: 520_000,
    },
    {
      id: 'shareholders-agreement',
      category: 'Kepemilikan & Saham',
      name: 'Perjanjian Pemegang Saham (SHA)',
      description:
        'Menjabarkan hak suara, kewajiban, dan mekanisme exit bagi para pemegang saham dalam perusahaan.',
      duration: '20 menit',
      basePrice: 650_000,
    },
    {
      id: 'investment-note',
      category: 'Kepemilikan & Saham',
      name: 'Perjanjian Investasi Convertible Note',
      description:
        'Dokumen investasi dengan opsi konversi saham, ideal untuk pendanaan tahap awal startup.',
      duration: '20 menit',
      basePrice: 720_000,
    },
    {
      id: 'employment-contract',
      category: 'Ketenagakerjaan',
      name: 'Perjanjian Kontrak Kerja PKWT',
      description:
        'Kontrak pekerja waktu tertentu lengkap dengan klausul hak dan kewajiban karyawan serta perusahaan.',
      duration: '12 menit',
      basePrice: 480_000,
    },
    {
      id: 'freelancer-contract',
      category: 'Ketenagakerjaan',
      name: 'Kontrak Freelancer / Konsultan Independen',
      description:
        'Mengatur ruang lingkup pekerjaan, jangka waktu, dan ketentuan pembayaran untuk tenaga lepas.',
      duration: '12 menit',
      basePrice: 420_000,
    },
    {
      id: 'board-resolution',
      category: 'Tata Kelola Korporasi',
      name: 'Keputusan Sirkuler Direksi',
      description:
        'Template keputusan direksi yang sah untuk penetapan kebijakan atau penunjukan penting perusahaan.',
      duration: '8 menit',
      basePrice: 360_000,
    },
    {
      id: 'shareholders-meeting',
      category: 'Tata Kelola Korporasi',
      name: 'Undangan & Risalah RUPS',
      description:
        'Paket lengkap dokumen undangan, agenda, dan risalah rapat umum pemegang saham tahunan/luar biasa.',
      duration: '18 menit',
      basePrice: 540_000,
    },
  ];

  const formatCurrency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const state = {
    step: 1,
    selectedCategory: null,
    selectedTemplate: null,
  };

  const categoryContainer = document.getElementById('categoryChips');
  const templateList = document.getElementById('templateList');
  const optionForm = document.getElementById('optionForm');
  const stepIndicators = Array.from(document.querySelectorAll('[data-step-indicator]'));
  const panels = Array.from(document.querySelectorAll('[data-step-panel]'));
  const prevButton = document.querySelector('[data-action="prev"]');
  const nextButton = document.querySelector('[data-action="next"]');
  const summaryCategory = document.getElementById('summaryCategory');
  const summaryTemplate = document.getElementById('summaryTemplate');
  const summaryOptions = document.getElementById('summaryOptions');
  const summaryTotal = document.getElementById('summaryTotal');
  const checkoutButton = document.getElementById('builderCheckout');

  function getMaxStep() {
    let maxStep = 1;
    if (state.selectedCategory) maxStep = 2;
    if (state.selectedTemplate) maxStep = 3;
    return maxStep;
  }

  function setStep(step) {
    const maxStep = getMaxStep();
    state.step = Math.max(1, Math.min(step, maxStep));
    updatePanels();
    updateIndicators();
    updateControls();
  }

  function updatePanels() {
    panels.forEach((panel) => {
      const stepNumber = Number(panel.getAttribute('data-step-panel'));
      const isActive = stepNumber === state.step;
      panel.classList.toggle('is-active', isActive);
      panel.setAttribute('aria-hidden', String(!isActive));
    });
  }

  function updateIndicators() {
    const maxStep = getMaxStep();
    stepIndicators.forEach((indicator) => {
      const indicatorStep = Number(indicator.getAttribute('data-step-indicator'));
      const isActive = indicatorStep === state.step;
      indicator.classList.toggle('is-active', isActive);
      indicator.classList.toggle('is-complete', indicatorStep < state.step && indicatorStep <= maxStep);
      indicator.disabled = indicatorStep > maxStep;
      indicator.setAttribute('aria-selected', String(isActive));
    });
  }

  function canProceed() {
    if (state.step === 1) return Boolean(state.selectedCategory);
    if (state.step === 2) return Boolean(state.selectedTemplate);
    return true;
  }

  function updateControls() {
    if (prevButton) {
      prevButton.disabled = state.step === 1;
    }

    if (nextButton) {
      nextButton.disabled = !canProceed();
      nextButton.textContent = state.step === 3 ? 'Selesai & Checkout' : 'Lanjut';
    }

    if (checkoutButton) {
      checkoutButton.disabled = !state.selectedTemplate;
    }
  }

  function getSelectedOptions() {
    if (!optionForm) return [];
    return Array.from(optionForm.querySelectorAll('input[data-option]:checked')).map((input) => {
      const label = input.nextElementSibling?.querySelector('strong')?.textContent?.trim() || input.dataset.option || '';
      const price = Number(input.value || 0);
      return { key: input.dataset.option || '', label, price };
    });
  }

  function calculateTotal() {
    if (!state.selectedTemplate) return 0;
    const extras = getSelectedOptions();
    const extrasTotal = extras.reduce((sum, option) => sum + option.price, 0);
    return state.selectedTemplate.basePrice + extrasTotal;
  }

  function updateSummary() {
    summaryCategory.textContent = state.selectedCategory || 'Belum dipilih';

    if (!state.selectedTemplate) {
      summaryTemplate.textContent = 'Belum dipilih';
      summaryOptions.textContent = '-';
      summaryTotal.textContent = formatCurrency(0);
      return;
    }

    summaryTemplate.textContent = `${state.selectedTemplate.name} (${formatCurrency(state.selectedTemplate.basePrice)})`;

    const extras = getSelectedOptions();
    if (extras.length) {
      summaryOptions.textContent = extras
        .map((extra) => `${extra.label} (+${formatCurrency(extra.price)})`)
        .join(', ');
    } else {
      summaryOptions.textContent = '-';
    }

    summaryTotal.textContent = formatCurrency(calculateTotal());
  }

  function renderCategoryChips() {
    if (!categoryContainer) return;
    const categories = Array.from(new Set(templates.map((template) => template.category)));
    categoryContainer.innerHTML = '';

    categories.forEach((category) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chip';
      button.textContent = category;
      button.dataset.category = category;
      if (state.selectedCategory === category) {
        button.classList.add('is-selected');
      }
      categoryContainer.append(button);
    });
  }

  function renderTemplateList() {
    if (!templateList) return;
    templateList.innerHTML = '';

    if (!state.selectedCategory) {
      templateList.innerHTML = `
        <div class="builder-empty">
          <strong>Pilih kategori terlebih dahulu</strong>
          <p>Kami akan menampilkan template yang paling relevan setelah kamu memilih kategori.</p>
        </div>
      `;
      return;
    }

    const filteredTemplates = templates.filter(
      (template) => template.category === state.selectedCategory
    );

    if (!filteredTemplates.length) {
      templateList.innerHTML = `
        <div class="builder-empty">
          <strong>Belum ada template</strong>
          <p>Kami sedang menambahkan lebih banyak dokumen untuk kategori ini.</p>
        </div>
      `;
      return;
    }

    filteredTemplates.forEach((template) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'template-card';
      card.dataset.templateId = template.id;
      if (state.selectedTemplate?.id === template.id) {
        card.classList.add('is-selected');
      }

      card.innerHTML = `
        <div class="template-card__meta">
          <span>${template.duration}</span>
          <span>${formatCurrency(template.basePrice)}</span>
        </div>
        <div>
          <strong>${template.name}</strong>
        </div>
        <p>${template.description}</p>
      `;

      templateList.append(card);
    });
  }

  categoryContainer?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    const { category } = button.dataset;
    state.selectedCategory = category || null;
    state.selectedTemplate = null;

    if (optionForm) {
      optionForm.reset();
    }

    renderCategoryChips();
    renderTemplateList();
    updateSummary();
    setStep(state.step < 2 ? 2 : state.step);
  });

  templateList?.addEventListener('click', (event) => {
    const card = event.target.closest('[data-template-id]');
    if (!card) return;
    const templateId = card.getAttribute('data-template-id');
    const template = templates.find((item) => item.id === templateId);
    if (!template) return;

    state.selectedTemplate = template;
    renderTemplateList();
    updateSummary();
    setStep(state.step < 3 ? 3 : state.step);
  });

  optionForm?.addEventListener('change', () => {
    updateSummary();
  });

  stepIndicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      if (indicator.disabled) return;
      const step = Number(indicator.getAttribute('data-step-indicator'));
      setStep(step);
      updateSummary();
    });
  });

  prevButton?.addEventListener('click', () => {
    setStep(state.step - 1);
    updateSummary();
  });

  nextButton?.addEventListener('click', () => {
    if (state.step === 3) {
      if (!state.selectedTemplate) return;
      checkoutButton?.click();
      return;
    }

    if (!canProceed()) return;
    setStep(state.step + 1);
    updateSummary();
  });

  checkoutButton?.addEventListener('click', () => {
    if (!state.selectedTemplate) return;
    const total = calculateTotal();
    const extras = getSelectedOptions();
    const extrasLabel = extras.length
      ? `\n• ${extras.map((extra) => `${extra.label} (+${formatCurrency(extra.price)})`).join('\n• ')}`
      : '\n• Tanpa layanan tambahan';

    // Placeholder for future integration with payment flow
    window.alert(
      `Simulasi checkout\n\nDokumen: ${state.selectedTemplate.name}\nEstimasi total: ${formatCurrency(
        total
      )}${extrasLabel}\n\nIntegrasikan dengan payment gateway untuk melanjutkan.`
    );
  });

  renderCategoryChips();
  renderTemplateList();
  updateSummary();
  setStep(1);
}

// Word rotator in hero
(() => {
  const rotator = document.querySelector('.word-rotator');
  if (!rotator) return;
  let words = [];
  try {
    words = JSON.parse(rotator.getAttribute('data-words')) || [];
  } catch { words = []; }
  if (!words.length) return;
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % words.length;
    rotator.textContent = words[idx];
  }, 2200);
})();

// Subtle parallax for hero orbs
(() => {
  const orbs = document.querySelectorAll('.fx-orb');
  if (!orbs.length) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    orbs.forEach((o, i) => {
      o.style.transform = `translateY(${y * (0.02 + i * 0.01)}px)`;
    });
  }, { passive: true });
})();

// Product cards keyboard-accessible hover cue
(() => {
  const cards = document.querySelectorAll('.product-card.is-link');
  cards.forEach((card) => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        card.click();
        e.preventDefault();
      }
    });
  });
})();

// 3D Tilt effect for offer panels
(() => {
  const panels = document.querySelectorAll('[data-tilt]');
  
  panels.forEach((panel) => {
    let isHovering = false;
    
    panel.addEventListener('mouseenter', () => {
      isHovering = true;
    });
    
    panel.addEventListener('mousemove', (e) => {
      if (!isHovering) return;
      
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      
      panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    
    panel.addEventListener('mouseleave', () => {
      isHovering = false;
      panel.style.transform = '';
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

