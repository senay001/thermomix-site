export const runtime = 'edge';

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

    if (!ad || !soyad || !eposta || !gsm || !urun) {
      return Response.json({ error: 'Tüm zorunlu alanları doldurun.' }, { status: 400 });
    }

    const { error: dbError } = await supabase
      .from('siparisler')
      .insert([{ ad, soyad, eposta, gsm, adres: adres || '-', sehir: sehir || '-', notlar, urun }]);

    if (dbError) throw dbError;

    try {
      await telegramBildir(
        `🛒 <b>YENİ SİPARİŞ!</b>\n\n` +
        `📦 <b>Ürün:</b> ${urun}\n` +
        `👤 <b>Ad Soyad:</b> ${ad} ${soyad}\n` +
        `📧 <b>E-posta:</b> ${eposta}\n` +
        `📱 <b>GSM:</b> ${gsm}\n` +
        `📍 <b>Şehir:</b> ${sehir || '-'}\n` +
        `📝 <b>Not:</b> ${notlar || '-'}`
      );
    } catch (tgError) {
      console.error('Telegram hatası:', tgError);
    }

    try {
      const mailResult = await resend.emails.send({
        from: 'siparis@thermomutfaksefi.com',
        to: 'senaygokalpaltun@gmail.com',
        subject: `Yeni Sipariş: ${urun}`,
        html: `<h2>Test</h2>`,
      });
      console.log('Mail sonucu:', JSON.stringify(mailResult));
    } catch (mailError) {
      console.error('Mail hatası:', mailError.message);
    }

    try {
      await resend.emails.send({
        from: 'siparis@thermomutfaksefi.com',
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
    } catch (mailError) {
      console.error('Müşteri mail hatası:', mailError);
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Bir hata oluştu.' }, { status: 500 });
  }
}