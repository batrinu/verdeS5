import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { usePresenter } from '../../context/PresenterContext';
import { Menu, X, Shield, TreePine } from 'lucide-react';
import './PitchHeader.css';

export const PitchHeader: React.FC = () => {
  const { role, setRole } = usePresenter();
  const [mobileExpanded, setMobileExpanded] = useState(false);
  // The persona switch only affects the Dashboard; other pages share this
  // header but have no citizen/council split, so the control hides there.
  const isDashboard = useLocation().pathname === '/';

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
      {/* Brand Header Section — compact field-mode header (accepted live-mode
          variant „Compact de teren", density packed): one line, no subtitle. */}
      <div className="pitch-header-top">
        <Link to="/" className="pitch-brand" aria-label="Verde în Sectorul 5 - Casă">
          <div className="pitch-logo-badge" aria-hidden="true">
            <TreePine size={18} color="#ffffff" />
          </div>
          <h1 className="pitch-title-text" style={{ margin: 0, padding: 0 }}>
            Verde în Sectorul 5
          </h1>
        </Link>

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

      {/* Desktop Nav & Mobile Collapsible Panel */}
      <div className={`pitch-controls-panel ${mobileExpanded ? 'mobile-open' : ''}`}>
        <nav className="pitch-nav" aria-label="Navigare principală">
          <Link to="/rewards" className="pitch-nav-link" onClick={() => setMobileExpanded(false)}>Recompense</Link>
          <Link to="/community" className="pitch-nav-link" onClick={() => setMobileExpanded(false)}>Comunitate</Link>
          <Link to="/sponsors" className="pitch-nav-link" onClick={() => setMobileExpanded(false)}>Sponsori</Link>
        </nav>
      </div>

      {/* Presenter-only demo control (accepted live-mode variant „Pastilă demo
          plutitoare"): floating glass pill, bottom-right, out of the product
          chrome entirely. Rendered through a portal to <body> — the header's
          backdrop-filter would otherwise become the containing block for
          position: fixed and pin the pill to the header instead of the
          viewport. Dashboard-only; „P" flips the persona too. */}
      {isDashboard && createPortal(
        <div className="demo-float" role="group" aria-label="Comutator de prezentare (doar demo)">
          <span className="demo-float-tag">Demo</span>
          <div className="role-segmented-switcher" role="tablist" aria-label="Comută rolul prezentării" title="Comutator de prezentare (tasta P)">
            <button role="tab" aria-selected={role === 'CITIZEN'} onClick={() => setRole('CITIZEN')} className={`role-tab-btn ${role === 'CITIZEN' ? 'active-citizen' : ''}`}>
              <Shield size={13} />
              <span>Cetățean</span>
            </button>
            <button role="tab" aria-selected={role === 'COUNCIL_ADMIN'} onClick={() => setRole('COUNCIL_ADMIN')} className={`role-tab-btn ${role === 'COUNCIL_ADMIN' ? 'active-council' : ''}`}>
              <Shield size={13} />
              <span>Consiliu</span>
            </button>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
