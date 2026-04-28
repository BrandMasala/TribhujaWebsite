import React, { useEffect, useRef, useState } from 'react';

const SunDial = () => {
  const canvasRef = useRef(null);
  const [sunT, setSunT] = useState(0.04);
  const [isDragging, setIsDragging] = useState(false);
  const [phase, setPhase] = useState('Pre-dawn');
  const [time, setTime] = useState('06:00');
  const autoAnim = useRef(true);

  const TOWERS = [
    { id: 'E', label: 'East Tower', rx: 0.72, peakT: 0.22, color: [228, 148, 58] },
    { id: 'C', label: 'Centre Tower', rx: 0.50, peakT: 0.50, color: [240, 168, 72] },
    { id: 'W', label: 'West Tower', rx: 0.28, peakT: 0.78, color: [218, 138, 54] },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = Math.round(W * 0.52);
      canvas.style.height = H + 'px';
      draw();
    };

    const arcCentre = () => ({ cx: W * 0.5, cy: H * 0.82, rx: W * 0.44, ry: H * 0.76 });

    const sunXY = (t) => {
      const { cx, cy, rx, ry } = arcCentre();
      const angle = Math.PI * t;
      return { x: cx - Math.cos(angle) * rx, y: cy - Math.sin(angle) * ry };
    };

    const towerLight = (peakT, t) => {
      const elev = Math.sin(Math.PI * t);
      if (elev < 0.015) return 0;
      const diff = (t - peakT) / 0.30;
      const bell = Math.exp(-diff * diff * 2.2);
      return Math.max(0, Math.min(1, bell * Math.min(elev * 4.5, 1)));
    };

    const skyColor = (t) => {
      const stages = [
        { t: 0.00, top: [4, 2, 8], bot: [14, 8, 12] },
        { t: 0.12, top: [8, 4, 18], bot: [80, 28, 14] },
        { t: 0.25, top: [10, 6, 24], bot: [140, 62, 18] },
        { t: 0.50, top: [6, 6, 28], bot: [48, 28, 18] },
        { t: 0.75, top: [8, 4, 18], bot: [160, 68, 20] },
        { t: 0.88, top: [6, 3, 14], bot: [100, 32, 8] },
        { t: 1.00, top: [3, 1, 8], bot: [18, 8, 10] },
      ];
      let i = 0;
      for (let j = 0; j < stages.length - 1; j++) if (t >= stages[j].t) i = j;
      const a = stages[i], b = stages[i + 1];
      const f = (t - a.t) / (b.t - a.t);
      const lerp = (x, y, f) => Math.round(x + (y - x) * f);
      return {
        top: a.top.map((v, k) => lerp(v, b.top[k], f)),
        bot: a.bot.map((v, k) => lerp(v, b.bot[k], f)),
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { cx, cy, rx, ry } = arcCentre();
      const sp = sunXY(sunT);
      const elev = Math.sin(Math.PI * sunT);

      const sky = skyColor(sunT);
      const skyGrad = ctx.createLinearGradient(0, 0, 0, cy);
      skyGrad.addColorStop(0, `rgb(${sky.top.join(',')})`);
      skyGrad.addColorStop(1, `rgb(${sky.bot.join(',')})`);

      // Sky Polygon
      ctx.beginPath();
      ctx.moveTo(cx - rx, cy);
      for (let i = 0; i <= 100; i++) {
        const angle = Math.PI * (1 - i / 100);
        ctx.lineTo(cx - Math.cos(angle) * rx, cy - Math.sin(angle) * ry);
      }
      ctx.closePath();
      ctx.fillStyle = skyGrad;
      ctx.fill();

      // Horizon line
      ctx.beginPath();
      ctx.moveTo(cx - rx - 20, cy);
      ctx.lineTo(cx + rx + 20, cy);
      ctx.strokeStyle = 'rgba(154,117,85,0.2)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Sun Arc
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const angle = Math.PI * (1 - i / 100);
        const x = cx - Math.cos(angle) * rx;
        const y = cy - Math.sin(angle) * ry;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(154,117,85,0.12)';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Progress along arc
      if (sunT > 0.01) {
        ctx.beginPath();
        for (let i = 0; i <= Math.round(sunT * 100); i++) {
          const angle = Math.PI * (1 - i / 100);
          const x = cx - Math.cos(angle) * rx;
          const y = cy - Math.sin(angle) * ry;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(201,153,106,0.45)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Sun Glow
      if (elev > 0.01) {
        const glowSize = W * 0.18 + elev * W * 0.12;
        const bloom = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, glowSize);
        bloom.addColorStop(0, `rgba(201,153,106,${(elev * 0.28).toFixed(3)})`);
        bloom.addColorStop(0.25, `rgba(180,110,30,${(elev * 0.10).toFixed(3)})`);
        bloom.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bloom;
        ctx.fillRect(0, 0, W, H);

        const corona = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, W * 0.055);
        corona.addColorStop(0, `rgba(255,248,218,${Math.min(1, elev * 2).toFixed(3)})`);
        corona.addColorStop(0.4, `rgba(220,160,60,${(elev * 0.85).toFixed(3)})`);
        corona.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, W * 0.055, 0, Math.PI * 2);
        ctx.fillStyle = corona;
        ctx.fill();
      }

      // Draw Towers
      const towerBaseY = cy;
      const maxTowerH = H * 0.42;
      const towerW = Math.max(22, W * 0.052);

      TOWERS.forEach((tw) => {
        const tx = W * tw.rx;
        const lit = towerLight(tw.peakT, sunT);
        const tH = maxTowerH * (tw.id === 'C' ? 1 : tw.id === 'E' ? 0.82 : 0.74);
        const tY = towerBaseY - tH;

        const r = tw.color[0], g = tw.color[1], b = tw.color[2];
        const darkR = Math.round(r * 0.06), darkG = Math.round(g * 0.05), darkB = Math.round(b * 0.04);
        const litR = Math.round(darkR + (r - darkR) * lit);
        const litG = Math.round(darkG + (g - darkG) * lit);
        const litB = Math.round(darkB + (b - darkB) * lit);

        const faceGrad = ctx.createLinearGradient(tx - towerW / 2, 0, tx + towerW / 2, 0);
        faceGrad.addColorStop(0, `rgb(${darkR},${darkG},${darkB})`);
        faceGrad.addColorStop(0.5, `rgb(${litR},${litG},${litB})`);
        faceGrad.addColorStop(1, `rgb(${darkR},${darkG},${darkB})`);
        ctx.fillStyle = faceGrad;
        ctx.fillRect(tx - towerW / 2, tY, towerW, tH);
      });
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [sunT]);

  useEffect(() => {
    const updateDialUI = (t) => {
      const h = 6 + t * 13.5;
      const hr = Math.floor(h);
      const mn = Math.round((h - hr) * 60);
      setTime(String(hr).padStart(2, '0') + ':' + String(mn).padStart(2, '0'));
      
      const phases = [[0, 'Pre-dawn'], [0.08, 'First light'], [0.14, 'Sunrise'], [0.24, 'Golden hour'], [0.36, 'Morning'], [0.48, 'Midday'], [0.60, 'Afternoon'], [0.72, 'Golden hour'], [0.84, 'Sunset'], [0.93, 'Dusk']];
      let p = phases[0][1];
      for (const [th, l] of phases) if (t >= th) p = l;
      setPhase(p);
    };
    updateDialUI(sunT);
  }, [sunT]);

  useEffect(() => {
    let frame;
    const autoPlay = () => {
      if (!autoAnim.current) return;
      setSunT(prev => {
        const next = prev + 0.003;
        if (next >= 1) {
          autoAnim.current = false;
          return 1;
        }
        return next;
      });
      frame = requestAnimationFrame(autoPlay);
    };

    const timer = setTimeout(() => {
      if (autoAnim.current) requestAnimationFrame(autoPlay);
    }, 800);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  const handleInteraction = (e) => {
    autoAnim.current = false;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const W = canvas.width;
    const cx = W * 0.5;
    const rx = W * 0.44;
    const mx = (clientX - rect.left) * (W / rect.width);
    const raw = (cx - mx) / rx;
    const angle = Math.acos(Math.max(-1, Math.min(1, raw)));
    setSunT(Math.max(0.01, Math.min(0.99, angle / Math.PI)));
  };

  return (
    <div className="sun-dial-container" style={{ position: 'relative', background: '#080806', padding: '60px 20px' }}>
      <div id="dial-info" style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10 }}>
        <div id="dial-time" style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.5rem', color: '#B87333', fontWeight: 300 }}>{time}</div>
        <div id="dial-phase" style={{ fontFamily: 'DM Sans', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(154,117,85,0.6)' }}>{phase}</div>
      </div>
      
      <canvas 
        ref={canvasRef} 
        id="sun-dial" 
        style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'block', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={(e) => isDragging && handleInteraction(e)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => { setIsDragging(true); handleInteraction(e); }}
        onTouchMove={(e) => isDragging && handleInteraction(e)}
        onTouchEnd={() => setIsDragging(false)}
      />
    </div>
  );
};

export default SunDial;
