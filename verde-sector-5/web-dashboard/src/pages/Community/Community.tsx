import React, { useEffect, useState } from 'react';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { ChallengeWidget } from '../../components/Pitch/ChallengeWidget';
import { TreeService } from '../../api/treeService';
import { SEED_LEADER_USERS } from '../../data/gamificationSeedData';
import type { DistrictStat } from '../../types/tree';
import { guardianLevelFor } from '../../utils/treeCare';
import { Trophy, Users } from 'lucide-react';
import './Community.css';

// Community hub (spec §3.6): neighborhood + top-guardian leaderboards around
// the active challenge. Local-first via TreeService and seed leaders.
const Community: React.FC = () => {
  const [stats, setStats] = useState<DistrictStat[]>([]);

  useEffect(() => {
    TreeService.getDistrictStats().then(setStats);
  }, []);

  const rankedHoods = [...stats].sort((a, b) => b.wateringsCount - a.wateringsCount);

  return (
    <div className="community-root">
      <PitchHeader />
      <main className="community-main">
        <header className="community-header">
          <h1><Users size={20} aria-hidden="true" /> Comunitate</h1>
          <p>Cartierele și gardienii care țin Sectorul 5 verde.</p>
        </header>

        <ChallengeWidget detailed />

        <div className="community-boards">
          <section className="board" aria-label="Clasament cartiere">
            <h2><Trophy size={16} aria-hidden="true" /> Cartiere — udări</h2>
            <ol>
              {rankedHoods.map((s, i) => (
                <li key={s.neighborhood} className={i === 0 ? 'board-first' : ''}>
                  <span className="board-rank">{i + 1}</span>
                  <span className="board-name">{s.neighborhood}</span>
                  <span className="board-value">{s.wateringsCount} udări</span>
                </li>
              ))}
            </ol>
            <p className="board-note">Cartierul câștigător al provocării primește un micro-grant pentru un proiect verde.</p>
          </section>

          <section className="board" aria-label="Top gardieni">
            <h2><Trophy size={16} aria-hidden="true" /> Top gardieni</h2>
            <ol>
              {SEED_LEADER_USERS.map((u, i) => (
                <li key={u.name} className={i === 0 ? 'board-first' : ''}>
                  <span className="board-rank">{i + 1}</span>
                  <span className="board-name">
                    {u.name}
                    <em className="board-level">{guardianLevelFor(u.points).title}</em>
                  </span>
                  <span className="board-value">{u.points} p</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Community;
