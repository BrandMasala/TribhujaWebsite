import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { analytics, trackEvent } from '../utils/analytics';

const LEAD_API_URL = 'https://zuari.my.salesforce-sites.com/services/apexrest/WebsiteLead/';
const PROJECT_NAME = 'Zuari Gangothri Tribhuja';
const LEAD_SOURCE = 'Website';
const LEAD_STORAGE_KEY = 'tribhuja_lead_submitted';
const DOWNLOAD_TYPES = ['brochure', 'price_sheet', 'payment_plan'];

const getDownloadInfo = (type) => {
  if (type === 'price_sheet') return { fileUrl: '/price-public.pdf', fileName: 'Tribhuja-Price-Sheet.pdf' };
  if (type === 'payment_plan') return { fileUrl: '/price-public.pdf', fileName: 'Tribhuja-Payment-Plan.pdf' };
  return { fileUrl: '/brochure.pdf', fileName: 'Tribhuja-Brochure.pdf' };
};

const triggerDownload = async (fileUrl, fileName) => {
  let objectUrl = null;
  try {
    const fileRes = await fetch(fileUrl);
    if (!fileRes.ok) throw new Error('Failed to fetch file');
    const blob = await fileRes.blob();
    objectUrl = URL.createObjectURL(blob);
  } catch (e) {
    console.error('Blob fetch failed, falling back to direct URL:', e);
  }
  const link = document.createElement('a');
  link.href = objectUrl || fileUrl;
  link.download = fileName;
  link.rel = 'noopener';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (objectUrl) setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
};

const getStoredLead = () => {
  try {
    const raw = localStorage.getItem(LEAD_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const EnquiryForm = ({ isOpen, onClose, type = 'general' }) => {
  const isBrochure = type === 'brochure';
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

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
      subSource: type === 'brochure' ? 'Brochure Download' : (type === 'price_sheet' ? 'Price Sheet Download' : (type === 'payment_plan' ? 'Payment Plan Download' : (type === 'site_visit' ? 'Site Visit' : 'Enquiry Form'))),
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

      // Universal Analytics Tracking
      analytics.trackFormSubmit(type);
      setIsSubmitted(true);

      try {
        localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          ts: Date.now(),
        }));
      } catch {}

      if (DOWNLOAD_TYPES.includes(type)) {
        const { fileUrl, fileName } = getDownloadInfo(type);
        await triggerDownload(fileUrl, fileName);
        setDownloadStarted(true);

        setTimeout(() => {
          navigate('/thank-you', { state: { downloadedFile: fileUrl, downloadedName: fileName } });
          onClose();
        }, 3000);
      } else {
        setTimeout(() => {
          navigate('/thank-you');
          onClose();
        }, 1500);
      }
      resetForm();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  // Skip the form for users who have already submitted: just download + go to thank-you.
  useEffect(() => {
    if (!isOpen) return;
    if (!DOWNLOAD_TYPES.includes(type)) return;
    const stored = getStoredLead();
    if (!stored) return;

    const { fileUrl, fileName } = getDownloadInfo(type);
    trackEvent('repeat_download', { form_name: type });
    triggerDownload(fileUrl, fileName).finally(() => {
      navigate('/thank-you', { state: { downloadedFile: fileUrl, downloadedName: fileName } });
      onClose();
    });
  }, [isOpen, type, navigate, onClose]);

  // Lock background scroll (Lenis + native body) while modal is open
  useEffect(() => {
    if (!isOpen) return;
    if (DOWNLOAD_TYPES.includes(type) && getStoredLead()) return;

    // Track Form Open
    analytics.trackFormOpen(type);
    setHasInteracted(false);
    setIsSubmitted(false);

    if (window.lenis) window.lenis.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Track Abandonment if they interacted but didn't submit
      if (hasInteracted && !isSubmitted) {
        let lastField = 'none';
        if (message) lastField = 'message';
        else if (phone) lastField = 'phone';
        else if (email) lastField = 'email';
        else if (name) lastField = 'name';
        analytics.trackFormAbandon(type, lastField);
      }

      if (window.lenis) window.lenis.start();
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, hasInteracted, isSubmitted, type]); // Added deps to capture state on cleanup

  if (!isOpen) return null;
  if (DOWNLOAD_TYPES.includes(type) && getStoredLead()) return null;

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
        {isSubmitted ? (
          <div style={{ padding: '40px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✓</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--cream)', fontWeight: 300 }}>
              {['brochure', 'price_sheet', 'payment_plan'].includes(type) ? 'Download Starting...' : 'Thank You!'}
            </h2>
            <p style={{ color: 'rgba(237, 230, 218, 0.7)', fontSize: '0.9rem', marginTop: '10px' }}>
              {['brochure', 'price_sheet', 'payment_plan'].includes(type) 
                ? 'Your download should begin automatically. If it doesn\'t, please ' 
                : 'We have received your enquiry and will contact you shortly.'}
              {['brochure', 'price_sheet', 'payment_plan'].includes(type) && (
                <a 
                  href={type === 'brochure' ? '/brochure.pdf' : '/price-public.pdf'} 
                  download={type === 'brochure' ? 'Tribhuja-Brochure.pdf' : (type === 'price_sheet' ? 'Tribhuja-Price-Sheet.pdf' : 'Tribhuja-Payment-Plan.pdf')} 
                  style={{ color: '#B87333', fontWeight: 600, textDecoration: 'underline' }}
                >
                  click here
                </a>
              )}
            </p>
          </div>
        ) : (
          <>
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
              {type === 'brochure' ? 'Download Brochure' : (type === 'price_sheet' ? 'Download Price Sheet' : (type === 'payment_plan' ? 'Download Payment Plan' : (type === 'site_visit' ? 'Schedule a Site Visit' : 'Send Us Your Questions')))}
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
              onChange={(e) => {
                setName(e.target.value);
                setHasInteracted(true);
              }}
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
              onChange={(e) => {
                setEmail(e.target.value);
                setHasInteracted(true);
              }}
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
              onChange={phone => {
                setPhone(phone);
                setHasInteracted(true);
              }}
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
            onChange={(e) => {
              setMessage(e.target.value);
              setHasInteracted(true);
            }}
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

          {/* CONSENT */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '2px' }}>
            <input
              id="consent_combined"
              type="checkbox"
              required
              onChange={(e) => {
                setHasInteracted(true);
                if (e.target.checked) {
                  trackEvent('form_checkbox_click', { checkbox_id: 'combined_consent', form_name: type });
                }
              }}
              style={{ marginTop: '3px', accentColor: '#B87333', width: '13px', height: '13px', cursor: 'pointer', flexShrink: 0 }}
            />
            <label htmlFor="consent_combined" style={{ fontSize: '0.6rem', color: 'rgba(240,226,200,0.75)', lineHeight: 1.45, textAlign: 'left', cursor: 'pointer', letterSpacing: '0.01em', textTransform: 'none', opacity: 1, fontWeight: 400 }}>
              I agree to receive updates, offers, and communications from Tribhuja Zuari Gangothri & its representatives via Phone, SMS, Email, or WhatsApp, overriding DND/NDNC. I consent to the collection of my personal data per the <a href="https://gangothri.com/privacy-policy/" target="_blank" rel="noopener noreferrer" style={{ color: '#B87333', fontWeight: 600, borderBottom: '1px solid rgba(184,115,51,0.3)', textDecoration: 'none' }}>Privacy Policy</a> & <a href="https://gangothri.com/terms-conditions/" target="_blank" rel="noopener noreferrer" style={{ color: '#B87333', fontWeight: 600, borderBottom: '1px solid rgba(184,115,51,0.3)', textDecoration: 'none' }}>Terms &amp; Conditions</a>. Your information will be kept confidential.
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
                {submitting ? 'Submitting…' : (type === 'brochure' ? 'Download Brochure' : (type === 'price_sheet' ? 'Download Price Sheet' : (type === 'payment_plan' ? 'Download Payment Plan' : (type === 'site_visit' ? 'Request Site Visit' : 'Submit Form'))))}
              </button>
            </div>
          </form>
        </>
      )}

      </div>
    </div>
  );
};

export default EnquiryForm;
