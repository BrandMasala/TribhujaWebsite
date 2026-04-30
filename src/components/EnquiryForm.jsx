import React, { useEffect } from 'react';

// TODO: replace href with the Zuari CRM endpoint when supplied.
// For now linking to /enquiry as a placeholder route.
const ENQUIRY_HREF = '/enquiry';
const ENQUIRY_PHONE = '+91 00000 00000';

const EnquiryForm = ({ isOpen, onClose, type = 'general' }) => {
  const isBrochure = type === 'brochure';

  // Handle Lenis scroll lock
  useEffect(() => {
    if (isOpen && window.lenis) {
      window.lenis.stop();
    } else if (!isOpen && window.lenis) {
      window.lenis.start();
    }
    return () => {
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="enquiry-modal-overlay"
      style={{ 
        position: 'fixed', 
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        overflowY: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* CLOSE BUTTON */}
      <button 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          background: 'rgba(8, 8, 6, 0.9)',
          border: '1px solid rgba(184,115,51,0.3)',
          color: 'var(--cream)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: '0.3s all',
          zIndex: 10001
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(184,115,51,0.1)';
          e.target.style.borderColor = '#B87333';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = 'rgba(184,115,51,0.3)';
        }}
      >
        ✕
      </button>

      {/* SCOPED STYLES FOR PLACEHOLDERS AND INPUTS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .ef-input::placeholder { color: rgba(237, 230, 218, 0.4); }
        .ef-input:focus { border-color: rgba(184,115,51,0.8) !important; }
        .ef-select option { background: #121212; color: #EDE6DA; }
        
        /* Modal Animation */
        .enquiry-block-anim {
          animation: modalFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />

      <div
        className="ps-inner enquiry-block enquiry-block-anim"
        style={{ 
          maxWidth: '1000px', 
          width: '100%',
          margin: 'auto', 
          background: 'rgba(8, 8, 6, 0.9)',
          textAlign: 'center', 
          padding: '40px',
          border: '1px solid rgba(184,115,51,0.1)',
          borderRadius: '8px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '40px',
            color: 'var(--cream)',
            fontWeight: 300,
            lineHeight: 1.2
          }}
        >
          {isBrochure ? 'Download Brochure' : 'Send Us Your Questions'}
        </h2>

        <form 
          className="form-grid" 
          onSubmit={(e) => {
            e.preventDefault();
            
            if (isBrochure) {
              alert('Thank you. Your download will begin shortly.');
              const link = document.createElement('a');
              link.href = '/brochure.pdf';
              link.download = 'Tribhuja-Brochure.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              alert('Thank you. A relationship manager will contact you shortly.');
            }
            
            onClose();
          }}
          style={{ 
            width: '100%', 
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            textAlign: 'left'
          }}
        >
          {/* ROW 1: NAME & EMAIL */}
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '20px' }}>
            <input 
              type="text" 
              className="ef-input"
              placeholder="Enter Name *" 
              required 
              style={{ 
                border: '1px solid rgba(184,115,51,0.3)', 
                background: 'rgba(255,255,255,0.04)', 
                padding: '18px 24px', 
                fontSize: '0.95rem', 
                color: 'var(--cream)', 
                outline: 'none',
                borderRadius: '4px',
                width: '100%',
                transition: 'border 0.3s'
              }} 
            />
            <input 
              type="email" 
              className="ef-input"
              placeholder="Enter Email *" 
              required 
              style={{ 
                border: '1px solid rgba(184,115,51,0.3)', 
                background: 'rgba(255,255,255,0.04)', 
                padding: '18px 24px', 
                fontSize: '0.95rem', 
                color: 'var(--cream)', 
                outline: 'none',
                borderRadius: '4px',
                width: '100%',
                transition: 'border 0.3s'
              }} 
            />
          </div>

          {/* ROW 2: PHONE - full width */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: '22px', fontSize: '1.1rem', zIndex: 2 }}>🇮🇳</span>
            <input 
              type="tel" 
              className="ef-input"
              placeholder="Enter Phone Number *" 
              required 
              style={{ 
                border: '1px solid rgba(184,115,51,0.3)', 
                background: 'rgba(255,255,255,0.05)', 
                padding: '20px 24px 20px 64px', 
                fontSize: '0.95rem', 
                color: 'var(--cream)', 
                outline: 'none',
                borderRadius: '4px',
                width: '100%',
                transition: 'border 0.3s'
              }} 
            />
          </div>

          <textarea 
            className="ef-input"
            placeholder="Enter Message" 
            rows="4"
            style={{ 
              border: '1px solid rgba(184,115,51,0.3)', 
              background: 'rgba(255,255,255,0.04)', 
              padding: '18px 24px', 
              fontSize: '0.95rem', 
              color: 'var(--cream)', 
              outline: 'none',
              borderRadius: '4px',
              width: '100%',
              resize: 'vertical',
              transition: 'border 0.3s'
            }} 
          />

          {/* CHECKBOX 1: PRIVACY CONSENT */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginTop: '5px' }}>
            <input id="consent_contact" type="checkbox" required style={{ marginTop: '5px', accentColor: '#B87333', width: '18px', height: '18px', cursor: 'pointer' }} />
            <label htmlFor="consent_contact" style={{ fontSize: '0.75rem', color: 'rgba(240,226,200,0.5)', lineHeight: 1.6, textAlign: 'left', cursor: 'pointer' }}>
              I agree to receive communications about Tribhuja and accept the terms and conditions. I understand that by submitting this form, I may be contacted via phone, SMS, email, or WhatsApp for project updates and promotional offers,and other relevant information. Your contact information will be kept confidential.            </label>
          </div>
          

          {/* CHECKBOX 2: COMMUNICATION CONSENT */}
         <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginTop: '10px' }}>
            <input id="consent_privacy" type="checkbox" required style={{ marginTop: '5px', accentColor: '#B87333', width: '18px', height: '18px', cursor: 'pointer' }} />
            <label htmlFor="consent_privacy" style={{ fontSize: '0.75rem', color: 'rgba(240,226,200,0.5)', lineHeight: 1.6, textAlign: 'left', cursor: 'pointer' }}>
              I hereby give my consent to the collection and use of my personal data in accordance with the <a href="https://gangothri.com/privacy-policy/" target="_blank" rel="noopener noreferrer" style={{ color: '#B87333', fontWeight: 600, borderBottom: '1px solid rgba(184,115,51,0.3)', textDecoration: 'none' }}>Privacy Policy</a>.
            </label>
          </div>
          
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button 
              type="submit" 
              style={{ 
                background: '#B87333',
                color: '#080806',
                padding: '18px 60px',
                fontSize: '0.8rem',
                letterSpacing: '0.25em',
                borderRadius: '2px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                textTransform: 'uppercase',
                transition: '0.3s all'
              }}
            >
              {isBrochure ? 'Submit & Download' : 'Submit Form'}
            </button>
          </div>
        </form>

        {/* FLOATING ACTION BAR UI */}
        <div style={{ 
          marginTop: '40px',
          display: 'inline-flex',
          background: 'rgba(184,115,51,0.06)',
          borderRadius: '4px',
          padding: '8px',
          gap: '4px',
          border: '1px solid rgba(184,115,51,0.2)',
          backdropFilter: 'blur(20px)'
        }}>
          <button style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', fontSize: '0.65rem', fontWeight: 600, color: 'var(--cream)', cursor: 'pointer', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span style={{ opacity: 0.8 }}>📞</span> Call
          </button>
          <div style={{ width: '1px', background: 'rgba(184,115,51,0.2)', margin: '10px 0' }} />
          <button style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', fontSize: '0.65rem', fontWeight: 600, color: 'var(--cream)', cursor: 'pointer', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span style={{ opacity: 0.8 }}>💬</span> WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
