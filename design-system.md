# French with Naya — Design System

## Layout

### Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}
```

### Section spacing
```css
.section {
  padding: clamp(5rem, 10vw, 9rem) 0;
}
```

### Grid
- 12-column CSS grid where needed
- Most sections: 2-column split (photo + text, or content + whitespace)
- Mobile: single column, sections stack

### Breakpoints
| Name | Width |
|------|-------|
| Mobile | 375px |
| Tablet | 768px |
| Desktop | 1024px |
| Wide | 1440px |

---

## Spacing Scale
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

---

## Components

### Navbar
- Fixed top, `z-index: 100`
- Default: transparent background
- On scroll (>80px): cream background + subtle box-shadow
- GSAP ScrollTrigger toggleClass or simple JS scroll listener
- Logo left, nav links centre-right, CTA button far right
- Mobile: hamburger (Lucide `Menu` icon), fullscreen overlay nav

```css
.nav-link {
  position: relative;
  font-family: var(--font-body);
  font-size: var(--text-small);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink);
  transition: color 0.2s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1.5px;
  background: var(--color-terracotta);
  transition: width 0.25s ease;
}
.nav-link:hover::after,
.nav-link.active::after { width: 100%; }
```

### Custom Cursor
```css
.cursor {
  position: fixed;
  width: 12px; height: 12px;
  background: var(--color-terracotta);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease;
}
.cursor-ring {
  position: fixed;
  width: 36px; height: 36px;
  border: 1.5px solid var(--color-terracotta);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.18s ease;
  opacity: 0.6;
}
/* Expand on hoverable elements */
a:hover ~ .cursor,
button:hover ~ .cursor { width: 8px; height: 8px; }
```

```javascript
// In Layout.astro <script> — cursor follower
const cursor = document.querySelector('.cursor')
const ring = document.querySelector('.cursor-ring')
let mouseX = 0, mouseY = 0
let ringX = 0, ringY = 0

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  cursor.style.left = mouseX + 'px'
  cursor.style.top = mouseY + 'px'
})

function animateRing() {
  ringX += (mouseX - ringX) * 0.12
  ringY += (mouseY - ringY) * 0.12
  ring.style.left = ringX + 'px'
  ring.style.top = ringY + 'px'
  requestAnimationFrame(animateRing)
}
animateRing()
```

### Buttons

**Primary (terracotta fill):**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.875rem 2rem;
  background: var(--color-terracotta);
  color: #fff;
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(196, 98, 45, 0.3);
  background: #b5561f;
}
```

**Ghost (ink outline):**
```css
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.875rem 2rem;
  background: transparent;
  color: var(--color-ink);
  border: 1.5px solid var(--color-ink);
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.btn-ghost:hover {
  background: var(--color-ink);
  color: var(--color-cream);
  transform: translateY(-2px);
}
```

### Cards (Lesson level cards, testimonials)
- No floating icon in corner
- No gradient background
- Thin border (`1px solid var(--color-border)`) or blush background fill
- Hover: lift `translateY(-4px)` + shadow deepens

```css
.card {
  background: var(--color-blush);
  padding: var(--space-8);
  border-radius: 4px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(28, 25, 23, 0.1);
}
```

### Chapter Labels
```css
.chapter-label {
  font-family: var(--font-body);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-terracotta);
  margin-bottom: var(--space-6);
}
```

### Decorative Background Text
```css
.bg-word {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(8rem, 20vw, 18rem);
  color: var(--color-ink);
  opacity: 0.05;
  pointer-events: none;
  user-select: none;
  position: absolute;
  white-space: nowrap;
  line-height: 1;
}
```

### Form Inputs
```css
.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  background: transparent;
  border: 1.5px solid var(--color-border);
  border-radius: 2px;
  font-family: var(--font-body);
  font-size: 1rem; /* minimum 16px — prevents iOS zoom */
  color: var(--color-ink);
  transition: border-color 0.2s ease;
}
.form-input:focus {
  outline: none;
  border-color: var(--color-terracotta);
}
@media (max-width: 768px) {
  input, textarea, select { font-size: 16px !important; }
}
```

### Skip Link (accessibility)
```css
.skip-link {
  position: absolute;
  top: -48px;
  left: 16px;
  z-index: 1000;
  background: var(--color-terracotta);
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 4px;
  transition: top 0.15s ease;
  text-decoration: none;
}
.skip-link:focus { top: 8px; }
```

---

## Animation Standards

### Easing
```css
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);   /* snappy out — most reveals */
  --ease-in-out: cubic-bezier(0.56, 0, 0.35, 0.98); /* CustomEase "hop" from Barba tutorial */
}
```

### Standard scroll reveal (ScrollTrigger batch)
```javascript
ScrollTrigger.batch("[data-reveal]", {
  onEnter: (batch) => gsap.from(batch, {
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.12
  }),
  once: true
})
```

Add `data-reveal` to any element that should animate in on scroll.

### Clip-path reveal (testimonials, cards)
```javascript
gsap.from(".testimonial", {
  scrollTrigger: { trigger: ".testimonial", start: "top 85%" },
  clipPath: "inset(0 100% 0 0)",
  duration: 0.9,
  ease: "power3.inOut",
  stagger: 0.15
})
```

### Background color shift (horizontal panel)
```javascript
gsap.to("body", {
  backgroundColor: "#2C1810",
  scrollTrigger: {
    trigger: ".chapter-ii",
    scrub: true,
    start: "top 60%",
    end: "bottom 40%"
  }
})
```

### prefers-reduced-motion (global override)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility Checklist
- [ ] All images have descriptive `alt` attributes
- [ ] Form inputs have associated `<label>` elements
- [ ] Buttons have accessible text (not just icons)
- [ ] Focus states visible on all interactive elements
- [ ] Skip link present and functional
- [ ] Text contrast 4.5:1 minimum (WCAG AA)
- [ ] ARIA labels on icon-only buttons (hamburger, close)
- [ ] `<main id="main-content">` on every page

---

## View Transitions (smooth page changes)
```html
<!-- In Layout.astro <head> -->
<style>
  @view-transition { navigation: auto; }
  ::view-transition-old(root) { animation: fade-out 0.2s ease; }
  ::view-transition-new(root) { animation: fade-in 0.2s ease; }
  @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
</style>
```
