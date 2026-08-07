import React, { useState, useRef } from 'react';
import type { TreeItem } from '../../types/tree';
import { usePresenter } from '../../context/PresenterContext';
import { useModalA11y } from '../../hooks/useModalA11y';
import { Upload, CheckCircle2, Sparkles, X, Camera, RefreshCw, Droplets, Trophy } from 'lucide-react';

export interface WateringModalProps {
  tree: TreeItem | null;
  onClose: () => void;
  onConfirm: (
    treeId: string,
    liters: number,
    userName: string,
    photoProofUrl?: string,
    isPhotoVerified?: boolean
  ) => void;
}

// Sample realistic demo watering image SVG data URL for instant simulation
const DEMO_WATERING_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><rect width="400" height="260" fill="%231e293b"/><path d="M0,180 Q100,160 200,190 T400,170 L400,260 L0,260 Z" fill="%2315803d"/><path d="M200,200 L200,110 Q200,100 190,90 Q180,80 160,85" stroke="%2378350f" stroke-width="12" stroke-linecap="round" fill="none"/><circle cx="160" cy="75" r="45" fill="%2322c55e" opacity="0.85"/><circle cx="190" cy="55" r="35" fill="%2316a34a" opacity="0.9"/><circle cx="130" cy="65" r="30" fill="%234ade80" opacity="0.8"/><rect x="250" y="100" width="50" height="60" rx="8" fill="%230284c7"/><path d="M275,100 L275,70 Q275,60 230,80 Q210,90 200,130" stroke="%2338bdf8" stroke-width="4" stroke-dasharray="6,4" fill="none"/><circle cx="210" cy="115" r="4" fill="%2338bdf8"/><circle cx="205" cy="130" r="5" fill="%2338bdf8"/><circle cx="202" cy="145" r="6" fill="%2338bdf8"/><text x="20" y="35" fill="%23f8fafc" font-family="sans-serif" font-weight="bold" font-size="16">📷 Verde S5 - Dovadă Udare Copac</text><text x="20" y="245" fill="%23cbd5e1" font-family="sans-serif" font-size="12">GPS: 44.4170 N, 26.0750 E • Sector 5</text></svg>`;

// Compress + downscale an uploaded image into a small JPEG data-URL blob so it
// fits comfortably in the database (and, later, R2). See docs/photo-storage.md.
const compressImage = (file: File, maxDim = 1000, quality = 0.7): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Nu s-a putut încărca imaginea.'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas indisponibil.'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

export const WateringModal: React.FC<WateringModalProps> = ({ tree, onClose, onConfirm }) => {
  const { userName } = usePresenter();
  const [liters, setLiters] = useState<number>(10);
  const dialogRef = useModalA11y<HTMLDivElement>(onClose);

  // Photo Proof Verification State
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isPhotoVerified, setIsPhotoVerified] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!tree) return null;

  const basePoints = liters * 5;
  const photoBonus = isPhotoVerified ? 50 : 0;
  const totalPoints = basePoints + photoBonus;

  const processUploadedFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vă rugăm să încărcați un fișier imagine valid (JPG, PNG, WebP).');
      return;
    }
    compressImage(file)
      .then((dataUrl) => {
        setPhotoPreview(dataUrl);
        runAiVerification();
      })
      .catch((err) => {
        console.error('Eroare la procesarea imaginii:', err);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const simulatePhotoUpload = () => {
    setPhotoPreview(DEMO_WATERING_IMAGE);
    runAiVerification();
  };

  const runAiVerification = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVerifying(true);
    setIsPhotoVerified(false);
    timerRef.current = setTimeout(() => {
      setIsVerifying(false);
      setIsPhotoVerified(true);
    }, 600);
  };

  const handleRemovePhoto = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setPhotoPreview(null);
    setIsPhotoVerified(false);
    setIsVerifying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(tree.id, liters, userName, photoPreview || undefined, isPhotoVerified);
  };

  return (
    <>
      <div className="hig-scrim" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Udare și dovadă foto"
        tabIndex={-1}
        className="hig-sheet app-sheet-scroll"
      >
        {/* Header */}
        <div className="app-sheet-header">
          <div className="app-watering-title-group">
            <div className="app-watering-title-icon">
              <Droplets size={24} />
            </div>
            <div>
              <h3>Udare & Verificare Foto</h3>
              <span className="hig-caption hig-secondary">Verde în Sectorul 5</span>
            </div>
          </div>
          <button onClick={onClose} aria-label="Închide" className="app-sheet-close">
            <X size={18} />
          </button>
        </div>

        {/* Selected Tree Info Card */}
        <div className="app-watering-tree-card">
          <div>
            <span className="app-watering-tree-card-label">Copac Selectat</span>
            <div className="app-sheet-tree-card-name">
              {tree.nickname || tree.species} <span className="app-watering-tree-card-code">({tree.code})</span>
            </div>
            <div className="hig-footnote hig-secondary">
              📍 Cartier <strong>{tree.neighborhood}</strong> • Specie: {tree.species}
            </div>
          </div>
          <div className="app-watering-count-pill">
            💧 {tree.wateringsCount || 0} Udări
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Liters Selector */}
          <div className="hig-form-row">
            <label>💧 Cantitate udare (Litri de apă):</label>
            <div className="app-liters-grid">
              {[5, 10, 15, 20].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setLiters(amt)}
                  className={`app-liters-btn${liters === amt ? ' selected' : ''}`}
                >
                  <span>{amt} L</span>
                  <span className="app-liters-btn-points">+{amt * 5} pct</span>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Proof Verification Section */}
          <div className="hig-form-row">
            <div className="app-watering-photo-header">
              <label className="app-watering-photo-label">
                <Camera size={16} />
                Dovadă Foto Udare
              </label>
              <span className="app-watering-bonus-pill">+50 Puncte Bonus</span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="app-hidden-file-input"
              id="watering-photo-input"
            />

            {!photoPreview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`app-watering-dropzone${isDragging ? ' dragging' : ''}`}
              >
                <div className="app-watering-dropzone-icon">
                  <Upload size={22} />
                </div>
                <div className="app-watering-dropzone-title">
                  Apasă sau trage poza cu udarea aici
                </div>
                <div className="hig-footnote hig-secondary">
                  Format JPG sau PNG
                </div>

                {/* Demo photo button */}
                <div className="app-watering-demo-btn-wrap">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      simulatePhotoUpload();
                    }}
                    className="app-watering-demo-btn"
                  >
                    <Sparkles size={14} />
                    Folosește o poză demonstrativă
                  </button>
                </div>
              </div>
            ) : (
              <div className="app-watering-photo-preview">
                {/* Photo Thumbnail Container */}
                <div className="app-watering-photo-thumb">
                  <img
                    src={photoPreview}
                    alt="Dovadă udare"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="app-watering-photo-remove"
                    title="Șterge foto"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* AI Verification Status Box */}
                <div className="app-watering-verify-status">
                  {isVerifying ? (
                    <div className="app-watering-verifying">
                      <RefreshCw size={18} />
                      <span>
                        Se verifică poza...
                      </span>
                    </div>
                  ) : isPhotoVerified ? (
                    <div>
                      <div className="app-watering-verified-badge">
                        <Sparkles size={16} />
                        <span>Poză validată! +50 EcoPuncte Bonus</span>
                      </div>
                      <div className="app-watering-verified-note">
                        <CheckCircle2 size={13} />
                        Poza cu udarea a fost confirmată. Mulțumim!
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          {/* EcoPoints Total Banner */}
          <div className="app-watering-points-banner">
            <div className="app-watering-points-left">
              <div className="app-watering-points-icon">
                <Trophy size={22} />
              </div>
              <div>
                <div className="app-watering-points-total">
                  Total: +{totalPoints} EcoPuncte!
                </div>
                <div className="hig-footnote hig-secondary">
                  Bază: +{basePoints} pct ({liters}L) {isPhotoVerified ? '• Bonus Foto: +50 pct' : ''}
                </div>
              </div>
            </div>

            {!isPhotoVerified && (
              <span className="app-watering-points-hint">
                Adaugă foto pt. +50 bonus
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="app-sheet-actions">
            <button type="button" onClick={onClose} className="hig-button plain">
              Anulează
            </button>

            <button type="submit" className="hig-button">
              <span>Salvează Udarea</span>
              <span>💧 (+{totalPoints} pct)</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WateringModal;
