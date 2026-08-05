import React, { useState, useEffect } from 'react';
import { TreeService } from '../../api/treeService';
import type { TreeItem, CareAlertItem, DistrictStat, Sector5Neighborhood } from '../../types/tree';
import { Sector5TreeMap } from '../../components/Pitch/Sector5TreeMap';
import { AdoptTreeModal } from '../../components/Pitch/AdoptTreeModal';
import { LogWateringModal } from '../../components/Pitch/LogWateringModal';
import { DistrictLeaderboard } from '../../components/Pitch/DistrictLeaderboard';
import { CouncilAlertDispatcher } from '../../components/Pitch/CouncilAlertDispatcher';
import { CouncilAnalyticsBoard } from '../../components/Pitch/CouncilAnalyticsBoard';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { usePresenter } from '../../context/PresenterContext';

export const Dashboard: React.FC = () => {
  const { role, selectedNeighborhood, setSelectedNeighborhood, addPoints, incrementWaterings } = usePresenter();

  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [alerts, setAlerts] = useState<CareAlertItem[]>([]);
  const [stats, setStats] = useState<DistrictStat[]>([]);

  // Active Modals state
  const [adoptTreeModalTarget, setAdoptTreeModalTarget] = useState<TreeItem | null>(null);
  const [waterTreeModalTarget, setWaterTreeModalTarget] = useState<TreeItem | null>(null);

  const loadData = async () => {
    try {
      const [fetchedTrees, fetchedAlerts, fetchedStats] = await Promise.all([
        TreeService.getTrees(selectedNeighborhood),
        TreeService.getAlerts(),
        TreeService.getDistrictStats(),
      ]);
      setTrees(fetchedTrees);
      setAlerts(fetchedAlerts);
      setStats(fetchedStats);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedNeighborhood]);

  const handleAdoptConfirm = async (treeId: string, adopterName: string, nickname: string) => {
    await TreeService.adoptTree(treeId, adopterName, nickname);
    setAdoptTreeModalTarget(null);
    addPoints(100);
    loadData();
  };

  const handleWaterConfirm = async (treeId: string, liters: number, userName: string) => {
    await TreeService.waterTree(treeId, liters, userName);
    setWaterTreeModalTarget(null);
    addPoints(50);
    incrementWaterings();
    loadData();
  };

  const handleCreateAlert = async (neighborhood: Sector5Neighborhood, alertType: any, message: string) => {
    await TreeService.createAlert(neighborhood, alertType, message);
    loadData();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <PitchHeader />

      {/* Main Container */}
      <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Banner Alert for Citizens */}
        {role === 'CITIZEN' && alerts.length > 0 && (
          <div style={{
            backgroundColor: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(225, 29, 72, 0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>🚨</span>
              <div>
                <strong style={{ fontSize: '13px', color: '#be123c' }}>ALERTĂ CANICULĂ SECTOR 5:</strong>
                <span style={{ fontSize: '13px', color: '#9f1239', marginLeft: '6px' }}>{alerts[0].message}</span>
              </div>
            </div>
            <span style={{ fontSize: '11px', backgroundColor: '#e11d48', color: '#ffffff', padding: '4px 10px', borderRadius: '12px', fontWeight: 700 }}>
              Action Needed
            </span>
          </div>
        )}

        {/* Dashboard Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', flex: 1, minHeight: '650px' }}>
          
          {/* Left Column: Interactive Map */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                🗺️ Registrul Interactiv al Arborilor din Sectorul 5
              </h2>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                {trees.length} Arbori Afișați
              </span>
            </div>

            <div style={{ flex: 1, minHeight: '580px' }}>
              <Sector5TreeMap
                trees={trees}
                onSelectTree={() => {}}
                onAdoptClick={setAdoptTreeModalTarget}
                onWaterClick={setWaterTreeModalTarget}
              />
            </div>
          </div>

          {/* Right Column: Dynamic Role Views */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {role === 'CITIZEN' ? (
              <>
                <DistrictLeaderboard
                  stats={stats}
                  selectedNeighborhood={selectedNeighborhood}
                  onSelectNeighborhood={setSelectedNeighborhood}
                />

                {/* Citizen Quick Action Guide */}
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #f1f5f9',
                }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                    💡 Cum Funcționează Rețeaua Verde?
                  </h3>
                  <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    <li>Alege un copac din cartierul tău pe hartă.</li>
                    <li>Apasă pe <strong>"Adoptă"</strong> pentru a-i da un nume și a avea grijă de el.</li>
                    <li>Udă copacul în zilele de caniculă și apasă <strong>"Udă Copacul"</strong>.</li>
                    <li>Urcă în clasament și adu cartierul tău pe locul #1 în Sectorul 5!</li>
                  </ol>
                </div>
              </>
            ) : (
              <>
                <CouncilAnalyticsBoard stats={stats} trees={trees} />
                <CouncilAlertDispatcher alerts={alerts} onCreateAlert={handleCreateAlert} />
              </>
            )}

          </div>

        </div>

      </div>

      {/* Modals */}
      <AdoptTreeModal
        tree={adoptTreeModalTarget}
        onClose={() => setAdoptTreeModalTarget(null)}
        onConfirm={handleAdoptConfirm}
      />

      <LogWateringModal
        tree={waterTreeModalTarget}
        onClose={() => setWaterTreeModalTarget(null)}
        onConfirm={handleWaterConfirm}
      />
    </div>
  );
};

export default Dashboard;
