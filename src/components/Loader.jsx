import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ isDone, loadedCount, total, onComplete }) => {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const progress = total > 0 ? Math.round((loadedCount / total) * 100) : 0;

  useEffect(() => {
    if (isDone) {
      setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 600);
      }, 200);
    }
  }, [isDone, onComplete]);

  useEffect(() => {
    // Cinematic Canvas Animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    let animationFrameId;
    const startTime = performance.now();

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.1 + 0.15,
      a: Math.random() * 0.35 + 0.04,
      ts: Math.random() * 0.7 + 0.2,
      to: Math.random() * 6.28
    }));

    const ftris = Array.from({ length: 24 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 110,
      sz: Math.random() * 28 + 5,
      vy: -(Math.random() * 0.016 + 0.003),
      vx: (Math.random() - 0.5) * 0.005,
      rot: Math.random() * 6.28,
      rv: (Math.random() - 0.5) * 0.005,
      a: Math.random() * 0.055 + 0.007,
      fill: Math.random() > 0.7
    }));

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.85);

      let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.44);
      g.addColorStop(0, `rgba(200,120,30,${(0.07 + pulse * 0.05).toFixed(3)})`);
      g.addColorStop(0.45, `rgba(100,55,10,${(0.03 + pulse * 0.02).toFixed(3)})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      stars.forEach(s => {
        const tw = 0.5 + 0.5 * Math.sin(t * s.ts + s.to);
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,242,205,${(s.a * tw).toFixed(3)})`;
        ctx.fill();
      });

      ftris.forEach(tr => {
        tr.x += tr.vx;
        tr.y += tr.vy;
        tr.rot += tr.rv;
        if (tr.y < -10) { tr.y = 110; tr.x = Math.random() * 100; }
        const px = W * (tr.x / 100), py = H * (tr.y / 100), s = tr.sz;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(tr.rot);
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(-s * 0.866, s * 0.5);
        ctx.lineTo(s * 0.866, s * 0.5);
        ctx.closePath();
        if (tr.fill) {
          ctx.fillStyle = `rgba(201,153,106,${(tr.a * 0.35).toFixed(3)})`;
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(201,153,106,${tr.a.toFixed(3)})`;
        ctx.lineWidth = 0.45;
        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(() => draw((performance.now() - startTime) / 1000));
    };

    draw(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  if (!visible && progress >= 100) return null;

  return (
    <div id="loader" className={!visible ? 'out' : ''}>
      <canvas ref={canvasRef} id="loader-canvas" />
      <div id="loader-content">
        <div id="loader-ring-outer" />
        <div id="loader-ring-mid" />
        
        <div id="loader-a-svg">
          <svg width="140" height="140" viewBox="0 0 100 100">
            {/* The main triangle/A shape */}
            {/* <motion.path 
              d="M 50,15 L 85,85 L 15,85 Z" 
              fill="none" 
              stroke="#E4A379" 
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            /> */}
            {/* The A crossbar */}
            <motion.path 
              d="M 32,60 L 68,60" 
              fill="none" 
              stroke="#E4A379" 
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
            />
          </svg>
        </div>

        <div id="loader-logo-wrap" style={{ opacity: 1, transform: 'translateY(0)' }}>
          {/*
            LCP-critical image. Responsive variants so the browser never
            ships the 1872×488 / 211 KB full logo to a phone. WebP first,
            PNG fallback. Explicit width/height prevent CLS.
          */}
          <picture>
            <source
              type="image/webp"
              srcSet="/assets/images/logo-320w.webp 320w, /assets/images/logo-640w.webp 640w"
              sizes="(max-width: 768px) 200px, 320px"
            />
            <img
              id="loader-logo-img"
              src="/assets/images/logo-320w.png"
              width="320"
              height="83"
              alt="Tribhuja"
              fetchpriority="high"
              decoding="async"
              style={{ maxWidth: 'clamp(200px, 22vw, 320px)', height: 'auto' }}
            />
          </picture>
          <div id="loader-tagline">TATVA &nbsp;&middot;&nbsp; TANTRA &nbsp;&middot;&nbsp; TRIBHUJA</div>
          <div id="loader-coords">17.4474° N, 78.2324° E</div>
        </div>

        <div id="loader-progress-wrap">
          <div id="loader-progress-track">
            <div id="loader-bar" style={{ width: `${progress}%` }}>
              <div id="loader-orb" />
            </div>
          </div>
          <div id="loader-pct">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
