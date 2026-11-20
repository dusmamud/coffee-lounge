<script lang="ts">
	import { Check, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { privateHireOptions, site } from '#lib/data/site.ts';

	let name = $state('');
	let email = $state('');
	let guests = $state(40);
	let sent = $state(false);
	const enquire = (e: Event) => {
		e.preventDefault();
		if (name.trim() && email.includes('@')) sent = true;
	};
</script>

<svelte:head>
	<title>Private Hire — {site.name} | Rent a Café for Your Event</title>
	<meta name="description" content="Hire The Coffee Lounge for your event: hourly rental, minimum-spend evenings or a full buyout. Birthdays, launches, weddings and wrap parties." />
</svelte:head>

<PageHero
	eyebrow="PRIVATE HIRE"
	title="The Whole Café, All Yours"
	subtitle="Birthdays, launches, weddings, wrap parties — Brew Street after hours is yours. Hourly rental, minimum-spend evenings, or a full buyout."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="overflow-hidden rounded-3xl ring-1 ring-line">
		<Picture name="catering-table" alt="A brunch table set for a private event at The Coffee Lounge" width={1600} height={800} sizes="(max-width: 1024px) 90vw, 1152px" imgClass="aspect-[2/1] h-auto w-full object-cover" pictureClass="block" />
	</div>
	<div class="mt-8 grid gap-6 lg:grid-cols-3">
		{#each privateHireOptions as o}
			<article class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<h2 class="font-display text-2xl font-medium text-ink">{o.name}</h2>
				<p class="mt-1 font-display text-xl font-semibold text-coffee">{o.price}</p>
				<p class="mt-2 flex-1 leading-relaxed text-muted">{o.blurb}</p>
				<ul class="mt-4 space-y-2 text-[0.95rem] text-muted">
					{#each o.includes as inc}<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> {inc}</li>{/each}
				</ul>
			</article>
		{/each}
	</div>
	<div class="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
		{#if sent}
			<p role="status" class="py-8 text-center font-display text-2xl font-medium text-ink">Thanks, {name.split(' ')[0]}! We will email {email} with availability and a quote within 2 business days (mock).</p>
		{:else}
			<h2 class="font-display text-2xl font-medium text-ink">Enquire about private hire</h2>
			<p class="mt-1 text-muted">Tell us about your event — we reply within 2 business days.</p>
			<form onsubmit={enquire} class="mt-5 space-y-4">
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label class="block text-sm font-semibold text-ink" for="ph-name">Your name</label>
						<input id="ph-name" type="text" required bind:value={name} placeholder="Alex Morgan" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
					<div>
						<label class="block text-sm font-semibold text-ink" for="ph-email">Email</label>
						<input id="ph-email" type="email" required bind:value={email} placeholder="alex@email.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
				</div>
				<div>
					<label class="block text-sm font-semibold text-ink" for="ph-guests">Guests (up to 80)</label>
					<input id="ph-guests" type="number" min="10" max="80" bind:value={guests} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base sm:w-48" />
				</div>
				<button type="submit" class="flex min-h-12 w-full items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark">Send Enquiry</button>
				<p class="text-center text-xs text-muted">Demo form — nothing is sent. Prefer to talk? Call {site.phoneDisplay}.</p>
			</form>
		{/if}
	</div>
	<p class="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-muted"><Users size={16} class="mr-1 inline text-gold-dark" aria-hidden="true" /> Smaller gatherings? A table for up to 8 can be booked on the <a href="/reservations" class="font-semibold text-coffee underline underline-offset-2">Reservations page</a> — no hire fee, no minimum.</p>
</section>
