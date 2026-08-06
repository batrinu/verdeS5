import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { usePresenter } from '../../context/PresenterContext';
import { Menu, X, TreePine } from 'lucide-react';

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
    <header className="app-pitch-header" role="banner">
      {/* Brand Header Section — compact field-mode header (accepted live-mode
          variant „Compact de teren", density packed): one line, no subtitle. */}
      <div className="app-pitch-header-top">
        <Link to="/" className="app-pitch-brand" aria-label="Verde în Sectorul 5 - Casă">
          <div className="app-pitch-logo-badge" aria-hidden="true">
            <TreePine size={18} color="var(--hig-tint-contrast)" />
          </div>
          <h1 className="app-pitch-title">
            Verde în Sectorul 5
          </h1>
        </Link>

        {/* Mobile Expand Trigger */}
        <button
          className="app-mobile-menu-trigger"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          aria-expanded={mobileExpanded}
          aria-label="Comută meniul de opțiuni demo"
        >
          {mobileExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Nav & Mobile Collapsible Panel */}
      <div className={`app-pitch-controls-panel ${mobileExpanded ? 'mobile-open' : ''}`}>
        <nav className="app-pitch-nav" aria-label="Navigare principală">
          <Link to="/rewards" className="app-pitch-nav-link" onClick={() => setMobileExpanded(false)}>Recompense</Link>
          <Link to="/community" className="app-pitch-nav-link" onClick={() => setMobileExpanded(false)}>Comunitate</Link>
          <Link to="/sponsors" className="app-pitch-nav-link" onClick={() => setMobileExpanded(false)}>Sponsori</Link>
        </nav>
      </div>

      {/* Presenter-only demo control (accepted live-mode variant „Pastilă demo
          plutitoare"): floating glass pill, bottom-right, out of the product
          chrome entirely. Rendered through a portal to <body> — the header's
          backdrop-filter would otherwise become the containing block for
          position: fixed and pin the pill to the header instead of the
          viewport. Dashboard-only; „P" flips the persona too. */}
      {isDashboard && createPortal(
        <button
          className="hig-glass app-demo-pill"
          onClick={() => setRole(role === 'CITIZEN' ? 'COUNCIL_ADMIN' : 'CITIZEN')}
          aria-label={`Mod prezentare: ${role === 'CITIZEN' ? 'Cetățean' : 'Consiliu Local'} — apasă pentru a comuta (tasta P)`}
          title="Comutator demo (tasta P)"
        >
          <span className={`app-demo-pill-dot ${role === 'CITIZEN' ? 'citizen' : 'council'}`} aria-hidden="true" />
          <span>{role === 'CITIZEN' ? 'Cetățean' : 'Consiliu'}</span>
        </button>,
        document.body
      )}
    </header>
  );
};
