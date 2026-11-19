<script lang="ts">
	import { Check, Gift } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { giftCards, site } from '#lib/data/site.ts';

	let selected = $state(50);
	let recipient = $state('');
	let bought = $state(false);

	const buy = (e: Event) => {
		e.preventDefault();
		bought = true;
	};
</script>

<svelte:head>
	<title>Gift Cards — {site.name} | Give the Gift of Great Coffee</title>
	<meta
		name="description"
		content="Coffee Lounge gift cards from $25 to $100 — the perfect gift for the coffee lover in your life. Redeemable at all three cafés."
	/>
	<link rel="canonical" href="{site.url}/gift-cards" />
</svelte:head>

<PageHero
	eyebrow="GIFT CARDS"
	title="Give the Gift of Great Coffee"
	subtitle="A Coffee Lounge gift card never expires, works at all three cafés, and is always the right size."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid items-start gap-10 lg:grid-cols-2">
		<div class="overflow-hidden rounded-[2rem]">
			<Picture
				name="hero-latte"
				alt="Latte with leaf latte art and cookies — the perfect gift, in a cup"
				width={1200}
				height={900}
				sizes="(max-width: 1024px) 90vw, 620px"
				eager
				imgClass="aspect-[4/3] h-auto w-full object-cover"
				pictureClass="block"
			/>
			<div class="bg-white p-6 ring-1 ring-line">
				<h2 class="font-display text-lg font-semibold text-ink">How it works</h2>
				<ul class="mt-3 space-y-2 text-[0.95rem] text-muted">
					{#each ['Pick an amount — $25, $50, $75 or $100.', 'We email the card to your recipient (or to you, to print).', 'They show the code at any counter. No expiry, no fees.'] as step}
						<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> {step}</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			{#if bought}
				<div role="status" class="py-8 text-center">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand text-coffee"><Gift size={28} aria-hidden="true" /></span>
					<p class="mt-4 font-display text-2xl font-medium text-ink">Gift card ready!</p>
					<p class="mt-2 leading-relaxed text-muted">
						A ${selected} gift card for {recipient || 'your lucky recipient'} — demo only, no payment was taken and no card was sent.
					</p>
					<button type="button" onclick={() => { bought = false; }} class="mt-6 inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">
						Buy Another
					</button>
				</div>
			{:else}
				<h2 class="font-display text-xl font-semibold text-ink">Choose an amount</h2>
				<div class="mt-4 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Gift card amount">
					{#each giftCards as g}
						<button
							type="button"
							role="radio"
							aria-checked={selected === g.amount}
							onclick={() => (selected = g.amount)}
							class="min-h-12 rounded-2xl border-2 p-4 text-left transition-colors duration-150 {selected === g.amount ? 'border-coffee bg-sand' : 'border-line bg-white'}"
						>
							<span class="block font-display text-2xl font-semibold text-coffee">${g.amount}</span>
							<span class="mt-0.5 block text-sm text-muted">{g.note}</span>
						</button>
					{/each}
				</div>
				<form onsubmit={buy} class="mt-6 space-y-4">
					<div>
						<label class="block text-sm font-semibold text-ink" for="gift-recipient">Recipient name</label>
						<input id="gift-recipient" type="text" bind:value={recipient} required placeholder="Who is it for?" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
					<button type="submit" class="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-coffee px-6 text-base font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark">
						<Gift size={18} aria-hidden="true" /> Buy ${selected} Gift Card
					</button>
					<p class="text-center text-xs text-muted">Demo checkout — no payment is taken.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
