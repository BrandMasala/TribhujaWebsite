import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isSolid, setIsSolid] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (currentY < 80) {
        // Always show at the very top
        setIsVisible(true);
        setIsSolid(false);
      } else {
        setIsSolid(true);
        if (diff > 5) {
          // Scrolling down — hide
          setIsVisible(false);
        } else if (diff < -5) {
          // Scrolling up — show
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        background: isSolid ? 'rgba(8, 8, 8, 0.6)' : 'transparent',
        backdropFilter: isSolid ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isSolid ? 'blur(16px)' : 'none',
        borderBottom: isSolid ? '0.5px solid rgba(184, 115, 51, 0.15)' : 'transparent',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="nb nb-left">
        {/*
          Responsive variants so the browser never ships a 1762x265 PNG
          when it's rendering at ~280-560px wide.
        */}
        <picture>
          <source
            type="image/webp"
            srcSet="/assets/images/combinedcop-280w.webp 280w, /assets/images/combinedcop-560w.webp 560w"
            sizes="(max-width: 768px) 120px, 280px"
          />
          <img
            src="/assets/images/combinedcop-280w.png"
            alt="Zuari Tribhuja Hyderabad"
            width="280"
            height="42"
            className="nw-logo"
            loading="eager"
            decoding="async"
            style={{ height: 'clamp(38px, 2.5vw, 84px)', width: 'auto', display: 'block' }}
          />
        </picture>
      </div>

       <div className="nb nb-right">
        <picture>
          <source
            type="image/webp"
            srcSet="/assets/images/logo-320w.webp 320w, /assets/images/logo-640w.webp 640w"
            sizes="(max-width: 768px) 160px, 320px"
          />
          <img
            src="/assets/images/logo-320w.png"
            alt="Tribhuja Luxury Apartments Kollur Hyderabad"
            width="320"
            height="83"
            className="nw-logo"
            loading="eager"
            decoding="async"
            style={{ height: 'clamp(68px, 3.5vw, 144px)', width: 'auto', display: 'block' }}
          />
        </picture>
      </div>
    </nav>
  );
};

export default Navbar;
