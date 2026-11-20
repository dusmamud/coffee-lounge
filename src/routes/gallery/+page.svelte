<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { galleryItems, site } from '#lib/data/site.ts';

	let filter = $state<'All' | 'Coffee' | 'Food' | 'Interior' | 'Origin'>('All');
	const shown = $derived(filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter));
</script>

<svelte:head>
	<title>Gallery — {site.name} | Coffee, Food & Our Cafés in Photos</title>
	<meta name="description" content="A look inside The Coffee Lounge: latte art, fresh bakes, the roastery and our three Maple City cafés." />
</svelte:head>

<PageHero
	eyebrow="GALLERY"
	title="A Glimpse Inside the Lounge"
	subtitle="From the Tuesday roast to the morning croissants — the coffee, the food and the rooms, as they actually look."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
		{#each ['All', 'Coffee', 'Food', 'Interior', 'Origin'] as c}
			<button
				type="button"
				aria-pressed={filter === c}
				onclick={() => (filter = c as typeof filter)}
				class="min-h-12 rounded-full px-5 text-sm font-semibold transition-colors duration-150 {filter === c ? 'bg-coffee text-white' : 'border border-line bg-white text-ink hover:border-coffee'}"
			>
				{c}
			</button>
		{/each}
	</div>
	<div class="mt-6 grid gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
		{#each shown as g (g.image + g.caption)}
			<figure class="group overflow-hidden rounded-3xl bg-white ring-1 ring-line">
				<Picture
					name={g.image}
					alt={g.caption}
					width={800}
					height={600}
					sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
					imgClass="aspect-[4/3] h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
					pictureClass="block"
				/>
				<figcaption class="flex items-center justify-between gap-2 px-4 py-3 text-sm">
					<span class="font-semibold text-ink">{g.caption}</span>
					<span class="shrink-0 rounded-full bg-sand px-2.5 py-1 text-xs font-bold text-coffee">{g.category}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
	<p class="mt-6 text-center text-sm text-muted">
		More on Instagram — <a href={site.instagram} target="_blank" rel="noopener" class="font-semibold text-coffee underline underline-offset-2">@thecoffeelounge</a> (mock link).
	</p>
</section>
