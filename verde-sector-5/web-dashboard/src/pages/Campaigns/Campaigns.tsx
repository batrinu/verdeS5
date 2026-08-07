import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { Badge } from '../../components/UI/Badge';
import { Sprout, TreePine, Leaf, Calendar } from 'lucide-react';

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

// Badge component variants (app-badge-success/-info tint green/blue; the
// default variant reads as a quiet neutral tag) — mirrors the old
// status-activa/-finalizata/-in-curand palette without hand-rolled CSS.
const STATUS_BADGE_VARIANT: Record<Campaign['status'], 'success' | 'default' | 'info'> = {
  'Activă': 'success',
  'Finalizată': 'default',
  'În curând': 'info',
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
    <>
      <PitchHeader />
      <div className="app-campaigns-page">
        <header className="app-campaigns-header">
          <h2><TreePine size={20} aria-hidden="true" /> Campanii de Împădurire</h2>
          <p className="hig-secondary">Implică-te activ în creșterea suprafeței verzi a Sectorului 5</p>
        </header>

        <div className="app-campaigns-grid">
          {campaigns.map(campaign => {
            const progressFraction = Math.min(1, campaign.planted / campaign.target);

            return (
              <div key={campaign.id} className="hig-card app-campaign-card">
                <div className="app-campaign-card-header">
                  <span className="app-campaign-icon" aria-hidden="true">{STATUS_ICONS[campaign.status]}</span>
                  <Badge variant={STATUS_BADGE_VARIANT[campaign.status]}>{campaign.status}</Badge>
                </div>

                <h3 className="hig-headline app-campaign-title">{campaign.title}</h3>
                <p className="hig-footnote hig-secondary app-campaign-meta">
                  <Calendar size={13} aria-hidden="true" /> {campaign.dateRange}
                </p>
                <p className="app-campaign-description">{campaign.description}</p>

                <div className="app-campaign-progress">
                  <div className="app-campaign-progress-stats hig-footnote hig-secondary">
                    <span>{campaign.planted} plantați</span>
                    <span>Țintă: {campaign.target}</span>
                  </div>
                  <div className="hig-progress" style={{ '--hig-progress': progressFraction } as React.CSSProperties}>
                    <div />
                  </div>
                </div>

                <button
                  className="hig-button tinted app-campaign-join"
                  onClick={() => navigate('/')}
                  title="Participarea se face din harta live a Dashboard-ului"
                >
                  Participă
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Campaigns;
