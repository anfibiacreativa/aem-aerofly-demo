import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Design Tokens MCP Server — Aerofly Design System
 *
 * Gives Claude knowledge of the customer's design tokens:
 * - Colors (brand, semantic, neutral, surface)
 * - Typography (fonts, sizes, weights, line heights)
 * - Spacing scale
 * - Border radii, shadows, breakpoints, motion
 *
 * When Claude generates pages, it uses the exact CSS custom properties
 * from this design system — ensuring output matches the customer's brand.
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_PATH = resolve(__dirname, '../../../storybook/src/tokens/tokens.json');

// Load tokens from the shared tokens.json
function loadTokens(): Record<string, unknown> {
  const raw = readFileSync(TOKENS_PATH, 'utf-8');
  return JSON.parse(raw);
}

// Flatten nested token structure into a flat list
interface FlatToken {
  path: string;
  cssVariable: string;
  value: string;
  type: string;
  description?: string;
  category: string;
}

function flattenTokens(obj: Record<string, unknown>, prefix = '', category = ''): FlatToken[] {
  const tokens: FlatToken[] = [];

  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (val && typeof val === 'object' && 'value' in (val as Record<string, unknown>)) {
      const token = val as { value: string; type?: string; description?: string };
      const cssVar = `--af-${path.replace(/\./g, '-')}`;

      tokens.push({
        path,
        cssVariable: cssVar,
        value: token.value,
        type: token.type || 'unknown',
        description: token.description,
        category: category || path.split('.')[0],
      });
    } else if (val && typeof val === 'object') {
      tokens.push(...flattenTokens(val as Record<string, unknown>, path, category || key));
    }
  }

  return tokens;
}

// ─── Server Setup ───

const server = new McpServer({
  name: 'aerofly-design-tokens',
  version: '1.0.0',
  description: 'Aerofly design tokens — colors, typography, spacing, and more. Use these tokens when generating CSS and markup to ensure brand consistency.',
});

// ─── Tool: get_all_tokens ───

server.tool(
  'get_all_tokens',
  'Get the complete design token set for the Aerofly brand. Returns all tokens organized by category (color, typography, spacing, etc.) with CSS variable names and values.',
  {},
  async () => {
    const tokens = loadTokens();
    const flat = flattenTokens(tokens);

    const byCategory: Record<string, FlatToken[]> = {};
    for (const t of flat) {
      if (!byCategory[t.category]) byCategory[t.category] = [];
      byCategory[t.category].push(t);
    }

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          brand: 'Aerofly',
          totalTokens: flat.length,
          categories: Object.keys(byCategory),
          tokens: byCategory,
        }, null, 2),
      }],
    };
  },
);

// ─── Tool: get_tokens_by_category ───

server.tool(
  'get_tokens_by_category',
  'Get design tokens for a specific category. Categories: color, typography, spacing, borderRadius, shadow, breakpoint, motion.',
  {
    category: z.enum(['color', 'typography', 'spacing', 'borderRadius', 'shadow', 'breakpoint', 'motion'])
      .describe('Token category to retrieve'),
  },
  async ({ category }) => {
    const tokens = loadTokens();
    const categoryData = tokens[category];

    if (!categoryData) {
      return {
        content: [{
          type: 'text' as const,
          text: `Category "${category}" not found. Available: color, typography, spacing, borderRadius, shadow, breakpoint, motion`,
        }],
        isError: true,
      };
    }

    const flat = flattenTokens({ [category]: categoryData });

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          category,
          tokenCount: flat.length,
          tokens: flat.map(t => ({
            name: t.path,
            cssVariable: t.cssVariable,
            value: t.value,
            description: t.description,
          })),
        }, null, 2),
      }],
    };
  },
);

// ─── Tool: get_color_palette ───

server.tool(
  'get_color_palette',
  'Get the Aerofly color palette — brand colors, neutrals, semantic colors, and surface colors. Use this for any color-related decisions in page generation.',
  {},
  async () => {
    const tokens = loadTokens();
    const colorTokens = flattenTokens({ color: tokens.color });

    const palette = {
      brand: colorTokens.filter(t => t.path.includes('brand')).map(t => ({
        name: t.path.split('.').pop(),
        cssVariable: t.cssVariable,
        value: t.value,
        description: t.description,
      })),
      neutral: colorTokens.filter(t => t.path.includes('neutral')).map(t => ({
        name: t.path.split('.').pop(),
        cssVariable: t.cssVariable,
        value: t.value,
        description: t.description,
      })),
      semantic: colorTokens.filter(t => t.path.includes('semantic')).map(t => ({
        name: t.path.split('.').pop(),
        cssVariable: t.cssVariable,
        value: t.value,
        description: t.description,
      })),
      surface: colorTokens.filter(t => t.path.includes('surface')).map(t => ({
        name: t.path.split('.').pop(),
        cssVariable: t.cssVariable,
        value: t.value,
        description: t.description,
      })),
    };

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          brand: 'Aerofly',
          summary: 'Deep navy primary (#0A1628), electric coral accent (#FF4F3E), warm sand backgrounds (#F5E6D3). Slate gray neutrals. Clean, premium athletic brand.',
          palette,
          usage: {
            primary: 'Headings, nav, footer backgrounds — var(--af-color-brand-primary)',
            accent: 'CTAs, highlights, active states — var(--af-color-brand-accent)',
            warm: 'Soft backgrounds, featured sections — var(--af-color-brand-warm)',
            text: 'Body text uses neutral-900 (#0F172A), secondary text uses neutral-700 (#334155)',
          },
        }, null, 2),
      }],
    };
  },
);

// ─── Tool: get_typography ───

server.tool(
  'get_typography',
  'Get the Aerofly typography system — font families, size scale, weights, line heights, and letter spacing. Use this for all text styling decisions.',
  {},
  async () => {
    const tokens = loadTokens();
    const typoTokens = flattenTokens({ typography: tokens.typography });

    const typography = {
      fonts: typoTokens.filter(t => t.path.includes('fontFamily')).map(t => ({
        name: t.path.split('.').pop(),
        cssVariable: t.cssVariable,
        value: t.value,
        description: t.description,
      })),
      sizes: typoTokens.filter(t => t.path.includes('fontSize')).map(t => ({
        name: t.path.split('.').pop(),
        cssVariable: t.cssVariable,
        value: t.value,
        description: t.description,
      })),
      weights: typoTokens.filter(t => t.path.includes('fontWeight')).map(t => ({
        name: t.path.split('.').pop(),
        cssVariable: t.cssVariable,
        value: t.value,
        description: t.description,
      })),
      lineHeights: typoTokens.filter(t => t.path.includes('lineHeight')).map(t => ({
        name: t.path.split('.').pop(),
        cssVariable: t.cssVariable,
        value: t.value,
        description: t.description,
      })),
      letterSpacing: typoTokens.filter(t => t.path.includes('letterSpacing')).map(t => ({
        name: t.path.split('.').pop(),
        cssVariable: t.cssVariable,
        value: t.value,
        description: t.description,
      })),
    };

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          brand: 'Aerofly',
          summary: 'Inter font family for both headings and body. Bold (700) for headings, light (300) for large display. Size scale from 11px (overline) to 72px (display-xl). Tight line-height for headings, relaxed for body.',
          typography,
          quickReference: {
            heroHeadline: 'font-size: var(--af-font-size-display-xl), font-weight: var(--af-font-weight-bold), line-height: var(--af-line-height-tight)',
            sectionHeadline: 'font-size: var(--af-font-size-heading-xl), font-weight: var(--af-font-weight-bold)',
            bodyText: 'font-size: var(--af-font-size-body-md), font-weight: var(--af-font-weight-regular), line-height: var(--af-line-height-normal)',
            cta: 'font-size: var(--af-font-size-body-md), font-weight: var(--af-font-weight-semibold)',
            overline: 'font-size: var(--af-font-size-overline), font-weight: var(--af-font-weight-semibold), letter-spacing: var(--af-letter-spacing-wider), text-transform: uppercase',
          },
        }, null, 2),
      }],
    };
  },
);

// ─── Tool: resolve_token ───

server.tool(
  'resolve_token',
  'Look up a specific token by name or CSS variable. Returns the token value, description, and related tokens.',
  {
    query: z.string().describe('Token name, path, or CSS variable (e.g., "brand-accent", "--af-color-brand-accent", "spacing.4")'),
  },
  async ({ query }) => {
    const tokens = loadTokens();
    const flat = flattenTokens(tokens);

    const queryLower = query.toLowerCase().replace(/^--af-/, '');

    const matches = flat.filter(t =>
      t.path.toLowerCase().includes(queryLower) ||
      t.cssVariable.toLowerCase().includes(queryLower)
    );

    if (matches.length === 0) {
      return {
        content: [{
          type: 'text' as const,
          text: `No tokens found matching "${query}". Try searching by category name (e.g., "brand", "spacing", "heading") or CSS variable name.`,
        }],
      };
    }

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          query,
          matchCount: matches.length,
          tokens: matches.map(t => ({
            path: t.path,
            cssVariable: t.cssVariable,
            value: t.value,
            type: t.type,
            description: t.description,
            category: t.category,
          })),
        }, null, 2),
      }],
    };
  },
);

// ─── Start Server ───

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Aerofly Design Tokens MCP server running');
}

main().catch(console.error);
