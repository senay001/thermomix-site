import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { ad, soyad, eposta, gsm, adres, sehir, notlar, urun } = body;

    if (!ad || !soyad || !eposta || !gsm || !adres || !sehir || !urun) {
      return Response.json({ error: 'Tüm zorunlu alanları doldurun.' }, { status: 400 });
    }

    // Supabase'e kaydet
    const { error: dbError } = await supabase
      .from('siparisler')
      .insert([{ ad, soyad, eposta, gsm, adres, sehir, notlar, urun }]);

    if (dbError) throw dbError;

    // Telegram bildirimi
    await telegramBildir(
      `🛒 <b>YENİ SİPARİŞ!</b>\n\n` +
      `📦 <b>Ürün:</b> ${urun}\n` +
      `👤 <b>Ad Soyad:</b> ${ad} ${soyad}\n` +
      `📧 <b>E-posta:</b> ${eposta}\n` +
      `📱 <b>GSM:</b> ${gsm}\n` +
      `📍 <b>Adres:</b> ${adres}, ${sehir}\n` +
      `📝 <b>Not:</b> ${notlar || '-'}`
    );

    // Sana bildirim maili
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'safaksekin0@gmail.com',
      subject: `Yeni Sipariş: ${urun}`,
      html: `
        <h2>Yeni sipariş geldi!</h2>
        <p><b>Ürün:</b> ${urun}</p>
        <p><b>Ad Soyad:</b> ${ad} ${soyad}</p>
        <p><b>E-posta:</b> ${eposta}</p>
        <p><b>GSM:</b> ${gsm}</p>
        <p><b>Adres:</b> ${adres}, ${sehir}</p>
        <p><b>Not:</b> ${notlar || '-'}</p>
      `,
    });

    // Müşteriye onay maili
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: eposta,
      subject: 'Siparişiniz Alındı',
      html: `
        <h2>Merhaba ${ad},</h2>
        <p>Siparişiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>
        <p><b>Sipariş:</b> ${urun}</p>
        <br/>
        <p>Teşekkürler 🍃</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Bir hata oluştu.' }, { status: 500 });
  }
}