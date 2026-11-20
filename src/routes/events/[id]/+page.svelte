<script lang="ts">
	import { ArrowLeft, CalendarDays, Check, Clock, MapPin, Ticket, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { events, site } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const ev = $derived(data.event);
	const others = $derived(events.filter((e) => e.id !== ev.id).slice(0, 3));

	let name = $state('');
	let email = $state('');
	let guests = $state(2);
	let reserved = $state(false);

	const reserve = (e: Event) => {
		e.preventDefault();
		if (name.trim() && email.includes('@')) reserved = true;
	};
</script>

<svelte:head>
	<title>{ev.title} — {site.name} Events | {ev.date}</title>
	<meta name="description" content="{ev.title} at {ev.location} — {ev.date}, {ev.time}. {ev.description}" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: ev.title,
		description: ev.long,
		startDate: ev.startDate,
		location: { '@type': 'Place', name: ev.location, address: site.address },
		organizer: { '@type': 'Organization', name: site.name, url: site.url },
		offers: { '@type': 'Offer', price: ev.price.replace(/[^0-9.]/g, '') || '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' }
	})}</script>`}
</svelte:head>

<PageHero eyebrow="EVENTS" title={ev.title} subtitle={ev.long} />

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<a href="/events" class="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-coffee hover:text-gold-dark">
		<ArrowLeft size={16} aria-hidden="true" /> All Events
	</a>
	<div class="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
		<div class="space-y-6">
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<ul class="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-muted">
					<li class="flex items-center gap-2"><CalendarDays size={16} class="text-gold-dark" aria-hidden="true" /> {ev.date}</li>
					<li class="flex items-center gap-2"><Clock size={16} class="text-gold-dark" aria-hidden="true" /> {ev.time}</li>
					<li class="flex items-center gap-2"><MapPin size={16} class="text-gold-dark" aria-hidden="true" /> {ev.location}</li>
					<li class="flex items-center gap-2"><Users size={16} class="text-gold-dark" aria-hidden="true" /> {ev.spots}</li>
					<li class="flex items-center gap-2"><Ticket size={16} class="text-gold-dark" aria-hidden="true" /> {ev.price}</li>
				</ul>
				<p class="mt-4 leading-relaxed text-muted"><strong class="text-ink">Hosted by {ev.host}.</strong></p>
				<h2 class="mt-6 font-display text-xl font-semibold text-ink">What is included</h2>
				<ul class="mt-3 space-y-2 text-[0.95rem] text-muted">
					{#each ev.includes as inc}
						<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> {inc}</li>
					{/each}
				</ul>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<h2 class="font-display text-xl font-semibold text-ink">Add to your calendar</h2>
				<p class="mt-1 text-sm text-muted">Download a calendar file (.ics) for {ev.title} — {ev.date}, {ev.time}.</p>
				<button
					type="button"
					onclick={() => {
						const dt = ev.startDate.slice(0, 19).replace(/[-:]/g, '');
						const icsText = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//The Coffee Lounge//EN', 'BEGIN:VEVENT', `UID:${ev.id}@thecoffeelounge.com`, `DTSTART:${dt}`, `SUMMARY:${ev.title} — The Coffee Lounge`, `LOCATION:${ev.location}`, `DESCRIPTION:${ev.description}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
						const blob = new Blob([icsText], { type: 'text/calendar' });
						const url = URL.createObjectURL(blob);
						const a = document.createElement('a');
						a.href = url;
						a.download = `${ev.id}.ics`;
						a.click();
						URL.revokeObjectURL(url);
					}}
					class="mt-4 inline-flex min-h-12 items-center rounded-full border border-coffee px-6 text-sm font-semibold text-coffee hover:bg-sand"
				>
					Download .ics file
				</button>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				{#if ev.walkIn}
					<div class="rounded-2xl bg-sand p-5 text-center">
						<p class="font-display text-xl font-medium text-ink">No booking needed — just walk in</p>
						<p class="mt-1 text-sm text-muted">{ev.spots} · {ev.price}. Come early for the best seats.</p>
					</div>
				{:else if reserved}
					<p role="status" class="text-center font-display text-2xl font-medium text-ink">
						You are in, {name.split(' ')[0]}! {guests} spot{guests === 1 ? '' : 's'} reserved for {ev.title} (mock) — details are on their way to {email}.
					</p>
				{:else}
					<h2 class="font-display text-2xl font-medium text-ink">Reserve your spot</h2>
					<p class="mt-1 text-muted">{ev.spots} · {ev.price} — free cancellation up to 24 hours before.</p>
					<form onsubmit={reserve} class="mt-5 space-y-4">
						<div class="grid gap-4 sm:grid-cols-2">
							<div>
								<label for="ev-name" class="block text-sm font-semibold text-ink">Your name</label>
								<input id="ev-name" type="text" required bind:value={name} placeholder="Alex Morgan" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
							</div>
							<div>
								<label for="ev-email" class="block text-sm font-semibold text-ink">Email</label>
								<input id="ev-email" type="email" required bind:value={email} placeholder="alex@email.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
							</div>
						</div>
						<div>
							<label for="ev-guests" class="block text-sm font-semibold text-ink">Guests</label>
							<select id="ev-guests" bind:value={guests} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base">
								{#each [1, 2, 3, 4].filter((n) => n <= ev.spotsLeft) as n}<option value={n}>{n} {n === 1 ? 'person' : 'people'}</option>{/each}
							</select>
						</div>
						<button type="submit" class="flex min-h-12 w-full items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark">Reserve {guests} Spot{guests === 1 ? '' : 's'}</button>
						<p class="text-center text-xs text-muted">Demo form — nothing is booked or charged.</p>
					</form>
				{/if}
			</div>
		</div>
		<aside class="h-fit rounded-3xl bg-coffee-dark p-6 text-cream sm:p-7">
			<h2 class="font-display text-xl font-medium">Hosting your own event?</h2>
			<p class="mt-2 leading-relaxed text-cream/75">
				Brew Street is available for private hire on Sunday evenings — birthdays, launches, book
				club takeovers. From $28 per person.
			</p>
			<a href="/catering" class="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-cream px-6 text-sm font-semibold text-coffee-dark hover:bg-white">See Catering & Private Hire</a>
		</aside>
	</div>

	<h2 class="mt-14 font-display text-2xl font-medium text-ink">More events</h2>
	<div class="mt-5 grid gap-6 md:grid-cols-3">
		{#each others as o}
			<a href="/events/{o.id}" class="block rounded-3xl bg-white p-6 ring-1 ring-line transition-shadow duration-200 hover:shadow-lg">
				<span class="block text-xs font-bold tracking-wider text-gold-dark">{o.date.toUpperCase()} · {o.time}</span>
				<span class="mt-2 block font-display text-xl font-semibold text-ink">{o.title}</span>
				<span class="mt-1 block text-sm text-muted">{o.location} · {o.price}</span>
			</a>
		{/each}
	</div>
</section>
