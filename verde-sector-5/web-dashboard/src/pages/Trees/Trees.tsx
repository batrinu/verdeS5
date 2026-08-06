import React, { useEffect, useMemo, useState } from 'react';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { TreeCareDetails } from '../../components/Pitch/TreeCareDetails';
import { TreeService } from '../../api/treeService';
import type { TreeItem } from '../../types/tree';
import { computeWaterStatus, waterStatusLabel, type WaterStatus } from '../../utils/treeCare';
import { TreePine, MapPin, Search } from 'lucide-react';
import './Trees.css';

const WATER_STATUS_OPTIONS: WaterStatus[] = ['ok', 'thirsty', 'urgent', 'unknown'];

// Tree registry (spec §3.1): the full seeded inventory, searchable and
// filterable by species and live water status. Local-first via TreeService —
// works offline from seed data like every other surface.
const Trees: React.FC = () => {
  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('toate');
  const [filterStatus, setFilterStatus] = useState<'toate' | WaterStatus>('toate');

  useEffect(() => {
    let cancelled = false;
    TreeService.getTrees().then(data => {
      if (!cancelled) {
        setTrees(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const speciesOptions = useMemo(
    () => Array.from(new Set(trees.map(t => t.species))).sort((a, b) => a.localeCompare(b, 'ro')),
    [trees]
  );

  const filteredTrees = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trees.filter(tree => {
      const matchesSearch =
        !q ||
        tree.species.toLowerCase().includes(q) ||
        tree.neighborhood.toLowerCase().includes(q) ||
        tree.code.toLowerCase().includes(q) ||
        (tree.nickname?.toLowerCase().includes(q) ?? false);
      const matchesSpecies = filterSpecies === 'toate' || tree.species === filterSpecies;
      const matchesStatus = filterStatus === 'toate' || computeWaterStatus(tree) === filterStatus;
      return matchesSearch && matchesSpecies && matchesStatus;
    });
  }, [trees, search, filterSpecies, filterStatus]);

  return (
    <div className="trees-root">
      <PitchHeader />
      <main className="trees-main">
        <header className="trees-header">
          <h1><TreePine size={20} aria-hidden="true" /> Registrul Spațiilor Verzi</h1>
          <p>Explorează și adoptă copaci din Sectorul 5</p>
        </header>

        <div className="trees-filters">
          <div className="trees-search-wrap">
            <Search size={16} aria-hidden="true" className="trees-search-icon" />
            <input
              type="text"
              placeholder="Caută după specie, cartier sau cod..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="trees-search-input"
              aria-label="Caută copaci"
            />
          </div>

          <select
            value={filterSpecies}
            onChange={e => setFilterSpecies(e.target.value)}
            className="trees-filter-select"
            aria-label="Filtrează după specie"
          >
            <option value="toate">Orice specie</option>
            {speciesOptions.map(species => (
              <option key={species} value={species}>{species}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as 'toate' | WaterStatus)}
            className="trees-filter-select"
            aria-label="Filtrează după starea de udare"
          >
            <option value="toate">Orice stare de udare</option>
            {WATER_STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>{waterStatusLabel(status)}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="trees-loading">Se încarcă registrul…</p>
        ) : (
          <>
            <div className="trees-grid">
              {filteredTrees.map(tree => {
                const isGuardianed = tree.isAdopted && !!tree.adopterName;
                return (
                  <div key={tree.id} className="tree-card">
                    <div className="tree-card-header">
                      <h3>{tree.nickname || tree.species}</h3>
                      {tree.nickname && <span className="tree-species-tag">{tree.species}</span>}
                    </div>
                    <p className="tree-meta">
                      <MapPin size={12} aria-hidden="true" /> {tree.neighborhood} · {tree.code}
                    </p>

                    <TreeCareDetails tree={tree} />

                    <div className="tree-card-footer">
                      {!isGuardianed && <span className="tree-adoption-line">Neadoptat</span>}
                      <span className="tree-waterings-line">{tree.wateringsCount ?? 0} udări</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredTrees.length === 0 && (
              <div className="no-results">
                Nu s-au găsit copaci care să corespundă filtrelor.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Trees;
