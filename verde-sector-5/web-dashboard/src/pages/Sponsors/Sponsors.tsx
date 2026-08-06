import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { SEED_SPONSORS } from '../../data/gamificationSeedData';
import { fetchSponsorsApi } from '../../services/gamificationApi';
import type { SponsorItem, SponsorTier } from '../../types/gamification';
import { Handshake, BarChart3 } from 'lucide-react';
import './Sponsors.css';

export const TIER_LABELS: Record<SponsorTier, string> = {
  GOLD: 'Sponsor principal de campanie',
  SILVER: 'Sponsor de crâng',
  BRONZE: 'Contributor la recompense',
};

const TIER_ORDER: SponsorTier[] = ['GOLD', 'SILVER', 'BRONZE'];

const sortByTier = (sponsors: SponsorItem[]): SponsorItem[] =>
  [...sponsors].sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier));

// Logo markup must never come from API-sourced sponsor data — fetchSponsorsApi()
// can replace the rendered sponsor list, and a sponsor's `logoSvg` there is
// either NULL (renders the literal word "null") or an untrusted string that
// would get injected raw via dangerouslySetInnerHTML. Always resolve the SVG
// from the local seed literals instead, matched by id or slug, regardless of
// which list is currently rendered.
export const seedLogoFor = (sponsor: Pick<SponsorItem, 'id' | 'slug'>): string =>
  SEED_SPONSORS.find(seed => seed.id === sponsor.id || seed.slug === sponsor.slug)?.logoSvg ?? '';

// Public tier list (spec §4.1). Local-first: seed sponsors render instantly;
// fetchSponsorsApi() swaps them for live data if the API is reachable.
const Sponsors: React.FC = () => {
  const [sponsors, setSponsors] = useState<SponsorItem[]>(() => sortByTier(SEED_SPONSORS));

  useEffect(() => {
    let cancelled = false;
    fetchSponsorsApi().then(apiSponsors => {
      if (!cancelled && apiSponsors) setSponsors(sortByTier(apiSponsors));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // "(sponsor demonstrativ)" is appended only at a sponsor's first mention on
  // the page. On this page every sponsor renders exactly one card, so this
  // just tags each name once — the Set guards against future duplicate cards.
  const mentioned = new Set<string>();
  const withDemoTag = (name: string): string => {
    if (mentioned.has(name)) return name;
    mentioned.add(name);
    return `${name} (sponsor demonstrativ)`;
  };

  return (
    <div className="sponsors-root">
      <PitchHeader />
      <main className="sponsors-main">
        <header className="sponsors-header">
          <h1><Handshake size={20} aria-hidden="true" /> Partenerii Sectorului Verde</h1>
          <p>Companii și afaceri locale care susțin îngrijirea copacilor din Sectorul 5.</p>
          <Link to="/sponsor-dashboard" className="sponsors-inline-link">
            <BarChart3 size={15} aria-hidden="true" /> Dashboard ESG (demo)
          </Link>
        </header>

        <div className="sponsors-grid">
          {sponsors.map(s => {
            const linkable = s.tier === 'GOLD' || s.tier === 'SILVER';
            const content = (
              <>
                {/* seedLogoFor() resolves this exclusively from the local
                    SEED_SPONSORS literals (never from `s`, which may be
                    API-sourced) — safe to render via dangerouslySetInnerHTML. */}
                <span className="sponsor-logo" dangerouslySetInnerHTML={{ __html: seedLogoFor(s) }} aria-hidden="true" />
                <h3 className="sponsor-name">{withDemoTag(s.name)}</h3>
                <span className={`sponsor-tier tier-${s.tier.toLowerCase()}`}>{TIER_LABELS[s.tier]}</span>
                <p className="sponsor-desc">{s.description}</p>
              </>
            );

            return linkable ? (
              <Link key={s.id} to={`/sponsors/${s.slug}`} className="sponsor-card sponsor-card-link">
                {content}
                <span className="sponsor-card-cta">Vezi crângul →</span>
              </Link>
            ) : (
              <article key={s.id} className="sponsor-card">
                {content}
              </article>
            );
          })}

          <article className="sponsor-card sponsor-cta-card">
            <h3 className="sponsor-name">Devino partener</h3>
            <p className="sponsor-desc">
              Susține îngrijirea copacilor din Sectorul 5 și apari alături de ceilalți parteneri aici.
            </p>
            <a href="mailto:parteneriate@primarie5.ro" className="sponsors-inline-link">
              Devino partener — contactează Primăria Sectorului 5
            </a>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Sponsors;
