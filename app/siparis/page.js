'use client';
import { useState } from 'react';
import Link from 'next/link';

const G = {
  grad: 'linear-gradient(135deg,#0bbf96,#7c6af5)',
  gradSoft: 'linear-gradient(135deg,rgba(11,191,150,0.12),rgba(124,106,245,0.12))',
  glass: 'rgba(255,255,255,0.75)',
  teal: '#0bbf96',
};

export default function SiparisPage() {
  const [form, setForm] = useState({
    ad: '', soyad: '', eposta: '', gsm: '', adres: '', sehir: '', notlar: ''
  });
  const [durum, setDurum] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    setDurum('');
    try {
      const res = await fetch('/api/siparis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, urun: 'Thermomix TM7' }),
      });
      const data = await res.json();
      if (data.success) {
        setDurum('success');
        setForm({ ad: '', soyad: '', eposta: '', gsm: '', adres: '', sehir: '', notlar: '' });
      } else {
        setDurum('error');
      }
    } catch {
      setDurum('error');
    } finally {
      setYukleniyor(false);
    }
  };

  const inputStyle = (name) => ({
    width: '100%',
    border: `1.5px solid ${focused === name ? '#0bbf96' : 'rgba(11,191,150,0.2)'}`,
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '.95rem',
    color: '#111827',
    background: focused === name ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)',
    outline: 'none',
    transition: 'border-color .2s, background .2s, box-shadow .2s',
    boxShadow: focused === name ? '0 0 0 3px rgba(11,191,150,0.12)' : 'none',
    backdropFilter: 'blur(8px)',
  });

  const labelStyle = {
    display: 'block',
    fontSize: '.8rem',
    fontWeight: 700,
    color: '#374151',
    marginBottom: '.4rem',
    letterSpacing: '.3px',
  };

  const fields = [
    { name: 'ad', label: 'Ad *', type: 'text', half: true },
    { name: 'soyad', label: 'Soyad *', type: 'text', half: true },
    { name: 'eposta', label: 'E-posta *', type: 'email', half: false },
    { name: 'gsm', label: 'GSM *', type: 'tel', half: false },
    { name: 'sehir', label: 'Şehir *', type: 'text', half: false },
  ];

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#c8edd8,#d8d0f8)', fontFamily: "'Segoe UI',sans-serif", padding: '2rem 1rem' }}>

      {/* Nav */}
      <div style={{ maxWidth: '640px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#374151', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600 }}>
          ← Ana Sayfa
        </Link>
        <div style={{ fontSize: '1rem', fontWeight: 800, background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🍃 Akıllı Mutfak
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Başlık kartı */}
        <div style={{ background: G.glass, border: '1.5px solid rgba(11,191,150,0.2)', borderRadius: '24px', padding: '2rem', marginBottom: '1.25rem', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(11,191,150,0.1)', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: G.gradSoft, color: G.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', padding: '5px 16px', borderRadius: '50px', marginBottom: '.75rem' }}>
            SİPARİŞ FORMU
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '.5rem' }}>
            Thermomix <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TM7</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '.85rem', lineHeight: 1.7 }}>
            Formu doldurun, uzman danışmanımız en kısa sürede sizi arasın.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.25rem' }}>
            {[{ e: '🚚', t: 'Ücretsiz Teslimat' }, { e: '🔧', t: 'Kurulum Dahil' }, { e: '📞', t: 'Uzman Destek' }].map((b, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem' }}>{b.e}</div>
                <div style={{ fontSize: '.68rem', color: '#6b7280', marginTop: '2px', fontWeight: 600 }}>{b.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form kartı */}
        <div style={{ background: G.glass, border: '1.5px solid rgba(11,191,150,0.2)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(11,191,150,0.1)' }}>

          {durum === 'success' && (
            <div style={{ background: 'linear-gradient(135deg,rgba(11,191,150,0.15),rgba(124,106,245,0.1))', border: '1.5px solid rgba(11,191,150,0.3)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🎉</div>
              <div style={{ fontWeight: 700, color: '#065f46', marginBottom: '.25rem' }}>Siparişiniz Alındı!</div>
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
            {/* Ad Soyad yan yana */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {fields.filter(f => f.half).map(f => (
                <div key={f.name}>
                  <label style={labelStyle}>{f.label}</label>
                  <input
                    name={f.name} type={f.type} value={form[f.name]}
                    onChange={handleChange} required
                    onFocus={() => setFocused(f.name)}
                    onBlur={() => setFocused('')}
                    style={inputStyle(f.name)}
                  />
                </div>
              ))}
            </div>

            {/* Diğer alanlar */}
            {fields.filter(f => !f.half).map(f => (
              <div key={f.name} style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  name={f.name} type={f.type} value={form[f.name]}
                  onChange={handleChange} required
                  onFocus={() => setFocused(f.name)}
                  onBlur={() => setFocused('')}
                  style={inputStyle(f.name)}
                />
              </div>
            ))}

            {/* Adres */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Adres *</label>
              <textarea
                name="adres" value={form.adres} onChange={handleChange} required rows={3}
                onFocus={() => setFocused('adres')} onBlur={() => setFocused('')}
                style={{ ...inputStyle('adres'), resize: 'none' }}
              />
            </div>

            {/* Notlar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Notlar <span style={{ color: '#9ca3af', fontWeight: 400 }}>(isteğe bağlı)</span></label>
              <textarea
                name="notlar" value={form.notlar} onChange={handleChange} rows={2}
                onFocus={() => setFocused('notlar')} onBlur={() => setFocused('')}
                style={{ ...inputStyle('notlar'), resize: 'none' }}
                placeholder="Eklemek istediğiniz bir şey varsa yazın..."
              />
            </div>

            {/* Gönder butonu */}
            <button type="submit" disabled={yukleniyor}
              style={{
                width: '100%', background: yukleniyor ? '#9ca3af' : G.grad,
                color: '#fff', padding: '14px', borderRadius: '14px',
                fontWeight: 700, fontSize: '1rem', border: 'none', cursor: yukleniyor ? 'not-allowed' : 'pointer',
                transition: 'opacity .2s, transform .15s', boxShadow: '0 4px 20px rgba(11,191,150,0.25)',
              }}
              onMouseEnter={e => { if (!yukleniyor) { e.currentTarget.style.opacity = '.9'; e.currentTarget.style.transform = 'scale(1.02)'; } }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}>
              {yukleniyor ? '⏳ Gönderiliyor...' : '🛒 Sipariş Ver'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '.75rem', color: '#9ca3af', marginTop: '1rem' }}>
              Bilgileriniz güvenle saklanır ve yalnızca sipariş için kullanılır.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}