---
name: Yapping Rebel Protocol
colors:
  surface: '#191212'
  surface-dim: '#191212'
  surface-bright: '#403737'
  surface-container-lowest: '#130d0c'
  surface-container-low: '#211a1a'
  surface-container: '#251e1e'
  surface-container-high: '#302828'
  surface-container-highest: '#3b3332'
  on-surface: '#eedfde'
  on-surface-variant: '#e7bcbb'
  inverse-surface: '#eedfde'
  inverse-on-surface: '#372e2e'
  outline: '#ae8787'
  outline-variant: '#5d3f3f'
  surface-tint: '#ffb3b2'
  primary: '#ffb3b2'
  on-primary: '#680014'
  primary-container: '#ff525f'
  on-primary-container: '#5b0010'
  inverse-primary: '#bf002d'
  secondary: '#f8b6b2'
  on-secondary: '#4e2423'
  secondary-container: '#6b3c3a'
  on-secondary-container: '#e9a8a5'
  tertiary: '#ffb4a3'
  on-tertiary: '#631000'
  tertiary-container: '#ff5630'
  on-tertiary-container: '#560c00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#ffb3b2'
  on-primary-fixed: '#410009'
  on-primary-fixed-variant: '#920020'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#f8b6b2'
  on-secondary-fixed: '#34100f'
  on-secondary-fixed-variant: '#693a38'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a3'
  on-tertiary-fixed: '#3d0600'
  on-tertiary-fixed-variant: '#8b1a00'
  background: '#191212'
  on-background: '#eedfde'
  surface-variant: '#3b3332'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  action-text:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 12px
  margin-mobile: 16px
  margin-desktop: 24px
  stack-tight: 8px
  stack-loose: 20px
---

## Brand & Style
The design system is built on the pillars of **Resistance, Transparency, and Sovereign Speech**. It serves a community that values privacy and protection from censorship, particularly within the Indonesian legal landscape (UU ITE). 

The aesthetic is a fusion of **Modern Minimalism and Digital Brutalism**. It utilizes the sleek, functional layouts of global social platforms but injects an "underground" edge through aggressive color theory and high-contrast surfaces. The UI should feel like a high-end encrypted terminal—precise, secure, and unapologetic. 

**Visual Signature:**
- **Tone:** Rebellious, urgent, and fortified.
- **Style:** Dark-mode by default, utilizing "Black Cherry" depths and "Vibrant Mahogany" highlights. 
- **Atmosphere:** High information density paired with razor-sharp interactive elements.

## Colors
The palette is centered on a "Blood and Iron" concept. The background is not a pure black, but a deep, suffocatingly dark mahogany (#0a0505) that provides a richer canvas for the vibrant red accents.

- **Primary (Signal Red):** `#ee113d`. Used for critical actions, active states, and brand-defining moments. It represents the "Yap."
- **Secondary (Dried Blood):** `#2d0a0a`. Used for surface containers and subtle card backgrounds.
- **Tertiary (Heat):** `#f23b0d`. A secondary accent for "Zaps" (lightning tips) and highlights.
- **Neutral (The Void):** `#0a0505`. The foundational background color.
- **Text:** High-contrast White (#FFFFFF) for primary copy and Muted Crimson (#8e6e6e) for secondary metadata.

## Typography
The typography strategy contrasts the utilitarian nature of **Inter** with the aggressive, sharp personality of **Hanken Grotesk**.

- **Headlines:** Use Hanken Grotesk with tight tracking. It should feel loud and impactful, mimicking editorial headlines.
- **Body:** Inter is used for the "Yap" content to ensure maximum readability during long-form reading or rapid scrolling.
- **Data/Technical:** **JetBrains Mono** is introduced for metadata (Public Keys, Timestamps, and Nostr event IDs) to lean into the decentralized, technical nature of the platform.
- **Hierarchy:** Maintain a clear distinction between the "User Handle" (Bold Sans) and the "Content" (Regular Sans).

## Layout & Spacing
This design system utilizes a **Tight Fluid Grid** to achieve high information density, allowing users to scan multiple "Yaps" quickly.

- **Grid Model:** 12-column grid for desktop (max-width 680px for the feed to maintain readability); single column for mobile.
- **Density:** Padding within cards is kept to a minimum (12px to 16px) to maximize screen real estate.
- **Rhythm:** A 4px baseline grid ensures alignment between icons and text.
- **Responsiveness:** On mobile, margins shrink to 16px. On desktop, the feed is centered with a wide gutter for navigation and "Trending" sidebars.

## Elevation & Depth
Depth is not communicated through soft shadows, but through **Tonal Layering** and **Hard Strokes**.

- **Surfaces:** The base layer is #0a0505. Elevated cards use #150808 (a slightly lighter deep mahogany).
- **Outlines:** Instead of shadows, use 1px solid borders for depth.
  - *Inactive:* `#2d0a0a`
  - *Hover/Active:* `#ee113d`
- **Overlays:** Modals and menus use a heavy background blur (20px) with a semi-transparent dark mahogany tint to keep the focus on the foreground without losing the "dark room" context.

## Shapes
To maintain the "rebel/underground" feel, the shape language avoids overly bubbly or friendly curves.

- **Core Elements:** Buttons and Input fields use a **Soft (4px)** radius. This provides just enough modern refinement while remaining sharp and industrial.
- **Media/Images:** Larger containers like images or video embeds use an **8px (rounded-lg)** radius.
- **Interactive States:** Use "Square-off" corners for active tabs to give a modular, rugged appearance.

## Components
Consistent application of the "Rebel" aesthetic across core interactive elements:

- **The 'Yap' Button:** The primary Call-to-Action. It should be a solid `#ee113d` block with white, bold Hanken Grotesk text. No gradient. 
- **Feed Cards:** Flat containers with a 1px border (#2d0a0a). On hover, the border glows slightly towards primary mahogany.
- **Action Icons (Zap, Repost, Reply):** Use thin-stroke icons that turn solid/vibrant upon interaction. The 'Zap' icon (lightning) should use the tertiary `#f23b0d` color.
- **Input Fields:** Darker than the background (#050202) with a monospaced label (JetBrains Mono). The cursor should be a solid primary red block.
- **Status Indicators:** Encrypted/Verified status should be marked with a small shield or lock icon in a muted mahogany, turning bright red when "Secured."
- **Chips/Labels:** Small, rectangular tags with 2px corner radius, using JetBrains Mono for a "tagged data" look.