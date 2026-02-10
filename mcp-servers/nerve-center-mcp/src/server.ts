import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Nerve Center MCP Server — Real-Time Trend Intelligence
 *
 * Provides Claude with awareness of what's happening in the world:
 * - Trending topics and their momentum
 * - Viral content opportunities
 * - Competitor moves and recommended responses
 * - Seasonal context and upcoming events
 *
 * For the Summit demo, this uses curated data from trends.json.
 * In production, this would aggregate from Google Trends, social APIs,
 * news feeds, and competitive intelligence platforms.
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const TRENDS_PATH = resolve(__dirname, '../data/trends.json');

interface Signal {
  source: string;
  metric: string;
}

interface Trend {
  id: string;
  topic: string;
  category: string;
  momentum: string;
  score: number;
  summary: string;
  signals: Signal[];
  contentAngles: string[];
  relevantProducts: string[];
  tags: string[];
}

interface ViralContent {
  id: string;
  title: string;
  platform: string;
  views: string;
  summary: string;
  relevance: string;
  sentiment: string;
  contentOpportunity: string;
}

interface CompetitorMove {
  brand: string;
  action: string;
  date: string;
  impact: string;
  recommendedResponse: string;
}

interface SeasonalEvent {
  event: string;
  date: string;
  leadTime: string;
  relevance: string;
}

interface TrendsData {
  lastUpdated: string;
  trending: Trend[];
  viralContent: ViralContent[];
  competitorMoves: CompetitorMove[];
  seasonalContext: {
    currentSeason: string;
    upcomingEvents: SeasonalEvent[];
    weatherInsight: string;
  };
}

function loadTrends(): TrendsData {
  const raw = readFileSync(TRENDS_PATH, 'utf-8');
  return JSON.parse(raw);
}

// ─── Server Setup ───

const server = new McpServer({
  name: 'aerofly-nerve-center',
  version: '1.0.0',
  description: 'Aerofly Nerve Center — real-time awareness of trends, viral content, competitor moves, and seasonal context. Use this intelligence to inform page content, messaging angles, and creative decisions.',
});

// ─── Tool: get_trending_topics ───

server.tool(
  'get_trending_topics',
  'Get currently trending topics relevant to the Aerofly brand. Returns topics with momentum scores, content angles, and relevant products. Use this to inform messaging and content decisions when building pages.',
  {
    category: z.string().optional().describe('Filter by category: sustainability, sports, technology, wellness'),
    minScore: z.number().optional().describe('Minimum trend score (0-100). Higher = more relevant/urgent.'),
    product: z.string().optional().describe('Filter trends relevant to a specific product (e.g., "AirPulse Max", "TrailForge Pro")'),
  },
  async ({ category, minScore, product }) => {
    const data = loadTrends();
    let trends = data.trending;

    if (category) {
      trends = trends.filter(t => t.category.toLowerCase() === category.toLowerCase());
    }
    if (minScore) {
      trends = trends.filter(t => t.score >= minScore);
    }
    if (product) {
      trends = trends.filter(t =>
        t.relevantProducts.some(p => p.toLowerCase().includes(product.toLowerCase()))
      );
    }

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          lastUpdated: data.lastUpdated,
          trendCount: trends.length,
          trends: trends.sort((a, b) => b.score - a.score).map(t => ({
            topic: t.topic,
            category: t.category,
            momentum: t.momentum,
            score: t.score,
            summary: t.summary,
            contentAngles: t.contentAngles,
            relevantProducts: t.relevantProducts,
            topSignal: t.signals[0],
          })),
        }, null, 2),
      }],
    };
  },
);

// ─── Tool: get_trend_details ───

server.tool(
  'get_trend_details',
  'Get detailed information about a specific trend, including all signals, content angles, and recommended messaging. Use this when you want to deeply inform a page with a specific trend.',
  {
    topic: z.string().describe('Trend topic name or ID'),
  },
  async ({ topic }) => {
    const data = loadTrends();
    const trend = data.trending.find(t =>
      t.topic.toLowerCase().includes(topic.toLowerCase()) ||
      t.id === topic
    );

    if (!trend) {
      return {
        content: [{
          type: 'text' as const,
          text: `Trend "${topic}" not found. Available trends: ${data.trending.map(t => t.topic).join(', ')}`,
        }],
        isError: true,
      };
    }

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify(trend, null, 2),
      }],
    };
  },
);

// ─── Tool: get_viral_content ───

server.tool(
  'get_viral_content',
  'Get currently viral content and stories relevant to the Aerofly brand. Returns viral moments with platform, views, sentiment, and content opportunities. Use this to create timely, culturally relevant page content.',
  {},
  async () => {
    const data = loadTrends();

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          lastUpdated: data.lastUpdated,
          viralItems: data.viralContent.map(v => ({
            title: v.title,
            platform: v.platform,
            views: v.views,
            summary: v.summary,
            sentiment: v.sentiment,
            contentOpportunity: v.contentOpportunity,
          })),
        }, null, 2),
      }],
    };
  },
);

// ─── Tool: get_competitor_intelligence ───

server.tool(
  'get_competitor_intelligence',
  'Get recent competitor moves and recommended responses. Use this to understand the competitive landscape and differentiate Aerofly messaging.',
  {
    brand: z.string().optional().describe('Filter by competitor brand name'),
  },
  async ({ brand }) => {
    const data = loadTrends();
    let moves = data.competitorMoves;

    if (brand) {
      moves = moves.filter(m => m.brand.toLowerCase().includes(brand.toLowerCase()));
    }

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          lastUpdated: data.lastUpdated,
          moveCount: moves.length,
          competitorMoves: moves,
        }, null, 2),
      }],
    };
  },
);

// ─── Tool: get_seasonal_context ───

server.tool(
  'get_seasonal_context',
  'Get current seasonal context — what time of year it is, upcoming events, and weather-related insights. Use this to time content appropriately and reference upcoming moments.',
  {},
  async () => {
    const data = loadTrends();

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          lastUpdated: data.lastUpdated,
          ...data.seasonalContext,
        }, null, 2),
      }],
    };
  },
);

// ─── Tool: get_content_brief ───

server.tool(
  'get_content_brief',
  'Generate a comprehensive content brief by combining trending topics, viral content, competitor context, and seasonal timing. Use this as the starting intelligence when building any page — it tells you what the world looks like right now for the Aerofly brand.',
  {
    product: z.string().optional().describe('Focus the brief around a specific product'),
    pageType: z.enum(['landing-page', 'product-detail', 'campaign', 'category', 'about']).optional().describe('Type of page being built'),
  },
  async ({ product, pageType }) => {
    const data = loadTrends();

    // Get top trends
    let relevantTrends = data.trending.sort((a, b) => b.score - a.score);
    if (product) {
      const productTrends = relevantTrends.filter(t =>
        t.relevantProducts.some(p => p.toLowerCase().includes(product.toLowerCase()))
      );
      relevantTrends = productTrends.length > 0 ? productTrends : relevantTrends.slice(0, 3);
    } else {
      relevantTrends = relevantTrends.slice(0, 3);
    }

    // Compile content angles
    const allAngles = relevantTrends.flatMap(t => t.contentAngles);

    // Get most relevant viral content
    const viralOpportunities = data.viralContent.map(v => v.contentOpportunity);

    // Get upcoming events
    const nearTermEvents = data.seasonalContext.upcomingEvents.filter(e => {
      const weeks = parseInt(e.leadTime);
      return weeks <= 12;
    });

    // Get competitive context
    const competitiveInsights = data.competitorMoves.map(m =>
      `${m.brand}: ${m.action} → ${m.recommendedResponse}`
    );

    const brief = {
      generatedAt: new Date().toISOString(),
      product: product || 'General Aerofly',
      pageType: pageType || 'general',
      topTrends: relevantTrends.map(t => ({
        topic: t.topic,
        score: t.score,
        momentum: t.momentum,
        keyAngle: t.contentAngles[0],
      })),
      recommendedContentAngles: allAngles,
      viralOpportunities,
      competitiveContext: competitiveInsights,
      seasonalTiming: {
        season: data.seasonalContext.currentSeason,
        nearTermEvents: nearTermEvents.map(e => `${e.event} (${e.leadTime}) — ${e.relevance}`),
        weatherInsight: data.seasonalContext.weatherInsight,
      },
      messagingPriorities: [
        relevantTrends[0] ? `Lead with: ${relevantTrends[0].topic} (score: ${relevantTrends[0].score})` : null,
        'Sustainability messaging is a must-have, not a nice-to-have',
        product ? `Position ${product} within current cultural conversation` : 'Connect products to trending narratives',
        'Use data-driven social proof (specific numbers, not vague claims)',
      ].filter(Boolean),
    };

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify(brief, null, 2),
      }],
    };
  },
);

// ─── Start Server ───

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Aerofly Nerve Center MCP server running');
}

main().catch(console.error);
