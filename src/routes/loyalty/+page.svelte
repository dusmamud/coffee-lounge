<script lang="ts">
	import { Check, Coffee, Crown, Sparkles } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { loyaltyTiers, site } from '#lib/data/site.ts';

	let email = $state('');
	let joined = $state(false);

	const join = (e: Event) => {
		e.preventDefault();
		if (email.includes('@')) joined = true;
	};
</script>

<svelte:head>
	<title>Coffee Loop Rewards — {site.name} | Earn Points on Every Cup</title>
	<meta
		name="description"
		content="Join the Coffee Loop: earn 1 point per $1, unlock Roast and Reserve tiers, a free birthday pastry and a free drink every month."
	/>
	<link rel="canonical" href="{site.url}/loyalty" />
</svelte:head>

<PageHero
	eyebrow="COFFEE LOOP REWARDS"
	title="Every Cup Gets You Closer"
	subtitle="Earn 1 point for every $1 you spend. Points never expire, and the perks get better the more you lounge."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-3">
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
