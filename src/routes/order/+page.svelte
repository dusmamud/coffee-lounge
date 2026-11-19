<script lang="ts">
	import { Check, Clock, MapPin, ShoppingBag } from '@lucide/svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import {
		DELIVERY_FEE,
		FREE_DELIVERY_MIN,
		TAX_RATE,
		locations,
		money,
		site
	} from '#lib/data/site.ts';

	let step = $state(1);
	let mode = $state<'pickup' | 'delivery'>('pickup');
	let locationId = $state(locations[0].id);
	let name = $state('');
	let phone = $state('');
	let address = $state('');
	let payment = $state<'card' | 'upi' | 'cash'>('card');
	let cardLast4 = $state('');
	let placed = $state(false);
	let orderRef = $state('');
	let eta = $state('');

	const deliveryFee = $derived(mode === 'delivery' && cart.subtotal < FREE_DELIVERY_MIN ? DELIVERY_FEE : 0);
	const tax = $derived(cart.subtotal * TAX_RATE);
	const total = $derived(cart.subtotal + tax + deliveryFee);

	const canContinue = $derived(
		step === 1 ? cart.detailed.length > 0 : name.trim().length > 1 && phone.trim().length >= 7 && (mode === 'pickup' || address.trim().length > 5)
	);

	function placeOrder(e: Event) {
		e.preventDefault();
		const ref = `CL-${Math.floor(100000 + Math.random() * 900000)}`;
		orderRef = ref;
		eta = mode === 'pickup' ? 'Ready in about 15 minutes' : 'Arriving in about 30–40 minutes';
		placed = true;
		step = 3;
		cart.clear();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Order Online — {site.name} | Pickup & Delivery in Maple City</title>
	<meta
		name="description"
		content="Order coffee and fresh food online from The Coffee Lounge. Pickup in 15 minutes or delivery within 5 miles — free over $25."
	/>
	<link rel="canonical" href="{site.url}/order" />
</svelte:head>

<PageHero
	eyebrow="ORDER ONLINE"
	title="Your Coffee, Your Way"
	subtitle="Pickup in about 15 minutes, or delivery within 5 miles — free on orders over $25. This is a demo checkout: no payment is taken."
/>

<section class="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
	{#if placed && step === 3}
		<!-- Step 3: confirmation -->
		<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-12" role="status">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-800">
				<Check size={30} aria-hidden="true" />
			</span>
			<h2 class="mt-5 font-display text-3xl font-medium text-ink">Order confirmed, {name.split(' ')[0]}!</h2>
			<p class="mt-2 text-lg text-muted">{eta}.</p>
			<div class="mx-auto mt-6 max-w-md rounded-2xl bg-sand p-5 text-left">
				<p class="flex justify-between text-[0.95rem]"><span class="text-muted">Order reference</span><strong class="text-ink">{orderRef}</strong></p>
				<p class="mt-2 flex justify-between text-[0.95rem]"><span class="text-muted">Fulfilment</span><strong class="text-ink">{mode === 'pickup' ? `Pickup · ${locations.find((l) => l.id === locationId)?.name}` : 'Delivery'}</strong></p>
				<p class="mt-2 flex justify-between text-[0.95rem]"><span class="text-muted">Payment</span><strong class="text-ink">{payment === 'card' ? 'Card (mock)' : payment === 'upi' ? 'UPI (mock)' : 'Pay at counter'}</strong></p>
				<p class="mt-2 flex justify-between text-[0.95rem]"><span class="text-muted">Total paid</span><strong class="text-ink">{money(total)}</strong></p>
			</div>
			<p class="mt-5 text-sm text-muted">Show your order reference at the counter, or keep it for delivery. A confirmation email is on its way (mock).</p>
			<div class="mt-7 flex flex-wrap justify-center gap-3">
				<a href="/menu" class="inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">Order Something Else</a>
				<a href="/" class="inline-flex min-h-12 items-center rounded-full border border-coffee px-6 text-sm font-semibold text-coffee hover:bg-sand">Back to Home</a>
			</div>
		</div>
	{:else}
		<!-- Stepper -->
		<ol class="mb-8 flex items-center justify-center gap-2 text-sm font-semibold" aria-label="Checkout progress">
			{#each [{ n: 1, label: 'Your cart' }, { n: 2, label: 'Details & payment' }] as s}
				<li class="flex items-center gap-2">
					<span class="flex h-9 w-9 items-center justify-center rounded-full {step >= s.n ? 'bg-coffee text-white' : 'bg-sand text-muted'}">{s.n}</span>
					<span class={step >= s.n ? 'text-ink' : 'text-muted'}>{s.label}</span>
				</li>
				{#if s.n === 1}<li class="h-px w-10 bg-line sm:w-20" aria-hidden="true"></li>{/if}
			{/each}
		</ol>

		{#if step === 1}
			{#if cart.detailed.length === 0}
				<div class="rounded-3xl bg-white p-10 text-center ring-1 ring-line">
					<ShoppingBag size={40} class="mx-auto text-muted" aria-hidden="true" />
					<p class="mt-4 font-display text-xl font-semibold text-ink">Your cart is empty</p>
					<p class="mt-2 text-muted">Add something delicious from the menu first.</p>
					<a href="/menu" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">Browse the Menu</a>
				</div>
			{:else}
				<div class="grid gap-6 lg:grid-cols-[1fr_340px]">
					<ul class="divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
						{#each cart.detailed as line (line.item.slug)}
							<li class="flex items-center gap-3 px-5 py-4">
								<img src="/images/{line.item.image}-480.jpg" alt="" width="64" height="64" loading="lazy" decoding="async" class="h-16 w-16 shrink-0 rounded-2xl object-cover" />
								<div class="min-w-0 flex-1">
									<p class="truncate font-semibold text-ink">{line.item.name}</p>
									<p class="text-sm text-muted">{money(line.item.price)} each</p>
									<div class="mt-1.5 flex items-center gap-2">
										<button type="button" aria-label="Decrease quantity of {line.item.name}" onclick={() => cart.setQty(line.item.slug, line.qty - 1)} class="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink hover:border-coffee">−</button>
										<span class="min-w-6 text-center font-semibold">{line.qty}</span>
										<button type="button" aria-label="Increase quantity of {line.item.name}" onclick={() => cart.setQty(line.item.slug, line.qty + 1)} class="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink hover:border-coffee">+</button>
									</div>
								</div>
								<p class="font-semibold text-ink">{money(line.item.price * line.qty)}</p>
							</li>
						{/each}
					</ul>
					<div class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line">
						<h2 class="font-display text-lg font-semibold text-ink">Order summary</h2>
						<dl class="mt-4 space-y-2 text-[0.95rem]">
							<div class="flex justify-between"><dt class="text-muted">Subtotal</dt><dd class="font-semibold">{money(cart.subtotal)}</dd></div>
							<div class="flex justify-between"><dt class="text-muted">Tax (8.5%)</dt><dd class="font-semibold">{money(tax)}</dd></div>
							<div class="flex justify-between"><dt class="text-muted">Delivery</dt><dd class="font-semibold">{deliveryFee === 0 ? 'Free' : money(deliveryFee)}</dd></div>
							<div class="flex justify-between border-t border-line pt-2 text-base"><dt class="font-semibold">Total</dt><dd class="font-bold text-coffee">{money(total)}</dd></div>
						</dl>
						{#if mode === 'delivery' && cart.subtotal < FREE_DELIVERY_MIN}
							<p class="mt-3 text-xs text-muted">Free delivery over {money(FREE_DELIVERY_MIN)} — add {money(FREE_DELIVERY_MIN - cart.subtotal)} more.</p>
						{/if}
						<button type="button" onclick={() => { step = 2; window.scrollTo({ top: 0, behavior: 'smooth' }); }} class="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark">
							Continue to Details →
						</button>
					</div>
				</div>
			{/if}
		{:else}
			<form onsubmit={placeOrder} class="grid gap-6 lg:grid-cols-[1fr_340px]">
				<div class="space-y-6">
					<fieldset class="rounded-3xl bg-white p-6 ring-1 ring-line">
						<legend class="font-display text-lg font-semibold text-ink">Pickup or delivery?</legend>
						<div class="mt-4 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Fulfilment method">
							{#each [{ v: 'pickup', t: 'Pickup', d: 'Ready in ~15 min · Free' }, { v: 'delivery', t: 'Delivery', d: '30–40 min · $2.99, free over $25' }] as o}
								<button
									type="button"
									role="radio"
									aria-checked={mode === o.v}
									onclick={() => (mode = o.v as 'pickup' | 'delivery')}
									class="min-h-12 rounded-2xl border-2 p-4 text-left transition-colors duration-150 {mode === o.v ? 'border-coffee bg-sand' : 'border-line bg-white'}"
								>
									<span class="block font-semibold text-ink">{o.t}</span>
									<span class="mt-0.5 block text-sm text-muted">{o.d}</span>
								</button>
							{/each}
						</div>
						{#if mode === 'pickup'}
							<label class="mt-5 block text-sm font-semibold text-ink" for="pickup-location">Choose your café</label>
							<select id="pickup-location" bind:value={locationId} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base">
								{#each locations as l}<option value={l.id}>{l.name} — {l.address}</option>{/each}
							</select>
						{:else}
							<label class="mt-5 block text-sm font-semibold text-ink" for="delivery-address">Delivery address</label>
							<input id="delivery-address" type="text" bind:value={address} required placeholder="Street, apartment, city, ZIP" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
							<p class="mt-2 flex items-start gap-1.5 text-xs text-muted"><MapPin size={13} class="mt-0.5 shrink-0" aria-hidden="true" /> We deliver within 5 miles of each café.</p>
						{/if}
					</fieldset>

					<fieldset class="rounded-3xl bg-white p-6 ring-1 ring-line">
						<legend class="font-display text-lg font-semibold text-ink">Your details</legend>
						<div class="mt-4 grid gap-4 sm:grid-cols-2">
							<div>
								<label class="block text-sm font-semibold text-ink" for="order-name">Full name</label>
								<input id="order-name" type="text" bind:value={name} required autocomplete="name" placeholder="Alex Morgan" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
							</div>
							<div>
								<label class="block text-sm font-semibold text-ink" for="order-phone">Phone</label>
								<input id="order-phone" type="tel" bind:value={phone} required autocomplete="tel" placeholder="+1 (415) 555-0100" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
							</div>
						</div>
					</fieldset>

					<fieldset class="rounded-3xl bg-white p-6 ring-1 ring-line">
						<legend class="font-display text-lg font-semibold text-ink">Payment (mock — nothing is charged)</legend>
						<div class="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Payment method">
							{#each [{ v: 'card', t: 'Card' }, { v: 'upi', t: 'UPI' }, { v: 'cash', t: 'Pay at counter' }] as p}
								<button
									type="button"
									role="radio"
									aria-checked={payment === p.v}
									onclick={() => (payment = p.v as 'card' | 'upi' | 'cash')}
									class="min-h-12 rounded-full px-5 text-sm font-semibold transition-colors duration-150 {payment === p.v ? 'bg-coffee text-white' : 'border border-line bg-cream text-ink hover:border-coffee'}"
								>
									{p.t}
								</button>
							{/each}
						</div>
						{#if payment === 'card'}
							<label class="mt-4 block text-sm font-semibold text-ink" for="card-last4">Card number (demo — last 4 digits only)</label>
							<input id="card-last4" type="text" inputmode="numeric" maxlength="4" bind:value={cardLast4} placeholder="4242" class="mt-2 min-h-12 w-40 rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
							<p class="mt-2 text-xs text-muted">Demo checkout: enter any 4 digits. No real card details are collected or stored.</p>
						{:else if payment === 'upi'}
							<p class="mt-4 text-sm text-muted">You would be redirected to your UPI app in the real checkout. This demo skips that step.</p>
						{:else}
							<p class="mt-4 flex items-start gap-1.5 text-sm text-muted"><Clock size={15} class="mt-0.5 shrink-0" aria-hidden="true" /> Pay when you collect your order — card, cash or UPI at the counter.</p>
						{/if}
					</fieldset>
				</div>

				<div class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line">
					<h2 class="font-display text-lg font-semibold text-ink">Order summary</h2>
					<ul class="mt-3 space-y-1.5 text-[0.95rem] text-muted">
						{#each cart.detailed as line}<li class="flex justify-between gap-2"><span class="truncate">{line.qty} × {line.item.name}</span><span class="shrink-0 font-semibold text-ink">{money(line.item.price * line.qty)}</span></li>{/each}
					</ul>
					<dl class="mt-4 space-y-2 border-t border-line pt-4 text-[0.95rem]">
						<div class="flex justify-between"><dt class="text-muted">Subtotal</dt><dd class="font-semibold">{money(cart.subtotal)}</dd></div>
						<div class="flex justify-between"><dt class="text-muted">Tax (8.5%)</dt><dd class="font-semibold">{money(tax)}</dd></div>
						<div class="flex justify-between"><dt class="text-muted">Delivery</dt><dd class="font-semibold">{deliveryFee === 0 ? 'Free' : money(deliveryFee)}</dd></div>
						<div class="flex justify-between border-t border-line pt-2 text-base"><dt class="font-semibold">Total</dt><dd class="font-bold text-coffee">{money(total)}</dd></div>
					</dl>
					<button
						type="submit"
						disabled={!canContinue}
						class="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark disabled:cursor-not-allowed disabled:opacity-50"
					>
						Place Order · {money(total)}
					</button>
					<button type="button" onclick={() => (step = 1)} class="mt-2 flex min-h-12 w-full items-center justify-center rounded-full border border-coffee px-6 text-sm font-semibold text-coffee hover:bg-sand">
						← Back to cart
					</button>
				</div>
			</form>
		{/if}
	{/if}
</section>
