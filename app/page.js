'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const G = {
  teal: '#1e7b6e',
  green: '#22c55e',
  grad: 'linear-gradient(135deg,#1e7b6e,#22c55e)',
  gradSoft: 'linear-gradient(135deg,rgba(30,123,110,0.1),rgba(34,197,94,0.1))',
  glass: 'rgba(255,255,255,0.85)',
  shadow: '0 8px 32px rgba(30,123,110,0.1)',
  bg: '#f8fffe',
  sectionBg: 'linear-gradient(160deg,#e8fdf5,#f0fdf4)',
};

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

function Slider({ features }) {
  const total = features.length;
  const [index, setIndex] = useState(0);
  const dragStart = useRef(null);
  const autoRef = useRef(null);
  const stripRef = useRef(null);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setIndex(p => p + 1), 3000);
  };
  useEffect(() => { resetAuto(); return () => clearInterval(autoRef.current); }, []);

  const next = () => { setIndex(p => p + 1); resetAuto(); };
  const prev = () => { setIndex(p => p - 1); resetAuto(); };

  useEffect(() => {
    if (index >= total * 2) {
      if (stripRef.current) stripRef.current.style.transition = 'none';
      setIndex(p => p - total);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (stripRef.current) stripRef.current.style.transition = 'transform .7s cubic-bezier(.4,0,.2,1)';
      }));
    }
    if (index < 0) {
      if (stripRef.current) stripRef.current.style.transition = 'none';
      setIndex(p => p + total);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (stripRef.current) stripRef.current.style.transition = 'transform .7s cubic-bezier(.4,0,.2,1)';
      }));
    }
  }, [index, total]);

  const onMouseDown = (e) => { dragStart.current = e.clientX; };
  const onMouseUp = (e) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - e.clientX;
    if (diff > 50) next(); else if (diff < -50) prev();
    dragStart.current = null;
  };
  const onTouchStart = (e) => { dragStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - e.changedTouches[0].clientX;
    if (diff > 40) next(); else if (diff < -40) prev();
    dragStart.current = null;
  };

  const repeated = [...features, ...features, ...features];
  const activeIdx = ((index % total) + total) % total;

  return (
    <div style={{ position: 'relative', width: '100%', height: '520px', overflow: 'hidden', cursor: 'grab', userSelect: 'none' }}
      onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3, textAlign: 'center', padding: '2.5rem 2rem 1.5rem', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(30,123,110,0.3)', border: '1px solid rgba(34,197,94,0.5)', borderRadius: '50px', padding: '4px 16px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#fff', backdropFilter: 'blur(8px)', marginBottom: '1rem' }}>ÖZELLİKLER</div>
        <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.1rem)', fontWeight: 800, color: '#fff', marginBottom: '.4rem' }}>
          Neden <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Thermomix TM7?</span>
        </h2>
        <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,0.75)' }}>Doğrulanmış teknik özellikler — resmi Vorwerk kaynaklarından</p>
      </div>
      <div ref={stripRef} style={{ display: 'flex', width: '100%', height: '100%', transform: `translateX(-${index * 100}%)`, transition: 'transform .7s cubic-bezier(.4,0,.2,1)', willChange: 'transform' }}>
        {repeated.map((f, i) => (
          <div key={i} style={{ minWidth: '100%', height: '100%', position: 'relative', flexShrink: 0 }}>
            {f.img ? <img src={f.img} alt={f.t} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ position: 'absolute', inset: 0, background: G.sectionBg }} />}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem 3rem' }}>
              <div style={{ color: '#fff' }}>
                <div style={{ display: 'inline-block', background: 'rgba(30,123,110,0.3)', border: '1px solid rgba(34,197,94,0.5)', borderRadius: '50px', padding: '4px 16px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', marginBottom: '1rem', backdropFilter: 'blur(8px)' }}>
                  ÖZELLİK {(i % total) + 1} / {total}
                </div>
                <h3 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>{f.t}</h3>
                <p style={{ fontSize: 'clamp(.9rem,2vw,1.1rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, maxWidth: '560px' }}>{f.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {[{ dir: 'left', fn: prev, pos: 'left' }, { dir: 'right', fn: next, pos: 'right' }].map(({ dir, fn, pos }) => (
        <button key={dir} onClick={fn}
          style={{ position: 'absolute', top: '50%', [pos]: '20px', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', color: '#fff', transition: 'background .2s,transform .2s', zIndex: 2 }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.28)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}>
          {dir === 'left' ? '←' : '→'}
        </button>
      ))}
      <div style={{ position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 2 }}>
        {features.map((_, i) => (
          <button key={i} onClick={() => { setIndex(i); resetAuto(); }}
            style={{ width: i === activeIdx ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === activeIdx ? '#22c55e' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all .3s ease', padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const num = parseInt(target.replace(/\D/g, ''));
    const steps = 60; const inc = num / steps; let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= num) { setCount(num); clearInterval(timer); } else setCount(Math.floor(current));
    }, 1800 / steps);
    return () => clearInterval(timer);
  }, [started, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Testimonials() {
  const items = [
    { ad: 'Ayşe K.', sehir: 'İstanbul', yildiz: 5, yorum: 'Thermomix TM7 hayatımı değiştirdi! Artık yemek yapmak çok daha kolay ve eğlenceli.' },
    { ad: 'Mehmet Y.', sehir: 'Ankara', yildiz: 5, yorum: 'Sessiz çalışması inanılmaz. Sabah kahvaltısı hazırlarken kimseyi uyandırmıyorum.' },
    { ad: 'Fatma S.', sehir: 'İzmir', yildiz: 5, yorum: '10 inç ekran muhteşem. Tarifleri takip etmek çok kolaylaştı, adım adım yönlendiriyor.' },
    { ad: 'Ali R.', sehir: 'Bursa', yildiz: 5, yorum: 'Cookidoo tarifleri sayesinde her gün yeni bir şey yapıyorum. Ailemin favorisi oldu.' },
    { ad: 'Zeynep T.', sehir: 'Antalya', yildiz: 5, yorum: 'Sabit pişirme modu harika! Balık ve et artık mükemmel pişiyor, hiç parçalanmıyor.' },
    { ad: 'Hasan M.', sehir: 'Konya', yildiz: 5, yorum: 'Uzman ekip kurulum için evime geldi, her şeyi anlattı. Servis kalitesi çok yüksek.' },
  ];
  const doubled = [...items, ...items];
  const [paused, setPaused] = useState(false);
  return (
    <section style={{ padding: '5rem 0', background: G.sectionBg, overflow: 'hidden' }}>
      <FadeUp>
        <div style={{ textAlign: 'center', padding: '0 2rem', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', background: G.gradSoft, color: G.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', padding: '5px 16px', borderRadius: '50px', marginBottom: '.75rem' }}>MÜŞTERİ YORUMLARI</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.1rem)', fontWeight: 800, color: '#111827', marginBottom: '.4rem' }}>
            Müşterilerimiz <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Ne Diyor?</span>
          </h2>
          <p style={{ color: '#374151', fontSize: '.9rem' }}>Gerçek kullanıcıların gerçek deneyimleri</p>
        </div>
      </FadeUp>
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        style={{ display: 'flex', gap: '1.25rem', width: 'max-content', animation: 'scroll-left 30s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}>
        {doubled.map((t, i) => (
          <div key={i} style={{ minWidth: '300px', background: '#fff', border: '1.5px solid rgba(30,123,110,0.15)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(30,123,110,0.07)' }}>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>{Array.from({ length: t.yildiz }).map((_, j) => <span key={j} style={{ color: '#f59e0b', fontSize: '16px' }}>★</span>)}</div>
            <p style={{ fontSize: '.875rem', color: '#374151', lineHeight: 1.7, marginBottom: '1rem', fontStyle: 'italic' }}>&ldquo;{t.yorum}&rdquo;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: G.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '.9rem', flexShrink: 0 }}>{t.ad[0]}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '.85rem', color: '#111827' }}>{t.ad}</div>
                <div style={{ fontSize: '.75rem', color: '#9ca3af' }}>{t.sehir}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

function BentoGrid() {
  const hover = (e) => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(30,123,110,0.15)'; };
  const leave = (e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; };
  return (
    <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <FadeUp>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', background: G.gradSoft, color: G.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', padding: '5px 16px', borderRadius: '50px', marginBottom: '.75rem' }}>NEDEN TM7</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.1rem)', fontWeight: 800, color: '#111827', marginBottom: '.4rem' }}>
            Tek Cihaz, <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sonsuz İmkan</span>
          </h2>
        </div>
      </FadeUp>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        <FadeUp>
          <div onMouseEnter={hover} onMouseLeave={leave} style={{ transition: 'transform .25s,box-shadow .25s', gridColumn: '1/2', gridRow: '1/3', background: G.grad, borderRadius: '24px', padding: '2rem', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '320px', position: 'relative', overflow: 'hidden', cursor: 'default' }}>
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '48px' }}></div>
            <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '.25rem' }}>20+</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.5rem' }}>Mutfak Aleti Tek Cihazda</div>
            <p style={{ fontSize: '.82rem', opacity: .9, lineHeight: 1.7 }}>Blender, terazi, buharlık, mikser ve daha fazlası — hepsi Thermomix TM7&apos;de.</p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div onMouseEnter={hover} onMouseLeave={leave} style={{ transition: 'transform .25s,box-shadow .25s', background: '#fff', border: '1.5px solid rgba(30,123,110,0.2)', borderRadius: '24px', padding: '0 0 1.75rem 0', boxShadow: '0 4px 20px rgba(30,123,110,0.07)', cursor: 'default', overflow: 'hidden' }}>
  
            {/* Üst Kısım: Tam Genişlikte Fotoğraf */}
            <div style={{ width: '100%', height: '180px', marginBottom: '1.25rem', overflow: 'hidden' }}>
              <img 
                src="feat1.png" 
                alt="10 inç Dokunmatik Ekran" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Alt Kısım: Metin Alanı (Padding içeride korundu) */}
            <div style={{ padding: '0 1.75rem' }}>
              <h3 style={{ fontWeight: 800, color: '#111827', marginBottom: '.4rem', fontSize: '1.25rem' }}>10&quot; Dokunmatik Ekran</h3>
              <p style={{ fontSize: '.82rem', color: '#374151', lineHeight: 1.7 }}>Akıllı telefon benzeri kullanım kolaylığı. Tarifleri adım adım takip edin.</p>
            </div>

          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div onMouseEnter={hover} onMouseLeave={leave} style={{ transition: 'transform .25s,box-shadow .25s', background: G.gradSoft, border: '1.5px solid rgba(30,123,110,0.2)', borderRadius: '24px', padding: '1.75rem', textAlign: 'center', cursor: 'default' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}><AnimatedCounter target="100000" suffix="+" /></div>
            <div style={{ fontWeight: 700, color: '#111827', marginTop: '.25rem' }}>Cookidoo® Tarifi</div>
            <p style={{ fontSize: '.8rem', color: '#374151', marginTop: '.4rem', lineHeight: 1.6 }}>Rehberli pişirme deneyimiyle her gün yeni tarifler keşfedin.</p>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div onMouseEnter={hover} onMouseLeave={leave} style={{ transition: 'transform .25s,box-shadow .25s', background: '#fff', border: '1.5px solid rgba(30,123,110,0.2)', borderRadius: '24px', padding: '0 0 1.75rem 0', boxShadow: '0 4px 20px rgba(30,123,110,0.06)', cursor: 'default', overflow: 'hidden' }}>
  
            {/* Üst Kısım: Tam Genişlikte Fotoğraf */}
            <div style={{ width: '100%', height: '180px', marginBottom: '1.25rem', overflow: 'hidden' }}>
              <img 
                src="feat2.png" 
                alt="Fısıltı Kadar Sessiz Motor Teknolojisi" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Alt Kısım: Metin Alanı */}
            <div style={{ padding: '0 1.75rem' }}>
              <h3 style={{ fontWeight: 800, color: '#111827', marginBottom: '.4rem' }}>Fısıltı Kadar Sessiz</h3>
              <p style={{ fontSize: '.82rem', color: '#374151', lineHeight: 1.7 }}>Yeni nesil motor teknolojisi. Sabah erken saatlerde bile rahatlıkla kullanın.</p>
            </div>

          </div>
        </FadeUp>
        <FadeUp delay={0.25}>
          <div onMouseEnter={hover} onMouseLeave={leave} style={{ transition: 'transform .25s,box-shadow .25s', background: '#1e7b6e', borderRadius: '24px', padding: '1.75rem', color: '#fff', textAlign: 'center', cursor: 'default' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#fff' }}><AnimatedCounter target="50" suffix="+" /></div>
            <div style={{ fontWeight: 700, marginTop: '.25rem' }}>Yıllık Deneyim</div>
            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.75)', marginTop: '.4rem', lineHeight: 1.6 }}>Alman mühendislik mirası, modern teknoloji ile buluşuyor.</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function Home() {
  const [popup, setPopup] = useState(true);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const chip = (label) => (
    <div style={{ display: 'inline-block', background: G.gradSoft, color: G.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', padding: '5px 16px', borderRadius: '50px', marginBottom: '.75rem' }}>{label}</div>
  );

  const features = [
    { t: '10" Dokunmatik Ekran', d: 'Akıllı telefon benzeri büyük ekranla tarifleri adım adım takip edin.', img: '/feat1.png' },
    { t: 'Sessiz Motor', d: '40–10.700 RPM aralığında, fısıltı kadar sessiz yeni nesil motor.', img: '/feat2.png' },
    { t: 'Sabit Pişirme Modu', d: "Bıçaklar dönmeden balık, et gibi narin malzemeleri 100°C'ye kadar pişirin.", img: '/feat3.png' },
    { t: 'Buharda Pişirme', d: '%45 büyütülmüş Varoma ile vitaminleri koruyarak sağlıklı pişirin.', img: '/feat4.png' },
    { t: 'Cookidoo® 4.0', d: '100.000+ rehberli tarif doğrudan cihazınıza gelir, kişiselleştirilmiş öneriler.', img: '/feat5.png' },
    { t: '20+ Mutfak Aleti', d: 'Tek cihaz; blender, terazi, buharlık, mikser ve daha fazlasının yerini alır.', img: '/feat6.png' },
  ];

  // Varoma kaldırıldı — 3 aksesuar kaldı
  const accessories = [
    { img: '/acc2.png', t: 'Kelebek Aksesuarı', d: 'Krema çırpma ve hassas karıştırma için.', bg: G.gradSoft },
    { img: '/acc3.png', t: 'ThermoServer', d: 'Yemeklerinizi saatlerce sıcak tutan kap.', bg: G.gradSoft },
    { img: '/acc4.png', t: 'Cookidoo® Aboneliği', d: 'Aylık güncellenen tarifler ve rehberlik.', bg: G.gradSoft },
  ];

  const btnHover = (e) => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.opacity = '.9'; };
  const btnLeave = (e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; };
  const accHover = (e) => { e.currentTarget.style.transform = 'translateY(-7px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(30,123,110,0.13)'; };
  const accLeave = (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,123,110,0.07)'; };

  return (
    <main style={{ fontFamily: "'Segoe UI',sans-serif", background: G.bg, color: '#1a1f2e', overflowX: 'hidden', paddingTop: '60px' }}>

      {/* POPUP */}
      {popup && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setPopup(false); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,30,20,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', touchAction: 'manipulation', padding: '1rem' }}>
          <div style={{ background: '#fff', border: '1.5px solid rgba(30,123,110,0.2)', borderRadius: '24px', maxWidth: '360px', width: '100%', position: 'relative', boxShadow: '0 32px 80px rgba(30,123,110,0.2)', overflow: 'hidden' }}>
            {/* Kapatma butonu — büyük ve belirgin */}
            <button onClick={() => setPopup(false)}
              style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', fontSize: '1rem', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', lineHeight: 1 }}>✕</button>
            {/* Küçültülmüş görsel */}
            <img src="/popup.png" alt="Kampanya" style={{ width: '100%', display: 'block', maxHeight: '450px', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ padding: '1rem 1.5rem 1.25rem', textAlign: 'center' }}>
              <Link href="/siparis" onClick={() => setPopup(false)}
                style={{ display: 'inline-block', background: G.grad, color: '#fff', padding: '11px 36px', borderRadius: '50px', fontWeight: 700, fontSize: '.95rem', textDecoration: 'none', transition: 'transform .2s,opacity .2s' }}
                onMouseEnter={btnHover} onMouseLeave={btnLeave}>
                Hemen Sipariş Ver →
              </Link>
            </div>
          </div>
        </div>
      )} 

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(30,123,110,0.12)', padding: '.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo — tıklanabilir, daha büyük */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src="/logs_new.png" alt="thermosiparis.com" style={{ width: '45px', height: '45px', objectFit: 'contain', display: 'block', cursor: 'pointer' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-.3px', paddingTop: '3px', display: 'inline-block' }}>
              thermosiparis.com
            </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.25rem', flexWrap: 'wrap' }}>
          {['Özellikler', 'Aksesuarlar', 'Hakkında', 'İletişim'].map((item, i) => (
            <a key={i} href={`#${['ozellikler', 'aksesuarlar', 'hakkinda', 'iletisim'][i]}`}
              style={{ color: '#374151', textDecoration: 'none', fontSize: '.85rem', fontWeight: 500, padding: '4px 10px' }}>
              {item}
            </a>
          ))}
          <Link href="/ekibimiz"
            style={{ color: G.teal, textDecoration: 'none', fontSize: '.85rem', fontWeight: 700, padding: '6px 14px', border: `1.5px solid ${G.teal}`, borderRadius: '50px', marginLeft: '4px', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = G.teal; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = G.teal; }}>
            Ekibimize Katılın
          </Link>
          <Link href="/siparis"
            style={{ background: G.grad, color: '#fff', padding: '8px 20px', borderRadius: '50px', fontSize: '.85rem', fontWeight: 700, textDecoration: 'none', marginLeft: '4px', transition: 'transform .2s,opacity .2s' }}
            onMouseEnter={btnHover} onMouseLeave={btnLeave}>
            Sipariş Ver
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '7rem 2rem 4rem', position: 'relative', overflow: 'hidden', backgroundImage: 'url(/img2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,30,20,0.48)', backdropFilter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse,rgba(30,123,110,0.2) 0%,rgba(34,197,94,0.1) 45%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(34,197,94,0.4)', borderRadius: '50px', padding: '6px 18px', fontSize: '12px', color: 'rgba(255,255,255,0.9)', marginBottom: '1.75rem', backdropFilter: 'blur(8px)' }}>
            <span style={{ width: '7px', height: '7px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
            Türkiye&apos;nin En Akıllı Mutfak Robotu
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', color: '#fff' }}>
            Mutfağınızı<br />
            <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dönüştürün</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.82)', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Pişirme, karıştırma, buharda pişirme ve daha fazlası — tek bir akıllı cihazla tüm yemeklerinizi hazırlayın.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <Link href="/siparis" style={{ background: G.grad, color: '#fff', padding: '13px 36px', borderRadius: '50px', fontWeight: 700, fontSize: '.95rem', textDecoration: 'none', transition: 'transform .2s,opacity .2s' }} onMouseEnter={btnHover} onMouseLeave={btnLeave}>Hemen Sipariş Ver</Link>
            <a href="#ozellikler" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '13px 32px', borderRadius: '50px', fontWeight: 700, fontSize: '.9rem', border: '1.5px solid rgba(255,255,255,0.35)', textDecoration: 'none', backdropFilter: 'blur(8px)', transition: 'transform .2s,opacity .2s' }} onMouseEnter={btnHover} onMouseLeave={btnLeave}>Keşfet ↓</a>
          </div>
          <div style={{ position: 'relative', width: '500px', maxWidth: '90vw', height: '420px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '320px', height: '320px', border: '1.5px dashed rgba(34,197,94,0.3)', borderRadius: '50%', transform: 'translate(-50%,-50%)', animation: 'spinRing 20s linear infinite', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '410px', height: '410px', border: '1px dashed rgba(30,123,110,0.2)', borderRadius: '50%', transform: 'translate(-50%,-50%)', animation: 'spinRing 30s linear infinite reverse', pointerEvents: 'none' }} />
            <div onMouseEnter={e => e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1.07)'} onMouseLeave={e => e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1)'}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(34,197,94,0.4)', backdropFilter: 'blur(8px)', boxShadow: '0 20px 60px rgba(30,123,110,0.3)', zIndex: 2, animation: 'floatImg 4s ease-in-out infinite', overflow: 'hidden', transition: 'transform .4s ease', cursor: 'default' }}>
              <img src="/img1.png" alt="Thermomix TM7" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {[
              { num: '100K+', lbl: 'Cookidoo® Tarifi', top: '8%', left: '-5%', delay: '0s' },
              { num: '20+', lbl: 'Mutfak Aleti', top: '8%', right: '-5%', delay: '1s' },
              { num: '10"', lbl: 'Dokunmatik Ekran', bottom: '12%', left: '0%', delay: '2s' },
              { num: '50+', lbl: 'Yıl Deneyim', bottom: '12%', right: '0%', delay: '.5s' },
            ].map((c, i) => (
              <div key={i}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-12px) scale(1.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                style={{ position: 'absolute', top: c.top, left: c.left, right: c.right, bottom: c.bottom, background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '.85rem 1.1rem', backdropFilter: 'blur(12px)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 3, animation: 'floatCard 5s ease-in-out infinite', animationDelay: c.delay, textAlign: 'center', minWidth: '100px', transition: 'transform .3s ease, background .2s', cursor: 'default' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{c.num}</div>
                <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: '2px' }}>{c.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes spinRing { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
          @keyframes floatImg { 0%,100% { transform: translate(-50%,-50%) translateY(0); } 50% { transform: translate(-50%,-50%) translateY(-14px); } }
          @keyframes floatCard { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        `}</style>
      </section>

      {/* ÖZELLİKLER */}
      <section id="ozellikler" style={{ width: '100%' }}><Slider features={features} /></section>

      {/* HAKKINDA — yeşil bg */}
      <section id="hakkinda" style={{ background: G.grad, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <FadeUp>
            <div onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              style={{ width: '100%', aspectRatio: '1', borderRadius: '28px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', transition: 'transform .4s' }}>
              <img src="/img1.png" alt="Thermomix TM7" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', padding: '5px 16px', borderRadius: '50px', marginBottom: '.75rem' }}>HAKKINDA</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.3 }}>
              Mutfağınızın <span style={{ color: '#bbf7d0' }}>Akıllı Yardımcısı</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.9, marginBottom: '1rem', fontSize: '.9rem' }}>Thermomix, 50 yılı aşkın Alman mühendislik birikimiyle tasarlanmış dünyanın en gelişmiş mutfak robotu.</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.9, fontSize: '.9rem' }}>Çorbadan tatlıya, ekmekten makarnaya — her gün yeni tarifler keşfedin.</p>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.75rem' }}>
              {[{ n: '22+', l: 'İşlev' }, { n: '80K', l: 'Tarif' }, { n: '50+', l: 'Yıl Deneyim' }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#bbf7d0' }}>{s.n}</div>
                  <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <BentoGrid />
      <Testimonials />

      {/* AKSESUARLAR — varoma kaldırıldı */}
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
                style={{ background: '#fff', border: '1.5px solid rgba(30,123,110,0.15)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(30,123,110,0.07)', transition: 'transform .25s,box-shadow .25s', height: '100%' }}>
                <div style={{ height: '160px', overflow: 'hidden' }}>
                  {a.img ? <img src={a.img} alt={a.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>📷 {a.t}</div>}
                </div>
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
            {[
              { label: 'YouTube', href: 'https://youtube.com', img: '/yt.png' },
              { label: 'Instagram', href: 'https://instagram.com', img: '/in.png' },
              { label: 'WhatsApp', href: 'https://whatsapp.com', img: '/wp.png' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: '18px', overflow: 'hidden', color: '#fff', textDecoration: 'none', minWidth: 'clamp(100px,20vw,160px)', display: 'flex', flexDirection: 'column', alignItems: 'center', backdropFilter: 'blur(8px)', transition: 'background .2s,transform .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ width: '100%', height: 'clamp(70px,12vw,100px)', overflow: 'hidden' }}>
                  {s.img ? <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} /> : <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📷</div>}
                </div>
                <div style={{ padding: 'clamp(.5rem,1.5vw,.75rem)', fontWeight: 600, fontSize: 'clamp(.75rem,2vw,.85rem)' }}>{s.label}</div>
              </a>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* CTA / İLETİŞİM */}
      <section id="iletisim" style={{ padding: '5rem 2rem', textAlign: 'center', background: G.bg }}>
        <FadeUp>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
            Hemen <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sipariş Verin</span>
          </h2>
          <p style={{ color: '#374151', maxWidth: '460px', margin: '0 auto 2rem', lineHeight: 1.8, fontSize: '.9rem' }}>
            Türkiye geneline ücretsiz teslimat. Uzman ekibimiz kurulum ve eğitim için yanınızda.
          </p>
          <Link href="/siparis" style={{ display: 'inline-block', background: G.grad, color: '#fff', padding: '15px 48px', borderRadius: '50px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', transition: 'transform .2s,opacity .2s' }} onMouseEnter={btnHover} onMouseLeave={btnLeave}>
            Sipariş Formu →
          </Link>
        </FadeUp>
      </section>

      <footer style={{ background: '#111827', color: '#6b7280', textAlign: 'center', padding: '1.25rem', fontSize: '.8rem' }}>
        © 2025 thermosiparis.com — Tüm hakları saklıdır.
      </footer>
    </main>
  );
}