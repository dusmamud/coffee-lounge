<script lang="ts">
	import { Search } from '@lucide/svelte';
	import MenuCard from '#lib/components/MenuCard.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { menuCategories, menuItems, menuTemps, site } from '#lib/data/site.ts';

	let query = $state('');
	let category = $state<string>('All');
	let temp = $state<string>('All');
	let vegOnly = $state(false);
	let veganOnly = $state(false);
	let glutenFreeOnly = $state(false);
	let nutFreeOnly = $state(false);
	let dairyFreeOnly = $state(false);
	let sort = $state<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

	const filtered = $derived.by(() => {
		let list = menuItems.filter((m) => {
			if (category !== 'All' && m.category !== category) return false;
			if (temp !== 'All' && m.temp !== temp) return false;
			if (vegOnly && !m.veg) return false;
			if (veganOnly && !m.vegan) return false;
			if (glutenFreeOnly && !m.glutenFree) return false;
			if (nutFreeOnly && !m.nutFree) return false;
			if (dairyFreeOnly && !m.dairyFree) return false;
			if (query.trim()) {
				const q = query.trim().toLowerCase();
				if (!(m.name + ' ' + m.short + ' ' + m.long).toLowerCase().includes(q)) return false;
			}
			return true;
		});
		if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
		if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
		if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
		return list;
	});
</script>

<svelte:head>
	<title>Menu — {site.name} | Coffee, Tea & Fresh Food in Maple City</title>
	<meta
		name="description"
		content="Browse the Coffee Lounge menu: signature coffees, matcha, cold brew and fresh-baked food. Search, filter by hot or cold, and sort by price."
	/>
</svelte:head>

<PageHero
	eyebrow="OUR MENU"
	title="Coffee, Tea & Fresh Bites"
	subtitle="Everything is made to order at the counter. Prices are shown before tax — 8.5% tax is added at checkout. Dairy-free milk is always free."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<!-- Filters -->
	<div class="rounded-3xl bg-white p-4 ring-1 ring-line sm:p-5">
		<div class="flex flex-col gap-3 lg:flex-row lg:items-center">
			<label class="relative flex-1">
				<span class="sr-only">Search the menu</span>
				<Search size={18} class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden="true" />
				<input
					type="search"
					bind:value={query}
					placeholder="Search drinks & food…"
					class="min-h-12 w-full rounded-full border border-line bg-cream py-3 pr-4 pl-11 text-base text-ink placeholder:text-muted"
				/>
			</label>
			<div class="flex flex-wrap items-center gap-2">
				<label class="flex min-h-12 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-ink">
					<input type="checkbox" bind:checked={vegOnly} class="h-6 w-6 accent-[#5c3a21]" />
					Veg only
				</label>
				{#each [{ l: 'Vegan', k: 'vegan', v: veganOnly }, { l: 'Gluten-free', k: 'gf', v: glutenFreeOnly }, { l: 'Nut-free', k: 'nf', v: nutFreeOnly }, { l: 'Dairy-free', k: 'df', v: dairyFreeOnly }] as f}
					<button
						type="button"
						aria-pressed={f.v}
						onclick={() => {
							if (f.k === 'vegan') veganOnly = !veganOnly;
							if (f.k === 'gf') glutenFreeOnly = !glutenFreeOnly;
							if (f.k === 'nf') nutFreeOnly = !nutFreeOnly;
							if (f.k === 'df') dairyFreeOnly = !dairyFreeOnly;
						}}
						class="min-h-12 rounded-full border px-4 text-sm font-semibold transition-colors duration-150 {f.v ? 'border-coffee bg-coffee text-white' : 'border-line bg-cream text-ink hover:border-coffee'}"
					>
						{f.l}
					</button>
				{/each}
				<label class="flex min-h-12 items-center gap-2 text-sm font-semibold text-ink">
					<span class="sr-only">Sort by price</span>
					<select bind:value={sort} class="min-h-12 rounded-full border border-line bg-cream px-4 text-sm font-semibold text-ink">
						<option value="featured">Featured</option>
						<option value="price-asc">Price: low to high</option>
						<option value="price-desc">Price: high to low</option>
						<option value="name">Name A–Z</option>
					</select>
				</label>
			</div>
		</div>
		<div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
			{#each menuCategories as c}
				<button
					type="button"
					aria-pressed={category === c}
					onclick={() => (category = c)}
					class="min-h-12 rounded-full px-5 text-sm font-semibold transition-colors duration-150 {category === c
						? 'bg-coffee text-white'
						: 'border border-line bg-cream text-ink hover:border-coffee'}"
				>
					{c}
				</button>
			{/each}
		</div>
		<div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by temperature">
			{#each menuTemps as t}
				<button
					type="button"
					aria-pressed={temp === t}
					onclick={() => (temp = t)}
					class="min-h-12 rounded-full px-4 text-sm font-semibold transition-colors duration-150 {temp === t
						? 'bg-gold-dark text-white'
						: 'border border-line bg-cream text-ink hover:border-gold-dark'}"
				>
					{t === 'All' ? 'Any temperature' : t}
				</button>
			{/each}
		</div>
	</div>

	<p class="mt-6 text-sm text-muted" role="status">
		Showing {filtered.length} of {menuItems.length} items
		{#if query} for “{query}”{/if}
	</p>

	{#if filtered.length === 0}
		<div class="mt-6 rounded-3xl bg-white p-10 text-center ring-1 ring-line">
			<p class="font-display text-xl font-semibold text-ink">Nothing matched that search</p>
			<p class="mt-2 text-muted">Try a different word, or clear the filters to see the full menu.</p>
			<button
				type="button"
				onclick={() => { query = ''; category = 'All'; temp = 'All'; vegOnly = false; veganOnly = false; glutenFreeOnly = false; nutFreeOnly = false; dairyFreeOnly = false; }}
				class="mt-5 inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark"
			>
				Clear all filters
			</button>
		</div>
	{:else}
		<div class="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filtered as item (item.slug)}
				<MenuCard {item} />
			{/each}
		</div>
	{/if}
</section>
