import { React, useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './components/Hero';
import ProjectHighlights from './components/ProjectHighlights';
import Tribhuja from './components/Tribhuja';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useHeroFrames } from './hooks/useHeroFrames';
import Lenis from 'lenis';
import { analytics } from './utils/analytics';

import ThankYou from './components/ThankYou';

// Below-the-fold sections — split into their own chunks so the initial
// JS payload is smaller. Framer Motion is heavy and both of these pull
// it in; code-splitting saves roughly 40-60 kB off the first paint.
const LifestyleExplorer = lazy(() => import('./components/LifestyleExplorer'));
const Landscape = lazy(() => import('./components/Landscape'));
const Tatva = lazy(() => import('./components/Tatva'));

// Minimal placeholder while the chunk streams in. Matches section dark
// palette so nothing flashes.
const SectionFallback = () => (
  <div
    aria-hidden="true"
    style={{ minHeight: '60vh', background: '#080806' }}
  />
);


import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const { loadedCount, total, isDone } = useHeroFrames();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState('general'); // 'general' | 'brochure'
  const location = useLocation();

  // Initialize scroll reveal animations
  useScrollReveal();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose lenis globally so modals can pause/resume it
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // SCROLL MILESTONE TRACKING
  useEffect(() => {
    const milestones = new Set([25, 50, 75, 90]);
    const tracked = new Set();

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = Math.round((scrollPos / totalHeight) * 100);

      milestones.forEach(m => {
        if (percentage >= m && !tracked.has(m)) {
          analytics.trackScroll(m);
          tracked.add(m);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Reveal first elements immediately after loading
    if (!loading && location.pathname === '/') {
      setTimeout(() => {
        const firstElements = document.querySelectorAll('.reveal');
        firstElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            el.classList.add('on');
          }
        });
      }, 100);

      // AUTO-POPUP ENQUIRY FORM AFTER 7 SECONDS
      const popupTimer = setTimeout(() => {
        setEnquiryType('general');
        setIsEnquiryOpen(true);
      }, 7000);

      return () => clearTimeout(popupTimer);
    }
  }, [loading, location.pathname]);

  return (
    <Routes>
      <Route path="/thank-you" element={
        <div className="app-container">
          <ThankYou />
        </div>
      } />
      <Route path="/*" element={
    <div className="app-container">
      {loading && (
        <Loader
          isDone={isDone}
          loadedCount={loadedCount}
          total={total}
          onComplete={() => setLoading(false)}
        />
      )}

      <div style={{
        opacity: loading ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
        visibility: loading && !isDone ? 'hidden' : 'visible'
      }}>
        <Navbar />
        <>
          <Hero startLoad={!loading} />
          <ProjectHighlights 
            onSiteVisit={() => { 
              analytics.trackButtonClick('Site Visit', 'Project Highlights');
              setEnquiryType('site_visit'); 
              setIsEnquiryOpen(true); 
            }}
            onBrochure={() => { 
              analytics.trackButtonClick('Download Brochure', 'Project Highlights');
              setEnquiryType('brochure'); 
              setIsEnquiryOpen(true); 
            }}
          />
          <Tribhuja />
          <Suspense fallback={<SectionFallback />}>
            <LifestyleExplorer />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Landscape />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Tatva />
          </Suspense>
          <EnquiryForm 
            isOpen={isEnquiryOpen} 
            type={enquiryType}
            onClose={() => setIsEnquiryOpen(false)} 
          />
        </>
        
        <Footer 
          onDownloadBrochure={() => {
            setEnquiryType('brochure');
            setIsEnquiryOpen(true);
          }} 
          onSiteVisit={() => {
            setEnquiryType('site_visit');
            setIsEnquiryOpen(true);
          }}
        />

        {/* FLOATING CTA TRIGGERS */}
        <div className="floating-cta-container">
          <button 
            className="floating-cta"
            onClick={() => {
              analytics.trackButtonClick('Book Site Visit', 'Floating Sidebar');
              setEnquiryType('general');
              setIsEnquiryOpen(true);
            }}
          >
            Book Site Visit
          </button>
        </div>

        {/* WHATSAPP + PHONE CTA */}
        <div className="floating-contact-stack">
          <a
            href="tel:+919000358004"
            className="phone-btn"
            aria-label="Call us"
            onClick={() => analytics.trackButtonClick('Phone Call', 'Floating Contact')}
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.05l-2.2 2.18z"/>
            </svg>
          </a>
          <a
            href="https://wa.link/kjfrpd"
            className="whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            onClick={() => analytics.trackButtonClick('WhatsApp Chat', 'Floating Contact')}
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .floating-cta-container {
          position: fixed;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 9000;
        }
        .floating-cta {
          transform: rotate(180deg);
          writing-mode: vertical-rl;
          background-color: #B87333;
          color: #080806;
          border: none;
          padding: 18px 12px;
          border-radius: 0 8px 8px 0;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 5px 0 20px rgba(0,0,0,0.3);
          transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .floating-cta:hover {
          background-color: #EDE6DA;
          transform: rotate(180deg) translateX(8px);
          box-shadow: 10px 0 25px rgba(0,0,0,0.4);
        }

        .floating-contact-stack {
          position: fixed;
          bottom: 60px;
          right: 30px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 9000;
        }
        .whatsapp-btn,
        .phone-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
          text-decoration: none;
          color: white;
        }
        .whatsapp-btn {
          background-color: #25D366;
        }
        .phone-btn {
          background-color: #B87333;
        }
        .whatsapp-btn:hover {
          transform: scale(1.1);
          background-color: #1EBE55;
        }
        .phone-btn:hover {
          transform: scale(1.1);
          background-color: #d1864a;
        }
        .whatsapp-btn svg,
        .phone-btn svg {
          width: 32px;
          height: 32px;
          fill: currentColor;
        }

        @media (max-width: 768px) {
          .floating-cta {
            padding: 14px 8px;
            font-size: 0.55rem;
            border-radius: 0 6px 6px 0;
          }
          .floating-contact-stack {
            bottom: 80px;
            right: 20px;
            gap: 10px;
          }
          .whatsapp-btn,
          .phone-btn {
            width: 50px;
            height: 50px;
          }
          .whatsapp-btn svg,
          .phone-btn svg {
            width: 26px;
            height: 26px;
          }
        }
      `}} />
    </div>
    } />
    </Routes>
  );
}

export default App;
