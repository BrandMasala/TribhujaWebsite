import React from 'react';
import Picture from './Picture';
import { sysCredit } from '../utils/credits';

const Footer = ({ onDownloadBrochure }) => {
  return (
    <footer className="site-footer" style={{ 
      position: 'relative', 
      backgroundColor: '#0A0A0A', 
      padding: '40px 0', 
      overflow: 'hidden',
      borderTop: '1px solid rgba(184,115,51,0.2)'
    }}>
      {/* TEXTURED COPPER BACKGROUND */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'url(/assets/images/copper.webp)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          opacity: 0.25,
          mixBlendMode: 'soft-light',
          pointerEvents: 'none'
        }} 
      />
      
      <div className="site-footer-inner" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 5vw',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px'
      }}>
        <div style={{ textAlign: window.innerWidth < 768 ? 'center' : 'left' }}>
          <Picture
            src="/assets/images/logo.webp"
            mobileSrc="/assets/images/logo-320w.webp"
            alt="Tribhuja"
            width="320"
            height="83"
            style={{ height: 'clamp(40px, 8vw, 50px)', width: 'auto', display: 'block', margin: window.innerWidth < 768 ? '0 auto' : '0' }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <span className="footer-rera" style={{
            color: '#B87333',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 500
          }}>
            TG RERA NO : P01100010650 <br />
            TG RERA NO : P01100010651 <br />
            TG RERA NO : P01100010652
          </span>
        </div>

        <div style={{ textAlign: window.innerWidth < 768 ? 'center' : 'right', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: window.innerWidth < 768 ? 'center' : 'flex-end' }}>
          {/* Download Brochure CTA */}
          <a
            href="#brochure"
            onClick={(e) => {
              if (onDownloadBrochure) {
                e.preventDefault();
                onDownloadBrochure();
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#B87333',
              color: '#080806',
              padding: '12px 28px',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              fontWeight: 700,
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'opacity 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            ↓ Download Brochure
          </a>

        
        </div>
      </div>

      {/* Brand-triad credit — sitewide Zuari + Gangothri signal
          for SEO knowledge graph and for the reader. */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1400px',
        margin: '40px auto 0',
        padding: '24px 5vw 0',
        borderTop: '1px solid rgba(184, 115, 51, 0.1)',
        textAlign: 'center'
      }}>
        <span className="footer-developers" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'min(0.75rem, 3.5vw)',
          color: 'rgba(237, 230, 218, 0.38)',
          letterSpacing: '0.02em'
        }}>
          A residence by Zuari Infraworld and Gangothri Infraedge
        </span>
      </div>

      <div className="footer-copyright-container" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1400px',
        margin: '32px auto 0',
        padding: '0 5vw 24px',
        textAlign: 'center',
        paddingLeft: '17vw',
      }}>
        <div className="footer-copyright" style={{
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}>
          <span className="copyright-text" style={{ color: 'rgba(237, 230, 218, 0.5)' }}>
            &copy; {new Date().getFullYear()} Tribhuja by Zuari Infraworld &amp; Gangothri Infraedge. All rights reserved.
          </span>
          <span style={{ color: 'transparent', userSelect: 'all' }}>
            {sysCredit}
          </span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-copyright-container { padding-left: 16vw; }
        @media (max-width: 768px) {
          .footer-copyright-container { padding-left: 5vw !important; }
          .footer-copyright { letter-spacing: 0.05em !important; }
          .copyright-text { 
            display: inline-block;
            white-space: nowrap; 
            font-size: clamp(6px, 2vw, 9.6px);
          }
        }
      `}} />
    </footer>
  );
};

export default Footer;
