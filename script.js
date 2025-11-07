const scrollTriggers = document.querySelectorAll('[data-scroll-target]');

scrollTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    const selector = trigger.getAttribute('data-scroll-target');
    if (!selector) return;
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

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

// DEMO BUILDER: Lease Agreement live preview
(() => {
  const demo = document.querySelector('.demo');
  if (!demo) return;

  const languageToggles = demo.querySelectorAll('.toggle[data-language]');
  const previewMode = demo.querySelector('#previewMode');
  const previewBody = demo.querySelector('#previewBody');
  const previewGenerator = demo.querySelector('#previewGenerator');
  const form = demo.querySelector('#leaseForm');
  const resetBtn = demo.querySelector('#resetDemo');
  const generateBtn = demo.querySelector('#generateDemo');

  const inputs = {
    landlord: form.querySelector('#landlord'),
    tenant: form.querySelector('#tenant'),
    address: form.querySelector('#address'),
    period: form.querySelector('#period'),
  };

  let mode = 'id';

  function toSafe(value) {
    return (value || '').toString().trim();
  }

  function fallback(value, placeholder = '____') {
    return value && String(value).trim().length ? value : placeholder;
  }

  function renderID() {
    const landlord = fallback(toSafe(inputs.landlord.value), '[Landlord Name]');
    const tenant = fallback(toSafe(inputs.tenant.value), '[Tenant Name]');
    const address = fallback(toSafe(inputs.address.value), '[Property Address]');
    const period = fallback(toSafe(inputs.period.value), '[Rental Period]');

    return `
      <div class="preview-clause"><strong>PERJANJIAN SEWA MENYEWA</strong></div>
      <div class="preview-clause">Antara ${landlord} ("Pihak Pertama") dan ${tenant} ("Pihak Kedua").</div>
      <div class="preview-clause">Pihak Pertama setuju untuk menyewakan properti yang berlokasi di ${address} kepada Pihak Kedua untuk jangka waktu ${period}.</div>
    `;
  }

  function renderEN() {
    const landlord = fallback(toSafe(inputs.landlord.value), '[Landlord Name]');
    const tenant = fallback(toSafe(inputs.tenant.value), '[Tenant Name]');
    const address = fallback(toSafe(inputs.address.value), '[Property Address]');
    const period = fallback(toSafe(inputs.period.value), '[Rental Period]');

    return `
      <div class="preview-clause"><strong>LEASE AGREEMENT / PERJANJIAN SEWA MENYEWA</strong></div>
      <div class="preview-clause">Between ${landlord} ("First Party") and ${tenant} ("Second Party").</div>
      <div class="preview-clause">The First Party agrees to lease the property located at ${address} to the Second Party for a period of ${period}.</div>
    `;
  }

  function renderPreview() {
    if (mode === 'id') {
      previewBody.innerHTML = renderID();
      previewMode.textContent = 'ID';
    } else {
      previewBody.innerHTML = `${renderID()}<hr/>${renderEN()}`;
      previewMode.textContent = 'BI';
    }
  }

  languageToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      languageToggles.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      mode = btn.getAttribute('data-language');
      renderPreview();
    });
  });

  Object.values(inputs).forEach((input) => {
    input.addEventListener('input', renderPreview);
    input.addEventListener('change', renderPreview);
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    renderPreview();
  });

  generateBtn.addEventListener('click', () => {
    previewGenerator.classList.add('is-visible');
    previewGenerator.setAttribute('aria-hidden', 'false');
    generateBtn.disabled = true;

    // Run spinner animation twice then show success
    setTimeout(() => {
      previewGenerator.querySelector('.gen-text').textContent = 'Packing pages…';
    }, 900);

    setTimeout(() => {
      previewGenerator.innerHTML = '<div class="paper-spinner" aria-hidden="true"></div><p>Almost there…</p>';
    }, 1300);

    setTimeout(() => {
      previewGenerator.innerHTML = '✅ Demo only: contract generated!';
      generateBtn.disabled = false;
    }, 2000);
  });

  renderPreview();
})();

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

