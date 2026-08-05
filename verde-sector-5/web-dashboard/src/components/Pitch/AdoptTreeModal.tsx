import React, { useState } from 'react';
import type { TreeItem } from '../../types/tree';
import { usePresenter } from '../../context/PresenterContext';

interface AdoptTreeModalProps {
  tree: TreeItem | null;
  onClose: () => void;
  onConfirm: (treeId: string, adopterName: string, nickname: string) => void;
}

export const AdoptTreeModal: React.FC<AdoptTreeModalProps> = ({ tree, onClose, onConfirm }) => {
  const { userName } = usePresenter();
  const [adopterNameInput, setAdopterNameInput] = useState(userName);
  const [nicknameInput, setNicknameInput] = useState('');

  if (!tree) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(tree.id, adopterNameInput || 'Cetățean Sector 5', nicknameInput || `Teiul din ${tree.neighborhood}`);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        maxWidth: '440px',
        width: '100%',
        padding: '28px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
            🌱 Adoptă acest Copac
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}
          >
            ✕
          </button>
        </div>

        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>COPAC SELECTAT:</span>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#14532d', marginTop: '2px' }}>
            {tree.species} ({tree.code})
          </div>
          <div style={{ fontSize: '13px', color: '#15803d', marginTop: '2px' }}>
            📍 Cartier: <strong>{tree.neighborhood}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Numele tău (Adoptator)
            </label>
            <input
              type="text"
              value={adopterNameInput}
              onChange={(e) => setAdopterNameInput(e.target.value)}
              placeholder="ex. Elena Popa"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Numele pe care vrei să i-l dai (Poreclă)
            </label>
            <input
              type="text"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              placeholder="ex. Teiul de lângă blocul A2"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
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
                border: '1px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                color: '#475569',
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
                backgroundColor: '#16a34a',
                color: '#ffffff',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
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
