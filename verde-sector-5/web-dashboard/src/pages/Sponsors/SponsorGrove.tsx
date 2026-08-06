import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { TreeCareDetails } from '../../components/Pitch/TreeCareDetails';
import { TreeService } from '../../api/treeService';
import { SEED_SPONSORS, SEED_GROVES, SEED_CHALLENGE } from '../../data/gamificationSeedData';
import type { TreeItem } from '../../types/tree';
import { TIER_LABELS } from './Sponsors';
import { Sprout, ArrowLeft, Droplets, Users } from 'lucide-react';
import './Sponsors.css';

const BackToSponsors: React.FC = () => (
  <Link to="/sponsors" className="sponsors-inline-link">
    <ArrowLeft size={15} aria-hidden="true" /> Înapoi la sponsori
  </Link>
);

// Public grove page (spec §4.1), route /sponsors/:slug. Resolves the sponsor
// and grove from seed data (no API round trip needed — sponsor identity here
// is demo-only), then resolves the grove's treeIds against the live tree
// list so care details stay current with what citizens actually logged.
const SponsorGrove: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [loading, setLoading] = useState(true);

  const sponsor = SEED_SPONSORS.find(s => s.slug === slug);
  const grove = sponsor ? SEED_GROVES.find(g => g.sponsorId === sponsor.id) : undefined;

  useEffect(() => {
    if (!grove) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const ids = new Set(grove.treeIds);
    TreeService.getTrees().then(allTrees => {
      if (cancelled) return;
      setTrees(allTrees.filter(t => ids.has(t.id)));
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [grove]);

  if (!sponsor) {
    return (
      <div className="sponsors-root">
        <PitchHeader />
        <main className="sponsors-main">
          <div className="sponsor-empty-state">
            <h1>Sponsor negăsit</h1>
            <p>Acest sponsor demonstrativ nu există sau linkul folosit este greșit.</p>
            <BackToSponsors />
          </div>
        </main>
      </div>
    );
  }

  if (!grove) {
    return (
      <div className="sponsors-root">
        <PitchHeader />
        <main className="sponsors-main">
          <div className="sponsor-empty-state">
            <h1>{sponsor.name} (sponsor demonstrativ)</h1>
            <p>Acest sponsor contribuie la fondul de recompense și nu are încă un crâng dedicat.</p>
            <BackToSponsors />
          </div>
        </main>
      </div>
    );
  }

  const treeCount = trees.length;
  const aliveCount = trees.filter(t => t.healthStatus !== 'DEAD').length;
  const aliveRate = treeCount ? Math.round((aliveCount / treeCount) * 100) : 0;
  const wateringsTotal = trees.reduce((n, t) => n + (t.wateringsCount || 0), 0);

  return (
    <div className="sponsors-root">
      <PitchHeader />
      <main className="sponsors-main">
        <BackToSponsors />

        <header className="grove-header">
          {/* logoSvg is a seed-only literal SVG string from
              gamificationSeedData.ts, never user input — safe to render via
              dangerouslySetInnerHTML. */}
          <span className="sponsor-logo sponsor-logo-lg" dangerouslySetInnerHTML={{ __html: sponsor.logoSvg }} aria-hidden="true" />
          <div>
            <h1>{sponsor.name} (sponsor demonstrativ)</h1>
            <span className={`sponsor-tier tier-${sponsor.tier.toLowerCase()}`}>{TIER_LABELS[sponsor.tier]}</span>
            <p className="sponsor-desc">{sponsor.description}</p>
          </div>
        </header>

        <section className="grove-stats-strip" aria-label="Statistici crâng">
          <div className="grove-stat">
            <span className="grove-stat-value">{treeCount}</span>
            <span className="grove-stat-label">copaci</span>
          </div>
          <div className="grove-stat">
            <span className="grove-stat-value">{aliveRate}%</span>
            <span className="grove-stat-label">vii</span>
          </div>
          <div className="grove-stat">
            <span className="grove-stat-value"><Droplets size={14} aria-hidden="true" /> {wateringsTotal}</span>
            <span className="grove-stat-label">udări totale</span>
          </div>
        </section>

        {sponsor.tier === 'GOLD' && (
          <section className="grove-campaign" aria-label="Campanie sponsorizată">
            <h2><Sprout size={16} aria-hidden="true" /> Campania «{SEED_CHALLENGE.name}» — susținută de {sponsor.name}</h2>
            <p>Zi de voluntariat pentru angajați — înscrieri prin HR.</p>
            <Link to="/community" className="sponsors-inline-link">
              <Users size={15} aria-hidden="true" /> Vezi provocarea în Comunitate
            </Link>
          </section>
        )}

        <section aria-label={`Copacii din ${grove.name}`}>
          <h2 className="grove-tree-list-title">{grove.name}</h2>
          <p className="sponsor-desc">{grove.description}</p>

          {loading ? (
            <p className="sponsors-empty">Se încarcă arborii…</p>
          ) : trees.length === 0 ? (
            <p className="sponsors-empty">Niciun arbore găsit pentru acest crâng.</p>
          ) : (
            <ul className="grove-tree-list">
              {trees.map(t => (
                <li key={t.id} className="grove-tree-row">
                  <div className="grove-tree-meta">
                    <strong>{t.nickname || t.code}</strong>
                    <span>{t.species} · {t.neighborhood}</span>
                  </div>
                  <TreeCareDetails tree={t} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default SponsorGrove;
