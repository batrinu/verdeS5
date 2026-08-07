import React from 'react';
import type { TreeItem } from '../../types/tree';
import { computeWaterStatus, waterStatusLabel, computeImpact, type WaterStatus } from '../../utils/treeCare';
import { Droplets, Leaf, Sun, MessageCircle } from 'lucide-react';

// Composes the „living profile" strip for a selected tree (spec §3.1–§3.3):
// water status, estimated impact, latest voice-of-the-tree message, guardian.
// Badge coloring reuses the SAME ok/thirsty/urgent/unknown semantic
// vocabulary as the map pins (app-map-pin), routed through a class instead
// of the old inline waterStatusColor() hex — "urgent" reuses hig.css's own
// solid .hig-badge (the same "danger = solid, else = tint" split Badge.tsx
// already establishes), the other three use the app-badge-* tint modifiers.
const WATER_STATUS_BADGE_CLASS: Record<WaterStatus, string> = {
  ok: 'hig-tag app-badge-success',
  thirsty: 'hig-tag app-badge-warning',
  urgent: 'hig-badge',
  unknown: 'hig-tag app-badge-neutral',
};

function latestMessage(tree: TreeItem): string | null {
  if (!tree.lastWateredAt) return null;
  const hours = (Date.now() - new Date(tree.lastWateredAt).getTime()) / 3600000;
  if (hours > 72) return null;
  const name = tree.nickname ? ` — ${tree.nickname}` : '';
  return `Mulțumesc pentru apă! Cresc frumos datorită ție.${name}`;
}

export const TreeCareDetails: React.FC<{ tree: TreeItem }> = ({ tree }) => {
  const status = computeWaterStatus(tree);
  const impact = computeImpact(tree.species);
  const message = latestMessage(tree);

  return (
    <div className="app-tree-care">
      <div className="app-care-row">
        <span className={WATER_STATUS_BADGE_CLASS[status]}>
          <Droplets size={13} aria-hidden="true" /> {waterStatusLabel(status)}
        </span>
        {tree.isAdopted && tree.adopterName && (
          <span className="hig-footnote hig-secondary">Gardian: {tree.adopterName}</span>
        )}
      </div>

      <div className="app-impact-row" aria-label="Impact estimat">
        <span className="app-impact-chip hig-caption hig-secondary"><Leaf size={13} aria-hidden="true" /> ~{impact.co2KgPerYear} kg CO₂/an</span>
        <span className="app-impact-chip hig-caption hig-secondary"><Sun size={13} aria-hidden="true" /> ~{impact.shadeM2} m² umbră</span>
        <span className="hig-caption hig-tertiary">estimat</span>
      </div>

      {message && (
        <blockquote className="app-tree-message hig-footnote hig-secondary">
          <MessageCircle size={13} aria-hidden="true" />
          <span>{message}</span>
        </blockquote>
      )}

      {tree.lastWateredAt && (
        <div className="app-last-care hig-footnote hig-secondary" aria-label="Ultima îngrijire">
          <span className="app-last-care-label">Ultima îngrijire:</span>
          <span>
            {new Date(tree.lastWateredAt).toLocaleDateString('ro-RO')}
            {tree.lastWateredBy ? ` — ${tree.lastWateredBy}` : ''}
            {tree.lastWateredLiters ? `, ${tree.lastWateredLiters}L` : ''}
          </span>
          {tree.lastWateredPhotoProof && (
            <img className="app-last-care-photo" src={tree.lastWateredPhotoProof} alt="Dovadă foto a udării" />
          )}
        </div>
      )}
    </div>
  );
};
