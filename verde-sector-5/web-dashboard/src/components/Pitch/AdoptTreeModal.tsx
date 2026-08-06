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

  return (
    <>
      <div className="hig-scrim" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Adoptă acest copac"
        tabIndex={-1}
        className="hig-sheet app-sheet-scroll"
      >
        <div className="app-sheet-header">
          <h3>🌱 Adoptă acest Copac</h3>
          <button onClick={onClose} aria-label="Închide" className="app-sheet-close">
            ✕
          </button>
        </div>

        <div className="app-sheet-tree-card">
          <span className="app-sheet-tree-card-label">COPAC SELECTAT:</span>
          <div className="app-sheet-tree-card-name">
            {tree.species} ({tree.code})
          </div>
          <div className="hig-footnote hig-secondary">
            📍 Cartier: <strong>{tree.neighborhood}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="hig-form-row">
            <label>Numele tău (Adoptator)</label>
            <input
              type="text"
              className="hig-field"
              value={adopterNameInput}
              onChange={(e) => setAdopterNameInput(e.target.value)}
              placeholder="ex. Elena Popa"
              required
            />
          </div>

          <div className="hig-form-row">
            <label>Numele pe care vrei să i-l dai (Poreclă)</label>
            <input
              type="text"
              className="hig-field"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              placeholder="ex. Teiul de lângă blocul A2"
            />
          </div>

          <div className="app-sheet-actions">
            <button type="button" onClick={onClose} className="hig-button plain">
              Renunță
            </button>

            <button type="submit" className="hig-button">
              Confirmă Adopția 🌟
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
