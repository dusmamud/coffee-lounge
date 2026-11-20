<script lang="ts">
	import { Check, Gift } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';

	let company = $state('');
	let email = $state('');
	let qty = $state(25);
	let sent = $state(false);
	const enquire = (e: Event) => {
		e.preventDefault();
		if (company.trim() && email.includes('@')) sent = true;
	};
</script>

<svelte:head>
	<title>Corporate Gifting — {site.name} | Bulk Gift Cards for Teams</title>
	<meta name="description" content="Bulk Coffee Lounge gift cards for your team: custom denominations, emailed to every employee, your logo on the card. From 10 cards up." />
</svelte:head>

<PageHero
	eyebrow="CORPORATE GIFTING"
	title="Coffee for the Whole Team"
	subtitle="Bulk gift cards, emailed to every employee — custom denominations, your logo on the card, and a thank-you that actually gets used."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-3">
		{#each [{ n: 'Team Treat', q: '10–49 cards', d: '$25 or $50 per card, emailed individually.', p: '5% off face value' }, { n: 'Office Favourite', q: '50–199 cards', d: '$25, $50 or $100 per card, with your logo.', p: '10% off face value' }, { n: 'Company Wide', q: '200+ cards', d: 'Any denomination, branded cards, dedicated account manager.', p: '15% off face value' }] as t}
			<article class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<Gift size={22} class="text-coffee" aria-hidden="true" />
				<h2 class="mt-3 font-display text-2xl font-medium text-ink">{t.n}</h2>
				<p class="mt-1 font-semibold text-coffee">{t.q} · {t.p}</p>
				<p class="mt-2 flex-1 leading-relaxed text-muted">{t.d}</p>
			</article>
		{/each}
	</div>
	<div class="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
		{#if sent}
			<p role="status" class="py-8 text-center font-display text-2xl font-medium text-ink">Thanks, {company}! We will email {email} with a quote for {qty} cards within 2 business days (mock).</p>
		{:else}
			<h2 class="font-display text-2xl font-medium text-ink">Get a bulk quote</h2>
			<ul class="mt-3 space-y-1.5 text-[0.95rem] text-muted">
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Cards never expire and work at all three cafés.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Delivered by email — no shipping, no plastic unless you want it.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Add a coffee-tasting morning for the team — see <a href="/classes" class="font-semibold text-coffee underline underline-offset-2">Classes</a>.</li>
			</ul>
			<form onsubmit={enquire} class="mt-5 space-y-4">
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label class="block text-sm font-semibold text-ink" for="cg-company">Company</label>
						<input id="cg-company" type="text" required bind:value={company} placeholder="Acme Inc." class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
					<div>
						<label class="block text-sm font-semibold text-ink" for="cg-email">Work email</label>
						<input id="cg-email" type="email" required bind:value={email} placeholder="you@company.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
				</div>
				<div>
					<label class="block text-sm font-semibold text-ink" for="cg-qty">How many cards?</label>
					<input id="cg-qty" type="number" min="10" max="1000" bind:value={qty} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base sm:w-48" />
				</div>
				<button type="submit" class="flex min-h-12 w-full items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark">Request Bulk Quote</button>
				<p class="text-center text-xs text-muted">Demo form — nothing is sent. Or buy a single card on the <a href="/gift-cards" class="font-semibold text-coffee underline underline-offset-2">Gift Cards page</a>.</p>
			</form>
		{/if}
	</div>
</section>
