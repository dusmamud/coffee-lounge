<script lang="ts">
	import { ArrowLeft, Clock, MapPin, Phone, Users } from '@lucide/svelte';
	import MapCard from '#lib/components/MapCard.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { locations, site } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const loc = $derived(data.location);
	const others = $derived(locations.filter((l) => l.id !== loc.id));
</script>

<svelte:head>
	<title>{loc.name} — {site.name} | Café in Maple City, CA</title>
	<meta name="description" content="{loc.name}, {loc.address}. {loc.long}" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CafeOrCoffeeShop',
		name: `${site.name} — ${loc.name}`,
		address: {
			'@type': 'PostalAddress',
			streetAddress: loc.address,
			addressLocality: 'Maple City',
			addressRegion: 'CA',
			addressCountry: 'US'
		},
		telephone: loc.phone,
		url: `${site.url}/locations/${loc.id}`,
		priceRange: '$$'
	})}</script>`}
</svelte:head>

<PageHero eyebrow="OUR CAFÉS" title={loc.name} subtitle={loc.long} />

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<a href="/locations" class="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-coffee hover:text-gold-dark">
		<ArrowLeft size={16} aria-hidden="true" /> All Locations
	</a>
	<div class="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
		<div class="overflow-hidden rounded-3xl ring-1 ring-line">
			<MapCard embed={loc.mapEmbed} name={loc.name} address={loc.address} hours={loc.hours} />
		</div>
		<div class="space-y-6">
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="font-display text-xl font-semibold text-ink">Visit us</h2>
				<p class="mt-3 flex items-start gap-2 text-[0.95rem] leading-relaxed text-muted">
					<MapPin size={16} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" /> {loc.address}
				</p>
				<p class="mt-2 flex items-start gap-2 text-[0.95rem] text-muted">
					<Clock size={16} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" /> {loc.hours}
				</p>
				<p class="mt-2 flex items-center gap-2 text-[0.95rem] text-muted">
					<Phone size={16} class="shrink-0 text-gold-dark" aria-hidden="true" />
					<a href="tel:{loc.phone.replace(/[^+\d]/g, '')}" class="font-semibold text-coffee hover:text-gold-dark">{loc.phone}</a>
				</p>
				<p class="mt-3 flex items-start gap-2 text-[0.95rem] text-muted">
					<Users size={16} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" /> {loc.seating}
				</p>
				<ul class="mt-4 flex flex-wrap gap-2">
					{#each loc.features as f}
						<li class="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-coffee">{f}</li>
					{/each}
				</ul>
				<div class="mt-5 flex flex-col gap-2">
					<a href="/order?location={loc.id}" class="inline-flex min-h-12 items-center justify-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">Order from This Café</a>
					<a href="/reservations?location={loc.id}" class="inline-flex min-h-12 items-center justify-center rounded-full border border-coffee px-6 text-sm font-semibold text-coffee hover:bg-sand">Book a Table Here</a>
					<a href="https://maps.google.com/?q={encodeURIComponent(loc.address)}" target="_blank" rel="noopener" class="inline-flex min-h-12 items-center justify-center rounded-full border border-coffee px-6 text-sm font-semibold text-coffee hover:bg-sand">Get Directions →</a>
				</div>
			</div>
			<div class="rounded-3xl bg-sand p-6">
				<h2 class="font-display text-lg font-semibold text-ink">Good to know</h2>
				<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">
					Free Wi-Fi, step-free entry and an accessible washroom. Service animals welcome. See
					the <a href="/accessibility" class="font-semibold text-coffee underline underline-offset-2">Accessibility page</a> for full details.
				</p>
			</div>
		</div>
	</div>

	<h2 class="mt-14 font-display text-2xl font-medium text-ink">Our other cafés</h2>
	<div class="mt-5 grid gap-6 md:grid-cols-2">
		{#each others as o}
			<a href="/locations/{o.id}" class="block rounded-3xl bg-white p-6 ring-1 ring-line transition-shadow duration-200 hover:shadow-lg">
				<span class="block font-display text-xl font-semibold text-ink">{o.name}</span>
				<span class="mt-1 block text-[0.95rem] text-muted">{o.address}</span>
				<span class="mt-2 block text-sm font-semibold text-coffee">{o.hours}</span>
			</a>
		{/each}
	</div>
</section>
