# French with Naya — Claude Code Master Context

Read this file first. Then read all referenced files before asking questions or creating any files.

## Referenced Files
- `site-description.md` — what the business is, goals, audience
- `prd.md` — pages, functional requirements, content placeholders
- `brand.md` — color palette, typography, voice, decorative elements
- `design-system.md` — components, CSS patterns, animation code, accessibility

## Business Summary
**French with Naya** — one-to-one online French tutoring for children from Junior Kindergarten through Grade 5 (ages 4–11), run by Nayaab (goes by Naya).
The **website visitor is a parent**, not the child. Design and copy must earn parent trust while feeling warm and joyful enough that parents believe their child will love it.
Primary CTA: Book a free intro call via Cal.com. Secondary: Web3Forms contact form.

---

## Tech Stack
- Framework: **Astro** (static output)
- Styling: **Inline styles** — do NOT use Tailwind. Tailwind CSS purge breaks custom animation classes.
- Animations: **GSAP + ScrollTrigger + SplitText** (npm packages) + **Lenis** for smooth scroll
- Fonts: **Fraunces** (display) + **DM Sans** (body) — Google Fonts
- Icons: **Lucide SVG** (inline, not emoji, not icon fonts)
- Forms: **Web3Forms** (no backend needed, free)
- Booking: **Cal.com** embed widget
- Hosting: **GitHub Pages**
- Deployment: **GitHub Actions** (use `npm ci`, Node 20, concurrency block)

---

## DESIGN RULES — READ BEFORE WRITING ANY COMPONENT

This site must feel fully custom. Not AI-generated. Not a template. If a pattern looks like something a scaffold would produce, it's wrong.

### Absolutely Forbidden Patterns
These will be rejected. Do not use them.

1. **Floating icon cards** — rounded card with a small icon (in a circle or gradient square) pinned to the top corner, followed by a heading and description. This is the single most common AI design fingerprint. Replace with: offset numbered layout, text blocks, full-bleed sections, or photo + text splits.

2. **Generic gradients** — blue-to-purple, teal accents (#14B8A6), purple glows. Derive all colors from the brand palette in `brand.md`. The palette is: cream, ink, terracotta, sage, blush, deep.

3. **AI hero layout** — centred headline + one-line subtitle + primary button + ghost button + floating gradient blob or particle background. Break it: left-aligned, real photo with dark overlay, single CTA, large expressive type.

4. **AI copy** — these phrases are banned from every page:
   - "Elevate your child's French" / "Unlock their potential" / "Transform their learning"
   - "Seamlessly" / "effortlessly" / "streamlined learning experience"
   - "We are committed to excellence"
   - "Your child's journey begins here"
   - "Evidence-based pedagogical framework"
   Write like Naya is talking to a parent at school pickup. Short sentences. Specific. Warm. Real.
   The visitor is a parent. Every headline and every paragraph should speak to their concern for their child, not abstract language-learning goals.

5. **Excessive structure** — no bold text mid-sentence for emphasis, no headers on every paragraph of conversational copy.

6. **3-column feature grids** — three cards side by side each explaining a feature with an icon. Use a different layout: a numbered list, a horizontal scroll panel, a large typographic statement.

7. **Em-dash overuse** — using " — " repeatedly in the pattern "X — Y" or "X — Y — Z" is one of the most immediately recognizable AI copy fingerprints. It reads as a writing tic, not a human voice. Rules:
   - Maximum one em-dash per paragraph
   - Prefer restructuring the sentence instead: use a period, a comma, or rewrite as two sentences
   - Never use em-dash as a substitute for "because", "so", "which", or "and"
   - Audit all copy before shipping: grep for " — " and question every instance
   Bad: "Science-educated — she brings structure — and method — to every lesson"
   Good: "Science-educated. She brings genuine structure and method to every lesson."

### What This Site Should Feel Like
A well-designed personal brand site — editorial, literary, warm. The typography does the heavy lifting. White space is deliberate. Animations feel like a considered choreography, not a plugin demo. Scroll through it and it should feel like turning pages, not clicking through a funnel.

Reference: collabcapitolium.fr (chapter structure), juanmora.co (scroll-triggered decorative shapes, GSAP + Lenis), Studio375 (preloader, staggered reveals). These are the aesthetic benchmarks, not the typical SaaS landing page.

---

## SECURITY — READ BEFORE TOUCHING ANY CONFIG OR ENV FILE

### What Goes in `.env` (never committed to git)
Nothing for this project. There are no server-side secrets.

**Why:** This is a static Astro site on GitHub Pages. There is no server. All "secrets" are either:
- Public by design (Web3Forms access key — it's visible in HTML source, this is intentional, it's tied to an email address, not a password)
- Handled by third-party services (Cal.com — no key needed for embed)

### What NEVER Gets Committed
The `.gitignore` covers this, but hard rule: never commit:
- `.env` / `.env.local` / `.env.production` / any `.env.*` file
- Any file containing the word `SECRET` or `PRIVATE_KEY` in its name
- `node_modules/`
- `.DS_Store` / `Thumbs.db`
- Any backup folders (they may accidentally become git submodules)
- Editor config files that contain personal paths: `.vscode/settings.json` if it has absolute paths

### Web3Forms Access Key
The Web3Forms `access_key` is placed as a hidden input in the HTML form. It is public — anyone viewing the page source can see it. This is correct and intentional. Web3Forms is designed this way. The key is tied to an email address for spam protection, not a secret credential. Do not attempt to hide it in an env file — on a static site, env vars are baked into the build output anyway.

Protection against abuse:
- Honeypot field (`_gotcha`) blocks most bots
- Web3Forms dashboard allows domain restriction (restrict to the live domain)
- Rate limiting is handled by Web3Forms on their end

### Cal.com
No API key required for a Cal.com booking widget embed. The booking link is public. Embed it directly.

### GitHub Actions
- Use `vars.*` (repository variables) for public-facing values like `PUBLIC_SITE_URL`
- Use `secrets.*` only if a genuine server-side secret is ever added (e.g., a future Supabase service role key)
- Never echo secrets in workflow logs

---

## PERFORMANCE — READ BEFORE BUILDING ANY COMPONENT

Target: Lighthouse 95+ Performance, 100 Accessibility, 100 SEO, 100 Best Practices.

### Images (most impactful rule)
- Format: **WebP only**. Convert before adding to `public/images/`. Use `cwebp` or Squoosh.
- Two sizes for any full-width image: `800w` and `1400w`
- Always use `<picture>` + `<source>` — never Astro's `<Image>` component for images in `public/`
- Always set explicit `width` and `height` attributes — prevents Cumulative Layout Shift (CLS)
- Hero image only: `fetchpriority="high" decoding="sync" loading="eager"`
- Everything else: `loading="lazy"` — no exceptions
- Resize images to their actual display dimensions before adding — don't serve a 3000px image in a 600px container

```html
<!-- Hero image pattern -->
<picture>
  <source type="image/webp"
    srcset="/images/hero-800w.webp 800w, /images/hero-1400w.webp 1400w"
    sizes="100vw" />
  <img src="/images/hero-1400w.webp" alt="..."
    width="1400" height="933"
    fetchpriority="high" decoding="sync" loading="eager" />
</picture>

<!-- All other images -->
<img src="/images/photo-800w.webp" alt="..."
  width="800" height="600" loading="lazy" />
```

### Fonts
- Preconnect hints in `<head>` (before font link tag):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```
- Always append `&display=swap` to the Google Fonts URL — prevents invisible text during load
- Preload the display font (Instrument Serif) since it appears above the fold:
```html
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" />
```

### JavaScript (GSAP + Lenis)
- Load GSAP and Lenis as npm packages (not CDN) — Astro tree-shakes and bundles them optimally
- All animation JS goes in `<script>` tags inside Astro components — Astro deduplicates and defers these automatically
- Never load animation scripts synchronously in `<head>` — this blocks rendering
- Initialise inside `document.addEventListener('DOMContentLoaded', ...)` — ensures DOM is ready

### Astro Config (performance settings to use)
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://yourdomain.com',
  base: '/',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto', // inlines small CSS, saves HTTP round-trips
  },
  vite: {
    build: {
      assetsInlineLimit: 8192,   // inline assets under 8KB
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          entryFileNames: '_astro/[name].[hash].js',
          chunkFileNames: '_astro/[name].[hash].js',
          assetFileNames: '_astro/[name].[hash][extname]',
        },
      },
    },
  },
})
```

### Meta tags (every page needs these — unique per page)
```astro
<!-- In Layout.astro, accept as props -->
<title>{title} | French with Naya</title>
<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={Astro.url} />
<meta property="og:locale" content="en_CA" />
<meta property="og:site_name" content="French with Naya" />
<link rel="canonical" href={new URL(Astro.url.pathname, Astro.site)} />
{noindex && <meta name="robots" content="noindex, nofollow" />}
```

### Core Web Vitals targets
| Metric | Target | Common culprit |
|--------|--------|----------------|
| LCP | < 2.5s | Unoptimised hero image — fix with WebP + fetchpriority |
| CLS | < 0.1 | Images without width/height — fix by always setting dimensions |
| INP | < 200ms | Heavy JS on main thread — fix by deferring animation init |

---

## Styling Rules
- Use inline styles for all component styles
- CSS custom properties (variables) go in `global.css` under `:root`
- Animation keyframes and transition classes go in `Layout.astro` `<style>` block — not global.css
- `max-width: 1200px; margin: 0 auto; padding: 0 clamp(1.5rem, 5vw, 4rem)` on every section wrapper — prevents edge-to-edge stretching

## Animation Rules
- Initialise GSAP inside `document.addEventListener('DOMContentLoaded', () => { ... })`
- Register plugins: `gsap.registerPlugin(ScrollTrigger, SplitText)` before any usage
- Lenis + GSAP: `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))` and `gsap.ticker.lagSmoothing(0)`
- Always respect `prefers-reduced-motion` — wrap animations:
```javascript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReduced) {
  // all GSAP animations here
}
```
- Preloader must fully exit before scroll triggers activate — call `initAnimations()` from the preloader's `onComplete` callback

## Image Rules (summary)
- WebP only, explicit width + height, lazy except hero
- `<picture>` + `<source>` not Astro's Image component
- No spaces in filenames

## Form Rules
- Web3Forms: POST to `https://api.web3forms.com/submit`
- Hidden: `access_key`, `redirect` (points to `/thank-you/`)
- Honeypot: `<input type="text" name="_gotcha">` positioned off-screen with CSS
- Client JS: reject message field content containing `http://`, `https://`, or `www.` before submitting
- iOS fix: `font-size: 16px !important` on all inputs at mobile breakpoint

---

## Clarifying Questions to Ask Before Creating Files
1. GitHub username and repo name (for base path + CNAME)
2. Web3Forms access key (from web3forms.com — enter business email, get key instantly)
3. Cal.com username / booking page URL
4. Business email address (shown in footer)
5. Confirm levels Naya teaches (Beginner / Intermediate / Conversational?)
6. Custom domain name, or use github.io subdomain for now?

---

## File Structure
```
french-website/
├── CLAUDE.md
├── site-description.md
├── prd.md
├── brand.md
├── design-system.md
├── brand-kit/
│   ├── BRAND_KIT.md
│   ├── tokens.css
│   └── images.md
├── public/
│   ├── images/
│   ├── logo-full.svg
│   ├── logo-icon.svg
│   ├── favicon.svg
│   └── CNAME
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── thank-you.astro      (noindex)
│   │   ├── 404.astro            (noindex)
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   └── sitemap.xml.ts       (manual — not the @astrojs/sitemap plugin)
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Preloader.astro
│   │   ├── HeroSection.astro
│   │   ├── ChapterOne.astro
│   │   ├── ChapterTwo.astro     (horizontal scroll + bg color shift)
│   │   ├── ChapterThree.astro   (Meet Naya)
│   │   ├── LevelsSection.astro
│   │   ├── TestimonialsSection.astro
│   │   ├── BookingSection.astro (Cal.com + Web3Forms)
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro         (Lenis, cursor, JSON-LD, skip link, view transitions)
│   └── styles/
│       └── global.css           (CSS custom properties only)
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── astro.config.mjs
└── package.json
```

## Component Build Order
1. `.gitignore` — first file created, before anything else
2. `global.css` — CSS variables
3. `Layout.astro` — Lenis, cursor, skip link, JSON-LD, view transitions, meta props
4. `Preloader.astro` — `bonjour.` animation, calls `initAnimations()`
5. `Navbar.astro` — sticky shrink, mobile hamburger
6. `HeroSection.astro` — SplitText reveal, photo placeholder, single CTA
7. `ChapterOne.astro` — numbered list, batch stagger
8. `ChapterTwo.astro` — GSAP pin + scrub horizontal, bg color shift
9. `ChapterThree.astro` — photo + text reveal, quote
10. `LevelsSection.astro` — tab toggle
11. `TestimonialsSection.astro` — clip-path offset layout
12. `BookingSection.astro` — Cal.com + Web3Forms
13. `Footer.astro`
14. `404.astro` + `thank-you.astro`
15. `privacy.astro` + `terms.astro`
16. `sitemap.xml.ts`
17. `deploy.yml`
18. `astro.config.mjs` — with full Vite performance config

## Content Placeholders (fill before launch)
| Item | Status |
|------|--------|
| Instructor photo | Pending — initials placeholder |
| Testimonials | Pending — placeholder quotes |
| Levels taught | Pending — confirm with Naya |
| Pricing | Pending — decide whether to display |
| Cal.com link | **https://cal.com/naya-831b2r/30min** (30-min consultation) |
| Web3Forms access key | **9007954b-92d1-4aa3-8e94-59e44a056b67** (update domain from localhost to live domain after launch) |
| Business email | Pending |
| GitHub username + repo | Pending |
| Domain name | Pending |
| Logo SVG | Pending — CSS wordmark until provided |
| Tagline (final) | Pending — working: "French that feels like a conversation." |
