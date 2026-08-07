import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { usePresenter } from '../../context/PresenterContext';

export const PitchHeader: React.FC = () => {
  const { role, setRole } = usePresenter();
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
      <h1 className="app-pitch-title">
        Verde în Sectorul 5
      </h1>

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
