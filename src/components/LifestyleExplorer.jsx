import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Picture from './Picture';

const EXPLORER_DATA = {
  // TheArrival: {
  //   title: 'The Arrival',
  //   subtitle: "Your first step into a life that's been waiting",
  //   items: [
  //     { level: '01', title: 'Water', descriptor: 'First sound inside tribhuja is WATER', img: '/assets/images/water-desktop.webp', mobileImg: '/assets/images/water-mobile.webp' },
  //   ]
  // },
  clubhouse: {
    title: 'Club Tribhuja',
    subtitle: 'Morning. Afternoon. Evening. Every hour of Club Tribhuja has somewhere to go.',
    description: '1,00,000 sft. Kollur\'s largest clubhouse. Because every hour of the day deserves a space of its own',
    items: [
      { level: '01', title: 'A Lobby', descriptor: 'that leaves every door a little open. So the day can wander, and always find its way back.', img: '/assets/images/lobby.webp', mobileImg: '/assets/images/lobby-mobile.webp' },
      { level: '02', title: 'Banquet Hall', descriptor: 'The flowers have been placed. The chairs have been pulled in. The evening begins when you do.', img: '/assets/images/Bandq.webp', mobileImg: '/assets/images/Bandq-mobile.webp' },
      { level: '03', title: 'The Theatre', descriptor: 'Built for the scale of Baahubali. The soul of Mahanati.The pulse of Pushpa.', img: '/assets/images/Thea.webp', mobileImg: '/assets/images/Thea-mobile.webp' },
      { level: '04', title: 'Party Lounge', descriptor: 'Conversations & Celebrations — Party Lounge', img: '/assets/images/Short.webp', mobileImg: '/assets/images/Short-mobile.webp' },
      { level: '05', title: 'Terrace Pool', descriptor: '', img: '/assets/images/Terrace-pool.webp', mobileImg: '/assets/images/Terrace-pool-mobile.webp' },
      { level: '06', title: 'Dance Room', descriptor: '', img: '/assets/images/Dan.webp', mobileImg: '/assets/images/Dan-mobile.webp' },
      { level: '07', title: 'Creche Area', descriptor: '', img: '/assets/images/crech.webp', mobileImg: '/assets/images/crech-mobile.webp' },
      { level: '08', title: 'Gym', descriptor: '', img: '/assets/images/gym.webp', mobileImg: '/assets/images/gym-mobile.webp' },
      { level: '09', title: 'Yoga Studio', descriptor: '', img: '/assets/images/Yoga.webp', mobileImg: '/assets/images/Yoga-mobile.webp' },
      { level: '10', title: 'Co Working Space', descriptor: '', img: '/assets/images/co-working.webp', mobileImg: '/assets/images/co-working-mobile.webp' },
      { level: '11', title: 'Guest Room', descriptor: '', img: '/assets/images/home.webp', mobileImg: '/assets/images/home-mobile.webp' },
      { level: '12', title: 'Games Room', descriptor: '', img: '/assets/images/PlayR.webp', mobileImg: '/assets/images/PlayR-mobile.webp' },
      { level: '13', title: 'Squash Court', descriptor: '', img: '/assets/images/sqaush.webp', mobileImg: '/assets/images/sqaush-mobile.webp' },
      { level: '14', title: 'Badminton Court', descriptor: '', img: '/assets/images/Bad.webp', mobileImg: '/assets/images/Bad-mobile.webp' },
      { level: '15', title: 'Music Room', descriptor: '', img: '/assets/images/Music.webp', mobileImg: '/assets/images/Music-mobile.webp' },
    ]
  },
  Grounds: {
    title: 'The Grounds',
    subtitle: '72% Open Space',
    description: 'The luxury is in what was left alone.',
    items: [
      { level: '01', title: 'The Pool', descriptor: 'Where the world disappears', img: '/assets/images/The-pool.webp', mobileImg: '/assets/images/The-pool-mobile.webp' },
      { level: '02', title: 'Amphitheater & Temple', descriptor: '', img: '/assets/images/Amphi-thea.webp', mobileImg: '/assets/images/Amphi-thea-mobile.webp' },
      { level: '03', title: 'The Arena', descriptor: '', img: '/assets/images/outdoor-sports-32.webp', mobileImg: '/assets/images/outdoor-sports-32-mobile.webp' },
      { level: '04', title: 'Cycle Track', descriptor: '', img: '/assets/images/cycle-track.webp', mobileImg: '/assets/images/cycle-track-mobile.webp' },
      { level: '05', title: 'Kids Pool', descriptor: '', img: '/assets/images/kids-pool.webp', mobileImg: '/assets/images/kids-pool-mobile.webp' },
      { level: '06', title: 'Jogging Track', descriptor: '', img: '/assets/images/jogging-track.webp', mobileImg: '/assets/images/jogging-track-mobile.webp' },
      { level: '07', title: 'Outdoor Gym', descriptor: '', img: '/assets/images/out-gym.webp', mobileImg: '/assets/images/out-gym-mobile.webp' },
    ]
  },
  Rise: {
    title: 'The Rise',
    subtitle: 'Every floor, a life in motion.',
    description: 'Up for the quiet. Down for the city. Moving through the moments that matter.',
    items: [
      { level: '01', title: 'High-Speed Lifts', descriptor: 'Floor 0 to Floor 37 in less than 60 seconds.', img: '/assets/images/lift.webp', mobileImg: '/assets/images/lift-mobile.webp' },
      { level: '02', title: 'Top of the World', descriptor: 'Some views change the way you see everything.', img: '/assets/images/sky.webp', mobileImg: '/assets/images/sky-mobile.webp' },
      { level: '03', title: 'The Sky Bridge', descriptor: 'A private crossing, \nexclusive to Towers A & B.', img: '/assets/images/two-towers.webp', mobileImg: '/assets/images/two-towers-mobile.webp' },
      { level: '04', title: 'Terrace Garden', descriptor: '', img: '/assets/images/garden.webp', mobileImg: '/assets/images/garden-mobile.webp' },
    ]
  },
  home: {
    title: 'The Home',
    subtitle: 'A home is not a feeling. It is the part that matters.',
    description: 'A door that opens the right way. A kitchen that knows the hour. A room that ends the day before you do.',
    items: [
      { level: '01', title: 'The Bedroom', descriptor: `The last room of the day\nand the first of the next one.`, img: '/assets/images/bedroom.webp', mobileImg: '/assets/images/bedroom-mobile.webp' },
      { level: '02', title: 'The Living Room', descriptor: 'A room that fills with the first light of the day.', img: '/assets/images/livingarea.webp', mobileImg: '/assets/images/livingarea-mobile.webp' },
    ]
  },
  
};

const ExplorerCard = ({ item, activeAlt }) => {
  return (
    <motion.div
      className="explorer-card"
      whileHover={{ scale: 1.02 }}
      style={{
        minWidth: window.innerWidth < 768 ? '85vw' : '450px',
        height: '550px',
        position: 'relative',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid rgba(184,115,51,0.2)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        background: '#080806',
        flexShrink: 0
      }}
    >
      <Picture
        src={item.img}
        mobileSrc={item.mobileImg}
        alt={activeAlt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
          <span style={{ 
            fontSize: '2.5rem', 
            fontFamily: "'DM Sans', sans-serif", 
            fontWeight: 200, 
            color: 'rgba(184,115,51,0.3)', 
            lineHeight: 1 
          }}>
            {item.level}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h3 className="hl" style={{ fontSize: '1.5rem', margin: 0, color: 'var(--cream)', lineHeight: 1.1 }}>
              {item.title}
            </h3>
            {item.descriptor && (
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                color: '#B87333',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                opacity: 0.9,
                maxWidth: '320px',
                lineHeight: 1.5,
                whiteSpace: 'pre-line'
              }}>
                {item.descriptor}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LifestyleExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('clubhouse');
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, activeCategory]);

  // Track scroll progress for the indicator
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    }
  };

  // Sync with global event for scroll-to-category
  useEffect(() => {
    const handleCategoryClick = (e) => {
      if (e.detail && e.detail.category) {
        setActiveCategory(e.detail.category);
        if (containerRef.current) {
          containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    window.addEventListener('scroll-to-explorer', handleCategoryClick);
    return () => window.removeEventListener('scroll-to-explorer', handleCategoryClick);
  }, []);

  const category = EXPLORER_DATA[activeCategory];
  const items = category.items;

  const altByCategory = {
    clubhouse: (title) => `Tribhuja clubhouse ${title} — apartments with clubhouse in Kollur Hyderabad`,
    outdoor:   (title) => `Tribhuja grounds ${title} — gated community apartments Kollur Hyderabad`,
    home:      (title) => `3 BHK apartment interiors Kollur — Tribhuja ${title} flats with good ventilation`,
    terrace:   (title) => `High rise apartments Hyderabad — Tribhuja ${title} at nine-tower new launch near ORR`,
    TheArrival:(title) => `Luxury 3 & 4 BHK apartments in Kollur — Tribhuja ${title}`
  };

  const scrollNext = () => {
    setIsPaused(true);
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      }
    }
    // Resume auto-play after 10s of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const scrollPrev = () => {
    setIsPaused(true);
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section 
      id="lifestyle-explorer" 
      className="lifestyle-explorer" 
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ 
        padding: '40px 0', 
        position: 'relative', 
        backgroundColor: '#000',
        overflow: 'hidden',
        borderTop: '1px solid rgba(184,115,51,0.1)'
      }}
    >
      {/* BACKGROUND TEXTURES */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/images/copper.webp)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)', pointerEvents: 'none' }} />
      
      <div className="ps-inner" style={{ maxWidth: '1400px', position: 'relative', zIndex: 1 }}>
        
        {/* CATEGORY NAV */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '20px',
          borderBottom: '1px solid rgba(184,115,51,0.2)', 
          marginBottom: '40px', 
          paddingBottom: '10px'
        }}>
          {Object.keys(EXPLORER_DATA).map(key => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeCategory === key ? '#B87333' : 'rgba(240,226,200,0.4)',
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                cursor: 'pointer',
                fontWeight: activeCategory === key ? 700 : 400,
                padding: '14px 12px',
                transition: '0.3s',
                position: 'relative'
              }}
            >
              {key}
              {activeCategory === key && (
                <motion.div layoutId="catUnderline" style={{ position: 'absolute', bottom: -12, left: 0, right: 0, height: '2px', background: '#B87333' }} />
              )}
            </button>
          ))}
        </div>

        {/* HEADER & CONTROLS */}
        <div style={{ 
          display: 'flex', 
          flexDirection: window.innerWidth < 768 ? 'column' : 'row', 
          justifyContent: 'space-between', 
          alignItems: window.innerWidth < 768 ? 'flex-start' : 'flex-end', 
          marginBottom: '50px',
          gap: '30px'
        }}>
          <div style={{ maxWidth: '800px' }}>
            <div className="eyebrow" style={{ color: '#7A3A10' }}>{category.title}</div>
            <h2 className="hl" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginTop: '10px', marginBottom: '20px' }}>{category.subtitle}</h2>
            {category.description && (
              <p className="bd" style={{ color: 'rgba(240,226,200,0.6)', maxWidth: '600px' }}>{category.description}</p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={scrollPrev}
              style={{
                width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(184,115,51,0.3)',
                background: 'rgba(255,255,255,0.05)', color: '#B87333', cursor: 'pointer', fontSize: '1.2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(184,115,51,0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
            >
              &larr;
            </button>
            <button 
              onClick={scrollNext}
              style={{
                width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(184,115,51,0.3)',
                background: 'rgba(255,255,255,0.05)', color: '#B87333', cursor: 'pointer', fontSize: '1.2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(184,115,51,0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="explorer-carousel no-scrollbar"
          style={{ 
            display: 'flex', 
            gap: '30px', 
            overflowX: 'auto', 
            paddingBottom: '40px',
            scrollSnapType: 'x mandatory',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {items.map((item, i) => (
            <motion.div key={`${activeCategory}-${i}`} style={{ scrollSnapAlign: 'start' }}>
              <ExplorerCard 
                item={item} 
                activeAlt={(altByCategory[activeCategory] || ((t) => `Tribhuja Kollur — ${t}`))(item.title)} 
              />
            </motion.div>
          ))}
        </div>

        {/* PROGRESS INDICATOR */}
        <div style={{ 
          height: '2px', 
          background: 'rgba(184,115,51,0.1)', 
          width: '100%', 
          position: 'relative',
          marginTop: '20px',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <motion.div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              height: '100%', 
              background: '#B87333',
              width: '100%',
              scaleX: scrollProgress || 0,
              originX: 0,
              transition: { type: 'spring', stiffness: 100, damping: 20 }
            }} 
          />
        </div>
      </div>
    </section>
  );
};


export default LifestyleExplorer;
