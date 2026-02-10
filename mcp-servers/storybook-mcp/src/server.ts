import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

/**
 * Storybook MCP Server — Aerofly Component Library
 *
 * Gives Claude full knowledge of the customer's component library:
 * - List all available components with their metadata
 * - Get detailed component info (props, variants, usage examples)
 * - Get the exact markup pattern for a component
 * - Search components by capability or use case
 */

// ─── Component Registry ───
// This represents what would normally be extracted from a live Storybook instance.
// For the demo, we maintain a rich static registry that mirrors the actual components.

interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
  options?: string[];
}

interface ComponentVariant {
  name: string;
  description: string;
  props: Record<string, unknown>;
}

interface ComponentDef {
  name: string;
  displayName: string;
  description: string;
  category: string;
  tags: string[];
  props: ComponentProp[];
  variants: ComponentVariant[];
  usageNotes: string;
  edsMarkup: string; // The AEM EDS markdown/HTML pattern
}

const COMPONENTS: ComponentDef[] = [
  {
    name: 'HeroBanner',
    displayName: 'Hero Banner',
    description: 'Full-width hero banner with background image, headline, CTA buttons, and multiple layout variants. Used as the primary above-the-fold element on landing pages and product launches.',
    category: 'Layout',
    tags: ['hero', 'banner', 'landing-page', 'above-fold', 'cta', 'image'],
    props: [
      { name: 'overline', type: 'string', required: false, description: 'Overline text above the heading (e.g., "NEW ARRIVAL")' },
      { name: 'heading', type: 'string', required: true, description: 'Main headline text' },
      { name: 'subheading', type: 'string', required: false, description: 'Supporting text below the heading' },
      { name: 'ctaText', type: 'string', required: false, default: 'Shop Now', description: 'Primary CTA button text' },
      { name: 'ctaHref', type: 'string', required: false, description: 'Primary CTA link URL' },
      { name: 'secondaryCtaText', type: 'string', required: false, description: 'Secondary CTA button text' },
      { name: 'secondaryCtaHref', type: 'string', required: false, description: 'Secondary CTA link URL' },
      { name: 'backgroundImage', type: 'string', required: false, description: 'Background image URL (recommended: 1920px wide, high quality)' },
      { name: 'variant', type: 'enum', required: false, default: 'full-bleed', description: 'Layout variant', options: ['full-bleed', 'split', 'centered', 'minimal'] },
      { name: 'theme', type: 'enum', required: false, default: 'dark', description: 'Text overlay theme', options: ['dark', 'light'] },
      { name: 'badge', type: 'string', required: false, description: 'Optional badge text (e.g., "Limited Edition", "Pre-Order")' },
    ],
    variants: [
      { name: 'full-bleed', description: 'Full viewport height, content overlaid on background image. Best for product launches and hero moments.', props: { variant: 'full-bleed', theme: 'dark' } },
      { name: 'split', description: 'Content takes left half, image fills right. Good for balanced layouts with longer copy.', props: { variant: 'split', theme: 'dark' } },
      { name: 'centered', description: 'Content centered horizontally and vertically. Clean and impactful.', props: { variant: 'centered', theme: 'dark' } },
      { name: 'minimal', description: 'Reduced height (400px), lighter presence. Good for secondary pages or announcements.', props: { variant: 'minimal', theme: 'light' } },
    ],
    usageNotes: 'Use as the first element on landing pages. Only one HeroBanner per page. Pair with AnnouncementBar above for promotions. Always provide high-quality background images (minimum 1920x1080). Dark theme works best with photographic backgrounds. Light theme works with illustrations or lighter imagery.',
    edsMarkup: `| Hero Banner |
| --- |
| ![Hero Image](hero-image.jpg) |
| **NEW ARRIVAL** |
| # AirPulse Max |
| Engineered for speed. Designed for the long run. |
| [Shop Now](cta-link) [Learn More](secondary-link) |`,
  },
  {
    name: 'ProductCard',
    displayName: 'Product Card',
    description: 'Product display card with image, name, pricing, star ratings, color swatches, and add-to-cart CTA. Core commerce component used in product grids and category pages.',
    category: 'Commerce',
    tags: ['product', 'card', 'commerce', 'pricing', 'rating', 'shopping'],
    props: [
      { name: 'name', type: 'string', required: true, description: 'Product name' },
      { name: 'price', type: 'number', required: true, description: 'Current price' },
      { name: 'originalPrice', type: 'number', required: false, description: 'Original price (shows strikethrough for sales)' },
      { name: 'image', type: 'string', required: true, description: 'Product image URL' },
      { name: 'rating', type: 'number', required: false, description: 'Star rating (1-5)' },
      { name: 'reviewCount', type: 'number', required: false, description: 'Number of reviews' },
      { name: 'badge', type: 'string', required: false, description: 'Badge text (e.g., "New", "Sale", "Bestseller")' },
      { name: 'colors', type: 'Array<{name, hex}>', required: false, description: 'Available color swatches' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Display variant', options: ['default', 'horizontal', 'featured'] },
      { name: 'ctaText', type: 'string', required: false, default: 'Add to Cart', description: 'CTA button text' },
    ],
    variants: [
      { name: 'default', description: 'Vertical card — image top, details below. Standard grid item.', props: { variant: 'default' } },
      { name: 'horizontal', description: 'Side-by-side layout — image left, details right. Good for list views.', props: { variant: 'horizontal' } },
      { name: 'featured', description: 'Larger card with more prominent styling. Use for featured/hero products.', props: { variant: 'featured' } },
    ],
    usageNotes: 'Use in grids of 2-4 columns. Always include product image and price. Rating and color swatches are optional but recommended for conversion. Featured variant should be used sparingly (1 per section). Use "Sale" badge with originalPrice for promotions.',
    edsMarkup: `| Product Card |
| --- |
| ![AirPulse Max](product-image.jpg) |
| **AirPulse Max** |
| $180 ~~$220~~ |
| ★★★★★ (2,341 reviews) |
| [Add to Cart](add-to-cart-link) |`,
  },
  {
    name: 'FeatureGrid',
    displayName: 'Feature Grid',
    description: 'Grid of feature items with icons, titles, and descriptions. Used to showcase product features, brand values, or technology highlights.',
    category: 'Content',
    tags: ['features', 'grid', 'icons', 'technology', 'benefits', 'values'],
    props: [
      { name: 'heading', type: 'string', required: false, description: 'Section heading' },
      { name: 'subheading', type: 'string', required: false, description: 'Section subheading' },
      { name: 'features', type: 'Array<{icon, title, description}>', required: true, description: 'Array of feature items' },
      { name: 'columns', type: 'enum', required: false, default: '3', description: 'Number of columns', options: ['2', '3', '4'] },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Display variant', options: ['default', 'card', 'icon-left'] },
      { name: 'theme', type: 'enum', required: false, default: 'light', description: 'Color theme', options: ['light', 'dark'] },
    ],
    variants: [
      { name: 'default', description: 'Centered icons above text. Clean and symmetrical.', props: { variant: 'default' } },
      { name: 'card', description: 'Each feature in an elevated card. Good for important features.', props: { variant: 'card' } },
      { name: 'icon-left', description: 'Icon on left, text on right. Compact horizontal layout.', props: { variant: 'icon-left' } },
    ],
    usageNotes: 'Use 3-4 features for best visual balance. Icons should be consistent (all emoji or all SVG). Keep descriptions concise (1-2 sentences). Works well after a HeroBanner to reinforce key selling points.',
    edsMarkup: `| Feature Grid |
| --- |
| ## Built for Performance |
| Performance meets sustainability in every detail. |
| 🪶 **Lightweight** — AeroWeave™ upper at just 8.2 oz |
| ⚡ **Responsive** — ReactFoam Pro midsole returns 65% energy |
| 🌿 **Sustainable** — 98% recycled materials |`,
  },
  {
    name: 'TestimonialSlider',
    displayName: 'Testimonial Slider',
    description: 'Customer testimonials displayed as cards with quotes, author details, avatars, and star ratings. Builds social proof and trust.',
    category: 'Social Proof',
    tags: ['testimonials', 'reviews', 'quotes', 'social-proof', 'trust'],
    props: [
      { name: 'testimonials', type: 'Array<{quote, author, role?, avatar?, rating?}>', required: true, description: 'Array of testimonial items' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Display variant', options: ['default', 'card', 'minimal'] },
      { name: 'theme', type: 'enum', required: false, default: 'light', description: 'Color theme', options: ['light', 'dark'] },
      { name: 'heading', type: 'string', required: false, description: 'Section heading' },
    ],
    variants: [
      { name: 'default', description: 'Cards in horizontal row with quotation mark decoration.', props: { variant: 'default' } },
      { name: 'card', description: 'Elevated cards with shadow. More prominent.', props: { variant: 'card' } },
      { name: 'minimal', description: 'Minimal styling, quote-focused.', props: { variant: 'minimal' } },
    ],
    usageNotes: 'Include 3-4 testimonials for best impact. Always include real (or realistic) names and roles. Star ratings strengthen credibility. Place after product sections or before CTAs.',
    edsMarkup: `| Testimonials |
| --- |
| ## What Runners Say |
| "The AirPulse Max changed my running completely. The energy return is unlike anything I've worn." — **Sarah Chen**, Marathon Runner, ★★★★★ |
| "Best trail shoe I've ever owned. Period." — **Marcus Rivera**, Ultra Runner, ★★★★★ |`,
  },
  {
    name: 'CTABand',
    displayName: 'CTA Band',
    description: 'Full-width call-to-action strip with heading, optional subheading, and primary/secondary CTA buttons. Used to drive conversions between content sections.',
    category: 'Conversion',
    tags: ['cta', 'call-to-action', 'conversion', 'banner', 'promotion'],
    props: [
      { name: 'heading', type: 'string', required: true, description: 'CTA heading text' },
      { name: 'subheading', type: 'string', required: false, description: 'Supporting text' },
      { name: 'ctaText', type: 'string', required: true, description: 'Primary CTA text' },
      { name: 'ctaHref', type: 'string', required: false, description: 'Primary CTA link' },
      { name: 'secondaryCtaText', type: 'string', required: false, description: 'Secondary CTA text' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Layout variant', options: ['default', 'split', 'compact'] },
      { name: 'theme', type: 'enum', required: false, default: 'brand', description: 'Color theme', options: ['brand', 'accent', 'dark', 'light'] },
    ],
    variants: [
      { name: 'default', description: 'Centered content. Bold and attention-grabbing.', props: { variant: 'default', theme: 'brand' } },
      { name: 'split', description: 'Text left, CTAs right. Professional and balanced.', props: { variant: 'split' } },
      { name: 'compact', description: 'Narrower height. Less intrusive between sections.', props: { variant: 'compact' } },
    ],
    usageNotes: 'Place between content sections as conversion break. Use "brand" (navy) theme for primary CTAs, "accent" (coral) for urgent/sale CTAs. Keep heading short and action-oriented.',
    edsMarkup: `| CTA Band |
| --- |
| ## Ready to Run? |
| Join 10 million runners who chose Aerofly. |
| [Shop Now](shop-link) [Find a Store](store-link) |`,
  },
  {
    name: 'SocialProof',
    displayName: 'Social Proof',
    description: 'Row of impressive statistics with large values and descriptive labels. Used to build credibility and trust through numbers.',
    category: 'Social Proof',
    tags: ['stats', 'numbers', 'social-proof', 'trust', 'metrics'],
    props: [
      { name: 'stats', type: 'Array<{value, label, prefix?, suffix?}>', required: true, description: 'Array of stat items' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Display variant', options: ['default', 'card', 'inline'] },
      { name: 'theme', type: 'enum', required: false, default: 'light', description: 'Color theme', options: ['light', 'dark'] },
      { name: 'heading', type: 'string', required: false, description: 'Section heading' },
    ],
    variants: [
      { name: 'default', description: 'Stats in a row with large values. Clean and impactful.', props: { variant: 'default' } },
      { name: 'card', description: 'Each stat in its own card. More prominent.', props: { variant: 'card' } },
      { name: 'inline', description: 'Compact inline layout. Good for tighter spaces.', props: { variant: 'inline' } },
    ],
    usageNotes: 'Use 3-4 stats for best visual balance. Keep values short and punchy. Place near CTAs or testimonials to reinforce trust.',
    edsMarkup: `| Social Proof |
| --- |
| **10M+** Runners Worldwide |
| **50+** Countries |
| **4.9** Average Rating |
| **98%** Recycled Materials |`,
  },
  {
    name: 'NavigationBar',
    displayName: 'Navigation Bar',
    description: 'Horizontal navigation bar with logo, navigation links, search, and cart icon. Fixed to top of page.',
    category: 'Navigation',
    tags: ['nav', 'navigation', 'header', 'menu', 'cart', 'search'],
    props: [
      { name: 'logo', type: 'string', required: false, default: 'AEROFLY', description: 'Logo text' },
      { name: 'links', type: 'Array<{label, href, active?}>', required: true, description: 'Navigation links' },
      { name: 'showSearch', type: 'boolean', required: false, default: 'true', description: 'Show search icon' },
      { name: 'showCart', type: 'boolean', required: false, default: 'true', description: 'Show cart icon' },
      { name: 'cartCount', type: 'number', required: false, description: 'Items in cart (shows badge)' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Style variant', options: ['default', 'transparent', 'minimal'] },
      { name: 'theme', type: 'enum', required: false, default: 'light', description: 'Color theme', options: ['light', 'dark'] },
    ],
    variants: [
      { name: 'default', description: 'Solid background navigation. Standard for most pages.', props: { variant: 'default' } },
      { name: 'transparent', description: 'No background. Overlays hero images. Use with dark theme.', props: { variant: 'transparent', theme: 'dark' } },
      { name: 'minimal', description: 'Logo and essential links only. Clean and minimal.', props: { variant: 'minimal' } },
    ],
    usageNotes: 'Use once at the top of every page. Standard links: Men, Women, Running, Training, Sustainability, Sale. Use transparent variant when overlaying a HeroBanner. Cart count badge appears only when cartCount > 0.',
    edsMarkup: `| Navigation |
| --- |
| **AEROFLY** |
| [Men](men) [Women](women) [Running](running) [Training](training) [Sustainability](sustainability) [Sale](sale) |`,
  },
  {
    name: 'Footer',
    displayName: 'Footer',
    description: 'Multi-column footer with link groups, optional newsletter signup, social media links, and copyright text.',
    category: 'Navigation',
    tags: ['footer', 'navigation', 'links', 'newsletter', 'social'],
    props: [
      { name: 'columns', type: 'Array<{title, links[]}>', required: true, description: 'Link columns' },
      { name: 'showNewsletter', type: 'boolean', required: false, description: 'Show newsletter signup section' },
      { name: 'newsletterHeading', type: 'string', required: false, description: 'Newsletter section heading' },
      { name: 'socialLinks', type: 'Array<{platform, href}>', required: false, description: 'Social media links' },
      { name: 'bottomText', type: 'string', required: false, description: 'Copyright/legal text' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Layout variant', options: ['default', 'minimal', 'centered'] },
      { name: 'theme', type: 'enum', required: false, default: 'dark', description: 'Color theme', options: ['dark', 'light'] },
    ],
    variants: [
      { name: 'default', description: 'Multi-column with all sections. Comprehensive footer.', props: { variant: 'default' } },
      { name: 'minimal', description: 'Simplified with fewer columns. Clean.', props: { variant: 'minimal' } },
      { name: 'centered', description: 'All content centered. Good for simple pages.', props: { variant: 'centered' } },
    ],
    usageNotes: 'Use at the bottom of every page. Standard columns: Shop, Company, Support, Legal. Always include copyright text. Dark theme (navy) is standard for Aerofly brand.',
    edsMarkup: `| Footer |
| --- |
| **Shop**: [Men](men) [Women](women) [Running](running) [Sale](sale) |
| **Company**: [About](about) [Sustainability](sustainability) [Careers](careers) |
| **Support**: [Help Center](help) [Returns](returns) [Size Guide](size-guide) |
| © 2026 Aerofly. All rights reserved. |`,
  },
  {
    name: 'AnnouncementBar',
    displayName: 'Announcement Bar',
    description: 'Thin banner at top of page for promotions, announcements, and alerts. Dismissible with optional link.',
    category: 'Navigation',
    tags: ['announcement', 'banner', 'promotion', 'alert', 'notification'],
    props: [
      { name: 'message', type: 'string', required: true, description: 'Announcement message text' },
      { name: 'linkText', type: 'string', required: false, description: 'Optional CTA link text' },
      { name: 'linkHref', type: 'string', required: false, description: 'CTA link URL' },
      { name: 'dismissible', type: 'boolean', required: false, default: 'false', description: 'Show dismiss (X) button' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Color variant', options: ['default', 'accent', 'warning'] },
      { name: 'icon', type: 'string', required: false, description: 'Optional emoji icon' },
    ],
    variants: [
      { name: 'default', description: 'Brand navy background. Standard announcements.', props: { variant: 'default' } },
      { name: 'accent', description: 'Coral background. Urgent or exciting announcements.', props: { variant: 'accent' } },
      { name: 'warning', description: 'Amber background. Warnings or time-sensitive info.', props: { variant: 'warning' } },
    ],
    usageNotes: 'Place above NavigationBar. Only one AnnouncementBar per page. Keep message short (one line). Use accent variant for sales and exciting launches.',
    edsMarkup: `| Announcement Bar |
| --- |
| 🔥 AirPulse Max — Now Available [Shop Now](shop-link) |`,
  },
  {
    name: 'ProductGallery',
    displayName: 'Product Gallery',
    description: 'Image gallery for product photography with grid, featured, and masonry layouts. Images have hover zoom effect.',
    category: 'Commerce',
    tags: ['gallery', 'images', 'product', 'photos', 'grid'],
    props: [
      { name: 'images', type: 'Array<{src, alt}>', required: true, description: 'Array of images' },
      { name: 'variant', type: 'enum', required: false, default: 'grid', description: 'Layout variant', options: ['grid', 'featured', 'masonry'] },
      { name: 'columns', type: 'enum', required: false, default: '3', description: 'Grid columns', options: ['2', '3', '4'] },
      { name: 'gap', type: 'enum', required: false, default: 'md', description: 'Gap between images', options: ['sm', 'md', 'lg'] },
    ],
    variants: [
      { name: 'grid', description: 'Uniform grid. All images same size.', props: { variant: 'grid' } },
      { name: 'featured', description: 'First image spans 2x2. Hero image with supporting shots.', props: { variant: 'featured' } },
      { name: 'masonry', description: 'Pinterest-style varied heights. Dynamic and editorial.', props: { variant: 'masonry' } },
    ],
    usageNotes: 'Use 4-8 images for best layout. Featured variant works best with 5+ images. Provide high-quality product photography. Alt text is required for accessibility.',
    edsMarkup: `| Product Gallery |
| --- |
| ![Front view](product-front.jpg) |
| ![Side view](product-side.jpg) |
| ![Back view](product-back.jpg) |
| ![Detail view](product-detail.jpg) |`,
  },
  {
    name: 'SpecsTable',
    displayName: 'Specs Table',
    description: 'Product specification table with alternating row colors and optional highlighted rows. Used on product detail pages.',
    category: 'Commerce',
    tags: ['specs', 'specifications', 'table', 'product', 'details', 'technical'],
    props: [
      { name: 'heading', type: 'string', required: false, description: 'Table heading' },
      { name: 'specs', type: 'Array<{label, value, highlight?}>', required: true, description: 'Specification rows' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Display variant', options: ['default', 'card', 'compact'] },
      { name: 'theme', type: 'enum', required: false, default: 'light', description: 'Color theme', options: ['light', 'dark'] },
    ],
    variants: [
      { name: 'default', description: 'Standard table with alternating rows.', props: { variant: 'default' } },
      { name: 'card', description: 'Table wrapped in elevated card.', props: { variant: 'card' } },
      { name: 'compact', description: 'Tighter spacing. Good for sidebars.', props: { variant: 'compact' } },
    ],
    usageNotes: 'Place on product detail pages below product images and description. Use highlight flag for key differentiating specs (e.g., Carbon Plate: Yes). Standard Aerofly specs: Weight, Drop, Upper, Midsole, Outsole, Stack Height.',
    edsMarkup: `| Specs |
| --- |
| Weight | 8.2 oz |
| Drop | 8mm |
| Upper | AeroWeave™ Mesh |
| Midsole | ReactFoam Pro |
| Outsole | Continental™ Rubber |
| Carbon Plate | Yes |`,
  },
  {
    name: 'CategoryBrowser',
    displayName: 'Category Browser',
    description: 'Category tiles with images, name overlay, and product counts. Used for navigation and discovery on category/collection pages.',
    category: 'Navigation',
    tags: ['categories', 'browse', 'navigation', 'collections', 'discovery'],
    props: [
      { name: 'categories', type: 'Array<{name, image, href, count?}>', required: true, description: 'Category items' },
      { name: 'heading', type: 'string', required: false, description: 'Section heading' },
      { name: 'subheading', type: 'string', required: false, description: 'Section subheading' },
      { name: 'variant', type: 'enum', required: false, default: 'grid', description: 'Layout variant', options: ['grid', 'scroll', 'featured'] },
      { name: 'columns', type: 'enum', required: false, default: '3', description: 'Grid columns', options: ['2', '3', '4'] },
    ],
    variants: [
      { name: 'grid', description: 'Standard grid layout. Equal-sized tiles.', props: { variant: 'grid' } },
      { name: 'scroll', description: 'Horizontal scrollable row. Good for many categories.', props: { variant: 'scroll' } },
      { name: 'featured', description: 'First category larger. Highlights primary category.', props: { variant: 'featured' } },
    ],
    usageNotes: 'Standard Aerofly categories: Running, Training, Trail, Lifestyle, Sale, New Arrivals. Use high-quality lifestyle photography for each category tile. Include product counts when available.',
    edsMarkup: `| Categories |
| --- |
| ## Shop by Category |
| ![Running](running-category.jpg) [Running](running) (124 products) |
| ![Training](training-category.jpg) [Training](training) (89 products) |
| ![Trail](trail-category.jpg) [Trail](trail) (56 products) |`,
  },
  {
    name: 'NewsletterSignup',
    displayName: 'Newsletter Signup',
    description: 'Email capture form with heading, input, and subscribe button. Multiple variants for different page contexts.',
    category: 'Conversion',
    tags: ['newsletter', 'email', 'signup', 'subscribe', 'capture', 'conversion'],
    props: [
      { name: 'heading', type: 'string', required: false, default: 'Stay in the Loop', description: 'Form heading' },
      { name: 'subheading', type: 'string', required: false, description: 'Supporting text' },
      { name: 'placeholder', type: 'string', required: false, default: 'Enter your email', description: 'Input placeholder' },
      { name: 'buttonText', type: 'string', required: false, default: 'Subscribe', description: 'Submit button text' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Layout variant', options: ['default', 'inline', 'card'] },
      { name: 'theme', type: 'enum', required: false, default: 'light', description: 'Color theme', options: ['light', 'dark', 'brand'] },
      { name: 'disclaimer', type: 'string', required: false, description: 'Privacy/terms disclaimer text' },
    ],
    variants: [
      { name: 'default', description: 'Stacked layout. Heading, text, input, button.', props: { variant: 'default' } },
      { name: 'inline', description: 'Input and button on same line. Compact.', props: { variant: 'inline' } },
      { name: 'card', description: 'Wrapped in elevated card. Prominent.', props: { variant: 'card' } },
    ],
    usageNotes: 'Place near footer or between content sections. Use "brand" theme (warm sand) for Aerofly-branded feel. Always include privacy disclaimer for compliance.',
    edsMarkup: `| Newsletter |
| --- |
| ## Stay in the Loop |
| Get early access to drops, athlete stories, and sustainability updates. |
| [Subscribe](newsletter-signup) |`,
  },
  {
    name: 'ComparisonTable',
    displayName: 'Comparison Table',
    description: 'Product comparison table with columns for products and rows for features. Supports boolean and text values with optional highlight column.',
    category: 'Commerce',
    tags: ['comparison', 'table', 'products', 'features', 'compare', 'decision'],
    props: [
      { name: 'heading', type: 'string', required: false, description: 'Table heading' },
      { name: 'products', type: 'Array<{name, image?, price, specs}>', required: true, description: 'Products to compare' },
      { name: 'features', type: 'string[]', required: true, description: 'Feature row labels' },
      { name: 'highlightIndex', type: 'number', required: false, description: 'Column index to highlight (recommended)' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Display variant', options: ['default', 'compact'] },
    ],
    variants: [
      { name: 'default', description: 'Full-width table with product images and details.', props: { variant: 'default' } },
      { name: 'compact', description: 'Tighter spacing without images. Data-focused.', props: { variant: 'compact' } },
    ],
    usageNotes: 'Compare 2-4 products. Use highlightIndex to recommend a product. Boolean features show ✓/✗. Standard Aerofly comparisons: AirPulse Max ($180), CloudStride ($145), TrailForge Pro ($210).',
    edsMarkup: `| Comparison |
| --- |
| | AirPulse Max | CloudStride | TrailForge Pro |
| Price | $180 | $145 | $210 |
| Weight | 8.2 oz | 9.1 oz | 10.4 oz |
| Carbon Plate | ✓ | ✗ | ✓ |
| Waterproof | ✗ | ✗ | ✓ |`,
  },
  {
    name: 'SizeSelector',
    displayName: 'Size Selector',
    description: 'Grid of selectable size buttons with availability indicators. Core commerce component for product detail pages.',
    category: 'Commerce',
    tags: ['size', 'selector', 'picker', 'commerce', 'product', 'sizing'],
    props: [
      { name: 'sizes', type: 'Array<{value, available}>', required: true, description: 'Available sizes' },
      { name: 'selectedSize', type: 'string', required: false, description: 'Currently selected size' },
      { name: 'onSelect', type: 'function', required: false, description: 'Selection callback' },
      { name: 'unit', type: 'enum', required: false, default: 'US', description: 'Size unit system', options: ['US', 'EU', 'UK'] },
      { name: 'heading', type: 'string', required: false, description: 'Section heading' },
      { name: 'showGuide', type: 'boolean', required: false, default: 'true', description: 'Show "Size Guide" link' },
      { name: 'variant', type: 'enum', required: false, default: 'default', description: 'Display variant', options: ['default', 'compact', 'minimal'] },
    ],
    variants: [
      { name: 'default', description: 'Full grid with labeled heading and size guide link.', props: { variant: 'default' } },
      { name: 'compact', description: 'Smaller buttons. Good for tight layouts.', props: { variant: 'compact' } },
      { name: 'minimal', description: 'No heading or guide. Just the size buttons.', props: { variant: 'minimal' } },
    ],
    usageNotes: 'Place on product detail pages before the Add to Cart button. Show available and unavailable sizes (unavailable are grayed out). US sizes typically range 6-14. Always include a size guide link.',
    edsMarkup: `| Size Selector |
| --- |
| **Select Size** (US) |
| 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |`,
  },
];

// ─── Server Setup ───

const server = new McpServer({
  name: 'aerofly-storybook',
  version: '1.0.0',
  description: 'Aerofly component library — provides Claude with knowledge of available UI components, their props, variants, and AEM EDS markup patterns.',
});

// ─── Tool: list_components ───

server.tool(
  'list_components',
  'List all available Aerofly components with their names, categories, and descriptions. Use this to understand what components are available before building a page.',
  {
    category: z.string().optional().describe('Filter by category: Layout, Commerce, Content, Social Proof, Conversion, Navigation'),
    tag: z.string().optional().describe('Filter by tag (e.g., "hero", "commerce", "cta", "navigation")'),
  },
  async ({ category, tag }) => {
    let filtered = COMPONENTS;

    if (category) {
      filtered = filtered.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    if (tag) {
      filtered = filtered.filter(c => c.tags.some(t => t.includes(tag.toLowerCase())));
    }

    const list = filtered.map(c => ({
      name: c.name,
      displayName: c.displayName,
      category: c.category,
      description: c.description,
      tags: c.tags,
      variantCount: c.variants.length,
      propCount: c.props.length,
    }));

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          totalComponents: list.length,
          components: list,
          categories: [...new Set(COMPONENTS.map(c => c.category))],
        }, null, 2),
      }],
    };
  },
);

// ─── Tool: get_component ───

server.tool(
  'get_component',
  'Get detailed information about a specific component including all props, variants, usage notes, and the AEM EDS markup pattern. Use this when you need to use a specific component on a page.',
  {
    name: z.string().describe('Component name (e.g., "HeroBanner", "ProductCard")'),
  },
  async ({ name }) => {
    const component = COMPONENTS.find(
      c => c.name.toLowerCase() === name.toLowerCase() || c.displayName.toLowerCase() === name.toLowerCase()
    );

    if (!component) {
      return {
        content: [{
          type: 'text' as const,
          text: `Component "${name}" not found. Available components: ${COMPONENTS.map(c => c.name).join(', ')}`,
        }],
        isError: true,
      };
    }

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify(component, null, 2),
      }],
    };
  },
);

// ─── Tool: get_component_markup ───

server.tool(
  'get_component_markup',
  'Get the AEM EDS markup pattern for a component. Returns the markdown/table structure needed to render this component in AEM Edge Delivery Services. Use this when generating page content.',
  {
    name: z.string().describe('Component name'),
    variant: z.string().optional().describe('Specific variant to get markup for'),
  },
  async ({ name, variant }) => {
    const component = COMPONENTS.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );

    if (!component) {
      return {
        content: [{
          type: 'text' as const,
          text: `Component "${name}" not found.`,
        }],
        isError: true,
      };
    }

    let result = `# ${component.displayName} — EDS Markup\n\n`;
    result += `## Base Pattern\n\n${component.edsMarkup}\n\n`;
    result += `## Props Reference\n\n`;

    for (const prop of component.props) {
      const req = prop.required ? '(required)' : '(optional)';
      const def = prop.default ? ` [default: ${prop.default}]` : '';
      result += `- **${prop.name}** ${req}: ${prop.type}${def} — ${prop.description}\n`;
      if (prop.options) {
        result += `  Options: ${prop.options.join(', ')}\n`;
      }
    }

    if (variant) {
      const v = component.variants.find(v => v.name.toLowerCase() === variant.toLowerCase());
      if (v) {
        result += `\n## Variant: ${v.name}\n\n${v.description}\n\nDefault props: ${JSON.stringify(v.props)}\n`;
      }
    }

    result += `\n## Usage Notes\n\n${component.usageNotes}\n`;

    return {
      content: [{
        type: 'text' as const,
        text: result,
      }],
    };
  },
);

// ─── Tool: search_components ───

server.tool(
  'search_components',
  'Search components by use case or description. Describe what you want to build and get matching components. Use this when you know what you want to achieve but not which component to use.',
  {
    query: z.string().describe('Natural language description of what you need (e.g., "show product reviews", "email signup form", "compare products side by side")'),
  },
  async ({ query }) => {
    const queryLower = query.toLowerCase();
    const words = queryLower.split(/\s+/);

    const scored = COMPONENTS.map(c => {
      let score = 0;

      // Check tags
      for (const tag of c.tags) {
        for (const word of words) {
          if (tag.includes(word) || word.includes(tag)) score += 3;
        }
      }

      // Check description
      for (const word of words) {
        if (c.description.toLowerCase().includes(word)) score += 2;
      }

      // Check name
      for (const word of words) {
        if (c.name.toLowerCase().includes(word) || c.displayName.toLowerCase().includes(word)) score += 5;
      }

      // Check category
      for (const word of words) {
        if (c.category.toLowerCase().includes(word)) score += 1;
      }

      return { component: c, score };
    });

    const results = scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(s => ({
        name: s.component.name,
        displayName: s.component.displayName,
        description: s.component.description,
        category: s.component.category,
        relevanceScore: s.score,
        variants: s.component.variants.map(v => v.name),
      }));

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          query,
          matchCount: results.length,
          results,
        }, null, 2),
      }],
    };
  },
);

// ─── Tool: get_page_template ───

server.tool(
  'get_page_template',
  'Get a recommended component layout for a specific page type. Returns the recommended components and their order for common page types.',
  {
    pageType: z.enum(['landing-page', 'product-detail', 'category', 'about', 'campaign']).describe('Type of page to build'),
  },
  async ({ pageType }) => {
    const templates: Record<string, { description: string; components: { name: string; notes: string }[] }> = {
      'landing-page': {
        description: 'High-impact page for product launches, seasonal campaigns, or brand storytelling.',
        components: [
          { name: 'AnnouncementBar', notes: 'Optional. Use for active promotions or launches.' },
          { name: 'NavigationBar', notes: 'Use transparent variant to overlay HeroBanner.' },
          { name: 'HeroBanner', notes: 'Full-bleed variant. Strong headline, background image, primary CTA.' },
          { name: 'SocialProof', notes: 'Trust-building stats immediately after hero.' },
          { name: 'FeatureGrid', notes: '3-column. Key product or brand features.' },
          { name: 'ProductGallery', notes: 'Featured variant. Lifestyle and product imagery.' },
          { name: 'TestimonialSlider', notes: 'Customer reviews for social proof.' },
          { name: 'CTABand', notes: 'Mid-page conversion break.' },
          { name: 'CategoryBrowser', notes: 'Guide users to product categories.' },
          { name: 'NewsletterSignup', notes: 'Email capture before footer. Brand theme.' },
          { name: 'Footer', notes: 'Full footer with newsletter and social links.' },
        ],
      },
      'product-detail': {
        description: 'Product detail page for individual products with specs, sizing, and purchase flow.',
        components: [
          { name: 'NavigationBar', notes: 'Default variant with cart enabled.' },
          { name: 'ProductGallery', notes: 'Featured variant with product photos.' },
          { name: 'SizeSelector', notes: 'Size picker with availability.' },
          { name: 'SpecsTable', notes: 'Technical specifications. Card variant.' },
          { name: 'FeatureGrid', notes: 'Product technology features. Icon-left variant.' },
          { name: 'ComparisonTable', notes: 'Compare with similar products.' },
          { name: 'TestimonialSlider', notes: 'Product-specific reviews.' },
          { name: 'CTABand', notes: 'Cross-sell or collection CTA.' },
          { name: 'Footer', notes: 'Standard footer.' },
        ],
      },
      'category': {
        description: 'Category/collection page for browsing products with filtering.',
        components: [
          { name: 'NavigationBar', notes: 'Default variant.' },
          { name: 'HeroBanner', notes: 'Minimal variant with category title and description.' },
          { name: 'CategoryBrowser', notes: 'Sub-categories if applicable.' },
          { name: 'ProductCard', notes: 'Multiple cards in a grid (3-4 columns).' },
          { name: 'CTABand', notes: 'Mid-page promotion break.' },
          { name: 'NewsletterSignup', notes: 'Inline variant at bottom.' },
          { name: 'Footer', notes: 'Standard footer.' },
        ],
      },
      'about': {
        description: 'Brand story page — mission, values, sustainability.',
        components: [
          { name: 'NavigationBar', notes: 'Default variant.' },
          { name: 'HeroBanner', notes: 'Centered variant. Brand mission headline.' },
          { name: 'FeatureGrid', notes: 'Brand values (performance, sustainability, innovation).' },
          { name: 'SocialProof', notes: 'Impact numbers (materials recycled, carbon reduced, etc.).' },
          { name: 'TestimonialSlider', notes: 'Team or athlete quotes.' },
          { name: 'CTABand', notes: 'Join the movement CTA.' },
          { name: 'Footer', notes: 'Full footer with careers link.' },
        ],
      },
      'campaign': {
        description: 'Time-limited campaign page for sales, launches, or seasonal events.',
        components: [
          { name: 'AnnouncementBar', notes: 'Accent variant. Urgency-driven (countdown, limited time).' },
          { name: 'NavigationBar', notes: 'Transparent variant.' },
          { name: 'HeroBanner', notes: 'Full-bleed. Campaign headline with badge.' },
          { name: 'ProductCard', notes: 'Featured products on sale (use badge + originalPrice).' },
          { name: 'SocialProof', notes: 'Campaign stats (e.g., "Already sold: 10,000 pairs").' },
          { name: 'CTABand', notes: 'Accent theme. Strong urgency messaging.' },
          { name: 'ComparisonTable', notes: 'Compare campaign products.' },
          { name: 'NewsletterSignup', notes: 'Early access signup.' },
          { name: 'Footer', notes: 'Minimal variant.' },
        ],
      },
    };

    const template = templates[pageType];

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          pageType,
          ...template,
        }, null, 2),
      }],
    };
  },
);

// ─── Start Server ───

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Aerofly Storybook MCP server running');
}

main().catch(console.error);
