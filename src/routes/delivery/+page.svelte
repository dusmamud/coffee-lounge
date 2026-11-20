<script lang="ts">
	import { Bike, Check, MapPin, Store } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { deliveryZones, site } from '#lib/data/site.ts';

	let zip = $state('');
	let checked = $state(false);
	const zone = $derived(
		zip.trim() === '94110' || zip.trim() === '94111' || zip.trim() === '94112'
			? deliveryZones.find((z) => z.zip === zip.trim())
			: zip.trim() === '94114'
				? deliveryZones.find((z) => z.zip === '94114')
				: null
	);
	const check = (e: Event) => {
		e.preventDefault();
		checked = true;
	};
</script>

<svelte:head>
	<title>Delivery — {site.name} | Direct Delivery Zones & Fees in Maple City</title>
	<meta name="description" content="Coffee Lounge delivery, direct from our cafés: $2.99 within 5 miles, free over $25. Check your ZIP, or find us on DoorDash, Uber Eats and Grubhub." />
</svelte:head>

<PageHero
	eyebrow="DELIVERY"
	title="Coffee, Brought to You"
	subtitle="Order direct from the café and save — no marketplace markup, no inflated menu prices. $2.99 delivery within 5 miles, free on orders over $25."
/>

<section class="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-2">
		<div class="min-w-0 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
			<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink"><MapPin size={20} class="text-gold-dark" aria-hidden="true" /> Check your ZIP</h2>
			<form onsubmit={check} class="mt-4 flex flex-col gap-2 sm:flex-row">
				<label for="zip" class="sr-only">ZIP code</label>
				<input id="zip" type="text" inputmode="numeric" bind:value={zip} placeholder="94110" class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-cream px-5 text-base placeholder:text-muted" />
				<button type="submit" class="inline-flex min-h-12 items-center justify-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">Check My ZIP</button>
			</form>
			{#if checked}
				{#if zone}
					<p role="status" class="mt-4 rounded-2xl bg-sand p-4 text-[0.95rem] leading-relaxed text-ink"><Check size={16} class="mr-1 inline text-coffee" aria-hidden="true" /> Yes — we deliver to {zone.area} (ZIP {zone.zip}). Delivery is ${zone.fee.toFixed(2)}, {zone.note.toLowerCase()}.</p>
				{:else}
					<p role="status" class="mt-4 rounded-2xl bg-sand p-4 text-[0.95rem] leading-relaxed text-ink">That ZIP is outside our direct delivery zone for now — but you can still find us on DoorDash, Uber Eats or Grubhub below, or order ahead for pickup at any café.</p>
				{/if}
			{/if}
			<h3 class="mt-6 font-display text-lg font-semibold text-ink">Delivery zones</h3>
			<ul class="mt-3 divide-y divide-line">
				{#each deliveryZones as z}
					<li class="flex items-center justify-between gap-3 py-3 text-[0.95rem]"><span><strong class="text-ink">ZIP {z.zip}</strong><span class="block text-sm text-muted">{z.area}</span></span><span class="shrink-0 text-right font-semibold text-coffee">${z.fee.toFixed(2)}<span class="block text-xs font-normal text-muted">{z.note}</span></span></li>
				{/each}
			</ul>
			<p class="mt-3 text-sm text-muted">Delivery hours match café hours. Hot drinks travel in sealed carriers; cold brew and pastries travel cold.</p>
		</div>
		<div class="min-w-0 space-y-6">
			<div class="rounded-3xl bg-coffee-dark p-6 text-cream sm:p-7">
				<h2 class="flex items-center gap-2 font-display text-xl font-medium"><Store size={20} class="text-gold-light" aria-hidden="true" /> Order direct and save</h2>
				<p class="mt-3 leading-relaxed text-cream/80">Marketplaces take 15–30% of every order. When you order direct — here, or by phone — the whole order supports the café, and you pay the menu price, not an inflated one. Same coffee, same 30–40 minutes, more of your money stays local.</p>
				<a href="/order?fulfilment=delivery" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-cream px-6 text-sm font-semibold text-coffee-dark hover:bg-white">Order Delivery Direct →</a>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink"><Bike size={20} class="text-gold-dark" aria-hidden="true" /> Also on the marketplaces</h2>
				<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">Outside our zone, or already in the app? Find us for discovery there — and come back direct next time.</p>
				<ul class="mt-4 space-y-1">
					{#each [{ n: 'DoorDash', u: 'https://www.doordash.com' }, { n: 'Uber Eats', u: 'https://www.ubereats.com' }, { n: 'Grubhub', u: 'https://www.grubhub.com' }] as m}
						<li><a href={m.u} target="_blank" rel="noopener" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">{m.n} →</a></li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
