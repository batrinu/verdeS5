# verdeS5

Civic tree-care platform for Sector 5, Bucharest — deployed pitch demo (Cloudflare
Pages + Workers/D1). Monorepo: backend `verde-sector-5/cloudflare-backend/`, frontend
`verde-sector-5/web-dashboard/`. Deploy runbook + gotchas:
`verde-sector-5/docs/DEVLOG-2026-08-06.md`.

## Design Context

- **Register:** product (app UI — design serves the workflow; pitch polish lives inside product craft)
- **Strategy:** `PRODUCT.md` — users (citizens / council / sponsors), warm civic-tech personality, anti-references (generic gov portal, ESG greenwash, childish gamification), WCAG 2.1 AA
- **Visual system:** `DESIGN.md` — Apple Human Interface Guidelines: `src/styles/hig.css` (verbatim HIG stylesheet, never hand-edited) + `src/styles/app.css` (tint override, app components, shell); single accent tint (light `#1F7A36` / dark `#30D158`, both WCAG AA), system font stack, light + dark themes with adaptive desktop/touch density
- **Principles:** the tree is the hero · evidence over decoration · two audiences one surface · quiet gamification · works in the field
- All UI copy is Romanian; estimates labeled „estimat"; every surface must work offline from seed data.
