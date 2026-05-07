import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LEAD_API_URL = 'https://zuari.my.salesforce-sites.com/services/apexrest/WebsiteLead/';
const PROJECT_NAME = 'Zuari Gangothri Tribhuja';
const LEAD_SOURCE = 'Website';

const EnquiryForm = ({ isOpen, onClose, type = 'general' }) => {
  const isBrochure = type === 'brochure';
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setName(''); setEmail(''); setPhone(''); setMessage('');
    setError(''); setSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const payload = {
      lastName: name.trim().slice(0, 80),
      mobile: phone.trim(),
      project: PROJECT_NAME,
      source: LEAD_SOURCE,
      subSource: isBrochure ? 'Brochure Download' : 'Enquiry Form',
    };
    if (email.trim()) payload.email = email.trim();
    if (message.trim()) payload.description = message.trim().slice(0, 80);

    try {
      const res = await fetch(LEAD_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const raw = await res.text();
      let ok = false;
      try {
        const data = JSON.parse(raw);
        ok = data && data.success === true;
        if (!ok && data && data.message) throw new Error(data.message);
      } catch (parseErr) {
        if (raw.trim().toUpperCase().startsWith('FAIL')) {
          throw new Error(raw.trim());
        }
        ok = res.ok;
      }
      if (!ok) throw new Error('Submission failed. Please try again.');

      if (isBrochure) {
        const link = document.createElement('a');
        link.href = '/brochure.pdf';
        link.download = 'Tribhuja-Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // After starting the download, still redirect to thank you page
        setTimeout(() => {
          navigate('/thank-you');
        }, 500);
      } else {
        navigate('/thank-you');
      }
      // resetForm and onClose are handled implicitly by navigation, but we keep them for cleanup
      resetForm();
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  // Lock background scroll (Lenis + native body) while modal is open
  useEffect(() => {
    if (!isOpen) return;
    if (window.lenis) window.lenis.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="enquiry-modal-overlay"
      data-lenis-prevent
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        padding: '40px 20px',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain'
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
          margin: '0 auto',
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
          onSubmit={handleSubmit}
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
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              pattern="[0-9+\-\s]{7,20}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            maxLength={80}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
            <label htmlFor="consent_contact" style={{ fontSize: '0.60rem', color: 'rgba(240,226,200,0.9)', lineHeight: 1.6, textAlign: 'left', cursor: 'pointer', letterSpacing: '0.05em' }}>
              I agree to receive communications about Tribhuja and accept the terms and conditions. I understand that by submitting this form, I may be contacted via phone, SMS, email, or WhatsApp for project updates and promotional offers,and other relevant information. Your contact information will be kept confidential.            </label>
          </div>
          

          {/* CHECKBOX 2: COMMUNICATION CONSENT */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginTop: '10px' }}>
            <input id="consent_privacy" type="checkbox" required style={{ marginTop: '5px', accentColor: '#B87333', width: '18px', height: '18px', cursor: 'pointer' }} />
            <label htmlFor="consent_privacy" style={{ fontSize: '0.60rem', color: 'rgba(240,226,200,0.9)', lineHeight: 1.6, textAlign: 'left', cursor: 'pointer', letterSpacing: '0.05em' }}>
             I authorise Tribhuja Zuari Gangothri & its representatives to contact me with updates and notifications via Email/SMS/What'sApp/Call. This will override on DND/NDNC (hyperlinked to the policy/terms & condition page)            
            . I hereby give my consent to the collection and use of my personal data in accordance with the <a href="https://gangothri.com/privacy-policy/" target="_blank" rel="noopener noreferrer" style={{ color: '#B87333', fontWeight: 600, borderBottom: '1px solid rgba(184,115,51,0.3)', textDecoration: 'none' }}>Privacy Policy</a>.
            </label>
          </div>
          
          {error && (
            <div role="alert" style={{
              color: '#ff8a8a',
              background: 'rgba(255,80,80,0.08)',
              border: '1px solid rgba(255,80,80,0.3)',
              padding: '12px 16px',
              borderRadius: '4px',
              fontSize: '0.85rem'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: '#B87333',
                color: '#080806',
                padding: '18px 60px',
                fontSize: '0.8rem',
                letterSpacing: '0.25em',
                borderRadius: '2px',
                border: 'none',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.6 : 1,
                fontWeight: 700,
                textTransform: 'uppercase',
                transition: '0.3s all'
              }}
            >
              {submitting ? 'Submitting…' : (isBrochure ? 'Submit & Download' : 'Submit Form')}
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
