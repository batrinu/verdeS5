import React, { useState, useEffect, useCallback } from 'react';
import { TreeService } from '../../api/treeService';
import type { TreeItem, CareAlertItem, DistrictStat, Sector5Neighborhood } from '../../types/tree';
import { Sector5TreeMap } from '../../components/Pitch/Sector5TreeMap';
import { AdoptTreeModal } from '../../components/Pitch/AdoptTreeModal';
import { LogWateringModal } from '../../components/Pitch/LogWateringModal';
import { AdoptionCertificateModal } from '../../components/UI/AdoptionCertificateModal';
import { ToastContainer, type ToastAlert } from '../../components/UI/ToastContainer';
import { DistrictLeaderboard } from '../../components/Pitch/DistrictLeaderboard';
import { CouncilAlertDispatcher } from '../../components/Pitch/CouncilAlertDispatcher';
import { CouncilAnalyticsBoard } from '../../components/Pitch/CouncilAnalyticsBoard';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { SelectedTreeSheet } from '../../components/Pitch/SelectedTreeSheet';
import { usePresenter } from '../../context/PresenterContext';
import { Map, Trophy, BarChart3 } from 'lucide-react';
import './Dashboard.css';

type MobileTab = 'MAP' | 'DETAILS';

export const Dashboard: React.FC = () => {
  const { role, selectedNeighborhood, addPoints, incrementWaterings } = usePresenter();

  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [alerts, setAlerts] = useState<CareAlertItem[]>([]);
  const [stats, setStats] = useState<DistrictStat[]>([]);
  const [toastAlerts, setToastAlerts] = useState<ToastAlert[]>([]);

  // Mobile active tab state
  const [mobileTab, setMobileTab] = useState<MobileTab>('MAP');

  // Selected Tree Bottom Sheet Target
  const [selectedTree, setSelectedTree] = useState<TreeItem | null>(null);

  // Active Modals state
  const [adoptTreeModalTarget, setAdoptTreeModalTarget] = useState<TreeItem | null>(null);
  const [waterTreeModalTarget, setWaterTreeModalTarget] = useState<TreeItem | null>(null);
  const [adoptionCertModalTarget, setAdoptionCertModalTarget] = useState<TreeItem | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [fetchedTrees, fetchedAlerts, fetchedStats] = await Promise.all([
        TreeService.getTrees(selectedNeighborhood),
        TreeService.getAlerts(),
        TreeService.getDistrictStats(),
      ]);
      setTrees(fetchedTrees);
      setAlerts(fetchedAlerts);
      setStats(fetchedStats);

      const matchingAlerts = fetchedAlerts.filter(
        a => selectedNeighborhood === 'ALL' || a.neighborhood.toLowerCase() === selectedNeighborhood.toLowerCase()
      );
      if (matchingAlerts.length > 0) {
        setToastAlerts(matchingAlerts.map(a => ({
          id: `toast-dash-${a.id}-${Date.now()}`,
          neighborhood: a.neighborhood,
          alertType: a.alertType,
          message: a.message,
          autoDismissMs: 5000,
        })));
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  }, [selectedNeighborhood]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAdoptConfirm = async (treeId: string, adopterName: string, nickname: string) => {
    await TreeService.adoptTree(treeId, adopterName, nickname);

    // Find tree or create updated record to show in certificate
    const target = trees.find(t => t.id === treeId) || adoptTreeModalTarget;
    const updatedTree: TreeItem = target ? {
      ...target,
      isAdopted: true,
      adopterName,
      nickname,
    } : {
      id: treeId,
      code: 'S5-COT-001',
      species: 'Tei',
      latitude: 44.4332,
      longitude: 26.0725,
      neighborhood: 'Cotroceni',
      healthStatus: 'EXCELLENT',
      isAdopted: true,
      adopterName,
      nickname,
    };

    setAdoptTreeModalTarget(null);
    setSelectedTree(null);
    addPoints(100);
    setAdoptionCertModalTarget(updatedTree);
    loadData();
  };

  const handleWaterConfirm = async (
    treeId: string,
    liters: number,
    userName: string,
    photoProofUrl?: string,
    isPhotoVerified?: boolean
  ) => {
    await TreeService.waterTree(treeId, liters, userName, photoProofUrl, isPhotoVerified);
    setWaterTreeModalTarget(null);
    setSelectedTree(null);
    const basePoints = liters * 5;
    const bonusPoints = isPhotoVerified ? 50 : 0;
    addPoints(basePoints + bonusPoints);
    incrementWaterings();
    loadData();
  };

  const handleCreateAlert = async (neighborhood: Sector5Neighborhood, alertType: CareAlertItem['alertType'], message: string) => {
    await TreeService.createAlert(neighborhood, alertType, message);
    loadData();
  };

  return (
    <div className="dashboard-root">
      <PitchHeader />

      <div className="dashboard-main-container">
        {/* Mobile View Switcher Tabs (< 768px only) */}
        <div className="mobile-view-tabs" role="tablist" aria-label="Navigare Mobil">
          <button
            role="tab"
            aria-selected={mobileTab === 'MAP'}
            className={`mobile-view-tab ${mobileTab === 'MAP' ? (role === 'COUNCIL_ADMIN' ? 'active council-active' : 'active') : ''}`}
            onClick={() => setMobileTab('MAP')}
          >
            <Map size={15} />
            <span>🗺️ Hartă</span>
          </button>

          <button
            role="tab"
            aria-selected={mobileTab === 'DETAILS'}
            className={`mobile-view-tab ${mobileTab === 'DETAILS' ? (role === 'COUNCIL_ADMIN' ? 'active council-active' : 'active') : ''}`}
            onClick={() => setMobileTab('DETAILS')}
          >
            {role === 'CITIZEN' ? (
              <>
                <Trophy size={15} />
                <span>🏆 Clasament</span>
              </>
            ) : (
              <>
                <BarChart3 size={15} />
                <span>📊 Raport Consiliu</span>
              </>
            )}
          </button>
        </div>

        {/* Dashboard Split-Screen Grid Layout */}
        <div className="dashboard-grid">

          {/* Left Column: Interactive Map */}
          <div className={`dashboard-map-column ${mobileTab === 'MAP' ? 'mobile-active' : ''}`}>
            <div className="map-column-header">
              <h2 className="map-title">
                🗺️ Registrul Interactiv al Arborilor
              </h2>
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

          {/* Right Column: Persona-Specific Cards */}
          <div className={`dashboard-cards-column ${mobileTab === 'DETAILS' ? 'mobile-active' : ''}`}>
            {role === 'CITIZEN' ? (
              /* Citizen Persona: District Leaderboard */
              <DistrictLeaderboard
                stats={stats}
                selectedNeighborhood={selectedNeighborhood}
                onSelectNeighborhood={() => {}}
              />
            ) : (
              /* Council Admin Persona: Executive Analytics & Alert Dispatcher */
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
        onCertClick={(tree) => setAdoptionCertModalTarget(tree)}
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

      {/* Adoption Certificate Digital Modal */}
      {adoptionCertModalTarget && (
        <AdoptionCertificateModal
          tree={adoptionCertModalTarget}
          onClose={() => setAdoptionCertModalTarget(null)}
        />
      )}

      {/* Real-time Municipal Heatwave Toast Notification Engine */}
      <ToastContainer
        toasts={toastAlerts}
        onDismiss={(id) => setToastAlerts(prev => prev.filter(t => t.id !== id))}
      />
    </div>
  );
};

export default Dashboard;
