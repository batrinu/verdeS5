import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { TreeItem } from '../../types/tree';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom pin icons
const healthyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const needsWaterIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const attentionIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const adoptedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Sector5TreeMapProps {
  trees: TreeItem[];
  onSelectTree: (tree: TreeItem) => void;
  onAdoptClick: (tree: TreeItem) => void;
  onWaterClick: (tree: TreeItem) => void;
}

export const Sector5TreeMap: React.FC<Sector5TreeMapProps> = ({
  trees,
  onSelectTree,
  onAdoptClick,
  onWaterClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Center of Sector 5, Bucharest
  const center: [number, number] = [44.4215, 26.0740];

  useEffect(() => {
    return () => {
      if (containerRef.current) {
        // Clean up any stray Leaflet DOM state on unmount
        (containerRef.current as any)._leaflet_id = null;
      }
    };
  }, []);

  const getMarkerIcon = (tree: TreeItem) => {
    if (tree.isAdopted) return adoptedIcon;
    if (tree.healthStatus === 'NEEDS_WATER') return needsWaterIcon;
    if (tree.healthStatus === 'ATTENTION_REQUIRED' || tree.healthStatus === 'CRITICAL') return attentionIcon;
    return healthyIcon;
  };

  return (
    <div
      ref={containerRef}
      className="sector5-map-container"
      style={{ height: '100%', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
    >
      <MapContainer
        key="sector5-leaflet-map-instance"
        center={center}
        zoom={13.5}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {trees.map((tree) => (
          <Marker
            key={tree.id}
            position={[tree.latitude, tree.longitude]}
            icon={getMarkerIcon(tree)}
            eventHandlers={{
              click: () => onSelectTree(tree),
            }}
          >
            <Popup>
              <div style={{ minWidth: '220px', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {tree.neighborhood} • {tree.code}
                  </span>
                  {tree.isAdopted ? (
                    <span style={{ backgroundColor: '#fef08a', color: '#854d0e', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 600 }}>
                      🌟 Adoptat
                    </span>
                  ) : (
                    <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 600 }}>
                      Disponibil
                    </span>
                  )}
                </div>

                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#0f172a' }}>
                  {tree.nickname || tree.species}
                </h4>
                <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#64748b' }}>
                  {tree.isAdopted ? `Îngrijit de: ${tree.adopterName}` : `Specie: ${tree.species}`}
                </p>

                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  {!tree.isAdopted && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdoptClick(tree);
                      }}
                      style={{
                        flex: 1,
                        backgroundColor: '#16a34a',
                        color: '#ffffff',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      🌱 Adoptă
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onWaterClick(tree);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    💧 Udă Copacul
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
