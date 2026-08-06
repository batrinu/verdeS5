import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePresenter } from '../../context/PresenterContext';
import { Menu, X, Shield, TreePine } from 'lucide-react';
import './PitchHeader.css';

export const PitchHeader: React.FC = () => {
  const { role, setRole } = usePresenter();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Live-pitch accelerator: press "P" to flip between citizen and council views
  // without reaching for the (deliberately quiet) presenter control.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'p' || e.key === 'P') {
        setRole(role === 'CITIZEN' ? 'COUNCIL_ADMIN' : 'CITIZEN');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [role, setRole]);

  return (
    <header className="pitch-header" role="banner">
      {/* Brand Header Section */}
      <div className="pitch-header-top">
        <a href="/" className="pitch-brand" aria-label="Verde în Sectorul 5 - Casă">
          <div className="pitch-logo-badge" aria-hidden="true">
            <TreePine size={22} color="#ffffff" />
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
        <nav className="pitch-nav" aria-label="Navigare principală">
          <Link to="/rewards" className="pitch-nav-link" onClick={() => setMobileExpanded(false)}>
            Recompense
          </Link>
          <Link to="/community" className="pitch-nav-link" onClick={() => setMobileExpanded(false)}>
            Comunitate
          </Link>
          <Link to="/sponsors" className="pitch-nav-link" onClick={() => setMobileExpanded(false)}>
            Sponsori
          </Link>
        </nav>

        {/* Quiet presenter-only control (demo view switch; shortcut: P) */}
        <div className="presenter-control">
          <span className="presenter-label" title="Comutator de prezentare (tasta P)">Prezentare</span>
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
        </div>
      </div>
    </header>
  );
};
