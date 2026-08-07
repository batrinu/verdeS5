import React, { useEffect, useMemo, useState } from 'react';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { ChallengeWidget } from '../../components/Pitch/ChallengeWidget';
import { TreeService } from '../../api/treeService';
import { SEED_LEADER_USERS } from '../../data/gamificationSeedData';
import { usePresenter } from '../../context/PresenterContext';
import type { DistrictStat } from '../../types/tree';
import { guardianLevelFor } from '../../utils/treeCare';
import { Trophy, Users } from 'lucide-react';

// Presentational only — derives avatar initials from a guardian's display
// name (up to two, per the "28px circle, --hig-fill, initials" ruling).
const initialsFor = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');

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
    <>
      <PitchHeader />
      <div className="app-community-page">
        <header className="app-community-header">
          <h2><Users size={20} aria-hidden="true" /> Comunitate</h2>
          <p className="hig-secondary">Cartierele și gardienii care țin Sectorul 5 verde.</p>
        </header>

        <ChallengeWidget detailed />

        <div className="app-community-boards">
          <section className="hig-card app-community-board" aria-label="Clasament cartiere">
            <h3 className="hig-headline app-community-board-title"><Trophy size={16} aria-hidden="true" /> Cartiere — udări</h3>
            {rankedHoods.length === 0 ? (
              <p className="hig-secondary app-community-loading">Se încarcă clasamentul…</p>
            ) : (
            <ol className="hig-list">
              {rankedHoods.map((s, i) => (
                <li key={s.neighborhood} className="hig-list-item">
                  <span className={`app-community-rank ${i < 3 ? 'hig-tag' : 'hig-value'}`}>{i + 1}</span>
                  <span className="app-community-name">{s.neighborhood}</span>
                  <span className="hig-spacer" />
                  <span className="hig-value">{s.wateringsCount} udări</span>
                </li>
              ))}
            </ol>
            )}
            <p className="hig-footnote hig-secondary app-community-note">Cartierul câștigător al provocării primește un micro-grant pentru un proiect verde.</p>
          </section>

          <section className="hig-card app-community-board" aria-label="Top gardieni">
            <h3 className="hig-headline app-community-board-title"><Trophy size={16} aria-hidden="true" /> Top gardieni</h3>
            <ol className="hig-list">
              {rankedGuardians.map((u, i) => {
                const isYou = u.name === userName;
                return (
                  <li
                    key={u.name}
                    className={`hig-list-item${isYou ? ' app-list-item-selected' : ''}`}
                    aria-current={isYou ? 'true' : undefined}
                  >
                    <span className={`app-community-rank ${i < 3 ? 'hig-tag' : 'hig-value'}`}>{i + 1}</span>
                    <span className="app-community-avatar" aria-hidden="true">{initialsFor(u.name)}</span>
                    <div>
                      <div className="app-community-name">
                        {u.name}
                        {isYou && <span className="hig-tag app-community-you-tag">(tu)</span>}
                      </div>
                      <div className="hig-footnote hig-secondary">{guardianLevelFor(u.points).title}</div>
                    </div>
                    <span className="hig-spacer" />
                    <span className="hig-value">{u.points} p</span>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
};

export default Community;
