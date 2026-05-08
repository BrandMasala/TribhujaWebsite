# Integration Verification Guide

This document outlines how to verify that the tracking and lead management systems are correctly integrated into the Tribhuja Life website.

## 1. Tracking Integrations (GTM & Meta Pixel)

### Google Tag Manager (GTM)
*   **GTM ID:** `GTM-M55XTQQD`
*   **How to Verify:**
    1.  Install the **Google Tag Assistant** Chrome extension.
    2.  Visit the website and click the extension icon.
    3.  It should show the GTM ID with a green or blue indicator.
    4.  Alternatively, use **GTM Preview Mode** from the GTM dashboard to see tags firing in real-time.

### Meta Pixel
*   **Pixel ID:** `2874462452933457`
*   **How to Verify:**
    1.  Install the **Meta Pixel Helper** Chrome extension.
    2.  On page load, it should show a `PageView` event.
    3.  Upon successful form submission, it should show a `Lead` event with parameters:
        *   `content_name`: Zuari Gangothri Tribhuja
        *   `content_category`: Brochure / General Enquiry / Site Visit

---

## 2. Lead Management & API Integration

### Salesforce Integration
*   **Endpoint:** `https://zuari.my.salesforce-sites.com/services/apexrest/WebsiteLead/`
*   **How to Verify:**
    1.  Open Browser DevTools (**F12** or **Inspect**).
    2.  Go to the **Network** tab.
    3.  Submit a test entry in the Enquiry Form.
    4.  Look for a `POST` request to the Salesforce URL.
    5.  Check for a **200 OK** status code.

### Data Layer Events
*   **Event Name:** `form_submission`
*   **How to Verify:**
    1.  Open the browser console.
    2.  Type `dataLayer` and press Enter.
    3.  Expand the array to find an object with `event: "form_submission"`.
    4.  It should contain `form_type` (e.g., `brochure`, `site_visit`, `general`).

---

## 3. Component Verification

### Phone Input
*   **Library:** `react-phone-input-2`
*   **Location:** `EnquiryForm.jsx`
*   **Check:** Ensure the country dropdown defaults to India (`+91`) and follows the custom dark-themed styling defined in `index.css`.

### Navigation & CTAs
*   **Floating CTAs:** Verify the "Book Site Visit" button on the right edge triggers the form with the correct type.
*   **WhatsApp Integration:** Check the floating WhatsApp button (bottom right) and footer links point to `+91 90003 58004`.
*   **Call CTAs:** Verify phone links are clickable and direct to `tel:+919000358004`.

---

## 4. SEO & Metadata
*   **URL:** `https://www.tribhujalife.com/`
*   **Social Tags:** Verify Open Graph (`og:`) and Twitter Card tags in `index.html` are correctly pointing to the new domain and images.
