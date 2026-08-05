import React, { useState } from 'react';
import type { TreeItem } from '../../types/tree';
import { usePresenter } from '../../context/PresenterContext';

interface LogWateringModalProps {
  tree: TreeItem | null;
  onClose: () => void;
  onConfirm: (treeId: string, liters: number, userName: string) => void;
}

export const LogWateringModal: React.FC<LogWateringModalProps> = ({ tree, onClose, onConfirm }) => {
  const { userName } = usePresenter();
  const [liters, setLiters] = useState<number>(10);

  if (!tree) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(tree.id, liters, userName);
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
            💧 Înregistrează Udarea Copacului
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}
          >
            ✕
          </button>
        </div>

        <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '12px', color: '#0369a1', fontWeight: 600 }}>COPAC SELECTAT:</span>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0c4a6e', marginTop: '2px' }}>
            {tree.nickname || tree.species} ({tree.code})
          </div>
          <div style={{ fontSize: '13px', color: '#0284c7', marginTop: '2px' }}>
            📍 Cartier: <strong>{tree.neighborhood}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '10px' }}>
              Cantitate udare (Litri de apă)
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[10, 15, 20].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setLiters(amt)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: liters === amt ? '2px solid #0284c7' : '1px solid #cbd5e1',
                    backgroundColor: liters === amt ? '#e0f2fe' : '#ffffff',
                    color: liters === amt ? '#0369a1' : '#475569',
                    fontWeight: 700,
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                >
                  💧 {amt} Litri
                </button>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#f8fafc', border: '1px border-dashed #cbd5e1', padding: '12px', borderRadius: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                📷 Dovadă foto udare (Simulare R2 Upload)
              </span>
              <span style={{ fontSize: '11px', backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                Încărcat ✓
              </span>
            </div>
          </div>

          <div style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a', padding: '12px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🏆</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#713f12' }}>Câștigi +50 EcoPuncte!</div>
              <div style={{ fontSize: '11px', color: '#854d0e' }}>Contribui la clasamentul cartierului {tree.neighborhood}</div>
            </div>
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
              Anulează
            </button>

            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
              }}
            >
              Salvează Udarea 💧
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
