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
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      border: '1px solid var(--border-color)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', gap: '8px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-50)', fontFamily: 'var(--font-family-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏆 Clasament Cartiere Sector 5
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            EcoPuncte câștigate prin adopții și udări
          </p>
        </div>
        <span style={{ flexShrink: 0, fontSize: '11px', backgroundColor: 'rgba(52, 216, 122, 0.1)', color: 'var(--color-primary-400)', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>
          Actualizat Live
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sortedStats.map((stat, idx) => {
          const isSelected = selectedNeighborhood.toLowerCase() === stat.neighborhood.toLowerCase();
          const adoptionPct = Math.round((stat.adoptedTrees / stat.totalTrees) * 100);

          return (
            <div
              key={stat.neighborhood}
              onClick={() => onSelectNeighborhood(isSelected ? 'ALL' : stat.neighborhood)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                backgroundColor: isSelected ? 'rgba(52, 216, 122, 0.08)' : 'var(--bg-surface-elevated)',
                border: isSelected ? '1.5px solid var(--color-primary-500)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, width: '28px', textAlign: 'center' }}>
                  {getRankBadge(idx)}
                </span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary-50)' }}>
                    {stat.neighborhood}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {stat.adoptedTrees}/{stat.totalTrees} Arbori Adoptați ({adoptionPct}%)
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary-400)' }}>
                  {stat.ecoPoints.toLocaleString()} pct
                </div>
                <div style={{ fontSize: '11px', color: '#38BDF8', marginTop: '2px' }}>
                  💧 {stat.wateringsCount} Udări
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
