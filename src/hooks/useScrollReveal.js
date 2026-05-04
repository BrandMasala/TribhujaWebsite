import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const revEls = document.querySelectorAll('.reveal, [data-r]');
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.classList.add('on');
        }
      });
    }, { threshold: 0.1 });

    revEls.forEach((el) => revObs.observe(el));

    // Also handle data-theme switching if needed, 
    // but the original code mostly used it for static styling.

    return () => revObs.disconnect();
  }, []);
};
