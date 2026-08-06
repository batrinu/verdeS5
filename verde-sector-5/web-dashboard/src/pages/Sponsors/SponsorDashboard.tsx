import React, { useEffect, useMemo, useState } from 'react';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { TreeService } from '../../api/treeService';
import { SEED_SPONSORS, SEED_GROVES } from '../../data/gamificationSeedData';
import { computeWaterStatus, waterStatusLabel, computeImpact } from '../../utils/treeCare';
import { TIER_LABELS } from './Sponsors';
import type { TreeItem } from '../../types/tree';
import { BarChart3, Download } from 'lucide-react';
import './Sponsors.css';

// Pure + unit-testable (see src/__tests__/groveStats.test.ts): given a
// grove's trees, aggregates the ESG-facing survival/health/watering/impact
// numbers the dashboard renders and the CSV export re-derives per row.
export function computeGroveStats(trees: TreeItem[]) {
  const aliveCount = trees.filter(t => t.healthStatus !== 'DEAD').length;
  const healthyCount = trees.filter(t => t.healthStatus === 'EXCELLENT' || t.healthStatus === 'GOOD').length;
  const wateringsCount = trees.reduce((n, t) => n + (t.wateringsCount || 0), 0);
  let co2 = 0, shade = 0;
  for (const t of trees) {
    const i = computeImpact(t.species);
    co2 += i.co2KgPerYear; shade += i.shadeM2;
  }
  const pct = (n: number) => (trees.length ? Math.round((n / trees.length) * 100) : 0);
  return {
    treeCount: trees.length,
    aliveCount,
    survivalRate: pct(aliveCount),
    healthyRate: pct(healthyCount),
    wateringsCount,
    co2KgPerYear: Math.round(co2 * 10) / 10,
    shadeM2: Math.round(shade * 10) / 10,
  };
}

const ELIGIBLE_TIERS = new Set(['GOLD', 'SILVER']);

// ESG proof dashboard (spec §4.2): a sponsor-facing view of the trees in
// their grove, with a client-side CSV export for CSRD-style reporting. Demo
// only — the sponsor picker below stands in for real sponsor authentication.
const SponsorDashboard: React.FC = () => {
  const eligibleSponsors = useMemo(
    () => SEED_SPONSORS.filter(s => ELIGIBLE_TIERS.has(s.tier)),
    []
  );
  const [selectedSlug, setSelectedSlug] = useState(eligibleSponsors[0]?.slug ?? '');
  const [allTrees, setAllTrees] = useState<TreeItem[]>([]);

  useEffect(() => {
    TreeService.getTrees().then(setAllTrees);
  }, []);

  const selectedSponsor = eligibleSponsors.find(s => s.slug === selectedSlug);
  const grove = selectedSponsor ? SEED_GROVES.find(g => g.sponsorId === selectedSponsor.id) : undefined;

  const trees = useMemo(() => {
    if (!grove) return [];
    const ids = new Set(grove.treeIds);
    return allTrees.filter(t => ids.has(t.id));
  }, [allTrees, grove]);

  const stats = useMemo(() => computeGroveStats(trees), [trees]);

  const downloadCsv = () => {
    const header = 'treeId,nickname,species,latitude,longitude,healthStatus,wateringsCount,lastWateredAt,photoProofCount,co2KgPerYear';
    const rows = trees.map(t => {
      // Neutralize CSV formula injection (=, +, -, @, tab, CR at the start of
      // a field make Excel/Sheets treat it as a formula) — mirrors the
      // backend's CSV export in cloudflare-backend/src/routes/sponsors.ts.
      const raw = t.nickname ?? '';
      const neutralized = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
      const nickname = `"${neutralized.replace(/"/g, '""')}"`;
      return [t.id, nickname, t.species, t.latitude, t.longitude, t.healthStatus,
        t.wateringsCount || 0, t.lastWateredAt ?? '', t.lastWateredPhotoProof ? 1 : 0,
        computeImpact(t.species).co2KgPerYear].join(',');
    });
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `esg-${selectedSlug}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // "(sponsor demonstrativ)" only at first mention per page: the select's
  // options list every eligible sponsor before the summary section repeats
  // the chosen one, so the Set makes the summary heading render plain.
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
          <h1><BarChart3 size={20} aria-hidden="true" /> Dashboard ESG (demo)</h1>
          <p className="sponsors-pitch-line">Nu vindem certificate de plantare — vindem dovada supraviețuirii.</p>
        </header>

        <div className="esg-controls">
          <label htmlFor="sponsor-select">Alege sponsorul (demo — fără autentificare)</label>
          <select id="sponsor-select" value={selectedSlug} onChange={e => setSelectedSlug(e.target.value)}>
            {eligibleSponsors.map(s => (
              <option key={s.id} value={s.slug}>{withDemoTag(s.name)}</option>
            ))}
          </select>
        </div>

        {!selectedSponsor || !grove ? (
          <p className="sponsors-empty">Niciun sponsor demonstrativ disponibil pentru dashboard-ul ESG.</p>
        ) : (
          <>
            <section className="esg-summary">
              <h2>{selectedSponsor.name} · {grove.name}</h2>
              <span className={`sponsor-tier tier-${selectedSponsor.tier.toLowerCase()}`}>{TIER_LABELS[selectedSponsor.tier]}</span>
            </section>

            <div className="esg-tiles">
              <div className="esg-tile">
                <span className="esg-tile-value">{stats.survivalRate}%</span>
                <span className="esg-tile-label">Rată de supraviețuire</span>
              </div>
              <div className="esg-tile">
                <span className="esg-tile-value">{stats.healthyRate}%</span>
                <span className="esg-tile-label">Copaci sănătoși</span>
              </div>
              <div className="esg-tile">
                <span className="esg-tile-value">{stats.wateringsCount}</span>
                <span className="esg-tile-label">Udări dovedite cu foto</span>
              </div>
              <div className="esg-tile">
                <span className="esg-tile-value">{stats.co2KgPerYear} kg</span>
                <span className="esg-tile-label">CO₂ estimat/an</span>
              </div>
              <div className="esg-tile">
                <span className="esg-tile-value">{stats.shadeM2} m²</span>
                <span className="esg-tile-label">Umbră estimată</span>
              </div>
            </div>

            <button className="esg-csv-btn" onClick={downloadCsv} disabled={trees.length === 0}>
              <Download size={15} aria-hidden="true" /> Export CSV — dovezi pentru raportare (CSRD)
            </button>

            <div className="esg-table-wrap">
              <table className="esg-table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nume</th>
                    <th scope="col">Specie</th>
                    <th scope="col">Status</th>
                    <th scope="col">Udări</th>
                  </tr>
                </thead>
                <tbody>
                  {trees.map(t => (
                    <tr key={t.id}>
                      <td>{t.code}</td>
                      <td>{t.nickname || '—'}</td>
                      <td>{t.species}</td>
                      <td>{waterStatusLabel(computeWaterStatus(t))}</td>
                      <td>{t.wateringsCount || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SponsorDashboard;
