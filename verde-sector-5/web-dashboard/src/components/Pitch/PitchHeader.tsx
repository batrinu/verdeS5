import React, { useState } from 'react';
import { usePresenter } from '../../context/PresenterContext';
import { Menu, X, Trophy, Droplets, MapPin, Shield } from 'lucide-react';
import './PitchHeader.css';

export const PitchHeader: React.FC = () => {
  const {
    role,
    setRole,
    selectedNeighborhood,
    setSelectedNeighborhood,
    userPoints,
    userWaterings,
  } = usePresenter();

  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <header className="pitch-header" role="banner">
      {/* Brand Header Section */}
      <div className="pitch-header-top">
        <a href="/" className="pitch-brand" aria-label="Verde în Sectorul 5 - Casă">
          <div className="pitch-logo-badge" aria-hidden="true">
            🌿
          </div>
          <div>
            <h1 className="pitch-title-text" style={{ margin: 0, padding: 0 }}>
              Verde în Sectorul 5
            </h1>
            <div className="pitch-subtitle-text">
              Platformă Comunitară & Registrul Spațiilor Verzi
            </div>
          </div>
        </a>

        {/* Mobile Expand Trigger */}
        <button
          className="mobile-menu-trigger"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          aria-expanded={mobileExpanded}
          aria-label="Comută meniul de opțiuni demo"
        >
          {mobileExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Controls & Mobile Collapsible Panel */}
      <div className={`pitch-controls-panel ${mobileExpanded ? 'mobile-open' : ''}`}>
        {/* District Selector */}
        <div className="district-selector-group">
          <MapPin size={16} color="#94a3b8" />
          <label htmlFor="district-select" className="district-label">
            Cartier:
          </label>
          <select
            id="district-select"
            className="district-select-input"
            value={selectedNeighborhood}
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
            aria-label="Selectează cartierul din Sectorul 5"
          >
            <option value="ALL">Toate Cartierele (Sector 5)</option>
            <option value="Cotroceni">Cotroceni</option>
            <option value="Rahova">Rahova</option>
            <option value="Ferentari">Ferentari</option>
            <option value="Sebastian">Sebastian</option>
            <option value="Izvor">Izvor</option>
          </select>
        </div>

        {/* Segmented Presenter Role Switcher */}
        <div className="role-segmented-switcher" role="tablist" aria-label="Comută rolul prezentării">
          <button
            role="tab"
            aria-selected={role === 'CITIZEN'}
            onClick={() => setRole('CITIZEN')}
            className={`role-tab-btn ${role === 'CITIZEN' ? 'active-citizen' : ''}`}
          >
            <Shield size={14} />
            <span>Mod Cetățean</span>
          </button>

          <button
            role="tab"
            aria-selected={role === 'COUNCIL_ADMIN'}
            onClick={() => setRole('COUNCIL_ADMIN')}
            className={`role-tab-btn ${role === 'COUNCIL_ADMIN' ? 'active-council' : ''}`}
          >
            <Shield size={14} />
            <span>Mod Consiliu Local</span>
          </button>
        </div>

        {/* Live Eco Ticker */}
        <div className="pitch-ticker-group">
          <div className="ticker-badge ticker-eco" title="Puncte ecologice acumulate prin îngrijirea arborilor">
            <span className="pulse-dot" aria-hidden="true" />
            <Trophy size={15} color="#4ade80" />
            <span>{userPoints} EcoPuncte</span>
          </div>

          <div className="ticker-badge ticker-water" title="Numărul total de udări înregistrate">
            <Droplets size={15} color="#38bdf8" />
            <span>{userWaterings} Udări Logate</span>
          </div>
        </div>
      </div>
    </header>
  );
};
