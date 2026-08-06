import React, { useEffect, useRef } from 'react';
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

const NEIGHBORHOOD_CONFIGS: Record<string, { center: [number, number]; zoom: number }> = {
  Cotroceni: { center: [44.4332, 26.0725], zoom: 16 },
  Rahova: { center: [44.4178, 26.0665], zoom: 15.5 },
  Ferentari: { center: [44.4030, 26.0745], zoom: 15.5 },
  Sebastian: { center: [44.4265, 26.0825], zoom: 16 },
  Izvor: { center: [44.4308, 26.0875], zoom: 16 },
  ALL: { center: [44.4215, 26.0740], zoom: 13.8 },
};

interface Sector5TreeMapProps {
  trees: TreeItem[];
  selectedNeighborhood?: string;
  onSelectTree: (tree: TreeItem) => void;
  onAdoptClick: (tree: TreeItem) => void;
  onWaterClick: (tree: TreeItem) => void;
}

export const Sector5TreeMap: React.FC<Sector5TreeMapProps> = ({
  trees,
  selectedNeighborhood = 'ALL',
  onSelectTree,
  onAdoptClick,
  onWaterClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up if container was previously used
    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    const targetConfig = NEIGHBORHOOD_CONFIGS[selectedNeighborhood] || NEIGHBORHOOD_CONFIGS.ALL;

    // Initialize Leaflet map instance
    const map = L.map(mapContainerRef.current).setView(targetConfig.center, targetConfig.zoom);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const getMarkerIcon = (tree: TreeItem) => {
      if (tree.isAdopted) return adoptedIcon;
      if (tree.healthStatus === 'NEEDS_WATER') return needsWaterIcon;
      if (tree.healthStatus === 'ATTENTION_REQUIRED' || tree.healthStatus === 'CRITICAL') return attentionIcon;
      return healthyIcon;
    };

    // Escape user-derived values before they go into popup innerHTML (adopter
    // name / nickname are user input).
    const esc = (s: unknown) =>
      String(s ?? '').replace(/[&<>"']/g, (c) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string
      ));

    // Add tree markers
    trees.forEach((tree) => {
      // Descriptive accessible name so screen readers announce the tree, not "Marker".
      const label = `${tree.nickname || tree.species} — ${tree.neighborhood}, ${tree.isAdopted ? 'adoptat' : 'disponibil pentru adopție'} (${tree.code})`;
      const marker = L.marker([tree.latitude, tree.longitude], {
        icon: getMarkerIcon(tree),
        alt: label,
        title: label,
        keyboard: true,
      }).addTo(map);

      const popupContainer = document.createElement('div');
      popupContainer.style.minWidth = '220px';
      popupContainer.style.fontFamily = 'sans-serif';

      popupContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; gap: 8px;">
          <span style="font-size: 11px; font-weight: bold; color: #6EE7A0; text-transform: uppercase; letter-spacing: 0.5px;">
            ${esc(tree.neighborhood)} • ${esc(tree.code)}
          </span>
          ${tree.isAdopted ? `
            <span style="background-color: rgba(251, 191, 36, 0.15); color: #FBBF24; font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: 600;">
              🌟 Adoptat
            </span>
          ` : `
            <span style="background-color: rgba(56, 189, 248, 0.15); color: #38BDF8; font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: 600;">
              Disponibil
            </span>
          `}
        </div>
        <h4 style="margin: 0 0 4px 0; font-size: 15px; color: #f0fdf4;">
          ${esc(tree.nickname || tree.species)}
        </h4>
        <p style="margin: 0 0 10px 0; font-size: 12px; color: #94A3B8;">
          ${tree.isAdopted ? `Îngrijit de: ${esc(tree.adopterName)}` : `Specie: ${esc(tree.species)}`}
        </p>
        <div style="display: flex; gap: 6px; margin-top: 8px;">
          ${!tree.isAdopted ? `<button class="btn-adopt-tree" style="flex: 1; background-color: #34D87A; color: #0B1D1A; border: none; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer;">🌱 Adoptă</button>` : ''}
          <button class="btn-water-tree" style="flex: 1; background-color: #0EA5E9; color: #ffffff; border: none; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer;">💧 Udă Copacul</button>
        </div>
      `;

      // Event listener bindings
      const adoptBtn = popupContainer.querySelector('.btn-adopt-tree');
      if (adoptBtn) {
        adoptBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          onAdoptClick(tree);
        });
      }

      const waterBtn = popupContainer.querySelector('.btn-water-tree');
      if (waterBtn) {
        waterBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          onWaterClick(tree);
        });
      }

      marker.bindPopup(popupContainer);
      marker.on('click', () => onSelectTree(tree));
    });

    // Schedule invalidateSize to guarantee tiles load on mobile viewports & tabs
    const resizeTimer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 150);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [trees, selectedNeighborhood, onSelectTree, onAdoptClick, onWaterClick]);

  return (
    <div
      ref={mapContainerRef}
      className="sector5-map-container"
      style={{ height: '100%', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
    />
  );
};
