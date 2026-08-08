/**
 * WARUNG MADURA 3000 — VERCEL SERVERLESS AI ROUTE
 * Pure AI Persona & Dynamic Knowledge Engine (Zero Hardcoded Answer Templates)
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Pesan user tidak boleh kosong.' });
  }

  // Reading Environment Variables
  const apiKey = process.env.OPENAI_API_KEY || '';
  const baseUrl = (process.env.OPENAI_BASE_URL || 'https://router.juan.web.id/v1').replace(/\/+$/, '');
  const model = process.env.OPENAI_MODEL || 'gemini-3.5-flash-lite';
  const temperature = parseFloat(process.env.OPENAI_TEMPERATURE || '0.8');
  const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS || '400', 10);

  // Murni Pengetahuan Fakta Toko & Etalase (Knowledge Context)
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

  // System Prompt Murni Identitas & Perilaku (Zero Answer Templates)
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

  const messagesPayload = [
    { role: 'system', content: systemPrompt },
    ...(Array.isArray(history) ? history.slice(-6) : []),
    { role: 'user', content: message }
  ];

  if (!apiKey || apiKey.trim() === '') {
    return res.status(200).json({ 
      useFallback: true,
      reason: 'OPENAI_API_KEY belum diset.' 
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
        max_tokens: maxTokens,
        stream: false
      })
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error('AI API Provider Error:', aiResponse.status, errText);
      return res.status(200).json({ useFallback: true, error: `API HTTP ${aiResponse.status}` });
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
    console.error('Serverless Execution Error:', error);
    return res.status(200).json({ useFallback: true });
  }
}
