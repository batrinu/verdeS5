import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { Sprout, TreePine, Leaf, Calendar } from 'lucide-react';
import './Campaigns.css';

interface Campaign {
  id: number;
  title: string;
  dateRange: string;
  status: 'Activă' | 'Finalizată' | 'În curând';
  planted: number;
  target: number;
  description: string;
}

// Demo campaign roster (plausible, not seeded from the API — the tree
// registry and its adoption/watering data are the load-bearing evidence;
// these are illustrative civic events on the current pitch timeline).
const mockCampaigns: Campaign[] = [
  {
    id: 1,
    title: 'Augustul Udărilor — provocare de cartier',
    dateRange: '1 Aug - 31 Aug 2026',
    status: 'Activă',
    planted: 68,
    target: 120,
    description: 'O lună întreagă dedicată udării copacilor tineri, cu puncte duble pentru gardienii activi în Rahova și Ferentari.',
  },
  {
    id: 2,
    title: 'Înverzirea Școlii 128',
    dateRange: '10 Mar - 14 Mar 2026',
    status: 'Finalizată',
    planted: 50,
    target: 50,
    description: 'Campanie de plantare a pomilor fructiferi în curtea școlii, alături de elevi.',
  },
  {
    id: 3,
    title: 'Plantări de toamnă pe Mărgeanului',
    dateRange: '12 Oct 2026',
    status: 'În curând',
    planted: 0,
    target: 30,
    description: 'Completăm aliniamentele stradale cu puieți de platan, alături de Primăria Sectorului 5.',
  },
];

const STATUS_ICONS: Record<Campaign['status'], React.ReactNode> = {
  'Activă': <Sprout size={22} aria-hidden="true" />,
  'Finalizată': <TreePine size={22} aria-hidden="true" />,
  'În curând': <Leaf size={22} aria-hidden="true" />,
};

// Campaigns page (demo data — see comment above): read-only overview of
// citywide planting/watering events. Participation itself happens on the
// live map (Dashboard), so „Participă" routes there rather than hosting a
// separate join flow here.
const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCampaigns(mockCampaigns);
  }, []);

  return (
    <div className="campaigns-root">
      <PitchHeader />
      <main className="campaigns-main">
        <header className="campaigns-header">
          <h1><TreePine size={20} aria-hidden="true" /> Campanii de Împădurire</h1>
          <p>Implică-te activ în creșterea suprafeței verzi a Sectorului 5</p>
        </header>

        <div className="campaigns-grid">
          {campaigns.map(campaign => {
            const progressPercent = Math.min(100, Math.round((campaign.planted / campaign.target) * 100));
            const statusClass = campaign.status === 'Activă' ? 'status-activa' : campaign.status === 'Finalizată' ? 'status-finalizata' : 'status-in-curand';

            return (
              <div key={campaign.id} className="campaign-card">
                <div className={`campaign-band ${statusClass}`}>
                  {STATUS_ICONS[campaign.status]}
                  <span className={`status-badge ${statusClass}`}>{campaign.status}</span>
                </div>
                <div className="campaign-content">
                  <h3 className="campaign-title">{campaign.title}</h3>
                  <div className="campaign-date"><Calendar size={13} aria-hidden="true" /> {campaign.dateRange}</div>
                  <p className="campaign-description">{campaign.description}</p>

                  <div className="campaign-progress">
                    <div className="progress-stats">
                      <span>{campaign.planted} plantați</span>
                      <span>Țintă: {campaign.target}</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ transform: `scaleX(${progressPercent / 100})` }} />
                    </div>
                  </div>

                  <div className="campaign-actions">
                    <button
                      className="btn-join"
                      onClick={() => navigate('/')}
                      title="Participarea se face din harta live a Dashboard-ului"
                    >
                      Participă
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Campaigns;
