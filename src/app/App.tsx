import { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import MapViewPanel from "./components/MapViewPanel";
import RightPanel from "./components/RightPanel";
import { C } from "./components/CalciteUI";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  
  // App State
  const [indicator, setIndicator] = useState("Increase in Forest");
  const [geoLevel, setGeoLevel] = useState("National");
  const [countryRegion, setCountryRegion] = useState("Brazil");
  const [region, setRegion] = useState(""); 
  
  // Secondary geography for Side-by-Side mode
  const [countryRegionCompare, setCountryRegionCompare] = useState("Colombia");
  const [regionCompare, setRegionCompare] = useState("");

  const [year, setYear] = useState(2020);
  const [compareYear, setCompareYear] = useState(2010);
  const [displayMode, setDisplayMode] = useState("side"); // Default to side-by-side

  // Layer toggles
  const [showForestOverlay, setShowForestOverlay] = useState(true);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        background: C.bg,
        fontFamily: C.font,
        overflow: "hidden",
      }}
    >
      {/* Left Control Panel */}
      <LeftPanel 
        indicator={indicator} setIndicator={setIndicator}
        geoLevel={geoLevel} setGeoLevel={setGeoLevel}
        countryRegion={countryRegion} setCountryRegion={setCountryRegion}
        region={region} setRegion={setRegion}
        countryRegionCompare={countryRegionCompare} setCountryRegionCompare={setCountryRegionCompare}
        regionCompare={regionCompare} setRegionCompare={setRegionCompare}
        year={year} setYear={setYear}
        compareYear={compareYear} setCompareYear={setCompareYear}
        displayMode={displayMode} setDisplayMode={setDisplayMode}
        showForestOverlay={showForestOverlay} setShowForestOverlay={setShowForestOverlay}
      />

      {/* Center Map View */}
      <MapViewPanel 
        drawerOpen={drawerOpen} 
        setDrawerOpen={setDrawerOpen}
        indicator={indicator}
        geoLevel={geoLevel}
        countryRegion={countryRegion}
        region={region}
        countryRegionCompare={countryRegionCompare}
        regionCompare={regionCompare}
        year={year}
        compareYear={compareYear}
        displayMode={displayMode}
        showForestOverlay={showForestOverlay}
      />

      {/* Right Analysis Panel */}
      <RightPanel 
        countryRegion={countryRegion}
        region={region}
        indicator={indicator}
      />
    </div>
  );
}
