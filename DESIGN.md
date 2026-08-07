---
name: Verde în Sectorul 5
description: Civic tree-care platform — Apple Human Interface Guidelines system for citizens, council and sponsors
colors:
  tint-light: "#1F7A36"
  tint-light-contrast: "#FFFFFF"
  tint-dark: "#30D158"
  tint-dark-contrast: "#04250F"
  hig-red: "#FF3B30"
  hig-orange: "#FF9500"
  hig-green: "#34C759"
  bg-light: "#F2F2F7"
  bg-secondary-light: "#FFFFFF"
  bg-dark: "#000000"
  bg-secondary-dark: "#1C1C1E"
  label-light: "rgba(0,0,0,1)"
  label-dark: "rgba(255,255,255,1)"
typography:
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  large-title:
    fontSize: "34px"
    fontWeight: 700
  title1:
    fontSize: "28px"
    fontWeight: 700
  title2:
    fontSize: "22px"
    fontWeight: 700
  title3:
    fontSize: "20px"
    fontWeight: 600
  headline:
    fontSize: "17px"
    fontWeight: 600
  body:
    fontSize: "17px"
    fontWeight: 400
  footnote:
    fontSize: "13px"
    fontWeight: 400
  caption2:
    fontSize: "11px"
    fontWeight: 400
radii:
  sm: "6px"
  md: "10px"
  lg: "12px"
  xl: "16px"
  full: "980px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
components:
  hig-button:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.tint-contrast}"
    rounded: "{radii.md}"
    minHeight: "44px (mobile) / 28px (hig-desktop)"
  hig-card:
    backgroundColor: "{colors.bg-secondary}"
    rounded: "{radii.lg}"
  hig-list-item:
    minHeight: "44px (mobile) / 32px (hig-desktop)"
  hig-sidebar:
    width: "260px"
  hig-navbar:
    minHeight: "52px"
---

# Design System: Verde în Sectorul 5

## 1. Overview

**System: Apple Human Interface Guidelines (full HIG).**

The interface is built on two files, in strict order of authority:

1. `verde-sector-5/web-dashboard/src/styles/hig.css` — a verbatim, drop-in Apple
   HIG stylesheet (design tokens + components, light & dark themes, adaptive
   density). **Never hand-edited.** It is the single source of truth for every
   HIG primitive: colors, type scale, spacing, radii, buttons, fields, lists,
   cards, navbar, sidebar, glass materials, sheets, switches, menus.
2. `verde-sector-5/web-dashboard/src/styles/app.css` — the app layer on top:
   the tint override (Section 1), components hig.css cannot cover — map, tree
   visuals, toasts, the adoption certificate (Section 2), and the shell —
   sidebar/content grid, mobile navbar, tab bar (Section 3). Every app-specific
   rule uses an `app-` prefix and reads its colors/spacing/radii from
   `--hig-*` custom properties; it never hardcodes a hex value or invents a
   spacing/radius number.

All old Night Garden CSS (`index.css`, `App.css`, every per-page `.css` file,
the Bricolage Grotesque + Inter webfont links) has been deleted. The system
font stack is the only font dependency now — the app's only external network
dependency (Google Fonts) is gone, an offline win as well as a visual one.

This system explicitly rejects the gray bureaucratic municipal portal,
corporate ESG greenwash (stock leaves, vague gradients), and childish
gamification (mascots, confetti). Playfulness is carried by copy and
micro-detail, never by chrome.

**Key characteristics:**
- Native Apple look and feel: system font, HIG type scale, HIG spacing/radii,
  standard HIG components (buttons, fields, lists, cards, sheets, navbar,
  sidebar, tab bar, glass materials).
- Light and dark themes, both fully supported, switching automatically with
  the OS (`prefers-color-scheme`) and overridable via `data-theme="light"` /
  `data-theme="dark"` on `<html>`.
- Adaptive density: desktop (mouse/trackpad, wide viewport) gets the tighter
  macOS scale; touch/narrow gets the roomier iOS scale — same markup, one
  class toggle.
- Green is semantic and scoped: the single app tint marks interactive
  elements only. The status palette (green/orange/red) is reserved for
  tree-health states and is never repurposed as decoration.
- Romanian voice, plain-language, estimates always labeled „estimat".
- Mobile-first: one hand, bright sun, ≥44px touch targets.

## 2. Colors

hig.css ships the full iOS/macOS system-color palette (blue, green, indigo,
orange, pink, purple, red, teal, yellow, mint, cyan, brown) plus a six-step
gray ramp and semantic surface/label/fill tokens, each with a light and a dark
value. The app changes exactly one thing in that system: the tint.

### Tint (the app's single accent, WCAG AA verified)
- **Light:** `--hig-tint: #1F7A36` on `--hig-tint-contrast: #FFFFFF` — 5.39:1
  contrast.
- **Dark:** `--hig-tint: #30D158` on `--hig-tint-contrast: #04250F` — 8.14:1
  contrast.

Both pairs exceed WCAG AA (4.5:1) for normal text. The tint drives every
interactive surface: primary buttons, links, active nav/tab states, focus
rings, switches, progress fills, selected states.

### Surfaces
- **Light:** page `#F2F2F7`, cards/list-groups `#FFFFFF`, nested fills
  `#F2F2F7`.
- **Dark:** page `#000000`, cards/list-groups `#1C1C1E`, nested fills
  `#2C2C2E`.
- **Labels:** primary `rgba(0,0,0,1)` / `rgba(255,255,255,1)` in light/dark,
  with secondary/tertiary/quaternary alpha steps for hierarchy — never a
  separate color, always the same label ramped by opacity.
- **Materials:** `.hig-material` / `.hig-glass` — translucent, blurred
  surfaces (system chrome look) used for the sidebar, mobile navbar, tab bar,
  and the presenter demo pill. A `@supports` fallback swaps in a solid
  `--hig-bg-secondary` where `backdrop-filter` is unsupported.

### Status palette (meaning only, never decoration)
`--hig-red` (#FF3B30 light / #FF453A dark), `--hig-orange` (#FF9500 /
#FF9F0A), `--hig-green` (#34C759 / #30D158) — reserved for tree-health and
alert states (thirst level, urgent watering, healthy). These are drawn from
the same HIG system palette as the tint but are a *different* token
(`--hig-red`/`--hig-orange`/`--hig-green`, not `--hig-tint`) so status meaning
and interactivity never collide.

### Named Rules
**The One-Accent Rule.** `--hig-tint` is the only color that signals
"interactive" or "brand." No per-instance hardcoded hex, no second accent
color, anywhere in `app.css` or component markup.
**Green-Is-Health, Not-Decoration Rule.** Green only appears on interactive
elements (via the tint) or on genuine tree-health states (via `--hig-green`).
It is never used as ambient brand decoration.

## 3. Typography

**Font:** the system stack — `-apple-system, BlinkMacSystemFont, "SF Pro
Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Renders as
San Francisco on Apple devices and the platform-native equivalent elsewhere.
Bricolage Grotesque and Inter (and their Google Fonts `<link>` tags) have
been fully removed — this was the app's only external font dependency, so
removing it is also an offline-reliability win.

### Hierarchy (mobile/default scale; desktop scale in §7)
| Token | Size | Weight | Use |
|---|---|---|---|
| `--hig-text-large-title` | 34px | 700 | one per screen, rare |
| `--hig-text-title1` | 28px | 700 | major section titles |
| `--hig-text-title2` | 22px | 700 | section titles |
| `--hig-text-title3` | 20px | 600 | card/empty-state titles |
| `--hig-text-headline` | 17px | 600 | emphasized body, card headers |
| `--hig-text-body` | 17px | 400 | body copy |
| `--hig-text-callout` | 16px | 400 | secondary body |
| `--hig-text-subheadline` | 15px | 400 | form labels |
| `--hig-text-footnote` | 13px | 400 | captions, metadata |
| `--hig-text-caption` / `-caption2` | 12px / 11px | 400 | tab labels, micro-meta |

All body-level text (footnote and up, 13–17px) meets WCAG AA at the system's
label-opacity ramp; caption sizes are reserved for non-essential metadata
(tab bar labels, timestamps), matching Apple's own usage.

### Named Rules
**The Single-Voice Rule.** One font family, one weight ramp (400/500/600/700),
driven entirely by the `--hig-text-*` tokens. No introduced display font, no
gradient text.
**The One-H1 Rule.** Every screen has exactly one `<h1>` — owned by
`PitchHeader`, the slim page header mounted once per route. Page bodies start
their own hierarchy at `<h2>`.

## 4. Elevation & Materials

Flat by default: hig.css uses tonal surface steps (`--hig-bg` →
`--hig-bg-secondary` → `--hig-bg-tertiary`), not shadows, for most depth.
Two real elevation tools exist and are used narrowly:

- **Glass materials** (`.hig-material`, `.hig-glass`): translucent + blurred,
  reserved for persistent navigation chrome — the desktop sidebar, the mobile
  top navbar, the mobile tab bar, and the presenter demo pill. Never on
  content cards.
- **Sheet shadows** (`--hig-shadow-menu`, `--hig-shadow-sheet`): modals and
  menus only.

### Named Rules
**The Chrome-Only-Glass Rule.** Glass/blur marks *navigation chrome*, not
content. If a surface holds page content, it gets a flat `hig-card`/`hig-list`
background, never `hig-glass`.

## 5. Layout & Density

- **Adaptive density.** `<html>` gets a `hig-desktop` class, toggled by a
  `(min-width: 900px) and (pointer: fine)` match — genuine desktop input, not
  just a wide window. `.hig-desktop` scales buttons/fields/list-items/sidebar
  items down to the tighter macOS control heights (28–36px) and text down to
  the macOS type scale; below that breakpoint, or on a touch device, the
  roomier iOS scale and ≥44px targets apply.
- **Shell.** Desktop: `hig-sidebar` (260px, `hig-material`) + content.
  Mobile/narrow: a `hig-navbar` (52px, `hig-material`) on top and a
  `hig-glass` tab bar pinned to the bottom. Mounted once, in `App.tsx`'s
  layout route (`Layout.tsx`) — pages no longer render their own nav.
- **Page pattern.** Every routed page is `PitchHeader` (owns the page's one
  `<h1>` and the presenter demo pill) followed by page content that opens
  with its own `<h2>`. Content lives in `hig-card` or `hig-list` containers;
  page-specific styling lives in `app.css` §2 under `app-` prefixed classes
  that key off `hig-*` component classes for structure/behavior.
- **8pt grid.** All spacing — margins, gaps, padding — comes from
  `--hig-space-1` through `--hig-space-8` (4/8/12/16/20/24/32px). No literal
  pixel spacing outside of documented micro-gap exceptions (2–6px
  icon/label pairs).

## 6. Components

Standard HIG components, used per their hig.css definition; app.css supplies
only what hig.css cannot know about a tree-care app.

- **Buttons** (`hig-button`, `.tinted`, `.gray`, `.plain`, `.destructive`,
  `.small`, `.large`): filled = primary (tint fill, tint-contrast text);
  tinted = secondary (15%-opacity tint fill, tint text). `≥44px` touch
  targets on mobile, `28–36px` on `hig-desktop`.
- **Cards** (`hig-card`): `--hig-bg-secondary` background, `--hig-radius-lg`
  (12px) corners, no border by default — depth is tonal.
- **Lists** (`hig-list` / `hig-list-item`): the workhorse for any repeated
  row — leaderboards, guardian rosters, reward catalogs, sponsor tiers.
- **Fields** (`hig-field`, `hig-form-row`, `hig-switch`): forms across
  Reports, Login, Register, watering/adoption modals.
- **Sheets** (`hig-sheet`): the five modals (adopt, water, alert, report,
  certificate) share one chrome pattern.
- **Navbar / Sidebar / Tab bar**: the app shell, described in §5.
- **Badges / Tags** (`hig-badge`, `hig-tag`): status and category pills —
  always paired with a text label, never color-only.
- **Empty states** (`hig-empty` + `hig-empty-icon` + `hig-empty-title`):
  consistent across every list/board that can be empty.

### App-specific components (app.css §2)
Water-status coloring on the Leaflet map and markers (thirst level →
green/orange/red, drawn from the status palette, not the tint), the
adoption certificate canvas, toast notifications (`hig-material` cards), and
the StatCard/Badge/LoadingSpinner/EmptyState wrappers that give hig.css
primitives a typed React surface.

## 7. The Five HIG Rules (the page-building checklist)

Every page conversion is self-reviewed against these five rules before
landing:

1. **Hierarchy via type and space, not boxes.** Visual hierarchy comes from
   the `--hig-text-*` scale and `--hig-space-*` rhythm — never nested cards,
   never boxes-in-boxes.
2. **One accent.** `--hig-tint` is the only color that means "interactive" or
   "brand." No second accent, no per-instance hex.
3. **8pt grid.** Every spacing value is a `--hig-space-*` token.
4. **13–17px AA text.** Body-level text sits in the footnote-to-body range
   (13–17px) at full label contrast; caption sizes are metadata-only.
5. **≥44px touch targets.** Every interactive control meets the iOS minimum
   on mobile (the `hig-desktop` density reduction is scoped to genuine
   desktop pointer input only).

## 8. Do's and Don'ts

### Do:
- **Do** read every color, spacing, and radius value from a `--hig-*` custom
  property — never a literal hex or pixel number in `app.css` or component
  markup (dynamic `--hig-progress` fractions are the one sanctioned
  exception).
- **Do** keep `hig.css` untouched. App-specific needs go in `app.css`.
- **Do** pair every status color with a text label (legend, badge copy).
- **Do** label every estimated number „estimat".
- **Do** honor `prefers-reduced-motion` (already handled globally by
  `hig.css`).
- **Do** give every screen exactly one `<h1>`, owned by `PitchHeader`.

### Don't:
- **Don't** build gray bureaucratic forms-and-tables screens — the „generic
  government portal" anti-reference from `PRODUCT.md`.
- **Don't** use stock leaf imagery or vague green gradients — the „corporate
  ESG greenwash" anti-reference.
- **Don't** add mascots, confetti, or cartoon badges — the „childish
  gamification" anti-reference; celebration is typographic and calm.
- **Don't** put `hig-glass`/`hig-material` on content surfaces — glass is
  navigation chrome only (sidebar, mobile navbar, tab bar, demo pill).
- **Don't** introduce a second accent color or a display font family.
- **Don't** hand-edit `hig.css` — extend in `app.css` instead.
