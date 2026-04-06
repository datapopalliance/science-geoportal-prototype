# Design Tokens — Color Palette & System

This file documents the full design token system for the platform. Use it to apply the correct colors, spacing, typography, elevation, and component styles consistently across the prototype.

---

## Color Palette

### Primary (Green)

| Token | Value | Usage |
|---|---|---|
| `color.primary.50` | `#EFF6E6` | Lightest tint, backgrounds |
| `color.primary.100` | `#DAE9CB` | Hover states, subtle fills |
| `color.primary.200` | `#B6D49A` | Borders, dividers |
| `color.primary.300` | `#85B86B` | Muted accents |
| `color.primary.400` | `#5A9E4A` | Secondary actions |
| `color.primary.500` | `#3B8135` | **Base brand green** |
| `color.primary.600` | `#2D6A2E` | Hover on primary |
| `color.primary.700` | `#23541F` | Pressed state |
| `color.primary.800` | `#1A3D1E` | Dark variant |
| `color.primary.900` | `#0E2212` | Deepest shade |

### Neutral

| Token | Value | Usage |
|---|---|---|
| `color.neutral.0` | `#FFFFFF` | White |
| `color.neutral.50` | `#F7F6F1` | Page background |
| `color.neutral.100` | `#EEEEE8` | Surface / card background |
| `color.neutral.200` | `#D2D0C6` | Default border |
| `color.neutral.300` | `#B4B2A9` | Muted border |
| `color.neutral.400` | `#7A7D74` | Placeholder, muted text |
| `color.neutral.500` | `#5F5E5A` | Secondary text |
| `color.neutral.600` | `#4D5248` | Body text |
| `color.neutral.700` | `#363830` | Primary text |
| `color.neutral.800` | `#2B2E27` | Strong text |
| `color.neutral.900` | `#1A1C18` | Near-black |
| `color.neutral.950` | `#0E0F0C` | Darkest |

### Info (Blue)

| Token | Value |
|---|---|
| `color.info.50` | `#EAF2FA` |
| `color.info.100` | `#C8DDEE` |
| `color.info.200` | `#93BCDE` |
| `color.info.400` | `#3578C0` |
| `color.info.600` | `#1A4F8C` |
| `color.info.700` | `#133D6E` |
| `color.info.900` | `#0B3460` |

### Warning (Amber)

| Token | Value |
|---|---|
| `color.warning.50` | `#FDF4DC` |
| `color.warning.100` | `#F5DFA8` |
| `color.warning.200` | `#EABF6A` |
| `color.warning.400` | `#C47D1A` |
| `color.warning.600` | `#7A4E0C` |
| `color.warning.700` | `#5C3808` |
| `color.warning.900` | `#3D2405` |

### Danger (Red)

| Token | Value |
|---|---|
| `color.danger.50` | `#FDF0F0` |
| `color.danger.100` | `#F4CBCB` |
| `color.danger.200` | `#E89898` |
| `color.danger.400` | `#C83D3D` |
| `color.danger.600` | `#8C1D1D` |
| `color.danger.700` | `#6B1414` |
| `color.danger.900` | `#3E0A0A` |

---

## Semantic Color Mapping

These are the resolved values to use in the **Light** theme. Reference these when applying colors to UI elements.

### Backgrounds

| Role | Resolved Value | Token Path |
|---|---|---|
| Page / App background | `#F7F6F1` | `color.neutral.50` |
| Surface (secondary bg) | `#EEEEE8` | `color.neutral.100` |
| Card | `#FFFFFF` | `color.neutral.0` |
| Primary action bg | `#3B8135` | `color.primary.500` |
| Primary hover bg | `#2D6A2E` | `color.primary.600` |
| Info bg | `#EAF2FA` | `color.info.50` |
| Warning bg | `#FDF4DC` | `color.warning.50` |
| Danger bg | `#FDF0F0` | `color.danger.50` |
| Success bg | `#EFF6E6` | `color.primary.50` |

### Text

| Role | Resolved Value | Token Path |
|---|---|---|
| Primary text | `#363830` | `color.neutral.700` |
| Secondary text | `#4D5248` | `color.neutral.600` |
| Muted text | `#7A7D74` | `color.neutral.400` |
| On Primary (white on green) | `#FFFFFF` | `color.neutral.0` |
| Info text | `#1A4F8C` | `color.info.600` |
| Warning text | `#7A4E0C` | `color.warning.600` |
| Danger text | `#8C1D1D` | `color.danger.600` |
| Success text | `#2D6A2E` | `color.primary.600` |

### Borders

| Role | Resolved Value | Token Path |
|---|---|---|
| Default border | `#D2D0C6` | `color.neutral.200` |
| Focus ring | `#5A9E4A` | `color.primary.400` |
| Primary border | `#3B8135` | `color.primary.500` |
| Info border | `#93BCDE` | `color.info.200` |
| Warning border | `#EABF6A` | `color.warning.200` |
| Danger border | `#E89898` | `color.danger.200` |
| Success border | `#B6D49A` | `color.primary.200` |

---

## Elevation (Shadows)

| Level | Value | Usage |
|---|---|---|
| `elevation.0` | `none` | Flat, no shadow |
| `elevation.1` | `0 1px 2px 0 rgba(14,34,18,0.06)` | Cards, dropdowns |
| `elevation.2` | `0 2px 8px 0 rgba(14,34,18,0.08)` | Floating panels |
| `elevation.3` | `0 4px 16px 0 rgba(14,34,18,0.10)` | Modals, dialogs |
| `elevation.4` | `0 8px 32px 0 rgba(14,34,18,0.14)` | Sticky headers, toasts |

---

## Spacing Scale

| Token | Value (px) |
|---|---|
| `spacing.0` | `0` |
| `spacing.xs` | `4` |
| `spacing.sm` | `8` |
| `spacing.md` | `16` |
| `spacing.lg` | `24` |
| `spacing.xl` | `40` |
| `spacing.2xl` | `64` |
| `spacing.3xl` | `96` |
| `spacing.4xl` | `128` |

---

## Border Radius

| Token | Value (px) |
|---|---|
| `borderRadius.none` | `0` |
| `borderRadius.sm` | `4` |
| `borderRadius.md` | `8` |
| `borderRadius.lg` | `12` |
| `borderRadius.xl` | `16` |
| `borderRadius.2xl` | `24` |
| `borderRadius.pill` | `999` |

---

## Border Width

| Token | Value (px) |
|---|---|
| `borderWidth.hairline` | `0.5` |
| `borderWidth.default` | `1` |
| `borderWidth.strong` | `2` |

---

## Typography

### Font Families

| Token | Value |
|---|---|
| `typography.fontFamily.sans` | `Inter, system-ui, sans-serif` |
| `typography.fontFamily.mono` | `'SF Mono', 'Fira Code', monospace` |

### Font Weights

| Token | Value |
|---|---|
| `typography.fontWeight.regular` | `400` |
| `typography.fontWeight.medium` | `500` |
| `typography.fontWeight.semibold` | `600` |

### Font Sizes

| Token | Value (px) | Usage |
|---|---|---|
| `typography.fontSize.xs` | `11` | Legal, footnotes |
| `typography.fontSize.sm` | `12` | Captions, labels |
| `typography.fontSize.body` | `14` | Default body |
| `typography.fontSize.md` | `16` | Large body |
| `typography.fontSize.h3` | `14` | Heading 3 |
| `typography.fontSize.h2` | `18` | Heading 2 |
| `typography.fontSize.h1` | `24` | Heading 1 |
| `typography.fontSize.display` | `32` | Display |
| `typography.fontSize.hero` | `48` | Hero |

### Line Heights

| Token | Value |
|---|---|
| `typography.lineHeight.none` | `1` |
| `typography.lineHeight.tight` | `1.2` |
| `typography.lineHeight.snug` | `1.35` |
| `typography.lineHeight.normal` | `1.5` |
| `typography.lineHeight.relaxed` | `1.7` |

### Letter Spacing

| Token | Value | Usage |
|---|---|---|
| `typography.letterSpacing.tighter` | `-0.03em` | Display numerics |
| `typography.letterSpacing.tight` | `-0.01em` | |
| `typography.letterSpacing.normal` | `0` | |
| `typography.letterSpacing.wide` | `0.04em` | |
| `typography.letterSpacing.wider` | `0.08em` | Table headers, labels |
| `typography.letterSpacing.widest` | `0.12em` | Section tags |

---

## Component Tokens

### Button — Primary

| Property | Resolved Value |
|---|---|
| Background | `#3B8135` |
| Background (hover) | `#2D6A2E` |
| Text | `#FFFFFF` |
| Border | `#3B8135` |
| Padding X | `16px` |
| Padding Y | `8px` |
| Border radius | `8px` |
| Font size | `14px` |
| Font weight | `500` |

### Button — Secondary

| Property | Resolved Value |
|---|---|
| Background | `#FFFFFF` |
| Background (hover) | `#EEEEE8` |
| Text | `#363830` |
| Border | `#D2D0C6` |
| Padding X | `16px` |
| Padding Y | `8px` |
| Border radius | `8px` |
| Font size | `14px` |
| Font weight | `500` |

### Badge

| Property | Resolved Value |
|---|---|
| Padding X | `8px` |
| Padding Y | `3px` |
| Border radius | `999px` (pill) |
| Font size | `12px` |
| Font weight | `500` |
| Info bg / text / border | `#EAF2FA` / `#1A4F8C` / `#93BCDE` |
| Success bg / text / border | `#EFF6E6` / `#2D6A2E` / `#B6D49A` |
| Warning bg / text / border | `#FDF4DC` / `#7A4E0C` / `#EABF6A` |
| Danger bg / text / border | `#FDF0F0` / `#8C1D1D` / `#E89898` |

### Card

| Property | Resolved Value |
|---|---|
| Background | `#FFFFFF` |
| Border | `#D2D0C6` |
| Border width | `0.5px` |
| Border radius | `12px` |
| Padding | `16px` |
| Elevation | `0 1px 2px 0 rgba(14,34,18,0.06)` |

### Input

| Property | Resolved Value |
|---|---|
| Background | `#FFFFFF` |
| Border | `#D2D0C6` |
| Border (focus) | `#5A9E4A` |
| Text | `#363830` |
| Placeholder | `#7A7D74` |
| Border radius | `8px` |
| Padding X | `8px` |
| Padding Y | `8px` |
| Font size | `14px` |
| Height | `36px` |

### Table

| Property | Resolved Value |
|---|---|
| Header background | `#EEEEE8` |
| Header text | `#7A7D74` |
| Header font size | `12px` |
| Header font weight | `600` |
| Header letter spacing | `0.08em` |
| Row background | `#FFFFFF` |
| Row border | `#D2D0C6` |
| Cell text | `#363830` |
| Cell font size | `14px` |
| Cell padding X | `16px` |
| Cell padding Y | `8px` |

---

## Typography Scale (Component)

| Style | Size | Weight | Line Height | Letter Spacing | Color |
|---|---|---|---|---|---|
| Display | 32px | 600 | 1.2 | -0.03em | `#363830` |
| H1 | 24px | 600 | 1.2 | -0.01em | `#363830` |
| H2 | 18px | 500 | 1.35 | 0 | `#363830` |
| H3 | 14px | 600 | 1.5 | 0.04em | `#363830` |
| Body | 14px | 400 | 1.7 | 0 | `#4D5248` |
| Caption | 12px | 400 | 1.5 | — | `#7A7D74` |
| Label | 12px | 600 | 1 | 0.08em | `#7A7D74` |
| Data / Numeric | 32px | 600 | 1 | -0.03em | `#363830` |

---

## Themes

Two themes are defined: **Light** (default) and **Dark**. Both use the same `core` and `component` token sets, swapping only the `semantic` layer.

- **Light**: `core` + `semantic/light` + `component`
- **Dark**: `core` + `semantic/dark` + `component`
