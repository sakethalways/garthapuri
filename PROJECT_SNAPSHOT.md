# Garthapuri Web Project — Snapshot (2026-03-22)

> Use this file to revert colors, styles, or structure if changes don't work out.

---

## CSS Color Variables (globals.css)

### Light Theme (:root)
| Variable | Value | Description |
|----------|-------|-------------|
| --background | #ded7cc | Cream |
| --foreground | #2c2416 | Dark brown |
| --card | #f5f1e8 | Light cream |
| --card-foreground | #2c2416 | Dark brown |
| --popover | #ded7cc | Cream |
| --popover-foreground | #2c2416 | Dark brown |
| --primary | #8d3c02 | Terracotta/rust |
| --primary-foreground | #ded7cc | Cream |
| --secondary | #d4af37 | Golden yellow |
| --secondary-foreground | #2c2416 | Dark brown |
| --muted | #c9bfb0 | Muted beige |
| --muted-foreground | #5c4a3a | Muted brown |
| --accent | #c84b31 | Rust/orange |
| --accent-foreground | #f5f1e8 | Light cream |
| --destructive | #c84b31 | Rust/orange |
| --destructive-foreground | #f5f1e8 | Light cream |
| --border | #c9bfb0 | Muted beige |
| --input | #f5f1e8 | Light cream |
| --ring | #8d3c02 | Terracotta |
| --radius | 0.25rem | Border radius |

### Dark Theme (.dark)
| Variable | Value | Description |
|----------|-------|-------------|
| --background | #2c2416 | Dark brown |
| --foreground | #ded7cc | Cream |
| --card | #3d3428 | Darker brown |
| --primary | #d4af37 | Golden yellow |
| --primary-foreground | #2c2416 | Dark brown |
| --secondary | #8d3c02 | Terracotta |
| --muted | #5c4a3a | Muted brown |
| --muted-foreground | #a89584 | Light brown |
| --accent | #e89463 | Light rust |
| --border | #5c4a3a | Muted brown |
| --input | #3d3428 | Darker brown |
| --ring | #d4af37 | Golden |

---

## Hardcoded Colors Per File

### page.tsx (Home)
- `#d4af37/20`, `#d4af37/10` — golden gradient in menu highlights section
- `#8d3c02` — logo text color (GARTHAPURI in hero)
- `rgba(141, 60, 2, 0.3)` — box shadow on hover (not currently used)

### about/page.tsx
- `#faf8f5` — light background in gradients
- `#fefdfb` — near-white in gradients
- `#8d3c02` — headings, titles
- `#8d3c02/70` — subtitle opacity
- `#6b5d4f` — muted body text
- `#d4af37/20`, `#d4af37/10` — golden gradient backgrounds/borders

### explore/page.tsx
- `#faf8f5`, `#fefdfb` — gradient backgrounds
- `#8d3c02` — headings, Three.js particle color
- `#8d3c02/70` — subtitle opacity
- `#6b5d4f` — body text

### menu/page.tsx
- No hardcoded colors — all via Tailwind variables (`text-primary`, `bg-card`, etc.)

### layout-client.tsx
- `#8d3c02` — logo text, tagline text

### footer-client.tsx
- No hardcoded colors — uses `bg-primary`, `text-background`

---

## Font Families

| Font | Variable | Usage |
|------|----------|-------|
| Playfair Display | --font-playfair | All headings, titles, buttons |
| Geist | (default sans) | Body text, paragraphs |
| Geist Mono | (default mono) | Technical (minimal) |
| Mandali | --font-mandali | Telugu headings (about page) |
| Noto Sans Telugu | --font-noto-telugu | Telugu body (about page) |

---

## Page Layout Structure

### Home (page.tsx)
1. **Hero Section** — full viewport, chakra + logo + title + subtitle + 2 CTA buttons
   - BG: `bg-gradient-to-b from-background via-background to-card/20`
   - Decorations: threshold image (left), thali (right) — desktop only
2. **Menu Highlights** — chef image, title, dining table with rotating food items + View More
   - BG: `bg-gradient-to-b from-[#d4af37]/20 to-[#d4af37]/10`

### About (about/page.tsx)
1. **Header** — logo + title + subtitle
2. **History Sections** — 6 history cards (Guntur, Buddhist, Satavahanas, etc.)
3. **History Title** — "HISTORY OF GARTHAPURI / ANCIENT NAME OF GUNTUR"
4. **Heritage Elements** — 5 cards grid (Cosmos, Vibrancy, Essence, Permanence, Threshold)
5. **Closing Statement** — tagline + description

### Explore (explore/page.tsx)
1. **Three.js Canvas** — particle background (#8d3c02)
2. **Header** — logo + "THE SOUL OF GARTHAPURI"
3. **Content** — 5 alternating left/right items with images and descriptions
4. **Bottom Text** — closing line

### Menu (menu/page.tsx)
1. **Header** — chef image + "Our Menu" + subtitle
2. **Product Grid** — 2-col mobile, responsive grid, ProductCard components
   - Each card: image carousel (swipeable) + name + subtitle + Order Now button

---

## Navigation (layout-client.tsx)

**Desktop:** Sticky bar → Logo (left) + centered glass nav (Home, Menu, History, About, Contact)
**Mobile:** Logo + hamburger → overlay menu with chakra background, staggered animation

**Nav Order:** Home → Menu → History → About → Contact

---

## Footer (footer-client.tsx)

BG: `bg-primary` (terracotta), text: `text-background` (cream)
Grid: Brand | Location | Contact | (decorative image)
Bottom: tagline + copyright + colour line image

---

## Images Used

| Image | Used In |
|-------|---------|
| /main image.png | Header logo, footer logo |
| /logo name tel.png | Header cycling animation (Telugu) |
| /logo name eng.png | Header cycling animation (English) |
| /engtopb logo.png | Hero section main logo |
| /endsides logo.png | About & Explore page headers |
| /chakra1.png | Mobile menu background |
| /chakra3.png | Hero section rotating chakra |
| /shefimage.png | Menu highlights header, Menu page header |
| /thali.png | Hero section decoration (right, desktop) |
| /threshold image6.png | Hero decoration (left), Explore item |
| /round dining table top.png | Menu highlights dining table |
| /chicken biryani.png | Food carousel item |
| /salad.png | Food carousel item |
| /snacks.png | Food carousel item |
| /sunundalu.png | Food carousel item |
| /Natukodi telugu.jpg.jpeg | Menu page product card (slide 1) |
| /Natukodi 1 telugu.jpg.jpeg | Menu page product card (slide 2) |
| /Sunnundalu telugu.jpg.jpeg | Menu page product card (slide 1) |
| /Sunnundalu 1 telugu.jpg.jpeg | Menu page product card (slide 2) |
| /cosmos wheel image2.png | Explore item |
| /vibrancy image 3.png | Explore item |
| /essence image5.png | Explore item |
| /permanence image4.png | Explore item |
| /footer image.png | Footer decoration |
| /colour line.png | Footer bottom border |
| /favicon.png | Browser favicon |

---

## Animations Summary

### GSAP Animations
| Where | What | Duration | Easing |
|-------|------|----------|--------|
| Hero logo | Scale 0.3→1, fade in | 1s | back.out(1.7) |
| Hero text/buttons | Slide up + fade | 0.7s each, staggered | power3.out |
| Dining table entrance | Scale 0.8→1, fade | 1s (on scroll) | power3.out |
| Food ring rotation | 90° steps, item hover | 0.9s rotate, 1.3s hold | power2.inOut |
| About header | Stagger fade up | 0.8s, 0.15s stagger | power3.out |
| About sections | Fade up on scroll | 0.7s | power3.out |
| Explore items | Alternating slide in | 1.2s | power2.inOut |
| Menu cards | Fade up on scroll | 0.8s, 0.2s stagger | power3.out |
| Mobile menu open | Slide down + stagger items | 0.4s + 0.06s stagger | power3.out / back.out(1.4) |
| Mobile menu close | Reverse slide up | 0.35s | power3.in |

### CSS Animations
| Name | Duration | Use |
|------|----------|-----|
| rotate-slow | 20s | Chakra rotation |
| fade-in-up | 0.6s | General fade effect |
| scale-in | 0.4s | General scale effect |
| cycle-logo-tel / cycle-text-first / cycle-logo-eng / cycle-text-second | 16s (desktop) / 14s (mobile) | Header logo+text cycling |

---

## Key Tailwind Patterns

**Responsive padding:** `px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16`
**Section spacing:** `py-8 sm:py-12 md:py-16 lg:py-20`
**Text scaling:** `text-sm sm:text-base md:text-lg lg:text-xl`
**Font:** `font-['Playfair_Display']` on all headings
**Buttons:** `rounded-full`, primary bg, hover scale-105
**Cards:** `rounded-2xl` or `rounded-xl`, `shadow-md`, `hover:shadow-lg`
**Gradients:** Golden (#d4af37) with low opacity for section backgrounds
