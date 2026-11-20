<script lang="ts">
	import { Check, Package, Plus } from '@lucide/svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { money, shopProducts, site, subscriptions } from '#lib/data/site.ts';

	let kind = $state<'All' | 'Beans' | 'Merch'>('All');
	let addedId = $state('');
	let subscribedPlan = $state('');

	const shown = $derived(kind === 'All' ? shopProducts : shopProducts.filter((p) => p.kind === kind));

	const addProduct = (id: string) => {
		const p = shopProducts.find((x) => x.id === id);
		if (!p) return;
		cart.addLine({ id: `shop:${p.id}`, name: p.name, price: p.price, image: p.image });
		addedId = id;
		setTimeout(() => (addedId = ''), 2000);
	};

	const subscribe = (e: Event, id: string) => {
		e.preventDefault();
		subscribedPlan = id;
		// Save the subscription so /account can manage it (mock, localStorage).
		try {
			window.localStorage.setItem(
				'coffee-lounge-subscription',
				JSON.stringify({
					planId: id,
					status: 'active',
					blend: 'Maple Roast',
					frequency: 'Monthly',
					nextDelivery: 'Tuesday, December 2, 2026',
					address: '123 Brew Street, Maple City, CA 94110'
				})
			);
		} catch {
			/* ignore */
		}
	};
</script>

<svelte:head>
	<title>Shop Beans & Merch — {site.name} | Subscriptions, Beans & Gifts</title>
	<meta name="description" content="Take the Lounge home: Maple Roast and single-origin beans, coffee subscriptions from $16/month, cold brew kits, mugs and totes." />
</svelte:head>

<PageHero
	eyebrow="THE LOUNGE SHOP"
	title="Take the Lounge Home"
	subtitle="The same beans we pour at the counter, roasted Tuesdays at Riverside — plus subscriptions, brew kits and the mug your mornings deserve."
/>

<section class="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
	<div class="flex flex-wrap gap-2" role="group" aria-label="Filter shop products">
		{#each ['All', 'Beans', 'Merch'] as k}
			<button
				type="button"
				aria-pressed={kind === k}
				onclick={() => (kind = k as typeof kind)}
				class="min-h-12 rounded-full px-5 text-sm font-semibold transition-colors duration-150 {kind === k ? 'bg-coffee text-white' : 'border border-line bg-white text-ink hover:border-coffee'}"
			>
				{k}
			</button>
		{/each}
	</div>
	<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each shown as p}
			<article class="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-lg">
				<div class="overflow-hidden">
					<Picture
						name={p.image}
						alt={p.imageAlt}
						width={800}
						height={600}
						sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
						imgClass="aspect-[4/3] h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
						pictureClass="block"
					/>
				</div>
				<div class="flex flex-1 flex-col p-5">
					{#if p.badge}
						<p class="text-xs font-bold tracking-wider text-gold-dark">{p.badge.toUpperCase()}</p>
					{/if}
					<h2 class="mt-1 font-display text-lg leading-snug font-semibold text-ink"><a href="/shop/{p.id}" class="hover:text-gold-dark">{p.name}</a></h2>
					<p class="mt-1.5 flex-1 text-[0.95rem] leading-relaxed text-muted">{p.short}</p>
					<div class="mt-4 flex items-center justify-between gap-3">
						<p class="font-display text-xl font-semibold text-coffee">{money(p.price)}</p>
						<button
							type="button"
							onclick={() => addProduct(p.id)}
							class="inline-flex min-h-12 items-center gap-1.5 rounded-full bg-coffee px-5 text-sm font-semibold text-white hover:bg-coffee-dark"
						>
							{#if addedId === p.id}<Check size={16} aria-hidden="true" /> Added{:else}<Plus size={16} aria-hidden="true" /> Add to Cart{/if}
						</button>
					</div>
				</div>
			</article>
		{/each}
	</div>
	<p class="mt-5 text-sm text-muted">
		Beans ship free with any subscription, or pick up free at any café. Ground to order at the
		counter — just ask.
	</p>
</section>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="mt-6 flex flex-wrap items-end justify-between gap-3">
		<h2 class="font-display text-[clamp(1.7rem,4vw,2.4rem)] font-medium text-ink">Coffee Subscriptions</h2>
		<p class="flex items-center gap-2 text-sm font-semibold text-coffee"><Package size={16} aria-hidden="true" /> Pause or cancel anytime</p>
	</div>
	<div class="mt-6 grid gap-6 lg:grid-cols-3">
		{#each subscriptions as plan}
			<article class="flex flex-col rounded-3xl p-6 ring-1 {plan.highlight ? 'bg-coffee-dark text-cream ring-coffee-dark' : 'bg-white ring-line'} sm:p-7">
				<h3 class="font-display text-2xl font-medium">{plan.name}</h3>
				<p class="mt-1 font-display text-3xl font-semibold {plan.highlight ? 'text-gold-light' : 'text-coffee'}">
					{money(plan.price)} <span class="text-base font-normal {plan.highlight ? 'text-cream/70' : 'text-muted'}">{plan.per}</span>
				</p>
				<p class="mt-2 flex-1 leading-relaxed {plan.highlight ? 'text-cream/80' : 'text-muted'}">{plan.blurb}</p>
				<ul class="mt-4 space-y-2 text-[0.95rem] {plan.highlight ? 'text-cream/80' : 'text-muted'}">
					{#each plan.perks as perk}
						<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 {plan.highlight ? 'text-gold-light' : 'text-coffee'}" aria-hidden="true" /> {perk}</li>
					{/each}
				</ul>
				{#if subscribedPlan === plan.id}
					<p role="status" class="mt-5 rounded-2xl bg-cream/10 px-5 py-4 text-center font-semibold">You are in! Your first box ships Tuesday (mock). <a href="/account" class="underline underline-offset-2">Manage it in your account →</a></p>
				{:else}
					<form onsubmit={(e) => subscribe(e, plan.id)} class="mt-5">
						<button type="submit" class="flex min-h-12 w-full items-center justify-center rounded-full {plan.highlight ? 'bg-cream text-coffee-dark' : 'bg-coffee text-white'} px-6 text-sm font-semibold hover:opacity-90">
							Start {plan.name} — {money(plan.price)}/mo
						</button>
					</form>
				{/if}
			</article>
		{/each}
	</div>
	<div class="mt-8 grid items-center gap-6 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8 lg:grid-cols-[240px_1fr]">
		<Picture
			name="subscription-box"
			alt="Open coffee subscription box with bean bags and a tasting card"
			width={800}
			height={600}
			sizes="(max-width: 1024px) 90vw, 240px"
			imgClass="aspect-[4/3] h-auto w-full rounded-2xl object-cover"
			pictureClass="block"
		/>
		<div>
			<h3 class="font-display text-xl font-semibold text-ink">What arrives in the box</h3>
			<p class="mt-2 leading-relaxed text-muted">
				Your beans, a tasting card with the farm story, a brew recipe for the month's lot, and —
				because we are us — a small bag of whatever the roastery was experimenting with on Tuesday.
				Ships the first Tuesday of the month, roasted that morning.
			</p>
		</div>
	</div>
</section>
