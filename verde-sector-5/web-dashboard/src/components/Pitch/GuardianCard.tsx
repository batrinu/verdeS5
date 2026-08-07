import React from 'react';
import { usePresenter } from '../../context/PresenterContext';
import { guardianLevelFor, nextLevelProgress, computeImpact } from '../../utils/treeCare';
import type { TreeItem } from '../../types/tree';
import { Shield, Droplets, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <section className="hig-card app-guardian-card" aria-label="Cardul meu de gardian">
      <header className="app-guardian-header">
        <Shield size={16} aria-hidden="true" />
        <div className="app-guardian-header-text">
          <strong className="hig-headline">{userName}</strong>
          <span className="hig-footnote hig-secondary">{level.title}</span>
        </div>
      </header>

      <div
        className="hig-progress"
        style={{ '--hig-progress': clampedProgress } as React.CSSProperties}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={nextTitle ? `Progres spre ${nextTitle}` : 'Nivel maxim atins'}
      >
        <div />
      </div>

      <div className="hig-list">
        <div className="hig-list-item app-guardian-list-item">
          <span>Progres</span>
          <span className="hig-spacer" />
          <span className="hig-value">
            {nextTitle ? `${lifetimePoints} puncte — încă ${remaining} până la ${nextTitle}` : 'Nivel maxim — mulțumim!'}
          </span>
        </div>
        <div className="hig-list-item app-guardian-list-item">
          <span>Privilegiu</span>
          <span className="hig-spacer" />
          <span className="hig-value">{PRIVILEGES[level.key]}</span>
        </div>
        <div className="hig-list-item app-guardian-list-item">
          <span><Droplets size={13} aria-hidden="true" /> Udări</span>
          <span className="hig-spacer" />
          <span className="hig-value">{userWaterings}</span>
        </div>
        <div className="hig-list-item app-guardian-list-item">
          <span><Coins size={13} aria-hidden="true" /> EcoPuncte</span>
          <span className="hig-spacer" />
          <span className="hig-value">{userPoints}</span>
        </div>
        <Link to="/rewards" className="hig-list-item app-guardian-rewards-link">
          Recompense
          <span className="hig-spacer" />
          <span className="hig-value">→</span>
        </Link>
      </div>
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
    <p className="hig-card app-sector-impact-strip hig-footnote hig-secondary" aria-label="Impact estimat al copacilor afișați">
      🌍 Copacii afișați absorb ~{Math.round(totals.co2)} kg CO₂/an și oferă ~{Math.round(totals.shade)} m² de umbră <em>(estimat)</em>
    </p>
  );
};
