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
      <div className="hero-video-wrap">
        {/* Poster — visible at first paint, fades out once the iframe loads */}
        <picture className="hero-poster" aria-hidden="true" data-loaded={iframeLoaded}>
          <source srcSet={HERO_POSTER_WEBP} type="image/webp" />
          <img
            src={HERO_POSTER_FALLBACK}
            alt="Luxury 3 & 4 BHK apartments in Kollur Hyderabad by Zuari Gangothri Tribhuja"
            decoding="async"
            fetchpriority="high"
          />
        </picture>

        {startLoad && (
          <iframe
            className="hero-iframe"
            src="https://player.vimeo.com/video/1184819034?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1&playsinline=1&controls=0&dnt=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Tribhuja Hero"
            loading="eager"
            onLoad={() => setIframeLoaded(true)}
          ></iframe>
        )}
      </div>

      <div className="hero-overlay" aria-hidden="false">
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
      </div>

      <div id="grain"></div>
    </div>
  );
};

export default Hero;
