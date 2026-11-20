<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { blogPosts, events, locations, menuItems, shopProducts, site } from '#lib/data/site.ts';

	const mainPages = [
		['Home', '/'], ['Menu', '/menu'], ['Order Online', '/order'], ['Shop', '/shop'],
		['Locations', '/locations'], ['Events', '/events'], ['Reservations', '/reservations'],
		['Delivery', '/delivery'], ['My Account', '/account'], ['Coffee Loop Rewards', '/loyalty'],
		['Gift Cards', '/gift-cards'], ['Gift Card Balance', '/gift-cards/balance'],
		['Track Your Order', '/track-order'], ['Search', '/search']
	] as const;
	const discoverPages = [
		['Classes & Workshops', '/classes'], ['Brew Guides', '/brew-guides'], ['Seasonal Menu', '/seasonal'],
		['Private Hire', '/private-hire'], ['Catering & Private Events', '/catering'],
		['Corporate Gifting', '/corporate-gifting'], ['Wholesale', '/wholesale'],
		['Our Team', '/team'], ['Careers', '/careers'], ['Sustainability', '/sustainability'],
		['Press', '/press'], ['Community', '/community'], ['Gallery', '/gallery'],
		['Reviews', '/reviews'], ['Blog', '/blog'], ['About Us', '/about'],
		['First Visit', '/first-visit'], ['Nutrition & Allergens', '/nutrition'],
		['Accessibility', '/accessibility'], ['FAQ', '/faq'], ['Contact', '/contact']
	] as const;
	const legalPages = [['Privacy Policy', '/privacy'], ['Terms of Service', '/terms']] as const;
</script>

<svelte:head>
	<title>Sitemap — {site.name} | Every Page</title>
	<meta name="description" content="Every page on The Coffee Lounge website: menu, order, shop, locations, events, reservations, classes and more. Prefer the machine-readable version? See /sitemap.xml." />
</svelte:head>

<PageHero
	eyebrow="SITEMAP"
	title="Every Page, One List"
	subtitle="The whole site at a glance. Prefer the machine-readable version? See the XML sitemap."
/>

<section class="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-10 md:grid-cols-2">
		<div>
			<h2 class="font-display text-2xl font-medium text-ink">Order & visit</h2>
			<ul class="mt-4 space-y-1">
				{#each mainPages as [label, href]}<li><a href={href} class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">{label}</a></li>{/each}
			</ul>
			<h2 class="mt-8 font-display text-2xl font-medium text-ink">Cafés</h2>
			<ul class="mt-4 space-y-1">
				{#each locations as l}<li><a href="/locations/{l.id}" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">{l.name}</a></li>{/each}
			</ul>
			<h2 class="mt-8 font-display text-2xl font-medium text-ink">Events</h2>
			<ul class="mt-4 space-y-1">
				{#each events as e}<li><a href="/events/{e.id}" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">{e.title}</a></li>{/each}
			</ul>
		</div>
		<div>
			<h2 class="font-display text-2xl font-medium text-ink">Discover</h2>
			<ul class="mt-4 space-y-1">
				{#each discoverPages as [label, href]}<li><a href={href} class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">{label}</a></li>{/each}
			</ul>
			<h2 class="mt-8 font-display text-2xl font-medium text-ink">Menu</h2>
			<ul class="mt-4 space-y-1">
				{#each menuItems as m}<li><a href="/menu/{m.slug}" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">{m.name}</a></li>{/each}
			</ul>
			<h2 class="mt-8 font-display text-2xl font-medium text-ink">Shop</h2>
			<ul class="mt-4 space-y-1">
				{#each shopProducts as s}<li><a href="/shop/{s.id}" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">{s.name}</a></li>{/each}
			</ul>
			<h2 class="mt-8 font-display text-2xl font-medium text-ink">Blog</h2>
			<ul class="mt-4 space-y-1">
				{#each blogPosts as b}<li><a href="/blog/{b.slug}" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">{b.title}</a></li>{/each}
			</ul>
			<h2 class="mt-8 font-display text-2xl font-medium text-ink">Legal</h2>
			<ul class="mt-4 space-y-1">
				{#each legalPages as [label, href]}<li><a href={href} class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">{label}</a></li>{/each}
				<li><a href="/sitemap.xml" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">Sitemap (XML)</a></li>
			</ul>
		</div>
	</div>
</section>
