<script lang="ts">
	import { Cake, Check, Gift, History, Package, RotateCcw, Truck } from '@lucide/svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { points } from '#lib/points.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import { demoOrders, money, site, subscriptions, type DemoOrder } from '#lib/data/site.ts';

	type PlacedOrder = DemoOrder & {
		lines?: { id: string; name: string; price: number; image: string; qty: number; optionsLabel: string }[];
	};
	type Sub = { planId: string; status: string; blend: string; frequency: string; nextDelivery: string; address: string };

	let orders = $state<PlacedOrder[]>([]);
	let sub = $state<Sub | null>(null);
	let reorderedRef = $state('');
	let birthdayClaimed = $state(false);
	let subMsg = $state('');

	const loadSub = () => {
		try {
			const raw = window.localStorage.getItem('coffee-lounge-subscription');
			sub = raw ? (JSON.parse(raw) as Sub) : null;
		} catch {
			sub = null;
		}
	};
	$effect(() => {
		try {
			const raw = window.localStorage.getItem('coffee-lounge-orders');
			if (raw) orders = JSON.parse(raw) as PlacedOrder[];
		} catch {
			orders = [];
		}
		loadSub();
	});
	const saveSub = () => {
		if (!sub) return;
		try {
			window.localStorage.setItem('coffee-lounge-subscription', JSON.stringify(sub));
		} catch {
			/* ignore */
		}
	};
	const plan = $derived.by(() => {
		const s = sub;
		return s ? subscriptions.find((x) => x.id === s.planId) : undefined;
	});
	const seedDemoSub = () => {
		sub = { planId: 'regular', status: 'active', blend: 'Maple Roast', frequency: 'Monthly', nextDelivery: 'Tuesday, December 2, 2026', address: '123 Brew Street, Maple City, CA 94110' };
		saveSub();
		subMsg = 'Demo subscription loaded: The Regular, next box December 2.';
	};
	const pauseSub = () => {
		if (!sub) return;
		sub.status = sub.status === 'paused' ? 'active' : 'paused';
		saveSub();
		subMsg = sub.status === 'paused' ? 'Paused — your pricing, benefits and rewards are kept. Resume anytime.' : 'Resumed — your next box ships on schedule.';
	};
	const skipSub = () => {
		if (!sub) return;
		sub.nextDelivery = 'Tuesday, January 6, 2027';
		saveSub();
		subMsg = 'Skipped one delivery — your subscription stays active and your next box is now January 6.';
	};
	const reorder = (order: PlacedOrder) => {
		if (!order.lines) return;
		for (const l of order.lines) {
			cart.addLine({ id: l.id, name: l.name, price: l.price, image: l.image, optionsLabel: l.optionsLabel || undefined }, l.qty);
		}
		reorderedRef = order.ref;
	};
	const pointsHistory = [
		{ label: 'Order CL-2026-1042 — 2 × Classic Cappuccino, 1 × Butter Croissant', pts: '+12 pts', when: 'Today' },
		{ label: 'Latte Art Workshop booking', pts: '+35 pts', when: 'Nov 18' },
		{ label: 'Free Pastry redeemed', pts: '−60 pts', when: 'Nov 10' },
		{ label: 'Subscription box — The Regular', pts: '+29 pts', when: 'Nov 2' }
	];
</script>

<svelte:head>
	<title>My Account — {site.name} | Orders, Subscription & Coffee Loop Points</title>
	<meta name="description" content="Your Coffee Lounge account (mock): order history with one-tap reorder, subscription pause / skip / swap, Coffee Loop points and your birthday reward." />
</svelte:head>

<PageHero
	eyebrow="MY ACCOUNT"
	title="Your Lounge, Your Way"
	subtitle="Order history, one-tap reorder, your coffee subscription and your Coffee Loop points — all in one place. This is a demo account: everything is stored on this device only."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-[1fr_360px]">
		<div class="min-w-0 space-y-6">
			<!-- Order history + one-tap reorder -->
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink"><History size={20} class="text-gold-dark" aria-hidden="true" /> Order history</h2>
				{#if reorderedRef}
					<p role="status" class="mt-3 rounded-2xl bg-sand p-4 text-sm font-semibold text-ink">Order {reorderedRef} is back in your cart — the usual, again. <a href="/order" class="text-coffee underline underline-offset-2">Go to checkout →</a></p>
				{/if}
				{#if orders.length === 0}
					<p class="mt-3 leading-relaxed text-muted">No orders on this device yet. Place an order and it will appear here with a one-tap reorder button. Try the demo order below, or <a href="/menu" class="font-semibold text-coffee underline underline-offset-2">order something now</a>.</p>
					<div class="mt-4 rounded-2xl bg-sand p-4">
						<p class="font-semibold text-ink">Demo order · CL-2026-1042</p>
						<p class="mt-1 text-sm text-muted">2 × Classic Cappuccino, 1 × Butter Croissant · $12.75 · Ready now</p>
						<a href="/track-order?ref=CL-2026-1042" class="mt-3 inline-flex min-h-12 items-center rounded-full bg-coffee px-5 text-sm font-semibold text-white hover:bg-coffee-dark">Track Demo Order</a>
					</div>
				{:else}
					<ul class="mt-4 space-y-4">
						{#each orders as o}
							<li class="rounded-2xl bg-sand p-4">
								<div class="flex flex-wrap items-start justify-between gap-2">
									<div>
										<p class="font-semibold text-ink">Order {o.ref} · {o.total}</p>
										<p class="mt-0.5 text-sm text-muted">{o.items}</p>
										<p class="text-xs text-muted">{o.placedAt}</p>
									</div>
									{#if o.lines}
										<button type="button" onclick={() => reorder(o)} class="inline-flex min-h-12 items-center gap-1.5 rounded-full bg-coffee px-5 text-sm font-semibold text-white hover:bg-coffee-dark"><RotateCcw size={16} aria-hidden="true" /> Order the usual again</button>
									{:else}
										<a href="/track-order?ref={o.ref}" class="inline-flex min-h-12 items-center rounded-full border border-coffee px-5 text-sm font-semibold text-coffee hover:bg-white">Track</a>
									{/if}
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<!-- Subscription self-serve -->
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink"><Package size={20} class="text-gold-dark" aria-hidden="true" /> Coffee subscription</h2>
				{#if !sub || !plan}
					<p class="mt-3 leading-relaxed text-muted">No active subscription on this device. Start one in the <a href="/shop" class="font-semibold text-coffee underline underline-offset-2">shop</a> — or load the demo subscription to try pause, skip and swap.</p>
					<button type="button" onclick={seedDemoSub} class="mt-4 inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">Load Demo Subscription</button>
				{:else}
					<div class="mt-4 rounded-2xl bg-sand p-5">
						<p class="font-display text-lg font-semibold text-ink">{plan.name} — {money(plan.price)}/mo</p>
						<p class="mt-1 text-sm text-muted">Status: <strong class="text-ink">{sub.status === 'paused' ? 'Paused' : 'Active'}</strong> · Next delivery: <strong class="text-ink">{sub.nextDelivery}</strong></p>
						<p class="mt-1 text-sm text-muted">Blend: {sub.blend} · Frequency: {sub.frequency}</p>
						<p class="mt-1 text-sm text-muted">Deliver to: {sub.address}</p>
					</div>
					{#if subMsg}<p role="status" class="mt-3 rounded-2xl bg-sand p-4 text-sm font-semibold text-ink">{subMsg}</p>{/if}
					<div class="mt-4 flex flex-wrap gap-2">
						<button type="button" onclick={pauseSub} class="min-h-12 rounded-full border border-coffee px-5 text-sm font-semibold text-coffee hover:bg-sand">{sub.status === 'paused' ? 'Resume subscription' : 'Pause subscription'}</button>
						<button type="button" onclick={skipSub} class="min-h-12 rounded-full border border-coffee px-5 text-sm font-semibold text-coffee hover:bg-sand">Skip next delivery</button>
					</div>
					<div class="mt-4 grid gap-4 sm:grid-cols-2">
						<div>
							<label class="block text-sm font-semibold text-ink" for="sub-blend">Swap blend</label>
							<select id="sub-blend" bind:value={sub.blend} onchange={saveSub} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base">
								{#each ['Maple Roast', 'Ethiopia Yirgacheffe', 'Colombia Huila', 'Decaf Maple Roast'] as b}<option value={b}>{b}</option>{/each}
							</select>
						</div>
						<div>
							<label class="block text-sm font-semibold text-ink" for="sub-freq">Change frequency</label>
							<select id="sub-freq" bind:value={sub.frequency} onchange={saveSub} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base">
								{#each ['Every 2 weeks', 'Monthly', 'Every 2 months'] as f}<option value={f}>{f}</option>{/each}
							</select>
						</div>
					</div>
					<div class="mt-4">
						<label class="block text-sm font-semibold text-ink" for="sub-address">Delivery address</label>
						<input id="sub-address" type="text" bind:value={sub.address} onchange={saveSub} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base" />
					</div>
					<p class="mt-3 text-xs text-muted">Pause keeps your pricing, benefits and rewards. Skip pushes one delivery back — the subscription stays active. Cancel anytime from here (mock).</p>
				{/if}
			</div>
		</div>

		<aside class="h-fit space-y-6">
			<div class="rounded-3xl bg-coffee-dark p-6 text-cream sm:p-7">
				<h2 class="font-display text-xl font-medium">Coffee Loop points</h2>
				<p class="mt-2 font-display text-4xl font-semibold">{points.balance} <span class="text-lg font-normal text-cream/70">pts</span></p>
				<p class="mt-1 text-sm text-cream/70">Tier: {points.tier}{points.nextTierAt ? ` · ${points.nextTierAt - points.balance} pts to the next tier` : ' · top tier'}</p>
				<div class="mt-4 h-2 overflow-hidden rounded-full bg-cream/20"><div class="h-full rounded-full bg-gold-light transition-[width] duration-300" style="width: {points.progressToNext}%"></div></div>
				<a href="/loyalty" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-cream px-6 text-sm font-semibold text-coffee-dark hover:bg-white">See Rewards</a>
				<h3 class="mt-6 font-semibold">Points history</h3>
				<ul class="mt-2 space-y-2 text-sm text-cream/80">
					{#each pointsHistory as h}
						<li class="flex justify-between gap-3 border-b border-cream/15 pb-2 last:border-0"><span>{h.label}<span class="block text-xs text-cream/60">{h.when}</span></span><span class="shrink-0 font-semibold text-cream">{h.pts}</span></li>
					{/each}
				</ul>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink"><Cake size={20} class="text-gold-dark" aria-hidden="true" /> Birthday reward</h2>
				<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">Roast tier and above get a free pastry on their birthday. Claim it here and show the confirmation at any counter.</p>
				{#if birthdayClaimed}
					<p role="status" class="mt-4 rounded-2xl bg-sand p-4 font-semibold text-ink"><Gift size={16} class="mr-1 inline" aria-hidden="true" /> Birthday pastry claimed (mock) — show this page at the counter.</p>
				{:else}
					<button type="button" onclick={() => (birthdayClaimed = true)} class="mt-4 inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">Claim My Birthday Pastry</button>
				{/if}
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink"><Truck size={20} class="text-gold-dark" aria-hidden="true" /> Quick links</h2>
				<ul class="mt-3 space-y-1 text-[0.95rem]">
					<li><a href="/track-order" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">Track an order</a></li>
					<li><a href="/gift-cards/balance" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">Check a gift card balance</a></li>
					<li><a href="/reservations" class="inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">Reserve a table</a></li>
				</ul>
			</div>
		</aside>
	</div>
</section>
