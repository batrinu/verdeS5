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
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e2e8f0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            🏛️ Raport Executiv Consiliul Local Sector 5
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
            Centralizator privind implicarea comunitară și starea coronamentului verde
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          style={{
            backgroundColor: '#059669',
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
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
          }}
        >
          📥 Exportă Raport CSV Consiliu
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534' }}>Rată Adopție Sector 5</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#14532d', marginTop: '4px' }}>{adoptionPercentage}%</div>
          <div style={{ fontSize: '11px', color: '#15803d', marginTop: '2px' }}>{totalAdopted} din {totalTrees} arbori</div>
        </div>

        <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#0369a1' }}>Udări Înregistrate</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0c4a6e', marginTop: '4px' }}>{totalWaterings}</div>
          <div style={{ fontSize: '11px', color: '#0284c7', marginTop: '2px' }}>aprox. {(totalWaterings * 12).toLocaleString()} Litri apă</div>
        </div>

        <div style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#854d0e' }}>Cartier Lider</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#713f12', marginTop: '4px' }}>Cotroceni</div>
          <div style={{ fontSize: '11px', color: '#a16207', marginTop: '2px' }}>17,000 EcoPuncte</div>
        </div>

        <div style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b21a8' }}>Economii Bugetar ADP</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#581c87', marginTop: '4px' }}>€14,200</div>
          <div style={{ fontSize: '11px', color: '#7e22ce', marginTop: '2px' }}>prin voluntariat cetățenesc</div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: '220px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="neighborhood" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip />
            <Bar dataKey="adoptedTrees" name="Arbori Adoptați" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="wateringsCount" name="Udări Înregistrate" fill="#0284c7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
