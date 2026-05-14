/**
 * Universal Analytics Utility
 * Handles tracking for GA4, Meta Pixel, and GTM dataLayer
 */

export const trackEvent = (eventName, params = {}) => {
  // 1. Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  // 2. Meta Pixel
  // Map GA events to standard Pixel events if applicable
  if (window.fbq) {
    if (eventName === 'generate_lead' || eventName === 'form_submit_success') {
      window.fbq('track', 'Lead', params);
    } else if (eventName === 'view_content' || eventName === 'form_open') {
      window.fbq('track', 'ViewContent', params);
    } else {
      window.fbq('trackCustom', eventName, params);
    }
  }

  // 3. Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params
    });
  }
  
  if (import.meta.env.DEV) {
    console.log(`[Analytics] Event: ${eventName}`, params);
  }
};

export const analytics = {
  // Form Events
  trackFormOpen: (formName) => trackEvent('form_open', { form_name: formName }),
  trackFormSubmit: (formName) => trackEvent('generate_lead', { form_name: formName }),
  trackFormAbandon: (formName, lastField) => trackEvent('form_abandonment', { form_name: formName, last_field: lastField }),
  
  // Interaction Events
  trackButtonClick: (buttonName, location) => trackEvent('button_click', { button_name: buttonName, location: location }),
  
  // Scroll Events
  trackScroll: (percentage) => trackEvent('scroll_milestone', { percentage: percentage })
};
