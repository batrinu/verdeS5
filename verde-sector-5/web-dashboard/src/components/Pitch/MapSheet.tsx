import React, { useMemo, useState } from 'react';
import type { TreeItem } from '../../types/tree';
import {
  filterTrees,
  treeSpeciesOptions,
  summarizeTrees,
  type TreeFilterCriteria,
  type QuickFilter,
} from '../../utils/treeFilter';
import { nextDetent, type Detent } from '../../utils/sheetDetent';
import { computeWaterStatus, waterStatusLabel } from '../../utils/treeCare';
import { ChevronLeft, Search } from 'lucide-react';

interface MapSheetProps {
  trees: TreeItem[];
  selectedTree: TreeItem | null;
  criteria: TreeFilterCriteria;
  onCriteriaChange: (c: TreeFilterCriteria) => void;
  onSelectTree: (tree: TreeItem) => void;
  onBack: () => void;
  onAdoptClick: (tree: TreeItem) => void;
  onWaterClick: (tree: TreeItem) => void;
  onCertClick?: (tree: TreeItem) => void;
  children?: React.ReactNode;
}

const QUICK_FILTERS: { value: QuickFilter; label: string }[] = [
  { value: 'toti', label: 'Toți' },
  { value: 'disponibili', label: 'Disponibili' },
  { value: 'adoptati', label: 'Adoptați' },
  { value: 'necesita-apa', label: 'Necesită apă' },
];

export const MapSheet: React.FC<MapSheetProps> = ({
  trees,
  selectedTree,
  criteria,
  onCriteriaChange,
  onSelectTree,
  onBack,
  onAdoptClick,
  onWaterClick,
  onCertClick,
  children,
}) => {
  const [detent, setDetent] = useState<Detent>('peek');

  const filtered = useMemo(() => filterTrees(trees, criteria), [trees, criteria]);
  const species = useMemo(() => treeSpeciesOptions(trees), [trees]);
  const summary = useMemo(() => summarizeTrees(trees), [trees]);

  const mode: 'overview' | 'detail' = selectedTree ? 'detail' : 'overview';

  return (
    <section
      className="app-map-sheet"
      data-detent={detent}
      data-mode={mode}
      aria-label={mode === 'detail' ? 'Detalii copac' : 'Prezentare generală hartă'}
    >
      <button
        type="button"
        className="app-map-sheet-grabber"
        aria-label={detent === 'full' ? 'Restrânge panoul' : 'Extinde panoul'}
        onClick={() => setDetent((d) => nextDetent(d, d === 'full' ? 'down' : 'up'))}
      />

      {mode === 'detail' && selectedTree ? (
        <div className="app-map-sheet-body">
          <button type="button" className="app-map-sheet-back" onClick={onBack}>
            <ChevronLeft size={18} aria-hidden="true" /> Înapoi
          </button>
          <header className="app-map-sheet-detail-head">
            <span className="app-sheet-tree-card-label">
              {selectedTree.neighborhood} · {selectedTree.code}
            </span>
            <h2 className="app-sheet-tree-card-name">
              {selectedTree.nickname || selectedTree.species}
            </h2>
            <p className="hig-secondary">
              {selectedTree.isAdopted
                ? `Îngrijit de: ${selectedTree.adopterName ?? '—'}`
                : `Specie: ${selectedTree.species}`}{' '}
              · {waterStatusLabel(computeWaterStatus(selectedTree))}
            </p>
          </header>
          <div className="app-sheet-actions">
            {!selectedTree.isAdopted && (
              <button className="hig-button" onClick={() => onAdoptClick(selectedTree)}>
                🌱 Adoptă
              </button>
            )}
            <button className="hig-button" onClick={() => onWaterClick(selectedTree)}>
              💧 Udă
            </button>
            {selectedTree.isAdopted && onCertClick && (
              <button className="hig-button" onClick={() => onCertClick(selectedTree)}>
                📜 Certificat
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="app-map-sheet-body">
          <p className="app-map-sheet-summary">
            {summary.total.toLocaleString('ro-RO')} copaci · {summary.hydratedPct}% hidratați
          </p>

          <div className="app-map-sheet-search">
            <Search size={16} aria-hidden="true" />
            <input
              type="text"
              className="hig-field"
              placeholder="Caută copac, cartier sau cod…"
              aria-label="Caută copaci"
              value={criteria.search}
              onChange={(e) => onCriteriaChange({ ...criteria, search: e.target.value })}
            />
          </div>

          <div className="app-map-sheet-segmented" role="tablist" aria-label="Filtre rapide">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.value}
                role="tab"
                aria-selected={criteria.quick === f.value}
                className={`app-segmented-item ${criteria.quick === f.value ? 'active' : ''}`}
                onClick={() => onCriteriaChange({ ...criteria, quick: f.value })}
              >
                {f.label}
              </button>
            ))}
          </div>

          <select
            className="hig-field app-map-sheet-species"
            aria-label="Filtrează după specie"
            value={criteria.species}
            onChange={(e) => onCriteriaChange({ ...criteria, species: e.target.value })}
          >
            <option value="toate">Orice specie</option>
            {species.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <ul className="app-map-sheet-list">
            {filtered.map((tree) => (
              <li key={tree.id}>
                <button className="app-map-sheet-list-row" onClick={() => onSelectTree(tree)}>
                  <span className={`app-map-sheet-dot status-${computeWaterStatus(tree)}`} aria-hidden="true" />
                  <span className="app-map-sheet-list-name">{tree.nickname || tree.species}</span>
                  <span className="hig-secondary">{tree.neighborhood} · {tree.code}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Role-aware panels (stats, council analytics, challenges) rendered by the host. */}
          <div className="app-map-sheet-panels">{children}</div>
        </div>
      )}
    </section>
  );
};
