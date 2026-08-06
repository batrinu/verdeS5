import React, { useEffect, useState } from 'react';
import { SEED_CHALLENGE, SEED_SPONSORS } from '../../data/gamificationSeedData';
import { fetchChallengeApi } from '../../services/gamificationApi';
import { Target } from 'lucide-react';

// Seasonal challenge (spec §3.6). Local-first: seed values render immediately,
// live API numbers replace them when reachable.
export const ChallengeWidget: React.FC<{ detailed?: boolean }> = ({ detailed = false }) => {
  const [total, setTotal] = useState<number>(187); // seed demo progress
  const [byNeighborhood, setByNeighborhood] = useState<Array<{ neighborhood: string; count: number }>>([
    { neighborhood: 'Cotroceni', count: 58 },
    { neighborhood: 'Sebastian', count: 47 },
    { neighborhood: 'Izvor', count: 36 },
    { neighborhood: 'Rahova', count: 26 },
    { neighborhood: 'Ferentari', count: 20 },
  ]);

  useEffect(() => {
    fetchChallengeApi().then(data => {
      if (data?.progress) {
        // Demo floor: the live backend is near-empty today, so never let a real
        // count *regress* the pitch below the seed demo's progress/board.
        setTotal(prev => Math.max(prev, data.progress.total));
        if (data.progress.byNeighborhood.length >= byNeighborhood.length) {
          setByNeighborhood(data.progress.byNeighborhood.map(h => ({
            ...h,
            neighborhood: h.neighborhood === h.neighborhood.toUpperCase()
              ? h.neighborhood.charAt(0) + h.neighborhood.slice(1).toLowerCase()
              : h.neighborhood,
          })));
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goal = SEED_CHALLENGE.goal;
  const pct = Math.min(100, Math.round((total / goal) * 100));
  const sponsor = SEED_SPONSORS.find(s => s.id === SEED_CHALLENGE.sponsorId);

  return (
    <section className="hig-card app-challenge-widget" aria-label={`Provocarea: ${SEED_CHALLENGE.name}`}>
      <header className="app-challenge-header">
        <Target size={16} aria-hidden="true" />
        <strong className="hig-subheadline">{SEED_CHALLENGE.name}</strong>
      </header>
      <div
        className="hig-progress"
        style={{ '--hig-progress': pct / 100 } as React.CSSProperties}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div />
      </div>
      <p className="hig-footnote hig-secondary">{total} / {goal} udări în Sectorul 5</p>
      {detailed && (
        <ol className="hig-list app-challenge-hoods">
          {byNeighborhood.map(h => (
            <li key={h.neighborhood} className="hig-list-item">
              <span>{h.neighborhood}</span>
              <span className="hig-spacer" />
              <span className="hig-value">{h.count}</span>
            </li>
          ))}
        </ol>
      )}
      {sponsor && <p className="hig-footnote hig-tertiary">susținut de {sponsor.name} <em>(sponsor demonstrativ)</em></p>}
    </section>
  );
};
