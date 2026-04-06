import { C, Badge, Divider } from "./CalciteUI";

interface MetadataPanelProps {
  indicator: string;
  geography: string;
  timeRange: string;
}

export default function MetadataPanel({ indicator, geography, timeRange }: MetadataPanelProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── Active Context ── */}
      <div style={{ background: C.fg3, padding: "12px 16px", borderRadius: C.radius, borderLeft: `4px solid ${C.blue}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.text3, textTransform: "uppercase", marginBottom: 6, letterSpacing: '0.05em' }}>Current Analysis View</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>
          Viewing: <span style={{ color: C.blue }}>{geography}</span> | <span style={{ color: C.blue }}>{timeRange}</span>
        </div>
      </div>

      {/* ── Status Indicator ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.blueLight, padding: "12px 14px", borderRadius: C.radius, border: `1px solid ${C.border2}` }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.success }} />
        <div style={{ fontSize: 13, fontWeight: 600, color: C.blue }}>Verified Data Layer (v2.1)</div>
      </div>

      <section>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, textTransform: "uppercase", marginBottom: 8, letterSpacing: '0.05em' }}>Indicator Description</div>
        <div style={{ fontSize: 14, color: C.text1, lineHeight: 1.6 }}>
          <strong style={{ color: C.text1 }}>{indicator}</strong>: Measures the net increase in primary forest area through reforestation, afforestation, and natural regeneration. 
        </div>
      </section>

      <Divider />

      <section>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, textTransform: "uppercase", marginBottom: 12, letterSpacing: '0.05em' }}>Methodology & Coverage</div>
        <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.5, marginBottom: 16 }}>
          Data derived from Sentinel-2 MSI at 10m-30m resolution using a Random Forest classification algorithm. Results are aggregated at national and sub-national levels.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
           <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
             <span style={{ color: C.text3 }}>Spatial Coverage</span>
             <span style={{ fontWeight: 600, color: C.text1 }}>South America (Continental)</span>
           </div>
           <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
             <span style={{ color: C.text3 }}>Reference Period</span>
             <span style={{ fontWeight: 600, color: C.text1 }}>2000 — 2025 (Annual)</span>
           </div>
           <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
             <span style={{ color: C.text3 }}>Last Update</span>
             <span style={{ fontWeight: 600, color: C.text1 }}>March 15, 2026</span>
           </div>
        </div>
      </section>

      <Divider />

      <section>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, textTransform: "uppercase", marginBottom: 12, letterSpacing: '0.05em' }}>Interpretation & Limitations</div>
        <div style={{ background: C.bg, padding: 16, borderRadius: C.radius, display: "flex", flexDirection: "column", gap: 12, border: `1px solid ${C.border2}` }}>
           <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Badge>Positive Value</Badge>
              <div style={{ fontSize: 12, color: C.text2 }}>Reforestation or natural growth.</div>
           </div>
           <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Badge>Negative Value</Badge>
              <div style={{ fontSize: 12, color: C.text2 }}>Deforestation or degradation.</div>
           </div>
        </div>
        <div style={{ fontSize: 11, color: C.text3, marginTop: 12, fontStyle: "italic", lineHeight: 1.4 }}>
          * Limitations: Cloud cover may affect accuracy in tropical regions. Small-scale regeneration (&lt; 0.5ha) might be underrepresented.
        </div>
      </section>

      <Divider />

      <section>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, textTransform: "uppercase", marginBottom: 12, letterSpacing: '0.05em' }}>Data Sources</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: C.text3 }}>Primary Source</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>Global Forest Watch / ESA</span>
          </div>
          <div 
            style={{ 
              fontSize: 12, 
              color: C.blue, 
              cursor: "pointer", 
              fontWeight: 600,
              display: "flex", 
              alignItems: "center", 
              gap: 6, 
              marginTop: 4,
              padding: "8px 12px",
              background: C.blueLight,
              borderRadius: 6,
              width: "fit-content"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
               <path d="M4 2h8M4 5h8M4 8h5M13 1h-10c-.5 0-1 .5-1 1v12c0 .5.5 1 1 1h10c.5 0 1-.5 1-1v-12c0-.5-.5-1-1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Full Indicator Methodology PDF
          </div>
        </div>
      </section>
    </div>
  );
}
