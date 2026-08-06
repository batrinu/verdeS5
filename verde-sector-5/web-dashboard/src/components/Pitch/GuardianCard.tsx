import React from 'react';
import { usePresenter } from '../../context/PresenterContext';
import { guardianLevelFor, nextLevelProgress, computeImpact } from '../../utils/treeCare';
import type { TreeItem } from '../../types/tree';
import { Shield, Droplets, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import './GuardianCard.css';

// „My guardian card" (spec §3.4): level, progress to next, balance, privileges.
const PRIVILEGES: Record<string, string> = {
  PRIETEN: 'Următorul nivel: kit de udare gratuit + instruire',
  GARDIAN: 'Ai dreptul la kit de udare gratuit și instruire',
  SUPER_GARDIAN: 'Împrumut unelte + prioritate la adopția plantărilor noi',
};

export const GuardianCard: React.FC = () => {
  const { userName, userPoints, lifetimePoints, userWaterings } = usePresenter();
  const level = guardianLevelFor(lifetimePoints);
  const { nextTitle, progress } = nextLevelProgress(lifetimePoints);
  const NEXT_THRESHOLD: Record<string, number> = { PRIETEN: 500, GARDIAN: 2000 };
  const remaining = nextTitle ? NEXT_THRESHOLD[level.key] - lifetimePoints : 0;

  return (
    <section className="guardian-card" aria-label="Cardul meu de gardian">
      <header className="guardian-header">
        <Shield size={16} aria-hidden="true" />
        <div>
          <strong>{userName}</strong>
          <span className="guardian-level-title">{level.title}</span>
        </div>
      </header>

      <div
        className="guardian-progress"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={nextTitle ? `Progres spre ${nextTitle}` : 'Nivel maxim atins'}
      >
        <div className="guardian-progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
      <p className="guardian-next">
        {nextTitle ? `${lifetimePoints} puncte — încă ${remaining} până la ${nextTitle}` : 'Nivel maxim — mulțumim!'}
      </p>
      <p className="guardian-privilege">{PRIVILEGES[level.key]}</p>

      <footer className="guardian-stats">
        <span><Droplets size={13} aria-hidden="true" /> {userWaterings} udări</span>
        <span><Coins size={13} aria-hidden="true" /> {userPoints} EcoPuncte</span>
        <Link to="/rewards" className="guardian-rewards-link">Recompense →</Link>
      </footer>
    </section>
  );
};

// Sector-level impact rollup, computed from the visible trees. Demo-grade.
export const SectorImpactStrip: React.FC<{ trees: TreeItem[] }> = ({ trees }) => {
  const totals = trees.reduce(
    (acc, t) => {
      const i = computeImpact(t.species);
      return { co2: acc.co2 + i.co2KgPerYear, shade: acc.shade + i.shadeM2 };
    },
    { co2: 0, shade: 0 }
  );
  return (
    <p className="sector-impact-strip" aria-label="Impact estimat al copacilor afișați">
      🌍 Copacii afișați absorb ~{Math.round(totals.co2)} kg CO₂/an și oferă ~{Math.round(totals.shade)} m² de umbră <em>(estimat)</em>
    </p>
  );
};
