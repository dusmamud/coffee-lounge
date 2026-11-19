<script lang="ts">
	import { CalendarDays, Clock, MapPin, Ticket } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { events, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Events — {site.name} | Workshops, Tastings & Live Music</title>
	<meta
		name="description"
		content="Coffee Lounge events: latte art workshops, coffee tasting flights, live acoustic Fridays and our monthly book club morning."
	/>
	<link rel="canonical" href="{site.url}/events" />
</svelte:head>

<PageHero
	eyebrow="EVENTS"
	title="Things Happening at the Lounge"
	subtitle="Workshops, tastings, live music and book club mornings — most events are free, and all of them are better with coffee in hand."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-2">
		{#each events as ev}
			<article class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<p class="flex flex-wrap gap-2 text-xs font-bold tracking-wider text-gold-dark">
					<span class="inline-flex items-center gap-1.5"><CalendarDays size={14} aria-hidden="true" /> {ev.date}</span>
					<span class="inline-flex items-center gap-1.5"><Clock size={14} aria-hidden="true" /> {ev.time}</span>
				</p>
				<h2 class="mt-3 font-display text-2xl font-medium text-ink">{ev.title}</h2>
				<p class="mt-2 flex-1 leading-relaxed text-muted">{ev.description}</p>
				<p class="mt-4 flex items-center gap-2 text-[0.95rem] text-muted">
					<MapPin size={16} class="shrink-0 text-gold-dark" aria-hidden="true" /> {ev.location}
				</p>
				<div class="mt-5 flex flex-wrap items-center justify-between gap-3">
					<p class="inline-flex items-center gap-1.5 text-sm font-semibold text-coffee">
						<Ticket size={16} aria-hidden="true" /> {ev.price}
					</p>
					<a
						href="/contact"
						class="inline-flex min-h-12 items-center rounded-full bg-coffee px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark"
					>
						Reserve a Spot
					</a>
				</div>
			</article>
		{/each}
	</div>
	<p class="mt-8 rounded-3xl bg-sand p-6 text-center leading-relaxed text-muted">
		Want to host your own event at the Lounge? We take private bookings on Sunday evenings —
		write to us at <a href="mailto:{site.email}" class="font-semibold text-coffee underline underline-offset-2">{site.email}</a>.
	</p>
</section>
