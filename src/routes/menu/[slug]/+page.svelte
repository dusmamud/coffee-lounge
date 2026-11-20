<script lang="ts">
	import { ArrowLeft, Check, Clock, Flame, Leaf, Plus } from '@lucide/svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import MenuCard from '#lib/components/MenuCard.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { menuItems, money, site } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const item = $derived(data.item);
	const related = $derived(
		menuItems.filter((m) => m.slug !== item.slug && m.category === item.category).slice(0, 3)
	);
	const isDrink = $derived(item.temp !== 'Food');
	let qty = $state(1);
	let added = $state(false);

	// Customisation (drinks only): size + milk are free choices, extras are paid.
	const sizes = [
		{ label: 'Small · 8 oz', delta: -0.5 },
		{ label: 'Regular · 12 oz', delta: 0 },
		{ label: 'Large · 16 oz', delta: 1.0 }
	] as const;
	const milks = ['Whole milk', 'Oat milk', 'Almond milk', 'Soy milk'] as const;
	const extras = [
		{ label: 'Extra shot', price: 1.0 },
		{ label: 'Vanilla syrup', price: 0.5 },
		{ label: 'Caramel drizzle', price: 0.5 },
		{ label: 'Whipped cream', price: 0.75 }
	] as const;
	let sizeIdx = $state(1);
	let milk = $state<(typeof milks)[number]>('Whole milk');
	let chosenExtras = $state<string[]>([]);
	const extrasTotal = $derived(
		extras.filter((e) => chosenExtras.includes(e.label)).reduce((n, e) => n + e.price, 0)
	);
	const unitPrice = $derived(
		isDrink ? item.price + sizes[sizeIdx].delta + extrasTotal : item.price
	);
	const optionsLabel = $derived(
		isDrink
			? [
					sizes[sizeIdx].label.split(' · ')[0],
					milk.replace(' milk', ''),
					...chosenExtras
				].join(' · ')
			: undefined
	);

	const addToCart = () => {
		if (isDrink) {
			const id = `${item.slug}|${sizeIdx}|${milk}|${chosenExtras.join('+')}`;
			cart.addLine(
				{ id, name: item.name, price: unitPrice, image: item.image, optionsLabel },
				qty
			);
		} else {
			for (let i = 0; i < qty; i++) cart.add(item.slug);
		}
		added = true;
		setTimeout(() => (added = false), 2000);
	};
</script>

<svelte:head>
	<title>{item.name} — {money(item.price)} | {site.name}</title>
	<meta name="description" content={item.short} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'MenuItem',
		name: item.name,
		description: item.long,
		offers: { '@type': 'Offer', price: item.price, priceCurrency: 'USD' },
		nutrition: { '@type': 'NutritionInformation', calories: `${item.calories} calories` }
	})}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<a href="/menu" class="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-coffee hover:text-gold-dark">
		<ArrowLeft size={16} aria-hidden="true" /> Back to Menu
	</a>

	<div class="mt-4 grid gap-10 lg:grid-cols-2">
		<div class="overflow-hidden rounded-[2rem]">
			<Picture
				name={item.image}
				alt={item.imageAlt}
				width={1200}
				height={1200}
				sizes="(max-width: 1024px) 90vw, 600px"
				eager
				imgClass="aspect-square h-auto w-full object-cover"
				pictureClass="block"
			/>
		</div>
		<div>
			<p class="text-xs font-bold tracking-[0.3em] text-gold-dark">{item.category.toUpperCase()} · {item.temp.toUpperCase()}</p>
			<h1 class="mt-3 font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-medium text-ink">{item.name}</h1>
			<p class="mt-3 font-display text-2xl font-semibold text-coffee">{money(unitPrice)}{#if isDrink && unitPrice !== item.price}<span class="ml-2 text-base font-normal text-muted line-through">{money(item.price)}</span>{/if}</p>
			<p class="mt-4 max-w-lg leading-relaxed text-muted">{item.long}</p>

			<div class="mt-5 flex flex-wrap gap-2 text-sm">
				<span class="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 font-semibold text-coffee">
					<Flame size={14} aria-hidden="true" /> {item.calories} cal
				</span>
				{#if item.veg}
					<span class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 font-semibold text-green-800">
						<Leaf size={14} aria-hidden="true" /> Vegetarian
					</span>
				{/if}
				<span class="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 font-semibold text-coffee">
					<Clock size={14} aria-hidden="true" /> Ready in ~5 min
				</span>
			</div>

			<h2 class="mt-7 font-display text-lg font-semibold text-ink">What is in it</h2>
			<ul class="mt-2 space-y-1.5">
				{#each item.ingredients as ing}
					<li class="flex items-start gap-2 text-[0.95rem] text-muted">
						<Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> {ing}
					</li>
				{/each}
			</ul>

			{#if isDrink}
				<fieldset class="mt-7">
					<legend class="font-display text-lg font-semibold text-ink">Size</legend>
					<div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Drink size">
						{#each sizes as s, i}
							<button
								type="button"
								role="radio"
								aria-checked={sizeIdx === i}
								onclick={() => (sizeIdx = i)}
								class="min-h-12 rounded-full px-4 text-sm font-semibold transition-colors duration-150 {sizeIdx === i ? 'bg-coffee text-white' : 'border border-line bg-white text-ink hover:border-coffee'}"
							>
								{s.label}{s.delta !== 0 ? ` (${s.delta > 0 ? '+' : ''}${money(s.delta)})` : ''}
							</button>
						{/each}
					</div>
				</fieldset>
				<fieldset class="mt-5">
					<legend class="font-display text-lg font-semibold text-ink">Milk — always free</legend>
					<div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Milk choice">
						{#each milks as m}
							<button
								type="button"
								role="radio"
								aria-checked={milk === m}
								onclick={() => (milk = m)}
								class="min-h-12 rounded-full px-4 text-sm font-semibold transition-colors duration-150 {milk === m ? 'bg-coffee text-white' : 'border border-line bg-white text-ink hover:border-coffee'}"
							>
								{m}
							</button>
						{/each}
					</div>
				</fieldset>
				<fieldset class="mt-5">
					<legend class="font-display text-lg font-semibold text-ink">Extras</legend>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each extras as e}
							<button
								type="button"
								aria-pressed={chosenExtras.includes(e.label)}
								onclick={() =>
									(chosenExtras = chosenExtras.includes(e.label)
										? chosenExtras.filter((x) => x !== e.label)
										: [...chosenExtras, e.label])}
								class="min-h-12 rounded-full px-4 text-sm font-semibold transition-colors duration-150 {chosenExtras.includes(e.label) ? 'bg-coffee text-white' : 'border border-line bg-white text-ink hover:border-coffee'}"
							>
								{e.label} +{money(e.price)}
							</button>
						{/each}
					</div>
				</fieldset>
			{:else}
				<h2 class="mt-6 font-display text-lg font-semibold text-ink">Make it yours</h2>
				<ul class="mt-2 flex flex-wrap gap-2">
					{#each item.options as opt}
						<li class="rounded-full border border-line bg-white px-3.5 py-2 text-sm text-ink">{opt}</li>
					{/each}
				</ul>
			{/if}
			<p class="mt-5 text-sm leading-relaxed text-muted">
				Allergens: {item.allergens.length > 0 ? item.allergens.join(', ') : 'None of the 14 major allergens'}.
				Full nutrition &amp; allergen table on the <a href="/nutrition" class="font-semibold text-coffee underline underline-offset-2">Nutrition page</a>.
			</p>

			<div class="mt-8 flex flex-wrap items-center gap-3">
				<div class="flex items-center rounded-full border border-line bg-white" role="group" aria-label="Quantity">
					<button type="button" aria-label="Decrease quantity" onclick={() => (qty = Math.max(1, qty - 1))} class="flex h-12 w-12 items-center justify-center rounded-full text-ink hover:text-coffee">−</button>
					<span class="min-w-8 text-center font-semibold" aria-label="Quantity {qty}">{qty}</span>
					<button type="button" aria-label="Increase quantity" onclick={() => (qty = Math.min(9, qty + 1))} class="flex h-12 w-12 items-center justify-center rounded-full text-ink hover:text-coffee">+</button>
				</div>
				<button
					type="button"
					onclick={addToCart}
					class="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-coffee px-6 text-base font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark sm:flex-none sm:px-8"
				>
					{#if added}<Check size={18} aria-hidden="true" /> Added to cart{:else}<Plus size={18} aria-hidden="true" /> Add to Order · {money(unitPrice * qty)}{/if}
				</button>
			</div>
			<p class="mt-3 text-sm text-muted">Dairy-free milk is always free. Tell us about allergies at the counter — we take them seriously.</p>
		</div>
	</div>

	{#if related.length > 0}
		<h2 class="mt-16 font-display text-2xl font-medium text-ink">You may also like</h2>
		<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each related as r}
				<MenuCard item={r} />
			{/each}
		</div>
	{/if}
</section>
