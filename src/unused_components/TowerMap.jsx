import React, { useEffect, useRef, useState } from 'react';

const TowerMap = () => {
  const canvasRef = useRef(null);
  const [hoveredTower, setHoveredTower] = useState(null);

  const TOWERS = [
    { id: 'A', x: 0.30, y: 0.25, w: 0.06, h: 0.55, floors: 40, desc: 'Sky bridge level' },
    { id: 'B', x: 0.38, y: 0.28, w: 0.06, h: 0.50, floors: 38, desc: 'Sky bridge level' },
    { id: 'C', x: 0.46, y: 0.20, w: 0.07, h: 0.60, floors: 42, desc: 'Tallest tower' },
    { id: 'D', x: 0.54, y: 0.22, w: 0.065, h: 0.58, floors: 40, desc: 'Centre cluster' },
    { id: 'E', x: 0.62, y: 0.26, w: 0.06, h: 0.52, floors: 38, desc: 'East facing' },
    { id: 'F', x: 0.35, y: 0.55, w: 0.055, h: 0.38, floors: 30, desc: 'South cluster' },
    { id: 'G', x: 0.44, y: 0.52, w: 0.06, h: 0.42, floors: 32, desc: 'South centre' },
    { id: 'H', x: 0.53, y: 0.50, w: 0.06, h: 0.44, floors: 32, desc: 'South cluster' },
    { id: 'I', x: 0.62, y: 0.54, w: 0.055, h: 0.38, floors: 28, desc: 'South east' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = Math.round(W * 0.6);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      // Draw grid/background lines
      ctx.strokeStyle = 'rgba(154,117,85,0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath(); ctx.moveTo(W * (i/10), 0); ctx.lineTo(W * (i/10), H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, H * (i/10)); ctx.lineTo(W, H * (i/10)); ctx.stroke();
      }

      // Draw Towers
      TOWERS.forEach(t => {
        const tx = t.x * W;
        const ty = t.y * H;
        const tw = t.w * W;
        const th = t.h * H;
        const isHovered = hoveredTower === t.id;

        ctx.fillStyle = isHovered ? 'rgba(184,115,51,0.4)' : 'rgba(154,117,85,0.15)';
        ctx.fillRect(tx - tw/2, ty, tw, th);
        
        ctx.strokeStyle = isHovered ? '#B87333' : 'rgba(184,115,51,0.3)';
        ctx.lineWidth = isHovered ? 1.5 : 0.8;
        ctx.strokeRect(tx - tw/2, ty, tw, th);

        // Label
        ctx.font = `500 ${Math.round(W * 0.02)}px Cormorant Garamond`;
        ctx.fillStyle = isHovered ? '#F0E2C8' : 'rgba(154,117,85,0.6)';
        ctx.textAlign = 'center';
        ctx.fillText(t.id, tx, ty - 10);
      });
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [hoveredTower]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    let found = null;
    TOWERS.forEach(t => {
      const tx = t.x * canvas.width;
      const ty = t.y * canvas.height;
      const tw = t.w * canvas.width;
      const th = t.h * canvas.height;
      if (mx >= tx - tw/2 && mx <= tx + tw/2 && my >= ty && my <= ty + th) {
        found = t.id;
      }
    });
    setHoveredTower(found);
  };

  return (
    <div className="tower-map-section" style={{ position: 'relative', background: '#080806', padding: '80px 20px' }}>
      <div className="ps-inner" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 className="hl reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>The Site Plan</h2>
        <canvas 
          ref={canvasRef} 
          id="tower-map" 
          style={{ width: '100%', cursor: 'pointer' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredTower(null)}
        />
        
        {hoveredTower && (
          <div id="tower-tooltip" style={{ textAlign: 'center', marginTop: '24px', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ color: '#B87333', fontSize: '1.5rem', fontFamily: 'Cormorant Garamond' }}>Tower {hoveredTower}</div>
            <div style={{ color: 'rgba(240,226,200,0.6)', fontSize: '0.9rem', fontFamily: 'DM Sans' }}>
              {TOWERS.find(t => t.id === hoveredTower).floors} Floors · {TOWERS.find(t => t.id === hoveredTower).desc}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TowerMap;
