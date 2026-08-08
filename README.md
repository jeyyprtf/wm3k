# 🏪 WARUNG MADURA 3000 — Gen Z Ultra Convenience Store

[![Build Status](https://img.shields.io/badge/Status-Production%20Ready-00ff88?style=for-the-badge)](https://github.com)
[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel%20Serverless-00f0ff?style=for-the-badge)](https://vercel.com)
[![AI Integration](https://img.shields.io/badge/AI-OpenAI%20Compatible-ff2a4b?style=for-the-badge)](https://openai.com)
[![License](https://img.shields.io/badge/License-MIT-ffe600?style=for-the-badge)](LICENSE)

**Warung Madura 3000** adalah landing page kelontong modern berbasis *Cyber-Brutalist & Neo-Retro UI/UX* yang terintegrasi dengan **Vercel Serverless AI API (`/api/chat`)**.

---

## ⚡ Panduan Deploy ke Vercel

### Langkah 1: Push ke GitHub Repository
1. Clone atau siapkan repositori di komputer kamu.
2. Push seluruh file ke GitHub kamu:
   ```bash
   git add .
   git commit -m "feat: setup vercel serverless ai route"
   git push origin main
Langkah 2: Deploy di Vercel Dashboard
Buka Vercel Dashboard dan klik Add New > Project.
Import repository GitHub kamu (warung-madura-3000).
Pada bagian Environment Variables, tambahkan variabel berikut:
KeyValue ContohOPENAI_API_KEYsk-proj-xxxx... (Wajib)OPENAI_BASE_URLhttps://api.openai.com/v1 (Opsional)OPENAI_MODELgpt-4o-mini (Opsional)OPENAI_TEMPERATURE0.7 (Opsional)Contoh Provider Lain (Groq / DeepSeek):
Groq Cloud (Gratis & Cepat):

OPENAI_BASE_URL: https://api.groq.com/openai/v1
OPENAI_MODEL: llama-3.3-70b-versatile


OpenRouter / DeepSeek:

OPENAI_BASE_URL: https://openrouter.ai/api/v1
OPENAI_MODEL: deepseek/deepseek-chat



Klik Deploy! Vercel akan otomatis mengenali file api/chat.js sebagai backend Serverless Function.
📁 Struktur File Projects Vercelwarung-madura-3000/
├── api/
│   └── chat.js         # Vercel Serverless Function (Aman membaca process.env)
├── index.html          # Clean Customer Landing Page
├── styles.css          # Cyber-Brutalist UI Styling
├── script.js            # Frontend Client Engine (Memanggil /api/chat)
├── .env.example        # Template Variabel Lingkungan
├── .gitignore          # Proteksi Git Push
└── README.md           # Dokumentasi Vercel
📄 LisensiProyek ini dirilis di bawah lisensi MIT License.