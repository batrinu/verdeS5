import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
  const [trees, setTrees] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [filterSpecies, setFilterSpecies] = useState('toate');
  const [filterHealth, setFilterHealth] = useState('toate');

  useEffect(() => {
    // Mock fetch for markers
    setTrees([
      { id: 1, lat: 44.4170, lng: 26.0750, species: 'Platan', health: 'Sănătos' },
      { id: 2, lat: 44.4150, lng: 26.0780, species: 'Tei', health: 'Necesită toaletare' },
      { id: 3, lat: 44.4180, lng: 26.0740, species: 'Castan', health: 'Sănătos' },
    ]);
    
    setReports([
      { id: 101, lat: 44.4160, lng: 26.0760, title: 'Copac căzut', status: 'Nou' },
      { id: 102, lat: 44.4190, lng: 26.0790, title: 'Crengi pe carosabil', status: 'În lucru' },
    ]);
  }, []);

  const filteredTrees = trees.filter(tree => {
    if (filterSpecies !== 'toate' && tree.species.toLowerCase() !== filterSpecies) return false;
    if (filterHealth !== 'toate' && tree.health.toLowerCase() !== filterHealth) return false;
    return true;
  });

  return (
    <div className="map-page-container">
      <div className="map-sidebar">
        <h3>Filtre Hartă</h3>
        
        <div className="filter-group">
          <label>Specie</label>
          <select value={filterSpecies} onChange={e => setFilterSpecies(e.target.value)}>
            <option value="toate">Toate</option>
            <option value="platan">Platan</option>
            <option value="tei">Tei</option>
            <option value="castan">Castan</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Stare Sănătate</label>
          <select value={filterHealth} onChange={e => setFilterHealth(e.target.value)}>
            <option value="toate">Toate</option>
            <option value="sănătos">Sănătos</option>
            <option value="necesită toaletare">Necesită toaletare</option>
            <option value="uscat">Uscat</option>
          </select>
        </div>

        <div className="map-legend">
          <h4>Legendă</h4>
          <div className="legend-item">
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png" alt="Copac" />
            <span>Copac</span>
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
            <Marker key={`tree-${tree.id}`} position={[tree.lat, tree.lng]} icon={treeIcon}>
              <Popup>
                <div className="custom-popup">
                  <strong>Copac: {tree.species}</strong><br/>
                  Stare: {tree.health}
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
    </div>
  );
};

export default Map;
