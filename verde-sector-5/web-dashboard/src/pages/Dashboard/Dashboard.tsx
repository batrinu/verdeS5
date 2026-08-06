import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TreeService, isApiReachable } from '../../api/treeService';
import type { TreeItem, CareAlertItem, DistrictStat, Sector5Neighborhood } from '../../types/tree';
import { Sector5TreeMap } from '../../components/Pitch/Sector5TreeMap';
import { AdoptTreeModal } from '../../components/Pitch/AdoptTreeModal';
import { LogWateringModal } from '../../components/Pitch/LogWateringModal';
import { AdoptionCertificateModal } from '../../components/UI/AdoptionCertificateModal';
import { ToastContainer, type ToastAlert } from '../../components/UI/ToastContainer';
import { DistrictLeaderboard } from '../../components/Pitch/DistrictLeaderboard';
import { CitizenAlertsFeed } from '../../components/Pitch/CitizenAlertsFeed';
import { CouncilAlertDispatcher } from '../../components/Pitch/CouncilAlertDispatcher';
import { CouncilAnalyticsBoard } from '../../components/Pitch/CouncilAnalyticsBoard';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { SelectedTreeSheet } from '../../components/Pitch/SelectedTreeSheet';
import { usePresenter } from '../../context/PresenterContext';
import { Map, Trophy, BarChart3, MapPin } from 'lucide-react';
import './Dashboard.css';

type MobileTab = 'MAP' | 'DETAILS';

export const Dashboard: React.FC = () => {
  const { role, selectedNeighborhood, setSelectedNeighborhood, addPoints, incrementWaterings } = usePresenter();

  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [alerts, setAlerts] = useState<CareAlertItem[]>([]);
  const [stats, setStats] = useState<DistrictStat[]>([]);
  const [toastAlerts, setToastAlerts] = useState<ToastAlert[]>([]);

  // Track which alert IDs we've already seen so toasts only fire for alerts that
  // newly arrive — the persistent "Alerte Active" feed covers everything else.
  const seenAlertIdsRef = useRef<Set<string>>(new Set());
  const isFirstLoadRef = useRef(true);
  // True when the API is unreachable and we're showing local demo data.
  const [isOffline, setIsOffline] = useState(false);
  // True until the first data load settles — drives the loading skeleton.
  const [isLoading, setIsLoading] = useState(true);

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

      if (isFirstLoadRef.current) {
        // First load: the persistent alerts feed already lists these, so seed the
        // "seen" set silently instead of firing a redundant burst of toasts.
        fetchedAlerts.forEach(a => seenAlertIdsRef.current.add(a.id));
        isFirstLoadRef.current = false;
      } else {
        // Toast only alerts that have newly arrived since the last refresh.
        const newAlerts = matchingAlerts.filter(a => !seenAlertIdsRef.current.has(a.id));
        fetchedAlerts.forEach(a => seenAlertIdsRef.current.add(a.id));
        if (newAlerts.length > 0) {
          setToastAlerts(newAlerts.map(a => ({
            id: `toast-dash-${a.id}-${Date.now()}`,
            neighborhood: a.neighborhood,
            alertType: a.alertType,
            message: a.message,
            autoDismissMs: 5000,
          })));
        }
      }

      // Honest connection status: if the API is unreachable we're showing local
      // demo data — surface it with a persistent indicator instead of failing
      // silently.
      setIsOffline(!isApiReachable());
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
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
    // The certificate is the success cue; only surface the offline case.
    setIsOffline(!isApiReachable());
    if (!isApiReachable()) {
      setToastAlerts(prev => [...prev, {
        id: `adopt-offline-${Date.now()}`,
        neighborhood: 'Sector 5',
        alertType: 'default',
        title: '💾 Salvat local',
        message: 'Adopția e salvată local — se va sincroniza automat când revii online.',
        autoDismissMs: 6000,
      }]);
    }
    loadData();
  };

  // Confirm a write to the user and, if the server sync failed, say so honestly
  // instead of pretending it persisted.
  const notifyWrite = (okToast: ToastAlert, offlineMessage: string) => {
    const toast: ToastAlert = isApiReachable()
      ? okToast
      : {
          id: `write-offline-${Date.now()}`,
          neighborhood: 'Sector 5',
          alertType: 'default',
          title: '💾 Salvat local',
          message: offlineMessage,
          autoDismissMs: 6000,
        };
    setToastAlerts(prev => [...prev, toast]);
    setIsOffline(!isApiReachable());
  };

  const handleWaterConfirm = async (
    treeId: string,
    liters: number,
    userName: string,
    photoProofUrl?: string,
    isPhotoVerified?: boolean
  ) => {
    // Optimistic: close and credit points immediately, then persist.
    setWaterTreeModalTarget(null);
    setSelectedTree(null);
    const basePoints = liters * 5;
    const bonusPoints = isPhotoVerified ? 50 : 0;
    addPoints(basePoints + bonusPoints);
    incrementWaterings();
    await TreeService.waterTree(treeId, liters, userName, photoProofUrl, isPhotoVerified);
    notifyWrite(
      {
        id: `water-ok-${Date.now()}`,
        neighborhood: 'Sector 5',
        alertType: 'YOUNG_TREE_WATERING',
        title: '💧 Udare înregistrată!',
        message: `+${basePoints + bonusPoints} EcoPuncte adăugate. Mulțumim!`,
        autoDismissMs: 4000,
      },
      'Udarea e salvată local — se va sincroniza automat când revii online.'
    );
    loadData();
  };

  const handleCreateAlert = async (neighborhood: Sector5Neighborhood, alertType: CareAlertItem['alertType'], message: string) => {
    await TreeService.createAlert(neighborhood, alertType, message);
    notifyWrite(
      {
        id: `alert-ok-${Date.now()}`,
        neighborhood,
        alertType,
        title: '📢 Alertă transmisă',
        message: 'Cetățenii din zonă au fost notificați.',
        autoDismissMs: 4000,
      },
      'Alerta e salvată local — se va sincroniza automat când revii online.'
    );
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
            <span>Hartă</span>
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
                <span>Clasament</span>
              </>
            ) : (
              <>
                <BarChart3 size={15} />
                <span>Raport Consiliu</span>
              </>
            )}
          </button>
        </div>

        {/* Offline / local-data notice */}
        {isOffline && (
          <div className="offline-banner" role="status">
            📡 Mod offline — nu ne-am putut conecta la server, afișăm date demonstrative locale.
          </div>
        )}

        {/* Dashboard Split-Screen Grid Layout */}
        <div className="dashboard-grid">

          {/* Left Column: Interactive Map */}
          <div className={`dashboard-map-column ${mobileTab === 'MAP' ? 'mobile-active' : ''}`}>
            <div className="map-column-header">
              <div className="district-selector-group">
                <MapPin size={16} color="#94a3b8" />
                <label htmlFor="district-select" className="district-label">
                  Cartier:
                </label>
                <select
                  id="district-select"
                  className="district-select-input"
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value as any)}
                  aria-label="Selectează cartierul din Sectorul 5"
                >
                  <option value="ALL">Toate Cartierele (Sector 5)</option>
                  <option value="Cotroceni">Cotroceni</option>
                  <option value="Rahova">Rahova</option>
                  <option value="Ferentari">Ferentari</option>
                  <option value="Sebastian">Sebastian</option>
                  <option value="Izvor">Izvor</option>
                </select>
              </div>

              <p className="map-hint">
                💡 Apasă un copac de pe hartă pentru a-l adopta sau a-i loga o udare.
              </p>
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
            {isLoading && stats.length === 0 ? (
              /* First-load skeleton so the column isn't blank while data arrives */
              <div className="skeleton-card" aria-hidden="true">
                <div className="skeleton-line" style={{ width: '55%' }} />
                <div className="skeleton-row" />
                <div className="skeleton-row" />
                <div className="skeleton-row" />
                <div className="skeleton-row" />
                <div className="skeleton-row" />
              </div>
            ) : role === 'CITIZEN' ? (
              /* Citizen Persona: District Leaderboard + Active Alerts Feed */
              <>
                <DistrictLeaderboard
                  stats={stats}
                  selectedNeighborhood={selectedNeighborhood}
                  onSelectNeighborhood={() => {}}
                />
                <CitizenAlertsFeed alerts={alerts} />
              </>
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
