import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
      subSource: type === 'brochure' ? 'Brochure Download' : (type === 'site_visit' ? 'Site Visit' : 'Enquiry Form'),
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

      // Add Meta Pixel Lead Tracking
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: PROJECT_NAME,
          content_category: type === 'brochure' ? 'Brochure' : 'General Enquiry'
        });
      }

      // Add GTM Data Layer Event
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submission',
          form_type: type,
          project: PROJECT_NAME
        });
      }

      if (type === 'brochure') {
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
          maxWidth: '440px',
          width: '100%',
          margin: '0 auto',
          background: 'rgba(8, 8, 6, 0.9)',
          textAlign: 'center',
          padding: '22px',
          border: '1px solid rgba(184,115,51,0.1)',
          borderRadius: '8px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.25rem, 3vw, 1.85rem)',
            marginBottom: '20px',
            color: 'var(--cream)',
            fontWeight: 300,
            lineHeight: 1.2
          }}
        >
          {type === 'brochure' ? 'Download Brochure' : (type === 'site_visit' ? 'Schedule a Site Visit' : 'Send Us Your Questions')}
        </h2>

        <form
          className="form-grid"
          onSubmit={handleSubmit}
          style={{ 
            width: '100%', 
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            textAlign: 'left'
          }}
        >
          {/* ROW 1: NAME & EMAIL */}
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '12px' }}>
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
                padding: '10px 14px',
                fontSize: '14px',
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
                padding: '10px 14px',
                fontSize: '14px',
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
            <PhoneInput
              country={'in'}
              value={phone}
              onChange={phone => setPhone(phone)}
              inputProps={{
                required: true,
                autoFocus: false,
                name: 'phone'
              }}
              placeholder="Enter Phone Number *"
              containerClass="custom-phone-input"
            />
          </div>

          <textarea
            className="ef-input"
            placeholder="Enter Message"
            rows="2"
            maxLength={80}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              border: '1px solid rgba(184,115,51,0.3)',
              background: 'rgba(255,255,255,0.04)',
              padding: '8px 12px',
              fontSize: '13px',
              color: 'var(--cream)',
              outline: 'none',
              borderRadius: '4px',
              width: '100%',
              resize: 'vertical',
              minHeight: '52px',
              transition: 'border 0.3s'
            }}
          />

          {/* CHECKBOX 1: PRIVACY CONSENT */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '2px' }}>
            <input id="consent_contact" type="checkbox" required style={{ marginTop: '3px', accentColor: '#B87333', width: '13px', height: '13px', cursor: 'pointer', flexShrink: 0 }} />
            <label htmlFor="consent_contact" style={{ fontSize: '0.55rem', color: 'rgba(240,226,200,0.75)', lineHeight: 1.45, textAlign: 'left', cursor: 'pointer', letterSpacing: '0.02em' }}>
              I agree to receive communications about Tribhuja and accept the terms and conditions. I understand that by submitting this form, I may be contacted via phone, SMS, email, or WhatsApp for project updates and promotional offers,and other relevant information. Your contact information will be kept confidential.            </label>
          </div>
          

          {/* CHECKBOX 2: COMMUNICATION CONSENT */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '4px' }}>
            <input id="consent_privacy" type="checkbox" required style={{ marginTop: '3px', accentColor: '#B87333', width: '13px', height: '13px', cursor: 'pointer', flexShrink: 0 }} />
            <label htmlFor="consent_privacy" style={{ fontSize: '0.55rem', color: 'rgba(240,226,200,0.75)', lineHeight: 1.45, textAlign: 'left', cursor: 'pointer', letterSpacing: '0.02em' }}>
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

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: '#B87333',
                color: '#080806',
                padding: '14px 40px',
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
              {submitting ? 'Submitting…' : (type === 'brochure' ? 'Download Brochure' : (type === 'site_visit' ? 'Request Site Visit' : 'Submit Form'))}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EnquiryForm;
