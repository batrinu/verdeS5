import React, { useState, useRef } from 'react';
import type { TreeItem } from '../../types/tree';
import { usePresenter } from '../../context/PresenterContext';
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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 9999,
        // Safe-area aware padding; the overlay scrolls so a tall modal is never
        // clipped at the top/bottom on short phone screens.
        padding: 'max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom))',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '480px',
          width: '100%',
          margin: 'auto', // centers when it fits, keeps top reachable when it doesn't
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          position: 'relative',
          animation: 'fadeInModal 0.25s ease-out',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#e0f2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284c7',
            }}>
              <Droplets size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
                Udare & Verificare Foto
              </h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Verde în Sectorul 5</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
              transition: 'all 0.2s',
            }}
            aria-label="Închide"
          >
            <X size={18} />
          </button>
        </div>

        {/* Selected Tree Info Card */}
        <div
          style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            padding: '14px 16px',
            borderRadius: '16px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: '#0369a1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Copac Selectat
            </span>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#0c4a6e', marginTop: '2px' }}>
              {tree.nickname || tree.species} <span style={{ fontSize: '13px', fontWeight: 600, color: '#0284c7' }}>({tree.code})</span>
            </div>
            <div style={{ fontSize: '12px', color: '#0369a1', marginTop: '2px' }}>
              📍 Cartier <strong>{tree.neighborhood}</strong> • Specie: {tree.species}
            </div>
          </div>
          <div style={{
            backgroundColor: '#e0f2fe',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
            color: '#0369a1',
          }}>
            💧 {tree.wateringsCount || 0} Udări
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Liters Selector */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>
              💧 Cantitate udare (Litri de apă):
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[5, 10, 15, 20].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setLiters(amt)}
                  style={{
                    padding: '12px 6px',
                    borderRadius: '12px',
                    border: liters === amt ? '2px solid #0284c7' : '1px solid #cbd5e1',
                    backgroundColor: liters === amt ? '#e0f2fe' : '#ffffff',
                    color: liters === amt ? '#0369a1' : '#475569',
                    fontWeight: 800,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: liters === amt ? '0 2px 8px rgba(2, 132, 199, 0.2)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <span>{amt} L</span>
                  <span style={{ fontSize: '10px', opacity: 0.8, fontWeight: 600 }}>+{amt * 5} pct</span>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Proof Verification Section */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={16} color="#0284c7" />
                Dovadă Foto Udare
              </label>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '10px' }}>
                +50 Puncte Bonus
              </span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
              id="watering-photo-input"
            />

            {!photoPreview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: isDragging ? '2px dashed #0284c7' : '2px dashed #cbd5e1',
                  backgroundColor: isDragging ? '#f0f9ff' : '#f8fafc',
                  borderRadius: '16px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: '#0284c7', margin: '0 auto 10px' }}>
                  <Upload size={22} />
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                  Apasă sau trage poza cu udarea aici
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  Format JPG sau PNG
                </div>

                {/* Demo photo button */}
                <div style={{ marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      simulatePhotoUpload();
                    }}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '20px',
                      border: '1px solid #7dd3fc',
                      backgroundColor: '#e0f2fe',
                      color: '#0369a1',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 6px rgba(2, 132, 199, 0.15)',
                    }}
                  >
                    <Sparkles size={14} color="#0284c7" />
                    Folosește o poză demonstrativă
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ borderRadius: '16px', border: '1px solid #cbd5e1', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
                {/* Photo Thumbnail Container */}
                <div style={{ position: 'relative', width: '100%', height: '160px', backgroundColor: '#0f172a' }}>
                  <img
                    src={photoPreview}
                    alt="Dovadă udare"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(15, 23, 42, 0.75)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    title="Șterge foto"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* AI Verification Status Box */}
                <div style={{ padding: '12px 16px' }}>
                  {isVerifying ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0284c7' }}>
                      <RefreshCw size={18} className="spin-icon" style={{ animation: 'spin 1s linear infinite' }} />
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>
                        Se verifică poza...
                      </span>
                    </div>
                  ) : isPhotoVerified ? (
                    <div>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#dcfce7',
                        border: '1px solid #86efac',
                        color: '#15803d',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: 800,
                        marginBottom: '6px',
                      }}>
                        <Sparkles size={16} />
                        <span>Poză validată! +50 EcoPuncte Bonus</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#166534', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
          <div
            style={{
              backgroundColor: '#fefce8',
              border: '1px solid #fef08a',
              padding: '14px 16px',
              borderRadius: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: '#fef08a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
              }}>
                <Trophy size={22} color="#a16207" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#713f12' }}>
                  Total: +{totalPoints} EcoPuncte!
                </div>
                <div style={{ fontSize: '11px', color: '#854d0e' }}>
                  Bază: +{basePoints} pct ({liters}L) {isPhotoVerified ? '• Bonus Foto: +50 pct' : ''}
                </div>
              </div>
            </div>

            {!isPhotoVerified && (
              <span style={{ fontSize: '11px', color: '#a16207', fontStyle: 'italic' }}>
                Adaugă foto pt. +50 bonus
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '14px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                color: '#475569',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Anulează
            </button>

            <button
              type="submit"
              style={{
                flex: 1.5,
                padding: '12px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <span>Salvează Udarea</span>
              <span>💧 (+{totalPoints} pct)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WateringModal;
