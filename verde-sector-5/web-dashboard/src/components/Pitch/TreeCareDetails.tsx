import React from 'react';
import type { TreeItem } from '../../types/tree';
import { computeWaterStatus, waterStatusColor, waterStatusLabel, computeImpact } from '../../utils/treeCare';
import { Droplets, Leaf, Sun, MessageCircle } from 'lucide-react';
import './TreeCareDetails.css';

// Composes the „living profile" strip for a selected tree (spec §3.1–§3.3):
// water status, estimated impact, latest voice-of-the-tree message, guardian.
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
    <div className="tree-care-details">
      <div className="care-row">
        <span
          className="water-status-badge"
          style={{ borderColor: waterStatusColor(status), color: waterStatusColor(status) }}
        >
          <Droplets size={13} aria-hidden="true" /> {waterStatusLabel(status)}
        </span>
        {tree.isAdopted && tree.adopterName && (
          <span className="guardian-line">Gardian: {tree.adopterName}</span>
        )}
      </div>

      <div className="impact-row" aria-label="Impact estimat">
        <span className="impact-chip"><Leaf size={13} aria-hidden="true" /> ~{impact.co2KgPerYear} kg CO₂/an</span>
        <span className="impact-chip"><Sun size={13} aria-hidden="true" /> ~{impact.shadeM2} m² umbră</span>
        <span className="impact-note">estimat</span>
      </div>

      {message && (
        <blockquote className="tree-message">
          <MessageCircle size={13} aria-hidden="true" />
          <span>{message}</span>
        </blockquote>
      )}

      {tree.lastWateredAt && (
        <div className="last-care" aria-label="Ultima îngrijire">
          <span className="last-care-label">Ultima îngrijire:</span>
          <span>
            {new Date(tree.lastWateredAt).toLocaleDateString('ro-RO')}
            {tree.lastWateredBy ? ` — ${tree.lastWateredBy}` : ''}
            {tree.lastWateredLiters ? `, ${tree.lastWateredLiters}L` : ''}
          </span>
          {tree.lastWateredPhotoProof && (
            <img className="last-care-photo" src={tree.lastWateredPhotoProof} alt="Dovadă foto a udării" />
          )}
        </div>
      )}
    </div>
  );
};
