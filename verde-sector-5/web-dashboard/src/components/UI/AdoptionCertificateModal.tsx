import React, { useEffect, useMemo, useRef } from 'react';
import { Download, X, Award } from 'lucide-react';
import type { TreeItem } from '../../types/tree';
import { useModalA11y } from '../../hooks/useModalA11y';

export interface AdoptionCertificateData {
  adopterName: string;
  treeCode: string;
  treeSpecies: string;
  treeNickname?: string | null;
  district: string;
  dateOfAdoption?: string;
  ecoPoints?: number;
}

interface AdoptionCertificateModalProps {
  tree?: TreeItem | null;
  adopterName?: string;
  nickname?: string;
  certificateData?: AdoptionCertificateData | null;
  onClose: () => void;
}

export const AdoptionCertificateModal: React.FC<AdoptionCertificateModalProps> = ({
  tree,
  adopterName,
  nickname,
  certificateData: customCertData,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dialogRef = useModalA11y<HTMLDivElement>(onClose);

  // Consolidate data from either customCertData or tree props
  const certData: AdoptionCertificateData = useMemo(() => customCertData || {
    adopterName: adopterName || tree?.adopterName || 'Cetățean Sector 5',
    treeCode: tree?.code || 'S5-COT-001',
    treeSpecies: tree?.species || 'Tei (Linden)',
    treeNickname: nickname || tree?.nickname || `Arborele din ${tree?.neighborhood || 'Sector 5'}`,
    district: tree?.neighborhood || 'Cotroceni',
    dateOfAdoption: new Date().toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    ecoPoints: 100,
  }, [customCertData, adopterName, nickname, tree?.adopterName, tree?.code, tree?.species, tree?.nickname, tree?.neighborhood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1000;
    const height = 700;
    canvas.width = width;
    canvas.height = height;

    // 1. Background Gradient (Eco Paper Aesthetic)
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#f4fbf7');
    bgGrad.addColorStop(0.5, '#ffffff');
    bgGrad.addColorStop(1, '#eaf5ee');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Outer Frame (Emerald & Gold Ornate Borders)
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#047857'; // Emerald
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#d97706'; // Gold
    ctx.strokeRect(32, 32, width - 64, height - 64);

    // Decorative Corner Squares
    const corners = [
      [32, 32],
      [width - 32, 32],
      [32, height - 32],
      [width - 32, height - 32],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = '#d97706';
      ctx.fillRect(cx - 8, cy - 8, 16, 16);
      ctx.fillStyle = '#047857';
      ctx.fillRect(cx - 5, cy - 5, 10, 10);
    });

    // 3. Header Banner (Consiliul Local Sector 5)
    ctx.fillStyle = '#065f46';
    ctx.beginPath();
    ctx.roundRect((width - 560) / 2, 50, 560, 42, 8);
    ctx.fill();

    ctx.fillStyle = '#fef08a'; // Gold Text
    ctx.font = 'bold 15px "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CONSILIUL LOCAL SECTOR 5 BUCUREȘTI', width / 2, 76);

    // 4. Main Certificate Header
    ctx.fillStyle = '#064e3b';
    ctx.font = 'bold 28px "Georgia", serif';
    ctx.fillText('Certificat Oficial de Adopție — Verde în Sectorul 5', width / 2, 132);

    ctx.fillStyle = '#047857';
    ctx.font = '500 13px "Segoe UI", Roboto, sans-serif';
    ctx.fillText('REGISTRUL DIGITAL INTERACTIV AL FONDULUI FORESTIER URBAN SECTOR 5', width / 2, 155);

    // Divider Line
    ctx.beginPath();
    ctx.moveTo(120, 175);
    ctx.lineTo(width - 120, 175);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Center Gold Star Accent
    ctx.fillStyle = '#d97706';
    ctx.font = '16px sans-serif';
    ctx.fillText('★   🌿   ★', width / 2, 180);

    // 5. Adopter Text
    ctx.fillStyle = '#475569';
    ctx.font = 'italic 16px "Georgia", serif';
    ctx.fillText('Se adeverește prin prezentul document că cetățeanul protector', width / 2, 218);

    // Adopter Name Highlight
    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 34px "Georgia", serif';
    ctx.fillText(certData.adopterName, width / 2, 262);

    // Gold Underline under name
    const nameWidth = ctx.measureText(certData.adopterName).width;
    ctx.fillStyle = '#d97706';
    ctx.fillRect((width - Math.max(nameWidth, 240)) / 2, 272, Math.max(nameWidth, 240), 3);

    ctx.fillStyle = '#334155';
    ctx.font = '15px "Segoe UI", Roboto, sans-serif';
    ctx.fillText('a adoptat oficial și a preluat în îngrijire comunitară arborele urban:', width / 2, 308);

    // 6. Tree Details Box
    const boxX = 80;
    const boxY = 330;
    const boxW = width - 160;
    const boxH = 210;

    // Box Background
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 14);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#a7f3d0';
    ctx.stroke();

    // Details Content (Two Column Layout inside Box)
    ctx.textAlign = 'left';

    // Left Column
    const col1X = boxX + 40;
    let currY = boxY + 45;

    // Cod Arbore
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px "Segoe UI", sans-serif';
    ctx.fillText('COD UNIC ARBORE:', col1X, currY);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText(certData.treeCode, col1X, currY + 22);

    // Specie
    currY += 60;
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px "Segoe UI", sans-serif';
    ctx.fillText('SPECIE ARBORICOLĂ:', col1X, currY);
    ctx.fillStyle = '#047857';
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText(certData.treeSpecies, col1X, currY + 22);

    // Poreclă Arbore
    currY += 60;
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px "Segoe UI", sans-serif';
    ctx.fillText('PORECLĂ OFICIALĂ:', col1X, currY);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'italic bold 16px "Segoe UI", sans-serif';
    ctx.fillText(`"${certData.treeNickname}"`, col1X, currY + 22);

    // Right Column
    const col2X = boxX + boxW / 2 + 20;
    currY = boxY + 45;

    // Cartier / District
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px "Segoe UI", sans-serif';
    ctx.fillText('CARTIER / SECTOR:', col2X, currY);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText(`${certData.district}, Sector 5 București`, col2X, currY + 22);

    // Data Adopției
    currY += 60;
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px "Segoe UI", sans-serif';
    ctx.fillText('DATA ADOPȚIEI:', col2X, currY);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText(certData.dateOfAdoption || '06 August 2026', col2X, currY + 22);

    // EcoPoints Earned
    currY += 60;
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px "Segoe UI", sans-serif';
    ctx.fillText('RECOMPENSĂ ECO-CITIZEN:', col2X, currY);
    ctx.fillStyle = '#b45309'; // Gold/Amber
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText(`+${certData.ecoPoints || 100} EcoPuncte Acordate 🌟`, col2X, currY + 22);

    // 7. Official Seal & Stamps Section (Footer)
    // Left: Bucharest Eco Seal
    const sealX = 170;
    const sealY = 615;

    // Gold Seal Circle
    ctx.beginPath();
    ctx.arc(sealX, sealY, 36, 0, Math.PI * 2);
    ctx.fillStyle = '#d97706';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sealX, sealY, 31, 0, Math.PI * 2);
    ctx.fillStyle = '#047857';
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('🌿', sealX, sealY + 7);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 13px "Segoe UI", sans-serif';
    ctx.fillText('SIGILIU DIGITAL SECTOR 5', sealX + 48, sealY - 8);
    ctx.fillStyle = '#64748b';
    ctx.font = '500 11px "Segoe UI", sans-serif';
    ctx.fillText('Certificat Verificat Autentic', sealX + 48, sealY + 8);
    ctx.fillText(`ID: VERDE-S5-${certData.treeCode}`, sealX + 48, sealY + 22);

    // Right: Signature / Department Authority
    const sigX = width - 170;
    const sigY = 615;

    ctx.textAlign = 'center';
    ctx.fillStyle = '#0f172a';
    ctx.font = 'italic bold 15px "Georgia", serif';
    ctx.fillText('Primăria Sectorului 5', sigX, sigY - 10);

    ctx.beginPath();
    ctx.moveTo(sigX - 110, sigY);
    ctx.lineTo(sigX + 110, sigY);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '500 11px "Segoe UI", sans-serif';
    ctx.fillText('Departamentul Mediu & Spații Verzi', sigX, sigY + 16);
  }, [certData]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Certificat-Adoptie-${certData.treeCode || 'S5'}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <>
      <div className="hig-scrim" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Certificat de adopție"
        tabIndex={-1}
        className="hig-sheet app-certificate-modal"
      >
        {/* Header */}
        <div className="app-certificate-header">
          <div className="app-certificate-title-group">
            <div className="app-certificate-title-icon">
              <Award size={20} />
            </div>
            <div>
              <h3 className="app-certificate-title-text">
                Certificat Oficial de Adopție — Verde în Sectorul 5
              </h3>
              <p className="app-certificate-subtitle">
                Afișare și descărcare certificat digital oficial pentru {certData.treeCode}
              </p>
            </div>
          </div>
          <button className="app-sheet-close" onClick={onClose} aria-label="Închide">
            <X size={18} />
          </button>
        </div>

        {/* Canvas Display */}
        <div className="app-certificate-canvas-wrapper">
          <canvas ref={canvasRef} className="app-certificate-canvas" />
        </div>

        {/* Action Buttons */}
        <div className="app-certificate-actions">
          <button className="hig-button plain" onClick={onClose}>
            Închide
          </button>
          <button className="hig-button" onClick={handleDownload}>
            <Download size={18} />
            Descarcă Certificat PNG
          </button>
        </div>
      </div>
    </>
  );
};

export default AdoptionCertificateModal;
