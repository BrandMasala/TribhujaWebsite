import React, { useState } from 'react';

// Poster is shown at paint and fades out once the Vimeo iframe fires
// onLoad. Using /assets/images/high.webp as a placeholder still — TODO:
// swap for a real hero-poster pulled from the final video cut when Zuari
// supplies it.
const HERO_POSTER_WEBP = '/assets/images/high.webp';
const HERO_POSTER_FALLBACK = '/assets/images/high.jpeg';

const Hero = ({ startLoad }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div id="hero">
      <style dangerouslySetInnerHTML={{ __html: `
        #hero {
          height: auto !important;
          min-height: auto !important;
          position: relative !important;
          width: 100vw !important;
          overflow: hidden !important;
        }
      `}} />
      <div 
        style={{ 
          padding: '56.25% 0 0 0', 
          position: 'relative', 
          width: '100vw',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {startLoad && (
          <iframe
            src="https://player.vimeo.com/video/1189990079?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1&amp;background=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="Tribhuja Hero"
          ></iframe>
        )}
      </div>

      {/* <div className="hero-overlay" aria-hidden="false">
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.78rem',
          letterSpacing: '0.18em',
          color: 'rgba(240,226,200,0.9)',
          marginBottom: '20px',
          textTransform: 'uppercase',
          lineHeight: 1.8
        }}>
          TG RERA No : P01100010650 &nbsp;&middot;&nbsp; P01100010651 &nbsp;&middot;&nbsp; P01100010652
        </p>
        <p className="hero-verse" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
          Where there is light.
          <br />
          Where there is air.
          <br />
          Where there is quiet.
          <br />
          Nine towers,
          <br />
          Where all three meet.
        </p>
        <p className="hero-stamp">Kollur &middot; ORR Exit 2 &middot; Hyderabad </p>
      </div> */}

      <div id="grain"></div>
    </div>
  );
};

export default Hero;
