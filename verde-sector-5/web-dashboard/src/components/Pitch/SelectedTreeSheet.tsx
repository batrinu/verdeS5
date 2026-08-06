import React from 'react';
import type { TreeItem } from '../../types/tree';
import { X, Sprout, Droplets, MapPin, ShieldCheck } from 'lucide-react';
import { TreeCareDetails } from './TreeCareDetails';

interface SelectedTreeSheetProps {
  tree: TreeItem | null;
  onClose: () => void;
  onAdoptClick: (tree: TreeItem) => void;
  onWaterClick: (tree: TreeItem) => void;
  onCertClick?: (tree: TreeItem) => void;
}

export const SelectedTreeSheet: React.FC<SelectedTreeSheetProps> = ({
  tree,
  onClose,
  onAdoptClick,
  onWaterClick,
  onCertClick,
}) => {
  if (!tree) return null;

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'EXCELLENT':
        return { label: 'Stare Excelentă 🌿', className: 'app-health-excellent' };
      case 'GOOD':
        return { label: 'Stare Bună 🌱', className: 'app-health-good' };
      case 'NEEDS_WATER':
        return { label: 'Necesită Udare 💧', className: 'app-health-needs-water' };
      default:
        return { label: 'Atenție Necesară ⚠️', className: 'app-health-attention' };
    }
  };

  const healthBadge = getHealthBadge(tree.healthStatus);

  return (
    <>
      <div className="hig-scrim" onClick={onClose} />
      <div className="hig-sheet app-tree-sheet">
        <div className="app-tree-sheet-handle" />

        <div className="app-sheet-header">
          <div>
            <div className="app-tree-sheet-badges">
              <span className="app-tree-sheet-code">
                <MapPin size={12} /> {tree.neighborhood} • {tree.code}
              </span>
              <span className={`app-health-badge ${healthBadge.className}`}>
                {healthBadge.label}
              </span>
            </div>
            <h3>{tree.nickname || `Copac Specia ${tree.species}`}</h3>
          </div>
          <button className="app-sheet-close" onClick={onClose} aria-label="Închide detalii copac">
            <X size={20} />
          </button>
        </div>

        <div className="app-tree-sheet-info-grid">
          <div className="app-tree-sheet-info-item">
            <span className="hig-caption hig-secondary">Specie Arboricolă</span>
            <span className="app-tree-sheet-info-value">{tree.species}</span>
          </div>
          <div className="app-tree-sheet-info-item">
            <span className="hig-caption hig-secondary">Statut Adopție</span>
            <span className="app-tree-sheet-info-value">
              {tree.isAdopted ? `🌟 Adoptat de ${tree.adopterName}` : '🟢 Disponibil'}
            </span>
          </div>
          <div className="app-tree-sheet-info-item">
            <span className="hig-caption hig-secondary">Total Udări Logate</span>
            <span className="app-tree-sheet-info-value">💧 {tree.wateringsCount || 0} udări</span>
          </div>
          {tree.notes && (
            <div className="app-tree-sheet-info-item app-tree-sheet-info-item-wide">
              <span className="hig-caption hig-secondary">Adresă / Locație Teren</span>
              <span className="app-tree-sheet-info-value">{tree.notes}</span>
            </div>
          )}
        </div>

        <TreeCareDetails tree={tree} />

        {/* Action Buttons */}
        <div className="app-tree-sheet-actions">
          {!tree.isAdopted ? (
            <button
              className="hig-button"
              onClick={() => {
                onClose();
                onAdoptClick(tree);
              }}
            >
              <Sprout size={16} />
              <span>Adoptă Copacul (+100 EcoPuncte)</span>
            </button>
          ) : (
            <div className="app-tree-sheet-adopted-group">
              <div className="app-tree-sheet-adopted-banner">
                <ShieldCheck size={18} />
                <span>Copac Adoptat & Îngrijit Comunitar</span>
              </div>
              {onCertClick && (
                <button
                  className="hig-button"
                  onClick={() => {
                    onClose();
                    onCertClick(tree);
                  }}
                >
                  📜 Afișează & Descarcă Certificat Adopție
                </button>
              )}
            </div>
          )}

          <button
            className="hig-button tinted"
            onClick={() => {
              onClose();
              onWaterClick(tree);
            }}
          >
            <Droplets size={16} />
            <span>Loghează Udare (+50 EcoPuncte)</span>
          </button>
        </div>
      </div>
    </>
  );
};
