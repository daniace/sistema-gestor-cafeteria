---
name: Warm Professionalism
colors:
  surface: '#fbf8fc'
  surface-dim: '#dcd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e1e5'
  on-surface: '#1b1b1e'
  on-surface-variant: '#54433c'
  inverse-surface: '#303033'
  inverse-on-surface: '#f3f0f4'
  outline: '#87736a'
  outline-variant: '#dac1b7'
  surface-tint: '#944a23'
  primary: '#592100'
  on-primary: '#ffffff'
  primary-container: '#78350f'
  on-primary-container: '#ffa072'
  inverse-primary: '#ffb693'
  secondary: '#5d5e60'
  on-secondary: '#ffffff'
  secondary-container: '#dfdfe0'
  on-secondary-container: '#616364'
  tertiary: '#003650'
  on-tertiary: '#ffffff'
  tertiary-container: '#004e71'
  on-tertiary-container: '#87bee7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#76330d'
  secondary-fixed: '#e2e2e3'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1d'
  on-secondary-fixed-variant: '#454748'
  tertiary-fixed: '#c8e6ff'
  tertiary-fixed-dim: '#95cdf6'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e1e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 1.5rem
  margin-page: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

This design system is built for high-efficiency administrative environments that benefit from a calming, tactile aesthetic. It evolves the "shadcn/ui" philosophy by introducing organic warmth into a rigorous, minimalist framework. The brand personality is **reliable, meticulous, and welcoming**, designed to reduce cognitive load for staff during peak service hours.

The visual style is **Corporate Modern with a Tactile Edge**. It prioritizes extreme legibility and "breathability" (whitespace), ensuring that management tasks feel less like data entry and more like a curated experience. By moving away from the harsh primary blues seen in legacy software, the UI adopts a sophisticated neutral base that highlights action through rich, coffee-inspired accents.

## Colors

The palette is anchored in the **Zinc/Stone** spectrum to provide a stable, professional foundation. 

- **Primary:** A deep Amber-Brown (#78350f) used exclusively for high-intent actions, active states, and critical branding.
- **Surface Strategy:** We use a pure white background with zinc-100 borders to create a layered "sheet" effect. 
- **Muted & Accent:** Muted tones use a soft gray for secondary information, while the Accent color uses a subtle parchment tint (#fafaf9) to provide a warm, "paper-like" feel to hover states and headers.
- **Functional Colors:** Destructive actions utilize a standard bright red, but are tempered by high-contrast white text for immediate clarity.

## Typography

Using **Inter** as the sole typeface ensures a systematic, clean, and highly legible interface across all densities. 

- **Headlines:** Use tight letter spacing (-0.01em to -0.02em) and semi-bold to bold weights to create a strong visual hierarchy.
- **Labels:** Small caps are reserved for table headers and section metadata to differentiate from interactive labels.
- **Interactive Text:** Buttons and navigation items use `label-md` for a balanced, professional weight that stands out from standard body copy.

## Layout & Spacing

The system follows a **Fixed-Fluid Hybrid** model. While the outer container respects a max-width of 1440px for desktop ergonomics, internal dashboard widgets utilize a fluid grid system.

- **The 8px Rule:** All spacing increments are multiples of 8px to ensure a consistent rhythmic flow.
- **Grid:** A 12-column grid is used for dashboard layouts, typically reflowing to a single column stack on mobile devices.
- **Safe Zones:** We maintain a generous 32px (2rem) page margin to keep the interface feeling open and premium, avoiding the "cluttered terminal" look of legacy POS systems.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Subtle Stroke definition** rather than heavy shadows.

- **Level 0 (Background):** Pure White (#ffffff).
- **Level 1 (Cards/Containers):** Pure White with a 1px border in Zinc-200. This provides a crisp, architectural boundary.
- **Shadows:** We use a "Soft Diffusion" shadow for floating elements (modals, dropdowns). It consists of two layers: a 4px blur at 5% opacity and a 12px blur at 10% opacity, both using a neutral zinc tint.
- **Focus States:** Active inputs or focused buttons use a 2px offset ring in the Primary Amber color to provide high-visibility feedback.

## Shapes

The design system employs a **Balanced Rounded** corner strategy. A 0.5rem (8px) radius is the standard for almost all components, including buttons, inputs, and cards.

- **Standard (8px):** Primary UI elements.
- **Large (16px):** Modals and top-level dashboard sections.
- **Pill:** Reserved exclusively for status indicators (tags/badges) to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Solid Amber (#78350f) background with White text.
- **Secondary:** Zinc-100 background with Zinc-900 text. Subtle border.
- **Ghost:** No background, transparent border; color changes on hover to Zinc-100.

### Input Fields
- Use a 1px Zinc-200 border. On focus, the border transitions to Zinc-400 with a 2px Primary-colored outer ring.
- Labels sit above the field in `label-md` weight.

### Cards & Tables
- **Cards:** White background, 1px border, no shadow unless hovered.
- **Tables:** Minimalist rows with thin separators. The header row uses the `label-caps` typography style and a muted gray background.

### Coffee-Specific Components
- **Order Status Chips:** Pill-shaped badges using semantic colors (e.g., Green for "Ready", Amber for "In Progress").
- **Table Grid:** Large, rounded squares (1rem radius) that change color based on occupancy, using high-contrast text to remain legible from a distance.
