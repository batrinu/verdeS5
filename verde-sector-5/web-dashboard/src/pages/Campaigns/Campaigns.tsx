import React, { useState, useEffect } from 'react';
import './Campaigns.css';

const mockCampaigns = [
  { 
    id: 1, 
    title: 'Plantare în Parcul Sebastian', 
    dateRange: '15 Nov - 20 Nov 2023',
    status: 'Activă',
    planted: 45,
    target: 100,
    description: 'Vino să ne ajuți să plantăm 100 de copaci noi în Parcul Sebastian. Oferim unelte și mănuși.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80'
  },
  { 
    id: 2, 
    title: 'Înverzirea Școlii 128', 
    dateRange: '01 Oct - 05 Oct 2023',
    status: 'Finalizată',
    planted: 50,
    target: 50,
    description: 'Campanie de plantare a pomilor fructiferi în curtea școlii, alături de elevi.',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=500&q=80'
  },
  { 
    id: 3, 
    title: 'Toamna Verde pe Mărgeanului', 
    dateRange: '10 Dec 2023',
    status: 'În curând',
    planted: 0,
    target: 30,
    description: 'Completăm aliniamentele stradale cu puieți de platan.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=500&q=80'
  }
];

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    setCampaigns(mockCampaigns);
  }, []);

  return (
    <div className="campaigns-container">
      <div className="campaigns-header">
        <h1>Campanii de Împădurire</h1>
        <p>Implică-te activ în creșterea suprafeței verzi a Sectorului 5</p>
      </div>

      <div className="campaigns-grid">
        {campaigns.map(campaign => {
          const progressPercent = Math.round((campaign.planted / campaign.target) * 100);
          
          return (
            <div key={campaign.id} className="campaign-card fade-in">
              <div className="campaign-image" style={{ backgroundImage: `url(${campaign.image})` }}>
                <span className={`status-badge status-${campaign.status.toLowerCase().replace(' ', '-')}`}>
                  {campaign.status}
                </span>
              </div>
              <div className="campaign-content">
                <h3 className="campaign-title">{campaign.title}</h3>
                <div className="campaign-date">📅 {campaign.dateRange}</div>
                <p className="campaign-description">{campaign.description}</p>
                
                <div className="campaign-progress">
                  <div className="progress-stats">
                    <span>{campaign.planted} plantați</span>
                    <span>Țintă: {campaign.target}</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>

                <div className="campaign-actions">
                  {campaign.status === 'Activă' || campaign.status === 'În curând' ? (
                    <button className="btn-join">Participă</button>
                  ) : (
                    <button className="btn-completed" disabled>Finalizată</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Campaigns;
