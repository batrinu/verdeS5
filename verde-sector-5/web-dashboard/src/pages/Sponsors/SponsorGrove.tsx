import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { TreeCareDetails } from '../../components/Pitch/TreeCareDetails';
import { TreeService } from '../../api/treeService';
import { SEED_SPONSORS, SEED_GROVES, SEED_CHALLENGE } from '../../data/gamificationSeedData';
import type { TreeItem } from '../../types/tree';
import { TIER_LABELS, seedLogoFor } from './Sponsors';
import { Sprout, ArrowLeft, Droplets, Users } from 'lucide-react';
import { StatCard } from '../../components/UI/StatCard';

const BackToSponsors: React.FC = () => (
  <Link to="/sponsors" className="app-inline-link">
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
      <>
        <PitchHeader />
        <div className="app-sponsors-page">
          <div className="hig-card app-sponsor-empty-state">
            <h2>Sponsor negăsit</h2>
            <p className="hig-secondary">Acest sponsor demonstrativ nu există sau linkul folosit este greșit.</p>
            <BackToSponsors />
          </div>
        </div>
      </>
    );
  }

  if (!grove) {
    return (
      <>
        <PitchHeader />
        <div className="app-sponsors-page">
          <div className="hig-card app-sponsor-empty-state">
            <h2>{sponsor.name} (sponsor demonstrativ)</h2>
            <p className="hig-secondary">Acest sponsor contribuie la fondul de recompense și nu are încă un crâng dedicat.</p>
            <BackToSponsors />
          </div>
        </div>
      </>
    );
  }

  const treeCount = trees.length;
  const aliveCount = trees.filter(t => t.healthStatus !== 'DEAD').length;
  const aliveRate = treeCount ? Math.round((aliveCount / treeCount) * 100) : 0;
  const wateringsTotal = trees.reduce((n, t) => n + (t.wateringsCount || 0), 0);

  return (
    <>
      <PitchHeader />
      <div className="app-sponsors-page">
        <BackToSponsors />

        <header className="app-grove-header">
          {/* seedLogoFor() resolves this exclusively from the local
              SEED_SPONSORS literals (never from API-sourced sponsor data) —
              safe to render via dangerouslySetInnerHTML. */}
          <span className="app-sponsor-logo app-sponsor-logo-lg" dangerouslySetInnerHTML={{ __html: seedLogoFor(sponsor) }} aria-hidden="true" />
          <div>
            <h2>{sponsor.name} (sponsor demonstrativ)</h2>
            <span className="hig-tag app-sponsor-tier">{TIER_LABELS[sponsor.tier]}</span>
            <p className="hig-footnote hig-secondary app-sponsor-desc">{sponsor.description}</p>
          </div>
        </header>

        <section className="app-grove-stats-strip" aria-label="Statistici crâng">
          <StatCard title="copaci" value={treeCount} />
          <StatCard title="vii" value={`${aliveRate}%`} />
          <StatCard title="udări totale" value={wateringsTotal} icon={<Droplets size={18} aria-hidden="true" />} />
        </section>

        {sponsor.tier === 'GOLD' && (
          <section className="hig-card app-grove-campaign" aria-label="Campanie sponsorizată">
            <h3 className="hig-headline"><Sprout size={16} aria-hidden="true" /> Campania «{SEED_CHALLENGE.name}» — susținută de {sponsor.name}</h3>
            <p className="hig-footnote hig-secondary">Zi de voluntariat pentru angajați — înscrieri prin HR.</p>
            <Link to="/community" className="app-inline-link">
              <Users size={15} aria-hidden="true" /> Vezi provocarea în Comunitate
            </Link>
          </section>
        )}

        <section aria-label={`Copacii din ${grove.name}`}>
          <h3 className="hig-headline app-grove-tree-list-title">{grove.name}</h3>
          <p className="hig-footnote hig-secondary app-sponsor-desc">{grove.description}</p>

          {loading ? (
            <p className="hig-footnote hig-secondary app-sponsors-empty">Se încarcă arborii…</p>
          ) : trees.length === 0 ? (
            <div className="hig-empty">
              <Sprout className="hig-empty-icon" size={44} aria-hidden="true" />
              <div className="hig-empty-title">Niciun arbore găsit pentru acest crâng.</div>
            </div>
          ) : (
            <ul className="app-grove-tree-grid">
              {trees.map(t => (
                <li key={t.id} className="hig-card app-grove-tree-cell">
                  <div className="app-grove-tree-meta">
                    <strong className="hig-headline">{t.nickname || t.code}</strong>
                    <span className="hig-footnote hig-secondary">{t.species} · {t.neighborhood}</span>
                  </div>
                  <TreeCareDetails tree={t} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default SponsorGrove;
