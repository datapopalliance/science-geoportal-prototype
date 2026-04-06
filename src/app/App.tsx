import { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import MapViewPanel from "./components/MapViewPanel";
import RightPanel from "./components/RightPanel";
import { C, Modal, SlidePanel, TooltipProvider } from "./components/CalciteUI";
import MetadataPanel from "./components/MetadataPanel";

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

  // UI State - Onboarding and Metadata
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);

  useEffect(() => {
    // Show onboarding if not dismissed in the past
    const dismissed = localStorage.getItem("geoportal_onboarding_dismissed");
    if (!dismissed) {
      setTimeout(() => setShowOnboarding(true), 1200);
    }
  }, []);

  const dismissOnboarding = (neverShowAgain = false) => {
    setShowOnboarding(false);
    if (neverShowAgain) {
      localStorage.setItem("geoportal_onboarding_dismissed", "true");
    }
  };

  return (
    <TooltipProvider>
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
          onOpenMetadata={() => setShowMetadata(true)}
          onOpenOnboarding={() => setShowOnboarding(true)}
        />

        {/* Right Analysis Panel */}
        <RightPanel 
          countryRegion={countryRegion}
          region={region}
          indicator={indicator}
          onOpenMetadata={() => setShowMetadata(true)}
        />

        {/* Metadata Side Panel */}
        <SlidePanel 
          title={`Indicator Metadata`}
          isOpen={showMetadata}
          onClose={() => setShowMetadata(false)}
          width={380}
        >
          <MetadataPanel 
            indicator={indicator} 
            geography={displayMode === 'side' ? `${countryRegion} vs ${countryRegionCompare}` : countryRegion}
            timeRange={displayMode === 'side' ? `${year} vs ${compareYear}` : `${year}`}
          />
        </SlidePanel>

        {/* Onboarding Modal */}
        {showOnboarding && (
          <Modal 
            title="Analysis Workspace"
            purpose="Explore and compare climate indicators across geography and time."
            steps={[
              "Select an indicator from the left panel.",
              "Choose a geographic level and country to visualize.",
              "Adjust time range or filters using the sliders."
            ]}
            onDismiss={() => dismissOnboarding(false)}
            onNeverShowAgain={() => dismissOnboarding(true)}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
