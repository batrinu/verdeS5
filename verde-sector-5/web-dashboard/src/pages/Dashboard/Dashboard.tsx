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
import { SelectedTreeSheet } from '../../components/Pitch/SelectedTreeSheet';
import { usePresenter } from '../../context/PresenterContext';
import { Map, Trophy, BarChart3, AlertTriangle } from 'lucide-react';
import './Dashboard.css';

type MobileTab = 'MAP' | 'LEADERBOARD' | 'COUNCIL';

export const Dashboard: React.FC = () => {
  const { role, selectedNeighborhood, addPoints, incrementWaterings } = usePresenter();

  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [alerts, setAlerts] = useState<CareAlertItem[]>([]);
  const [stats, setStats] = useState<DistrictStat[]>([]);

  // Mobile active tab state
  const [mobileTab, setMobileTab] = useState<MobileTab>('MAP');

  // Selected Tree Bottom Sheet Target
  const [selectedTree, setSelectedTree] = useState<TreeItem | null>(null);

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
    setSelectedTree(null);
    addPoints(100);
    loadData();
  };

  const handleWaterConfirm = async (treeId: string, liters: number, userName: string) => {
    await TreeService.waterTree(treeId, liters, userName);
    setWaterTreeModalTarget(null);
    setSelectedTree(null);
    addPoints(50);
    incrementWaterings();
    loadData();
  };

  const handleCreateAlert = async (neighborhood: Sector5Neighborhood, alertType: any, message: string) => {
    await TreeService.createAlert(neighborhood, alertType, message);
    loadData();
  };

  return (
    <div className="dashboard-root">
      <PitchHeader />

      <div className="dashboard-main-container">
        {/* Mobile View Switcher Tabs (< 768px) */}
        <div className="mobile-view-tabs" role="tablist" aria-label="Navigare Mobil">
          <button
            role="tab"
            aria-selected={mobileTab === 'MAP'}
            className={`mobile-view-tab ${mobileTab === 'MAP' ? 'active' : ''}`}
            onClick={() => setMobileTab('MAP')}
          >
            <Map size={15} />
            <span>Hartă</span>
          </button>

          <button
            role="tab"
            aria-selected={mobileTab === 'LEADERBOARD'}
            className={`mobile-view-tab ${mobileTab === 'LEADERBOARD' ? 'active' : ''}`}
            onClick={() => setMobileTab('LEADERBOARD')}
          >
            <Trophy size={15} />
            <span>Clasament</span>
          </button>

          <button
            role="tab"
            aria-selected={mobileTab === 'COUNCIL'}
            className={`mobile-view-tab ${mobileTab === 'COUNCIL' ? 'active' : ''}`}
            onClick={() => setMobileTab('COUNCIL')}
          >
            <BarChart3 size={15} />
            <span>Consiliu</span>
          </button>
        </div>

        {/* Caniculă Alert Banner for Citizens */}
        {role === 'CITIZEN' && alerts.length > 0 && (
          <div className="dashboard-alert-banner" role="alert">
            <div className="dashboard-alert-content">
              <AlertTriangle size={20} color="#f43f5e" />
              <div>
                <strong style={{ fontSize: '13px', color: '#fda4af' }}>ALERTĂ CANICULĂ SECTOR 5:</strong>
                <span style={{ fontSize: '13px', color: '#fecdd3', marginLeft: '6px' }}>{alerts[0].message}</span>
              </div>
            </div>
            <span className="alert-badge-red">Acțiune Necesară</span>
          </div>
        )}

        {/* Dashboard Grid Layout */}
        <div className="dashboard-grid">
          
          {/* Left Column: Interactive Map */}
          <div className={`dashboard-map-column ${mobileTab === 'MAP' ? 'mobile-tab-active' : ''}`}>
            <div className="map-column-header">
              <h2 className="map-title">
                🗺️ Registrul Interactiv al Arborilor
              </h2>
              <span className="map-tree-counter">
                {trees.length} Arbori Afișați
              </span>
            </div>

            <div className="map-wrapper">
              <Sector5TreeMap
                trees={trees}
                selectedNeighborhood={selectedNeighborhood}
                onSelectTree={(tree) => setSelectedTree(tree)}
                onAdoptClick={(tree) => setAdoptTreeModalTarget(tree)}
                onWaterClick={(tree) => setWaterTreeModalTarget(tree)}
              />
            </div>
          </div>

          {/* Right Column: Dynamic Role Cards */}
          <div className={`dashboard-cards-column ${mobileTab !== 'MAP' ? 'mobile-tab-active' : ''}`}>
            {/* Citizen View: District Leaderboard */}
            {(role === 'CITIZEN' || mobileTab === 'LEADERBOARD') && (
              <DistrictLeaderboard
                stats={stats}
                selectedNeighborhood={selectedNeighborhood}
                onSelectNeighborhood={() => {}}
              />
            )}

            {/* Council Admin View: Analytics & Dispatcher */}
            {(role === 'COUNCIL_ADMIN' || mobileTab === 'COUNCIL') && (
              <>
                <CouncilAnalyticsBoard trees={trees} stats={stats} />
                <CouncilAlertDispatcher alerts={alerts} onCreateAlert={handleCreateAlert} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Selected Tree Mobile Bottom Sheet */}
      <SelectedTreeSheet
        tree={selectedTree}
        onClose={() => setSelectedTree(null)}
        onAdoptClick={(tree) => setAdoptTreeModalTarget(tree)}
        onWaterClick={(tree) => setWaterTreeModalTarget(tree)}
      />

      {/* Adoption Modal */}
      {adoptTreeModalTarget && (
        <AdoptTreeModal
          tree={adoptTreeModalTarget}
          onClose={() => setAdoptTreeModalTarget(null)}
          onConfirm={handleAdoptConfirm}
        />
      )}

      {/* Water Tree Modal */}
      {waterTreeModalTarget && (
        <LogWateringModal
          tree={waterTreeModalTarget}
          onClose={() => setWaterTreeModalTarget(null)}
          onConfirm={handleWaterConfirm}
        />
      )}
    </div>
  );
};

export default Dashboard;
