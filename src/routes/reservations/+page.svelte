<script lang="ts">
	import { CalendarDays, Check, Clock, MapPin, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { locations, site } from '#lib/data/site.ts';

	let locationId = $state(locations[0].id);
	let party = $state(2);
	let name = $state('');
	let phone = $state('');
	let booked = $state(false);
	let bookingRef = $state('');
	let dayIdx = $state(0);
	let time = $state('');

	let nowMs = $state(0);
	$effect(() => {
		nowMs = Date.now();
		const loc = new URLSearchParams(window.location.search).get('location');
		if (loc && locations.some((l) => l.id === loc)) locationId = loc;
	});

	const days = $derived.by(() => {
		if (!nowMs) return [] as { label: string; key: string }[];
		const out: { label: string; key: string }[] = [];
		for (let i = 0; i < 7; i++) {
			const d = new Date(nowMs);
			d.setDate(d.getDate() + i);
			out.push({
				label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
				key: d.toDateString()
			});
		}
		return out;
	});
	// Capacity-aware mock availability: a deterministic ~1-in-5 slots is full.
	const slotFull = (key: string, t: string, n: number) => {
		let h = 0;
		for (const c of key + t + String(n)) h = (h * 31 + c.charCodeAt(0)) % 89;
		return h % 5 === 0;
	};
	const times = ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];
	const dayKey = $derived(days[dayIdx]?.key ?? '');
	const available = $derived(times.filter((t) => !slotFull(dayKey, t, party)));
	$effect(() => {
		if (available.length > 0 && !available.includes(time)) time = available[0];
	});
	const loc = $derived(locations.find((l) => l.id === locationId) ?? locations[0]);

	const book = (e: Event) => {
		e.preventDefault();
		if (!name.trim() || phone.trim().length < 7 || !time) return;
		bookingRef = `CL-TBL-${Math.floor(1000 + Math.random() * 9000)}`;
		booked = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
</script>

<svelte:head>
	<title>Reserve a Table — {site.name} | Book a Table in Maple City</title>
	<meta name="description" content="Reserve a table at The Coffee Lounge: pick your café, date, party size and time. Free cancellation up to 2 hours before, walk-ins always welcome." />
</svelte:head>

<PageHero
	eyebrow="RESERVATIONS"
	title="Reserve a Table"
	subtitle="Dine-in at any of our three cafés — pick your spot, your day and your time. Free cancellation up to 2 hours before, and walk-ins are always welcome."
/>

<section class="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
	{#if booked}
		<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-12" role="status">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-800"><Check size={30} aria-hidden="true" /></span>
			<h2 class="mt-5 font-display text-3xl font-medium text-ink">Table booked, {name.split(' ')[0]}!</h2>
			<p class="mt-2 text-lg text-muted">Table for {party} · {days[dayIdx]?.label} at {time} · {loc.name}.</p>
			<div class="mx-auto mt-6 max-w-md rounded-2xl bg-sand p-5 text-left">
				<p class="flex justify-between text-[0.95rem]"><span class="text-muted">Booking reference</span><strong class="text-ink">{bookingRef}</strong></p>
				<p class="mt-2 flex justify-between text-[0.95rem]"><span class="text-muted">Where</span><strong class="text-ink">{loc.address}</strong></p>
				<p class="mt-2 flex justify-between text-[0.95rem]"><span class="text-muted">Party</span><strong class="text-ink">{party} {party === 1 ? 'person' : 'people'}</strong></p>
			</div>
			<p class="mt-5 text-sm text-muted">Show your reference at the door, or just give your name. A confirmation text is on its way (mock). Free cancellation up to 2 hours before.</p>
			<div class="mt-7 flex flex-wrap justify-center gap-3">
				<a href="/reservations" class="inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">Make Another Booking</a>
				<a href="/menu" class="inline-flex min-h-12 items-center rounded-full border border-coffee px-6 text-sm font-semibold text-coffee hover:bg-sand">Browse the Menu</a>
			</div>
		</div>
	{:else}
		<form onsubmit={book} class="space-y-6">
			<fieldset class="min-w-0 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<legend class="font-display text-lg font-semibold text-ink">Where & when</legend>
				<label class="mt-4 block text-sm font-semibold text-ink" for="res-location">Café</label>
				<select id="res-location" bind:value={locationId} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base">
					{#each locations as l}<option value={l.id}>{l.name} — {l.address}</option>{/each}
				</select>
				<p class="mt-2 flex items-start gap-1.5 text-xs text-muted"><MapPin size={13} class="mt-0.5 shrink-0" aria-hidden="true" /> {loc.seating} · {loc.hours}</p>
				<fieldset class="mt-5 min-w-0">
					<legend class="text-sm font-semibold text-ink">Date</legend>
					<div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Reservation date">
						{#each days as d, i}
							<button type="button" role="radio" aria-checked={dayIdx === i} onclick={() => (dayIdx = i)} class="min-h-12 rounded-full px-4 text-sm font-semibold transition-colors duration-150 {dayIdx === i ? 'bg-coffee text-white' : 'border border-line bg-cream text-ink hover:border-coffee'}">{d.label}</button>
						{/each}
					</div>
				</fieldset>
				<div class="mt-5">
					<label class="block text-sm font-semibold text-ink" for="res-party">Party size</label>
					<select id="res-party" bind:value={party} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base sm:w-48">
						{#each [1, 2, 3, 4, 5, 6, 7, 8] as n}<option value={n}>{n} {n === 1 ? 'person' : 'people'}</option>{/each}
					</select>
					<p class="mt-1 text-xs text-muted">Parties of 9 or more: write to us — see <a href="/private-hire" class="font-semibold text-coffee underline underline-offset-2">Private Hire</a>.</p>
				</div>
				<fieldset class="mt-5 min-w-0">
					<legend class="text-sm font-semibold text-ink">Time — only tables we can actually seat</legend>
					<div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Reservation time">
						{#each times as t}
							<button type="button" role="radio" aria-checked={time === t} disabled={slotFull(dayKey, t, party)} onclick={() => (time = t)} class="min-h-12 rounded-full px-4 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 {time === t ? 'bg-coffee text-white' : 'border border-line bg-cream text-ink hover:border-coffee'}">{t}{slotFull(dayKey, t, party) ? ' · full' : ''}</button>
						{/each}
					</div>
				</fieldset>
			</fieldset>
			<fieldset class="min-w-0 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<legend class="font-display text-lg font-semibold text-ink">Your details</legend>
				<div class="mt-4 grid gap-4 sm:grid-cols-2">
					<div>
						<label class="block text-sm font-semibold text-ink" for="res-name">Full name</label>
						<input id="res-name" type="text" required bind:value={name} autocomplete="name" placeholder="Alex Morgan" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
					<div>
						<label class="block text-sm font-semibold text-ink" for="res-phone">Phone</label>
						<input id="res-phone" type="tel" required bind:value={phone} autocomplete="tel" placeholder="+1 (415) 555-0100" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
				</div>
				<p class="mt-3 flex items-start gap-1.5 text-xs text-muted"><Clock size={13} class="mt-0.5 shrink-0" aria-hidden="true" /> We hold tables for 15 minutes past the booking time, then release them to walk-ins.</p>
			</fieldset>
			<button type="submit" class="flex min-h-12 w-full items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark">Reserve This Table</button>
			<p class="text-center text-sm text-muted">Demo booking — nothing is charged. Prefer to walk in? Every café keeps tables for walk-ins, every day.</p>
		</form>
	{/if}
	<div class="mt-8 grid gap-6 sm:grid-cols-3">
		{#each locations as l}
			<a href="/reservations?location={l.id}" class="block rounded-3xl bg-white p-5 ring-1 ring-line hover:shadow-md">
				<span class="flex items-center gap-2 font-semibold text-ink"><CalendarDays size={16} class="text-gold-dark" aria-hidden="true" /> {l.name}</span>
				<span class="mt-1 block text-sm text-muted">{l.seating}</span>
				<span class="mt-2 block text-sm font-semibold text-coffee">Book here →</span>
			</a>
		{/each}
	</div>
</section>
