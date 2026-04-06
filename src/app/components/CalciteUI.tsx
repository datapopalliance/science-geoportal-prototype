// Calcite DS v5.0 visual-faithful components using plain HTML/Tailwind
// These mimic Calcite components without web components/Shadow DOM so Figma can capture them.

import { useState, ReactNode } from "react";
import {
  Tooltip as RadixTooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";

export { TooltipProvider };

// ── Tokens ──────────────────────────────────────────────────────────────────
export const C = {
  bg: "#F7F6F1", // color.neutral.50
  fg1: "#FFFFFF", // color.neutral.0
  fg2: "#F7F6F1",
  fg3: "#EEEEE8", // color.neutral.100
  border1: "#B4B2A9", // color.neutral.300
  border2: "#D2D0C6", // color.neutral.200
  border3: "#EEEEE8",
  text1: "#363830", // color.neutral.700
  text2: "#4D5248", // color.neutral.600
  text3: "#7A7D74", // color.neutral.400
  blue: "#3B8135", // BRAND GREEN (primary)
  blueDark: "#2D6A2E", // color.primary.600
  blueLight: "#EFF6E6", // color.primary.50
  green: "#3B8135",
  red: "#C83D3D", // color.danger.400
  orange: "#C47D1A", // color.warning.400
  shadow: "0 1px 2px 0 rgba(14,34,18,0.06)", // elevation.1
  shadowMd: "0 2px 8px 0 rgba(14,34,18,0.08)", // elevation.2
  font: 'Inter, system-ui, sans-serif',
  blueLight2: "#EAF2FA", // color.info.50
  success: "#3B8135",
  warning: "#C47D1A",
  danger: "#C83D3D",
  radius: 8, // borderRadius.md
  radiusLg: 12, // borderRadius.lg
  borderWidth: "0.5px", // borderWidth.hairline/default
};

// ── Block (collapsible section) ──────────────────────────────────────────────
export function Block({
  heading,
  children,
  defaultOpen = true,
  className = "",
  padding = "10px 12px",
}: {
  heading: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  padding?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={className}
      style={{
        background: C.fg1,
        border: `1px solid ${C.border2}`,
        borderRadius: C.radius,
        marginBottom: 8,
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
          padding: "10px 12px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: C.font,
          fontSize: 13,
          fontWeight: 600,
          color: C.text1,
          textAlign: "left",
          borderBottom: open ? `1px solid ${C.border3}` : "none",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = C.fg3)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        <span>{heading}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
        >
          <path d="M2 4.5L6 8.5L10 4.5" stroke={C.text2} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div style={{ padding }}>{children}</div>}
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
        border: `1px solid ${C.border2}`,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        fontFamily: C.font,
        cursor: "pointer",
        transition: "border-color 0.15s, box-shadow 0.15s",
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
            border: `1px solid ${C.border2}`,
            borderRadius: 6,
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
        borderRadius: 6,
        fontFamily: C.font,
        fontSize: fs,
        fontWeight: 600,
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
            <path d="M8 2a6 6 0 1 1-4.24 1.76L5 5H1V1l1.76 1.76A8 8 0 1 0 8 0v2z" fill="currentColor" />
          )}
          {icon === "metadata" && (
            <path d="M4 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 1v10h8V3H4zm1 2h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z" fill="currentColor" />
          )}
          {icon === "information" && (
            <>
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </>
          )}
        </svg>
      )}
      {children}
    </div>
  );
}

// ── Chip ─────────────────────────────────────────────────────────────────────
export function Chip({ children, color = "blue" }: { children: ReactNode; color?: "blue" | "green" | "red" | "neutral" | "orange" }) {
  const map = {
    blue: { bg: "#EAF2FA", text: "#1A4F8C", border: "#93BCDE" }, // Info
    green: { bg: "#EFF6E6", text: "#2D6A2E", border: "#B6D49A" }, // Success
    red: { bg: "#FDF0F0", text: "#8C1D1D", border: "#E89898" }, // Danger
    orange: { bg: "#FDF4DC", text: "#7A4E0C", border: "#EABF6A" }, // Warning
    neutral: { bg: "#EEEEE8", text: "#363830", border: "#D2D0C6" },
  };
  const s = map[color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 999,
        fontFamily: C.font,
        fontSize: 10,
        fontWeight: 600,
        color: s.text,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
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
        border: `1px solid ${C.border2}`,
        borderRadius: 6,
        overflow: "hidden",
        fontFamily: C.font,
        padding: 2,
      }}
    >
      {options.map((opt, i) => {
        const active = opt.value === value;
        return (
          <div
            key={opt.value}
            style={{
              flex: 1,
              padding: "6px 8px",
              textAlign: "center",
              fontSize: 11,
              fontWeight: 600,
              color: active ? C.text1 : C.text3,
              background: active ? C.fg1 : "transparent",
              borderRadius: active ? 4 : 0,
              cursor: "pointer",
              boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              userSelect: "none",
              transition: "all 0.15s",
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
        border: `${C.borderWidth || '0.5px'} solid ${C.border2}`,
        borderRadius: C.radiusLg,
        boxShadow: C.shadow,
        padding: "16px",
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

// ── Tooltip ─────────────────────────────────────────────────────────────────
export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  return (
    <RadixTooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent 
        side="top" 
        sideOffset={8}
        className="bg-[#363830] text-white border-none shadow-lg px-2.5 py-1.5 text-[11px] font-medium z-[10000]"
      >
        {text}
      </TooltipContent>
    </RadixTooltip>
  );
}

// ── InfoIcon ────────────────────────────────────────────────────────────────
export function InfoIcon({ tooltip }: { tooltip?: string }) {
  const icon = (
    <div style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", color: C.text3, marginLeft: 4, verticalAlign: "middle", marginTop: -1 }}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
  return tooltip ? <Tooltip text={tooltip}>{icon}</Tooltip> : icon;
}

export function MetadataIcon({ tooltip, onClick }: { tooltip?: string; onClick?: () => void }) {
  const icon = (
    <div 
      onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", color: C.blue, verticalAlign: "middle" }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 1v10h8V3H4zm1 2h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z" />
      </svg>
    </div>
  );
  return tooltip ? <Tooltip text={tooltip}>{icon}</Tooltip> : icon;
}

export function ResetIcon({ tooltip, onClick }: { tooltip?: string; onClick?: () => void }) {
  const icon = (
    <div 
      onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", color: C.text3, verticalAlign: "middle" }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 2a6 6 0 1 1-4.24 1.76L5 5H1V1l1.76 1.76A8 8 0 1 0 8 0v2z" />
      </svg>
    </div>
  );
  return tooltip ? <Tooltip text={tooltip}>{icon}</Tooltip> : icon;
}

// ── Modal / Onboarding Card ─────────────────────────────────────────────────
export function Modal({
  title,
  purpose,
  steps,
  onDismiss,
  onNeverShowAgain,
}: {
  title: string;
  purpose: string;
  steps: string[];
  onDismiss: () => void;
  onNeverShowAgain?: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5000,
        backdropFilter: "blur(2px)",
      }}
      onClick={onDismiss}
    >
      <div
        style={{
          width: 420,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 12px 32px rgba(14,34,18,0.20)",
          padding: 28,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onDismiss}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: C.text3,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div style={{ fontSize: 20, fontWeight: 700, color: C.text1, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 13, color: C.text2, marginBottom: 20, lineHeight: 1.5 }}>{purpose}</div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, textTransform: "uppercase", marginBottom: 10 }}>
            How to start
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: C.blueLight,
                    color: C.blue,
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: 13, color: C.text1 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{ fontSize: 12, color: C.text3, cursor: "pointer", textDecoration: "underline" }}
            onClick={onNeverShowAgain}
          >
            Don't show again
          </div>
          <button
            onClick={onDismiss}
            style={{
              padding: "8px 20px",
              background: C.blue,
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SlidePanel ───────────────────────────────────────────────────────────────
export function SlidePanel({
  title,
  isOpen,
  onClose,
  children,
  width = 350,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
}) {
  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.1)",
            zIndex: 4000,
          }}
          onClick={onClose}
        />
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : -width,
          width,
          height: "100vh",
          background: "#fff",
          boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
          zIndex: 4001,
          transition: "right 0.3s ease-out",
          display: "flex",
          flexDirection: "column",
          fontFamily: C.font,
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${C.border2}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text1 }}>{title}</div>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", color: C.text3 }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>{children}</div>
      </div>
    </>
  );
}
