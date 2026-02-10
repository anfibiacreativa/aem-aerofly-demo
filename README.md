# Aerofly — Summit Demo Brand

Fictional athletic footwear brand used for the AEM Experience Catalyst Summit demo.

## What's Inside

| Component | Purpose |
|---|---|
| `storybook/` | Aerofly component library — a real Storybook instance with ~15 branded components |
| `storybook/src/tokens/` | Design tokens (Style Dictionary format) — colors, typography, spacing |
| `mcp-servers/storybook-mcp` | MCP server that gives Claude knowledge of Aerofly's component library |
| `mcp-servers/design-tokens-mcp` | MCP server that gives Claude knowledge of Aerofly's design tokens |
| `mcp-servers/nerve-center-mcp` | MCP server that provides real-time trend intelligence (curated demo data) |
| `eds-site/` | Sample AEM EDS site structure for Aerofly |

## Quick Start

```bash
nvm use
npm install

# Run Storybook
npm run storybook

# Run MCP servers (used by Claude via aem-excat-plugin)
npm run mcp:storybook
npm run mcp:tokens
npm run mcp:nerve-center
```

## The Brand

**Aerofly** is a premium athletic footwear company focused on performance and sustainability.

- **Tagline:** "Engineered to Fly"
- **Product lines:** AirPulse Max (performance), CloudStride (everyday), TrailForge (outdoor)
- **Brand voice:** Confident, clean, performance-driven with a sustainability conscience
- **Aesthetic:** Minimal, bold typography, deep navy + electric coral accent
