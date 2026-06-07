import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function telegramBildir(mesaj) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: mesaj,
      parse_mode: 'HTML',
    }),
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { ad, soyad, eposta, gsm, sehir } = body;

    if (!ad || !soyad || !eposta || !gsm || !sehir) {
      return Response.json({ error: 'Tüm alanları doldurun.' }, { status: 400 });
    }

    const { error: dbError } = await supabase
      .from('basvurular')
      .insert([{ ad, soyad, eposta, gsm, sehir }]);

    if (dbError) throw dbError;

    await telegramBildir(
      `🤝 <b>YENİ EKİP BAŞVURUSU!</b>\n\n` +
      `👤 <b>Ad Soyad:</b> ${ad} ${soyad}\n` +
      `📧 <b>E-posta:</b> ${eposta}\n` +
      `📱 <b>GSM:</b> ${gsm}\n` +
      `📍 <b>Şehir:</b> ${sehir}`
    );

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Bir hata oluştu.' }, { status: 500 });
  }
}