import React from 'react';
import Picture from './Picture';
import { motion } from 'framer-motion';

const LocationSection = () => {
  // Data derived from provided brief
  const hotspots = [
    {
      name: 'RGIA Airport',
      dist: '25 MINS',
      detail: "Signal-free corridor, No traffic lights between here and the runway."
    },
    {
      name: 'ORR Exit 2',
      dist: '02 MINS',
      detail: "Eight lanes. The city’s circulatory system at the doorstep."
    },
    {
      name: 'Financial District',
      dist: '10 MINS',
      detail: "Straight-line corridor to the South. Where the economy clocks in."
    },
    {
      name: 'Cycling Track',
      dist: '02 MINS',
      detail: "23 km solar-covered track. Nanakramguda to TSPA and Narsingi to Kollur."
    }
  ];

  return (
    <section id="location" style={{ background: '#050505', color: 'var(--cream)', padding: '80px 0' }}>
      <div className="ps-inner" style={{ maxWidth: '1400px' }}>
        
        {/* PANORAMIC GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1.2fr 1fr', gap: '60px', alignItems: 'start', marginBottom: '60px' }}>

          {/* COLUMN 1: MAP */}
          <div className="location-map-wrapper" style={{
              position: 'relative',
              background: '#080806',
              border: '1px solid rgba(184,115,51,0.2)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <Picture
                src="/assets/images/new.webp"
                mobileSrc="/assets/images/new-mobile.webp"
                alt="Tribhuja location map — apartments near ORR Exit 2 and Financial District Hyderabad"
                width="401"
                height="598"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #050505 0%, transparent 20%, transparent 80%, #050505 100%)', pointerEvents: 'none' }} />
          </div>

          {/* COLUMN 2: EDITORIAL LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ width: '60px', height: '1px', background: 'rgba(184,115,51,0.6)' }} />

            <h2 className="hl" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', margin: 0, color: 'var(--cream)' }}>
              The Kollur
            </h2>

            <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(240,226,200,0.85)', fontWeight: 300 }}>
              The neighbourhood was ready before the towers rose.
            </p>

            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 2.6vw, 2rem)', color: 'var(--cream)', lineHeight: 1 }}>500</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: '#B87333', fontWeight: 600 }}>FT</span>
              </div>
              <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(240,226,200,0.65)' }}>
                of frontage on the ORR.
              </p>
            </div>

            {hotspots.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', color: 'var(--cream)', lineHeight: 1.1 }}>{h.name} :</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', color: 'var(--cream)', lineHeight: 1.1 }}>{parseInt(h.dist, 10)}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: '#B87333', fontWeight: 600 }}>MIN</span>
                </div>
                <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(240,226,200,0.65)' }}>
                  {h.detail}
                </p>
              </motion.div>
            ))}

            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', color: 'var(--cream)', lineHeight: 1.1 }}>IT Corridor :</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', color: 'var(--cream)', lineHeight: 1.1 }}>15</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: '#B87333', fontWeight: 600 }}>MIN</span>
              </div>
              <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(240,226,200,0.65)' }}>
                Amazon, Microsoft, Google, ISB,<br />Infosys, TCS, Cognizant.
              </p>
            </div>

            <p style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', lineHeight: 1.5, color: '#B87333' }}>
              Proximity to International Schools,<br />Hospitals and Malls.
            </p>

            <div style={{ width: '60px', height: '1px', background: 'rgba(184,115,51,0.6)', marginTop: '16px' }} />
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .location-map-wrapper {
          min-height: 700px;
        }
        @media (max-width: 1024px) {
          #location .ps-inner { padding: 40px 5vw !important; }
          .location-map-wrapper {
            min-height: auto;
            aspect-ratio: 401 / 598;
          }
        }
        @media (max-width: 768px) {
          #location div[style*="grid-template-columns: 1fr 1.2fr"] { 
            grid-template-columns: 1fr !important; 
            gap: 40px !important; 
            padding: 30px !important;
          }
        }
      `}} />
    </section>
  );
};

export default LocationSection;
