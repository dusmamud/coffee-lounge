<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site, teamMembers } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Our Team — {site.name} | Baristas, Roasters & Bakers</title>
	<meta name="description" content="Meet The Coffee Lounge team: Maya the head barista, Jonas the roastmaster, Sofia the pastry chef and the people who make your mornings." />
</svelte:head>

<PageHero
	eyebrow="OUR TEAM"
	title="The People Behind Your Cup"
	subtitle="Baristas, roasters and bakers — the regulars know them by name, and the coffee tastes better for it. Say hello next time you are in."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each teamMembers as m}
			<article class="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
				<Picture name={m.image} alt="{m.name}, {m.role}" width={800} height={600} sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 380px" imgClass="aspect-[4/3] h-auto w-full object-cover" pictureClass="block" />
				<div class="p-6">
					<h2 class="font-display text-xl font-semibold text-ink">{m.name}</h2>
					<p class="mt-0.5 text-sm font-semibold text-gold-dark">{m.role}</p>
					<p class="mt-3 leading-relaxed text-muted">{m.blurb}</p>
					<p class="mt-3 text-xs font-bold tracking-wider text-muted">{m.years.toUpperCase()}</p>
				</div>
			</article>
		{/each}
	</div>
	<div class="mt-8 rounded-3xl bg-sand p-6 text-center sm:p-8">
		<h2 class="font-display text-2xl font-medium text-ink">Want to join them?</h2>
		<p class="mx-auto mt-2 max-w-xl leading-relaxed text-muted">We are hiring baristas, a pastry chef and an events host. Free coffee, always — and we train you.</p>
		<a href="/careers" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-coffee px-7 text-base font-semibold text-white hover:bg-coffee-dark">See Open Roles →</a>
	</div>
</section>
