'use client';
import { useState } from 'react';
import Link from 'next/link';

const G = {
  grad: 'linear-gradient(135deg,#1e7b6e,#22c55e)',
  gradSoft: 'linear-gradient(135deg,rgba(30,123,110,0.1),rgba(34,197,94,0.1))',
  teal: '#1e7b6e',
};

export default function EkibimizPage() {
  const [form, setForm] = useState({ ad: '', soyad: '', eposta: '', gsm: '', sehir: '' });
  const [durum, setDurum] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    setDurum('');
    try {
      const res = await fetch('/api/basvuru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, urun: 'Ekibimize Katılım Başvurusu', adres: '-', notlar: '' }),
      });
      const data = await res.json();
      if (data.success) {
        setDurum('success');
        setForm({ ad: '', soyad: '', eposta: '', gsm: '', sehir: '' });
      } else { setDurum('error'); }
    } catch { setDurum('error'); }
    finally { setYukleniyor(false); }
  };

  const inputStyle = (name) => ({
    width: '100%', border: `1.5px solid ${focused === name ? '#1e7b6e' : 'rgba(30,123,110,0.2)'}`,
    borderRadius: '12px', padding: '12px 16px', fontSize: '.95rem', color: '#111827',
    background: focused === name ? '#fff' : 'rgba(255,255,255,0.8)', outline: 'none',
    transition: 'border-color .2s, background .2s, box-shadow .2s',
    boxShadow: focused === name ? '0 0 0 3px rgba(30,123,110,0.1)' : 'none',
  });

  const labelStyle = { display: 'block', fontSize: '.8rem', fontWeight: 700, color: '#374151', marginBottom: '.4rem', letterSpacing: '.3px' };

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#e8fdf5,#f0fdf4)', fontFamily: "'Segoe UI',sans-serif", padding: '2rem 1rem' }}>

      {/* Nav */}
      <div style={{ maxWidth: '640px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#374151', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600 }}>← Ana Sayfa</Link>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <img src="/logs_new.png" alt="thermosiparis.com" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
        </Link>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Başlık kartı */}
        <div style={{ background: '#fff', border: '1.5px solid rgba(30,123,110,0.2)', borderRadius: '24px', padding: '2rem', marginBottom: '1.25rem', boxShadow: '0 8px 32px rgba(30,123,110,0.08)', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: G.gradSoft, color: G.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', padding: '5px 16px', borderRadius: '50px', marginBottom: '.75rem' }}>KARİYER</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '.5rem' }}>
            Ekibimize <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Katılın</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '.85rem', lineHeight: 1.7 }}>Thermomix danışmanı olarak çalışmak ister misiniz? Bilgilerinizi bırakın, sizi arayalım.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            
          </div>
        </div>

        {/* Form kartı */}
        <div style={{ background: '#fff', border: '1.5px solid rgba(30,123,110,0.2)', borderRadius: '24px', padding: '2rem', boxShadow: '0 8px 32px rgba(30,123,110,0.08)' }}>

          {durum === 'success' && (
            <div style={{ background: 'rgba(30,123,110,0.08)', border: '1.5px solid rgba(30,123,110,0.3)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🎉</div>
              <div style={{ fontWeight: 700, color: '#065f46', marginBottom: '.25rem' }}>Başvurunuz Alındı!</div>
              <div style={{ fontSize: '.85rem', color: '#374151' }}>En kısa sürede uzmanımız sizi arayacak.</div>
            </div>
          )}
          {durum === 'error' && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.2)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: '#991b1b' }}>Bir hata oluştu.</div>
              <div style={{ fontSize: '.85rem', color: '#374151' }}>Lütfen tekrar deneyin.</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[{ name: 'ad', label: 'Ad *' }, { name: 'soyad', label: 'Soyad *' }].map(f => (
                <div key={f.name}>
                  <label style={labelStyle}>{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handleChange} required onFocus={() => setFocused(f.name)} onBlur={() => setFocused('')} style={inputStyle(f.name)} />
                </div>
              ))}
            </div>
            {[
              { name: 'eposta', label: 'E-posta *', type: 'email' },
              { name: 'gsm', label: 'GSM *', type: 'tel' },
              { name: 'sehir', label: 'Şehir *', type: 'text' },
            ].map(f => (
              <div key={f.name} style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{f.label}</label>
                <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} required onFocus={() => setFocused(f.name)} onBlur={() => setFocused('')} style={inputStyle(f.name)} />
              </div>
            ))}

            <button type="submit" disabled={yukleniyor}
              style={{ width: '100%', background: yukleniyor ? '#9ca3af' : G.grad, color: '#fff', padding: '14px', borderRadius: '14px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: yukleniyor ? 'not-allowed' : 'pointer', transition: 'opacity .2s, transform .15s', boxShadow: '0 4px 20px rgba(30,123,110,0.25)', marginTop: '.5rem' }}
              onMouseEnter={e => { if (!yukleniyor) { e.currentTarget.style.opacity = '.9'; e.currentTarget.style.transform = 'scale(1.02)'; } }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}>
              {yukleniyor ? '⏳ Gönderiliyor...' : '🤝 Başvur'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '.75rem', color: '#9ca3af', marginTop: '1rem' }}>Bilgileriniz güvenle saklanır ve yalnızca işe alım için kullanılır.</p>
          </form>
        </div>
      </div>
    </main>
  );
}