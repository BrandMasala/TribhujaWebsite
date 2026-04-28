import React, { useRef, useMemo, useState, useEffect } from 'react';
import SectionGate from './SectionGate';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// --- HELPER COMPONENT: Digital Readout ---
const DataReadout = ({ label, value, unit, progress, range }) => {
  const displayVal = useTransform(progress, range, [0, value]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    return displayVal.on("change", (latest) => setCurrent(Math.round(latest)));
  }, [displayVal]);

  return (
    <div style={{ marginBottom: '25px' }}>
      <div style={{ fontSize: '0.6rem', color: '#B87333', opacity: 0.6, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, color: 'var(--cream)' }}>{current}</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#B87333', opacity: 0.8, textTransform: 'uppercase' }}>{unit}</span>
      </div>
    </div>
  );
};

// --- HELPER COMPONENT: HUD Slider ---
const HudSlider = ({ label, progress, range }) => {
  const fillHeight = useTransform(progress, range, ["0%", "100%"]);
  const opacity = useTransform(progress, [range[0] - 0.05, range[0], range[1], range[1] + 0.05], [0.1, 1, 1, 0.1]);

  return (
    <motion.div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', opacity }}>
      <div style={{ width: '4px', height: '80px', background: 'rgba(184,115,51,0.1)', position: 'relative', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', bottom: 0, width: '100%', background: '#B87333', height: fillHeight }} />
      </div>
      <div style={{ fontSize: '0.7rem', color: '#B87333', letterSpacing: '0.1em', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{label}</div>
    </motion.div>
  );
};

const Tantra = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

  const towers = useMemo(() => [
    { id: 'T1', x: -1, y: -1, rot: 15 }, { id: 'T2', x: 0, y: -1, rot: 15 }, { id: 'T3', x: 1, y: -1, rot: 15 },
    { id: 'T4', x: -1, y: 0, rot: 15 }, { id: 'T5', x: 0, y: 0, rot: 15 }, { id: 'T6', x: 1, y: 0, rot: 15 },
    { id: 'T7', x: -1, y: 1, rot: 15 }, { id: 'T8', x: 0, y: 1, rot: 15 }, { id: 'T9', x: 1, y: 1, rot: 15 },
  ], []);

  // --- RENDERING RANGES (Condensed for immediate visibility) ---
  const phaseIntro = [0, 0.05];
  const phasePrakash = [0.05, 0.35];
  const phaseVayu = [0.35, 0.65];
  const phaseSukoon = [0.65, 0.95];

  // OPACITY MASKS (Faster reveal)
  const introMask = useTransform(smoothProgress, [0, 0.02, 0.05, 0.08], [1, 1, 0, 0]);
  const prakashMask = useTransform(smoothProgress, [0.03, 0.05, 0.35, 0.4], [0, 1, 1, 0]);
  const vayuMask = useTransform(smoothProgress, [0.3, 0.35, 0.65, 0.7], [0, 1, 1, 0]);
  const sukoonMask = useTransform(smoothProgress, [0.6, 0.65, 0.95, 1.0], [0, 1, 1, 0]);

  // ANIMATION VALUES
  const sunInterpolation = useTransform(smoothProgress, phasePrakash, [0, 1]);
  const sunX = useTransform(sunInterpolation, [0, 1], [-500, 500]);
  const sunY = useTransform(sunInterpolation, (t) => 180 - 450 * Math.sin(t * Math.PI));
  
  const explodeInterpolation = useTransform(smoothProgress, phaseVayu, [0, 1]);
  const explodeY = useTransform(explodeInterpolation, [0, 1], [0, -100]); // Subtler lift to stay "at one spot"
  
  const windDash = useTransform(smoothProgress, phaseVayu, [0, -2500]);
  const towerRot = useTransform(smoothProgress, phaseSukoon, [0, 15]);

  return (
    <section ref={containerRef} id="tantra" style={{ height: '600vh', background: '#050505', color: 'var(--cream)' }}>
      

      {/* ALWAYS STICKY CONSOLE (The Building Stays Centered) */}
      <div style={{ position: 'sticky', top: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
        
        {/* HUD OVERLAY: LEFT (Sliders) */}
        <motion.div style={{ position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)', zIndex: 50, opacity: useTransform(smoothProgress, [0, 0.1], [0, 1]) }}>
          <HudSlider label="Solar Radiation" progress={smoothProgress} range={phasePrakash} />
          <HudSlider label="Aero Dynamics" progress={smoothProgress} range={phaseVayu} />
          <HudSlider label="Privacy Index" progress={smoothProgress} range={phaseSukoon} />
        </motion.div>

        {/* HUD OVERLAY: RIGHT (Readouts) */}
        <motion.div style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', zIndex: 50, textAlign: 'right', opacity: useTransform(smoothProgress, [0, 0.1], [0, 1]) }}>
          <DataReadout label="Lux Concentration" value={4200} unit="lum" progress={smoothProgress} range={phasePrakash} />
          <DataReadout label="Wind Velocity" value={14} unit="km/h" progress={smoothProgress} range={phaseVayu} />
          <DataReadout label="Sightline Safety" value={100} unit="%" progress={smoothProgress} range={phaseSukoon} />
          <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(184,115,51,0.2)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 300, color: '#B87333', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.2em' }}>Tribhuja Engineering v3.0</div>
          </div>
        </motion.div>

        {/* MAIN SIMULATION CANVAS (The Core Anchor) */}
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, #B87333 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <motion.svg 
            width="80%" height="80%" viewBox="0 0 800 800" 
            style={{ zIndex: 20, maxWidth: '900px' }}
          >
            <defs>
               <radialGradient id="solarGlow" cx="50%" cy="50%" r="50%">
                 <stop offset="0%" stopColor="#B87333" stopOpacity="0.4" />
                 <stop offset="100%" stopColor="#B87333" stopOpacity="0" />
               </radialGradient>
            </defs>

            <g transform="translate(400, 400)">
                {towers.map((t) => {
                    const bx = t.x * 130;
                    const by = t.y * 130;

                    return (
                        <motion.g key={t.id}>
                            {/* BASE FOOTPRINT (Rock solid anchor) */}
                            <motion.rect 
                                x={bx - 45} y={by - 45} width="90" height="90"
                                fill="rgba(184,115,51,0.02)" stroke="rgba(184,115,51,0.15)" strokeWidth="1"
                                style={{ rotate: towerRot }}
                            />

                            {/* TOWER VOLUME (The part that interacts) */}
                            <motion.rect 
                                x={bx - 45} y={by - 245} width="90" height="90"
                                fill="rgba(5,5,5,0.95)" stroke="rgba(184,115,51,0.5)" strokeWidth="1.5"
                                style={{ 
                                    y: explodeY,
                                    rotate: towerRot
                                }}
                            />
                            
                            {/* CONNECTING VERTS (Stretching lines to emphasize the 'spot') */}
                            {[-45, 45].map(ox => [-45, 45].map(oy => (
                                <motion.line 
                                    key={`${ox}${oy}`}
                                    x1={bx + ox} y1={by + oy}
                                    x2={bx + ox} 
                                    y2={useTransform(smoothProgress, [0.4, 0.65], [by + oy - 200, by + oy - 300])}
                                    stroke="rgba(184,115,51,0.15)" strokeWidth="0.5"
                                />
                            )))}

                            {/* LIGHT MAPPING (Prakash) */}
                            <motion.circle 
                                cx={bx} cy={by - 200} r="60" fill="url(#solarGlow)"
                                style={{ opacity: prakashMask, scale: useTransform(smoothProgress, phasePrakash, [0.5, 1.2]) }}
                            />

                            {/* PRIVACY CONES (Sukoon) */}
                            <motion.path 
                                d={`M ${bx},${by} L ${bx-120},${by-240} A 260,260 0 0 1 ${bx+120},${by-240} Z`}
                                fill="rgba(184,115,51,0.05)" stroke="rgba(184,115,51,0.2)" strokeWidth="0.5"
                                style={{ opacity: sukoonMask, rotate: towerRot, originX: `${bx}px`, originY: `${by}px` }}
                            />
                        </motion.g>
                    );
                })}

                {/* VAYU STREAMLINES */}
                <motion.g style={{ opacity: vayuMask }}>
                    {[-180, -60, 60, 180].map(v => (
                        <motion.path 
                            key={v}
                            d={`M -600,${v} C -200,${v-50} 200,${v+50} 600,${v}`}
                            fill="none" stroke="rgba(184,115,51,0.4)" strokeWidth="1.5" strokeDasharray="30 200"
                            style={{ strokeDashoffset: windDash }}
                        />
                    ))}
                </motion.g>

                {/* PRAKASH SUN ARC */}
                <motion.g style={{ opacity: prakashMask }}>
                    <motion.path d="M -500,180 A 500,450 0 0 1 500,180" fill="none" stroke="rgba(184,115,51,0.1)" strokeWidth="1" strokeDasharray="5 10" />
                    <motion.circle cx={sunX} cy={sunY} r="14" fill="#B87333" />
                    <motion.circle cx={sunX} cy={sunY} r={useTransform(sunInterpolation, [0, 0.5, 1], [40, 60, 40])} fill="url(#solarGlow)" />
                </motion.g>
            </g>
          </motion.svg>

            {/* NARRATIVE OVERLAYS (Integrated into the spot) */}
            <div style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '800px', pointerEvents: 'none' }}>
                {/* Intro Text */}
                <motion.div key="intro" style={{ opacity: introMask, position: 'absolute', width: '100%', textAlign: 'center' }}>
                    <h3 className="hl" style={{ marginBottom: '10px' }}>The Method</h3>
                    <p style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.7, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                        Tatva decided who would build. Tantra decides how. Scroll to initiate simulations.
                    </p>
                </motion.div>

                <motion.div key="prakash" style={{ opacity: prakashMask, position: 'absolute', width: '100%', textAlign: 'center' }}>
                    <h3 className="hl" style={{ marginBottom: '10px' }}>Prakash Simulation</h3>
                    <p style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.7, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                        Solar trajectory mapping for 10'6" ceiling heights and maximum natural illumination.
                    </p>
                </motion.div>

                <motion.div key="vayu" style={{ opacity: vayuMask, position: 'absolute', width: '100%', textAlign: 'center' }}>
                    <h3 className="hl" style={{ marginBottom: '10px' }}>Vayu Aero-Analysis</h3>
                    <p style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.7, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                        Measuring cross-ventilation velocity through 25ft technical corridors.
                    </p>
                </motion.div>

                <motion.div key="sukoon" style={{ opacity: sukoonMask, position: 'absolute', width: '100%', textAlign: 'center' }}>
                    <h3 className="hl" style={{ marginBottom: '10px' }}>Sukoon Privacy Lock</h3>
                    <p style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.7, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                        Applying 15-degree mechanical offsets for zero-conflict privacy.
                    </p>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Tantra;
