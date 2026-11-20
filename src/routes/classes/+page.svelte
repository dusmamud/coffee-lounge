<script lang="ts">
	import { CalendarDays, Check, Clock, MapPin, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { coffeeClasses, money, site } from '#lib/data/site.ts';

	let bookedIds = $state<Record<string, boolean>>({});
	let names = $state<Record<string, string>>({});
	const book = (e: Event, id: string) => {
		e.preventDefault();
		if ((names[id] ?? '').trim()) bookedIds = { ...bookedIds, [id]: true };
	};
</script>

<svelte:head>
	<title>Classes & Workshops — {site.name} | Latte Art, Pour-Over & Home Brewing</title>
	<meta name="description" content="Learn coffee properly: latte art basics, pour-over masterclass, home brewing 101 and espresso at home. Small groups, real baristas, all equipment provided." />
</svelte:head>

<PageHero
	eyebrow="CLASSES & WORKSHOPS"
	title="Learn Coffee, Hands On"
	subtitle="Small groups, real baristas, all equipment provided. Latte art, pour-over, home brewing and espresso — book a seat and leave with a skill (and usually a bag of beans)."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="overflow-hidden rounded-3xl ring-1 ring-line">
		<Picture name="barista" alt="Barista in a brown apron pouring latte art at the espresso machine" width={1600} height={800} sizes="(max-width: 1024px) 90vw, 1152px" imgClass="aspect-[2/1] h-auto w-full object-cover" pictureClass="block" />
	</div>
	<div class="mt-8 grid gap-6 md:grid-cols-2">
		{#each coffeeClasses as c}
			<article class="flex min-w-0 flex-col rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<p class="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold tracking-wider text-gold-dark">
					<span class="inline-flex items-center gap-1"><CalendarDays size={13} aria-hidden="true" /> {c.date.toUpperCase()}</span>
					<span class="inline-flex items-center gap-1"><Clock size={13} aria-hidden="true" /> {c.time}</span>
				</p>
				<h2 class="mt-3 font-display text-2xl font-medium text-ink">{c.title}</h2>
				<p class="mt-1 text-sm font-semibold text-coffee">{c.level} · {money(c.price)} per person</p>
				<p class="mt-2 flex-1 leading-relaxed text-muted">{c.blurb}</p>
				<p class="mt-3 flex items-center gap-2 text-[0.95rem] text-muted"><MapPin size={16} class="shrink-0 text-gold-dark" aria-hidden="true" /> {c.location}</p>
				<p class="mt-1 flex items-center gap-2 text-[0.95rem] text-muted"><Users size={16} class="shrink-0 text-gold-dark" aria-hidden="true" /> {c.capacity - c.booked} of {c.capacity} seats left</p>
				<div class="mt-3 h-2 overflow-hidden rounded-full bg-sand"><div class="h-full rounded-full bg-coffee" style="width: {(c.booked / c.capacity) * 100}%"></div></div>
				<ul class="mt-4 space-y-1.5 text-[0.95rem] text-muted">
					{#each c.includes as inc}<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> {inc}</li>{/each}
				</ul>
				{#if bookedIds[c.id]}
					<p role="status" class="mt-5 rounded-2xl bg-sand p-4 font-semibold text-ink">You are booked in, {(names[c.id] ?? '').split(' ')[0]}! A confirmation is on its way (mock) — see you at {c.location}.</p>
				{:else if c.capacity - c.booked <= 0}
					<p class="mt-5 rounded-2xl bg-sand p-4 font-semibold text-ink">Sold out — join the waitlist at the counter, or pick another date.</p>
				{:else}
					<form onsubmit={(e) => book(e, c.id)} class="mt-5 flex flex-col gap-2 sm:flex-row">
						<label for="class-name-{c.id}" class="sr-only">Your name</label>
						<input id="class-name-{c.id}" type="text" required bind:value={names[c.id]} placeholder="Your name" class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
						<button type="submit" class="inline-flex min-h-12 items-center justify-center rounded-full bg-coffee px-6 text-sm font-semibold whitespace-nowrap text-white hover:bg-coffee-dark">Book · {money(c.price)}</button>
					</form>
				{/if}
			</article>
		{/each}
	</div>
	<p class="mt-8 rounded-3xl bg-sand p-6 text-center leading-relaxed text-muted">Private classes for teams and celebrations — up to 10 guests, 3 hours, your own barista. Ask at any counter or write to <a href="mailto:{site.email}" class="font-semibold text-coffee underline underline-offset-2">{site.email}</a>.</p>
</section>
