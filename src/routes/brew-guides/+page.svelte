<script lang="ts">
	import { Clock, Lightbulb, Signal } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { brewGuides, site } from '#lib/data/site.ts';

	let openId = $state(brewGuides[0].id);
</script>

<svelte:head>
	<title>Brew Guides — {site.name} | Pour-Over, Cold Brew, French Press & Espresso</title>
	<meta name="description" content="Brew better coffee at home with our baristas' guides: the perfect pour-over, 18-hour cold brew, French press done right, and better home espresso." />
	<link rel="canonical" href="{site.url}/brew-guides" />
</svelte:head>

<PageHero
	eyebrow="BREW GUIDES"
	title="Brew Like a Barista"
	subtitle="The exact methods we teach at the slow bar — written down so your kitchen coffee tastes like our counter coffee."
/>

<section class="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="space-y-6">
		{#each brewGuides as g}
			<article class="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
				<button
					type="button"
					aria-expanded={openId === g.id}
					aria-controls="guide-{g.id}"
					onclick={() => (openId = openId === g.id ? '' : g.id)}
					class="flex w-full flex-wrap items-center gap-4 p-5 text-left sm:p-6"
				>
					<Picture
						name={g.image}
						alt={g.imageAlt}
						width={480}
						height={480}
						sizes="96px"
						imgClass="h-24 w-24 shrink-0 rounded-2xl object-cover"
						pictureClass="shrink-0"
					/>
					<span class="min-w-0 flex-1">
						<span class="block font-display text-xl font-semibold text-ink sm:text-2xl">{g.title}</span>
						<span class="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
							<span class="inline-flex items-center gap-1"><Clock size={14} aria-hidden="true" /> {g.time}</span>
							<span class="inline-flex items-center gap-1"><Signal size={14} aria-hidden="true" /> {g.difficulty}</span>
							<span>{g.method}</span>
						</span>
					</span>
					<span class="text-2xl text-coffee" aria-hidden="true">{openId === g.id ? '−' : '+'}</span>
				</button>
				{#if openId === g.id}
					<div id="guide-{g.id}" class="border-t border-line px-5 pb-6 pt-5 sm:px-6">
						<p class="leading-relaxed text-muted">{g.intro}</p>
						<ol class="mt-4 space-y-3">
							{#each g.steps as step, i}
								<li class="flex gap-3">
									<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand text-sm font-bold text-coffee" aria-hidden="true">{i + 1}</span>
									<span class="pt-1 text-[0.95rem] leading-relaxed text-ink">{step}</span>
								</li>
							{/each}
						</ol>
						<p class="mt-5 flex items-start gap-2 rounded-2xl bg-sand p-4 text-[0.95rem] leading-relaxed text-ink">
							<Lightbulb size={17} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
							<span><strong>Barista tip:</strong> {g.tip}</span>
						</p>
					</div>
				{/if}
			</article>
		{/each}
	</div>
	<p class="mt-8 rounded-3xl bg-sand p-6 text-center leading-relaxed text-muted">
		Want hands-on help? Our <a href="/events/latte-art-workshop" class="font-semibold text-coffee underline underline-offset-2">Latte Art Workshop</a> and
		<a href="/events/coffee-tasting-flight" class="font-semibold text-coffee underline underline-offset-2">Coffee Tasting Flight</a> run every month at Brew Street and Riverside.
	</p>
</section>
