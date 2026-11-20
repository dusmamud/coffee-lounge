<script lang="ts">
	import { CalendarDays, Clock, MapPin, Ticket } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { events, pastEvents, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Events — {site.name} | Workshops, Tastings & Live Music</title>
	<meta
		name="description"
		content="Coffee Lounge events: latte art workshops, coffee tasting flights, live acoustic Fridays and our monthly book club morning."
	/>
</svelte:head>

<PageHero
	eyebrow="EVENTS"
	title="Things Happening at the Lounge"
	subtitle="Workshops, tastings, live music and book club mornings — two of our four regular events are free, and all of them are better with coffee in hand."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-2">
		{#each events as ev}
			<article class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<p class="flex flex-wrap gap-2 text-xs font-bold tracking-wider text-gold-dark">
					<span class="inline-flex items-center gap-1.5"><CalendarDays size={14} aria-hidden="true" /> {ev.date}</span>
					<span class="inline-flex items-center gap-1.5"><Clock size={14} aria-hidden="true" /> {ev.time}</span>
				</p>
				<h2 class="mt-3 font-display text-2xl font-medium text-ink">
					<a href="/events/{ev.id}" class="hover:text-gold-dark">{ev.title}</a>
				</h2>
				<p class="mt-2 flex-1 leading-relaxed text-muted">{ev.description}</p>
				<p class="mt-4 flex items-center gap-2 text-[0.95rem] text-muted">
					<MapPin size={16} class="shrink-0 text-gold-dark" aria-hidden="true" /> {ev.location}
				</p>
				<div class="mt-5 flex flex-wrap items-center justify-between gap-3">
					<p class="inline-flex items-center gap-1.5 text-sm font-semibold text-coffee">
						<Ticket size={16} aria-hidden="true" /> {ev.price}
					</p>
					<a
						href="/events/{ev.id}"
						class="inline-flex min-h-12 items-center rounded-full bg-coffee px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark"
					>
						View & Reserve
					</a>
				</div>
			</article>
		{/each}
	</div>
	<h2 class="mt-14 font-display text-2xl font-medium text-ink">Coming up — December 2026</h2>
	<div class="mt-5 overflow-x-auto rounded-3xl bg-white ring-1 ring-line">
		<table class="w-full min-w-[560px] border-collapse text-left text-sm">
			<thead>
				<tr class="border-b border-line text-xs tracking-wider text-muted">
					<th scope="col" class="min-h-12 px-4 py-3">Date</th>
					<th scope="col" class="min-h-12 px-4 py-3">Event</th>
					<th scope="col" class="min-h-12 px-4 py-3">Where</th>
					<th scope="col" class="min-h-12 px-4 py-3">Price</th>
					<th scope="col" class="min-h-12 px-4 py-3">Details</th>
				</tr>
			</thead>
			<tbody>
				{#each events as ev}
					<tr class="border-b border-line/60 last:border-0">
						<td class="px-4 py-4 font-semibold whitespace-nowrap text-ink">{ev.date}</td>
						<td class="px-4 py-4 text-ink">{ev.title}<span class="block text-xs text-muted">{ev.time}</span></td>
						<td class="px-4 py-4 text-muted">{ev.location}</td>
						<td class="px-4 py-4 whitespace-nowrap text-muted">{ev.price}</td>
						<td class="px-4 py-4"><a href="/events/{ev.id}" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">Details →</a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<h2 class="mt-14 font-display text-2xl font-medium text-ink">Past events</h2>
	<div class="mt-5 grid gap-6 md:grid-cols-3">
		{#each pastEvents as pe}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<p class="text-xs font-bold tracking-wider text-gold-dark">{pe.date.toUpperCase()}</p>
				<h3 class="mt-2 font-display text-xl font-semibold text-ink">{pe.title}</h3>
				<p class="mt-1 text-sm text-muted">{pe.location}</p>
				<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">{pe.blurb}</p>
			</article>
		{/each}
	</div>
	<p class="mt-8 rounded-3xl bg-sand p-6 text-center leading-relaxed text-muted">
		Want to host your own event at the Lounge? We take private bookings on Sunday evenings —
		write to us at <a href="mailto:{site.email}" class="font-semibold text-coffee underline underline-offset-2">{site.email}</a>.
	</p>
</section>
