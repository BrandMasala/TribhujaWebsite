import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Picture from './components/Picture';
import Hero from './components/Hero';
import ProjectHighlights from './components/ProjectHighlights';
import Tribhuja from './components/Tribhuja';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useHeroFrames } from './hooks/useHeroFrames';
import Lenis from 'lenis';
import { sysCredit } from './utils/credits';

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


function App() {
  const [loading, setLoading] = useState(true);
  const { loadedCount, total, isDone } = useHeroFrames();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState('general'); // 'general' | 'brochure'

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

  useEffect(() => {
    // Reveal first elements immediately after loading
    if (!loading) {
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
  }, [loading]);

  return (
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
          <Hero startLoad={isDone} />
          <ProjectHighlights />
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
        
        <Footer onDownloadBrochure={() => {
          setEnquiryType('brochure');
          setIsEnquiryOpen(true);
        }} />

        {/* FLOATING CTA TRIGGER */}
        <button 
          className="floating-cta"
          onClick={() => {
            setEnquiryType('general');
            setIsEnquiryOpen(true);
          }}
        >
          Enquire Now
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .floating-cta {
          position: fixed;
          bottom: 40px;
          right: 40px;
          background-color: #B87333;
          color: #080806;
          border: none;
          padding: 16px 32px;
          border-radius: 40px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          z-index: 9000;
          transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .floating-cta:hover {
          transform: translateY(-5px) scale(1.05);
          background-color: #EDE6DA;
          box-shadow: 0 15px 40px rgba(0,0,0,0.6);
        }
        @media (max-width: 768px) {
          .floating-cta {
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            font-size: 0.65rem;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
          }
        }
      `}} />
    </div>
  );
}

export default App;
