// Calcite DS v5.0 visual-faithful components using plain HTML/Tailwind
// These mimic Calcite components without web components/Shadow DOM so Figma can capture them.

import { useState, ReactNode } from "react";

// ── Tokens ──────────────────────────────────────────────────────────────────
export const C = {
  bg: "#f3f3f3",
  fg1: "#ffffff",
  fg2: "#f3f3f3",
  fg3: "#eaeaea",
  border1: "#cacaca",
  border2: "#dfdfdf",
  border3: "#f0f0f0",
  text1: "#323232",
  text2: "#6a6a6a",
  text3: "#9a9a9a",
  blue: "#007ac2",
  blueDark: "#005e95",
  blueLight: "#e8f4fb",
  green: "#35ac46",
  red: "#d83020",
  orange: "#e07b00",
  shadow: "0 1px 2px rgba(0,0,0,0.10)",
  shadowMd: "0 2px 8px rgba(0,0,0,0.12)",
  font: '"Avenir Next","Avenir",Helvetica,Arial,sans-serif',
};

// ── Block (collapsible section) ──────────────────────────────────────────────
export function Block({
  heading,
  children,
  defaultOpen = true,
  className = "",
}: {
  heading: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={className}
      style={{
        background: C.fg1,
        border: `1px solid ${C.border2}`,
        borderRadius: 4,
        marginBottom: 6,
        fontFamily: C.font,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: C.font,
          fontSize: 12,
          fontWeight: 600,
          color: C.text1,
          textAlign: "left",
          borderBottom: open ? `1px solid ${C.border2}` : "none",
        }}
      >
        <span>{heading}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s", flexShrink: 0 }}
        >
          <path d="M2 4.5L6 8.5L10 4.5" stroke={C.text2} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ── Label ───────────────────────────────────────────────────────────────────
export function Label({ children, text }: { children?: ReactNode; text?: string }) {
  return (
    <div style={{ fontFamily: C.font }}>
      {text && (
        <div style={{ fontSize: 11, fontWeight: 600, color: C.text2, marginBottom: 3, letterSpacing: "0.02em" }}>
          {text}
        </div>
      )}
      {children}
    </div>
  );
}

// ── Select ──────────────────────────────────────────────────────────────────
export function Select({
  options,
  value,
  scale = "m",
  onChange,
}: {
  options: string[];
  value?: string;
  scale?: "s" | "m";
  onChange?: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const h = scale === "s" ? 28 : 34;
  const fs = scale === "s" ? 11 : 13;
  return (
    <div
      style={{
        position: "relative",
        height: h,
        background: C.fg1,
        border: `1px solid ${C.border1}`,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        fontFamily: C.font,
        cursor: "pointer",
      }}
      onClick={() => setOpen(!open)}
    >
      <span
        style={{
          flex: 1,
          padding: "0 28px 0 8px",
          fontSize: fs,
          color: C.text1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value || options[0]}
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ position: "absolute", right: 6, pointerEvents: "none", flexShrink: 0 }}
      >
        <path d="M4 6L8 10L12 6" stroke={C.text2} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {open && (
        <div
          style={{
            position: "absolute",
            top: h + 2,
            left: 0,
            right: 0,
            background: C.fg1,
            border: `1px solid ${C.border1}`,
            borderRadius: 3,
            boxShadow: C.shadowMd,
            zIndex: 1000,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              style={{
                padding: "8px 10px",
                fontSize: fs,
                color: C.text1,
                background: opt === value ? C.blueLight : "transparent",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(opt);
                setOpen(false);
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.fg3)}
              onMouseLeave={(e) => (e.currentTarget.style.background = opt === value ? C.blueLight : "transparent")}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Button ──────────────────────────────────────────────────────────────────
export function Button({
  children,
  icon,
  appearance = "solid",
  scale = "m",
  color = "blue",
  width,
}: {
  children?: ReactNode;
  icon?: string;
  appearance?: "solid" | "outline" | "transparent";
  scale?: "s" | "m" | "l";
  color?: "blue" | "neutral" | "red";
  width?: "full";
}) {
  const h = scale === "s" ? 28 : scale === "l" ? 44 : 34;
  const fs = scale === "s" ? 11 : 13;
  const bgMap = { solid: { blue: C.blue, neutral: "#6a6a6a", red: C.red }, outline: "transparent", transparent: "transparent" };
  const colorMap = {
    solid: "#fff",
    outline: { blue: C.blue, neutral: C.text1, red: C.red },
    transparent: { blue: C.blue, neutral: C.text1, red: C.red },
  };
  const bg = appearance === "solid" ? bgMap.solid[color] : "transparent";
  const fg = appearance === "solid" ? "#fff" : (colorMap as any)[appearance][color];
  const border = appearance === "outline" ? `1px solid ${C.border1}` : "1px solid transparent";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        height: h,
        padding: `0 ${scale === "s" ? 8 : 12}px`,
        background: bg,
        border,
        borderRadius: 3,
        fontFamily: C.font,
        fontSize: fs,
        fontWeight: 500,
        color: fg,
        cursor: "pointer",
        width: width === "full" ? "100%" : undefined,
        userSelect: "none",
      }}
    >
      {icon && (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          {icon === "download" && (
            <path d="M8 2v8M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {icon === "filter" && (
            <path d="M2 4h12M5 8h6M7 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {icon === "zoom-in-fixed" && (
            <>
              <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5 7h4M7 5v4M11.5 11.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </>
          )}
          {icon === "layers" && (
            <path d="M8 2L2 6l6 4 6-4-6-4zm0 7l-6 4 6 3 6-3-6-4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          )}
          {icon === "chevron-up" && (
            <path d="M3 10.5L8 5.5L13 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {icon === "chevron-down" && (
            <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {icon === "reset" && (
            <path d="M3 8a5 5 0 1 0 1.4-3.4M3 4v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {icon === "information" && (
            <>
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 7v5M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
        </svg>
      )}
      {children}
    </div>
  );
}

// ── Chip ─────────────────────────────────────────────────────────────────────
export function Chip({ children, color = "blue" }: { children: ReactNode; color?: "blue" | "green" | "red" | "neutral" }) {
  const map = {
    blue: { bg: C.blueLight, text: C.blue, border: "#b3d9f0" },
    green: { bg: "#e8f7ea", text: "#217a2f", border: "#b3e4bc" },
    red: { bg: "#fce9e7", text: C.red, border: "#f0b8b3" },
    neutral: { bg: C.fg3, text: C.text2, border: C.border2 },
  };
  const s = map[color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 7px",
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 10,
        fontFamily: C.font,
        fontSize: 11,
        fontWeight: 600,
        color: s.text,
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </span>
  );
}

// ── Switch ───────────────────────────────────────────────────────────────────
export function Switch({ checked = false, onChange }: { checked?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <div
      style={{
        width: 34,
        height: 18,
        borderRadius: 10,
        background: checked ? C.blue : C.border1,
        position: "relative",
        flexShrink: 0,
        cursor: "pointer",
        transition: "background 0.15s",
      }}
      onClick={() => onChange?.(!checked)}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 18 : 2,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: C.shadow,
          transition: "left 0.15s",
        }}
      />
    </div>
  );
}

// ── Segmented Control ─────────────────────────────────────────────────────────
export function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        background: C.fg3,
        border: `1px solid ${C.border1}`,
        borderRadius: 3,
        overflow: "hidden",
        fontFamily: C.font,
      }}
    >
      {options.map((opt, i) => {
        const active = opt.value === value;
        return (
          <div
            key={opt.value}
            style={{
              flex: 1,
              padding: "5px 8px",
              textAlign: "center",
              fontSize: 11,
              fontWeight: active ? 600 : 400,
              color: active ? C.blue : C.text2,
              background: active ? C.fg1 : "transparent",
              borderRight: i < options.length - 1 ? `1px solid ${C.border1}` : "none",
              cursor: "pointer",
              boxShadow: active ? C.shadow : "none",
              userSelect: "none",
            }}
            onClick={() => onChange?.(opt.value)}
          >
            {opt.label}
          </div>
        );
      })}
    </div>
  );
}

// ── Slider ───────────────────────────────────────────────────────────────────
export function Slider({
  min,
  max,
  value,
  ticks,
  onChange,
}: {
  min: number;
  max: number;
  value: number;
  ticks?: number[];
  onChange?: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ fontFamily: C.font, padding: "4px 0 16px", position: "relative" }}>
      <div style={{ position: "relative", height: 4, background: C.border1, borderRadius: 2 }}>
        {/* Fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${pct}%`,
            height: "100%",
            background: C.blue,
            borderRadius: 2,
            pointerEvents: "none",
          }}
        />
        {/* Thumb (Visual) */}
        <div
          style={{
            position: "absolute",
            left: `${pct}%`,
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: C.fg1,
            border: `2px solid ${C.blue}`,
            boxShadow: C.shadow,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        {/* Value label */}
        <div
          style={{
            position: "absolute",
            left: `${pct}%`,
            top: -22,
            transform: "translateX(-50%)",
            background: C.blue,
            color: "#fff",
            fontSize: 10,
            fontWeight: 600,
            padding: "1px 5px",
            borderRadius: 2,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {value}
        </div>
      </div>

      {/* Actual Input Range (Hidden but functional) */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 20,
          opacity: 0,
          cursor: "pointer",
          margin: 0,
          zIndex: 3,
        }}
      />

      {/* Ticks */}
      {ticks && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          {ticks.map((t) => (
            <span
              key={t}
              style={{ fontSize: 10, color: C.text3, cursor: "pointer" }}
              onClick={() => onChange?.(t)}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tabs ─────────────────────────────────────────────────────────────────────
export function Tabs({
  tabs,
  active,
  onSelect,
}: {
  tabs: string[];
  active: string;
  onSelect: (t: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: `2px solid ${C.border2}`,
        fontFamily: C.font,
        gap: 0,
      }}
    >
      {tabs.map((t) => {
        const sel = t === active;
        return (
          <button
            key={t}
            onClick={() => onSelect(t)}
            style={{
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: sel ? 600 : 400,
              color: sel ? C.blue : C.text2,
              background: "none",
              border: "none",
              borderBottom: sel ? `2px solid ${C.blue}` : "2px solid transparent",
              marginBottom: -2,
              cursor: "pointer",
              fontFamily: C.font,
              letterSpacing: "0.01em",
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: C.fg1,
        border: `1px solid ${C.border2}`,
        borderRadius: 4,
        boxShadow: C.shadow,
        padding: "10px 12px",
        fontFamily: C.font,
      }}
    >
      {children}
    </div>
  );
}

// ── Action button (icon-only) ─────────────────────────────────────────────────
export function Action({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      title={label}
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        cursor: "pointer",
        color: C.text2,
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {icon === "chevron-up" && (
          <path d="M3 10.5L8 5.5L13 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {icon === "chevron-down" && (
          <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {icon === "x" && (
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
}

// ── Divider ──────────────────────────────────────────────────────────────────
export function Divider() {
  return <div style={{ height: 1, background: C.border2, margin: "6px 0" }} />;
}

// ── Tooltip chip (small inline badge) ────────────────────────────────────────
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "1px 5px",
        background: C.fg3,
        border: `1px solid ${C.border1}`,
        borderRadius: 2,
        fontFamily: C.font,
        fontSize: 10,
        color: C.text2,
      }}
    >
      {children}
    </span>
  );
}
