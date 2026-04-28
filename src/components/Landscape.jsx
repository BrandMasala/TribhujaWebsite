import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Picture from './Picture';

const Landscape = () => {
  const [showLightbox, setShowLightbox] = useState(false);
  const legendItems = [
    "Arrival plaza",
    "Drop off plaza",
    "Broadway / Jogging tracks",
    "Cycle track",
    "Entry feature wall",
    "Club entry plaza",
    "Giant Chess",
    "Senior Citizen nook",
    "Temple",
    "Temple Garden",
    "Sporadic market",
    "Amphitheater",
    "Kids play area",
    "Cycle vault",
    "Cycle / Skating",
    "Mound",
    "Trampoline park",
    "Toddler park",
    "Smart / Meditation deck",
    "Party lawn",
    "Smart pole",
    "Futsal court",
    "Half Basketball court",
    "Pickle ball court",
    "Sandpit",
    "Stapoo",
    "Leisure pool / Lap Pool",
    "Fitness pool",
    "Wading pool",
    "Kids pool",
    "Wet lounge",
    "Infinity edge",
    "Dry lounge",
    "Labyrinth walk",
    "Dry deck fountain",
    "Pool amenities"
  ];

  return (
    <section id="landscape" style={{ 
      background: '#050505', 
      padding: '40px 0', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* FULL COPPER TEXTURE BACKGROUND */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'url(/assets/images/copper.webp)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          opacity: 0.6,
          pointerEvents: 'none'
        }} 
      />
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at center, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          pointerEvents: 'none'
        }} 
      />
      
      <div className="ps-inner" style={{ maxWidth: '1600px', position: 'relative', zIndex: 1 }}>
        
        {/* CINEMATIC CENTERED HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="hl" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--cream)', marginBottom: '10px' }}>
              The Landscape
            </h2>
            <p style={{ 
              fontFamily: "'DM Sans', sans-serif", 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.4em', 
              color: '#B87333',
              fontWeight: 600
            }}>
              9.16 Acres of Intended Luxury &middot; 36 Curated Zones
            </p>
          </motion.div>
        </div>

        {/* MASSIVE CLICKABLE MASTER PLAN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            onClick={() => setShowLightbox(true)}
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 80px 150px rgba(0,0,0,0.8)',
              border: '1px solid rgba(184,115,51,0.2)',
              cursor: 'zoom-in',
              background: '#050505'
            }}
          >
            <Picture 
              src="/assets/images/master-landscape.webp" 
              mobileSrc="/assets/images/master-landscape-mobile.webp"
              alt="Tribhuja Master Landscape Plan Hyderabad"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '30px', 
              right: '30px', 
              background: 'rgba(184,115,51,0.9)', 
              color: '#fff', 
              padding: '10px 20px', 
              fontSize: '0.65rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              fontWeight: 600,
              borderRadius: '2px'
            }}>
              Click to Expand Plan
            </div>
          </motion.div>

          <motion.div
            className="landscape-legend-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px 32px',
              padding: 'clamp(30px, 5vw, 60px)',
              background: 'rgba(184,115,51,0.03)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(184,115,51,0.1)',
              borderRadius: '2px'
            }}
          >
            {legendItems.map((item, idx) => (
              <div key={idx} style={{
                fontSize: '0.78rem',
                color: 'rgba(237, 230, 218, 0.75)',
                fontFamily: "'DM Sans', sans-serif",
                display: 'flex',
                gap: '12px',
                lineHeight: 1.4
              }}>
                <div style={{ color: '#B87333', fontSize: '1.2rem', lineHeight: 1, marginTop: '-2px' }}>&bull;</div>
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* FULL SCREEN LIGHTBOX */}
        <AnimatePresence>
          {showLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLightbox(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(0,0,0,0.98)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                cursor: 'zoom-out'
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{ width: '90vw', height: '90vh' }}
              >
                <img 
                  src="/assets/images/master-landscape.webp" 
                  alt="Tribhuja Full Landscape Plan" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </motion.div>
              <div style={{ 
                position: 'absolute', 
                top: '40px', 
                right: '40px', 
                color: 'var(--cream)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                background: 'rgba(255,255,255,0.1)',
                padding: '10px 20px',
                borderRadius: '2px',
                cursor: 'pointer',
                zIndex: 10000
              }}>
                CLOSE [X]
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .landscape-legend-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px 16px !important;
            padding: 20px !important;
          }
          .landscape-legend-grid > div {
            font-size: 0.72rem !important;
            align-items: flex-start !important;
          }
        }
      `}} />
    </section>
  );
};

export default Landscape;
