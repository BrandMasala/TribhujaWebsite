import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import Picture from './Picture';

const CountUpStat = ({ value, value2, label, unit = "", prefix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const end = parseFloat(value) || 0;
  const end2 = value2 != null ? (parseFloat(value2) || 0) : null;
  const isFloat = value.toString().includes('.');
  const formatNum = (n) => isFloat ? n.toFixed(2) : String(Math.floor(n));
  const [current, setCurrent] = useState(formatNum(end));
  const [current2, setCurrent2] = useState(end2 != null ? formatNum(end2) : null);

  useEffect(() => {
    if (!inView) return;
    setCurrent(isFloat ? '0.00' : '0');
    if (end2 != null) setCurrent2(isFloat ? '0.00' : '0');
    const duration = 1800;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (t < 1) {
        setCurrent(formatNum(end * eased));
        if (end2 != null) setCurrent2(formatNum(end2 * eased));
        raf = requestAnimationFrame(tick);
      } else {
        setCurrent(formatNum(end));
        if (end2 != null) setCurrent2(formatNum(end2));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, end2, isFloat]);

  return (
    <div ref={ref} className="ph-stat-cell" style={{ padding: '40px', borderRight: '0.5px solid rgba(122, 58, 16, 0.2)', borderBottom: '0.5px solid rgba(122, 58, 16, 0.2)' }}>
      <div className="ph-stat-label" style={{ fontSize: '0.7rem', color: '#120702', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '15px', opacity: 0.8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', flexWrap: 'nowrap' }}>
        {prefix && <span className="ph-stat-prefix" style={{ fontSize: '2rem', fontWeight: 300, color: '#120702', fontFamily: "'Cormorant Garamond', serif" }}>{prefix}</span>}
        <motion.span className="ph-stat-value" style={{ fontSize: current2 != null ? '2.4rem' : '3rem', fontWeight: 300, color: '#120702', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>{current}</motion.span>
        {current2 != null && (
          <>
            <span style={{ fontSize: '2rem', fontWeight: 300, color: '#120702', fontFamily: "'Cormorant Garamond', serif", margin: '0 2px', lineHeight: 1 }}>–</span>
            <motion.span className="ph-stat-value" style={{ fontSize: '2.4rem', fontWeight: 300, color: '#120702', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>{current2}</motion.span>
          </>
        )}
        <span className="ph-stat-unit" style={{ fontSize: '1rem', color: '#120702', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{unit}</span>
      </div>
    </div>
  );
};

const TowerSchematic = () => (
  <svg viewBox="0 0 800 600" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: 'auto', opacity: 0.04, pointerEvents: 'none' }}>
    <g stroke="#B87333" strokeWidth="0.5" fill="none">
        {/* Simplified Tower Elevations */}
        {[100, 250, 400, 550, 700].map(x => (
            <React.Fragment key={x}>
                <rect x={x - 40} y="100" width="80" height="450" />
                <line x1={x - 40} y1="150" x2={x + 40} y2="150" />
                <line x1={x - 40} y1="200" x2={x + 40} y2="200" />
                <line x1={x - 40} y1="250" x2={x + 40} y2="250" />
                <line x1={x - 40} y1="300" x2={x + 40} y2="300" />
                {/* Windows tiny details */}
                <rect x={x-30} y="110" width="10" height="15" />
                <rect x={x-10} y="110" width="10" height="15" />
                <rect x={x+20} y="110" width="10" height="15" />
            </React.Fragment>
        ))}
        {/* Horizontal Connection lines */}
        <line x1="0" y1="550" x2="800" y2="550" strokeWidth="1" />
        <path d="M 100,100 Q 400,50 700,100" strokeDasharray="5 5" />
    </g>
  </svg>
);

const ProjectHighlights = () => {
  const imageRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: true, margin: "-100px" });

  return (
    <section id="project-highlights" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#120702' }}>
      {/* LAYER 0: Background Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("/assets/images/copper.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <TowerSchematic />

        <div className="ps-inner" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        
        {/* SECTION HEADER */}
        <div>
          <div className="eyebrow" style={{ color: '#7A3A10' }}>The Rise</div>
          <h2 className="hl" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', marginBottom: '20px', color: '#120702', lineHeight: 1.1 }}>Thirty-eight floors<br />at one hundred and twenty metres.</h2>
          <div className="rule" style={{ width: '60px', backgroundColor: '#7A3A10' }}></div>
        </div>
        </div>

        {/* Large Static Image Section with Mask Reveal */}
        <div
          ref={imageRef}
          className="about-hero-img ph-hero-img"
          style={{
            height: 'clamp(400px, 80vh, 100vh)',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '40px'
          }}
        >
          <motion.div
            className="reveal-mask"
            initial={{ translateY: "0%" }}
            animate={{ translateY: isImageInView ? "-101%" : "0%" }}
            transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
          />
          <Picture
            src="/assets/images/high.webp"
            mobileSrc="/assets/images/high-mobile.webp"
            alt="Premium apartments in Hyderabad Kollur by Zuari Gangothri Tribhuja — nine towers at ORR Exit 2"
            width="5000"
            height="2813"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill'
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,6,0.7) 0%, transparent 60%)' }} />
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="about-overlay"
            style={{ position: 'absolute', bottom: '60px', left: '5vw' }}
          >
             <Picture
               src="/assets/images/logo-320w.png"
               alt="Zuari Tribhuja Hyderabad"
               width="320"
               height="83"
               sourceProps={{ srcSet: "/assets/images/logo-320w.webp 320w, /assets/images/logo-640w.webp 640w", sizes: "320px" }}
               style={{ height: '70px', width: 'auto', display: 'block' }}
             />
             <div style={{ width: '40px', height: '1px', background: 'var(--accent)', marginTop: '60px' }} />
          </motion.div>
        </div>

        <div className="ps-inner" style={{ paddingBottom: '60px' }}>

        {/* HUD STATS GRID */}
        <div className="ph-stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          borderLeft: '0.5px solid rgba(122, 58, 16, 0.2)',
          borderTop: '0.5px solid rgba(122, 58, 16, 0.2)',
          marginBottom: '60px'
        }}>
          <CountUpStat value={9} label="Tall Towers" unit="Towers" />
          <CountUpStat value={9.16} label="Site Area" unit="Acres" />
          <CountUpStat value={37} prefix="G+"label="Floors Per Towers" unit="" />
          <CountUpStat value={1679} value2={3126} label="Min - Max Area" unit="SQ.FT" />
          <CountUpStat value={78} prefix="" label="Corner Flats" unit="%" />
          <CountUpStat value={72} label="Open Space" unit="%" />
          <CountUpStat value={1} prefix=""label="Clubhouse" unit="Lakh SQ.FT" />
          <CountUpStat value={1730} label="Homes" unit="Units" />
        </div>

        {/* INTRO BLOCK */}
        <div className="arrival-block" style={{ marginBottom: '80px', maxWidth: '720px' }}>
          <div className="eyebrow" style={{ marginBottom: '20px', color: '#7A3A10' }}>Infrastructure</div>
          <h3 className="hl" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)', marginBottom: '30px', color: '#120702', lineHeight: 1.1 }}>A building can be engineered to stand.</h3>
          <p className="bd" style={{ color: '#120702', opacity: 0.8, marginBottom: '30px' }}>
            But a building engineered to breathe,
            to receive light at the correct hour,
            to give every resident the dignity of
            quiet belonging — that requires a vision,
            a plan, a method.
          </p>
        </div>

        {/* EDITORIAL BLOCKS */}
        <div className="ph-editorial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '60px', alignItems: 'start' }}>

          <div className="prakash-block">
            <div className="eyebrow" style={{ marginBottom: '20px', color: '#7A3A10' }}>Light Arrives</div>
            <h3 className="hl" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)', marginBottom: '30px', color: '#120702', lineHeight: 1.1 }}>Prakash.</h3>
            <p className="bd" style={{ color: '#120702', opacity: 0.8, marginBottom: '30px' }}>
              Every wall drawn around the sun's path.
            </p>
          </div>

          <div className="vayu-block">
            <div className="eyebrow" style={{ marginBottom: '20px', color: '#7A3A10' }}>Air Crosses</div>
            <h3 className="hl" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)', marginBottom: '30px', color: '#120702', lineHeight: 1.1 }}>Vayu.</h3>
            <p className="bd" style={{ color: '#120702', opacity: 0.8, marginBottom: '30px' }}>
              Cross-ventilation through every living space.
            </p>
          </div>

          <div className="sukoon-block">
            <div className="eyebrow" style={{ marginBottom: '20px', color: '#7A3A10' }}>Privacy Settles</div>
            <h3 className="hl" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)', marginBottom: '30px', color: '#120702', lineHeight: 1.1 }}>Sukoon.</h3>
            <p className="bd" style={{ color: '#120702', opacity: 0.8, marginBottom: '30px' }}>
              More corner homes so no side looks into another family's morning.
            </p>
          </div>

        </div>
      </div>
    </div>
    </section>
  );
};

export default ProjectHighlights;
