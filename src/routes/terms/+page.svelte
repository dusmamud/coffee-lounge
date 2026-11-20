<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Terms of Service — {site.name}</title>
	<meta name="description" content="Terms of Service for The Coffee Lounge website (mock). The rules for using this demo site and ordering." />
</svelte:head>

<PageHero eyebrow="LEGAL" title="Terms of Service" subtitle="Last updated: November 2026. These are mock terms for a demo website." />

<section class="mx-auto max-w-3xl space-y-5 px-4 pb-16 text-[1.02rem] leading-relaxed text-ink/85 sm:px-6">
	<p>
		Welcome to The Coffee Lounge website. By using this site you agree to these terms. This is a demonstration
		website: all content, prices, menus and events are mock data for design approval, and no real orders,
		payments or bookings are processed.
	</p>
	<h2 class="pt-3 font-display text-xl font-semibold text-ink">Orders and payments</h2>
	<p>
		The checkout, gift-card and loyalty flows on this site are demonstrations. No payment is taken, no order is
		placed, and no goods are delivered as a result of using them. In the live site, orders will be confirmed by
		email, prices are shown before tax — 8.5% tax is added at checkout — and delivery will be available within 5 miles of each café.
	</p>
	<h2 class="pt-3 font-display text-xl font-semibold text-ink">Gift cards and loyalty</h2>
	<p>
		Gift cards shown here are illustrative: they have no monetary value and cannot be redeemed. In the live
		program, gift cards will not expire and Coffee Loop points will be earned at 1 point per $1 spent.
	</p>
	<h2 class="pt-3 font-display text-xl font-semibold text-ink">Content and conduct</h2>
	<p>
		All text, images and branding on this site belong to The Coffee Lounge or its licensors. Please do not copy
		or reuse them without permission, and please do not use the site in any way that harms it or other visitors.
	</p>
	<h2 class="pt-3 font-display text-xl font-semibold text-ink">Changes</h2>
	<p>
		We may update these terms when the live site launches. The version in force will always be the one published
		on this page. Questions? Write to
		<a href="mailto:{site.email}" class="font-semibold break-all text-coffee underline underline-offset-2">{site.email}</a>.
	</p>
</section>
