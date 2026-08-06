import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AdoptionCertificateModal } from '../../components/UI/AdoptionCertificateModal';
import { ToastContainer, type ToastAlert } from '../../components/UI/ToastContainer';
import { TreeService } from '../../api/treeService';
import type { TreeItem, CareAlertItem } from '../../types/tree';
import './Map.css';

// Fix for default leaflet icons in react
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const treeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const adoptedTreeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const reportIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map: React.FC = () => {
  const center: [number, number] = [44.4168, 26.0764]; // Sector 5, Bucharest
  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [rawAlerts, setRawAlerts] = useState<CareAlertItem[]>([]);
  const [toastAlerts, setToastAlerts] = useState<ToastAlert[]>([]);
  
  const [filterNeighborhood, setFilterNeighborhood] = useState<string>('toate');
  const [filterSpecies, setFilterSpecies] = useState<string>('toate');
  const [filterHealth, setFilterHealth] = useState<string>('toate');
  const [certModalTree, setCertModalTree] = useState<TreeItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTrees = await TreeService.getTrees();
        const fetchedAlerts = await TreeService.getAlerts();
        
        setTrees(fetchedTrees.length > 0 ? fetchedTrees : [
          {
            id: '1',
            code: 'S5-COT-001',
            latitude: 44.4170,
            longitude: 26.0750,
            species: 'Platan',
            nickname: 'Platanul Marelui Parc',
            neighborhood: 'Cotroceni',
            healthStatus: 'EXCELLENT',
            isAdopted: true,
            adopterName: 'Elena Popa',
            wateringsCount: 14,
          },
          {
            id: '2',
            code: 'S5-RAH-014',
            latitude: 44.4150,
            longitude: 26.0780,
            species: 'Tei',
            nickname: 'Teiul Parcului Sebastian',
            neighborhood: 'Rahova',
            healthStatus: 'NEEDS_WATER',
            isAdopted: false,
            wateringsCount: 3,
          },
          {
            id: '3',
            code: 'S5-FER-008',
            latitude: 44.4180,
            longitude: 26.0740,
            species: 'Castan',
            nickname: 'Castanul Ferentari',
            neighborhood: 'Ferentari',
            healthStatus: 'GOOD',
            isAdopted: true,
            adopterName: 'Andrei Ionescu',
            wateringsCount: 9,
          },
        ]);

        setRawAlerts(fetchedAlerts);

        // Display active alerts upon entering the map
        const initialToasts: ToastAlert[] = fetchedAlerts.map(alert => ({
          id: `toast-${alert.id}-${Date.now()}`,
          neighborhood: alert.neighborhood,
          alertType: alert.alertType,
          message: alert.message,
          autoDismissMs: 6000,
        }));

        setToastAlerts(initialToasts);

      } catch (error) {
        console.error('Failed to load map data:', error);
      }
    };

    fetchData();

    setReports([
      { id: 101, lat: 44.4160, lng: 26.0760, title: 'Copac căzut', status: 'Nou' },
      { id: 102, lat: 44.4190, lng: 26.0790, title: 'Crengi pe carosabil', status: 'În lucru' },
    ]);
  }, []);

  const handleNeighborhoodChange = (neighborhood: string) => {
    setFilterNeighborhood(neighborhood);

    if (neighborhood === 'toate') {
      const activeToasts: ToastAlert[] = rawAlerts.map(alert => ({
        id: `toast-${alert.id}-${Date.now()}`,
        neighborhood: alert.neighborhood,
        alertType: alert.alertType,
        message: alert.message,
        autoDismissMs: 5000,
      }));
      setToastAlerts(activeToasts);
    } else {
      const matchingAlerts = rawAlerts.filter(
        a => a.neighborhood.toLowerCase() === neighborhood.toLowerCase()
      );
      if (matchingAlerts.length > 0) {
        const newToasts: ToastAlert[] = matchingAlerts.map(alert => ({
          id: `toast-${alert.id}-${Date.now()}`,
          neighborhood: alert.neighborhood,
          alertType: alert.alertType,
          message: alert.message,
          autoDismissMs: 5000,
        }));
        setToastAlerts(newToasts);
      }
    }
  };

  const handleDismissToast = (id: string) => {
    setToastAlerts(prev => prev.filter(t => t.id !== id));
  };

  const handleAdoptTree = (treeToAdopt: TreeItem) => {
    const updatedTree: TreeItem = {
      ...treeToAdopt,
      isAdopted: true,
      adopterName: treeToAdopt.adopterName || 'Cetățean Sector 5',
    };

    setTrees(prev => prev.map(t => (t.id === treeToAdopt.id ? updatedTree : t)));
    setCertModalTree(updatedTree);
  };

  const filteredTrees = trees.filter(tree => {
    if (filterNeighborhood !== 'toate' && tree.neighborhood.toLowerCase() !== filterNeighborhood.toLowerCase()) return false;
    if (filterSpecies !== 'toate' && tree.species.toLowerCase() !== filterSpecies.toLowerCase()) return false;
    if (filterHealth !== 'toate' && tree.healthStatus.toLowerCase() !== filterHealth.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="map-page-container">
      <div className="map-sidebar">
        <h3>Filtre Hartă</h3>
        
        <div className="filter-group">
          <label>Cartier Sector 5</label>
          <select value={filterNeighborhood} onChange={e => handleNeighborhoodChange(e.target.value)}>
            <option value="toate">Toate cartierele</option>
            <option value="Cotroceni">Cotroceni</option>
            <option value="Rahova">Rahova</option>
            <option value="Ferentari">Ferentari</option>
            <option value="Sebastian">Sebastian</option>
            <option value="Izvor">Izvor</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Specie</label>
          <select value={filterSpecies} onChange={e => setFilterSpecies(e.target.value)}>
            <option value="toate">Toate speciile</option>
            <option value="platan">Platan</option>
            <option value="tei">Tei</option>
            <option value="castan">Castan</option>
            <option value="stejar">Stejar</option>
            <option value="arțar">Arțar</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Stare Sănătate</label>
          <select value={filterHealth} onChange={e => setFilterHealth(e.target.value)}>
            <option value="toate">Toate stările</option>
            <option value="excellent">Excelentă</option>
            <option value="good">Bună</option>
            <option value="needs_water">Necesită apă</option>
            <option value="attention_required">Atenție sporită</option>
          </select>
        </div>

        <div className="map-legend">
          <h4>Legendă</h4>
          <div className="legend-item">
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png" alt="Copac" />
            <span>Copac Disponibil</span>
          </div>
          <div className="legend-item">
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png" alt="Copac Adoptat" />
            <span>Copac Adoptat (Certificat)</span>
          </div>
          <div className="legend-item">
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png" alt="Raport" />
            <span>Problemă Semnalată</span>
          </div>
        </div>
      </div>

      <div className="map-wrapper">
        <MapContainer center={center} zoom={14} className="leaflet-map" scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredTrees.map(tree => (
            <Marker key={`tree-${tree.id}`} position={[tree.latitude, tree.longitude]} icon={tree.isAdopted ? adoptedTreeIcon : treeIcon}>
              <Popup>
                <div className="custom-popup" style={{ minWidth: '200px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#16a34a', textTransform: 'uppercase' }}>
                    {tree.neighborhood} • {tree.code}
                  </div>
                  <strong style={{ fontSize: '15px', display: 'block', margin: '4px 0 2px 0' }}>
                    {tree.nickname || tree.species}
                  </strong>
                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
                    Specie: {tree.species} | Stare: {tree.healthStatus}
                  </div>

                  {tree.isAdopted ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '11px', color: '#854d0e', backgroundColor: '#fef08a', padding: '3px 8px', borderRadius: '12px', textAlign: 'center', fontWeight: 600 }}>
                        🌟 Adoptat de {tree.adopterName}
                      </span>
                      <button
                        onClick={() => setCertModalTree(tree)}
                        style={{
                          backgroundColor: '#059669',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          marginTop: '4px',
                        }}
                      >
                        📜 Certificat Adopție
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdoptTree(tree)}
                      style={{
                        width: '100%',
                        backgroundColor: '#16a34a',
                        color: '#ffffff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      🌱 Adoptă & Generație Certificat
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {reports.map(report => (
            <Marker key={`report-${report.id}`} position={[report.lat, report.lng]} icon={reportIcon}>
              <Popup>
                <div className="custom-popup">
                  <strong>Raport: {report.title}</strong><br/>
                  Status: {report.status}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {certModalTree && (
        <AdoptionCertificateModal
          tree={certModalTree}
          onClose={() => setCertModalTree(null)}
        />
      )}

      {/* Real-time Municipal Heatwave & Care Toast Notification Banner Engine */}
      <ToastContainer toasts={toastAlerts} onDismiss={handleDismissToast} />
    </div>
  );
};

export default Map;


