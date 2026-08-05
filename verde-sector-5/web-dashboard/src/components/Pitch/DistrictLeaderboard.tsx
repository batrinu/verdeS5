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
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      border: '1px solid #f1f5f9',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🏆 Clasament Cartiere Sector 5
        </h3>
        <span style={{ fontSize: '11px', backgroundColor: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>
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
                backgroundColor: isSelected ? '#f0fdf4' : '#f8fafc',
                border: isSelected ? '1.5px solid #22c55e' : '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, width: '28px', textAlign: 'center' }}>
                  {getRankBadge(idx)}
                </span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                    {stat.neighborhood}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    {stat.adoptedTrees}/{stat.totalTrees} Arbori Adoptați ({adoptionPct}%)
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#15803d' }}>
                  {stat.ecoPoints.toLocaleString()} pct
                </div>
                <div style={{ fontSize: '11px', color: '#0284c7', marginTop: '2px' }}>
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
