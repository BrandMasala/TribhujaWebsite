import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ThankYou = () => {
  return (
    <div className="thank-you-page" style={{ background: '#080806', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 20px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--cream)', marginBottom: '24px', fontWeight: 300, lineHeight: 1.1 }}>
            Thank You
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', color: 'rgba(237, 230, 218, 0.8)', marginBottom: '40px', lineHeight: 1.6 }}>
            Your enquiry has been successfully submitted. A relationship manager from Zuari Gangothri Tribhuja will get in touch with you shortly.
          </p>
          <a href="/" style={{ display: 'inline-block', backgroundColor: '#B87333', color: '#080806', padding: '16px 36px', borderRadius: '40px', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.8rem', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
             onMouseEnter={(e) => {
               e.target.style.backgroundColor = '#EDE6DA';
               e.target.style.transform = 'translateY(-3px)';
             }}
             onMouseLeave={(e) => {
               e.target.style.backgroundColor = '#B87333';
               e.target.style.transform = 'none';
             }}
          >
            Return to Home
          </a>
        </div>
      </div>
      <Footer onDownloadBrochure={() => window.location.href = '/'} />
    </div>
  );
};

export default ThankYou;
