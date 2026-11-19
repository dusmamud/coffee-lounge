<script lang="ts">
	import { Clock, MapPin, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { locations, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Locations — {site.name} | 3 Cafés in Maple City, CA</title>
	<meta
		name="description"
		content="Find a Coffee Lounge near you: Brew Street flagship, Maple Square and the Riverside Roastery. Hours, phone numbers and maps for all three cafés."
	/>
	<link rel="canonical" href="{site.url}/locations" />
</svelte:head>

<PageHero
	eyebrow="OUR CAFÉS"
	title="Find a Café Near You"
	subtitle="Three cafés across Maple City — same beans, same welcome, different corners of the neighbourhood."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-3">
		{#each locations as loc}
			<article class="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line">
				<iframe
					title="Map of {loc.name}"
					src={loc.mapEmbed}
					loading="lazy"
					class="aspect-[16/10] w-full border-0"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
				<div class="flex flex-1 flex-col p-6">
					<h2 class="font-display text-xl font-semibold text-ink">
						<a href="/locations/{loc.id}" class="hover:text-gold-dark">{loc.name}</a>
					</h2>
					<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">{loc.long}</p>
					<p class="mt-3 flex items-start gap-2 text-[0.95rem] leading-relaxed text-muted">
						<MapPin size={16} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" /> {loc.address}
					</p>
					<p class="mt-2 flex items-start gap-2 text-[0.95rem] text-muted">
						<Clock size={16} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" /> {loc.hours}
					</p>
					<p class="mt-2 flex items-center gap-2 text-[0.95rem] text-muted">
						<Phone size={16} class="shrink-0 text-gold-dark" aria-hidden="true" />
						<a href="tel:{loc.phone.replace(/[^+\d]/g, '')}" class="hover:text-gold-dark">{loc.phone}</a>
					</p>
					<ul class="mt-4 flex flex-wrap gap-2">
						{#each loc.features as f}
							<li class="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-coffee">{f}</li>
						{/each}
					</ul>
					<div class="mt-5 flex flex-col gap-2">
						<a
							href="/locations/{loc.id}"
							class="inline-flex min-h-12 items-center justify-center rounded-full bg-coffee px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark"
						>
							View Details & Hours
						</a>
						<a
							href="/order"
							class="inline-flex min-h-12 items-center justify-center rounded-full border border-coffee px-6 text-sm font-semibold text-coffee transition-colors duration-200 hover:bg-sand"
						>
							Order from this café
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
