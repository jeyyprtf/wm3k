/**
 * WARUNG MADURA 3000 — VERCEL SERVERLESS AI ROUTE
 * Endpoints: /api/chat
 * Reads Environment Variables securely on Vercel Backend
 */

export default async function handler(req, res) {
  // Hanya menerima HTTP POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Pesan user tidak boleh kosong.' });
  }

  // Membaca Environment Variables dari Vercel Dashboard Table
  const apiKey = process.env.OPENAI_API_KEY || '';
  const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const temperature = parseFloat(process.env.OPENAI_TEMPERATURE || '0.7');

  // Grounded RAG Knowledge Base Catalog
  const products = [
    { name: 'Indomie Goreng Special', category: 'makanan', price: 3500, tag: 'BEST SELLER', desc: 'Racikan legend jam 3 pagi. Tekstur kenyal, bumbu pas.' },
    { name: 'Indomie Kuah Ayam Bawang + Telur', category: 'makanan', price: 6500, tag: 'FAVORIT BEGADANG', desc: 'Kuah hangat gurih lengkap dengan telur racik Cak Madura.' },
    { name: 'Es Capcin Bubble Extra Ice', category: 'minuman', price: 8000, tag: 'SUPER SEGAR', desc: 'Cappuccino cincau blender manis pas, es melimpah.' },
    { name: 'Pop Ice Chocolate Top Cincau', category: 'minuman', price: 6000, tag: 'GEN Z MUST', desc: 'Pop ice rasa cokelat premium dengan topping cincau kenyal.' },
    { name: 'Beras Premium Madura (5 kg)', category: 'sembako', price: 68000, tag: 'PULEN 100%', desc: 'Beras putih bersih, tanpa pemutih buatan, nasi jadi pulen.' },
    { name: 'Minyak Goreng Sawit (2 Liter)', category: 'sembako', price: 34000, tag: 'STOK LENGKAP', desc: 'Bening jernih, buat goreng kerupuk atau gorengan makin garing.' },
    { name: 'Pertamini Gold (1 Liter)', category: 'pertamini', price: 13500, tag: 'PURE 100%', desc: 'Bensin eceran murni dari tangki khusus. Tanpa campuran air.' },
    { name: 'Kopi Kapal Api Seduh Panas', category: 'minuman', price: 4000, tag: 'AMUNISI REVISI', desc: 'Kopi hitam pahit manis mantap, penahan kantuk deadline.' },
    { name: 'Rokok Filter Batangan (Per Btg)', category: 'snack', price: 2500, tag: 'ECERAN READY', desc: 'Bisa beli batangan santai, disajikan rapi di bungkusnya.' },
    { name: 'Katak & Snack Potato Ring', category: 'snack', price: 5000, tag: 'CRUNCHY', desc: 'Camilan garing gurih teman nonton film atau push rank.' },
    { name: 'Obat Sakit Kepala & Paracetamol', category: 'essential', price: 4500, tag: 'P3K 24 JAM', desc: 'Pertolongan pertama waktu pusing mikirin tugas/kerjaan.' },
    { name: 'Tolak Angin Cair (1 Sachet)', category: 'essential', price: 4000, tag: 'ANTI MASUK ANGIN', desc: 'Penyelamat pas pulang malam keanginan naik motor.' }
  ];

  const productCatalogText = products.map(p => 
    `- ${p.name} (${p.category}): Rp ${p.price.toLocaleString('id-ID')} | Tag: ${p.tag} | Info: ${p.desc}`
  ).join('\n');

  // System Prompt & Guardrails Scope Enforcement
  const systemPrompt = `Kamu adalah "Cak Madura AI", pemilik dan kasir Warung Madura 3000 (Gen Z Ultra Convenience Store) yang ramah, kocak, gaul ala Gen Z tapi tetap santun dengan dialek khas Madura ("dek", "cak", "sam", "tanean lanjang").
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

  // Format payload for OpenAI-Compatible endpoint
  const messagesPayload = [
    { role: 'system', content: systemPrompt },
    ...(Array.isArray(history) ? history.slice(-6) : []),
    { role: 'user', content: message }
  ];

  // If OPENAI_API_KEY is not configured in Vercel Env, send clear signal for fallback
  if (!apiKey || apiKey.trim() === '') {
    return res.status(200).json({ 
      useFallback: true,
      message: 'API Key belum diset di Vercel Environment Variables Table.' 
    });
  }

  try {
    const aiResponse = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: messagesPayload,
        temperature: temperature,
        max_tokens: 400
      })
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error('AI API Provider Error:', aiResponse.status, errText);
      return res.status(200).json({ useFallback: true, error: `API status ${aiResponse.status}` });
    }

    const data = await aiResponse.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(200).json({ useFallback: true });
    }

    return res.status(200).json({
      reply: reply,
      model: model,
      useFallback: false
    });

  } catch (error) {
    console.error('Serverless Error:', error);
    return res.status(200).json({ useFallback: true });
  }
}
