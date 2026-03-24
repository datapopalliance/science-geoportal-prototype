import { Block, Card, Switch, Chip, Divider, C } from "./CalciteUI";

interface RightPanelProps {
  countryRegion: string;
  region: string;
  indicator: string;
}

// Mini line chart using SVG
function MiniLineChart({
  data,
  labels,
  color,
  height = 60,
}: {
  data: number[];
  labels?: string[];
  color?: string;
  height?: number;
}) {
  const w = 180;
  const h = height;
  const max = Math.max(...data) || 1;
  const min = Math.min(...data) || 0;
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 10) - 4;
      return `${x},${y}`;
    })
    .join(" ");
  const fillPts = `0,${h} ${pts} ${w},${h}`;
  const c = color || C.blue;
  return (
    <div>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", width: "100%" }}>
        <defs>
          <linearGradient id={`grad-${c.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c} stopOpacity="0.18" />
            <stop offset="100%" stopColor={c} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <polygon points={fillPts} fill={`url(#grad-${c.replace("#", "")})`} />
        <polyline
          points={pts}
          fill="none"
          stroke={c}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - ((v - min) / range) * (h - 10) - 4;
          return (
            <circle key={i} cx={x} cy={y} r={i === data.length - 1 ? 3 : 2} fill={c} />
          );
        })}
      </svg>
      {labels && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          {labels.map((l, i) => (
            <span key={i} style={{ fontSize: 9, color: C.text3, fontFamily: C.font }}>
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Horizontal bar
function HBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ height: 6, background: C.fg3, borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3 }} />
    </div>
  );
}

// Delta badge
function Delta({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      style={{
        fontSize: 11,
        fontFamily: C.font,
        fontWeight: 600,
        color: up ? C.green : C.red,
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {up ? "▲" : "▼"} {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export default function RightPanel({ countryRegion, region, indicator }: RightPanelProps) {
  const title = region ? `${region}, ${countryRegion}` : countryRegion;
  
  // Mock trend data based on country name length or something stable
  const seed = (countryRegion.length + (region?.length || 0)) % 5;
  const trends = [
      [2.1, 2.5, 3.0, 2.8, 3.5, 4.0, 4.2],
      [5.5, 5.2, 4.8, 4.5, 4.2, 4.1, 4.0],
      [1.0, 1.2, 1.5, 2.0, 2.8, 3.5, 5.2],
      [8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0],
      [3.0, 3.1, 3.2, 3.1, 3.0, 3.2, 3.3]
  ];
  const activeTrend = trends[seed];
  const latestVal = activeTrend[activeTrend.length - 1];
  const prevVal = activeTrend[activeTrend.length - 2];
  const delta = ((latestVal - prevVal) / prevVal) * 100;

  return (
    <div
      style={{
        width: 260,
        flexShrink: 0,
        borderLeft: `1px solid ${C.border2}`,
        overflowY: "auto",
        background: C.bg,
        padding: "8px",
        fontFamily: C.font,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        maxHeight: "100vh",
      }}
    >
      {/* ── Block 1 — Summary Card ── */}
      <Block heading="Summary Card" defaultOpen>
        <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 10 }}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: delta >= 0 ? C.green : C.red, lineHeight: 1 }}>
                  {delta >= 0 ? '+' : ''}{latestVal.toFixed(1)}%
              </div>
              <div style={{ fontSize: 10, color: C.text3, marginTop: 4, fontWeight: 500 }}>
                  {indicator} · {title}
              </div>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.text2 }}>YoY Change</span>
                <Delta value={delta} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.text2 }}>Regional Avg</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.text1 }}>3.4%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.text2 }}>Rank</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.blue }}>#{(seed % 10) + 1} / 12</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.text2 }}>Status</span>
                <Chip color={delta >= 0 ? "green" : "red"}>{delta >= 0 ? "Improving" : "Critical"}</Chip>
              </div>
            </div>
          </Card>
        </div>
      </Block>

      {/* ── Block 2 — Trend ── */}
      <Block heading="Trend Analysis" defaultOpen>
        <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 12 }}>
          <Card>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.text1, marginBottom: 10 }}>
              Long-term Trend (2010–2025)
            </div>
            <MiniLineChart
              data={activeTrend}
              labels={["2010", "2015", "2020", "2025"]}
              color={delta >= 0 ? C.green : C.red}
              height={70}
            />
            <Divider />
            <div style={{ fontSize: 11, color: C.text2, marginTop: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span>Baseline (2010)</span>
                <span style={{ fontWeight: 600, color: C.text1 }}>{activeTrend[0].toFixed(1)}%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span>Current (2025)</span>
                <span style={{ fontWeight: 600, color: C.text1 }}>{latestVal.toFixed(1)}%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Overall Change</span>
                <Delta value={((latestVal - activeTrend[0]) / activeTrend[0]) * 100} />
              </div>
            </div>
          </Card>
        </div>
      </Block>

      {/* ── Block 3 — Spatial Comparison ── */}
      <Block heading="Peer Comparison" defaultOpen>
        <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 11, color: C.text3, marginBottom: 4 }}>
            Relative to South American peers
          </div>
          {[
            { name: "Suriname", val: 5.8, color: C.green },
            { name: "Guyana", val: 5.2, color: C.green },
            { name: countryRegion, val: latestVal, color: C.blue },
            { name: "Colombia", val: 4.5, color: C.blue },
            { name: "Peru", val: 3.9, color: C.orange },
            { name: "Brazil", val: 3.2, color: C.red },
          ].sort((a,b) => b.val - a.val).map((r) => (
            <div key={r.name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: r.name === countryRegion ? C.text1 : C.text2, fontWeight: r.name === countryRegion ? 700 : 400 }}>{r.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: r.color }}>{r.val.toFixed(1)}%</span>
              </div>
              <HBar value={r.val} max={7} color={r.color} />
            </div>
          ))}
          <Divider />
          <div style={{ fontSize: 10, color: C.text3, textAlign: "center" }}>Simulation data based on {indicator}</div>
        </div>
      </Block>

      {/* ── Block 4 — Metadata ── */}
      <Block heading="Metadata & Sources" defaultOpen={false}>
        <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            ["Indicator", indicator],
            ["Context", title],
            ["Resolution", "30m (Annual)"],
            ["Methodology", "Remote Sensing Index"],
            ["Update Frequency", "Annual"],
            ["Last Sync", "2026-03-23"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <span style={{ fontSize: 10, color: C.text3, flexShrink: 0 }}>{k}</span>
              <span style={{ fontSize: 10, color: C.text1, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}
