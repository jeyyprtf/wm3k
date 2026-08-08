# 🏪 WARUNG MADURA 3000 — Gen Z Ultra Convenience Store

[![Build Status](https://img.shields.io/badge/Status-Production%20Ready-00ff88?style=for-the-badge)](https://github.com)
[![AI Integration](https://img.shields.io/badge/AI-OpenAI%20Compatible-ff2a4b?style=for-the-badge)](https://openai.com)
[![License](https://img.shields.io/badge/License-MIT-ffe600?style=for-the-badge)](LICENSE)

**Warung Madura 3000** adalah landing page kelontong modern berbasis *Cyber-Brutalist & Neo-Retro UI/UX* yang terintegrasi langsung dengan **AI Model (OpenAI-Compatible API)** secara realtime. Dirancang khusus untuk kaum Gen Z & millennial yang membutuhkan sembako, bensin eceran murni, hingga Indomie kuah kornet jam 3 pagi.

---

## ✨ Fitur Unggulan

### 1. 🤖 AI Chatbot Realtime ("Cak Madura AI")
- **OpenAI-Compatible API**: Terhubung langsung ke provider LLM seperti OpenAI (`gpt-4o-mini`), Groq (`llama-3.3-70b`), OpenRouter (`deepseek-chat`), maupun Ollama Local.
- **RAG System Prompt Ketat**: Membawa *knowledge base* lengkap tentang etalase toko, harga produk, paket combo begadang, hingga simulasi kembalian permen.
- **Prinsip Refusal (Out-of-Scope Guardrails)**: Jika pengguna menanyakan hal di luar toko (coding, matematika, politik, esai sekolah), AI akan menolak dengan sopan & humoris dalam persona khas Cak Madura.
- **Hybrid Local Fallback Engine**: Jika API Key belum diisi atau koneksi API bermasalah, AI otomatis menggunakan *local fallback engine* sehingga UI/UX tetap berjalan smooth tanpa error.

### 2. 🎨 Aesthetics & Micro-UI/UX (Anti AI Slop & SaaS Generic)
- **Visual Direction**: Kombinasi warna *Madura Neon Red*, *Pertamini Gold*, dan *Cyber Cyan* berbalut *glassmorphism* rak display kaca.
- **Web Audio API Synthesizer**: Efek suara tactile (klik, tambah keranjang, suara kasir, bel chat) dihasilkan secara sintetis via browser tanpa file MP3 eksternal.
- **Top Ticker Marquee**: Ticker animasi realtime menginformasikan status operasional warung 24 jam nonstop.

### 3. ⛽ Interactive Store Widgets
- **Pertamini Liquid Gold Simulator**: Calculator bensin eceran interaktif dengan pengatur volume slider presisi (hitung liter & rupiah otomatis).
- **Kalkulator Kembalian Permen**: Simulasi pecahan uang pembayaran & fitur konversi otomatis kembalian koin ke butir permen khas warung.
- **Paket Skena Begadanger 03:00 AM**: Paket bundel hemat Indomie + Es Capcin + Air 1.5L + Snack.

### 4. 🛒 Dynamic Shopping Cart & WhatsApp Checkout
- Etalase produk dengan filter chip interaktif (Sembako, Indomie, Capcin, Pertamini, Essential).
- Slide-over drawer keranjang belanja lengkap dengan fitur klaim promo (`MADURA247`).
- Checkout otomatis terformat ke pesan WhatsApp siap kirim ke kurir warung.

---

## 📁 Struktur File Projects

```text
warung-madura-3000/
├── index.html          # File HTML semantic utama & modal konfigurasi AI
├── styles.css          # Design system, CSS variables, & responsive brutalist UI
├── script.js            # Engine Keranjang, Pertamini, Audio FX, & OpenAI API Chatbot
├── .env.example        # Template variabel lingkungan untuk OpenAI / Groq API
├── .gitignore          # Konfigurasi proteksi file rahasia & build log
└── README.md           # Dokumentasi proyek lengkap
🚀 Cara Menjalankan ProjectProject ini dibuat menggunakan Native HTML5, CSS3, dan Vanilla ES6 JavaScript, sehingga sangat ringan dan dapat dijalankan langsung tanpa bundler kompleks.Method 1: Live Server (Rekomendasi)
Clone repositori ini:
git clone https://github.com/username/warung-madura-3000.git
cd warung-madura-3000


Buka folder proyek di Visual Studio Code.
Klik kanan pada index.html dan pilih "Open with Live Server".
Method 2: Langsung Buka di BrowserCukup klik ganda file index.html di file manager komputer kamu.⚙️ Konfigurasi AI Chatbot (OpenAI / Groq / OpenRouter / Ollama)Kamu bisa mengonfigurasi AI Chatbot langsung lewat dua cara:Cara 1: Menggunakan Config Modal di Web (UI)
Klik tombol ikon 🤖 Config API pada bagian header atau header chatbot.
Masukkan Base URL, API Key, dan Model Name.
Klik Simpan Konfigurasi AI. Konfigurasi tersimpan secara aman di localStorage browser milikmu.
Cara 2: Environment Variables (.env)Salin .env.example menjadi .env:cp .env.example .env
Isi variabel .env sesuai provider pilihan:OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_API_KEY=sk-proj-your-api-key-here
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.7
Contoh Konfigurasi Provider Lain:
Groq Cloud (Gratis & Cepat):

Base URL: https://api.groq.com/openai/v1
Model: llama-3.3-70b-versatile


OpenRouter:

Base URL: https://openrouter.ai/api/v1
Model: deepseek/deepseek-chat


Ollama (Lokal):

Base URL: http://localhost:11434/v1
Model: llama3.2


🛡️ Guardrails & Refusal Test ExamplesInput Pertanyaan PenggunaRespons Cak Madura AI"Cak, ada Indomie kuah kornet?""Indomie Kuah + Telur ready 6.500 dek! Kuah nyemek pedes gurih racikan Cak Madura siap seduh jam segini.""Bensin eceran murni gak?""100% murni Pertamax Gold tanpa campuran air dek! Siap diisi ke motor jam 3 pagi.""Tuliskan kode Python untuk sorting array" (Out of Scope)"Waduh dek! Cak Madura ini jagonya racik Indomie kuah kornet sama nakar Pertamini jam 3 pagi, bukan guru les coding! Mending sam seduh Kopi Kapal Api atau Es Capcin dulu biar adem!"🛠️ Teknologi yang Digunakan
HTML5 & CSS3: Flexbox, CSS Grid, Custom Design Tokens, CSS Keyframes.
Vanilla JavaScript (ES6+): Fetch API, Web Audio API, LocalStorage Manager.
FontAwesome 6.4.0: Font icon tipografi.
Google Fonts: Syne, Plus Jakarta Sans, & JetBrains Mono.
📄 LisensiProyek ini dirilis di bawah lisensi MIT License. Bebas digunakan, dimodifikasi, dan dikembangkan untuk keperluan portofolio maupun komersial.&copy; 2025 Warung Madura 3000 — Gen Z Edition. Buka 24 Jam Nonstop!
