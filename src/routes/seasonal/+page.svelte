<script lang="ts">
	import { Snowflake } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { money, seasonalItems, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Seasonal Menu — {site.name} | Winter Limited Drops</title>
	<meta name="description" content="The Coffee Lounge winter seasonal menu: spiced maple latte, peppermint mocha, gingerbread cold brew and cranberry orange scones — limited, until January 31." />
</svelte:head>

<PageHero
	eyebrow="SEASONAL · WINTER 2026"
	title="The Winter Menu Is Here"
	subtitle="Limited drops, made for cold mornings: spiced maple, peppermint mocha, gingerbread cold brew. When they are gone, they are gone — until next winter."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="overflow-hidden rounded-3xl ring-1 ring-line">
		<Picture name="hero-latte" alt="Honey lavender latte with leaf latte art and cookies on a wooden table" width={1600} height={800} sizes="(max-width: 1024px) 90vw, 1152px" imgClass="aspect-[2/1] h-auto w-full object-cover" pictureClass="block" />
	</div>
	<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each seasonalItems as item}
			<article class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line">
				<p class="text-xs font-bold tracking-wider text-gold-dark">{item.tag.toUpperCase()}</p>
				<h2 class="mt-2 font-display text-xl font-semibold text-ink">{item.name}</h2>
				<p class="mt-2 flex-1 leading-relaxed text-muted">{item.blurb}</p>
				<p class="mt-4 font-display text-xl font-semibold text-coffee">{money(item.price)}</p>
			</article>
		{/each}
	</div>
	<div class="mt-8 rounded-3xl bg-sand p-6 text-center sm:p-8">
		<p class="flex items-center justify-center gap-2 font-display text-2xl font-medium text-ink"><Snowflake size={22} class="text-gold-dark" aria-hidden="true" /> One menu, one CTA</p>
		<p class="mx-auto mt-2 max-w-xl leading-relaxed text-muted">Seasonal drinks are made at the counter and in the app — no separate queue, no special ticket. Order ahead and skip the winter line.</p>
		<a href="/order" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-coffee px-7 text-base font-semibold text-white hover:bg-coffee-dark">Order the Seasonal Menu →</a>
		<p class="mt-3 text-sm text-muted">Also at the counter: ask for the seasonal flight — all three winter drinks, tasting size, $9.</p>
	</div>
</section>
