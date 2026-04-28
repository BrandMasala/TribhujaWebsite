import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HudLayer = ({ title, sub, desc, range, progress }) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const scale = useTransform(progress, range, [0.9, 1, 1, 0.9]);
  const blur = useTransform(progress, range, ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        filter: blur,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '90%',
        maxWidth: '600px',
        zIndex: 50,
        pointerEvents: 'none',
        padding: '20px'
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 'clamp(10px, 3vw, 20px)', justifyContent: 'center' }}>{sub}</div>
      <h3 className="hl" style={{ marginBottom: 'clamp(15px, 4vw, 25px)' }}>{title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)', color: 'rgba(240,226,200,0.6)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>{desc}</p>
      
      <div style={{ marginTop: 'clamp(20px, 5vw, 40px)', display: 'flex', justifyContent: 'center', gap: 'clamp(15px, 4vw, 40px)' }}>
          <div style={{ padding: '8px 16px', border: '1px solid rgba(184,115,51,0.2)', fontSize: '0.55rem', color: '#B87333', whiteSpace: 'nowrap' }}>LOCKING: ACTIVE</div>
          <div style={{ padding: '8px 16px', border: '1px solid rgba(184,115,51,0.2)', fontSize: '0.55rem', color: '#B87333', whiteSpace: 'nowrap' }}>VAASTU: 100%</div>
      </div>
    </motion.div>
  );
};

const VaastuSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const rotation = useTransform(smoothProgress, [0.1, 0.9], [0, 360]);
  const counterRotation = useTransform(smoothProgress, [0.1, 0.9], [0, -720]);
  const coreScale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1.1, 1.1, 0.8]);
  const backgroundOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const introOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  return (
    <section 
      id="vaastu" 
      ref={containerRef} 
      style={{ height: '200vh', background: '#080806', position: 'relative', zIndex: 1 }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100dvh', width: '100%', overflow: 'hidden' }}>
        
        <motion.div style={{ opacity: backgroundOpacity, position: 'absolute', inset: 0, zIndex: 0 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(184,115,51,0.08) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '150px 150px' }} />
        </motion.div>

        <motion.div 
            style={{ 
                position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%',
                scale: coreScale,
                width: 'clamp(300px, 90vmin, 120vh)', height: 'clamp(300px, 90vmin, 120vh)',
                zIndex: 10
            }}
        >
            <svg viewBox="0 0 1000 1000" style={{ width: '100%', height: '100%' }}>
                <defs>
                    <radialGradient id="gVHub" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.2"/>
                        <stop offset="20%" stopColor="#b87333" stopOpacity="0.1"/>
                        <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
                    </radialGradient>
                </defs>

                <motion.g style={{ rotate: counterRotation, transformOrigin: '500px 500px' }}>
                    <circle cx="500" cy="500" r="480" fill="none" stroke="rgba(184,115,51,0.03)" strokeWidth="0.5" strokeDasharray="2 10" />
                    <circle cx="500" cy="500" r="440" fill="none" stroke="rgba(184,115,51,0.05)" strokeWidth="10" strokeDasharray="1 100" />
                </motion.g>

                <motion.g style={{ rotate: rotation, transformOrigin: '500px 500px' }}>
                    <circle cx="500" cy="500" r="400" fill="none" stroke="rgba(184,115,51,0.1)" strokeWidth="1" />
                    <circle cx="500" cy="500" r="390" fill="none" stroke="rgba(184,115,51,0.03)" strokeWidth="20" strokeDasharray="2 20" />
                    <g fill="rgba(184,115,51,0.6)" fontSize="12" fontFamily="'DM Sans', sans-serif" letterSpacing="0.2em">
                        <text x="500" y="80" textAnchor="middle">N-UTTARA</text>
                        <text x="920" y="500" dominantBaseline="middle">E-PURVA</text>
                        <text x="500" y="940" textAnchor="middle">S-DAKSHINA</text>
                        <text x="80" y="500" textAnchor="end" dominantBaseline="middle">W-PASHCHIMA</text>
                    </g>
                    <line x1="500" y1="100" x2="500" y2="900" stroke="rgba(184,115,51,0.1)" strokeWidth="0.5" />
                    <line x1="100" y1="500" x2="900" y2="500" stroke="rgba(184,115,51,0.1)" strokeWidth="0.5" />
                </motion.g>

                <circle cx="500" cy="500" r="300" fill="url(#gVHub)" />
                <circle cx="500" cy="500" r="150" fill="none" stroke="rgba(184,115,51,0.2)" strokeWidth="0.5" />
            </svg>
        </motion.div>

        <motion.div
            style={{ 
                opacity: introOpacity,
                position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%', textAlign: 'center', zIndex: 60,
                width: '90%'
            }}
        >
            <div className="eyebrow" style={{ color: '#B87333', marginBottom: '15px', fontSize: 'clamp(0.6rem, 2.5vw, 0.75rem)', justifyContent: 'center' }}>Technical Standard VA-1.1</div>
            <h2 className="hl" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--cream)', fontWeight: 300, lineHeight: 1.1 }}>Realign<br />Vaastu.</h2>
            <p style={{ color: 'rgba(240,226,200,0.5)', marginTop: '20px', fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)', letterSpacing: '0.2em' }}>SCROLL TO OPERATE ROTARY INTERFACE</p>
        </motion.div>

        <HudLayer 
            progress={smoothProgress}
            range={[0.10, 0.15, 0.35, 0.40]}
            sub="01 - Axial Precision"
            title="Tower Alignment"
            desc="All nine towers are precision-aligned to 0°/180° cardinal axes, ensuring untampered natural resonance across the entire 9.16 acre estate."
        />

        <HudLayer 
            progress={smoothProgress}
            range={[0.42, 0.48, 0.62, 0.68]}
            sub="02 - Thermal Optimization"
            title="Kitchen Placement"
            desc="Strategic deployment of culinary zones in the Agneya (South-East) corner, aligning functional heat sources with ancient energetic prescriptions."
        />

        <HudLayer 
            progress={smoothProgress}
            range={[0.70, 0.75, 0.92, 0.98]}
            sub="03 - Environmental Purity"
            title="Sanitary Planning"
            desc="Vayu (North-West) zone orientation for all utility spaces, guaranteeing uncompromised air-quality hygiene and zero-conflict privacy locks."
        />

      </div>
    </section>
  );
};

export default VaastuSection;
