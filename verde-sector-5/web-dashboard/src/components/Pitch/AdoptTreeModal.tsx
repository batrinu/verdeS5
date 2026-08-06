import React, { useState } from 'react';
import type { TreeItem } from '../../types/tree';
import { usePresenter } from '../../context/PresenterContext';
import { useModalA11y } from '../../hooks/useModalA11y';

interface AdoptTreeModalProps {
  tree: TreeItem | null;
  onClose: () => void;
  onConfirm: (treeId: string, adopterName: string, nickname: string) => void;
}

export const AdoptTreeModal: React.FC<AdoptTreeModalProps> = ({ tree, onClose, onConfirm }) => {
  const { userName } = usePresenter();
  const [adopterNameInput, setAdopterNameInput] = useState(userName);
  const [nicknameInput, setNicknameInput] = useState('');
  const dialogRef = useModalA11y<HTMLDivElement>(onClose);

  if (!tree) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(tree.id, adopterNameInput || 'Cetățean Sector 5', nicknameInput || `Teiul din ${tree.neighborhood}`);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface-elevated)',
    color: 'var(--color-primary-50)',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(6, 16, 14, 0.72)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 'max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom))',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Adoptă acest copac"
        tabIndex={-1}
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: '20px',
          maxWidth: '440px',
          width: '100%',
          margin: 'auto',
          padding: '28px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          outline: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-50)', fontFamily: 'var(--font-family-heading)' }}>
            🌱 Adoptă acest Copac
          </h3>
          <button
            onClick={onClose}
            aria-label="Închide"
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ backgroundColor: 'rgba(52, 216, 122, 0.08)', border: '1px solid rgba(52, 216, 122, 0.15)', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-primary-400)', fontWeight: 600 }}>COPAC SELECTAT:</span>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-50)', marginTop: '2px' }}>
            {tree.species} ({tree.code})
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-primary-400)', marginTop: '2px' }}>
            📍 Cartier: <strong>{tree.neighborhood}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
              Numele tău (Adoptator)
            </label>
            <input
              type="text"
              value={adopterNameInput}
              onChange={(e) => setAdopterNameInput(e.target.value)}
              placeholder="ex. Elena Popa"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
              Numele pe care vrei să i-l dai (Poreclă)
            </label>
            <input
              type="text"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              placeholder="ex. Teiul de lângă blocul A2"
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface-elevated)',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Renunță
            </button>

            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: 'var(--color-primary-500)',
                color: 'var(--color-text-inverse)',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(52, 216, 122, 0.3)',
              }}
            >
              Confirmă Adopția 🌟
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
