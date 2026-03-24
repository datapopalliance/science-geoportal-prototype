import { useState, useEffect, useRef } from "react";
import { Select, Button, Tabs, Chip, C, Card } from "./CalciteUI";
import { COUNTRY_REGIONS, REGION_COORDS } from "../data/geoData";

interface MapViewPanelProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  indicator: string;
  geoLevel: string;
  countryRegion: string;
  region: string;
  countryRegionCompare: string;
  regionCompare: string;
  year: number;
  compareYear: number;
  displayMode: string;
  showForestOverlay: boolean;
}

const MAPBOX_TOKEN = "pk.eyJ1IjoibWFyY2dhbGxpZmEiLCJhIjoiY20xaGoxbGxnMGc0YTJscXlyNGV3NXJuNCJ9.j5f27WxhEEozshZXamnAaQ";

const COUNTRY_COORDS: Record<string, [number, number]> = {
  Brazil: [-51.92, -14.23],
  Argentina: [-63.61, -38.41],
  Colombia: [-74.29, 4.57],
  Peru: [-75.01, -9.19],
  Chile: [-71.54, -35.67],
  Ecuador: [-78.18, -1.83],
  Bolivia: [-63.58, -16.29],
  Paraguay: [-58.44, -23.44],
  Uruguay: [-55.76, -32.52],
  Guyana: [-58.93, 4.86],
  Suriname: [-56.02, 3.91],
  Venezuela: [-66.58, 6.42],
};

// Generate mock data representing "forest texture" (dense points)
const getMockGeoJSON = (year: number) => {
  const features: any[] = [];
  
  // Country centers with forest area
  Object.entries(COUNTRY_COORDS).forEach(([name, coords]) => {
      // Add a primary point for the country
      features.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: coords },
        properties: { name, value: 20 + Math.random() * 20, change: (Math.random() - 0.4) * 2, type: 'bubble' }
      });

      // Add a dense forest "shimmer" scatter (white mask effect)
      for (let i = 0; i < 15; i++) {
        const offsetLat = (Math.random() - 0.5) * 6;
        const offsetLon = (Math.random() - 0.5) * 6;
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [coords[0] + offsetLon, coords[1] + offsetLat] },
          properties: { type: 'mask', density: Math.random() }
        });
      }
  });

  return { type: "FeatureCollection", features };
};

export default function MapViewPanel({ 
  drawerOpen, setDrawerOpen,
  indicator, geoLevel, countryRegion, region,
  countryRegionCompare, regionCompare,
  year, compareYear, displayMode,
  showForestOverlay
}: MapViewPanelProps) {
  const [activeTab, setActiveTab] = useState("Table");
  const mapContainerPrimary = useRef<HTMLDivElement>(null);
  const mapContainerSecondary = useRef<HTMLDivElement>(null);
  const mapPrimary = useRef<any>(null);
  const mapSecondary = useRef<any>(null);
  const compareRef = useRef<any>(null);

  // Initialize Mapbox Primary
  useEffect(() => {
    if (!mapContainerPrimary.current) return;
    const mapboxgl = (window as any).mapboxgl;
    if (!mapboxgl) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    mapPrimary.current = new mapboxgl.Map({
      container: mapContainerPrimary.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-60, -15],
      zoom: 3,
    });

    mapPrimary.current.on('load', () => {
      addLayers(mapPrimary.current, year, 'primary');
    });

    return () => mapPrimary.current?.remove();
  }, []);

  // Initialize Mapbox Secondary (for side-by-side or swipe)
  useEffect(() => {
    const handleCleanup = () => {
        if (mapSecondary.current) {
            mapSecondary.current.remove();
            mapSecondary.current = null;
        }
        if (compareRef.current) {
            compareRef.current.remove();
            compareRef.current = null;
        }
        // Force primary container to fill space
        if (mapContainerPrimary.current) {
            mapContainerPrimary.current.style.width = "100%";
            mapContainerPrimary.current.style.flex = "1 1 100%";
        }
    };

    if (displayMode === 'single' || !mapContainerSecondary.current) {
        handleCleanup();
        if (mapPrimary.current) mapPrimary.current.resize();
        return;
    }
    
    const mapboxgl = (window as any).mapboxgl;
    if (!mapboxgl) return;

    mapSecondary.current = new mapboxgl.Map({
      container: mapContainerSecondary.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: mapPrimary.current?.getCenter() || [-60, -15],
      zoom: mapPrimary.current?.getZoom() || 3,
    });

    mapSecondary.current.on('load', () => {
      addLayers(mapSecondary.current, compareYear, 'secondary');
      
      // Hook up compare tool
      if (displayMode === 'swipe') {
          const MapboxCompare = (window as any).mapboxgl.Compare || (window as any).MapboxCompare;
          if (MapboxCompare) {
               compareRef.current = new MapboxCompare(mapPrimary.current, mapSecondary.current, "#comparison-container", {});
          }
      }
    });

    return handleCleanup;
  }, [displayMode]);

  // Handle resize when drawer or mode changes
  useEffect(() => {
    // Immediate resize for quick mode switching
    if (mapPrimary.current) mapPrimary.current.resize();
    if (mapSecondary.current) mapSecondary.current.resize();

    // Delayed resize for CSS transitions (like side panel opening or drawer)
    const timer = setTimeout(() => {
        if (mapPrimary.current) mapPrimary.current.resize();
        if (mapSecondary.current) mapSecondary.current.resize();
    }, 250); 
    
    return () => clearTimeout(timer);
  }, [drawerOpen, displayMode]);

  // Handle Fly To
  useEffect(() => {
    const primaryCoords = (geoLevel === "Admin Level 1" && region) 
        ? REGION_COORDS[region] 
        : COUNTRY_COORDS[countryRegion];

    if (mapPrimary.current && primaryCoords) {
       mapPrimary.current.flyTo({
          center: primaryCoords,
          zoom: geoLevel === "National" ? 4.5 : 7.5,
          essential: true
       });
    }

    // Secondary map fly-to
    if (mapSecondary.current) {
       const secondaryCoords = (displayMode === "side")
           ? ((geoLevel === "Admin Level 1" && regionCompare) ? REGION_COORDS[regionCompare] : COUNTRY_COORDS[countryRegionCompare])
           : primaryCoords;

       if (secondaryCoords) {
          mapSecondary.current.flyTo({
             center: secondaryCoords,
             zoom: geoLevel === "National" ? 4.5 : 7.5,
             essential: true
          });
       }
    }
  }, [countryRegion, region, countryRegionCompare, regionCompare, geoLevel, displayMode]);

  // Handle Year Updates
  useEffect(() => {
     if (mapPrimary.current?.loaded()) {
         updateLayers(mapPrimary.current, year, 'primary');
     }
  }, [year, indicator]);

  useEffect(() => {
    if (mapSecondary.current?.loaded()) {
        updateLayers(mapSecondary.current, compareYear, 'secondary');
    }
  }, [compareYear, indicator]);

  // Handle Visibility
  useEffect(() => {
    const visibility = showForestOverlay ? 'visible' : 'none';
    const layers = ['forest-bubbles', 'forest-mask'];
    
    layers.forEach(lyr => {
        if (mapPrimary.current?.getLayer(`${lyr}-primary`)) {
            mapPrimary.current.setLayoutProperty(`${lyr}-primary`, 'visibility', visibility);
        }
        if (mapSecondary.current?.getLayer(`${lyr}-secondary`)) {
            mapSecondary.current.setLayoutProperty(`${lyr}-secondary`, 'visibility', visibility);
        }
    });
  }, [showForestOverlay]);

  const addLayers = (map: any, dataYear: number, idSuffix: string) => {
    map.addSource(`forest-data-${idSuffix}`, {
      type: 'geojson',
      data: getMockGeoJSON(dataYear)
    });

    // High Contrast Forest Mask (White on Black look)
    map.addLayer({
      id: `forest-mask-${idSuffix}`,
      type: 'circle',
      source: `forest-data-${idSuffix}`,
      filter: ['==', ['get', 'type'], 'mask'],
      layout: { 'visibility': showForestOverlay ? 'visible' : 'none' },
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 2, 1, 6, 4],
        'circle-color': '#fff',
        'circle-opacity': 0.6,
        'circle-blur': 0.5
      }
    });

    // Colored Comparison Bubbles
    map.addLayer({
      id: `forest-bubbles-${idSuffix}`,
      type: 'circle',
      source: `forest-data-${idSuffix}`,
      filter: ['==', ['get', 'type'], 'bubble'],
      layout: { 'visibility': showForestOverlay ? 'visible' : 'none' },
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['get', 'value'], 15, 8, 40, 30],
        'circle-color': ['interpolate', ['linear'], ['get', 'change'], -1, C.red, 0, C.orange, 1, C.green],
        'circle-opacity': 0.9,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff'
      }
    });

    map.setLayerZoomRange(`forest-mask-${idSuffix}`, 0, 22);
  };

  const updateLayers = (map: any, dataYear: number, idSuffix: string) => {
      const source = map.getSource(`forest-data-${idSuffix}`);
      if (source) {
          source.setData(getMockGeoJSON(dataYear));
      }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", minWidth: 0 }}>
      {/* ── Top Content Ribbon ── */}
      <div
        style={{
          background: C.fg1,
          borderBottom: `1px solid ${C.border2}`,
          padding: "6px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          flexShrink: 0,
          zIndex: 5
        }}
      >
        <div style={{ fontSize: 11, color: C.text2, fontFamily: C.font, fontWeight: 600, marginRight: 4 }}>
          Viewing:
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, background: C.blueLight, padding: "2px 6px", borderRadius: 4 }}>
          {indicator} ({year})
        </div>
        
        <div style={{ color: C.text3, fontSize: 12 }}>—</div>
        <div style={{ fontSize: 11, fontWeight: 600 }}>{displayMode === 'side' ? `Primary: ${countryRegion}${region ? ' ('+region+')' : ''}` : countryRegion}</div>
        
        {displayMode === 'side' && (
           <>
            <div style={{ color: C.text3, fontSize: 12 }}>vs</div>
            <div style={{ fontSize: 11, fontWeight: 600 }}>Compare: {countryRegionCompare}{regionCompare ? ' ('+regionCompare+')' : ''}</div>
           </>
        )}

        <div style={{ flex: 1 }} />
        <Chip color={showForestOverlay ? "green" : "neutral"}>
            Overlay: {showForestOverlay ? "ON" : "OFF"}
        </Chip>
        <Button icon="filter" appearance="outline" scale="s">Layers</Button>
      </div>

      {/* ── Map View Area ── */}
      <div 
        id={displayMode === "swipe" ? "comparison-container" : undefined} 
        style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 0, display: "flex", width: "100%" }}
      >
        
        {/* Primary Map Container */}
        <div 
          ref={mapContainerPrimary} 
          style={{ 
            height: "100%", 
            background: "#111",
            width: (displayMode === "side") ? "50%" : "100%",
            flex: (displayMode === "side") ? "0 0 50%" : "1 1 100%",
            zIndex: 1,
            position: "relative"
          }} 
        />

        {/* Secondary Map Container (Side by Side) */}
        {displayMode === "side" && (
            <div 
              ref={mapContainerSecondary} 
              style={{ 
                height: "100%", 
                background: "#222",
                borderLeft: `2px solid ${C.border2}`,
                flex: "0 0 50%",
                width: "50%",
                zIndex: 1
              }} 
            />
        )}

        {/* Secondary Map Container (Swipe Overlay) */}
        {displayMode === "swipe" && (
            <div 
              ref={mapContainerSecondary} 
              style={{ 
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "100%",
                background: "#222",
                zIndex: 2
              }} 
            />
        )}

        {/* Legend */}
        {showForestOverlay && (
            <div
              style={{
                position: "absolute",
                bottom: 60,
                right: 14,
                background: "rgba(255,255,255,0.95)",
                border: `1px solid ${C.border2}`,
                borderRadius: 4,
                padding: "8px 10px",
                fontFamily: C.font,
                fontSize: 10,
                zIndex: 10,
                width: 130,
                boxShadow: C.shadowMd
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 5 }}>Increase (%)</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.green }} />
                  <span>High Increase</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.orange }} />
                  <span>Stable</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.red }} />
                  <span>Decrease</span>
                </div>
              </div>
            </div>
        )}
      </div>

      {/* ── Bottom Drawer ── */}
      <div
        style={{
          borderTop: `1px solid ${C.border2}`,
          background: C.fg1,
          transition: "height 0.25s ease",
          height: drawerOpen ? 250 : 42,
          overflow: "hidden",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            height: 42,
            borderBottom: drawerOpen ? `1px solid ${C.border2}` : "none",
            flexShrink: 0,
            cursor: "pointer",
          }}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: C.font, fontSize: 12, fontWeight: 700, color: C.text1 }}>
              Analysis View: {indicator}
            </span>
            <Chip color="neutral">{countryRegion} · {year}</Chip>
            {displayMode === 'side' && <Chip color="blue">vs {countryRegionCompare}</Chip>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
             <span style={{ fontSize: 11, color: C.text2 }}>{drawerOpen ? "Close" : "Details"}</span>
          </div>
        </div>

        {drawerOpen && (
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "6px 12px 0" }}>
              <Tabs
                tabs={["Table", "Summary"]}
                active={activeTab}
                onSelect={setActiveTab}
              />
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "8px 12px" }}>
              {activeTab === "Table" && (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                     <tr>
                        {["Target Area", "Forest Area %", "YoY Change", "Trend"].map(h => (
                          <th key={h} style={{ textAlign: "left", fontSize: 10, color: C.text2, borderBottom: `1px solid ${C.border3}`, padding: 5 }}>{h}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                    {[countryRegion, countryRegionCompare].filter((v, i, a) => a.indexOf(v) === i).map((name) => (
                      <tr key={name}>
                        <td style={{ fontSize: 11, padding: 5, borderBottom: `1px solid ${C.border3}` }}>{name}</td>
                        <td style={{ fontSize: 11, padding: 5, borderBottom: `1px solid ${C.border3}` }}>{(20 + Math.random() * 30).toFixed(1)}%</td>
                        <td style={{ fontSize: 11, padding: 5, borderBottom: `1px solid ${C.border3}`, color: C.green }}>+{(Math.random()*2).toFixed(2)}%</td>
                        <td style={{ fontSize: 11, padding: 5, borderBottom: `1px solid ${C.border3}` }}>Positive</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === "Summary" && (
                 <div style={{ padding: 10, fontSize: 12, color: C.text2 }}>
                   Summary analysis for {indicator}. 
                   {displayMode === 'side' ? `Comparing ${countryRegion} with ${countryRegionCompare}.` : `Focusing on ${countryRegion}.`}
                 </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
