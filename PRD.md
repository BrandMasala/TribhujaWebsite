# Product Requirements Document — Tribhuja Life Website

> **Product**: [tribhujalife.com](https://www.tribhujalife.com/)
> **Type**: Marketing & Lead-Generation Website (Single-Page Application)
> **Developers**: Zuari Infraworld × Gangothri Infraedge
> **Last Updated**: 25 May 2026

---

## 1. Product Overview

### 1.1 What Is Tribhuja Life?

Tribhuja Life is a luxury residential project in **Kollur, Hyderabad** (ORR Exit 2), developed jointly by **Zuari Infraworld** (Adventz / Birla Group) and **Gangothri Infraedge**. The project comprises:

| Metric               | Value                       |
|-----------------------|-----------------------------|
| Towers                | 9 high-rise (G+37 floors)   |
| Total height          | ~120 metres                 |
| Site area             | 9.16 acres                  |
| Total homes           | 1,730 units                 |
| Unit types            | 3 BHK & 4 BHK               |
| Area range            | 1,679 – 3,126 sq ft         |
| Corner flats          | 78%                         |
| Open space            | 72%                         |
| Clubhouse             | 1,00,000 sq ft              |
| RERA Numbers          | P01100010650 / 10651 / 10652 |

### 1.2 Purpose of the Website

The website serves as the **primary digital front door** for the Tribhuja Life project. Its goals are:

1. **Brand storytelling** — Communicate the premium positioning, architectural philosophy (Prakash, Vayu, Sukoon), and the legacy of both developer groups.
2. **Lead generation** — Capture prospect details via enquiry forms and route them to Salesforce CRM.
3. **Collateral distribution** — Gate and deliver the Brochure, Price Sheet, and Payment Plan PDFs behind lead-capture forms.
4. **Site visit scheduling** — Enable prospective buyers to request in-person visits.
5. **SEO acquisition** — Rank for high-intent keywords like "luxury apartments Kollur", "3 BHK Hyderabad", "apartments near ORR".

---

## 2. Target Audience

| Segment                      | Description                                                                                          |
|------------------------------|------------------------------------------------------------------------------------------------------|
| **Primary Buyers**           | IT professionals (25–45) working in Financial District / Gachibowli / HITEC City seeking premium 3-4 BHK homes near work. |
| **NRI Investors**            | Non-resident Indians looking for luxury investment properties in Hyderabad with strong brand backing. |
| **Upgrade Buyers**           | Families upgrading from 2 BHK apartments who want gated community amenities and Vastu compliance.     |
| **Channel Partners / Brokers** | Real estate agents looking for project details, pricing, and brochure downloads.                    |

---

## 3. Site Architecture

The website is a **single-page application (SPA)** with one additional route. All content loads on a single scroll with smooth Lenis-based scrolling.

```
/                     → Main marketing page (all sections)
/thank-you            → Post-submission confirmation page
/?download=brochure   → Auto-opens brochure download form
/?download=price_sheet→ Auto-opens price sheet download form
/?download=payment_plan→ Auto-opens payment plan download form
/?form=site_visit     → Auto-opens site visit form
```

### 3.1 Section Flow (Top → Bottom)

```
┌─────────────────────────────────┐
│  Loader (frame-sequence)        │  ← Preloads hero assets
├─────────────────────────────────┤
│  Navbar                         │  ← Fixed navigation bar
├─────────────────────────────────┤
│  Hero                           │  ← Full-bleed hero image
├─────────────────────────────────┤
│  ProjectHighlights              │  ← Stats grid, CTAs, editorial
├─────────────────────────────────┤
│  Tribhuja (Amenity Mosaic)      │  ← Parallax image grid
├─────────────────────────────────┤
│  LifestyleExplorer              │  ← Tabbed amenity carousel
├─────────────────────────────────┤
│  Landscape (lazy)               │  ← Vimeo video or visual
├─────────────────────────────────┤
│  Tatva (Legacy + Location)      │  ← Developer stories + map
├─────────────────────────────────┤
│  Footer                         │  ← RERA, logos, CTA buttons
└─────────────────────────────────┘

Overlays:
  • EnquiryForm modal (triggered from multiple CTAs)
  • Floating sidebar "Book Site Visit" CTA
  • Floating WhatsApp + Phone buttons
  • LivHousing chat bot (third-party embed)
```

---

## 4. Component Breakdown

### 4.1 Loader

- Preloads hero frame sequence using `useHeroFrames` hook.
- Displays a loading progress indicator (frame count / total).
- Fades out once all frames are loaded → reveals main content.

### 4.2 Navbar

- Fixed top navigation bar.
- Contains the Tribhuja logo and navigation links.
- Minimal and unobtrusive to match the luxury aesthetic.

### 4.3 Hero

- Full-viewport hero section with a high-resolution background image.
- Starts animating only after the loader completes (`startLoad` prop).
- Optimised with WebP format + `fetchpriority="high"` preload.

### 4.4 ProjectHighlights

- **Stats grid** — 8 animated count-up statistics (towers, acres, floors, area range, corner flats %, open space %, clubhouse size, total homes).
- **Editorial blocks** — "Prakash" (light), "Vayu" (air), "Sukoon" (privacy) — the three architectural design pillars.
- **CTA buttons** — Book Site Visit, Download Brochure, Download Price Sheet, Download Payment Plan.
- Background: copper texture with tower schematic SVG overlay.

### 4.5 Tribhuja (Amenity Mosaic)

- Parallax-scrolling masonry grid of 5 large image cards (Arrival, Club, Grounds, Rise, Home).
- Each card links to a corresponding category in the LifestyleExplorer via a custom DOM event (`scroll-to-explorer`).
- Uses Framer Motion for scroll-linked parallax and hover effects.

### 4.6 LifestyleExplorer

- **Tabbed category navigation** — Clubhouse, Grounds, Rise, Home.
- **Horizontal auto-scrolling carousel** with prev/next controls.
- 15 clubhouse amenities, 7 grounds amenities, 4 rise amenities, 2 home amenities.
- Auto-plays every 3.5s, pauses on hover or manual interaction, resumes after 10s idle.
- Scroll progress indicator bar at bottom.

### 4.7 Tatva (Legacy)

- Two-column layout introducing both developer groups:
  - **Zuari Infraworld** — Dr. K.K. Birla / Adventz legacy.
  - **Gangothri Infraedge** — K. Madhuram Reddy legacy.
- 3D card flip animation on "Inspect" click (using CSS `perspective` + Framer Motion `z-index` transforms).
- Includes editorial narrative text and developer logos.

### 4.8 LocationSection (Embedded in Tatva)

- Location map image with "Get Directions" button (→ Google Maps).
- Proximity data: ORR Exit 2 (2 min), Financial District (10 min), Airport (25 min), IT Corridor (15 min), Cycling Track (2 min).
- 500 ft ORR frontage stat.

### 4.9 Footer

- Three-column layout: logo, RERA numbers, CTA buttons.
- Developer attribution line: "A residence by Zuari Infraworld and Gangothri Infraedge".
- Copyright notice.

### 4.10 EnquiryForm (Modal)

- Full-screen modal overlay, opened from 10+ CTA touchpoints.
- **Form types** (via `type` prop):
  - `general` — "Send Us Your Questions"
  - `brochure` — "Download Brochure"
  - `price_sheet` — "Download Price Sheet"
  - `payment_plan` — "Download Payment Plan"
  - `site_visit` — "Schedule a Site Visit"
- **Fields**: Name\*, Email\*, Phone\* (with country code via `react-phone-input-2`), Message (optional).
- **Consent checkboxes** (both required):
  1. Communication consent (phone, SMS, email, WhatsApp).
  2. DND/NDNC override + privacy policy link.
- **Backend**: POST to Salesforce Apex REST endpoint (`/WebsiteLead/`).
- **Post-submit behaviour**:
  - For downloads → opens PDF in new tab + triggers `<a download>` + redirects to `/thank-you` after 3s.
  - For general/site visit → redirects to `/thank-you` after 1.5s.
- **Auto-popup**: Opens automatically after 7 seconds on page (if no URL-triggered form).

### 4.11 ThankYou Page

- Standalone route (`/thank-you`).
- Confirmation message after successful form submission.
- Receives download context via `react-router-dom` location state.

### 4.12 Floating CTAs

- **Sidebar CTA** — "Book Site Visit" vertical tab, fixed right edge, mid-screen.
- **Bottom-right stack** — Phone call button (`tel:+919000358004`) + WhatsApp button (`wa.link/kjfrpd`).

### 4.13 Picture Component

- Responsive `<picture>` element wrapper.
- Accepts `src`, `mobileSrc`, and `sourceProps` for art-directed responsive images.
- Used site-wide for all imagery.

---

## 5. Lead Generation Flow

```
User clicks CTA (any of 10+ touchpoints)
        │
        ▼
┌──────────────────────┐
│  EnquiryForm Modal   │  ← type = general | brochure | price_sheet | payment_plan | site_visit
│                      │
│  Name, Email, Phone  │
│  Message (optional)  │
│  2× consent checkbox │
└──────────────────────┘
        │
        ▼ POST
┌──────────────────────────────────────────────────┐
│  Salesforce Apex REST API                        │
│  https://zuari.my.salesforce-sites.com/...       │
│                                                  │
│  Payload: lastName, mobile, project, source,     │
│           subSource, email?, description?        │
└──────────────────────────────────────────────────┘
        │
        ▼ On success
┌──────────────────────────────────────────────────┐
│  • Fire analytics events (GA4 + Meta Pixel + GTM)│
│  • If download type → open PDF + trigger download│
│  • Redirect to /thank-you                        │
└──────────────────────────────────────────────────┘
```

### 5.1 Downloadable Assets

| Asset           | File                   | Size   |
|-----------------|------------------------|--------|
| Brochure        | `/brochure.pdf`        | ~60 MB |
| Price Sheet     | `/price-public.pdf`    | ~2.7 MB|
| Payment Plan    | `/price-public.pdf`    | ~2.7 MB|

> **Note**: Price Sheet and Payment Plan currently share the same PDF file.

---

## 6. Analytics & Tracking

### 6.1 Platforms

| Platform            | ID / Pixel                |
|---------------------|---------------------------|
| Google Analytics 4  | `G-70CV5R9GR6`            |
| Google Tag Manager  | `GTM-M55XTQQD`           |
| Meta (Facebook) Pixel | `2874462452933457`      |

### 6.2 Tracked Events

| Event Name             | Trigger                                            | Platforms      |
|------------------------|----------------------------------------------------|----------------|
| `form_open`            | Enquiry modal opens                                | GA4, Meta, GTM |
| `generate_lead`        | Form successfully submitted                        | GA4, Meta (Lead), GTM |
| `form_abandonment`     | Modal closed after interaction without submission   | GA4, Meta, GTM |
| `button_click`         | Any CTA button click (with name + location)        | GA4, Meta, GTM |
| `scroll_milestone`     | User scrolls past 25%, 50%, 75%, 90%               | GA4, Meta, GTM |
| `chat_bot_click`       | LivHousing chat bot interaction                    | GA4, Meta, GTM |
| `form_checkbox_click`  | Privacy/communication consent checkbox toggled      | GA4, Meta, GTM |

### 6.3 Form Abandonment Tracking

When a user interacts with the form (types in any field) but closes the modal without submitting, the system tracks:
- `form_name`: which form variant was open
- `last_field`: the last field the user engaged with (name → email → phone → message)

---

## 7. Tech Stack

### 7.1 Core

| Layer         | Technology                                     |
|---------------|------------------------------------------------|
| Framework     | React 18 (SPA)                                 |
| Build tool    | Vite 5                                         |
| Routing       | react-router-dom v7                            |
| Styling       | Vanilla CSS (`index.css`, ~82 KB)              |
| Animations    | Framer Motion 11 + GSAP 3                      |
| Smooth scroll | Lenis                                          |
| Icons         | Lucide React + inline SVGs                     |
| Phone input   | react-phone-input-2                            |
| Utilities     | clsx, tailwind-merge                           |

### 7.2 Fonts

| Font                 | Use                        |
|----------------------|----------------------------|
| Cormorant Garamond   | Headlines, editorial copy  |
| DM Sans              | Body text, UI elements     |

### 7.3 Third-Party Services

| Service          | Purpose                        |
|------------------|--------------------------------|
| Salesforce       | Lead capture API (Apex REST)   |
| Google Analytics | Behavioural analytics          |
| Meta Pixel       | Conversion tracking for ads    |
| Google Tag Manager| Tag orchestration              |
| LivHousing       | Embedded live chat bot         |
| Vimeo            | Video hosting (lazy-loaded)    |
| Google Maps      | Location / directions link     |
| WhatsApp (wa.link)| Direct chat link              |

### 7.4 Deployment

| Aspect           | Detail                                    |
|------------------|-------------------------------------------|
| Hosting          | Vercel                                    |
| Domain           | `www.tribhujalife.com`                    |
| SPA fallback     | All routes → `/index.html` (vercel.json)  |
| SEO files        | `robots.txt`, `sitemap.xml`               |
| Image format     | WebP (primary), PNG/JPEG (fallback)       |

---

## 8. SEO Strategy

### 8.1 On-Page SEO

- **Title tag**: "Tribhuja Life — Luxury 3 & 4 BHK Apartments in Kollur, Hyderabad"
- **Meta description**: Includes key facts (Zuari & Gangothri, 9 towers, 1,730 homes, 9.16 acres).
- **Canonical URL**: `https://www.tribhujalife.com/`
- **Open Graph** & **Twitter Card** tags with project hero image.
- **Structured data** (`schema.org/ApartmentComplex`) including:
  - Alternate names (Tribhuja, Zuari Tribhuja, Gangothri Tribhuja, etc.)
  - Developer organisations
  - Address, phone, amenities
  - Number of accommodation units (1,730)

### 8.2 Target Keywords

| Priority | Keyword                                      |
|----------|----------------------------------------------|
| Primary  | Tribhuja Life, Tribhuja Kollur               |
| Primary  | luxury apartments Hyderabad, 3 BHK Kollur    |
| Primary  | 4 BHK Kollur, apartments near ORR Hyderabad  |
| Secondary| Zuari Tribhuja, Gangothri Tribhuja           |
| Secondary| gated community Kollur, high rise Hyderabad   |
| Long-tail| new launch apartments Kollur near Financial District |
| Long-tail| Vastu compliant apartments Hyderabad          |
| Long-tail| apartments with clubhouse Kollur              |

### 8.3 Image SEO

All `<img>` alt texts are keyword-optimised per page section:
- Hero: "Premium apartments in Hyderabad Kollur by Zuari Gangothri Tribhuja"
- Amenities: Category-specific alt text (clubhouse, grounds, rise, home variants)
- Location: "Tribhuja location map — apartments near ORR Exit 2"

---

## 9. Performance Optimisations

| Technique                     | Implementation                                         |
|-------------------------------|--------------------------------------------------------|
| **Code splitting**            | `LifestyleExplorer`, `Landscape`, `Tatva` are `lazy()` loaded |
| **Image optimisation**        | WebP format, responsive `<picture>` elements, mobile-specific crops |
| **Critical asset preloading** | Hero image (`fetchpriority="high"`) + font CSS preloaded |
| **DNS prefetch**              | Vimeo player + CDN                                     |
| **Font preconnect**           | Google Fonts + gstatic                                 |
| **Smooth scroll**             | Lenis (no `overflow: hidden` scroll-jacking issues)    |
| **Lazy fallback**             | Dark `<div>` placeholders matching site palette (no flash) |
| **Scroll listener**           | `{ passive: true }` for scroll milestone tracking      |

---

## 10. URL-Based Deep Linking

The site supports UTM-friendly deep linking to auto-open specific form modals. This enables ad campaigns and email CTAs to land directly on the relevant form:

| URL Parameter              | Behaviour                          |
|----------------------------|------------------------------------|
| `?download=brochure`       | Opens brochure download form       |
| `?download=price_sheet`    | Opens price sheet download form    |
| `?download=payment_plan`   | Opens payment plan download form   |
| `?form=site_visit`         | Opens site visit booking form      |
| `?form=general`            | Opens general enquiry form         |
| *(none)*                   | Auto-popup after 7 seconds         |

---

## 11. Responsive Design

- The site targets **desktop** (primary) and **mobile** viewports.
- Breakpoints:
  - `1024px` — Switches multi-column layouts to stacked.
  - `768px` — Adjusts grid columns, font sizes, CTA sizing.
  - `480px` — Single-column footer CTAs.
- Mobile-specific image crops (`mobileSrc`) delivered via `<picture>` element.
- Touch-friendly tap targets (min 44×44px for floating CTAs).
- Smooth scroll disabled for touch (`smoothTouch: false`).

---

## 12. Compliance & Legal

| Requirement         | Implementation                                                    |
|---------------------|-------------------------------------------------------------------|
| **RERA disclosure** | Three RERA numbers displayed in footer                            |
| **Privacy consent** | Mandatory checkbox before form submission                         |
| **DND/NDNC override** | Explicit consent checkbox with policy link                     |
| **Privacy policy**  | Links to `gangothri.com/privacy-policy/`                         |
| **Cookie/tracking** | GTM, GA4, and Meta Pixel loaded in `<head>`                      |

---

## 13. Known TODOs & Open Items

These items are flagged in the codebase:

| Item                              | Location            |
|-----------------------------------|---------------------|
| Confirm RERA-filed acreage (9.14 vs 9.16) | `index.html` line 31 |
| Replace favicon with official copper-triangle vector | `index.html` line 34 |
| Price Sheet & Payment Plan share same PDF — separate files needed | `EnquiryForm.jsx` |

---

## 14. Success Metrics

| KPI                                  | Target                              |
|--------------------------------------|-------------------------------------|
| Lead capture rate (form submissions) | Track via `generate_lead` events    |
| Brochure downloads                   | Track via subSource analytics       |
| Scroll depth (75%+ milestone)        | Indicates full-page engagement      |
| Form abandonment rate                | Minimise via UX improvements        |
| Organic search traffic               | Rank top 5 for primary keywords     |
| Page load time (LCP)                 | < 2.5 seconds                       |
| Bounce rate                          | < 40%                               |
