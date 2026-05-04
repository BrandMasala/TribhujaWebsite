import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Picture from './Picture';
const ParallaxItem = ({ item, i }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Unique parallax speeds based on index
  const y = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? 50 : -50, i % 2 === 0 ? -50 : 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Adjust for a 2-column massive layout
  const isWide = i === 0 || i === 3;
  let height = '60vh';
  if (i === 0) height = '70vh';
  else if (i === 3) height = '80vh';
  else if (i > 3) height = '50vh';

  const handleClick = () => {
    if (item.category) {
      window.dispatchEvent(new CustomEvent('scroll-to-explorer', {
        detail: { category: item.category }
      }));
    }
  };

  return (
    <motion.div
      ref={ref}
      onClick={handleClick}
      className={`amenity-card ${isWide ? 'wide' : ''}`}
      style={{
        y, scale,
        gridColumn: isWide ? 'span 2' : 'span 1',
        position: 'relative',
        height,
        overflow: 'hidden',
        borderRadius: '2px',
        background: '#111',
        border: '0.5px solid rgba(184,115,51,0.1)',
        cursor: item.category ? 'pointer' : 'default'
      }}
      whileHover={{ scale: 0.99, borderColor: 'rgba(184,115,51,0.4)' }}
    >
      <Picture
        src={item.img}
        mobileSrc={item.mobileImg}
        alt={item.alt || item.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
      />
      <div className="amenity-card-inner" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '40px'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            <h3 className="hl" style={{ margin: 0 }}>
              {item.title}
            </h3>
            {item.caption && (
              <p
                className="amenity-caption"
                style={{
                  margin: '10px 0 0',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
                  lineHeight: 1.4,
                  color: 'rgba(170, 112, 58, 1)',
                  maxWidth: '36ch'
                }}
              >
                {item.caption}
              </p>
            )}
          </div>
          {item.category && (
            <motion.div
              style={{
                padding: '14px 22px',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid #B87333',
                color: '#B87333',
                borderRadius: '50px',
                fontSize: '0.6rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                background: 'rgba(184,115,51,0.05)',
                flexShrink: 0
              }}
            >
              Explore Experience &rarr;
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Tribhuja = () => {
  // Captions are catalogue-verbatim lines per TRIBHUJA_V9.pdf. Page
  // refs kept inline so a later voice sweep can re-verify against
  // the source PDF without re-reading the brief.
  const amenities = [
    {
      title: 'The Arrival',
      img: '/assets/images/arrival.webp',
      mobileImg: '/assets/images/arrival-mobile.webp',
      // SEO alt — primary keywords 1, 2 + brand triad.
      alt: 'Luxury 3 & 4 BHK apartments in Kollur Hyderabad — Zuari Gangothri Tribhuja arrival',
      caption: 'Your first step into a life that\'s been waiting.' 
    },
    {
      title: 'Club Tribhuja',
      img: '/assets/images/club.webp',
      mobileImg: '/assets/images/club-mobile.webp',
      category: 'clubhouse',
      // SEO alt — keyword 12 (apartments with clubhouse).
      alt: 'Tribhuja clubhouse amenities — apartments with clubhouse in Kollur Hyderabad',
      caption: 'Every hour of Club Tribhuja has somewhere to go.' // p.36
    },
    {
      title: 'The Grounds',
      img: '/assets/images/out.webp',
      mobileImg: '/assets/images/out-mobile.webp',
      category: 'outdoor',
      // SEO alt — keyword 11 (gated community) + scale fact.
      alt: 'Gated community apartments Kollur — Tribhuja grounds across 9.16 acres with 76% open ground',
      caption: 'The luxury is in what was left alone' // p.37
    },
    {
      title: 'The Rise',
      img: '/assets/images/sky.webp',
      mobileImg: '/assets/images/sky-mobile.webp',
      category: 'terrace',
      // SEO alt — keywords 10 (high rise), 9 (new launch), 4 (near ORR).
      alt: 'High rise apartments Hyderabad — Tribhuja nine towers, new launch in Kollur near ORR Exit 2',
      caption: '120 meters of vertical life' // p.23
    },
    {
      title: 'The Home',
      img: '/assets/images/bedroom.webp',
      mobileImg: '/assets/images/bedroom-mobile.webp',
      category: 'home',
      // SEO alt — keyword 1 + long-tails 17, 18 (ventilation, vastu).
      alt: '3 BHK apartment interiors Kollur — Tribhuja flats with good ventilation and Vastu-compliant design',
      caption: 'Open to the sun. Kind to the air. Faithful to the quiet.',
      // p.52
    },
    
  ];

  return (
    <section id="tribhuja" style={{ background: '#080806' }}>
      
      {/* SECTION HEADER */}
      <div className="ps-inner" style={{ paddingTop: '60px', paddingBottom: '0px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', padding: '0 20px' }}>
          <Picture
            src="/assets/images/logo-320w.png"
            alt="Tribhuja logo"
            width="320"
            height="83"
            sourceProps={{ srcSet: '/assets/images/logo-320w.webp 320w, /assets/images/logo-640w.webp 640w', sizes: '(max-width: 768px) 90vw, 460px' }}
            style={{ height: 'auto', width: '100%', maxWidth: '460px', display: 'block', opacity: 0.9 }}
          />
        </div>
        {/* <h2 className="hl" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', marginBottom: '20px' }}>Every hour of Tribhuja's life passes through here.</h2> */}
        {/* <p className="bd" style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.6 }}>
          A bride getting ready. A grandfather reading. A ten-year-old's first swim. A Tuesday afternoon with no plans.
        </p> */}
      </div>

      {/* AMENITIES MOSAIC (Replacing the Reel) */}
      <div className="ps-inner" style={{ paddingBottom: '30px' }}>
        <div className="amenities-mosaic" style={{
           display: 'grid',
           gridTemplateColumns: 'repeat(2, 1fr)',
           gridAutoFlow: 'dense',
           gap: '30px',
        }}>
          {amenities.map((item, i) => (
            <ParallaxItem key={i} item={item} i={i} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Tribhuja;
