import { blogPosts, events, locations, menuItems, shopProducts, site } from '#lib/data/site.ts';

export const prerender = true;

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/menu', priority: '0.9', changefreq: 'weekly' },
	{ path: '/order', priority: '0.9', changefreq: 'weekly' },
	{ path: '/shop', priority: '0.8', changefreq: 'weekly' },
	{ path: '/track-order', priority: '0.7', changefreq: 'weekly' },
	{ path: '/search', priority: '0.6', changefreq: 'monthly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/locations', priority: '0.8', changefreq: 'monthly' },
	{ path: '/events', priority: '0.7', changefreq: 'weekly' },
	{ path: '/blog', priority: '0.8', changefreq: 'weekly' },
	{ path: '/brew-guides', priority: '0.7', changefreq: 'monthly' },
	{ path: '/reviews', priority: '0.7', changefreq: 'weekly' },
	{ path: '/gallery', priority: '0.6', changefreq: 'monthly' },
	{ path: '/gift-cards', priority: '0.7', changefreq: 'monthly' },
	{ path: '/loyalty', priority: '0.7', changefreq: 'monthly' },
	{ path: '/catering', priority: '0.7', changefreq: 'monthly' },
	{ path: '/careers', priority: '0.6', changefreq: 'monthly' },
	{ path: '/wholesale', priority: '0.6', changefreq: 'monthly' },
	{ path: '/nutrition', priority: '0.6', changefreq: 'monthly' },
	{ path: '/first-visit', priority: '0.6', changefreq: 'monthly' },
	{ path: '/accessibility', priority: '0.6', changefreq: 'yearly' },
	{ path: '/contact', priority: '0.8', changefreq: 'monthly' },
	{ path: '/reservations', priority: '0.8', changefreq: 'weekly' },
	{ path: '/account', priority: '0.7', changefreq: 'weekly' },
	{ path: '/delivery', priority: '0.7', changefreq: 'monthly' },
	{ path: '/classes', priority: '0.7', changefreq: 'weekly' },
	{ path: '/private-hire', priority: '0.6', changefreq: 'monthly' },
	{ path: '/seasonal', priority: '0.7', changefreq: 'weekly' },
	{ path: '/team', priority: '0.6', changefreq: 'monthly' },
	{ path: '/sustainability', priority: '0.6', changefreq: 'monthly' },
	{ path: '/press', priority: '0.6', changefreq: 'monthly' },
	{ path: '/corporate-gifting', priority: '0.6', changefreq: 'monthly' },
	{ path: '/community', priority: '0.6', changefreq: 'weekly' },
	{ path: '/sitemap', priority: '0.5', changefreq: 'monthly' },
	{ path: '/gift-cards/balance', priority: '0.6', changefreq: 'monthly' },
	{ path: '/faq', priority: '0.7', changefreq: 'monthly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly' }
];

export function GET() {
	const urls = [
		...staticPages.map(
			(p) =>
				`  <url><loc>${site.url}${p.path}</loc><lastmod>2026-11-21</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
		),
		...menuItems.map(
			(m) => `  <url><loc>${site.url}/menu/${m.slug}</loc><lastmod>2026-11-21</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
		),
		...blogPosts.map(
			(b) => `  <url><loc>${site.url}/blog/${b.slug}</loc><lastmod>2026-11-21</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
		),
		...locations.map(
			(l) => `  <url><loc>${site.url}/locations/${l.id}</loc><lastmod>2026-11-21</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
		),
		...events.map(
			(e) => `  <url><loc>${site.url}/events/${e.id}</loc><lastmod>2026-11-21</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
		),
		...shopProducts.map(
			(s) => `  <url><loc>${site.url}/shop/${s.id}</loc><lastmod>2026-11-21</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
		)
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
