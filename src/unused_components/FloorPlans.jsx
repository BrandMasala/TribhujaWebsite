import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TechnicalCallout = ({ x, y, label, delay = 0 }) => (
  <motion.g
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
  >
    <circle cx={x} cy={y} r="4" fill="#B87333" />
    <motion.circle 
      cx={x} cy={y} r="10" 
      fill="none" stroke="#B87333" strokeWidth="0.5"
      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <line x1={x} y1={y} x2={x + 15} y2={y - 15} stroke="rgba(184,115,51,0.5)" strokeWidth="0.5" />
    <text x={x + 20} y={y - 20} fill="rgba(240,226,200,0.6)" fontSize="9" fontFamily="'DM Sans', sans-serif" style={{ textTransform: 'uppercase' }}>{label}</text>
  </motion.g>
);

const BlueprintSVG = ({ activeUnit }) => {
  const is3BHK = activeUnit.includes('3BHK');

  return (
    <svg viewBox="0 0 500 400" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(184,115,51,0.1))' }}>
      <defs>
        <pattern id="planGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(184,115,51,0.03)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      
      <rect width="500" height="400" fill="url(#planGrid)" />
      
      {/* Structural Outlines */}
      <motion.path 
        key={activeUnit}
        d={is3BHK ? "M 100,80 L 400,80 L 400,320 L 250,320 L 250,350 L 100,350 Z" : "M 80,60 L 420,60 L 420,340 L 80,340 Z"}
        fill="rgba(184,115,51,0.01)"
        stroke="#B87333" 
        strokeWidth="1.2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <path d="M 100,180 L 250,180 M 250,80 L 250,320 M 330,80 L 330,320" fill="none" stroke="rgba(184,115,51,0.2)" strokeWidth="0.6" />
        <TechnicalCallout x={130} y={120} label="Living Zone" delay={1.2} />
        <TechnicalCallout x={350} y={200} label="Culinary Studio" delay={1.4} />
      </motion.g>
    </svg>
  );
};

const FloorPlans = () => {
  const units = [
    { id: '3BHK-TA', series: 'Trinity', title: 'Type A Premium', area: '1,845 SFT', features: ['East Facing Entry', 'Independent Foyer', 'Dry Kitchen'], status: 'Active' },
    { id: '3BHK-TB', series: 'Trinity', title: 'Type B Grand', area: '1,920 SFT', features: ['Wrap-around deck', 'King Master Suite', 'Vaastu Compliant'], status: 'Active' },
    { id: '4BHK-QG', series: 'Quartet', title: 'Quartet Grande', area: '3,125 SFT', features: ['Sky Bridge Access', 'Private Elevator', 'Grand Vista Balcony'], status: 'Active' },
    { id: '4BHK-QS', series: 'Quartet', title: 'Quartet Sky', area: '2,845 SFT', features: ['Duplex Terrace', 'Luxury Staff Quarter', 'Double Height Living'], status: 'Active' },
    { id: 'MOCK-V1', series: 'Signature', title: 'Experimental Suite', area: 'TBD', features: ['Coming Soon', 'High-Fidelity Interaction'], status: 'Future' },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const activeUnit = units[activeIdx];

  return (
    <div className="floor-plans-section" style={{ padding: '120px 0', background: '#080806', borderTop: '0.5px solid rgba(184,115,51,0.1)' }}>
      <div className="ps-inner">
        
        <div style={{ marginBottom: '60px' }}>
          <div className="eyebrow">Inventory Suite &nbsp;&middot;&nbsp; 04A</div>
          <h2 className="hl" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Architectural<br />Inventory.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 320px', gap: '60px', alignItems: 'start' }}>
          
          {/* COLUMN 1: INVENTORY INDEX (Scalable) */}
          <div style={{ 
            height: '500px', 
            overflowY: 'auto', 
            paddingRight: '20px', 
            borderRight: '1px solid rgba(184,115,51,0.1)',
            scrollbarWidth: 'none' // Firefox
          }}>
            <style>{`.ps-inner::-webkit-scrollbar { display: none; }`}</style>
            <div style={{ fontSize: '0.6rem', color: '#B87333', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '30px', opacity: 0.5 }}>
              Select Unit ID
            </div>
            {units.map((unit, i) => (
              <button
                key={unit.id}
                onClick={() => setActiveIdx(i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '20px 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '0.5px solid rgba(184,115,51,0.05)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  transition: '0.3s'
                }}
              >
                <div style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: '0.9rem', 
                  color: activeIdx === i ? '#B87333' : 'rgba(240,226,200,0.3)',
                  letterSpacing: '0.1em'
                }}>
                  {unit.id}
                </div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: activeIdx === i ? 'var(--cream)' : 'rgba(240,226,200,0.1)',
                  fontFamily: "'Cormorant Garamond', serif"
                }}>
                  {unit.series} Series
                </div>
                {activeIdx === i && (
                  <motion.div layoutId="planSelector" style={{ width: '20px', height: '1px', background: '#B87333', marginTop: '5px' }} />
                )}
              </button>
            ))}
          </div>

          {/* COLUMN 2: THE DRAFTING BOARD (Visualizer) */}
          <div style={{ position: 'relative' }}>
            <div style={{ 
              position: 'absolute', top: -20, left: -20, right: -20, bottom: -20,
              border: '0.5px solid rgba(184,115,51,0.1)',
              background: 'radial-gradient(circle at center, rgba(184,115,51,0.03) 0%, transparent 80%)',
              pointerEvents: 'none'
            }} />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeUnit.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <BlueprintSVG activeUnit={activeUnit.id} />
                
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', opacity: 0.2, fontSize: '0.5rem', letterSpacing: '0.2em' }}>
                  <span>REF: TRB-{activeUnit.id}-V3</span>
                  <span>ORIENTATION: CARDINAL AXIS</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* COLUMN 3: DEEP SPECS */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeUnit.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ fontSize: '0.7rem', color: '#B87333', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '10px' }}>Specification Bundle</div>
                <h3 className="hl" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{activeUnit.title}</h3>
                <div style={{ fontSize: '1.8rem', fontWeight: 300, color: 'rgba(240,226,200,0.4)', marginBottom: '40px', fontFamily: "'Cormorant Garamond', serif" }}>
                  {activeUnit.area}
                </div>

                <div style={{ display: 'grid', gap: '25px' }}>
                  {activeUnit.features.map((f, i) => (
                    <div key={i} style={{ borderLeft: '1px solid rgba(184,115,51,0.2)', paddingLeft: '20px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#B87333', opacity: 0.6, textTransform: 'uppercase', marginBottom: '5px' }}>Feature 0{i+1}</div>
                      <div style={{ fontSize: '0.95rem', color: 'rgba(240,226,200,0.7)' }}>{f}</div>
                    </div>
                  ))}
                </div>
                
                {activeUnit.status === 'Future' && (
                  <div style={{ marginTop: '40px', padding: '15px', border: '1px dashed rgba(184,115,51,0.3)', textAlign: 'center', fontSize: '0.7rem', color: '#B87333', opacity: 0.8 }}>
                    DESIGN UNDER REVIEW
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FloorPlans;
