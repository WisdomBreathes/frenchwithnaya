# French with Naya — Product Requirements Document

## Goal
Convert a skeptical but hopeful parent into a booked intro call. Primary conversion: Cal.com booking. Secondary: Web3Forms message.

The parent visits, reads enough to trust Naya, and books a free call — likely within 90 seconds of landing if the above-the-fold section does its job.

---

## Pages

### Home (`/`)
Single scrollable page. All content lives here. Chapter-based structure.

**Sections in order:**

#### 1. Preloader
- `bonjour.` in large Fraunces italic slides in, then the page reveals beneath
- ~10 lines JS + CSS. Sets the tone. Runs once.

#### 2. Navbar
- Logo (wordmark) left, links right: How It Works, Meet Naya, Book a Call
- Sticky. On scroll: cream background + subtle shadow
- Mobile: hamburger → full-screen overlay
- Active link: marigold underline

#### 3. Hero
- Headline addresses the parent directly — e.g.:
  *"Your child's favourite hour of the week."*
  or *"French lessons they'll actually ask for."*
- Left-aligned, large Fraunces display type, SplitText word reveal on load
- Subheading: 1 sentence, DM Sans, explains what this is in plain words
  e.g. "One-to-one French tutoring for kids from JK to Grade 5, online."
- Instructor photo: small circular, bottom right, with soft parallax
- Single CTA: "Book a free intro call" — marigold button
- Background: cream with a very subtle `merci` in large italic behind the headline

#### 4. The Trust Bar
- A thin strip under the hero — not a stats bar, but a reassurance strip:
  three short phrases in DM Sans with small Lucide check icons:
  "For ages 4–11" · "1:1 online sessions" · "Tailored to your child"
- Subtle, understated — not a big bold credential block

#### 5. Chapter I — How It Works
- Chapter label: `HOW IT WORKS`
- Three stages, laid out as a vertical numbered sequence (not a card grid):
  01 — *Free intro call* — Naya meets your child, assesses their level, answers your questions
  02 — *Tailored sessions* — Every lesson is designed around where your child is and how they learn
  03 — *Real progress* — Parents get a quick update after each session
- Each item animates in with ScrollTrigger stagger
- Background: cream

#### 6. Chapter II — Age Groups
- Chapter label: `WHO IT'S FOR`
- Horizontal scroll panel (GSAP pin + scrub) — 3 cards:
  - JK & Grade 1 (ages 4–6): colours, numbers, animals, songs, basic greetings
  - Grade 2–3 (ages 7–9): sentences, stories, games, reading simple phrases
  - Grade 4–5 (ages 10–11): conversation, writing, grammar foundations, confidence
- Background shifts from cream to deep as panel scrolls
- Cards: warm, not corporate. No floating icons. Each has the age range prominent, a short description, and a visual accent (marigold or peach fill)

#### 7. Chapter III — Meet Naya
- Chapter label: `MEET NAYA`
- Large photo left, text right (or reversed on mobile)
- Line-by-line text reveal on scroll
- Pull-quote in large italic Fraunces:
  *"I teach French the way I wish I'd learned it — through play, stories, and real conversation."*
- Below: 2–3 plain-text credential points (not icon cards). E.g.:
  "Grew up speaking French at home"
  "Has taught children since [year]"
  "Fluent in English and French"

#### 8. What Parents Say
- Chapter label: `WHAT PARENTS SAY`
- 3 testimonials — stacked, alternating offset layout (not a card grid)
- Each one: parent quote in Fraunces italic, parent name in DM Sans small, child's age/grade
- Clip-path reveal on scroll
- Placeholder quotes until real ones are collected

#### 9. Book a Lesson
- Chapter label: `LET'S GET STARTED`
- Full-bleed marigold section
- Large headline: *"Ready to book?"* in Fraunces
- Two columns: Cal.com booking widget left, Web3Forms contact form right
- Below form: one-line reassurance — "Free intro call. No commitment."

#### 10. Footer
- Minimal: logo, Privacy Policy, Terms of Use, business email
- Large `au revoir.` in pale Fraunces italic as background texture
- No social links unless Naya has active accounts

---

### Privacy Policy (`/privacy`)
- Standard Canadian PIPEDA-compliant privacy policy
- Mentions: Web3Forms (form data processor), Cal.com (booking data), no tracking cookies beyond those services
- `noindex: false` — should be indexable and linked in footer

### Terms of Use (`/terms`)
- Notes: sessions are online only, 1:1, for children JK–Grade 5
- Cancellation policy: TBD with Naya
- `noindex: false`

### 404 (`/404`)
- Branded, `noindex: true`
- Playful French phrase: *"Oops — cette page n'existe pas."*
- Links back to home

### Thank You (`/thank-you`)
- Post-form-submission redirect
- `noindex: true`
- Confirmation message + link to Cal.com if they haven't booked yet

---

## Functional Requirements

### Contact Form (Web3Forms)
- Fields: Parent name, Email, Child's age/grade (dropdown: JK–Grade 1 / Grade 2–3 / Grade 4–5), Message
- Hidden: `access_key` (Web3Forms — visible in HTML source, intentionally public), `redirect` to `/thank-you/`
- Honeypot: `<input type="text" name="_gotcha">` — positioned off-screen with CSS
- Client-side: reject message field content containing `http://`, `https://`, `www.` before submitting
- iOS: `font-size: 16px !important` on all inputs at ≤768px (prevents iOS auto-zoom)
- On success: `window.location.href = '/thank-you/'`
- On error: inline error message below submit button, re-enable button

### Booking (Cal.com)
- Embed Cal.com inline widget in the Book a Lesson section
- Fallback: "Book directly on Cal.com →" text link if embed fails or is blocked
- Cal.com handles scheduling, reminders, cancellation — no custom logic needed

### Navigation
- Sticky, background appears after 80px scroll
- Mobile hamburger → overlay, close on link click or Escape key
- Skip-to-main-content link for keyboard accessibility

### Animations
- Lenis smooth scroll (npm: `lenis`)
- GSAP + ScrollTrigger + SplitText (npm: `gsap`)
- `prefers-reduced-motion` respected — wrap all GSAP in a check, degrade gracefully
- Preloader exits before scroll triggers activate

### Performance
- Lighthouse 95+ Performance, 100 Accessibility, 100 SEO
- All images WebP, explicit width + height, lazy except hero
- Font preconnect + `display=swap`
- Astro Vite config with inlineStylesheets, cssMinify, esbuild

### SEO / Schema
- Unique title + meta description per page
- JSON-LD: LocalBusiness + Person schema in Layout.astro
- FAQPage schema on any FAQ section (add later if FAQ is added)
- `og:locale: en_CA`
- Manual `sitemap.xml.ts`
- `robots.txt` with sitemap reference
- Google Search Console: submit after launch
- Google Business Profile: set up after launch

---

## Content Placeholders (fill before launch)
| Item | Status |
|------|--------|
| Naya's photo | Pending |
| Real testimonials (3) | Pending |
| Exact age groups / levels | Pending — confirm with Naya |
| Naya's background / credentials | Pending |
| Cancellation policy | Pending |
| Pricing (display or not?) | Pending |
| Cal.com booking link | **https://cal.com/naya-831b2r/30min** (30-min consultation) |
| Web3Forms access key | **9007954b-92d1-4aa3-8e94-59e44a056b67** (update domain in Web3Forms dashboard from localhost to live domain after launch) |
| Business email | Pending |
| GitHub username + repo | Pending |
| Domain name | Pending |
| Final tagline | Pending |
