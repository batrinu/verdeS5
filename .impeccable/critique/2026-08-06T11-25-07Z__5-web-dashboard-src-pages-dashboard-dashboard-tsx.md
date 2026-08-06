---
target: critique (Dashboard, re-run)
total_score: 36
p0_count: 0
p1_count: 0
timestamp: 2026-08-06T11-25-07Z
slug: 5-web-dashboard-src-pages-dashboard-dashboard-tsx
---
# Critique (re-run) — Verde în Sectorul 5 (Dashboard)

## Design Health Score

| # | Heuristic | Score | Δ | Key Issue |
|---|-----------|-------|---|-----------|
| 1 | Visibility of System Status | 3 | – | Offline banner + toasts + live badge, but still no loading/skeleton on initial data |
| 2 | Match System / Real World | 4 | – | Plain Romanian, familiar map/leaderboard metaphors |
| 3 | User Control and Freedom | 4 | ▲1 | Esc-to-close, focus restore, X, Cancel, overlay-close all present |
| 4 | Consistency and Standards | 4 | ▲2 | Modals now unified on the dark token system; no more white-modal break |
| 5 | Error Prevention | 3 | – | Liters presets + selects + server-side input validation |
| 6 | Recognition Rather Than Recall | 4 | – | Visible, labeled; hint + EcoPuncte explainer reinforce |
| 7 | Flexibility and Efficiency | 4 | ▲1 | Added "P" presenter shortcut + Esc; presets, mobile tabs |
| 8 | Aesthetic and Minimalist | 4 | ▲1 | Modals cohesive with the shell; presenter control demoted, less noise |
| 9 | Error Recovery | 3 | ▲1 | Persistent offline banner surfaces connection status; write-sync failures still optimistic |
| 10 | Help and Documentation | 3 | ▲2 | Map hint names the primary action, EcoPuncte explained, presenter labelled; no full docs/tour |
| **Total** | | **36/40** | **▲8** | **Excellent** |

## Anti-Patterns Verdict

**LLM assessment:** The one real strangeness from the baseline — a bright white modal dropping out of a dark app — is gone. Tapping a tree now opens a modal that stays inside the Modern Earth Forest world (dark surface, blue water accents, green bonus, amber points), and the map dims behind it. Reads as a cohesive product, not stitched-together parts.

**Deterministic scan (detect.mjs):** 2 warnings, unchanged and both benign — `gradient-text` (the single deliberate brand wordmark) and `single-font` (false positive: Inter is loaded and drives all body text; the static scan only sees Bricolage in the HTML). **No new anti-patterns introduced by the fixes.**

**Browser evidence:** Rendered-contrast audit of the new dark modal — every text pair passes WCAG AA: title 15.75:1, subtitle/labels 5.48–6.43:1, points total 13.42:1, offline banner 8.04:1, map hint 6.8:1. Esc closes the modal and restores focus to the trigger; focus enters the modal on open (focus trap active). Touch targets: persona toggle & district select now 40px desktop / 44px mobile.

## Overall Impression

The two P1s and the surrounding a11y/onboarding gaps are resolved, and the score jumps a full band (28 → 36, "Good" → "Excellent"). The interface now holds its identity through the whole task loop — browse the map, act on a tree, get the certificate — without a visual seam. What remains is genuinely minor polish, not structural.

## What's Working

1. **Cohesive dark task flow.** Modals inherit the shell's tokens; acting on a tree no longer breaks immersion. Contrast holds AA throughout the re-skin.
2. **Real accessibility, verified.** Esc + focus-trap + focus-restore + `role="dialog"`/`aria-modal`, AA contrast everywhere, and ≥44px mobile targets — measured, not assumed.
3. **Honest, quiet onboarding.** The map hint, EcoPuncte explainer, and demoted "Prezentare" control guide a first-timer without shouting; the `P` shortcut serves the live pitch.

## Priority Issues (remaining — all minor)

**[P2] Map markers announce only "Marker" to screen readers.** The one real a11y gap left: each Leaflet marker's `aria-label` is generic. **Fix:** set the label to the tree name/species/neighborhood so Sam can navigate the map. **Command:** `/impeccable harden`.

**[P3] No loading/skeleton on initial data.** Data pops in after fetch with no in-between. **Fix:** skeleton rows for the leaderboard/map while loading. **Command:** `/impeccable polish`.

**[P3] Write-sync failures still silent.** The offline banner covers the read path, but a failed adopt/water sync (optimistic + fire-and-forget) isn't individually surfaced. **Fix:** a small inline confirmation/failure notice on the write action. **Command:** `/impeccable harden`.

## Persona Red Flags (residual)

**Jordan (First-Timer):** Now oriented by the map hint + EcoPuncte explainer + labelled presenter control. Residual: no full tour, but the primary action is discoverable within seconds.

**Casey (Mobile):** Targets ≥44px, modals scroll and are dark, state persists — strong. No residual blockers.

**Sam (A11y):** Contrast AA verified on the dark modals; Esc/focus-trap/focus-restore in place. Residual: generic "Marker" labels on map pins.

## Minor Observations

- `single-font` detector warning will keep firing (false positive) — safe to ignore; a source comment won't silence it.
- Dev console still logs 6 fetch errors when the local API is down (prod is clean); optional `error`→`warn` downgrade.

## Questions to Consider

- Is a loading skeleton worth it here, or does the map's own tile-load already cover the perceived wait?
- Should a failed watering-sync tell the user, given the action still succeeds locally and re-syncs later?
