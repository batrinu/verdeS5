import React from 'react';
import type { TreeItem } from '../../types/tree';
import { X, Sprout, Droplets, MapPin, ShieldCheck } from 'lucide-react';
import { TreeCareDetails } from './TreeCareDetails';
import './SelectedTreeSheet.css';

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
        return { label: 'Stare Excelentă 🌿', bg: '#dcfce7', color: '#166534' };
      case 'GOOD':
        return { label: 'Stare Bună 🌱', bg: '#f0fdf4', color: '#15803d' };
      case 'NEEDS_WATER':
        return { label: 'Necesită Udare 💧', bg: '#e0f2fe', color: '#0369a1' };
      default:
        return { label: 'Atenție Necesară ⚠️', bg: '#fef2f2', color: '#991b1b' };
    }
  };

  const healthBadge = getHealthBadge(tree.healthStatus);

  return (
    <div className="selected-tree-sheet-overlay" onClick={onClose}>
      <div className="selected-tree-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />
        
        <div className="sheet-header">
          <div>
            <div className="sheet-badge-group">
              <span className="sheet-neighborhood-code">
                <MapPin size={12} /> {tree.neighborhood} • {tree.code}
              </span>
              <span className="sheet-health-badge" style={{ backgroundColor: healthBadge.bg, color: healthBadge.color }}>
                {healthBadge.label}
              </span>
            </div>
            <h3 className="sheet-tree-name">{tree.nickname || `Copac Specia ${tree.species}`}</h3>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Închide detalii copac">
            <X size={20} />
          </button>
        </div>

        <div className="sheet-body">
          <div className="sheet-info-grid">
            <div className="sheet-info-item">
              <span className="sheet-info-label">Specie Arboricolă</span>
              <span className="sheet-info-value">{tree.species}</span>
            </div>
            <div className="sheet-info-item">
              <span className="sheet-info-label">Statut Adopție</span>
              <span className="sheet-info-value">
                {tree.isAdopted ? `🌟 Adoptat de ${tree.adopterName}` : '🟢 Disponibil'}
              </span>
            </div>
            <div className="sheet-info-item">
              <span className="sheet-info-label">Total Udări Logate</span>
              <span className="sheet-info-value">💧 {tree.wateringsCount || 0} udări</span>
            </div>
            {tree.notes && (
              <div className="sheet-info-item" style={{ gridColumn: 'span 2' }}>
                <span className="sheet-info-label">Adresă / Locație Teren</span>
                <span className="sheet-info-value">{tree.notes}</span>
              </div>
            )}
          </div>

          <TreeCareDetails tree={tree} />

          {/* Action Buttons */}
          <div className="sheet-actions">
            {!tree.isAdopted ? (
              <button
                className="btn-sheet-adopt"
                onClick={() => {
                  onClose();
                  onAdoptClick(tree);
                }}
              >
                <Sprout size={16} />
                <span>Adoptă Copacul (+100 EcoPuncte)</span>
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <div className="adopted-status-banner">
                  <ShieldCheck size={18} color="#22c55e" />
                  <span>Copac Adoptat & Îngrijit Comunitar</span>
                </div>
                {onCertClick && (
                  <button
                    onClick={() => {
                      onClose();
                      onCertClick(tree);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '12px',
                      backgroundColor: '#059669',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    📜 Afișează & Descarcă Certificat Adopție
                  </button>
                )}
              </div>
            )}

            <button
              className="btn-sheet-water"
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
      </div>
    </div>
  );
};
