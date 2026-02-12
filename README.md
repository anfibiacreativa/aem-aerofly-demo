# Aerofly — Summit Demo Brand

Fictional athletic footwear brand used for the AEM Experience Catalyst Summit demo.
A fully functional **AEM Edge Delivery Services** site with 14 branded block decorators,
backed by a Storybook component library, design tokens, and trend intelligence MCPs.

## What's Inside

| Component | Purpose |
|---|---|
| `scripts/aem.js` | EDS core library — block loader, section decorator, CSS/JS importer |
| `scripts/scripts.js` | Site initialization — orchestrates page decoration and loading |
| `styles/styles.css` | Global styles with all Aerofly design tokens as CSS custom properties |
| `blocks/` | 14 EDS block decorators (JS + CSS) matching the Aerofly component library |
| `head.html` | HTML head content injected into every page (fonts, scripts, styles) |
| `fstab.yaml` | Content source mapping for EDS |
| `index.html` | Demo homepage — pre-rendered EDS HTML for offline preview |
| `products/` | Demo product pages (AirPulse Max) |
| `storybook/` | Aerofly component library — Storybook instance with ~15 branded React components |
| `storybook/src/tokens/` | Design tokens (Style Dictionary format) — colors, typography, spacing |
| `mcp-servers/storybook-mcp` | MCP server that gives Claude knowledge of Aerofly's component library |
| `mcp-servers/design-tokens-mcp` | MCP server that gives Claude knowledge of Aerofly's design tokens |
| `mcp-servers/nerve-center-mcp` | MCP server that provides real-time trend intelligence (curated demo data) |
| `eds-site/` | Markdown content source files (reference) |

## Quick Start

### Serve the EDS site locally

```bash
# Serve with any static file server
npx serve . -l 3017 -s
# or
python3 -m http.server 3017

# Open in browser
open http://localhost:3017
```

### Pages

| URL | Description |
|---|---|
| `http://localhost:3017/` | Homepage — hero, social proof, features, categories, testimonials |
| `http://localhost:3017/products/airpulse-max.html` | Product page — gallery, specs, size selector, comparison table |

### Run Storybook

```bash
nvm use
npm install

npm run storybook
```

### Run MCP servers (used by Claude via aem-excat-plugin)

```bash
npm run mcp:storybook
npm run mcp:tokens
npm run mcp:nerve-center
```

## EDS Blocks

All 14 Aerofly blocks are implemented as EDS block decorators in `blocks/`:

| Block | Description |
|---|---|
| `hero-banner` | Full-bleed hero with background image, overline, heading, CTAs |
| `social-proof` | Stats bar (10M+ runners, 50+ countries, etc.) |
| `feature-grid` | Icon + title + description cards in a responsive grid |
| `categories` | Image tiles with overlay text for product categories |
| `testimonials` | Quote cards with star ratings and author attribution |
| `cta-band` | Full-width call-to-action band with heading and buttons |
| `newsletter` | Email signup form with inline input + button |
| `footer` | Multi-column link footer with copyright bar |
| `navigation` | Sticky nav bar with logo, links, and utility icons |
| `product-gallery` | Responsive image grid with hover zoom |
| `size-selector` | Interactive size picker with selection state |
| `specs` | Two-column specs table with zebra striping |
| `comparison` | Multi-product comparison table with highlight column |
| `announcement-bar` | Dismissible top banner for promotions |

Each block reads the DOM structure produced by EDS from markdown tables and
decorates it into the Aerofly design system using `--af-*` CSS custom properties.

## The Brand

**Aerofly** is a premium athletic footwear company focused on performance and sustainability.

- **Tagline:** "Engineered to Fly"
- **Product lines:** AirPulse Max (performance), CloudStride (everyday), TrailForge (outdoor)
- **Brand voice:** Confident, clean, performance-driven with a sustainability conscience
- **Aesthetic:** Minimal, bold typography, deep navy (`#0A1628`) + electric coral accent (`#FF4F3E`)

## Architecture

```
aem-aerofly-demo/
├── scripts/
│   ├── aem.js              # EDS core library
│   └── scripts.js           # Site initialization
├── styles/
│   └── styles.css           # Global styles + design tokens
├── blocks/
│   ├── hero-banner/         # Each block has .js + .css
│   ├── social-proof/
│   ├── feature-grid/
│   ├── categories/
│   ├── testimonials/
│   ├── cta-band/
│   ├── newsletter/
│   ├── footer/
│   ├── navigation/
│   ├── product-gallery/
│   ├── size-selector/
│   ├── specs/
│   ├── comparison/
│   └── announcement-bar/
├── storybook/               # React component library
├── mcp-servers/             # MCP servers for Claude
├── head.html                # EDS head content
├── fstab.yaml               # Content source mapping
├── index.html               # Demo homepage
└── products/
    └── airpulse-max.html    # Demo product page
```
