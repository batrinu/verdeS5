import React from 'react';
import type { DistrictStat, TreeItem } from '../../types/tree';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { StatCard } from '../UI/StatCard';

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
    <div className="hig-card app-analytics-board">
      <div className="app-widget-header">
        <div>
          <h3 className="hig-headline app-widget-title">
            🏛️ Raport Executiv Consiliul Local Sector 5
          </h3>
          <p className="hig-footnote hig-secondary app-widget-subtitle">
            Centralizator privind implicarea comunitară și starea coronamentului verde
          </p>
        </div>

        <button onClick={handleExportCSV} className="hig-button">
          📥 Exportă Raport CSV Consiliu
        </button>
      </div>

      {/* KPI Cards */}
      <div className="app-kpi-grid">
        <StatCard title="Rată Adopție Sector 5" value={`${adoptionPercentage}%`} description={`${totalAdopted} din ${totalTrees} arbori`} />
        <StatCard title="Udări Înregistrate" value={totalWaterings} description={`aprox. ${(totalWaterings * 12).toLocaleString()} Litri apă`} />
        <StatCard title="Cartier Lider" value="Cotroceni" description="17,000 EcoPuncte" />
        <StatCard title="Economii Bugetar ADP" value="€14,200" description="prin voluntariat cetățenesc" />
      </div>

      {/* Chart */}
      <div className="app-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--hig-separator)" />
            <XAxis dataKey="neighborhood" stroke="var(--hig-label-secondary)" fontSize={12} />
            <YAxis stroke="var(--hig-label-secondary)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--hig-bg-secondary)',
                border: 'none',
                borderRadius: 'var(--hig-radius-md)',
                color: 'var(--hig-label)',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="adoptedTrees" name="Arbori Adoptați" fill="var(--hig-tint)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="wateringsCount" name="Udări Înregistrate" fill="var(--hig-gray3)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
