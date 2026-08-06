---
name: Verde în Sectorul 5
description: Civic tree-care platform — dark living-green design system for citizens, council and sponsors
colors:
  living-green: "#34D87A"
  living-green-bright: "#6EE7A0"
  living-green-soft: "#86efac"
  living-green-deep: "#1F9D5C"
  living-green-forest: "#1A7A4A"
  forest-night: "#0B1D1A"
  surface: "#112220"
  surface-elevated: "#183029"
  surface-hover: "#1F3B32"
  surface-active: "#26473B"
  text-primary: "#f0fdf4"
  text-secondary: "#bbf7d0"
  text-muted: "#94A3B8"
  ink-inverse: "#0B1D1A"
  danger: "#F87171"
  warning: "#FBBF24"
  success: "#10b981"
  info: "#0EA5E9"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Inter, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Bricolage Grotesque, Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
rounded:
  sm: "0.25rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  full: "9999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "6": "1.5rem"
  "8": "2rem"
  "12": "3rem"
components:
  button-primary:
    backgroundColor: "{colors.living-green}"
    textColor: "{colors.ink-inverse}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  nav-link:
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
    height: "40px"
  nav-link-hover:
    backgroundColor: "#6EE7A01A"
    textColor: "{colors.living-green-bright}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "14px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "8px 14px"
---

# Design System: Verde în Sectorul 5

## 1. Overview

**Creative North Star: "The Night Garden"**

A city park after dark. The whole interface lives in deep forest darkness (Forest
Night, #0B1D1A) and light appears only where life does: Living Green marks care,
activity, and growth — a watered tree, an active guardian, a filling progress bar.
The system is warm civic-tech: credible enough for a council chamber, human enough
that a tree can say „mulțumesc" without breaking register.

This system explicitly rejects the gray bureaucratic municipal portal, corporate
ESG greenwash (stock leaves, vague gradients), and childish gamification (mascots,
confetti). Playfulness is carried by copy and micro-detail, never by clutter.

**Key Characteristics:**
- One dark theme everywhere — no white surfaces, ever (the killed white-modal seam)
- Green is semantic: it means alive/active/cared-for, not decoration
- Tonal depth, quiet shadows, glow reserved for living things
- Romanian voice, plain-language, estimates always labeled „estimat"
- Mobile-first: one hand, bright sun, 44px targets

## 2. Colors

A single green family carries the identity against deep forest neutrals; status
hues are reserved strictly for meaning.

### Primary
- **Living Green** (#34D87A): the color of active care — primary buttons, active
  states, healthy/watered markers, progress fills, the logo gradient anchor
  (#34D87A→#1A7A4A). Bright step **#6EE7A0** for hovers/links, deep steps
  **#1F9D5C/#1A7A4A** for gradients and pressed states.

### Neutral
- **Forest Night** (#0B1D1A): the page itself; body background.
- **Surface ramp** (#112220 → #183029 → #1F3B32 → #26473B): cards, elevated
  panels, hover and active layers — depth without shadows.
- **Text**: primary #f0fdf4 (green-tinted white), secondary #bbf7d0, muted
  #94A3B8 (slate — labels and metadata only, never body copy).
- **Hairlines**: rgba(110,231,160,0.08) — borders are green-tinted whispers.

### Tertiary (status — meaning only, never decoration)
- **Danger** (#F87171): urgent watering, destructive actions.
- **Warning** (#FBBF24): thirsty trees, gold accents for first place / adoption ring.
- **Info** (#0EA5E9): council persona accent (Mod Consiliu).
- **Success** (#10b981): confirmations.

### Named Rules
**The Living Green Rule.** Green always means something is alive, active, or
cared-for. If an element is inert, it does not get green.
**The No-White Rule.** No white backgrounds anywhere — including modals, popups,
and map popups. Every surface comes from the Forest Night ramp.

## 3. Typography

**Display Font:** Bricolage Grotesque (with Inter fallback)
**Body Font:** Inter (system-ui fallback)

**Character:** A warm, slightly characterful grotesque for headings against a
neutral workhorse body — friendly authority; civic but never bureaucratic.

### Hierarchy
- **Display** (700, 2.5rem, 1.15, -0.02em): page titles; `text-wrap: balance`.
- **Headline** (700, 1.5rem, 1.2): section and card titles (Bricolage).
- **Title** (700, ~1.125rem): widget headers, modal titles (Bricolage).
- **Body** (400, 1rem, 1.5): Inter; max measure ~70ch.
- **Label** (700, 12–13px, Bricolage): buttons, nav links, badges. The one
  sanctioned uppercase: tiny presenter/meta labels (9–10px, tracked).

### Named Rules
**The Two-Voices Rule.** Bricolage Grotesque speaks (headings, buttons, labels);
Inter informs (body, data). Never introduce a third family.

## 4. Elevation

Flat by default: depth is tonal, not shadowed. Surfaces step up the Forest Night
ramp (#112220 → #183029 → #1F3B32) as they approach the user; shadows exist
(sm/md/lg) but stay quiet and ambient. The exception is light itself: the green
glow marks living elements, and glass (rgba(11,29,26,0.75) + 12px blur) is
reserved for the sticky header floating over the map.

### Shadow Vocabulary
- **Ambient** (`--shadow-sm/md/lg`): resting cards and modals; barely-there.
- **Life glow** (`0 0 15px rgba(52,216,122,0.25)`): logo badge, active/celebrated
  elements. Never on inert containers.

### Named Rules
**The Glow-Is-Earned Rule.** The green glow appears only on elements representing
life or achievement — never as ambient decoration.

## 5. Components

Grounded and friendly: soft radii, generous targets, calm surfaces, warmth in
micro-detail.

### Buttons
- **Shape:** gently rounded (8px; pills at 9999px for chips/badges)
- **Primary:** Living Green fill (or #34D87A→#1F9D5C gradient for celebratory
  actions like „Revendică"), ink-inverse text, Bricolage 700
- **Hover / Focus:** brighten one green step; focus ring #34D87A with 3px
  rgba(52,216,122,0.15) halo; 150–250ms ease transitions
- **Council variant:** info-blue gradient (#0EA5E9→#0284C7) — persona-scoped only
- **Touch:** ≥40px desktop, ≥44px mobile targets

### Cards / Containers
- **Corner Style:** 12px (lg)
- **Background:** #112220, elevated variants step the ramp
- **Border:** 1px green-tinted hairline; **Shadow:** ambient only
- **Internal Padding:** 14–16px; nested cards are forbidden

### Inputs / Fields
- **Style:** surface background, hairline border, 10–12px radius
- **Focus:** border → Living Green + soft green halo (no browser default ring)

### Navigation
- Sticky glass header; Bricolage 700 13px links, muted → green on hover with a
  10% green wash; collapsible below 900px behind a hamburger (nav only — the
  presenter persona toggle lives outside the menu, Dashboard-only).

### Water-Status Badge (signature)
Pill with 1px colored border and colored text on transparent — status color from
ok #4ade80 / thirsty #FBBF24 / urgent #F87171 / unknown #94A3B8, always paired
with a Romanian text label (color is never the only signal).

### Tree Message (signature)
First-person quote from the tree: italic body text with a 2px Living Green left
hairline and leaf icon — the one sanctioned use of an accent edge, because the
tree is speaking.

## 6. Do's and Don'ts

### Do:
- **Do** keep every surface on the Forest Night ramp — dark modals, dark popups,
  dark map UI (#112220 family), matching the „one dark design language" doctrine.
- **Do** pair every status color with a text label (legend, badge copy).
- **Do** label every estimated number „estimat".
- **Do** honor `prefers-reduced-motion` with instant/crossfade alternatives.
- **Do** keep body text ≥ #bbf7d0 contrast on surfaces (muted slate is for
  metadata only).

### Don't:
- **Don't** build gray bureaucratic forms-and-tables screens — the „generic
  government portal" anti-reference from PRODUCT.md.
- **Don't** use stock leaf imagery or vague green gradients — the „corporate ESG
  greenwash" anti-reference.
- **Don't** add mascots, confetti, or cartoon badges — the „childish gamification"
  anti-reference; celebration is typographic and calm.
- **Don't** put white backgrounds on any surface, including third-party widgets
  (Leaflet popups get the dark treatment).
- **Don't** use glassmorphism beyond the sticky header, or glow on inert elements.
- **Don't** exceed two font families or use gradient text on new elements (the
  brand title's gradient is grandfathered, not a pattern).
