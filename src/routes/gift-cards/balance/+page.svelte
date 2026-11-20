<script lang="ts">
	import { Check, Gift, Search } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { giftCardBalances, money, site } from '#lib/data/site.ts';

	let code = $state('');
	let lookedUp = $state(false);
	let found = $state<{ balance: number; issued: string } | null>(null);

	const lookup = (e?: Event) => {
		e?.preventDefault();
		lookedUp = true;
		found = giftCardBalances[code.trim().toUpperCase()] ?? null;
	};
</script>

<svelte:head>
	<title>Check Gift Card Balance — {site.name}</title>
	<meta name="description" content="Check your Coffee Lounge gift card balance by card code. Gift cards never expire and work at all three cafés." />
</svelte:head>

<PageHero
	eyebrow="GIFT CARDS"
	title="Check Your Gift Card Balance"
	subtitle="Enter the code from your gift card — it looks like CL-GIFT-1001 — and see what is left to spend. Gift cards never expire and work at all three cafés."
/>

<section class="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:px-8">
	<form onsubmit={lookup} class="flex w-full flex-col gap-2 sm:flex-row">
		<label for="gc-code" class="sr-only">Gift card code</label>
		<input id="gc-code" type="text" bind:value={code} placeholder="CL-GIFT-1001" autocapitalize="characters" class="min-h-14 min-w-0 flex-1 rounded-full border border-line bg-white px-5 text-base tracking-wider placeholder:text-muted" />
		<button type="submit" class="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark"><Search size={18} aria-hidden="true" /> Check Balance</button>
	</form>
	<p class="mt-3 text-sm text-muted">Try a demo code: {#each Object.keys(giftCardBalances) as c}<button type="button" class="font-semibold text-coffee underline underline-offset-2" onclick={() => { code = c; lookup(); }}>{c}</button>{' '}{/each}</p>

	{#if lookedUp}
		{#if found}
			<div class="mt-8 rounded-3xl bg-white p-8 text-center ring-1 ring-line" role="status">
				<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand text-coffee"><Gift size={30} aria-hidden="true" /></span>
				<p class="mt-4 text-sm font-bold tracking-wider text-gold-dark">BALANCE REMAINING</p>
				<p class="mt-1 font-display text-5xl font-semibold text-coffee">{money(found.balance)}</p>
				<p class="mt-2 text-muted">Card {code.trim().toUpperCase()} · issued {found.issued} · never expires</p>
				<a href="/menu" class="mt-6 inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">Spend It on the Menu</a>
			</div>
		{:else}
			<div class="mt-8 rounded-3xl bg-white p-8 text-center ring-1 ring-line" role="status">
				<p class="font-display text-xl font-semibold text-ink">We could not find that code</p>
				<p class="mt-2 text-muted">Check the code and try again — it starts with CL-GIFT-. If you bought the card at a café, ask at the counter and we will look it up for you.</p>
			</div>
		{/if}
	{/if}
	<div class="mt-8 rounded-3xl bg-sand p-6">
		<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink"><Check size={18} class="text-coffee" aria-hidden="true" /> Good to know</h2>
		<ul class="mt-3 space-y-2 text-[0.95rem] text-muted">
			<li>· Gift cards work at all three cafés, in person and at online checkout.</li>
			<li>· They never expire, and any remaining balance stays on the card.</li>
			<li>· Need a card? <a href="/gift-cards" class="font-semibold text-coffee underline underline-offset-2">Buy one from $25</a> — or <a href="/corporate-gifting" class="font-semibold text-coffee underline underline-offset-2">gift cards in bulk for a team</a>.</li>
		</ul>
	</div>
</section>
