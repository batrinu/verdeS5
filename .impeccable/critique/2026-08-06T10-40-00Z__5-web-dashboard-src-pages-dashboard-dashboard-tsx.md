---
target: critique (Dashboard)
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-08-06T10-40-00Z
slug: 5-web-dashboard-src-pages-dashboard-dashboard-tsx
---
# Critique — Verde în Sectorul 5 (Dashboard)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Toasts + "Actualizat Live" + hover states, but no loading/skeleton on initial data; fetch failures are swallowed to console |
| 2 | Match System / Real World | 4 | Romanian throughout, plain language (jargon removed), familiar map/leaderboard/points metaphors |
| 3 | User Control and Freedom | 3 | Modals have X + Cancel + overlay-close, but no Esc-to-close and no undo after logging a watering/adoption |
| 4 | Consistency and Standards | 2 | White task modals inside a dark "Modern Earth Forest" app; inline hardcoded hex mixed with design tokens |
| 5 | Error Prevention | 3 | Liters presets + select controls + server-side validation; nothing destructive to guard |
| 6 | Recognition Rather Than Recall | 4 | Everything visible and labeled; selects, not free recall |
| 7 | Flexibility and Efficiency | 3 | Mobile tabs + quick presets, but no keyboard shortcuts, no Esc, no accelerators |
| 8 | Aesthetic and Minimalist Design | 3 | Clean dashboard, good hierarchy after alignment fix; light modals break the aesthetic |
| 9 | Error Recovery | 2 | API errors never surface to the user; optimistic localStorage fallback hides failures silently |
| 10 | Help and Documentation | 1 | No onboarding, no tooltips (EcoPuncte unexplained), no help affordance |
| **Total** | | **28/40** | **Good (bottom of band)** |

## Anti-Patterns Verdict

**LLM assessment:** Does not read as generic AI slop — it has a committed identity (Modern Earth Forest dark theme, Bricolage Grotesque display, map-first civic layout) and the copy is now plain Romanian. The product-register failure mode here isn't flatness, it's **strangeness without purpose**: tapping a tree on a dark map opens a bright white modal — a jarring theme break that a user fluent in good tools would pause at.

**Deterministic scan (detect.mjs):** 2 warnings.
- `gradient-text` — PitchHeader.css:50, the brand wordmark. Intentional brand identity; acceptable as one deliberate mark (not repeated across the UI).
- `single-font` — index.html:1. **Partial false positive**: the static scan sees only Bricolage referenced in the HTML, but Inter is loaded via the fonts link and drives `--font-family-main` for all body text. Real hierarchy exists.

**Browser evidence:** Contrast audit — **all 8 key text/bg pairs pass WCAG AA** (range 4.76–10.68:1). `:focus-visible` rule present globally. **Tap targets below 44px:** persona toggle "Mod Cetățean / Mod Consiliu Local" (30px), district select (32px), Leaflet zoom (30px).

## Overall Impression

A genuinely well-composed civic PWA with a clear identity and a strong map-first hierarchy. The bones are good and recent fixes (column alignment, alerts feed, mobile modal scroll) paid off. The biggest opportunity is **cohesion**: the dark shell is confident, but the moment a user acts (adopt/water), a white modal drops the user out of the world. Close that seam and add the lightest layer of guidance, and this jumps a full band.

## What's Working

1. **Map-first hierarchy with a balanced right rail.** The 1.2fr/0.8fr split, top-aligned columns, and the alerts feed filling the citizen column read as intentional, not templated.
2. **Semantic, accessible color.** Green = points, blue = waterings, red = alerts — reinforced with icons (not color alone), and every pair clears AA on the dark surface. That's disciplined.
3. **Peak-end emotional beats.** Adoption → certificate, watering → bonus points, and the empty-alerts reassurance ("Toți arborii sunt îngrijiți 🌳") give the flow genuine warmth.

## Priority Issues

**[P1] White modals inside a dark app (Consistency).** Tapping a tree on the dark map opens a `#ffffff` WateringModal / AdoptTreeModal with slate-on-white text — a hard theme break mid-task. **Fix:** re-skin both modals on the Modern Earth Forest tokens (`--bg-surface`, `--color-primary-50`, `--border-color`) exactly like the Council cards already use. **Command:** `/impeccable colorize` (or `polish`).

**[P1] Errors are invisible to the user (Error Recovery).** Failed API calls log to console and silently fall back to localStorage; if a watering doesn't persist, the user is told nothing. **Fix:** a lightweight toast/inline notice on fetch failure ("Nu ne-am putut conecta — datele sunt salvate local"). **Command:** `/impeccable harden`.

**[P2] Below-minimum touch targets (Mobile/A11y).** The persona toggle (30px) and district select (32px) sit under the 44px HIG/WCAG target, on the exact controls a thumb reaches for first. **Fix:** bump control height to ≥44px on mobile. **Command:** `/impeccable adapt`.

**[P2] Zero onboarding or help (First-timer).** EcoPuncte, "adoptă", and especially the "Mod Cetățean / Mod Consiliu Local" toggle are unexplained; a first-time citizen won't know why they'd switch to a council view. **Fix:** a one-line purpose statement / first-run hint and a tooltip on EcoPuncte; consider hiding the council toggle behind a subtler "presenter" affordance. **Command:** `/impeccable onboard`.

**[P3] No Esc / no focus trap on modals (A11y/Efficiency).** Modals close on X and overlay-click but not Escape, and focus isn't trapped inside them. **Fix:** add `keydown` Esc handler + focus trap. **Command:** `/impeccable harden`.

## Persona Red Flags

**Jordan (First-Timer):** No help anywhere. The "Mod Consiliu Local" toggle invites a citizen into an admin view with no explanation. "EcoPuncte" and the adoption concept are undefined. Likely confusion within the first 10 seconds.

**Casey (Distracted Mobile):** Primary controls (persona toggle, district select) are 30–32px — hard to hit one-handed. Map + bottom-sheet + tabs are otherwise thumb-friendly, and modal scroll is now fixed. State persists via localStorage across interruptions (good).

**Sam (Accessibility):** Contrast passes AA everywhere and focus-visible exists (both verified) — a real strength. But modals lack Esc/focus-trap, and map markers are buttons labeled only "Marker" (no tree name/species for a screen reader).

## Minor Observations

- Map markers expose `aria-label="Marker"` — announce the tree name/species/neighborhood instead.
- Council KPI row uses 4 distinct accent hues (green/blue/amber/purple); purposeful but near the edge of decorative — keep an eye on it if more cards are added.
- Dev console throws 6 fetch errors when the local API is down (prod is clean); consider downgrading the fallback log from `error` to `warn`.
- `single-font` detector warning is a false positive but will keep firing; a code comment won't silence it — safe to ignore.

## Questions to Consider

- What would the adopt/water moment feel like if the modal stayed *inside* the dark forest world instead of dropping to white paper?
- Does an ordinary citizen ever need to see "Mod Consiliu Local," or is that a presenter-only affordance that could hide behind a keyboard shortcut?
- If the API is down, what's the honest thing to tell the user — and is silent localStorage fallback helping them or hiding a problem?
