import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ElevationSegment = ({ floor, index, active, onClick }) => {
  return (
    <motion.div
      onClick={() => onClick(index)}
      onMouseEnter={() => onClick(index)}
      style={{
        height: '80px',
        width: '100%',
        border: '1px solid rgba(184,115,51,0.2)',
        borderBottom: index === 0 ? '1px solid rgba(184,115,51,0.2)' : 'none',
        background: active ? 'linear-gradient(to right, rgba(184,115,51,0.15), transparent)' : 'transparent',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Blueprint Grid Lines */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(to right, #B87333 1px, transparent 1px), linear-gradient(to bottom, #B87333 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
      
      {/* Active Indicator */}
      {active && (
        <motion.div 
          layoutId="activeIndicator"
          style={{ position: 'absolute', left: 0, width: '4px', height: '60%', background: '#B87333' }} 
        />
      )}

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', zIndex: 2 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, color: active ? '#B87333' : 'rgba(184,115,51,0.3)' }}>{floor.level}</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: active ? 'var(--cream)' : 'rgba(240,226,200,0.4)', transition: '0.3s' }}>
          {floor.title}
        </span>
      </div>

      {/* Decorative Blueprint Corner */}
      {active && (
        <div style={{ position: 'absolute', right: '10px', top: '10px', width: '10px', height: '10px', borderTop: '1px solid #B87333', borderRight: '1px solid #B87333' }} />
      )}
    </motion.div>
  );
};

const ClubhouseExplorer = () => {
  const [activeFloor, setActiveFloor] = useState(5);

  const floors = [
    { level: '0', title: 'The Great Lobby', img: '/assets/images/lobby.png', amenities: ['Double Height Grand Entrance', 'Reception & Waiting Lounge', 'Concierge Desk', 'Access to High-Speed Elevators'], specs: '12,400 SFT Volume' },
    { level: '1', title: 'Gym', img: '/assets/images/gym.jpg', amenities: ['Grand Banquet Hall', 'Mini Theatre (Preview Room)', 'Senior Citizen Lounge', 'Coffee Shop & Social Zone'], specs: '400 PAX Capacity' },
    { level: '2', title: 'Yoga', img: '/assets/images/Yoga.jpg', amenities: ['Indoor Badminton Courts', 'Dance & Aerobics Studio', 'Squash Court', 'Table Tennis & Billiards'], specs: 'Pro-Turf Grade' },
    { level: '3', title: 'Badminton', img: '/assets/images/Bad.jpg', amenities: ['Ultra-Modern Gymnasium', 'Cross-Fit & Functional Training', 'Yoga & Meditation Hall', 'Steam & Sauna'], specs: 'Cardio Focus' },
    { level: '4', title: 'Dance Room', img: '/assets/images/Dan.jpg', amenities: ['Kids Creche & Play Zone', 'Co-working Spaces', 'Library & Reading Nook', 'Innovation Hub'], specs: 'Hi-Speed Fiber' },
    { level: '5', title: 'Banquet Hall', img: '/assets/images/Bandq.jpg', amenities: ['Rooftop Swimming Pool', 'Sky Pool Deck', 'Alfresco Dining Area', 'Party Terrace'], specs: 'Horizon Infinity' },
    { level: '6', title: 'Theatre', img: '/assets/images/Thea.jpg', amenities: ['Rooftop Swimming Pool', 'Sky Pool Deck', 'Alfresco Dining Area', 'Party Terrace'], specs: 'Horizon Infinity' },
    { level: '7', title: 'Short Party Lounge', img: '/assets/images/Short.jpg', amenities: ['Rooftop Swimming Pool', 'Sky Pool Deck', 'Alfresco Dining Area', 'Party Terrace'], specs: 'Horizon Infinity' },
    { level: '8', title: 'Play Room', img: '/assets/images/PlayR.jpg', amenities: ['Rooftop Swimming Pool', 'Sky Pool Deck', 'Alfresco Dining Area', 'Party Terrace'], specs: 'Horizon Infinity' },
    { level: '9', title: 'Multiuse Room', img: '/assets/images/Multiuse.jpeg', amenities: ['Rooftop Swimming Pool', 'Sky Pool Deck', 'Alfresco Dining Area', 'Party Terrace'], specs: 'Horizon Infinity' },
    { level: '10', title: 'Saloon', img: '/assets/images/Saloon.jpg', amenities: ['Rooftop Swimming Pool', 'Sky Pool Deck', 'Alfresco Dining Area', 'Party Terrace'], specs: 'Horizon Infinity' },
    { level: '11', title: 'Creche Area', img: '/assets/images/crech.jpeg', amenities: ['Rooftop Swimming Pool', 'Sky Pool Deck', 'Alfresco Dining Area', 'Party Terrace'], specs: 'Horizon Infinity' },
    { level: '12', title: 'Common Lounge', img: '/assets/images/common.jpg', amenities: ['Rooftop Swimming Pool', 'Sky Pool Deck', 'Alfresco Dining Area', 'Party Terrace'], specs: 'Horizon Infinity' }


  ];

  const sortedFloors = [...floors].reverse(); // Show Level 5 at top

  return (
    <div className="clubhouse-explorer" style={{ padding: '80px 0', background: '#050505', borderTop: '0.5px solid rgba(184,115,51,0.1)' }}>
      <div className="ps-inner" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5vw' }}>
        <div style={{ marginBottom: '60px' }}>
          <div className="eyebrow" style={{ border: 'none', padding: 0 }}>The Structural Blueprint</div>
          <h2 className="hl" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', marginTop: '20px' }}>Vertical Life.<br />Sectional Review.</h2>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', 
          gap: '60px', 
          alignItems: 'start' 
        }}>
          
          {/* SECTIONAL ELEVATION VIEW */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '10px 30px', background: 'rgba(184,115,51,0.05)', border: '1px solid rgba(184,115,51,0.2)', borderBottom: 'none', borderTop: 'none', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B87333' }}>
              Structural Elevation A-1
            </div>
            <div style={{ borderBottom: '1px solid rgba(184,115,51,0.2)' }}>
              {sortedFloors.map((f, i) => {
                const actualIndex = floors.findIndex(found => found.level === f.level);
                return (
                  <ElevationSegment 
                    key={f.level} 
                    floor={f} 
                    index={actualIndex} 
                    active={activeFloor === actualIndex} 
                    onClick={setActiveFloor} 
                  />
                );
              })}
            </div>
            {/* Ground line */}
            <div style={{ height: '4px', background: 'rgba(184,115,51,0.4)', marginTop: '2px', width: '100%' }} />
          </div>

          {/* DYNAMIC CONTENT */}
          <div className="floor-display" style={{ position: 'sticky', top: '100px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFloor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '3.5rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(184,115,51,0.1)' }}>0{activeFloor + 1}</span>
                  <div>
                    <h3 className="hl" style={{ fontSize: 'clamp(2.2rem, 3vw, 2.8rem)', margin: 0, color: 'var(--cream)' }}>{floors[activeFloor].title}</h3>
                  </div>
                </div>

                <div className="rule" style={{ width: '40px', marginBottom: '40px' }}></div>

                <div style={{ marginBottom: '50px' }}>
                   <div style={{ borderRadius: '4px', overflow: 'hidden', border: '0.5px solid rgba(184,115,51,0.2)' }}>
                      <img
                        src={floors[activeFloor].img}
                        alt={floors[activeFloor].title}
                        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                      />
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubhouseExplorer;
