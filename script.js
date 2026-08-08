/**
 * WARUNG MADURA 3000 - GEN Z ULTRA CONVENIENCE STORE
 * Front-end Logic & Natural Fallback Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 0. LENIS SMOOTH SCROLL ENGINE & ANCHOR NAVIGATION
  // =========================================================================
  let lenisInstance = null;

  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1
    });

    function renderLenis(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(renderLenis);
    }
    requestAnimationFrame(renderLenis);
  }

  // Smooth scroll handler for anchor navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (lenisInstance) {
          lenisInstance.scrollTo(target, { offset: -80, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Catalog Products
  const products = [
    { id: 'wm-01', name: 'Indomie Goreng Special', category: 'makanan', price: 3500, icon: '🍜', tag: 'BEST SELLER', desc: 'Racikan legend jam 3 pagi. Tekstur kenyal, bumbu pas.' },
    { id: 'wm-02', name: 'Indomie Kuah Ayam Bawang + Telur', category: 'makanan', price: 6500, icon: '🍲', tag: 'FAVORIT BEGADANG', desc: 'Kuah hangat gurih lengkap dengan telur racik Cak Madura.' },
    { id: 'wm-03', name: 'Es Capcin Bubble Extra Ice', category: 'minuman', price: 8000, icon: '🧋', tag: 'SUPER SEGAR', desc: 'Cappuccino cincau blender manis pas, es melimpah.' },
    { id: 'wm-04', name: 'Pop Ice Chocolate Top Cincau', category: 'minuman', price: 6000, icon: '🥤', tag: 'GEN Z MUST', desc: 'Pop ice rasa cokelat premium dengan topping cincau kenyal.' },
    { id: 'wm-05', name: 'Beras Premium Madura (5 kg)', category: 'sembako', price: 68000, icon: '🌾', tag: 'PULEN 100%', desc: 'Beras putih bersih, tanpa pemutih buatan, nasi jadi pulen.' },
    { id: 'wm-06', name: 'Minyak Goreng Sawit (2 Liter)', category: 'sembako', price: 34000, icon: '🧴', tag: 'STOK LENGKAP', desc: 'Bening jernih, buat goreng kerupuk atau gorengan makin garing.' },
    { id: 'wm-07', name: 'Pertamini Gold (1 Liter)', category: 'pertamini', price: 13500, icon: '⛽', tag: 'PURE 100%', desc: 'Bensin eceran murni dari tangki khusus. Tanpa campuran air.' },
    { id: 'wm-08', name: 'Kopi Kapal Api Seduh Panas', category: 'minuman', price: 4000, icon: '☕', tag: 'AMUNISI REVISI', desc: 'Kopi hitam pahit manis mantap, penahan kantuk deadline.' },
    { id: 'wm-09', name: 'Rokok Filter Batangan (Per Btg)', category: 'snack', price: 2500, icon: '🚬', tag: 'ECERAN READY', desc: 'Bisa beli batangan santai, disajikan rapi di bungkusnya.' },
    { id: 'wm-10', name: 'Katak & Snack Potato Ring', category: 'snack', price: 5000, icon: '🍿', tag: 'CRUNCHY', desc: 'Camilan garing gurih teman nonton film atau push rank.' },
    { id: 'wm-11', name: 'Obat Sakit Kepala & Paracetamol', category: 'essential', price: 4500, icon: '💊', tag: 'P3K 24 JAM', desc: 'Pertolongan pertama waktu pusing mikirin tugas/kerjaan.' },
    { id: 'wm-12', name: 'Tolak Angin Cair (1 Sachet)', category: 'essential', price: 4000, icon: '🌿', tag: 'ANTI MASUK ANGIN', desc: 'Penyelamat pas pulang malam keanginan naik motor.' }
  ];

  // State
  let cart = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let promoDiscount = 0;
  let isSoundEnabled = true;
  let conversationHistory = [];

  // =========================================================================
  // 1. Web Audio API Synthesizer
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
  // 2. Real-time Clock
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
  // 3. Catalog Render
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
  // 4. Cart Engine
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
    if (lenisInstance) lenisInstance.stop();
    playSound('click');
  });

  closeCartBtn.addEventListener('click', () => {
    cartDrawerOverlay.classList.add('hidden');
    if (lenisInstance) lenisInstance.start();
    playSound('click');
  });

  cartDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === cartDrawerOverlay) {
      cartDrawerOverlay.classList.add('hidden');
      if (lenisInstance) lenisInstance.start();
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
  // 5. Pertamini & Change Calculator Widgets
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
  // 6. CONNECT TO VERCEL SERVERLESS AI ROUTE (/api/chat) & DIRECT AI FALLBACK
  // =========================================================================
  const chatMessagesContainer = document.getElementById('chat-messages-container');
  const chatInputForm = document.getElementById('chat-input-form');
  const chatUserInput = document.getElementById('chat-user-input');
  const chatTypingIndicator = document.getElementById('chat-typing-indicator');
  const sendMsgBtn = document.getElementById('send-msg-btn');
  const aiStatusIndicator = document.getElementById('ai-status-indicator');

  // Direct AI API Config (Digunakan saat running static tanpa Vercel serverless dev server)
  const CLIENT_AI_CONFIG = {
    baseUrl: 'https://router.juan.web.id/v1',
    apiKey: 'sk-UfiaMawQpRnVjQ6RvTOfOhVQPoYo1aE7ZOGNvC0lJw5aju5u',
    model: 'gemini-3.5-flash-lite'
  };

  const storeKnowledge = `
PENGETAHUAN ETALASE & PRODUK WARUNG MADURA 3000:
1. Makanan & Seduhan:
   - Indomie Goreng Special: Rp 3.500 (bisa minta diracik pedas rawit)
   - Indomie Kuah Ayam Bawang + Telur: Rp 6.500 (favorit begadang subuh)
   - Katak & Potato Ring Snack: Rp 5.000
   - Paket Skena Begadanger 03:00 AM: Rp 19.900 (Indomie Double Telur + Es Capcin + Air + Snack)
2. Minuman & Es:
   - Es Capcin Bubble Extra Ice: Rp 8.000 (Cappuccino cincau blender)
   - Pop Ice Chocolate Top Cincau: Rp 6.000
   - Kopi Kapal Api Seduh Panas: Rp 4.000 (hitam mantap penahan kantuk)
   - Air Mineral Botol: Rp 4.000
3. Sembako & Daily Needs:
   - Beras Premium Madura 5 kg: Rp 68.000 (pulen 100%)
   - Minyak Goreng Sawit 2 Liter: Rp 34.000
   - Rokok Filter Batangan: Rp 2.500 / batang
   - Paracetamol / Obat Sakit Kepala: Rp 4.500
   - Tolak Angin Cair: Rp 4.000
4. Pertamini Eceran:
   - Pertamini Gold (Pertamax Murni 100% no campuran air): Rp 13.500 / liter
   - Pertalite Super: Rp 10.000 / liter
5. Info Layanan Toko:
   - Jam Operasional: Buka 24 JAM NONSTOP 365 HARI (Libur H-1 Kiamat).
   - Kode Promo Voucher: "MADURA247" atau "GENZ" di web keranjang dapet diskon 10%.
   - Fitur Kasir: Uang kembalian pecahan koin kecil kalau kosong biasa diganti permen. Pesanan bisa ditaruh keranjang web lalu checkout via WhatsApp.
`;

  const systemPrompt = `Kamu adalah "Cak Madura AI", seorang penjaga sekaligus kasir Warung Madura 3000 yang ramah, santai, humoris, gaul, dan suka bercanda spontan layaknya manusia asli yang lagi nungguin warung kelontong jam 3 pagi.

IDENTITAS & ATURAN INTERAKSI:
- Panggil pembeli dengan panggilan akrab: "Cak", "sam", "dek", "rek", "bos".
- Gunakan bahasa percakapan santai sehari-hari khas Madura/Jawa-Timuran. DILARANG MENGGUNAKAN TEMPLATE ATAU KALIMAT JAWABAN YANG KAKU/PAULING/BERULANG.
- Namamu adalah Cak Madura. Jika pembeli menanyakan siapa namamu, perkenalkan dirimu secara ramah, humoris, dan hangat.
- Kamu tahu seluruh etalase barang & info toko Warung Madura 3000 dari data pengetahuan etalase berikut:
${storeKnowledge}
- Gunakan pengetahuan etalase di atas untuk menjawab pertanyaan seputar barang, harga, atau stok secara akurat.
- Jika pembeli menanyakan barang yang TIDAK ADA di etalase (seperti charger HP, token listrik, pulsa, casing, dll): Jawab jujur dan santai dengan humor khas warung Madura (boleh nawarin barang ready lain atau ngajak becanda numpang cas di warung).
- Jika pembeli menanyakan hal di luar urusan warung (seperti kodingan python, matematika, fisika, politik, tugas sekolah): Tolak secara humoris khas penjaga warung kelontong (misal malah nawarin ngopi/makan Indomie daripada pusing mikir kodingan/tugas).
- Jawablah secara spontan, alami, dan bervariasi (cukup 1 sampai 3 kalimat).`;

  async function fetchDirectAiResponse(userMessage) {
    const payload = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6),
      { role: 'user', content: userMessage }
    ];

    const response = await fetch(`${CLIENT_AI_CONFIG.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CLIENT_AI_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: CLIENT_AI_CONFIG.model,
        messages: payload,
        temperature: 0.8,
        max_tokens: 400,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Direct AI API HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      throw new Error('Respon AI kosong.');
    }
    return reply;
  }

  async function fetchAiResponse(userMessage) {
    // 1. Coba Serverless API Route terlebih dahulu (/api/chat)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: conversationHistory.slice(-6)
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply && !data.useFallback) {
          aiStatusIndicator.innerHTML = `<i class="fa-solid fa-circle text-green"></i> 🟢 AI Active (${data.model || 'Vercel API'})`;
          conversationHistory.push({ role: 'user', content: userMessage });
          conversationHistory.push({ role: 'assistant', content: data.reply });
          return data.reply;
        }
      }
    } catch (err) {
      console.warn('Serverless route /api/chat tidak dapat dijangkau, menggunakan Direct AI API client...', err);
    }

    // 2. Jika /api/chat tidak aktif / static hosting (e.g. Live Server/Direct Open), panggil Direct AI API Endpoint
    try {
      const reply = await fetchDirectAiResponse(userMessage);
      aiStatusIndicator.innerHTML = `<i class="fa-solid fa-circle text-green"></i> 🟢 AI Active (${CLIENT_AI_CONFIG.model})`;
      conversationHistory.push({ role: 'user', content: userMessage });
      conversationHistory.push({ role: 'assistant', content: reply });
      return reply;
    } catch (directErr) {
      console.error('Direct AI Call Error:', directErr);
      aiStatusIndicator.innerHTML = `<i class="fa-solid fa-circle" style="color:var(--gold-yellow)"></i> 🟡 Network Offline`;
      return "Aduh sam, koneksi internet lagi terputus nih! Coba cek kuotamu dhisik ya, biar Cak Madura bisa jawab lagi!";
    }
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

  async function handleUserMessage(userMsg) {
    addChatMessage('user', userMsg);
    
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
  // 7. Toast Helper
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
