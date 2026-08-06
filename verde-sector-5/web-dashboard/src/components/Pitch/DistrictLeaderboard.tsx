import React from 'react';
import type { DistrictStat } from '../../types/tree';

interface DistrictLeaderboardProps {
  stats: DistrictStat[];
  selectedNeighborhood: string;
  onSelectNeighborhood: (neighborhood: string) => void;
}

export const DistrictLeaderboard: React.FC<DistrictLeaderboardProps> = ({
  stats,
  selectedNeighborhood,
  onSelectNeighborhood,
}) => {
  const sortedStats = [...stats].sort((a, b) => b.ecoPoints - a.ecoPoints);

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div className="hig-card app-leaderboard">
      <div className="app-widget-header">
        <div>
          <h3 className="hig-headline app-widget-title">
            🏆 Clasament Cartiere Sector 5
          </h3>
          <p className="hig-footnote hig-secondary app-widget-subtitle">
            EcoPuncte câștigate prin adopții și udări
          </p>
        </div>
        <span className="hig-tag">
          Actualizat Live
        </span>
      </div>

      <div className="hig-list app-leaderboard-list">
        {sortedStats.map((stat, idx) => {
          const isSelected = selectedNeighborhood.toLowerCase() === stat.neighborhood.toLowerCase();
          const adoptionPct = Math.round((stat.adoptedTrees / stat.totalTrees) * 100);

          return (
            <button
              key={stat.neighborhood}
              className={`hig-list-item ${isSelected ? 'app-list-item-selected' : ''}`}
              onClick={() => onSelectNeighborhood(isSelected ? 'ALL' : stat.neighborhood)}
            >
              <span className="hig-value app-leaderboard-rank">
                {getRankBadge(idx)}
              </span>
              <div>
                <div className="app-leaderboard-name">
                  {stat.neighborhood}
                </div>
                <div className="hig-footnote hig-secondary">
                  {stat.adoptedTrees}/{stat.totalTrees} Arbori Adoptați ({adoptionPct}%)
                </div>
              </div>

              <span className="hig-spacer" />

              <div className="app-leaderboard-stat-group">
                <div className="app-leaderboard-points">
                  {stat.ecoPoints.toLocaleString()} pct
                </div>
                <div className="hig-footnote hig-secondary">
                  💧 {stat.wateringsCount} Udări
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
