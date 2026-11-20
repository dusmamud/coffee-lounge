<script lang="ts">
	import { Mail, Newspaper } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { pressItems, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Press — {site.name} | Coverage & Media</title>
	<meta name="description" content="Press coverage of The Coffee Lounge: Maple City Eats, The Daily Grind, Bay Area Coffee Journal and Maple City Magazine. Media enquiries welcome." />
</svelte:head>

<PageHero
	eyebrow="PRESS"
	title="In the Press"
	subtitle="What the papers said about the coffee, the room, and the roast day. For media enquiries, interviews or photos, write to us — we reply fast."
/>

<section class="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-2">
		{#each pressItems as p}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<p class="flex items-center gap-2 text-xs font-bold tracking-wider text-gold-dark"><Newspaper size={14} aria-hidden="true" /> {p.outlet.toUpperCase()} · {p.date.toUpperCase()}</p>
				<h2 class="mt-3 font-display text-2xl font-medium text-ink">{p.title}</h2>
				<p class="mt-2 leading-relaxed text-muted">{p.blurb}</p>
			</article>
		{/each}
	</div>
	<div class="mt-8 rounded-3xl bg-coffee-dark p-6 text-cream sm:p-8">
		<h2 class="flex items-center gap-2 font-display text-2xl font-medium"><Mail size={20} class="text-gold-light" aria-hidden="true" /> Media enquiries</h2>
		<p class="mt-3 leading-relaxed text-cream/80">Interviews with our founder or roastmaster, photos of the cafés and roastery, or a press visit — write to <a href="mailto:{site.email}" class="font-semibold text-gold-light underline underline-offset-2">{site.email}</a> with “Press” in the subject. Our media kit (logos, photos, fact sheet) is available on request.</p>
		<p class="mt-3 text-sm text-cream/60">Facts for editors: founded 2019 · 3 cafés in Maple City · 60+ seats at Brew Street · roastery at Riverside · 6 small farms, cupped weekly.</p>
	</div>
</section>
