<script lang="ts">
	import { Check, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { cateringPackages, site } from '#lib/data/site.ts';

	let name = $state('');
	let email = $state('');
	let date = $state('');
	let guests = $state('20–30 people');
	let pkg = $state(cateringPackages[0].id);
	let sent = $state(false);

	const enquire = (e: Event) => {
		e.preventDefault();
		if (name.trim() && email.includes('@') && date) sent = true;
	};
</script>

<svelte:head>
	<title>Catering & Private Events — {site.name} | Office Coffee, Brunch & Private Hire</title>
	<meta name="description" content="The Coffee Lounge caters offices and events in Maple City — coffee breaks from $8pp, brunch tables from $18pp, and Sunday-evening private hire of Brew Street." />
	<link rel="canonical" href="{site.url}/catering" />
</svelte:head>

<PageHero
	eyebrow="CATERING & PRIVATE EVENTS"
	title="Bring the Lounge to Your Event"
	subtitle="Office mornings, launch parties, Sunday-evening private hire — hot coffee, fresh pastries and a barista who actually shows up on time."
/>

<section class="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-3">
		{#each cateringPackages as p}
			<article class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<p class="flex items-center gap-1.5 text-xs font-bold tracking-wider text-gold-dark"><Users size={14} aria-hidden="true" /> {p.serves.toUpperCase()}</p>
				<h2 class="mt-2 font-display text-2xl font-medium text-ink">{p.name}</h2>
				<p class="font-display text-lg font-semibold text-coffee">{p.price}</p>
				<p class="mt-2 flex-1 leading-relaxed text-muted">{p.blurb}</p>
				<ul class="mt-4 space-y-2 text-[0.95rem] text-muted">
					{#each p.includes as inc}
						<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> {inc}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
	<div class="mt-8 overflow-hidden rounded-[2rem]">
		<Picture
			name="catering-table"
			alt="Café catering spread with croissants, sandwiches and a coffee urn on a long wooden table"
			width={1600}
			height={900}
			sizes="(max-width: 1280px) 90vw, 1200px"
			imgClass="aspect-[16/9] h-auto w-full object-cover"
			pictureClass="block"
		/>
	</div>
</section>

<section class="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
		{#if sent}
			<div role="status" class="text-center">
				<p class="font-display text-2xl font-medium text-ink">Enquiry received, {name.split(' ')[0]}!</p>
				<p class="mt-2 leading-relaxed text-muted">
					We will reply to {email} within one business day with a quote for {guests} on {date}.
					This is a demo form — nothing was sent.
				</p>
			</div>
		{:else}
			<h2 class="font-display text-2xl font-medium text-ink">Get a quote</h2>
			<p class="mt-1 text-muted">Tell us the basics — we handle the coffee, the setup and the cleanup.</p>
			<form onsubmit={enquire} class="mt-5 space-y-4">
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="cat-name" class="block text-sm font-semibold text-ink">Your name</label>
						<input id="cat-name" type="text" required bind:value={name} placeholder="Alex Morgan" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
					<div>
						<label for="cat-email" class="block text-sm font-semibold text-ink">Email</label>
						<input id="cat-email" type="email" required bind:value={email} placeholder="alex@company.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
				</div>
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="cat-date" class="block text-sm font-semibold text-ink">Event date</label>
						<input id="cat-date" type="date" required bind:value={date} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base" />
					</div>
					<div>
						<label for="cat-guests" class="block text-sm font-semibold text-ink">Guests</label>
						<select id="cat-guests" bind:value={guests} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base">
							{#each ['10–20 people', '20–30 people', '30–60 people', '60–80 people'] as g}<option value={g}>{g}</option>{/each}
						</select>
					</div>
				</div>
				<div>
					<label for="cat-package" class="block text-sm font-semibold text-ink">Package</label>
					<select id="cat-package" bind:value={pkg} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base">
						{#each cateringPackages as p}<option value={p.id}>{p.name} — {p.price}</option>{/each}
					</select>
				</div>
				<button type="submit" class="flex min-h-12 w-full items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark">
					Request My Quote
				</button>
				<p class="text-center text-xs text-muted">Demo form — no details leave your browser. We reply within one business day in real life.</p>
			</form>
		{/if}
	</div>
</section>
