<script lang="ts">
	import { Check, Coffee, Crown, Gift, Sparkles } from '@lucide/svelte';
	import { points } from '#lib/points.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import { loyaltyRewards, loyaltyTiers, site } from '#lib/data/site.ts';

	let email = $state('');
	let joined = $state(false);
	let redeemed = $state('');

	const join = (e: Event) => {
		e.preventDefault();
		if (email.includes('@')) joined = true;
	};

	const redeem = (id: string, cost: number, name: string) => {
		if (points.redeem(cost)) redeemed = name;
	};
</script>

<svelte:head>
	<title>Coffee Loop Rewards — {site.name} | Earn Points on Every Cup</title>
	<meta
		name="description"
		content="Join the Coffee Loop: earn 1 point per $1, unlock Roast and Reserve tiers, a free birthday pastry and a free drink every month."
	/>
</svelte:head>

<PageHero
	eyebrow="COFFEE LOOP REWARDS"
	title="Every Cup Gets You Closer"
	subtitle="Earn 1 point for every $1 you spend. Points never expire, and the perks get better the more you lounge."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<!-- Live points balance (mock, earned on orders placed on this device) -->
	<div class="mb-8 grid gap-6 rounded-3xl bg-coffee-dark p-6 text-cream sm:p-8 lg:grid-cols-[1fr_2fr] lg:items-center">
		<div>
			<p class="text-xs font-bold tracking-[0.25em] text-gold-light">YOUR COFFEE LOOP BALANCE</p>
			<p class="mt-2 font-display text-5xl font-semibold">{points.balance} <span class="text-2xl font-normal text-cream/70">pts</span></p>
			<p class="mt-1 text-cream/75">Current tier: <strong class="text-cream">{points.tier}</strong></p>
		</div>
		<div>
			{#if points.nextTierAt}
				<p class="text-sm text-cream/80">
					<strong class="text-cream">{points.nextTierAt - points.balance} points</strong> to {points.balance >= 100 ? 'Reserve' : 'Roast'} tier
				</p>
			{:else}
				<p class="text-sm text-cream/80">You are at the top tier — Reserve. Enjoy the free drink every month.</p>
			{/if}
			<div class="mt-3 h-3 overflow-hidden rounded-full bg-cream/20" role="progressbar" aria-valuenow={Math.round(points.progressToNext)} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to next Coffee Loop tier">
				<div class="h-full rounded-full bg-gold-light transition-[width] duration-300" style="width: {points.progressToNext}%"></div>
			</div>
			<p class="mt-2 text-sm text-cream/70">Earn 1 point per $1 on every mock order placed on this device. Points never expire.</p>
		</div>
	</div>

	<h2 class="font-display text-2xl font-medium text-ink">Rewards you can redeem</h2>
	<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each loyaltyRewards as r}
			<article class="flex flex-col rounded-3xl bg-white p-5 ring-1 ring-line">
				<span class="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-coffee"><Gift size={20} aria-hidden="true" /></span>
				<h3 class="mt-3 font-display text-lg font-semibold text-ink">{r.name}</h3>
				<p class="mt-1 flex-1 text-sm text-muted">{r.blurb}</p>
				<p class="mt-3 font-display text-xl font-semibold text-coffee">{r.cost} pts</p>
				{#if redeemed === r.name}
					<p role="status" class="mt-3 rounded-2xl bg-sand p-3 text-center text-sm font-semibold text-ink">Redeemed! Show this at the counter (mock).</p>
				{:else}
					<button
						type="button"
						disabled={points.balance < r.cost}
						onclick={() => redeem(r.id, r.cost, r.name)}
						class="mt-3 inline-flex min-h-12 items-center justify-center rounded-full bg-coffee px-5 text-sm font-semibold text-white hover:bg-coffee-dark disabled:cursor-not-allowed disabled:opacity-40"
					>
						{points.balance < r.cost ? `Need ${r.cost - points.balance} more pts` : 'Redeem'}
					</button>
				{/if}
			</article>
		{/each}
	</div>

	<h2 class="mt-12 font-display text-2xl font-medium text-ink">Tiers</h2>
	<div class="mt-4 grid gap-6 lg:grid-cols-3">
		{#each loyaltyTiers as tier, i}
			<article class="flex flex-col rounded-3xl p-6 ring-1 {i === 1 ? 'bg-coffee-dark text-cream ring-coffee-dark' : 'bg-white ring-line'} sm:p-7">
				<span class="flex h-12 w-12 items-center justify-center rounded-full {i === 1 ? 'bg-cream/15 text-gold-light' : 'bg-sand text-coffee'}">
					{#if i === 0}<Coffee size={22} aria-hidden="true" />{:else if i === 1}<Sparkles size={22} aria-hidden="true" />{:else}<Crown size={22} aria-hidden="true" />{/if}
				</span>
				<h2 class="mt-4 font-display text-2xl font-medium">{tier.name}</h2>
				<p class="text-sm font-semibold {i === 1 ? 'text-gold-light' : 'text-gold-dark'}">{tier.points}</p>
				<ul class="mt-4 flex-1 space-y-2 text-[0.95rem] {i === 1 ? 'text-cream/80' : 'text-muted'}">
					{#each tier.perks as perk}
						<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 {i === 1 ? 'text-gold-light' : 'text-coffee'}" aria-hidden="true" /> {perk}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 text-center ring-1 ring-line sm:p-8">
		{#if joined}
			<p role="status" class="font-display text-2xl font-medium text-ink">Welcome to the Loop!</p>
			<p class="mt-2 text-muted">Your Coffee Loop card is on its way to {email}. Show it at any counter to start earning.</p>
		{:else}
			<h2 class="font-display text-2xl font-medium text-ink">Join the Coffee Loop — it is free</h2>
			<p class="mt-2 text-muted">One email, and your points start counting from your very next cup.</p>
			<form onsubmit={join} class="mx-auto mt-5 flex max-w-md flex-col gap-2 sm:flex-row">
				<label for="loyalty-email" class="sr-only">Email address</label>
				<input
					id="loyalty-email"
					type="email"
					required
					bind:value={email}
					placeholder="Enter your email address"
					class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-cream px-5 text-base placeholder:text-muted"
				/>
				<button type="submit" class="inline-flex min-h-12 items-center justify-center rounded-full bg-coffee px-6 text-sm font-semibold whitespace-nowrap text-white hover:bg-coffee-dark">
					Join Free
				</button>
			</form>
		{/if}
	</div>
</section>
