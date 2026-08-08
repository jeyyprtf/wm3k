/**
 * WARUNG MADURA 3000 - GEN Z ULTRA CONVENIENCE STORE
 * Real OpenAI-Compatible Chatbot with Grounded RAG Scope Guardrails
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Store Catalog Knowledge Base (RAG Source of Truth)
  // =========================================================================
  const products = [
    {
      id: 'wm-01',
      name: 'Indomie Goreng Special',
      category: 'makanan',
      price: 3500,
      icon: '🍜',
      tag: 'BEST SELLER',
      desc: 'Racikan legend jam 3 pagi. Tekstur kenyal, bumbu pas.'
    },
    {
      id: 'wm-02',
      name: 'Indomie Kuah Ayam Bawang + Telur',
      category: 'makanan',
      price: 6500,
      icon: '🍲',
      tag: 'FAVORIT BEGADANG',
      desc: 'Kuah hangat gurih lengkap dengan telur racik Cak Madura.'
    },
    {
      id: 'wm-03',
      name: 'Es Capcin Bubble Extra Ice',
      category: 'minuman',
      price: 8000,
      icon: '🧋',
      tag: 'SUPER SEGAR',
      desc: 'Cappuccino cincau blender manis pas, es melimpah.'
    },
    {
      id: 'wm-04',
      name: 'Pop Ice Chocolate Top Cincau',
      category: 'minuman',
      price: 6000,
      icon: '🥤',
      tag: 'GEN Z MUST',
      desc: 'Pop ice rasa cokelat premium dengan topping cincau kenyal.'
    },
    {
      id: 'wm-05',
      name: 'Beras Premium Madura (5 kg)',
      category: 'sembako',
      price: 68000,
      icon: '🌾',
      tag: 'PULEN 100%',
      desc: 'Beras putih bersih, tanpa pemutih buatan, nasi jadi pulen.'
    },
    {
      id: 'wm-06',
      name: 'Minyak Goreng Sawit (2 Liter)',
      category: 'sembako',
      price: 34000,
      icon: '🧴',
      tag: 'STOK LENGKAP',
      desc: 'Bening jernih, buat goreng kerupuk atau gorengan makin garing.'
    },
    {
      id: 'wm-07',
      name: 'Pertamini Gold (1 Liter)',
      category: 'pertamini',
      price: 13500,
      icon: '⛽',
      tag: 'PURE 100%',
      desc: 'Bensin eceran murni dari tangki khusus. Tanpa campuran air.'
    },
    {
      id: 'wm-08',
      name: 'Kopi Kapal Api Seduh Panas',
      category: 'minuman',
      price: 4000,
      icon: '☕',
      tag: 'AMUNISI REVISI',
      desc: 'Kopi hitam pahit manis mantap, penahan kantuk deadline.'
    },
    {
      id: 'wm-09',
      name: 'Rokok Filter Batangan (Per Btg)',
      category: 'snack',
      price: 2500,
      icon: '🚬',
      tag: 'ECERAN READY',
      desc: 'Bisa beli batangan santai, disajikan rapi di bungkusnya.'
    },
    {
      id: 'wm-10',
      name: 'Katak & Snack Potato Ring',
      category: 'snack',
      price: 5000,
      icon: '🍿',
      tag: 'CRUNCHY',
      desc: 'Camilan garing gurih teman nonton film atau push rank.'
    },
    {
      id: 'wm-11',
      name: 'Obat Sakit Kepala & Paracetamol',
      category: 'essential',
      price: 4500,
      icon: '💊',
      tag: 'P3K 24 JAM',
      desc: 'Pertolongan pertama waktu pusing mikirin tugas/kerjaan.'
    },
    {
      id: 'wm-12',
      name: 'Tolak Angin Cair (1 Sachet)',
      category: 'essential',
      price: 4000,
      icon: '🌿',
      tag: 'ANTI MASUK ANGIN',
      desc: 'Penyelamat pas pulang malam keanginan naik motor.'
    }
  ];

  // Application State
  let cart = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let promoDiscount = 0;
  let isSoundEnabled = true;

  // AI Configuration State (Persisted in localStorage)
  let aiConfig = {
    baseUrl: localStorage.getItem('wm3k_ai_base_url') || 'https://api.openai.com/v1',
    apiKey: localStorage.getItem('wm3k_ai_api_key') || '',
    model: localStorage.getItem('wm3k_ai_model') || 'gpt-4o-mini',
    temperature: parseFloat(localStorage.getItem('wm3k_ai_temp') || '0.7')
  };

  // Conversational History for OpenAI API
  let conversationHistory = [];

  // =========================================================================
  // 2. Sound Effects Synthesizer (Web Audio API)
  // =========================================================================
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playSound(type) {
    if (!isSoundEnabled || !audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'add') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'cash') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'chat') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  }

  document.querySelectorAll('.sound-click').forEach(el => {
    el.addEventListener('click', () => playSound('click'));
  });

  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  soundToggleBtn.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    soundToggleBtn.innerHTML = isSoundEnabled ? 
      '<i class="fa-solid fa-volume-high"></i>' : 
      '<i class="fa-solid fa-volume-xmark"></i>';
    showToast(isSoundEnabled ? '🔊 Suara Aktif' : '🔇 Suara Dimatikan');
  });

  // =========================================================================
  // 3. Real-time Clock Ticker
  // =========================================================================
  function updateClock() {
    const now = new Date();
    const options = { timeZone: 'Asia/Jakarta', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeStr = now.toLocaleTimeString('id-ID', options) + ' WIB';
    document.getElementById('live-clock').textContent = timeStr;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // =========================================================================
  // 4. Catalog Render & Search Logic
  // =========================================================================
  const productGrid = document.getElementById('product-grid');
  const emptyState = document.getElementById('empty-catalog-state');
  const searchInput = document.getElementById('product-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const filterChips = document.querySelectorAll('.chip');

  function renderProducts() {
    productGrid.innerHTML = '';
    
    const filtered = products.filter(p => {
      const matchesCategory = (currentCategory === 'all') || (p.category === currentCategory);
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      emptyState.classList.remove('hidden');
      return;
    } else {
      emptyState.classList.add('hidden');
    }

    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <span class="tag tag-red card-top-tag">${product.tag}</span>
        <div class="product-icon">${product.icon}</div>
        <span class="product-category-label">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <div class="product-card-footer">
          <span class="product-price">Rp ${product.price.toLocaleString('id-ID')}</span>
          <button class="add-cart-btn sound-click" data-id="${product.id}">
            + Tambah
          </button>
        </div>
      `;

      card.querySelector('.add-cart-btn').addEventListener('click', () => {
        addToCart(product.id);
        playSound('add');
      });

      productGrid.appendChild(card);
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      filterChips.forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-category');
      playSound('click');
      renderProducts();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    renderProducts();
  });

  document.getElementById('reset-filter-btn')?.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    currentCategory = 'all';
    filterChips.forEach(c => c.classList.remove('active'));
    filterChips[0].classList.add('active');
    renderProducts();
  });

  renderProducts();

  // =========================================================================
  // 5. Cart Engine Logic
  // =========================================================================
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartBadgeCount = document.getElementById('cart-badge-count');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalText = document.getElementById('cart-subtotal-text');
  const cartDiscountText = document.getElementById('cart-discount-text');
  const cartTotalText = document.getElementById('cart-total-text');
  const checkoutBtn = document.getElementById('checkout-btn');

  function addToCart(productId, customQty = 1, customItemData = null) {
    let targetProduct = products.find(p => p.id === productId);

    if (!targetProduct && customItemData) {
      targetProduct = customItemData;
    }

    if (!targetProduct) return;

    const existingIndex = cart.findIndex(item => item.id === targetProduct.id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += customQty;
    } else {
      cart.push({
        ...targetProduct,
        qty: customQty
      });
    }

    updateCartUI();
    showToast(`🛒 ${targetProduct.name} ditambahkan!`);
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadgeCount.textContent = totalItems;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🛒</div>
          <p>Keranjang kamu masih kosong, bos!</p>
        </div>
      `;
      checkoutBtn.disabled = true;
    } else {
      cartItemsContainer.innerHTML = '';
      cart.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item-row';
        itemRow.innerHTML = `
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span class="cart-item-price">Rp ${(item.price * item.qty).toLocaleString('id-ID')}</span>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn dec-btn" data-id="${item.id}">-</button>
            <span class="qty-text">${item.qty}</span>
            <button class="qty-btn inc-btn" data-id="${item.id}">+</button>
          </div>
        `;

        itemRow.querySelector('.dec-btn').addEventListener('click', () => {
          changeQty(item.id, -1);
          playSound('click');
        });

        itemRow.querySelector('.inc-btn').addEventListener('click', () => {
          changeQty(item.id, 1);
          playSound('click');
        });

        cartItemsContainer.appendChild(itemRow);
      });
      checkoutBtn.disabled = false;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discountAmount = Math.round(subtotal * promoDiscount);
    const finalTotal = subtotal - discountAmount;

    cartSubtotalText.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    cartDiscountText.textContent = `- Rp ${discountAmount.toLocaleString('id-ID')}`;
    cartTotalText.textContent = `Rp ${finalTotal.toLocaleString('id-ID')}`;

    const totalInput = document.getElementById('total-belanja-input');
    if (totalInput && subtotal > 0) {
      totalInput.value = subtotal;
      calculateChange();
    }
  }

  function changeQty(id, delta) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      cart[itemIndex].qty += delta;
      if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
      }
    }
    updateCartUI();
  }

  openCartBtn.addEventListener('click', () => {
    cartDrawerOverlay.classList.remove('hidden');
    playSound('click');
  });

  closeCartBtn.addEventListener('click', () => {
    cartDrawerOverlay.classList.add('hidden');
    playSound('click');
  });

  cartDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === cartDrawerOverlay) {
      cartDrawerOverlay.classList.add('hidden');
    }
  });

  document.getElementById('apply-promo-btn').addEventListener('click', () => {
    const promoInput = document.getElementById('promo-input').value.trim().toUpperCase();
    const badge = document.getElementById('promo-discount-badge');

    if (promoInput === 'MADURA247' || promoInput === 'GENZ') {
      promoDiscount = 0.10;
      badge.classList.remove('hidden');
      playSound('cash');
      showToast('🎉 Promo Berhasil! Diskon 10%');
    } else {
      showToast('❌ Kode Promo Tidak Valid');
    }
    updateCartUI();
  });

  document.querySelectorAll('[data-quick-add]').forEach(el => {
    el.addEventListener('click', () => {
      const name = el.getAttribute('data-quick-add');
      const found = products.find(p => p.name === name);
      if (found) {
        addToCart(found.id);
        playSound('add');
      }
    });
  });

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    playSound('cash');
    let message = `*HALO WARUNG MADURA 3000, SAYA MAU ORDER!*%0A%0A`;
    cart.forEach(item => {
      message += `• ${item.name} (x${item.qty}) - Rp ${(item.price * item.qty).toLocaleString('id-ID')}%0A`;
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const finalTotal = subtotal - Math.round(subtotal * promoDiscount);

    message += `%0A*TOTAL AKHIR: Rp ${finalTotal.toLocaleString('id-ID')}*%0A`;
    message += `Mohon segera diproses & dikirim ya Cak! 🚀`;

    const waUrl = `https://wa.me/6281234567890?text=${message}`;
    window.open(waUrl, '_blank');
  });

  // =========================================================================
  // 6. Pertamini & Change Calculator Widgets
  // =========================================================================
  const literRange = document.getElementById('liter-range');
  const literOutput = document.getElementById('liter-output');
  const meterPriceDisplay = document.getElementById('meter-price-display');
  const meterLiterDisplay = document.getElementById('meter-liter-display');
  const fuelTypeBtns = document.querySelectorAll('.fuel-type-btn');
  const addPertaminiBtn = document.getElementById('add-pertamini-btn');

  let currentFuelPrice = 13500;
  let currentFuelName = 'Pertamax Gold';

  fuelTypeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      fuelTypeBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFuelPrice = parseInt(e.target.getAttribute('data-price'));
      currentFuelName = e.target.textContent.split('(')[0].trim();
      updatePertaminiMeter();
      playSound('click');
    });
  });

  literRange.addEventListener('input', updatePertaminiMeter);

  function updatePertaminiMeter() {
    const liters = parseFloat(literRange.value);
    const totalPrice = liters * currentFuelPrice;

    literOutput.textContent = liters.toFixed(1);
    meterLiterDisplay.textContent = liters.toFixed(2);
    meterPriceDisplay.textContent = totalPrice.toLocaleString('id-ID');
  }

  addPertaminiBtn.addEventListener('click', () => {
    const liters = parseFloat(literRange.value);
    const totalPrice = liters * currentFuelPrice;

    const customFuelItem = {
      id: `pertamini-${Date.now()}`,
      name: `${currentFuelName} (${liters} Liter)`,
      price: totalPrice,
      category: 'pertamini',
      icon: '⛽',
      tag: 'BENSIN'
    };

    addToCart(customFuelItem.id, 1, customFuelItem);
    playSound('add');
  });

  document.getElementById('buy-combo-btn').addEventListener('click', () => {
    const comboItem = {
      id: `combo-deadliner-${Date.now()}`,
      name: 'Paket Skena Begadanger 03:00 AM',
      price: 19900,
      category: 'makanan',
      icon: '🌙',
      tag: 'COMBO'
    };

    addToCart(comboItem.id, 1, comboItem);
    playSound('add');
  });

  const totalBelanjaInput = document.getElementById('total-belanja-input');
  const uangBayarSelect = document.getElementById('uang-bayar-input');
  const calcCashText = document.getElementById('calc-kembalian-cash');
  const calcPermenText = document.getElementById('calc-kembalian-permen');

  function calculateChange() {
    const total = parseInt(totalBelanjaInput.value) || 0;
    const paid = parseInt(uangBayarSelect.value) || 0;

    const change = paid - total;

    if (change < 0) {
      calcCashText.textContent = 'Kurang Rp ' + Math.abs(change).toLocaleString('id-ID');
      calcPermenText.textContent = 'Silakan tambah uang bayarnya Cak!';
    } else if (change === 0) {
      calcCashText.textContent = 'Uang Pas! (Rp 0)';
      calcPermenText.textContent = 'Mantap, gak perlu kembalian permen.';
    } else {
      calcCashText.textContent = 'Rp ' + change.toLocaleString('id-ID');
      
      const sisaRatusan = change % 1000;
      if (sisaRatusan > 0) {
        const butirPermen = Math.ceil(sisaRatusan / 200);
        const cashRounded = change - sisaRatusan;
        calcPermenText.textContent = `${butirPermen} Butir Permen + Rp ${cashRounded.toLocaleString('id-ID')}`;
      } else {
        calcPermenText.textContent = 'Uang lembaran pas tanpa kembalian permen!';
      }
    }
  }

  totalBelanjaInput.addEventListener('input', calculateChange);
  uangBayarSelect.addEventListener('change', () => {
    calculateChange();
    playSound('click');
  });
  calculateChange();

  // =========================================================================
  // 7. REAL AI MODEL CHATBOT (OpenAI Compatible API + RAG Guardrails)
  // =========================================================================
  const chatMessagesContainer = document.getElementById('chat-messages-container');
  const chatInputForm = document.getElementById('chat-input-form');
  const chatUserInput = document.getElementById('chat-user-input');
  const chatTypingIndicator = document.getElementById('chat-typing-indicator');
  const sendMsgBtn = document.getElementById('send-msg-btn');
  const aiStatusIndicator = document.getElementById('ai-status-indicator');

  // AI Modal Elements
  const aiModalOverlay = document.getElementById('ai-modal-overlay');
  const openAiSettingsModalBtn = document.getElementById('open-ai-settings-modal');
  const aiSettingsBtn = document.getElementById('ai-settings-btn');
  const closeAiModalBtn = document.getElementById('close-ai-modal-btn');
  const saveAiCfgBtn = document.getElementById('save-ai-cfg-btn');

  const cfgBaseUrl = document.getElementById('cfg-base-url');
  const cfgApiKey = document.getElementById('cfg-api-key');
  const cfgModelName = document.getElementById('cfg-model-name');
  const cfgTemperature = document.getElementById('cfg-temperature');

  // Populate initial config modal fields
  cfgBaseUrl.value = aiConfig.baseUrl;
  cfgApiKey.value = aiConfig.apiKey;
  cfgModelName.value = aiConfig.model;
  cfgTemperature.value = aiConfig.temperature;

  function updateAiStatusBadge() {
    if (aiConfig.apiKey && aiConfig.apiKey.trim() !== '') {
      aiStatusIndicator.innerHTML = `<i class="fa-solid fa-circle text-green"></i> AI Connected (${aiConfig.model})`;
    } else {
      aiStatusIndicator.innerHTML = `<i class="fa-solid fa-circle style="color:var(--gold-yellow)"></i> Hybrid Local RAG (API Key belum diisi)`;
    }
  }
  updateAiStatusBadge();

  // Modal Handlers
  function openAiModal() {
    aiModalOverlay.classList.remove('hidden');
  }

  function closeAiModal() {
    aiModalOverlay.classList.add('hidden');
  }

  openAiSettingsModalBtn.addEventListener('click', openAiModal);
  aiSettingsBtn.addEventListener('click', openAiModal);
  closeAiModalBtn.addEventListener('click', closeAiModal);
  aiModalOverlay.addEventListener('click', (e) => {
    if (e.target === aiModalOverlay) closeAiModal();
  });

  saveAiCfgBtn.addEventListener('click', () => {
    aiConfig.baseUrl = cfgBaseUrl.value.trim() || 'https://api.openai.com/v1';
    aiConfig.apiKey = cfgApiKey.value.trim();
    aiConfig.model = cfgModelName.value.trim() || 'gpt-4o-mini';
    aiConfig.temperature = parseFloat(cfgTemperature.value) || 0.7;

    localStorage.setItem('wm3k_ai_base_url', aiConfig.baseUrl);
    localStorage.setItem('wm3k_ai_api_key', aiConfig.apiKey);
    localStorage.setItem('wm3k_ai_model', aiConfig.model);
    localStorage.setItem('wm3k_ai_temp', aiConfig.temperature.toString());

    closeAiModal();
    updateAiStatusBadge();
    showToast('⚙️ Konfigurasi AI Berhasil Disimpan!');
  });

  // Construct Strong System Prompt & Grounded RAG Knowledge Context
  function buildSystemPrompt() {
    const productCatalogText = products.map(p => 
      `- ${p.name} (${p.category}): Rp ${p.price.toLocaleString('id-ID')} | Tag: ${p.tag} | Info: ${p.desc}`
    ).join('\n');

    return `Kamu adalah "Cak Madura AI", pemilik dan kasir Warung Madura 3000 (Gen Z Ultra Convenience Store) yang ramah, kocak, gaul ala Gen Z tapi tetap santun dengan dialek khas Madura ("dek", "cak", "sam", "tanean lanjang").
Warungmu BUKA 24 JAM NONSTOP 365 HARI (Libur H-1 Kiamat).

INFORMASI TOKO & KATALOG LENGKAP (RAG KNOWLEDGE BASE):
1. PRODUK & HARGA:
${productCatalogText}

2. PAKET COMBO & PROMO:
- Paket Skena Begadanger 03:00 AM: Rp 19.900 (Indomie Goreng Double Telur + Es Capcin + Air Mineral 1.5L + Snack Potato Ring).
- Kode Promo Keranjang: "MADURA247" atau "GENZ" dapat diskon 10%.

3. KEMBALIAN & BENSIN PERTAMINI:
- Pertamini Gold: Rp 13.500/liter (Pertamax Murni 100% tanpa campuran air).
- Pertalite Super: Rp 10.000/liter.
- Kembalian receh/koin kecil di bawah Rp 1.000 otomatis bisa diganti butir permen jika koin habis di kasir.

4. ATURAN KETAT & GUARDRAILS (SCOPE ENFORCEMENT):
- Jawab HANYA pertanyaan yang berhubungan dengan Warung Madura 3000, produk makanan/minuman, bensin Pertamini, jam operasional, lokasi warung, promo, rekomendasi jajan begadang jam 3 pagi, dan cara checkout.
- JIKA USER MENANYAKAN HAL DI LUAR WARUNG (seperti: menulis kode/program, matematika kompleks, politik, sejarah dunia, ujian/tugas sekolah, fisika kuantum, nulis esai, atau topik non-warung):
  PRINSIP REFUSAL KETAT: Tolak dengan tegas tapi lucu memakai persona Cak Madura. 
  Contoh penolakan: "Waduh dek, Cak Madura ini spesialis seduh Indomie sama nakar bensin Pertamini jam 3 pagi, bukan guru les fisika/coding! Mending sam pesan Es Capcin atau Indomie telur nyemek dulu biar pikiran adem!"
- JANGAN PERNAH KELUAR DARI PERSONA CAK MADURA. Jawab dengan ringkas (maksimal 2-4 kalimat).`;
  }

  function addChatMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    bubble.innerHTML = `
      <div class="bubble-content">${escapeHTML(text)}</div>
      <span class="chat-time">${timeStr}</span>
    `;

    chatMessagesContainer.appendChild(bubble);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    
    if (sender === 'bot') {
      playSound('chat');
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Local RAG Fallback when API Key is missing or network fails
  function getLocalFallbackResponse(userMsg) {
    const lower = userMsg.toLowerCase();

    // Check Out-of-Scope triggers locally first
    const outOfScopeKeywords = ['python', 'javascript', 'coding', 'script', 'function', 'matematika', 'fisika', 'politik', 'presiden', 'skripsi', 'algoritma', 'essay'];
    if (outOfScopeKeywords.some(kw => lower.includes(kw))) {
      return "Waduh dek! Cak Madura ini jagonya racik Indomie kuah kornet sama nakar Pertamini murni jam 3 pagi, bukan guru les coding/akademik! Mending sam seduh Kopi Kapal Api atau beli Paket Begadang biar seger pikiran!";
    }

    if (lower.includes('libur') || lower.includes('jam') || lower.includes('tutup')) {
      return "Warung Madura 3000 buka 24 JAM NONSTOP 365 hari dek! Kita baru libur H-1 Kiamat, mampir aja jam 2 atau 3 pagi tetap melayani!";
    }
    if (lower.includes('indomie') || lower.includes('mie') || lower.includes('telur')) {
      return "Indomie Goreng (Rp 3.500) & Indomie Kuah + Telur (Rp 6.500) ready terus! Bisa request kuah nyemek pedes gurih racikan Cak Madura.";
    }
    if (lower.includes('bensin') || lower.includes('pertamini') || lower.includes('pertamax')) {
      return "Bensin eceran Pertamini Gold kita Rp 13.500/liter, 100% murni tanpa campuran air. Siap diisi ke motor kamu kapan saja!";
    }
    if (lower.includes('capcin') || lower.includes('es') || lower.includes('pop ice')) {
      return "Es Capcin Bubble Extra Ice cuma Rp 8.000 dek! Dinginnya nembus tulang, pas banget penahan gerah begadang!";
    }

    return "Siap dek! Semua sembako, bensin Pertamini, Indomie, dan Es Capcin ready di etalase. Mau dimasukkan ke keranjang web atau order via WhatsApp?";
  }

  // Fetch response from OpenAI-Compatible API
  async function fetchAiResponse(userMessage) {
    // If no API key provided, gracefully fallback to local RAG engine
    if (!aiConfig.apiKey || aiConfig.apiKey.trim() === '') {
      await new Promise(res => setTimeout(res, 600)); // Simulate typing latency
      return getLocalFallbackResponse(userMessage);
    }

    const endpoint = `${aiConfig.baseUrl.replace(/\/+$/, '')}/chat/completions`;

    // Construct API Payload with RAG system prompt + conversation history
    const messagesPayload = [
      { role: 'system', content: buildSystemPrompt() },
      ...conversationHistory.slice(-6), // Keep context concise
      { role: 'user', content: userMessage }
    ];

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${aiConfig.apiKey}`
        },
        body: JSON.stringify({
          model: aiConfig.model,
          messages: messagesPayload,
          temperature: aiConfig.temperature,
          max_tokens: 400
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.warn('AI API Error:', response.status, errData);
        throw new Error(errData.error?.message || `API HTTP ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.choices[0]?.message?.content?.trim();

      if (!botReply) throw new Error('Format respon AI tidak valid.');

      // Push to history
      conversationHistory.push({ role: 'user', content: userMessage });
      conversationHistory.push({ role: 'assistant', content: botReply });

      return botReply;

    } catch (err) {
      console.error('Fetch AI error, fallback activated:', err);
      showToast('⚠️ AI API Error, menggunakan Local RAG Fallback');
      return getLocalFallbackResponse(userMessage);
    }
  }

  async function handleUserMessage(userMsg) {
    addChatMessage('user', userMsg);
    
    // Show typing state
    chatTypingIndicator.classList.remove('hidden');
    sendMsgBtn.disabled = true;

    const botReply = await fetchAiResponse(userMsg);

    chatTypingIndicator.classList.add('hidden');
    sendMsgBtn.disabled = false;
    
    addChatMessage('bot', botReply);
  }

  chatInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatUserInput.value.trim();
    if (!text) return;

    chatUserInput.value = '';
    handleUserMessage(text);
  });

  document.querySelectorAll('.prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const promptText = btn.getAttribute('data-prompt');
      handleUserMessage(promptText);
    });
  });

  document.getElementById('clear-chat-btn')?.addEventListener('click', () => {
    conversationHistory = [];
    chatMessagesContainer.innerHTML = `
      <div class="chat-bubble bot">
        <div class="bubble-content">
          Chat dibersihkan, Cak! Silakan tanya seputar stok warung atau pesan Indomie lagi.
        </div>
        <span class="chat-time">Baru saja</span>
      </div>
    `;
    playSound('click');
    showToast('🗑️ Riwayat Chat Dibersihkan');
  });

  // =========================================================================
  // 8. Toast Helper
  // =========================================================================
  const toastContainer = document.getElementById('toast-container');

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

});
