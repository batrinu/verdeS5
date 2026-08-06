import React, { useEffect, useMemo, useState } from 'react';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { ChallengeWidget } from '../../components/Pitch/ChallengeWidget';
import { TreeService } from '../../api/treeService';
import { SEED_LEADER_USERS } from '../../data/gamificationSeedData';
import { usePresenter } from '../../context/PresenterContext';
import type { DistrictStat } from '../../types/tree';
import { guardianLevelFor } from '../../utils/treeCare';
import { Trophy, Users } from 'lucide-react';
import './Community.css';

// Community hub (spec §3.6): neighborhood + top-guardian leaderboards around
// the active challenge. Local-first via TreeService and seed leaders.
const Community: React.FC = () => {
  const [stats, setStats] = useState<DistrictStat[]>([]);
  const { userName, lifetimePoints } = usePresenter();

  useEffect(() => {
    TreeService.getDistrictStats().then(setStats);
  }, []);

  const rankedHoods = [...stats].sort((a, b) => b.wateringsCount - a.wateringsCount);

  // "You are here": the presenter persona's live score replaces their seed
  // entry so the citizen sees their own place in the ranking (quiet
  // gamification — recognition, not confetti).
  const rankedGuardians = useMemo(() => {
    const base = SEED_LEADER_USERS.some(u => u.name === userName)
      ? SEED_LEADER_USERS.map(u => (u.name === userName ? { ...u, points: lifetimePoints } : u))
      : [...SEED_LEADER_USERS, { name: userName, neighborhood: 'Sector 5', points: lifetimePoints, waterings: 0 }];
    return base.sort((a, b) => b.points - a.points);
  }, [userName, lifetimePoints]);

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
            {rankedHoods.length === 0 ? (
              <p className="board-loading">Se încarcă clasamentul…</p>
            ) : (
            <ol>
              {rankedHoods.map((s, i) => (
                <li key={s.neighborhood} className={i === 0 ? 'board-first' : ''}>
                  <span className="board-rank">{i + 1}</span>
                  <span className="board-name">{s.neighborhood}</span>
                  <span className="board-value">{s.wateringsCount} udări</span>
                </li>
              ))}
            </ol>
            )}
            <p className="board-note">Cartierul câștigător al provocării primește un micro-grant pentru un proiect verde.</p>
          </section>

          <section className="board" aria-label="Top gardieni">
            <h2><Trophy size={16} aria-hidden="true" /> Top gardieni</h2>
            <ol>
              {rankedGuardians.map((u, i) => {
                const isYou = u.name === userName;
                const rowClass = [i === 0 ? 'board-first' : '', isYou ? 'board-you' : ''].filter(Boolean).join(' ');
                return (
                  <li key={u.name} className={rowClass} aria-current={isYou ? 'true' : undefined}>
                    <span className="board-rank">{i + 1}</span>
                    <span className="board-name">
                      {u.name}
                      {isYou && <span className="board-you-tag">(tu)</span>}
                      <em className="board-level">{guardianLevelFor(u.points).title}</em>
                    </span>
                    <span className="board-value">{u.points} p</span>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Community;
