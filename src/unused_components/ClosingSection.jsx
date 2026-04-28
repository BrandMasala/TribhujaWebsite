import React from 'react';

const ClosingSection = () => {
  return (
    <section id="sc" className="has-imgbg" data-theme="dark" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
      
      {/* Background with higher fidelity grain and image */}
      <div className="imgbg" style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url("/assets/images/clubhouse-aerial-23.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }}></div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(circle at center, transparent, rgba(0,0,0,0.8))' }}></div>
      <div className="grain-overlay" style={{ position: 'absolute', inset: 0, zIndex: 2, opacity: 0.05, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}></div>

      <div className="ps-inner" style={{ textAlign: 'center', zIndex: 10, padding: '100px 20px', maxWidth: '800px' }}>
        
        {/* Stylized Triangle Logo SVG from original */}
        <svg width="100" height="88" viewBox="0 0 100 88" fill="none" style={{ margin: '0 auto 36px', display: 'block', opacity: 0.7 }}>
          <polygon points="50,2 98,85 2,85" stroke="#C68346" strokeWidth="0.4"/>
          <polygon points="50,14 86,74 14,74" stroke="#C68346" strokeWidth="0.3"/>
          <polygon points="50,26 74,62 26,62" stroke="#C68346" strokeWidth="0.25"/>
          <circle cx="50" cy="44" r="2" fill="rgba(198,131,70,0.5)"/>
        </svg>

        <p className="close-q" style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', 
          color: 'var(--cream)', 
          lineHeight: 1.1,
          marginBottom: '20px'
        }}>
          Tatva built the reputation.<br />
          Tantra confirmed the method.<br />
          Tribhuja is what you live in.
        </p>

        <div style={{ width: '32px', height: '0.5px', background: 'rgba(198,131,70,0.4)', margin: '28px auto' }}></div>

        <p className="close-s" style={{ 
          fontFamily: "'DM Sans', sans-serif", 
          fontSize: '0.95rem', 
          color: 'rgba(240,226,200,0.6)', 
          lineHeight: 1.8,
          maxWidth: '500px',
          margin: '0 auto 48px'
        }}>
          A triangle does not negotiate its geometry.<br />
          Remove one side, the shape ceases to exist.<br />
          This is how permanence begins.
        </p>

        <div className="btn-row" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn-p" href="#enquiry" style={{ 
            padding: '16px 32px', 
            background: '#C68346', 
            color: '#120702', 
            textDecoration: 'none', 
            borderRadius: '2px',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '600',
            fontSize: '0.9rem',
            letterSpacing: '0.05em'
          }}>
            Enquire Now &nbsp;&rarr;
          </a>
          <a className="btn-g" href="#" style={{ 
            padding: '16px 32px', 
            border: '1px solid rgba(198,131,70,0.4)', 
            color: 'var(--cream)', 
            textDecoration: 'none', 
            borderRadius: '2px',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '500',
            fontSize: '0.9rem',
            letterSpacing: '0.05em'
          }}>
            Request Brochure
          </a>
        </div>

        <div className="close-loc" style={{ 
          marginTop: '64px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.8rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(240,226,200,0.4)'
        }}>
          Kollur &nbsp;&middot;&nbsp; ORR Exit 2 &nbsp;&middot;&nbsp; Hyderabad
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
