---
name: Monochrome Editorial
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
  deep-black: '#000000'
  stark-white: '#FFFFFF'
  ink-gray: '#121212'
  paper-gray: '#E5E5E5'
  grain-texture: rgba(255, 255, 255, 0.03)
typography:
  headline-xl:
    fontFamily: Anton
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 100px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 60px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 44px
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-bold:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-mono:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
spacing:
  container-margin: 4rem
  gutter: 1.5rem
  section-gap: 8rem
  component-padding: 1rem
---

## Brand & Style

This design system shifts the "glass" aesthetic into a high-contrast, editorial brutalism. Inspired by luxury music posters and fashion editorials, it prioritizes raw visual impact, stark typography, and a "physical" texture that breaks away from standard digital interfaces.

The personality is unapologetically bold, sophisticated, and avant-garde. It utilizes a mix of **Brutalism** and **High-Contrast Bold** styles. Key characteristics include:
- **Textural Depth:** Replacing smooth blurs with grain and film noise.
- **Aggressive Hierarchy:** Massive, condensed headings contrasted with micro-labels.
- **Geometric Motifs:** Strong use of circles (vinyl records) and hard rectangular grids to anchor content.
- **Editorial Layout:** Generous whitespace used strategically to frame information as if it were a printed spread.

## Colors

The palette is strictly monochromatic, relying on extreme contrast to define functional areas rather than color-coding. 

- **Primary Surface:** `#000000`. Deep, ink-black that serves as the void for the interface.
- **Accent Surface:** `#FFFFFF`. Used for high-priority interactive elements and inverted text blocks.
- **Secondary Surface:** `#121212`. Provides subtle separation for panels and containers.
- **Interactive States:** Interaction is signaled through inversion (e.g., black text on a white background) rather than hue shifts.

A global noise/grain texture must be applied to all surfaces to mimic the tactile quality of a printed poster and soften the digital starkness.

## Typography

Typography is the primary structural element. The system uses **Anton** for dramatic, condensed headlines that demand attention, mimicking the "THE WEEKND" title. 

- **Headlines:** Use Anton for large-scale titles. For a more sophisticated look, use "Outline" variants (1px stroke, no fill) for secondary headers.
- **Body:** **Hanken Grotesk** provides a clean, modern contrast that remains highly legible at smaller scales.
- **Labels:** **Space Grotesk** is used for technical data, status bars, and navigational labels to introduce a slight geometric, futuristic edge.

Strict adherence to the uppercase transform for labels and headlines is required to maintain the editorial aesthetic.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model inspired by poster design. Content is often split into stark vertical or horizontal halves (50/50 splits).

- **Grid:** A 12-column grid is used, but elements frequently span 6 or 12 columns to maintain "big" blocks of content.
- **Margins:** Large outer margins (4rem) create a frame-within-a-frame effect.
- **Desktop Shell:** The Cosmos Top Bar and Dock are reimagined as high-contrast ribbons. The Dock is no longer floating but anchored or presented as a crisp, segmented bar with no blur.
- **Breakpoints:** On mobile, the 50/50 splits stack vertically, and the `headline-xl` size is reduced to `headline-lg-mobile` to prevent overflow while maintaining impact.

## Elevation & Depth

This system rejects soft shadows and translucent glass in favor of **Tonal Layers** and **Bold Borders**.

- **Surfaces:** Depth is created by stacking solid colors. A panel sits on top of the background by using a contrasting solid fill (White on Black) or a 1px solid white border.
- **Grain:** A persistent film grain overlay across the entire UI adds a perceived layer of "material" depth.
- **Zero Shadow:** No box-shadows are permitted. Elevation is communicated through high-contrast outlines (1px or 2px white borders on black surfaces).
- **Geometric Motifs:** Use circular masks for profile images or "vinyl" decorative elements to break up the rigid rectangular grid.

## Shapes

The shape language is strictly **Sharp (0)**. 

Every UI element—windows, buttons, inputs, and the dock—must have 0px corner radii. This reinforces the brutalist, architectural feel. The only exception is the use of perfect circles for specific decorative motifs or icon containers, emphasizing the contrast between the rigid grid and "analogue" geometric forms.

## Components

- **Buttons:** Use "Inverted" styling. Default is a 1px white border with white text. Hover state is solid white background with black text. No rounded corners.
- **Inputs:** Simple bottom-border only (1px white) for a minimal look, or a solid black box with a 1px white outline.
- **Cards/Windows:** Solid black backgrounds with a 1px white outline. Window titles are set in `label-bold` and centered.
- **Chips/Status:** Small, rectangular blocks with solid white backgrounds and black `label-mono` text.
- **Dock:** A solid black bar at the screen edge with 1px white separators between icons. Active apps are indicated by a solid white square rather than a glow.
- **Checkboxes:** Sharp 12px squares. When checked, they are solid white with a black "X" or "Check."