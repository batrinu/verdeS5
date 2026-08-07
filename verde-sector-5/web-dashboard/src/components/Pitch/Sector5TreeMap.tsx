import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import type { TreeItem } from '../../types/tree';
import { computeWaterStatus, waterStatusLabel, type WaterStatus } from '../../utils/treeCare';

// Marker fill color now comes from water status (Task 14's computeWaterStatus),
// not health status — an SVG divIcon lets us paint the exact legend hex values,
// which the fixed CDN pin-color presets used previously could not do. Shape and
// size (25x41 teardrop pin, same anchors) are kept identical to the old L.Icon
// markers. Adoption is preserved as its own affordance (gold ring + star badge)
// rather than overriding the color, so an adopted tree that's thirsty still reads
// as thirsty.
const treeIconCache = new Map<string, L.DivIcon>();

const buildTreeIcon = (status: WaterStatus, isAdopted: boolean): L.DivIcon => {
  const cacheKey = `${status}-${isAdopted}`;
  const cached = treeIconCache.get(cacheKey);
  if (cached) return cached;

  // Fill/stroke are CSS-variable-driven classes (app.css section 2), not
  // inline hex — status picks the fill (.app-map-pin.<status>), adoption
  // picks the stroke (.app-map-pin.adopted), so the pin stays theme-aware
  // in both light and dark instead of baking in a fixed color.
  const pinClass = `app-map-pin ${status}${isAdopted ? ' adopted' : ''}`;
  const centerMark = isAdopted
    ? '<circle cx="12.5" cy="12.5" r="4.5" class="app-map-pin-badge adopted" /><text x="12.5" y="15.5" text-anchor="middle" font-size="7" class="app-map-pin-star">★</text>'
    : '<circle cx="12.5" cy="12.5" r="4.5" class="app-map-pin-badge" />';

  const html = `
    <svg class="app-map-svg" width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <path
        class="${pinClass}"
        d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.5 12.5 28.5S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z"
      />
      ${centerMark}
    </svg>
  `;

  const icon = L.divIcon({
    className: 'tree-marker-icon',
    html,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  treeIconCache.set(cacheKey, icon);
  return icon;
};

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
  selectedTreeId?: string | null;
  onSelectTree: (tree: TreeItem) => void;
}

export const Sector5TreeMap: React.FC<Sector5TreeMapProps> = ({
  trees,
  selectedNeighborhood = 'ALL',
  selectedTreeId = null,
  onSelectTree,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerClusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const markersByIdRef = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up if container was previously used
    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    const targetConfig = NEIGHBORHOOD_CONFIGS[selectedNeighborhood] || NEIGHBORHOOD_CONFIGS.ALL;

    // Initialize Leaflet map instance
    const map = L.map(mapContainerRef.current, { zoomControl: false }).setView(
      targetConfig.center,
      targetConfig.zoom,
    );
    // Zoom lives top-right so it never collides with the desktop sheet panel (top-left).
    L.control.zoom({ position: 'topright' }).addTo(map);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    const markerCluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 48,
      iconCreateFunction: (cluster) =>
        L.divIcon({
          html: `<span>${cluster.getChildCount()}</span>`,
          className: 'app-map-cluster',
          iconSize: L.point(36, 36),
          iconAnchor: L.point(18, 18),
        }),
    });
    markerClusterRef.current = markerCluster;
    const markersById = new Map<string, L.Marker>();
    markersByIdRef.current = markersById;

    // Add tree markers
    trees.forEach((tree) => {
      const status = computeWaterStatus(tree);
      // Descriptive accessible name so screen readers announce the tree, not "Marker".
      // Water status is appended so the label carries the same info the marker color does.
      const label = `${tree.nickname || tree.species} — ${tree.neighborhood}, ${tree.isAdopted ? 'adoptat' : 'disponibil pentru adopție'} (${tree.code}) — ${waterStatusLabel(status)}`;
      const marker = L.marker([tree.latitude, tree.longitude], {
        icon: buildTreeIcon(status, tree.isAdopted),
        alt: label,
        title: label,
        keyboard: true,
      });

      marker.on('click', () => onSelectTree(tree));

      markerCluster.addLayer(marker);
      markersById.set(tree.id, marker);
    });

    map.addLayer(markerCluster);

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
  }, [trees, selectedNeighborhood, onSelectTree]);

  // Lightweight selection effect — toggles the ring class and pans to the
  // selected marker without rebuilding the whole map (kept separate from the
  // main init effect above so selecting a tree never resets the viewport).
  useEffect(() => {
    const cluster = markerClusterRef.current;
    const markers = markersByIdRef.current;
    if (!cluster) return;

    // Clear any previous selection ring.
    markers.forEach((m) => m.getElement()?.classList.remove('is-selected'));

    if (!selectedTreeId) return;
    const marker = markers.get(selectedTreeId);
    if (!marker) return;

    // Expand the enclosing cluster, then ring the marker once it is on the map.
    cluster.zoomToShowLayer(marker, () => {
      marker.getElement()?.classList.add('is-selected');
    });
  }, [selectedTreeId, trees]);

  return (
    // Leaflet mounts directly into the ref'd div's DOM, outside React's own
    // tracking of its children — the legend must be a *sibling* in an outer
    // wrapper, not a JSX child of that div, or React and Leaflet fight over
    // the same node's children on re-render/unmount.
    <div className="app-sector5-map">
      <div ref={mapContainerRef} className="app-sector5-map-canvas" />
      <div className="app-sector5-map-legend" role="note" aria-label="Legendă stare hidratare">
        {(['ok', 'thirsty', 'urgent', 'unknown'] as const).map((s) => (
          <span key={s} className="app-sector5-map-legend-item">
            <span className={`app-sector5-map-legend-dot ${s}`} aria-hidden="true" />
            {waterStatusLabel(s)}
          </span>
        ))}
      </div>
    </div>
  );
};
