import { Block, Label, Select, Slider, SegmentedControl, Chip, Divider, Switch, C } from "./CalciteUI";
import { COUNTRY_REGIONS } from "../data/geoData";

interface LeftPanelProps {
  indicator: string;
  setIndicator: (v: string) => void;
  geoLevel: string;
  setGeoLevel: (v: string) => void;
  countryRegion: string;
  setCountryRegion: (v: string) => void;
  region: string;
  setRegion: (v: string) => void;
  countryRegionCompare: string;
  setCountryRegionCompare: (v: string) => void;
  regionCompare: string;
  setRegionCompare: (v: string) => void;
  year: number;
  setYear: (v: number) => void;
  compareYear: number;
  setCompareYear: (v: number) => void;
  displayMode: string;
  setDisplayMode: (v: string) => void;
  showForestOverlay: boolean;
  setShowForestOverlay: (v: boolean) => void;
}

const SA_COUNTRIES = ["Brazil", "Argentina", "Colombia", "Peru", "Chile", "Ecuador", "Bolivia", "Paraguay", "Uruguay", "Venezuela"];

export default function LeftPanel({
  indicator, setIndicator,
  geoLevel, setGeoLevel,
  countryRegion, setCountryRegion,
  region, setRegion,
  countryRegionCompare, setCountryRegionCompare,
  regionCompare, setRegionCompare,
  year, setYear,
  compareYear, setCompareYear,
  displayMode, setDisplayMode,
  showForestOverlay, setShowForestOverlay
}: LeftPanelProps) {
  
  const regionsPrimary = COUNTRY_REGIONS[countryRegion] || [];
  const regionsCompare = COUNTRY_REGIONS[countryRegionCompare] || [];

  const handleCountryPrimaryChange = (v: string) => {
    setCountryRegion(v);
    const newReg = COUNTRY_REGIONS[v] || [];
    setRegion(newReg[0] || "");
  };

  const handleCountryCompareChange = (v: string) => {
    setCountryRegionCompare(v);
    const newReg = COUNTRY_REGIONS[v] || [];
    setRegionCompare(newReg[0] || "");
  };

  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        borderRight: `1px solid ${C.border2}`,
        overflowY: "auto",
        background: C.bg,
        padding: "10px",
        fontFamily: C.font,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        maxHeight: "100vh",
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: "8px 10px 12px", borderBottom: `1px solid ${C.border2}`, marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>GIS Analytics</div>
        <div style={{ fontSize: 11, color: C.text3 }}>South America Forest Monitor</div>
      </div>

      {/* ── Block 1 — Layers ── */}
      <Block heading="Layers" defaultOpen>
        <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Forest Area Overlay</div>
              <div style={{ fontSize: 10, color: C.text3 }}>Display indicator data on map</div>
            </div>
            <Switch checked={showForestOverlay} onChange={setShowForestOverlay} />
          </div>
        </div>
      </Block>

      {/* ── Block 2 — Indicator ── */}
      <Block heading="Indicator" defaultOpen>
        <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 12 }}>
          <Label text="Indicator Name">
            <Select
              options={["Increase in Forest Area", "Deforestation Rate", "Tree Cover Density"]}
              value={indicator}
              onChange={setIndicator}
            />
          </Label>
        </div>
      </Block>

      {/* ── Block 3 — Geography ── */}
      <Block heading="Geography" defaultOpen>
        <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 14 }}>
          <Label text="Geographic Level">
            <Select options={["National", "Admin Level 1"]} value={geoLevel} onChange={setGeoLevel} />
          </Label>

          <Divider />

          {displayMode === "side" ? (
             <>
               <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, textTransform: "uppercase" }}>Primary Map</div>
               <Label text="Country">
                 <Select options={SA_COUNTRIES} value={countryRegion} onChange={handleCountryPrimaryChange} />
               </Label>
               {geoLevel === "Admin Level 1" && (
                 <Label text="Region">
                   <Select options={regionsPrimary} value={region} onChange={setRegion} />
                 </Label>
               )}

               <div style={{ height: 6 }} />
               <div style={{ fontSize: 11, fontWeight: 700, color: C.text2, textTransform: "uppercase" }}>Comparison Map</div>
               <Label text="Country">
                 <Select options={SA_COUNTRIES} value={countryRegionCompare} onChange={handleCountryCompareChange} />
               </Label>
               {geoLevel === "Admin Level 1" && (
                 <Label text="Region">
                   <Select options={regionsCompare} value={regionCompare} onChange={setRegionCompare} />
                 </Label>
               )}
             </>
          ) : (
            <>
               <Label text="Country">
                 <Select options={SA_COUNTRIES} value={countryRegion} onChange={handleCountryPrimaryChange} />
               </Label>
               {geoLevel === "Admin Level 1" && (
                 <Label text="Region">
                   <Select options={regionsPrimary} value={region} onChange={setRegion} />
                 </Label>
               )}
            </>
          )}

          <div style={{ fontSize: 10, color: C.text3, fontStyle: "italic", borderTop: `1px solid ${C.border3}`, paddingTop: 8 }}>
             {displayMode === "side" ? "Primary Left / Compare Right" : "Single focus mode activated."}
          </div>
        </div>
      </Block>

      {/* ── Block 4 — Time ── */}
      <Block heading="Time" defaultOpen>
        <div style={{ padding: "10px 10px 4px", display: "flex", flexDirection: "column", gap: 12 }}>
          <Label text="Primary Reference Year">
            <Slider min={2000} max={2025} value={year} ticks={[2000, 2010, 2020, 2025]} onChange={setYear} />
          </Label>
          {displayMode !== "single" && (
            <Label text="Baseline Compare Year">
              <Slider min={2000} max={2025} value={compareYear} ticks={[2000, 2010, 2020, 2025]} onChange={setCompareYear} />
            </Label>
          )}
        </div>
      </Block>

      {/* ── Block 5 — Comparison Mode ── */}
      <Block heading="Comparison Mode" defaultOpen>
        <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 12 }}>
          <Label text="Display Mode">
            <SegmentedControl
              options={[
                { label: "Single", value: "single" },
                { label: "Side-by-Side", value: "side" },
                { label: "Swipe", value: "swipe" },
              ]}
              value={displayMode}
              onChange={setDisplayMode}
            />
          </Label>
        </div>
      </Block>
      <div style={{ height: 120, flexShrink: 0 }} />
    </div>
  );
}
