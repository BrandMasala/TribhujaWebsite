import { useState, useEffect } from 'react';

// Critical assets preloaded on page load so the loader bar accurately
// reflects when the hero-adjacent imagery is ready. Swapped the
// original heavy set (logo.png 211KB, high.jpeg 7.5MB, copper.jpeg
// 169KB) for the compressed WebP variants generated in the Wave 2B
// remediation pass — down from ~8MB combined to ~200KB.
const CRITICAL_ASSETS = [
  '/assets/images/logo-320w.webp',
  '/assets/images/combinedcop-280w.webp',
  '/assets/images/high.webp',      // now 178KB (was high.jpeg at 7.5MB)
  '/assets/images/copper.webp'      // 15KB (was copper.jpeg at 169KB)
];

export const useHeroFrames = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const total = 100;

  useEffect(() => {
    let imagesLoaded = 0;
    const totalAssets = CRITICAL_ASSETS.length;
    let imagesFinished = false;
    let timerFinished = false;
    let currentAssetProgress = 0;

    // 1. Preload real images
    CRITICAL_ASSETS.forEach(src => {
      const img = new Image();
      img.src = src;
      const onAssetLoad = () => {
        imagesLoaded++;
        currentAssetProgress = Math.floor((imagesLoaded / totalAssets) * 100);
        if (imagesLoaded === totalAssets) imagesFinished = true;
      };
      img.onload = onAssetLoad;
      img.onerror = onAssetLoad; // Fallback so we don't get stuck
    });

    // 2. Main Logic Loop (50ms interval)
    const duration = 600; // Min cinematic time (reduced for faster UX)
    const startTime = Date.now();
    const safetyTimeout = 10000; // 10s safety exit
    
    const checkCompletion = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min((elapsed / duration) * 100, 100);
      
      // Combine time progress and asset progress for the UI
      const combinedProgress = Math.floor((timeProgress + currentAssetProgress) / 2);
      setLoadedCount(combinedProgress);

      if (elapsed >= duration) timerFinished = true;

      // Finish conditions:
      // A) All assets finished AND timer finished
      // B) Safety timeout reached
      if ((timerFinished && imagesFinished) || elapsed >= safetyTimeout) {
        setLoadedCount(100);
        setIsDone(true);
        clearInterval(checkCompletion);
      }
    }, 50);

    return () => clearInterval(checkCompletion);
  }, []); // Run once on mount

  return { loadedCount, total, isDone };
};
