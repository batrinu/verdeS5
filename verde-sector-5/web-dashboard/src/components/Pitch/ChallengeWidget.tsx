import React, { useEffect, useState } from 'react';
import { SEED_CHALLENGE, SEED_SPONSORS } from '../../data/gamificationSeedData';
import { fetchChallengeApi } from '../../services/gamificationApi';
import { Target } from 'lucide-react';
import './GuardianCard.css';

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
        setTotal(data.progress.total);
        if (data.progress.byNeighborhood.length > 0) setByNeighborhood(data.progress.byNeighborhood);
      }
    });
  }, []);

  const goal = SEED_CHALLENGE.goal;
  const pct = Math.min(100, Math.round((total / goal) * 100));
  const sponsor = SEED_SPONSORS.find(s => s.id === SEED_CHALLENGE.sponsorId);

  return (
    <section className="challenge-widget" aria-label={`Provocarea: ${SEED_CHALLENGE.name}`}>
      <header className="challenge-header">
        <Target size={16} aria-hidden="true" />
        <strong>{SEED_CHALLENGE.name}</strong>
      </header>
      <div className="challenge-progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="challenge-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <p className="challenge-numbers">{total} / {goal} udări în Sectorul 5</p>
      {detailed && (
        <ol className="challenge-hoods">
          {byNeighborhood.map(h => (
            <li key={h.neighborhood}><span>{h.neighborhood}</span><span>{h.count}</span></li>
          ))}
        </ol>
      )}
      {sponsor && <p className="challenge-sponsor">susținut de {sponsor.name} <em>(sponsor demonstrativ)</em></p>}
    </section>
  );
};
