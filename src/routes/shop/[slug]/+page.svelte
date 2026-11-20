<script lang="ts">
	import { ArrowLeft, Check, MapPin, Mountain, Plus } from '@lucide/svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { money, site } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const p = $derived(data.product);
	let added = $state(false);
	const add = () => {
		cart.addLine({ id: `shop:${p.id}`, name: p.name, price: p.price, image: p.image });
		added = true;
		setTimeout(() => (added = false), 2000);
	};
</script>

<svelte:head>
	<title>{p.name} — {site.name} Shop</title>
	<meta name="description" content="{p.short} {p.origin ? `Origin: ${p.origin}.` : ''} {money(p.price)} — roasted Tuesdays at Riverside Roastery." />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: p.name,
		description: p.short,
		image: site.url + '/images/' + p.image + '-1200.jpg',
		offers: { '@type': 'Offer', price: p.price, priceCurrency: 'USD', availability: 'https://schema.org/InStock' }
	})}</script>`}
</svelte:head>

<PageHero eyebrow="THE LOUNGE SHOP" title={p.name} subtitle={p.short} />

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<a href="/shop" class="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-coffee hover:text-gold-dark"><ArrowLeft size={16} aria-hidden="true" /> All Shop Products</a>
	<div class="mt-4 grid gap-8 lg:grid-cols-2">
		<div class="overflow-hidden rounded-3xl ring-1 ring-line">
			<Picture name={p.image} alt={p.imageAlt} width={1200} height={900} sizes="(max-width: 1024px) 90vw, 560px" eager imgClass="aspect-[4/3] h-auto w-full object-cover" pictureClass="block" />
		</div>
		<div>
			{#if p.badge}<p class="text-xs font-bold tracking-wider text-gold-dark">{p.badge.toUpperCase()}</p>{/if}
			<p class="mt-2 font-display text-4xl font-semibold text-coffee">{money(p.price)}</p>
			<p class="mt-1 text-sm text-muted">{p.kind} · 12 oz whole bean unless noted · ground to order at any counter</p>
			<button type="button" onclick={add} class="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-coffee px-7 text-base font-semibold text-white hover:bg-coffee-dark">
				{#if added}<Check size={18} aria-hidden="true" /> Added to Cart{:else}<Plus size={18} aria-hidden="true" /> Add to Cart{/if}
			</button>
			{#if p.origin}
				<div class="mt-8 rounded-3xl bg-white p-6 ring-1 ring-line">
					<h2 class="font-display text-xl font-semibold text-ink">Origin & traceability</h2>
					<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">Every bag traces to the farm it came from — scan the lot code on the bag at the counter and we will tell you the harvest date and the farmer who grew it.</p>
					<dl class="mt-4 space-y-3 text-[0.95rem]">
						<div class="flex gap-3"><dt class="w-28 shrink-0 font-semibold text-ink">Origin</dt><dd class="text-muted">{p.origin}</dd></div>
						<div class="flex gap-3"><dt class="w-28 shrink-0 font-semibold text-ink">Farm / co-op</dt><dd class="text-muted">{p.farm}</dd></div>
						<div class="flex gap-3"><dt class="w-28 shrink-0 font-semibold text-ink">Altitude</dt><dd class="text-muted">{p.altitude}</dd></div>
						<div class="flex gap-3"><dt class="w-28 shrink-0 font-semibold text-ink">Varietal</dt><dd class="text-muted">{p.varietal}</dd></div>
						<div class="flex gap-3"><dt class="w-28 shrink-0 font-semibold text-ink">Process</dt><dd class="text-muted">{p.process}</dd></div>
						<div class="flex gap-3"><dt class="w-28 shrink-0 font-semibold text-ink">Roast</dt><dd class="text-muted">{p.roastLevel}</dd></div>
					</dl>
					{#if p.tastingNotes}
						<h3 class="mt-5 text-sm font-semibold text-ink">Tasting notes</h3>
						<ul class="mt-2 flex flex-wrap gap-2">
							{#each p.tastingNotes as n}<li class="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-coffee">{n}</li>{/each}
						</ul>
					{/if}
					<p class="mt-4 flex items-start gap-2 text-sm text-muted"><Mountain size={15} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" /> Roasted Tuesdays at Riverside Roastery, 2 blocks from Brew Street — the beans never travel far.</p>
				</div>
			{/if}
			<p class="mt-4 flex items-start gap-2 text-sm text-muted"><MapPin size={15} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" /> Free pickup at any café, or free shipping with any subscription. <a href="/sustainability" class="font-semibold text-coffee underline underline-offset-2">How we source →</a></p>
		</div>
	</div>
	<h2 class="mt-14 font-display text-2xl font-medium text-ink">You may also like</h2>
	<div class="mt-5 grid gap-6 sm:grid-cols-3">
		{#each data.related as r}
			<a href="/shop/{r.id}" class="block rounded-3xl bg-white p-6 ring-1 ring-line hover:shadow-md">
				<span class="block font-display text-lg font-semibold text-ink">{r.name}</span>
				<span class="mt-1 block text-sm text-muted">{r.short}</span>
				<span class="mt-3 block font-semibold text-coffee">{money(r.price)}</span>
			</a>
		{/each}
	</div>
</section>
