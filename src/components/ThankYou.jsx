import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { downloadedFile, downloadedName } = location.state || {};
  
  return (
    <div className="thank-you-page" style={{ background: '#080806', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 20px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--cream)', marginBottom: '24px', fontWeight: 300, lineHeight: 1.1 }}>
            Thank You
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', color: 'rgba(237, 230, 218, 0.8)', marginBottom: downloadedFile ? '20px' : '40px', lineHeight: 1.6 }}>
            Your enquiry has been successfully submitted. A relationship manager from Zuari Gangothri Tribhuja will get in touch with you shortly.
          </p>
          
          {downloadedFile && (
            <div style={{ margin: '0 auto 40px', maxWidth: '400px', padding: '20px', background: 'rgba(184,115,51,0.05)', border: '1px solid rgba(184,115,51,0.2)', borderRadius: '4px' }}>
              <p style={{ color: 'rgba(237, 230, 218, 0.7)', fontSize: '0.85rem', marginBottom: '12px', fontFamily: "'DM Sans', sans-serif" }}>
                Your download should have started. If it didn't start automatically:
              </p>
              <a 
                href={downloadedFile} 
                download={downloadedName || 'Tribhuja-Document.pdf'} 
                style={{ 
                  display: 'inline-block', 
                  background: '#B87333', 
                  color: '#080806', 
                  padding: '10px 24px', 
                  borderRadius: '20px', 
                  textDecoration: 'none', 
                  fontWeight: 700, 
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#EDE6DA';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#B87333';
                }}
              >
                Download File
              </a>
            </div>
          )}
          
          <Link to="/" style={{ display: 'inline-block', backgroundColor: '#B87333', color: '#080806', padding: '16px 36px', borderRadius: '40px', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.8rem', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
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
          </Link>
        </div>
      </div>
      <Footer onDownloadBrochure={() => navigate('/')} />
    </div>
  );
};

export default ThankYou;
