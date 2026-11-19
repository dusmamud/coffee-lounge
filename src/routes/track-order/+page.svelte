<script lang="ts">
	import { Check, PackageSearch, RotateCcw } from '@lucide/svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import { demoOrders, orderStatusSteps, site, type DemoOrder } from '#lib/data/site.ts';

	type PlacedOrder = DemoOrder & {
		lines?: { id: string; name: string; price: number; image: string; qty: number; optionsLabel: string }[];
	};

	let ref = $state('');
	let lookedUp = $state(false);
	let found = $state<PlacedOrder | null>(null);
	let reordered = $state(false);
	let pastOrders = $state<PlacedOrder[]>([]);

	$effect(() => {
		try {
			const raw = window.localStorage.getItem('coffee-lounge-orders');
			if (raw) pastOrders = JSON.parse(raw) as PlacedOrder[];
		} catch {
			pastOrders = [];
		}
		const params = new URLSearchParams(window.location.search);
		const initial = params.get('ref');
		if (initial) {
			ref = initial;
			lookup();
		}
	});

	const statusIndex = (status: PlacedOrder['status']) =>
		status === 'confirmed' ? 0 : status === 'preparing' ? 1 : status === 'ready' || status === 'out-for-delivery' ? 2 : 3;

	function lookup(e?: Event) {
		e?.preventDefault();
		lookedUp = true;
		reordered = false;
		const needle = ref.trim().toUpperCase();
		found =
			pastOrders.find((o) => o.ref.toUpperCase() === needle) ??
			demoOrders.find((o) => o.ref.toUpperCase() === needle) ??
			null;
	}

	function reorder(order: PlacedOrder) {
		if (!order.lines) return;
		for (const l of order.lines) {
			cart.addLine(
				{ id: l.id, name: l.name, price: l.price, image: l.image, optionsLabel: l.optionsLabel || undefined },
				l.qty
			);
		}
		reordered = true;
	}
</script>

<svelte:head>
	<title>Track Your Order — {site.name} | Live Status by Reference</title>
	<meta name="description" content="Track your Coffee Lounge order by its reference (e.g. CL-2026-1042). See confirmation, preparation and pickup status — and reorder in one tap." />
	<link rel="canonical" href="{site.url}/track-order" />
</svelte:head>

<PageHero
	eyebrow="TRACK YOUR ORDER"
	title="Where Is My Coffee?"
	subtitle="Enter the reference from your confirmation — it looks like CL-2026-1042 — and see exactly where your order is."
/>

<section class="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
	<form onsubmit={lookup} class="flex w-full flex-col gap-2 sm:flex-row">
		<label for="track-ref" class="sr-only">Order reference</label>
		<input
			id="track-ref"
			type="text"
			bind:value={ref}
			placeholder="CL-2026-1042"
			autocapitalize="characters"
			class="min-h-14 min-w-0 flex-1 rounded-full border border-line bg-white px-5 text-base tracking-wider placeholder:text-muted"
		/>
		<button
			type="submit"
			class="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark"
		>
			<PackageSearch size={18} aria-hidden="true" /> Track Order
		</button>
	</form>
	<p class="mt-3 text-sm text-muted">
		Try the demo reference <button type="button" class="font-semibold text-coffee underline underline-offset-2" onclick={() => { ref = 'CL-2026-1042'; lookup(); }}>CL-2026-1042</button> — orders you place in this demo are saved on this device and can be tracked here too.
	</p>

	{#if lookedUp}
		{#if found}
			<div class="mt-8 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8" role="status">
				<div class="flex flex-wrap items-start justify-between gap-3">
					<div>
						<p class="text-xs font-bold tracking-[0.2em] text-gold-dark">ORDER {found.ref}</p>
						<h2 class="mt-2 font-display text-2xl font-medium text-ink">{found.items}</h2>
						<p class="mt-1 text-sm text-muted">{found.placedAt}</p>
					</div>
					<p class="font-display text-xl font-semibold text-coffee">{found.total}</p>
				</div>
				<ol class="mt-7 space-y-0">
					{#each orderStatusSteps as stepLabel, i}
						<li class="flex gap-3">
							<span class="flex flex-col items-center">
								<span class="flex h-9 w-9 items-center justify-center rounded-full {i <= statusIndex(found.status) ? 'bg-coffee text-white' : 'bg-sand text-muted'}">
									{#if i <= statusIndex(found.status)}<Check size={16} aria-hidden="true" />{:else}<span class="text-sm font-bold">{i + 1}</span>{/if}
								</span>
								{#if i < orderStatusSteps.length - 1}<span class="w-px flex-1 {i < statusIndex(found.status) ? 'bg-coffee' : 'bg-line'}" aria-hidden="true"></span>{/if}
							</span>
							<span class="pb-6 pt-1.5 text-[0.95rem] {i <= statusIndex(found.status) ? 'font-semibold text-ink' : 'text-muted'}">{stepLabel}</span>
						</li>
					{/each}
				</ol>
				<p class="rounded-2xl bg-sand p-4 text-[0.95rem] text-ink">{found.eta}</p>
				{#if found.lines}
					<button
						type="button"
						onclick={() => found && reorder(found)}
						class="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark"
					>
						<RotateCcw size={16} aria-hidden="true" /> {reordered ? 'Added to cart — check the drawer' : 'Reorder the Same Thing'}
					</button>
				{/if}
			</div>
		{:else}
			<div class="mt-8 rounded-3xl bg-white p-8 text-center ring-1 ring-line" role="status">
				<p class="font-display text-xl font-semibold text-ink">We could not find “{ref.trim()}”</p>
				<p class="mt-2 text-muted">
					Check the reference — it starts with CL- followed by 6 digits. Orders placed in this demo
					only exist on the device they were placed on.
				</p>
			</div>
		{/if}
	{/if}

	{#if pastOrders.length > 0}
		<h2 class="mt-10 font-display text-xl font-semibold text-ink">Your recent orders on this device</h2>
		<ul class="mt-4 space-y-3">
			{#each pastOrders as o}
				<li class="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-5 ring-1 ring-line">
					<div class="min-w-0">
						<p class="font-semibold text-ink">{o.ref} · {o.total}</p>
						<p class="truncate text-sm text-muted">{o.items}</p>
						<p class="text-xs text-muted">{o.placedAt}</p>
					</div>
					<div class="flex gap-2">
						<button type="button" onclick={() => { ref = o.ref; lookup(); }} class="inline-flex min-h-12 items-center rounded-full border border-coffee px-5 text-sm font-semibold text-coffee hover:bg-sand">Track</button>
						{#if o.lines}
							<button type="button" onclick={() => reorder(o)} class="inline-flex min-h-12 items-center rounded-full bg-coffee px-5 text-sm font-semibold text-white hover:bg-coffee-dark">Reorder</button>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</section>
