'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity .55s ease ${delay}s, transform .55s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const G = {
  teal: '#0bbf96', purple: '#7c6af5',
  grad: 'linear-gradient(135deg,#0bbf96,#7c6af5)',
  gradSoft: 'linear-gradient(135deg,rgba(11,191,150,0.12),rgba(124,106,245,0.12))',
  glass: 'rgba(255,255,255,0.75)',
  shadow: '0 8px 32px rgba(11,191,150,0.1)',
};

export default function Home() {
  const [popup, setPopup] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const chip = (label) => (
    <div style={{ display: 'inline-block', background: G.gradSoft, color: G.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', padding: '5px 16px', borderRadius: '50px', marginBottom: '.75rem' }}>
      {label}
    </div>
  );

  const features = [
    { e: '🌡️', t: 'Hassas Pişirme', d: '37°C–130°C arası derece derece sıcaklık kontrolü.' },
    { e: '💨', t: 'Buharda Pişirme', d: 'Vitaminleri koruyarak sağlıklı yemekler pişirin.' },
    { e: '🔄', t: 'Otomatik Karıştırma', d: '10 farklı hız kademesi ile doğru karışım.' },
    { e: '📱', t: 'Cookidoo® Tarifleri', d: '80.000+ adım adım tarif cihazınıza gelir.' },
    { e: '⚖️', t: 'Entegre Terazi', d: 'Gram hassasiyetiyle tartın.' },
    { e: '⏱️', t: 'Zaman Tasarrufu', d: 'Saatleri dakikalara indirin.' },
  ];

  const accessories = [
    { e: '🥣', t: 'Varoma® Buharlık', d: 'Büyük kapasiteli buharda pişirme kabı.', bg: 'linear-gradient(135deg,#d4f0e8,#e0e8ff)' },
    { e: '🧀', t: 'Kelebek Aksesuarı', d: 'Krema çırpma ve hassas karıştırma için.', bg: 'linear-gradient(135deg,#e0d8ff,#d4f0e8)' },
    { e: '🍱', t: 'ThermoServer', d: 'Yemeklerinizi saatlerce sıcak tutan kap.', bg: 'linear-gradient(135deg,#d4f0e8,#e0d8ff)' },
    { e: '📱', t: 'Cookidoo® Aboneliği', d: 'Aylık güncellenen tarifler ve rehberlik.', bg: 'linear-gradient(135deg,#e0d8ff,#d4f0e8)' },
  ];

  const btnHover = (e) => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.opacity = '.9'; };
  const btnLeave = (e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; };
  const cardHover = (e) => { e.currentTarget.style.transform = 'translateY(-7px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(11,191,150,0.15)'; e.currentTarget.style.borderColor = 'rgba(11,191,150,0.4)'; };
  const cardLeave = (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = G.shadow; e.currentTarget.style.borderColor = 'rgba(11,191,150,0.15)'; };
  const accHover = (e) => { e.currentTarget.style.transform = 'translateY(-7px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(124,106,245,0.13)'; e.currentTarget.style.borderColor = 'rgba(124,106,245,0.4)'; };
  const accLeave = (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,106,245,0.07)'; e.currentTarget.style.borderColor = 'rgba(124,106,245,0.15)'; };

  const sectionBg = 'linear-gradient(160deg,#c8edd8,#d8d0f8)';

  return (
    <main style={{ fontFamily: "'Segoe UI',sans-serif", background: '#e8f4ee', color: '#1a1f2e', overflowX: 'hidden', paddingTop: '60px' }}>

      {/* POPUP */}
      {popup && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setPopup(false); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(20,30,20,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: 'rgba(255,255,255,0.97)', border: '1.5px solid rgba(11,191,150,0.2)', borderRadius: '28px', padding: '2.5rem', maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative', boxShadow: '0 32px 80px rgba(11,191,150,0.15)' }}>
            <button onClick={() => setPopup(false)} style={{ position: 'absolute', top: '1rem', right: '1.25rem', background: 'none', border: 'none', color: '#aaa', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
            <div style={{ display: 'inline-block', background: G.grad, color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', padding: '5px 16px', borderRadius: '50px', marginBottom: '1rem' }}>🎉 ÖZEL KAMPANYA</div>
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.25rem', border: '2px solid rgba(11,191,150,0.2)' }}>
              <img src="/img1.png" alt="Thermomix TM7" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1f2e', marginBottom: '.6rem' }}>Thermomix TM7<br />Türkiye&apos;de!</h2>
            <p style={{ color: '#6b7280', lineHeight: 1.7, fontSize: '.9rem', marginBottom: '1.5rem' }}>Sınırlı stok, özel fiyat. Hemen sipariş verin, uzman ekibimiz sizi arasın.</p>
            <Link href="/siparis" onClick={() => setPopup(false)}
              style={{ display: 'inline-block', background: G.grad, color: '#fff', padding: '12px 32px', borderRadius: '50px', fontWeight: 700, fontSize: '.9rem', textDecoration: 'none', transition: 'transform .2s,opacity .2s' }}
              onMouseEnter={btnHover} onMouseLeave={btnLeave}>
              Sipariş Ver →
            </Link>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(232,244,238,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(11,191,150,0.15)', padding: '.9rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.05rem', fontWeight: 800, background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🍃 Akıllı Mutfak</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {['Özellikler', 'Aksesuarlar', 'Hakkında'].map((item, i) => (
            <a key={i} href={`#${['ozellikler', 'aksesuarlar', 'hakkinda'][i]}`}
              style={{ color: '#374151', textDecoration: 'none', fontSize: '.85rem', fontWeight: 500, marginLeft: '1.5rem' }}>
              {item}
            </a>
          ))}
          <Link href="/siparis"
            style={{ background: G.grad, color: '#fff', padding: '8px 22px', borderRadius: '50px', fontSize: '.85rem', fontWeight: 700, textDecoration: 'none', marginLeft: '1.5rem', transition: 'transform .2s,opacity .2s' }}
            onMouseEnter={btnHover} onMouseLeave={btnLeave}>
            Sipariş Ver
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '6rem 2rem 4rem', position: 'relative', overflow: 'hidden',
        backgroundImage: 'url(/img2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        {/* overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,30,20,0.52)', backdropFilter: 'blur(2px)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(11,191,150,0.4)', borderRadius: '50px', padding: '6px 18px', fontSize: '12px', color: 'rgba(255,255,255,0.9)', marginBottom: '1.75rem', backdropFilter: 'blur(8px)' }}>
            <span style={{ width: '7px', height: '7px', background: G.teal, borderRadius: '50%', display: 'inline-block' }} />
            Türkiye&apos;nin En Akıllı Mutfak Robotu
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', color: '#fff' }}>
            Mutfağınızı<br />
            <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dönüştürün</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.82)', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Pişirme, karıştırma, buharda pişirme ve daha fazlası — tek bir akıllı cihazla tüm yemeklerinizi hazırlayın.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Link href="/siparis"
              style={{ background: G.grad, color: '#fff', padding: '13px 36px', borderRadius: '50px', fontWeight: 700, fontSize: '.95rem', textDecoration: 'none', transition: 'transform .2s,opacity .2s' }}
              onMouseEnter={btnHover} onMouseLeave={btnLeave}>
              Hemen Sipariş Ver
            </Link>
            <a href="#ozellikler"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '13px 32px', borderRadius: '50px', fontWeight: 700, fontSize: '.9rem', border: '1.5px solid rgba(255,255,255,0.35)', textDecoration: 'none', backdropFilter: 'blur(8px)', transition: 'transform .2s,opacity .2s' }}
              onMouseEnter={btnHover} onMouseLeave={btnLeave}>
              Keşfet ↓
            </a>
          </div>
          {/* Ürün görseli */}
          <div style={{ width: '300px', maxWidth: '85vw', margin: '0 auto', transition: 'transform .6s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} >
            <img src="/img1.png" alt="Thermomix TM7"
              style={{ width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(11,191,150,0.3))', transition: 'transform .4s ease' }} />
          </div>
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section id="ozellikler" style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center' }}>{chip('ÖZELLİKLER')}</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.1rem)', fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: '.4rem' }}>
            Neden <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Thermomix TM7?</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '.9rem', marginBottom: '3rem' }}>22&apos;den fazla farklı işlevi tek bir cihazda birleştiriyor</p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(185px,1fr))', gap: '1.25rem' }}>
          {features.map((f, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div onMouseEnter={cardHover} onMouseLeave={cardLeave}
                style={{ background: G.glass, border: '1.5px solid rgba(11,191,150,0.15)', borderRadius: '20px', padding: '1.5rem', textAlign: 'center', backdropFilter: 'blur(12px)', boxShadow: G.shadow, transition: 'transform .25s,border-color .25s,box-shadow .25s', height: '100%' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: G.gradSoft, border: '1.5px solid rgba(11,191,150,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', margin: '0 auto 1rem' }}>{f.e}</div>
                <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: '#111827', marginBottom: '.35rem' }}>{f.t}</h3>
                <p style={{ fontSize: '.78rem', color: '#5a6270', lineHeight: 1.6 }}>{f.d}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* HAKKINDA */}
      <section id="hakkinda" style={{ background: sectionBg, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <FadeUp>
            <div onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              style={{ width: '100%', aspectRatio: '1', borderRadius: '28px', overflow: 'hidden', border: '1.5px solid rgba(11,191,150,0.2)', boxShadow: '0 20px 60px rgba(124,106,245,0.12)', transition: 'transform .4s' }}>
              <img src="/img1.png" alt="Thermomix TM7" style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#111' }} />
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            {chip('HAKKINDA')}
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', lineHeight: 1.3 }}>
              Mutfağınızın <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Akıllı Yardımcısı</span>
            </h2>
            <p style={{ color: '#374151', lineHeight: 1.9, marginBottom: '1rem', fontSize: '.9rem' }}>Thermomix, 50 yılı aşkın Alman mühendislik birikimiyle tasarlanmış dünyanın en gelişmiş mutfak robotu.</p>
            <p style={{ color: '#374151', lineHeight: 1.9, fontSize: '.9rem' }}>Çorbadan tatlıya, ekmekten makarnaya — her gün yeni tarifler keşfedin.</p>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.75rem' }}>
              {[{ n: '22+', l: 'İşlev' }, { n: '80K', l: 'Tarif' }, { n: '50+', l: 'Yıl Deneyim' }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.n}</div>
                  <div style={{ fontSize: '.72rem', color: '#6b7280', marginTop: '2px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* AKSESUARLAR */}
      <section id="aksesuarlar" style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center' }}>{chip('AKSESUARLAR')}</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.1rem)', fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: '.4rem' }}>
            Deneyiminizi <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tamamlayın</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '.9rem', marginBottom: '3rem' }}>Thermomix için tasarlanmış özel aksesuarlar</p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.25rem' }}>
          {accessories.map((a, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div onMouseEnter={accHover} onMouseLeave={accLeave}
                style={{ background: G.glass, border: '1.5px solid rgba(124,106,245,0.15)', borderRadius: '20px', overflow: 'hidden', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(124,106,245,0.07)', transition: 'transform .25s,border-color .25s,box-shadow .25s', height: '100%' }}>
                <div style={{ height: '130px', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>{a.e}</div>
                <div style={{ padding: '.9rem 1.1rem' }}>
                  <h3 style={{ fontSize: '.88rem', fontWeight: 700, color: '#111827', marginBottom: '.2rem' }}>{a.t}</h3>
                  <p style={{ fontSize: '.76rem', color: '#5a6270', lineHeight: 1.6 }}>{a.d}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* SOSYAL MEDYA */}
      <section style={{ background: G.grad, padding: '4rem 2rem', textAlign: 'center' }}>
        <FadeUp>
          <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800, marginBottom: '.5rem' }}>Bizi Takip Edin</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', fontSize: '.9rem' }}>Tarifler, ipuçları ve kampanyalar için bize katılın</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[{ label: 'YouTube', href: 'https://youtube.com', e: '▶️' }, { label: 'Instagram', href: 'https://instagram.com', e: '📸' }, { label: 'WhatsApp', href: 'https://whatsapp.com', e: '💬' }].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: '18px', padding: '1.25rem 1.75rem', color: '#fff', textDecoration: 'none', minWidth: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.6rem', backdropFilter: 'blur(8px)', transition: 'background .2s,transform .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <span style={{ fontSize: '28px' }}>{s.e}</span>
                <span style={{ fontSize: '.8rem', fontWeight: 600 }}>{s.label}</span>
              </a>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', background: sectionBg }}>
        <FadeUp>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
            Hemen <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sipariş Verin</span>
          </h2>
          <p style={{ color: '#374151', maxWidth: '460px', margin: '0 auto 2rem', lineHeight: 1.8, fontSize: '.9rem' }}>
            Türkiye geneline ücretsiz teslimat. Uzman ekibimiz kurulum ve eğitim için yanınızda.
          </p>
          <Link href="/siparis"
            style={{ display: 'inline-block', background: G.grad, color: '#fff', padding: '15px 48px', borderRadius: '50px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', transition: 'transform .2s,opacity .2s' }}
            onMouseEnter={btnHover} onMouseLeave={btnLeave}>
            Sipariş Formu →
          </Link>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#111827', color: '#6b7280', textAlign: 'center', padding: '1.25rem', fontSize: '.8rem' }}>
        © 2025 Akıllı Mutfak. Tüm hakları saklıdır.
      </footer>

    </main>
  );
}