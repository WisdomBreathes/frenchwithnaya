# French with Naya — Brand Guidelines

## Brand Personality
Think: a favourite primary school teacher who also happens to be a native-level French speaker. Warm, patient, creative, playful — but also organised and clearly skilled. Parents should feel they're trusting their child to someone exceptional. Kids should feel like sessions are something to look forward to, not a chore.

The brand is personal. It's Naya, not a company. Her name is in the business name for a reason.

## Voice & Tone

### Write for parents
The website visitor is a parent. Every word is addressed to them. They want to know:
- Is Naya good with kids this age?
- Will my child actually learn?
- Will my child enjoy it?
- Can I trust this person?

Answer those four questions in everything we write.

### Rules
- Short sentences. Real words. Never condescending.
- Warm but not saccharine — don't overdo exclamation points
- Specific over vague: "She teaches colours and numbers through songs in the first few sessions" beats "fun, engaging lessons"
- Never: "Elevate your child's French" / "Unlock their potential" / "Seamless learning experience"
- Never: corporate tutoring-centre language ("certified pedagogy", "evidence-based curriculum framework")
- Allowed to be a little playful: *"Spoiler: they'll be counting to ten in French before you know it."*
- Testimonials are from parents, not kids — quote what real parents would say

## Name Usage
- Full: **French with Naya**
- Conversational: **Naya** (in body copy, CTAs — "Book time with Naya", "Meet Naya")
- Never: "FwN", abbreviations, "Naya's French Tutoring Services"

## Tagline
Working: *"Making French the best part of their week."*
Alternative: *"French lessons kids actually look forward to."*
(Finalise with Naya — should reference kids, not the adult learner)

---

## Color Palette

The palette walks the line between "joyful and child-friendly" (so parents imagine their kid will love it) and "considered and sophisticated" (so parents trust the person running it). Not a primary-colour nursery. Not a corporate navy site. Something in between — warm, optimistic, a little unexpected.

### Primary
| Name | Hex | CSS Variable | Use |
|------|-----|--------------|-----|
| Cream | `#FAF7F2` | `--color-cream` | Page background |
| Ink | `#1A1714` | `--color-ink` | Body text, headings |

### Accent
| Name | Hex | CSS Variable | Use |
|------|-----|--------------|-----|
| Marigold | `#E8A020` | `--color-marigold` | Primary CTA, highlights, active states — warm, bright, optimistic |
| Cornflower | `#4A7FC1` | `--color-cornflower` | Secondary accent — the French blue reference, used sparingly |
| Moss | `#5C8B5A` | `--color-moss` | Tertiary accent — growth, progress |

### Supporting
| Name | Hex | CSS Variable | Use |
|------|-----|--------------|-----|
| Peach | `#F2D5B8` | `--color-peach` | Card backgrounds, warm fills, section tints |
| Sky | `#D6E8F5` | `--color-sky` | Light blue fills, subtle section backgrounds |
| Chalk | `#EDEBE5` | `--color-chalk` | Dividers, subtle borders |

### Dark
| Name | Hex | CSS Variable | Use |
|------|-----|--------------|-----|
| Deep | `#1F2937` | `--color-deep` | Dark sections, footer |

### What to Avoid
- No blue-to-purple gradients or purple glows
- No generic teal (#14B8A6)
- No pure white (#FFFFFF) — always cream as background
- No "tutoring app" blue (#3B82F6 saturated flat blue)
- Don't use all three accents at once — marigold is the lead, cornflower is supporting

---

## Typography

The fonts should feel warm and slightly playful without being childish. Parents are the readers, not the kids.

### Fonts
| Role | Family | Weights | Source |
|------|--------|---------|--------|
| Display | [Fraunces](https://fonts.google.com/specimen/Fraunces) | 300, 700 (italic) | Google Fonts |
| Body | [DM Sans](https://fonts.google.com/specimen/DM+Sans) | 400, 500, 600 | Google Fonts |

**Why Fraunces:** An optical serif with a warm, slightly whimsical character — designed to feel friendly, not stiff. Its italic is especially expressive. Used well it reads as "creative educator", not "corporate" or "childish." Completely distinct from the standard Playfair Display everyone uses.

**Why DM Sans:** Clean, readable, friendly at small sizes. Works perfectly at 16px for body copy. Parents will be reading paragraphs — it needs to be legible.

### Preconnect (Layout.astro `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### Scale (fluid using `clamp()`)
| Token | CSS Variable | Value | Use |
|-------|--------------|-------|-----|
| Display | `--text-display` | `clamp(3.5rem, 8vw, 7rem)` | Hero headline |
| H1 | `--text-h1` | `clamp(2.25rem, 4.5vw, 4rem)` | Chapter titles |
| H2 | `--text-h2` | `clamp(1.5rem, 2.5vw, 2.25rem)` | Section headings |
| H3 | `--text-h3` | `clamp(1.125rem, 1.8vw, 1.375rem)` | Card headings |
| Body | `--text-body` | `clamp(1rem, 1.2vw, 1.125rem)` | Paragraph text |
| Small | `--text-small` | `0.875rem` | Captions, labels |
| Label | `--text-label` | `0.75rem` | Uppercase spaced labels |

### Usage Rules
- Fraunces italic for: the preloader word, hero headline, section pull-quotes, decorative background words
- Fraunces regular (light 300) for: large display numbers (01/02/03), chapter labels
- DM Sans for: all body copy, navigation, form labels, buttons, captions
- Labels: uppercase, letter-spacing 0.15em, DM Sans 500
- Never use Fraunces below 24px — it's a display face

---

## Decorative Elements
Large italic Fraunces words used as near-abstract background texture:
- `bonjour.` — preloader
- `merci` — hero or Chapter I
- `au revoir.` — footer background
- Color: `--color-ink` at 4–6% opacity, very large (15–20vw), pointer-events none, not readable text — pure texture

---

## Photography
- Style: Warm, natural light, genuine — a child engaged in something, not posed with a thumbs up
- Naya's photo: to be provided — circular crop in hero and Meet Naya section, warm background preferred
- Placeholder until real photo: initials `N` in a marigold circle
- No stock photos of generic classrooms or anonymous tutors
- If stock needed: Unsplash — search warm indoor scenes, children reading or drawing, natural candid

---

## Iconography
- Library: Lucide SVG (inline, not emoji, not icon font)
- Stroke: 1.5px, rounded linecap
- Size: 20px inline, 24px standalone
- Color: `currentColor` — inherits from parent
- Used sparingly — one icon per context, not as decorative card elements
