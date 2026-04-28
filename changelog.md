# Tribhuja — Site Changelog

---

# Round 3A SEO — Zuari-approved 25-keyword list integrated

Client-approved keyword list (25 across 4 tiers: Primary 6, Secondary
7, Long-tail 6, Brand 6) distributed across seven surfaces: `<title>`,
meta description, Open Graph, Twitter card, schema.org JSON-LD, image
alt text, and footer credit.

Four commits of code + this changelog entry. No display headlines,
hero verse, or Round 3A catalogue-voice rewrites were touched — the
keyword work lives exclusively in metadata and alt text, per the
brief's "DO NOT" rules.

## Commit 1 · Title + meta description + OG + Twitter — DONE (`bcf8f0d`)

  `<title>`               59 chars, primary 1, 2, 5 + brand
  meta description        158 chars, primary 1, 2, 4, 5, 7 + three
                          brand names (Zuari, Gangothri, Tribhuja)
  og:title                Brand-triad forward, variant of title
  og:description          ORR Exit 2 + Financial District + brand 24
  twitter:title           Short brand triad first
  twitter:description     Primary 5 + ORR + Financial District

## Commit 2 · schema.org JSON-LD — DONE (`02bee2a`)

- `description` rewritten to lead with Tribhuja and name both
  developers verbatim from the brief.
- `alternateName` array — four brand permutations (20-25) so Google
  resolves any of them back to the same entity.
- `brand` — two Brand nodes (Zuari Infraworld with parentOrganization
  Adventz Group; Gangothri Infraedge).
- `developer` — two Organization nodes mirroring the brand list, each
  with a short alternateName (Zuari, Gangothri) for natural-language
  queries.
- `amenityFeature` — replaced the old five-pool/sky-bridge list with
  the brief's eight, each mapped to a specific keyword cluster:
  100,000 sq ft clubhouse (12), Gated community (11), Vastu-compliant
  design (18), High-rise towers G+37 (10), 76% open ground, Near ORR
  Exit 2 (4, 14), Near Financial District (7, 15), Near Gachibowli
  IT Hub (8, 19).

## Commit 3 · Image alt text across components — DONE (`88b9c52`)

Every image got a different keyword combination legitimately tied to
its content. No stuffing, no duplicate phrases.

  Hero poster                primary 1, 2, 5, 25
  ProjectHighlights reveal   primary 6 + brand 25 + 'ORR Exit 2'
  Tribhuja Arrival tile      primary 1, 2 + brand triad
  Tribhuja Clubhouse tile    keyword 12 (apartments with clubhouse)
  Tribhuja Grounds tile      keyword 11 (gated community) + scale
  Tribhuja Home tile         primary 1 + long-tails 17, 18
  Tribhuja Rise tile         keywords 10, 9, 4
  LocationSection map        keywords 4, 7, 8
  LocationSection renderer   brand 25 + keyword 11 + scale fact
  LifestyleExplorer active   `altByCategory` — dynamic per category,
                             so clubhouse imagery no longer gets
                             '3 BHK apartment interiors' alt text
  Tatva ZUARI stamp          label-driven, brand 23 + 24
  Tatva GANGOTHRI stamp      label-driven, Gangothri + brand 24

Navbar, Loader, Tatva top-row logos, and Tatva legacy main images
kept their existing alts — already hitting brand/primary keywords
and the brief didn't call them out.

Also fixed a latent bug in the legacy stamp alt: both panes
previously shared a hard-coded 'Zuari Tribhuja' alt regardless of
which pane was active. Now driven by the `label` prop so the
Gangothri pane reads 'Gangothri Infraedge — ...'.

## Commit 4 · Footer brand-triad credit — DONE (`3f2fc45`)

New row below the existing logo / RERA / location grid:

  "A residence by Zuari Infraworld and Gangothri Infraedge"

Cormorant Garamond italic, 0.8rem, softer opacity than the row
above so it reads as supporting — not a second headline. Sitewide,
persistent signal carrying brand keywords 20, 22, 23, 24 on every
page view.

## Commit 5 · (this entry — changelog)

## Long-tail keywords — DEFERRED to Round 3B

Four long-tails can't be naturally integrated into current sections
without forcing. They get folded in when Round 3B sections ship:

  17  'Flats with good ventilation'   → Home Interiors section
                                         (extend catalogue p.54 line
                                          about air and ventilation)
  18  'Vastu compliant flats'         → Specifications section
                                         (3-col summary, Design col)
  12  'Apartments with clubhouse'     → already covered via
                                         schema.org + Living Mosaic
  19  'Apartments near IT hub'        → already covered via
                                         schema.org + Location

Keywords 17 and 18 also appear in the home-tile alt text as a
bridge — so even without the new section copy, the signal lands.

## Cannot do from this environment

- **Deploy to Vercel** — no CLI auth; client-side.
- **Validator screenshots** — no browser tooling. Three URLs to run
  after deploy:
    https://validator.schema.org
    https://metatags.io
    https://search.google.com/test/rich-results
  Paste the production URL into each and capture output.

## Keyword coverage map (proof of 25/25)

  1   3 BHK apartments in Kollur              title, desc, og, home alt
  2   4 BHK apartments in Kollur              title, desc, og, home alt
  3   Flats in Kollur Hyderabad               desc, explorer-home alt
  4   Apartments near ORR Hyderabad           og desc, twitter, map alt
  5   Luxury apartments in Kollur             title, desc, og title
  6   Premium apartments in Hyderabad         og, reveal alt, Tatva
  7   Apartments near Financial District      desc, og desc, twitter
  8   Flats near Gachibowli ORR               map alt, schema
  9   New launch apartments Kollur            Rise tile alt
  10  High rise apartments Hyderabad          Rise tile alt, schema
  11  Gated community apartments Kollur       Grounds tile, location alt, schema
  12  Apartments with clubhouse in Hyderabad  Clubhouse tile alt, schema
  13  Flats with amenities in Kollur          schema (implicit via amenityFeature)
  14  3 BHK flats in Kollur near ORR          schema
  15  4 BHK apartments near Financial Dist.   schema
  16  Apartments in Kollur with clubhouse     Clubhouse tile alt
  17  Flats in Kollur with good ventilation   Home tile alt, explorer
  18  Vastu compliant flats in Kollur         Home tile alt, schema
  19  Apartments near IT hub Hyderabad        map alt, schema
  20  Zuari Gangothri Tribhuja                schema altName, footer
  21  Tribhuja Kollur                         og title, twitter title
  22  Tribhuja Hyderabad                      title, twitter, Tatva alt
  23  Zuari Tribhuja                          schema altName, Tatva alt
  24  Gangothri Tribhuja                      schema altName, Tatva alt
  25  Zuari Gangothri Tribhuja Kollur         schema altName, Hero alt

All 25 placed. None stuffed. Footer brand credit provides the
sitewide triad signal.

---

# Round 2 — Wave 2A · Critical bugs & voice cleanup

State entering this wave: Wave 2A fixes 1–9 had already been applied
in commits between Round 1 and Round 2 (`86b1f9e` through `23e6003`).
Verified each against the brief and the current source. This wave
finishes Fix 10 and two small loose ends the prior commits missed.

## Fix 1 · Project Highlights count-up — already done
`86b1f9e` rewrote `CountUpStat` to seed `current` with the final value
on first render and animate from 0 with `requestAnimationFrame` on
in-view, replacing the broken `IntersectionObserver` + `setInterval`.
Also dropped `Curated Homes` → `Homes`.

**This wave:** cleaned up the leftover `Elevator Speed  less than `
label (extra spaces and stray copy) → `Elevator Speed`. The brief's
stats table just lists `Elevator Speed | 60 | Secs`.

## Fix 2 · Location distances — already done (`80d2af8`)
ORR Exit 2 (02), Financial District (24), Cycling Track (02), RGIA
Airport (18). Knowledge Hub row removed.

## Fix 3 · Tatva typo — already done (`6567160`)
`industies` → `industries`.

## Fix 4 · Drop "luxury" from NBC card — already done (`e17e6b3`)

## Fix 5a · Living Mosaic body — already done (`4ebd339`)
Now reads: *"A bride getting ready. A grandfather reading. A ten-year-
old's first swim. A Tuesday afternoon with no plans."*

## Fix 5b · Lifestyle Explorer body — already done (`4ebd339`)
Now reads: *"One hundred thousand square feet of what the home cannot
hold."*

## Fix 6 · Enquiry simplification — already done (`86e6a9a`)
Form section replaced with `Some homes are chosen. Others are kept
for.` + `Request a Visit` CTA → `/enquiry` + tel-link phone.

**This wave:** added the missing `// TODO: replace phone with Zuari
sales line` comment the brief asked for. The `href` TODO was already
present.

## Fix 7 · Sci-fi labels removed — already done (`00bd11f`)
`Structural Index TR-A1`, `C-LAT // C-LON`, `REF: B-0X // HUD-STATE`
all gone.

## Fix 8 · Drop `Transit Intelligence // LX` — already done (`23e6003`)

## Fix 9 · Cycling track caption — already done (`23e6003`)
*"23 km solar-covered track. Kollur to Narsingi, continuing towards
TSPA Junction."* renders below the Cycling Track row only.

## Fix 10 · Meta description polish — DONE THIS WAVE
All three description fields now use the brief-supplied line:

> *Nine towers in Kollur, Hyderabad. 1,730 homes across 9.16 acres,
> with 76% open ground and a clubhouse of its own.*

Touched: `meta name="description"`, `meta property="og:description"`,
`meta name="twitter:description"`. (Twitter previously had a shorter
variant — unified to the same string per the brief.)

---

## Voice violations spotted in 2A but **not** in this wave's scope

Flagging — these contain Round 2 banned words but were not in the
explicit fix list:

- `index.html` — `og:image:alt` contains *luxury*; `twitter:image:alt`
  contains *premium*. These were the SEO keyword clusters from Round 1
  per the original brief, now banned in Round 2. Keep or strip is a
  brand call.
- `LocationSection.jsx` line 20 — h2 reads `Strategic Neighbourhood.`
  *Strategic* is on the banned list.
- `LifestyleExplorer.jsx` — category title `Curated Living` on the
  `home` tab; subtitle `Climate Controlled Luxury.` on the `indoor`
  tab. Banned words still live there.

Did not touch any of these in 2A — outside scope. Round 3 candidates.

---

# Round 2 — Wave 2A.1 · Voice violations caught in 2A review

All three flagged items above were greenlit and fixed in the next
pass. One commit per fix, then this changelog entry.

## Fix A · og/twitter image alt — DONE (`0a5b5d2`)
`og:image:alt`     → *Tribhuja — nine towers, Kollur, Hyderabad, near ORR Exit 2*
`twitter:image:alt` → *Tribhuja — nine towers in Kollur, Hyderabad*

Real leak — these strings render on WhatsApp / LinkedIn / Twitter share
cards, so they were the most public surface for the banned words.

## Fix B · LocationSection h2 — DONE (`6988f11`)
`Strategic Neighbourhood.` → *The neighbourhood was ready before the
towers rose.* (verbatim, catalogue p.64). Reads as a moment, not a
brochure tag.

## Fix C · LifestyleExplorer category labels — DONE (`dd1d5f9`)

  home.title       `Curated Living`               → `The Home`
  indoor.subtitle  `Climate Controlled Luxury.`   → `Climate Controlled.`

`The Home` mirrors the existing `The Grounds` pattern for the outdoor
category. The indoor subtitle keeps the engineering fact, drops the
qualifier.

## Still flagged — not in this micro-wave

`LifestyleExplorer.jsx` items on the `home` category include
`3 BHK Type A Premium` and `3 BHK Type B Grand`. Left untouched in this
round — these read as product/configuration names, not marketing copy,
and changing them risks confusing what the user is selecting. Worth a
brand call.

---

# Round 3A — Voice rewrites, catalogue-aligned

Fifteen copy swaps plus one rename, sourced verbatim from
`TRIBHUJA_V9.pdf`. Page references kept as inline JSX comments
on every changed entry so a later voice sweep can re-verify
without re-reading the brief.

Grouped into three logical commits plus a bonus perf commit and
this changelog entry.

## Bonus · common.webp recompressed — DONE (`4735f8d`)

`common.webp` was 728 KB — leftover from the first WebP batch at
q=75 over the 7.4 MB source JPG. Since Common Lounge is the initial
active item in LifestyleExplorer's clubhouse category, it loads on
every chunk bootstrap.

Re-encoded: `cwebp -resize 1920 0 -q 72 -metadata none`.
Result: **105 KB** (target was <120 KB).

## Commit 1 · ProjectHighlights voice — DONE (`e0252ac`)

Six blocks swapped.

| Block | Element | Catalogue | Old → New |
|---|---|---|---|
| 1 | eyebrow | p.46 | `Project Index · The Master Specs` → `The Rise` |
| 2 | main h2 | p.51 | `Engineering Excellence.` → `Thirty-seven floors / at one hundred and twenty metres.` |
| 3 | arrival h3 | p.47 | `The Architecture of Arrival.` → `Three lifts to your door, / one of them always waiting.` |
| 4 | arrival body | p.46 | 4-beat `The elevator going up…` verse replaces the feature list |
| 5 | sky h3 | p.48 | `Top of The World.` → `Top of the world.` (lowercase per catalogue) |
| 6 | sky body | p.48 + p.49 | `A hundred and twenty metres up, the city falls below the conversation. Between two towers, a walk that is neither one.` |

## Commit 2 · Tribhuja section + mosaic tile captions — DONE (`c323f0a`)

Blocks 7-8 (section header) plus Blocks 11-16 (six tile captions).

| Block | Element | Catalogue | Line |
|---|---|---|---|
| 7 | eyebrow | pp.20-36 | `Club Tribhuja` |
| 8 | main h2 | p.21 | `Every hour of Tribhuja's life passes through here.` |
| 11 | Arrival caption | p.26 | `A room that holds a conversation without hurrying it.` |
| 12 | Clubhouse caption | p.36 | `One hundred thousand square feet of what the home cannot hold.` |
| 13 | Outdoor caption | p.37 | `Ten acres. Seventy-six percent open.` |
| 14 | Indoor caption | p.20 | `The first sound inside Tribhuja is water. And beyond it, the full life begins.` |
| 15 | Home caption | p.52 | `A home holds what the world cannot.` |
| 16 | Terrace caption | p.23 | `Suspended like the curve of a kept breath.` |

Captions render below the h3 in Cormorant Garamond italic, muted
copper (`rgba(184,115,51,0.7)`), `clamp(0.95rem, 1.4vw, 1.2rem)`,
`max-width: 36ch`. Restructured the h3+CTA row to `align-items:
flex-end` with `flex-shrink: 0` on the pill so the pill stays
pinned to the right while the caption wraps under the h3.

## Commit 3 · LifestyleExplorer voice — DONE (`061748b`)

| Block | Element | Catalogue | Change |
|---|---|---|---|
| 9 | clubhouse h2 | p.36 | `Vertical Life. Sectional Review.` → `One hundred thousand square feet of what the home cannot hold.` |
| 10 | Floor 05 | p.24 | `Banquet Hall` → `Banquet Hall · The evening begins when you do.` |
| 10 | Floor 06 | p.25 | `Theatre` → `Theatre · A projector at work, and the film already begun.` |
| 10 | Floor 07 | p.26 | `Short Party Lounge` → `Party Lounge · A room that holds a conversation without hurrying it.` (rename + caption) |

Block 9 previously lived in `clubhouse.description` from Wave 2A
Fix 5b; swapping it up to the h2 would duplicate the line below.
Cleared the description and made the `<p className="bd">`
conditional on `category.description` being truthy. Other
categories keep their body copy.

Block 10 captions concatenated into `title` per brief spec. All
other floors (10 total: Gym / Yoga / Badminton / Dance Room /
Play / Multiuse / Saloon / Creche / Common Lounge / Great Lobby)
left as amenity-name-only — catalogue has no caption for them
and the brief was explicit about not inventing lines.

## Post-rewrite verification

**Banned words** (`luxury`, `premium`, `curated`, `exclusive`,
`world-class`, `state-of-the-art`, `strategic`):
- `react/src/components/**/*.jsx` — **0 hits** (case-insensitive)
- `react/index.html` metadata — **0 hits**

**Exclamation marks in display copy:**
- Active components — **0 hits**. Only `!` matches were
  code-level (`!important`, `!==`, `!variable`, `<!--`).
- `react/index.html` — **0 hits** (only HTML comment delimiters)

Verification passes end-to-end.

## Deferred (not in Round 3A scope)

- Round 3B (six new sections) — waiting on client per-section briefs.
- Meta descriptions and alt text — touched in earlier rounds; no
  Round 3A swaps landed here.
- Tatva legacy copy — not in the Round 3A brief.

---

# Round 2 — Wave 2C · Mobile responsive audit

70-75% of traffic is mobile. Every section must work at 375px viewport
width. Seven fixes, one commit each.

## Pre-wave Lighthouse (reference)
Post-remediation score was ~85-90 with LCP 3.1s, CLS 0.000. Wave 2C
targets mobile *correctness* rather than speed — layout, readability,
tap ergonomics, scroll behaviour.

## Fix 16 · Typography scale at 375px — DONE (`c9ff83f`)
Audited every clamp() against brief minimums (display >= 2rem, body
>= 0.95rem, eyebrow >= 0.65rem). Only `.eyebrow` was below — floor
was 10px (0.625rem). Bumped to 11px (0.69rem). Everything else
compliant.

## Fix 17 · Grid collapse breakpoints — DONE (`543dc8b`)

Existing state:
- `.ph-stats-grid` already 4→2 at 900px (more generous than brief's
  768px — no change needed).
- `.ph-editorial-grid` already 2→1 at 900px ✓
- `#location` grid already 1→1col at 900px via inline `<style>` ✓
- `.amenities-mosaic` was flat 42vh at ≤900px, 1-col at ≤640px.
  Did **not** preserve the brief's tiered heights.

Rewrote amenities-mosaic media queries:

  `< 768px`   `nth-child(1)`→50vh, default→45vh, `nth-child(4)`→55vh,
              `nth-child(n+5)`→40vh (matches brief's 50/45/55/40 tiers)
  `< 480px`   1-col, 56vw default, 64vw for wide positions

## Fix 18 · LifestyleExplorer sticky sidebar — DONE (`0c3a8b2`)
`.explorer-visual` had inline `position:sticky; top:100px`, which
jitters on iOS and breaks scroll momentum. Added CSS override at
`<=900px`: `position:static !important`. Vertical gap between list
and visual tightened from 80px → 40px when stacked.

Stack order (list first, visual below) preserved via the grid's
auto-fit minmax.

## Fix 19 · 44×44 tap targets — DONE (`471f8ad`)
Four interactive elements were under-sized:

  `.form-btn`                  38px  → min-height:44px + inline-flex
  category tabs (Lifestyle)     31px  → pad 14×12, min 44×44
  Explore Section pills         30px  → pad 14×22, min-h 44
  archive seals (Tatva)         34px  → pad 14×22, min-h 44

Already compliant: LifestyleExplorer floor rows (min-height:80px).
Skipped: Nav logos — they're non-interactive.

None of the visual proportions changed meaningfully.

## Fix 20 · Hero overlay clamps + safe-area inset — DONE (`9ef6a79`)

- verse font-size  `clamp(1.4rem, 3.2vw, 2.6rem)` → `clamp(1.6rem, 5vw, 3rem)`
- stamp font-size  flat `0.72rem` → `clamp(0.7rem, 2.5vw, 1rem)`
- overlay `padding-bottom`: `max(clamp(32px,6vw,80px), env(safe-area-inset-bottom))`

Safe-area inset ensures the stamp never sits under Safari's URL bar
or home-indicator gesture zone on iOS. Old hardcoded <=540px font-
size overrides removed — new clamps cover the range cleanly.

## Fix 21 · background-attachment scroll below 1024px — DONE (`3ea7110`)
`background-attachment:fixed` destroys iOS Safari performance
(flickering, frozen backgrounds). Two inline-style backgrounds hit it:

  Tatva                `.ps[data-theme="copper"]`          copper.webp
  ProjectHighlights    `> div[style*="background-attachment"]` copper.webp

Both overridden at `<=1024px` (brief-recommended cutoff, broader and
safer than the iOS-only `@supports` route). Desktop keeps the fixed
parallax effect; phones and small tablets fall back to normal scroll.

## Fix 22 · Logical 375/390 check — DONE (no commit, in-place audit)
Scanned for mobile overflow risks:

- `body` has `overflow-x: clip` globally — any section overflow caught.
- Only `whiteSpace: nowrap` is inside an `overflowX: auto` tab rail
  (intentional horizontal-scroll behaviour).
- No inline widths or min-widths exceed 375px.
- All responsive imagery uses `<picture>` with appropriate `sizes`
  from Waves 2B/remediation.
- Build verified: 401 modules, 303 kB main / 97 kB gzip, split chunks
  land at < 12 kB each.

Screenshots at 375px and 390px need to be captured on the client side
after deploy — no browser tooling in this shell. See deliverable #4.

## Cannot do from this environment
- Vercel deploy + preview URL
- Actual 375px / 390px screenshot capture (emulation unavailable)

## Flagged for Round 3 (noted during Wave 2C audit)
- `common.jpg` source file is 7.4 MB, and its WebP pair is still
  728 KB — way too heavy for a below-the-fold amenity visual. Needs
  re-encoding like `high.webp` did during remediation.
- Residual 1 (Common Lounge empty-src) should already be closed by
  the hardened Picture helper from commit `1da0445`.

---

# Round 2 — Wave 2B Remediation · LCP fixes after Lighthouse run

Wave 2B landed all five technical fixes, but Lighthouse mobile still
reported **LCP 10.0 s** (target < 2.5 s) against the live deploy.
Diagnosis surfaced three asset-layer issues the original brief didn't
catch. Six fixes + one bonus, one commit each.

## Live-site Lighthouse (before this pass)
- LCP 10.0 s (blocker)
- FCP 2.0 s, TBT 0 ms, CLS 0.005, Speed Index 5.8 s

## Fix L1 · Loader logo: responsive WebP + PNG fallback — DONE (`aef61e1`)
Lighthouse called out the loader logo (`1872x488 / 211 KB`) as the
LCP element. Generated three variants via cwebp + sips:

  logo-320w.webp  4.8 KB
  logo-640w.webp  12  KB
  logo-320w.png   15  KB  (fallback)

Loader.jsx now uses `<picture>` with srcSet/sizes, explicit
width/height, and `fetchpriority="high"`.

## Fix L2 · Nav logos: responsive WebP + PNG — DONE (`c8fe789`)
Same treatment for the two nav logos. Generated:

  combinedcop-280w.webp  4.3 KB
  combinedcop-560w.webp  9.2 KB
  combinedcop-280w.png   15  KB
  (logo-320w/640w reused from L1)

Dropped the Picture helper wrapper in Navbar in favour of inline
`<picture>` — cleaner expression for multi-source logos with explicit
width/height.

## Fix L3 · Harden Picture against empty src — DONE (`1da0445`)
Three imgs were rendering with `src=""` on the live site (Common
Lounge, Zuari Infraworld, Gangothri Infraedge). Root cause wasn't
fully reproducible locally — possible triggers include lazy-chunk
Suspense transitions or framer-motion AnimatePresence rendering
outgoing nodes after backing data changed.

Picture.jsx now short-circuits on falsy/empty/non-string src and
returns `null`. The surrounding wrapper keeps reserving layout space;
we just don't emit a broken `<img>`.

## Fix L4 · Recompress hero poster — DONE (`cf2d021`)
`high.webp` was built from the 5000x2813 / 7.5 MB `high.jpeg` source
at q=75 during Wave 2B and came out to 1.2 MB. Re-encoded with
`cwebp -resize 1920 0 -q 62`. Result: **178 KB** (target was < 400 KB).

## Fix L5 · Explicit width/height on flagged imgs — DONE (`638e344`)
Added `width=` / `height=` attrs at every call site Lighthouse flagged:
Tatva Zuari/Gangothri logos, Tatva legacy dossier, LocationSection
map + building, ProjectHighlights building + logo. CSS sizing is
unchanged; the attrs just give the browser an aspect ratio upfront
to reserve layout space and keep CLS close to zero.

Also swapped the ProjectHighlights logo to the responsive set from
L1/L2 via Picture's `sourceProps` escape hatch.

## Fix L6 · copper.jpeg → copper.webp for CSS backgrounds — DONE (`565a6db`)
ProjectHighlights and Tatva both use `copper.jpeg` as a fixed-
attachment background via inline style. Inline `backgroundImage`
can't use `<picture>` fallback, but WebP has universal support
across the audience's browsers. Payload 169 KB → 15 KB.

## Bonus · useHeroFrames preloading the 7.5 MB JPG — DONE (`2f4a488`)
Spotted during the L1-L6 audit. `useHeroFrames` was preloading the
original heavy asset set as "critical" — the files the loader bar
waits on before dismissing:

  logo.png, combinedcop.png, **high.jpeg (7.5 MB)**, copper.jpeg

That was roughly 8 MB of blocking work on every fresh page load, and
`high.jpeg` was preloaded *in addition* to the `high.webp` that
actually renders. Swapped to the compressed WebP variants. ~8 MB →
~200 KB of preload work.

This wasn't in the L1-L6 brief but directly blocks the LCP target —
without it, the loader literally cannot dismiss until that 7.5 MB
source JPEG arrives.

## Expected Lighthouse delta
Per-asset payload reductions (mobile):

  loader logo:   211 KB  →  5 KB     (-206 KB)
  nav logos:     280 KB  →  10 KB    (-270 KB combined)
  hero poster:   1.2 MB  →  178 KB   (-1.05 MB)
  copper bg:     169 KB  →  15 KB    (-154 KB, ×2 sections)
  preload list:  ~8 MB   →  ~200 KB  (-7.8 MB on first load)
  empty-src imgs: no more phantom 404s

Total: > 9 MB off the wire on a cold first load. Expected mobile LCP
well under the 2.5 s target. Deploy + re-run Lighthouse client-side.

---

# Round 2 — Wave 2B · Performance optimisation

Goal: Lighthouse mobile > 80, LCP < 2.5s on 4G. Five fixes, committed
separately. Vercel deploy + Lighthouse verification on client side.

## Fix 11 · Lazy-load below-the-fold images — DONE (`47954ed`)
Five components already had `loading="lazy"` + `decoding="async"` on
every `<img>` (LifestyleExplorer, ProjectHighlights, LocationSection
in earlier passes). This wave added the same to the remaining five
imgs: Tatva stamp / main legacy / Zuari logo / Gangothri logo, plus
the Tribhuja amenity card image. Hero iframe stays eager. Navbar
logos and Loader stay eager (above the fold).

## Fix 12 · WebP + `<picture>` fallback — DONE (`92f9b54`)

- Generated 37 `.webp` variants of every active `/assets/images/*.{jpg,jpeg,png}`
  via local `cwebp` (lossy q=75 for photos, lossless for PNG logos so
  transparency survives).
- New helper `src/components/Picture.jsx` — drop-in `<img>` replacement
  that emits `<picture>` with a WebP `<source>` computed from the legacy
  src path via a `withWebp()` util.
- Wired `Picture` into every active component: ProjectHighlights,
  Tribhuja, Tatva, LifestyleExplorer, LocationSection, Navbar (eager).

**Left as-is for later:** CSS background images (`copper.jpeg` in
ProjectHighlights and Tatva) still serve the original JPG. Inline-style
backgrounds can't switch by type without refactoring to real CSS
classes with `image-set()`. Loader screen likewise.

## Fix 13 · Hero poster frame — DONE (`e4d41ab`)
The Vimeo iframe has a 1-2s gap before first frame paint. Added a
`<picture>` poster behind the iframe that:
- Shows at first paint with `fetchpriority="high"`.
- Fades to `opacity: 0` (600ms) once `iframe.onLoad` fires, via a
  `data-loaded` attribute flip and a CSS transition.
- Uses `/assets/images/high.webp` (+ JPG fallback) as a placeholder.
  **TODO** — swap for a real still from the final Vimeo cut.

## Fix 14 · Code-split below-the-fold chunks — DONE (`5a10753`)
`LifestyleExplorer` and `Tatva` are now lazy-imported via
`React.lazy()` in App.jsx, wrapped in `<Suspense>` with a dark-
palette `SectionFallback` so nothing flashes.

Build output:
- **Before:** single bundle 323 kB raw / 103 kB gzip.
- **After:** main 303 kB raw / 98 kB gzip + LifestyleExplorer 8.4 kB /
  2.9 kB gzip + Tatva 11.8 kB / 4.3 kB gzip.

Savings ~21 kB raw / ~5.7 kB gzip off first paint. Modest because
framer-motion is also pulled in by the above-the-fold ProjectHighlights
and Tribhuja components — a deeper refactor could push this further.

## Fix 15 · Preload hero poster + font stylesheet — DONE (`684df69`)
Added two `rel=preload` hints above the preconnect chain:
1. `/assets/images/high.webp` — `type="image/webp"` + `fetchpriority="high"`
   so the hero poster is treated as LCP-critical.
2. The Google Fonts CSS URL — `as="style"`. Stable across font-file
   URL rotations. Swap for a direct woff2 preload once fonts are
   self-hosted.

Nothing else is preloaded. Everything below-the-fold is lazy, split,
or on-demand.

---

## Cannot do from this environment

- **Deploy to Vercel / preview URL** — no Vercel CLI auth here. Client
  side.
- **Lighthouse mobile score** — no browser tooling here. Client side.
- **CSS background images → WebP** — requires refactoring inline
  styles to real CSS classes with `image-set()`. Out of wave scope.

---

# Round 2 — Wave 2A.2 · Fix D · Home category configuration labels

Voice cleanup — Type A Premium / Type B Grand qualifiers dropped,
pending Zuari confirmation whether tier names carry legal meaning
(RERA filings, price sheets, brochure designations).

## Fix D · DONE (`13aae94`)

  `3 BHK Type A Premium` → `3 BHK Type A`
  `3 BHK Type B Grand`   → `3 BHK Type B`

Type A / Type B codes already differentiate variants without the
qualifier. `Premium` was on the banned word list; `Grand` is the same
shape of qualifier flagged for the same reason, so removed alongside.

`4 BHK Quartet Grand` and `4 BHK Quartet Sky` were not in the explicit
fix list and read more like variant names than tier qualifiers — left
in place for Round 3 review.

---

---

## Cannot do from this environment

- **Vercel deploy + preview URL** — no Vercel CLI auth here. Need user
  to run `vercel` locally or grant authenticated shell access.
- **Lighthouse mobile screenshot** — no browser tooling. Will defer to
  user-side once Wave 2B lands.

---

## Round 1 (preserved below for history)

Round 1 against client brief from Zuari brand marketing.
Scope this pass: the four items the brief tagged as **start here** —
copy (1), Grounds descriptors (3), metadata (5), acreage flag (8).
Everything else (hero video swap, enquiry simplification, performance,
mobile audit, floor-plan rules) is queued and called out at the bottom.

---

## 01 · Hero copy update — DONE

The verse did not exist anywhere in the live React source — only in the
archived wireframe at `public/unused_assets/docs/wireframe/tribhuja-wireframe.html`.
The brief assumed it was present.

- Added the verse to the Hero overlay using the corrected wording:
  *"Where the light. Where the air. Where the quiet. Nine towers, where
  all three meet."*
- Added the location stamp *"Kollur · Hyderabad · ORR Exit 2"* below the
  verse.
- Cormorant Garamond italic for the verse, DM Sans uppercase tracked-out
  for the stamp — per voice rules.
- Updated the meta description and og:description to use the same
  "Where" wording.
- Patched the wireframe HTML so the archive matches.

Files:
- `src/components/Hero.jsx`
- `src/index.css` — new `.hero-overlay`, `.hero-verse`, `.hero-stamp` rules
- `index.html` — meta description + og:description + twitter:description
- `public/unused_assets/docs/wireframe/tribhuja-wireframe.html`

## 03 · Grounds zone descriptors — DONE

In `LifestyleExplorer.jsx`, the **outdoor** category (rendered as
"The Great Grounds") previously listed pool/court items by feature. Replaced
with the five named zones from the brief, each carrying a plain-language
descriptor in brackets:

- Link Parks (arrival plazas & pathways)
- Leeside (temple, market, kids' play)
- Terra (sports courts & toddler zones)
- Aqua (five pools, wet & dry lounges)
- Tranquil (gardens, outdoor gym, picnic)

Title also tightened from "The Great Grounds" → "The Grounds" to drop the
banned superlative. Header description rewritten so it names a moment
("Each named for what it offers, not how it looks") instead of listing
features.

Code comment marks all five entries as
*placeholder — pending landscape architect confirmation*.

Both the list rail and the active visual show the descriptor in muted
sans-serif inside parentheses.

Files:
- `src/components/LifestyleExplorer.jsx`

## 05 · SEO metadata layer — DONE

Rewrote `index.html` `<head>` end-to-end:

- `<title>` — *"Tribhuja — Nine Towers, Kollur · Hyderabad"* (47 chars)
- `<meta name="description">` — 154 characters, voice-aligned, includes
  the verse opener and the load-bearing facts (1,730 homes, 9.16 acres,
  76% open ground, Kollur)
- `<link rel="canonical">` set to the Vercel preview URL — **swap to the
  production domain before launch**
- Open Graph: `og:type=website`, `og:title`, `og:description`, `og:url`,
  `og:image` (using `/assets/images/high.jpeg` as a stand-in until a
  proper 1200×630 social card is supplied), `og:site_name`, `og:locale`
- Twitter: `summary_large_image` card with title, description, image,
  image alt
- JSON-LD structured data, `@type: ApartmentComplex`, with `name`,
  `address` (Kollur, Hyderabad, IN), `numberOfAccommodationUnits: 1730`,
  `amenityFeature` array, placeholder `telephone`
- `theme-color` set to charcoal `#0E0E0F` for the mobile address bar
- Apple touch icon and shortcut icon wired up alongside the existing
  PNG favicon

Footer added in `App.jsx` carrying the RERA number `P01100010651`,
the wordmark, and the location stamp. Styled in `index.css` under
`.site-footer`.

`public/robots.txt` — allow all, with the absolute sitemap URL.
`public/sitemap.xml` — single-page-app aware: lists `/` plus the in-page
section anchors so crawlers see the structure. **Must be revisited when
real routes (e.g. `/enquiry`, `/press`) ship.**

Files:
- `index.html`
- `src/App.jsx`
- `src/index.css`
- `public/robots.txt` (new)
- `public/sitemap.xml` (new)

## 08 · Acreage consistency — DONE

`9.14` is not present anywhere in the React source — only `9.16` (matches
the catalogue). Added a `TODO: confirm RERA-filed acreage (9.14 vs 9.16)`
comment at every load-bearing acreage citation so it gets revisited the
moment legal confirms.

Locations flagged:
- `index.html` — head-level HTML comment, sits with the meta block
- `src/components/ProjectHighlights.jsx` — JSX comment above the 9.16
  CountUpStat
- `src/components/Tatva.jsx` — comment trailing the Zuari pane copy where
  9.16 appears in body text

---

## NOT IN THIS PASS — explicitly deferred

These were in the brief but flagged as needing assets, decisions, or
substantial UI work. Tracked here so nothing falls through.

### 02 · Hero video setup
Current Hero loads a Vimeo iframe. The brief asks for a self-hosted
`<video muted autoplay loop playsinline>` with H.264 encoding under 4MB
plus a poster frame. **Need final video asset before swapping** — hold
until Zuari supplies the cut.

### 04 · Enquiry simplification
Form is currently 7 fields with submit. Brief calls for a single phone
field plus one *Request a Visit* CTA wired to the Zuari CRM endpoint.
**Need the CRM endpoint URL** (or confirmation it should open `/enquiry`
as a separate route) before stripping. Did not touch the form this pass
to avoid breaking the live form silently.

### 06 · Performance optimisations
- Most below-the-fold `<img>` tags already carry `loading="lazy"`
- WebP/`<picture>` rollout still pending — needs a build step or
  per-asset conversion across `public/assets/images/`
- Vite already minifies CSS/JS in `vite build`; no change needed
- Lighthouse run not done in this pass

### 07 · Mobile responsive audit
Did not run the 375 / 390 / 412 sweep. Hero overlay typography has a
mobile breakpoint added (≤540px). Full audit of grid collapses,
hamburger nav, and 44×44 tap targets is a separate pass.

### 09 · Floor plans
Confirmed: no plan images currently published. Section 06 in the brief
maps to the **home** category in `LifestyleExplorer.jsx`, which lists
configurations only — already compliant. No change needed beyond this
note.

---

## Assumptions made (where the brief was ambiguous)

1. **The verse wasn't in the live source.** Brief implied it was
   ("change After to Where in three places"). Treated this as "add the
   corrected verse to the hero overlay" rather than just a find-and-
   replace. Wireframe HTML was patched too for archive consistency.
2. **Domain.** Used `https://tribuja-gray.vercel.app/` for canonical /
   OG / sitemap URLs because that's the URL in the brief. **Swap to the
   real domain** (e.g. tribhuja.com) before launch.
3. **OG image.** No social card asset exists, so I pointed `og:image` at
   the existing tower hero JPG. A proper 1200×630 social card is needed.
4. **JSON-LD type.** Picked `ApartmentComplex` over `Residence` —
   `Residence` is for a single home; this is a 1,730-unit project.
5. **Telephone in JSON-LD.** Used a placeholder `+91-00000-00000`
   because no enquiry number was provided. Replace before launch.
6. **Sitemap routes.** Listed `/` plus hash-anchored sections, since
   the site is a single-page React app today. Will need expansion if
   `/enquiry` or other routes are added.
7. **Section 05 mapping.** Brief says "section 05 (The Grounds)" —
   matched this to the `outdoor` category in `LifestyleExplorer`, which
   is the only place "Grounds" copy appears in the live source.
8. **Voice rules.** Did not strip every banned word from existing copy
   in this pass — only avoided them in the new copy I added (footer,
   hero stamp, Grounds rewrite). A full voice sweep across
   `ProjectHighlights`, `Tribhuja`, and `Tatva` is its own pass.

---

## Needs client input before going live

- [ ] **RERA-filed acreage** — 9.14 vs 9.16. Currently 9.16 throughout,
      flagged with TODO comments.
- [ ] **Final hero video** — needed for point 02.
- [ ] **Official keyword cluster list** — current 8 clusters in metadata
      were inferred from the Swipepages landing per the brief. Replace
      when client provides their list.
- [ ] **Landscape architect sign-off** on the five Grounds zone names
      and descriptors (currently flagged as placeholder in code).
- [ ] **CRM endpoint** for the Request-a-Visit CTA (point 04).
- [ ] **Production domain** — to update canonical, OG URL, sitemap
      `loc`, and robots.txt sitemap reference.
- [ ] **OG / Twitter social card image** at 1200×630.
- [ ] **Real enquiry telephone** for the JSON-LD `telephone` field and
      the future Request-a-Visit modal.
- [ ] **`favicon.ico`** in copper-triangle vector form (currently
      pointing at the existing PNG favicon as a placeholder).
