import React from 'react';
import type { DistrictStat, TreeItem } from '../../types/tree';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface CouncilAnalyticsBoardProps {
  stats: DistrictStat[];
  trees: TreeItem[];
}

export const CouncilAnalyticsBoard: React.FC<CouncilAnalyticsBoardProps> = ({ stats, trees }) => {
  const totalTrees = stats.reduce((acc, curr) => acc + curr.totalTrees, 0);
  const totalAdopted = stats.reduce((acc, curr) => acc + curr.adoptedTrees, 0);
  const totalWaterings = stats.reduce((acc, curr) => acc + curr.wateringsCount, 0);
  const adoptionPercentage = Math.round((totalAdopted / (totalTrees || 1)) * 100);

  const handleExportCSV = () => {
    const headers = ['ID', 'Cod Arbore', 'Specie', 'Cartier', 'Stare', 'Status Adoptat', 'Adoptat De', 'Poreclă', 'Ultima Udare'];
    const rows = trees.map(t => [
      t.id,
      t.code,
      t.species,
      t.neighborhood,
      t.healthStatus,
      t.isAdopted ? 'Da' : 'Nu',
      t.adopterName || '-',
      t.nickname || '-',
      t.lastWateredAt ? new Date(t.lastWateredAt).toLocaleString() : '-',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Verde_Sector_5_Raport_Arbori_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      border: '1px solid var(--border-color)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--color-primary-50)', fontFamily: 'var(--font-family-heading)' }}>
            🏛️ Raport Executiv Consiliul Local Sector 5
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Centralizator privind implicarea comunitară și starea coronamentului verde
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          style={{
            backgroundColor: '#1F9D5C',
            color: '#ffffff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(31, 157, 92, 0.25)',
            transition: 'all 0.2s ease',
          }}
        >
          📥 Exportă Raport CSV Consiliu
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'rgba(52, 216, 122, 0.08)', border: '1px solid rgba(52, 216, 122, 0.15)', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary-400)' }}>Rată Adopție Sector 5</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary-50)', marginTop: '4px', fontFamily: 'var(--font-family-heading)' }}>{adoptionPercentage}%</div>
          <div style={{ fontSize: '11px', color: 'var(--color-primary-400)', marginTop: '2px' }}>{totalAdopted} din {totalTrees} arbori</div>
        </div>

        <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8' }}>Udări Înregistrate</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary-50)', marginTop: '4px', fontFamily: 'var(--font-family-heading)' }}>{totalWaterings}</div>
          <div style={{ fontSize: '11px', color: '#38BDF8', marginTop: '2px' }}>aprox. {(totalWaterings * 12).toLocaleString()} Litri apă</div>
        </div>

        <div style={{ backgroundColor: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.15)', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#FBBF24' }}>Cartier Lider</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary-50)', marginTop: '4px', fontFamily: 'var(--font-family-heading)' }}>Cotroceni</div>
          <div style={{ fontSize: '11px', color: '#FBBF24', marginTop: '2px' }}>17,000 EcoPuncte</div>
        </div>

        <div style={{ backgroundColor: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.15)', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#A855F7' }}>Economii Bugetar ADP</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary-50)', marginTop: '4px', fontFamily: 'var(--font-family-heading)' }}>€14,200</div>
          <div style={{ fontSize: '11px', color: '#A855F7', marginTop: '2px' }}>prin voluntariat cetățenesc</div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: '220px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(110, 231, 160, 0.06)" />
            <XAxis dataKey="neighborhood" stroke="var(--color-text-muted)" fontSize={12} />
            <YAxis stroke="var(--color-text-muted)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                color: 'var(--color-primary-50)',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="adoptedTrees" name="Arbori Adoptați" fill="#34D87A" radius={[4, 4, 0, 0]} />
            <Bar dataKey="wateringsCount" name="Udări Înregistrate" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
