import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import LocationSection from './LocationSection';
import Picture from './Picture';

const ArchiveSeal = ({ num, label, onClick, active }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={active ? "archive-seal-active" : "archive-seal"}
    animate={{
      z: active ? 350 : 0, 
      backgroundColor: active ? '#B87333' : 'rgba(8,8,6,0.8)'
    }}
    style={{
      position: 'absolute',
      bottom: window.innerWidth < 768 && active ? 'auto' : (window.innerWidth < 768 ? '20px' : '40px'),
      top: window.innerWidth < 768 && active ? '20px' : 'auto',
      right: window.innerWidth < 768 ? '20px' : '40px',
      zIndex: 1000, 
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: active ? '0' : '12px',
      padding: active ? '0' : (window.innerWidth < 768 ? '10px 16px' : '14px 22px'),
      width: active ? '44px' : 'auto',
      height: active ? '44px' : 'auto',
      minHeight: active ? '40px' : '40px',
      border: '0.5px solid rgba(184,115,51,0.4)',
      backdropFilter: 'blur(10px)',
      outline: 'none',
      userSelect: 'none',
      borderRadius: active ? '50%' : '2px'
    }}
  >
    {!active && (
      <div style={{ 
        width: '28px', height: '28px', border: '0.5px solid rgba(184,115,51,0.5)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.55rem', color: '#B87333',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        {num}
      </div>
    )}
    
    <div style={{ 
      fontSize: active ? '1.2rem' : '0.58rem', 
      letterSpacing: active ? '0' : '0.25em', 
      textTransform: 'uppercase',
      color: active ? '#080806' : 'var(--cream)',
      fontWeight: active ? 300 : 700,
      lineHeight: 1
    }}>
      {active ? '✕' : `INSPECT ${label}`}
    </div>
  </motion.div>
);

const LegacyPane = ({ title, sub, images, mobileImages, desc, num, label, active, setActive, direction = 'left', stampImg, mobileStampImg }) => {
  return (
    <div className={`legacy-pane ${label.toLowerCase()} legacy-pane-${direction}`} style={{
      flex: 1,
      borderRight: direction === 'left' ? '0.5px solid rgba(122, 58, 16, 0.2)' : 'none',
      padding: '80px 4vw',
      position: 'relative',
      perspective: '1500px',
      zIndex: active ? 100 : 1,
      overflow: 'visible'
    }}>
      <div className="eyebrow" style={{color: '#7A3A10' }}>The Legacy &nbsp;&middot;&nbsp; {label}</div>
      <h2 className="hl" style={{ fontSize: 'clamp(2.1rem, 3vw, 2.5rem)', color: 'var(--cream)', marginBottom: '30px' }}>{title}</h2>
      
      <div className="legacy-pane-stage" style={{
        position: 'relative',
        height: '460px',
        width: '100%',
        transformStyle: 'preserve-3d'
      }}>
        <AnimatePresence>
          {active && (
            <>
            
              {/* Secondary Metadata Card (Back Layer) */}
              <motion.div
                initial={{ opacity: 0, z: -150, x: direction === 'left' ? 20 : -20 }}
                animate={{ 
                  opacity: 0.7, 
                  z: 60, 
                  x: direction === 'left' ? 140 : -140, 
                  rotateY: direction === 'left' ? -25 : 25 
                }}
                exit={{ opacity: 0, z: -150 }}
                transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.1 }}
                style={{
                  position: 'absolute',
                  top: '15%',
                  right: direction === 'left' ? '0' : 'auto',
                  left: direction === 'right' ? '0' : 'auto',
                  width: '180px',
                  height: 'auto',
                  zIndex: 55,
                  background: 'none',
                  backdropFilter: 'none',
                  border: 'none',
                  padding: '0',
                  pointerEvents: 'none'
                }}
              >
                {stampImg && (
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: 'transparent', 
                    overflow: 'hidden'
                  }}>
                    <Picture src={stampImg} mobileSrc={mobileStampImg} alt={`${label === 'ZUARI' ? 'Zuari Infraworld' : 'Gangothri Infraedge'} — Zuari Gangothri Tribhuja legacy mark`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }} />
                  </div>
                )}
              </motion.div>

              {/* Main Data Dossier Card (Foreground) */}
              <motion.div
                initial={{ opacity: 0, z: 40, x: '-50%', y: '-50%', scale: 0.9 }}
                animate={{ opacity: 1, z: 200, x: '-50%', y: '-50%', scale: 1 }}
                exit={{ opacity: 0, z: 40, x: '-50%', y: '-50%', scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: window.innerWidth < 768 ? '90%' : '85%',
                  maxWidth: '400px',
                  zIndex: 70,
                  background: 'rgba(10,10,10,0.95)',
                  backdropFilter: 'blur(25px)',
                  padding: window.innerWidth < 768 ? '30px 25px' : '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderBottom: '0.5px solid rgba(122, 58, 16, 0.2)',
                  boxShadow: '0 60px 100px rgba(0,0,0,0.8)'
                }}
              >
                <p style={{ 
                  color: 'var(--cream)', 
                  fontSize: window.innerWidth < 768 ? '0.82rem' : '0.95rem', 
                  lineHeight: 1.6, 
                  marginBottom: '20px',
                  fontFamily: "'DM Sans', sans-serif", 
                  fontWeight: 300
                }}>
                  {desc}
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ 
            z: active ? -250 : 0,
            rotateY: active ? (direction === 'left' ? -12 : 12) : 0,
            opacity: active ? 0.6 : 1,
            scale: active ? 0.9 : 1
          }}
          transition={{ type: 'spring', stiffness: 70, damping: 25 }}
          style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          <Picture
            src={images[0]}
            mobileSrc={mobileImages && mobileImages[0]}
            className="asset-img-hover"
            alt={`Tribhuja Legacy - ${label} - Premium apartments ORR Hyderabad`}
            width="3200"
            height="3400"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '60px',
              borderRadius: '4px',
              filter: 'grayscale(0.2) contrast(1.1)'
            }}
          />
        </motion.div>

        <ArchiveSeal num={num} label={label} active={active} onClick={setActive} />
      </div>
    </div>
  );
};

const Tatva = () => {
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const toggleProject = (label) => {
    setActiveProject(activeProject === label ? null : label);
  };

  return (
    <section ref={containerRef} id="tatva" style={{ background: '#080806' }}>

      <motion.div 
      
        style={{
          opacity,
          backgroundImage: 'url(/assets/images/copper.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        className="ps"
        id="s1" 
        data-theme="copper"
      >
      
      {/* NEW HEADING INTRODUCING THE LEGACIES */}
      <div style={{ 
        textAlign: 'left', 
        padding: '40px 4vw 20px', 
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative', 
        zIndex: 5
      }}>
        <div className="eyebrow" style={{ justifyContent: 'flex-start', color: '#7A3A10' }}>
          The Architects &nbsp;&middot;&nbsp; Legacy
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="hl"
          style={{ 
            fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', marginBottom: '30px', color: '#120702', lineHeight: 1.1 
          }}
        >
          Two Legacies.<br />
          One Shared Vision.
        </motion.h2>
        <div className="rule" style={{ width: '60px', backgroundColor: '#7A3A10' }}></div>
      </div>


        <div className="ps-inner" style={{ 
          maxWidth: '800px', 
          width: '100%',
          textAlign: 'left', 
          position: 'relative', 
          zIndex: 2,
          padding: '20px 4vw'
        }}>
          
          {/* LOGOS TOP ROW - PERMANENT SIDE-BY-SIDE */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '60px', 
            gap: 'clamp(20px, 4vw, 40px)',
            width: '100%',
            maxWidth: '1000px'
          }}>
            <Picture
              src="/assets/images/zuri1.webp"
              mobileSrc="/assets/images/zuri1-mobile.webp"
              alt="Zuari Infraworld - Zuari Tribhuja Hyderabad"
              width="842"
              height="374"
              style={{ height: 'clamp(32px, 6vw, 68px)', width: 'auto', opacity: 1 }}
            />
            <Picture
              src="/assets/images/gangowhite.webp"
              mobileSrc="/assets/images/gangowhite-mobile.webp"
              alt="Gangothri Infraedge - Premium apartments ORR Hyderabad"
              width="930"
              height="244"
              style={{ height: 'clamp(32px, 6vw, 68px)', width: 'auto', opacity: 1 }}
            />
          </div>

          {/* EDITORIAL TEXT CONTENT */}
          <div style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', 
            color: '#120702', 
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            <p style={{ marginBottom: '25px' }}>
              <span style={{ color: '#B87333' }}>Dr. K.K. Birla</span> signed, and industries followed. Railways crossed provinces.
              Fertiliser reached harvests. Financial systems moved economies. But before any of it —
              there was an instinct for nation-building that did not need permission.
            </p>

            <p style={{ marginBottom: '25px', fontStyle: 'italic', opacity: 0.8 }}>
              The same instinct, on different soil.
            </p>

            <p style={{ marginBottom: '25px' }}>
              <span style={{ color: '#B87333' }}>K. Madhuram Reddy</span> did not wait for Hyderabad to tell him where to build.
              He built, and gave the city addresses before the roads arrived.
              Families thrived in the communities he has created.
            </p>

            <p style={{ marginBottom: '25px', fontWeight: 400, letterSpacing: '0.05em' }}>
              Two legacies. One shared vision.
            </p>

            <p style={{ marginBottom: '40px' }}>
              Tribhuja is what they created.
            </p>

            
          </div>

        </div>
      </motion.div>


      <div className="parallel-legacy" 
      style={{ 
        display: 'flex', 
        position: 'relative', 
        minHeight: '30vh', 
        overflow: 'visible',
        flexDirection: window.innerWidth < 1024 ? 'column' : 'row'
      }}>
        <motion.div style={{ 
          flex: 1, 
          display: 'flex', 
          overflow: 'visible',
          zIndex: activeProject === 'ZUARI' ? 10 : 1
        }}>
          <LegacyPane 
            direction="left"
            num="1"
            label="ZUARI"
            active={activeProject === 'ZUARI'}
            setActive={() => toggleProject('ZUARI')}
            title="Building before the land was chosen." // Slightly tighter title
            images={["/assets/images/KKBIRLA.webp"]}
            mobileImages={["/assets/images/KKBIRLA-mobile.webp"]}
            stampImg="/assets/images/zuri1.webp"
            mobileStampImg="/assets/images/zuri1-mobile.webp"
            desc="Established by Dr. K.K. Birla, Zuari’s legacy is woven into India’s history. For eight decades, the group has shaped the nation’s backbone—from supporting millions of farmers and building railway infrastructure to pioneering green energy. Today, under the leadership of Mr. Saroj Kumar Poddar, Zuari Infraworld carries this heritage of excellence into the residential landscape. Tribhuja stands as our first large-scale vision, anchored in the unshakable pillars of trust, innovation, and integrity."
            // TODO: confirm RERA-filed acreage (9.14 vs 9.16)


          />
        </motion.div>

        <motion.div style={{ 
          flex: 1, 
          display: 'flex', 
          overflow: 'visible',
          zIndex: activeProject === 'GANGOTHRI' ? 10 : 1
        }}>
          <LegacyPane 
            direction="right"
            num="2"
            label="GANGOTHRI"
            active={activeProject === 'GANGOTHRI'}
            setActive={() => toggleProject('GANGOTHRI')}
            title="The same instinct. A different soil."
            images={["/assets/images/MADHURAMREDDY.webp"]}
            mobileImages={["/assets/images/MADHURAMREDDY-mobile.webp"]}
            stampImg="/assets/images/gangowhite.webp"
            mobileStampImg="/assets/images/gangowhite-mobile.webp"
            desc="K. Madhuram Reddy didn't begin with a masterplan; he began with the soil. Gangothri’s legacy is a tapestry of excellence from nurturing aquatic ecosystems and soil health to crafting vibrant, eco-conscious communities. At our core is a commitment to business with purpose, striving for economic growth that safeguards the environment. Guided by innovation and community empowerment, we continue to evolve industries and create spaces where both nature and humanity thrive in harmony."
          />
        </motion.div>
      </div>

      <LocationSection />
    </section>
  );
};

export default Tatva;
