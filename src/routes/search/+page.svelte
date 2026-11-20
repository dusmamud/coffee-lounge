<script lang="ts">
	import { ArrowRight, Search } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { blogPosts, brewGuides, events, locations, menuItems, shopProducts, site } from '#lib/data/site.ts';

	let q = $state('');
	let submitted = $state(false);

	$effect(() => {
		const params = new URLSearchParams(window.location.search);
		const initial = params.get('q') ?? '';
		if (initial) {
			q = initial;
			submitted = true;
		}
	});

	const needle = $derived(q.trim().toLowerCase());
	const dietary = $derived(
		needle === 'vegan'
			? menuItems.filter((m) => m.vegan)
			: needle === 'vegetarian' || needle === 'veg'
				? menuItems.filter((m) => m.veg)
				: needle === 'gluten-free' || needle === 'gluten free'
					? menuItems.filter((m) => m.glutenFree)
					: needle === 'nut-free' || needle === 'nut free'
						? menuItems.filter((m) => m.nutFree)
						: needle === 'dairy-free' || needle === 'dairy free'
							? menuItems.filter((m) => m.dairyFree)
							: []
	);
	const menuHits = $derived(
		needle
			? menuItems.filter((m) =>
					`${m.name} ${m.short} ${m.category} ${m.ingredients.join(' ')} ${m.veg ? 'veg vegetarian' : ''} ${m.vegan ? 'vegan' : ''} ${m.glutenFree ? 'gluten-free' : ''} ${m.nutFree ? 'nut-free' : ''} ${m.dairyFree ? 'dairy-free' : ''}`.toLowerCase().includes(needle)
				)
			: []
	);
	const guideHits = $derived(
		needle ? brewGuides.filter((g) => `${g.title} ${g.method} ${g.intro}`.toLowerCase().includes(needle)) : []
	);
	const shopHits = $derived(
		needle
			? shopProducts.filter((s) => `${s.name} ${s.short} ${s.kind} ${s.origin ?? ''} ${s.farm ?? ''}`.toLowerCase().includes(needle))
			: []
	);
	const blogHits = $derived(
		needle
			? blogPosts.filter((b) => `${b.title} ${b.excerpt} ${b.category}`.toLowerCase().includes(needle))
			: []
	);
	const eventHits = $derived(
		needle ? events.filter((e) => `${e.title} ${e.description}`.toLowerCase().includes(needle)) : []
	);
	const locationHits = $derived(
		needle ? locations.filter((l) => `${l.name} ${l.address}`.toLowerCase().includes(needle)) : []
	);
	const total = $derived(menuHits.length + blogHits.length + eventHits.length + locationHits.length + guideHits.length + shopHits.length);

	const search = (e: Event) => {
		e.preventDefault();
		submitted = true;
		const url = new URL(window.location.href);
		url.searchParams.set('q', q.trim());
		window.history.replaceState({}, '', url);
	};
</script>

<svelte:head>
	<title>Search — {site.name} | Menu, Blog, Events & Locations</title>
	<meta name="description" content="Search the Coffee Lounge menu, blog, events and cafés — find your drink, a brew guide or the nearest café." />
</svelte:head>

<PageHero
	eyebrow="SEARCH"
	title="Find Your Favourite"
	subtitle="Search the menu, brew guides, events and our three cafés — one box, everything we pour and do."
/>

<section class="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
	<form onsubmit={search} class="flex w-full gap-2" role="search">
		<label for="site-search" class="sr-only">Search the Coffee Lounge</label>
		<input
			id="site-search"
			type="search"
			bind:value={q}
			placeholder="Try “cappuccino”, “matcha”, “latte art”, “Riverside”…"
			class="min-h-14 min-w-0 flex-1 rounded-full border border-line bg-white px-5 text-base placeholder:text-muted"
		/>
		<button
			type="submit"
			class="inline-flex min-h-14 items-center gap-2 rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark"
		>
			<Search size={18} aria-hidden="true" /> Search
		</button>
	</form>

	{#if submitted && needle}
		<p class="mt-6 text-muted" role="status">
			{total} result{total === 1 ? '' : 's'} for “{q.trim()}”
		</p>
		{#if total === 0}
			<div class="mt-6 rounded-3xl bg-white p-8 text-center ring-1 ring-line">
				<p class="font-display text-xl font-semibold text-ink">Nothing matched that — yet</p>
				<p class="mt-2 text-muted">
					Try a drink name, an ingredient, or a café. Or browse the full menu — the cappuccino is
					always a safe bet.
				</p>
				<a href="/menu" class="mt-5 inline-flex min-h-12 items-center gap-1 rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">
					Browse the Menu <ArrowRight size={16} aria-hidden="true" />
				</a>
			</div>
		{:else}
			<div class="mt-6 space-y-8">
				{#if menuHits.length > 0}
					<div>
						<h2 class="font-display text-xl font-semibold text-ink">Menu · {menuHits.length}</h2>
						<ul class="mt-3 divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
							{#each menuHits as m}
								<li>
									<a href="/menu/{m.slug}" class="flex items-center justify-between gap-3 px-5 py-4 hover:bg-sand/60">
										<span><span class="block font-semibold text-ink">{m.name}</span><span class="block text-sm text-muted">{m.short}</span></span>
										<span class="shrink-0 font-semibold text-coffee">${m.price.toFixed(2)}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if blogHits.length > 0}
					<div>
						<h2 class="font-display text-xl font-semibold text-ink">From the Blog · {blogHits.length}</h2>
						<ul class="mt-3 space-y-3">
							{#each blogHits as b}
								<li>
									<a href="/blog/{b.slug}" class="block rounded-3xl bg-white p-5 ring-1 ring-line hover:shadow-md">
										<span class="block font-semibold text-ink">{b.title}</span>
										<span class="mt-1 block text-sm text-muted">{b.excerpt}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if eventHits.length > 0}
					<div>
						<h2 class="font-display text-xl font-semibold text-ink">Events · {eventHits.length}</h2>
						<ul class="mt-3 space-y-3">
							{#each eventHits as e}
								<li>
									<a href="/events/{e.id}" class="block rounded-3xl bg-white p-5 ring-1 ring-line hover:shadow-md">
										<span class="block font-semibold text-ink">{e.title}</span>
										<span class="mt-1 block text-sm text-muted">{e.date} · {e.location} · {e.price}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if locationHits.length > 0}
					<div>
						<h2 class="font-display text-xl font-semibold text-ink">Cafés · {locationHits.length}</h2>
						<ul class="mt-3 space-y-3">
							{#each locationHits as l}
								<li>
									<a href="/locations/{l.id}" class="block rounded-3xl bg-white p-5 ring-1 ring-line hover:shadow-md">
										<span class="block font-semibold text-ink">{l.name}</span>
										<span class="mt-1 block text-sm text-muted">{l.address} · {l.hours}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if guideHits.length > 0}
					<div>
						<h2 class="font-display text-xl font-semibold text-ink">Brew Guides · {guideHits.length}</h2>
						<ul class="mt-3 space-y-3">
							{#each guideHits as g}
								<li>
									<a href="/brew-guides" class="block rounded-3xl bg-white p-5 ring-1 ring-line hover:shadow-md">
										<span class="block font-semibold text-ink">{g.title}</span>
										<span class="mt-1 block text-sm text-muted">{g.method} · {g.time} · {g.difficulty}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if shopHits.length > 0}
					<div>
						<h2 class="font-display text-xl font-semibold text-ink">Shop · {shopHits.length}</h2>
						<ul class="mt-3 divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
							{#each shopHits as s}
								<li>
									<a href="/shop/{s.id}" class="flex items-center justify-between gap-3 px-5 py-4 hover:bg-sand/60">
										<span><span class="block font-semibold text-ink">{s.name}</span><span class="block text-sm text-muted">{s.short}</span></span>
										<span class="shrink-0 font-semibold text-coffee">${s.price.toFixed(2)}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		{/if}
	{:else}
		<div class="mt-8">
			<h2 class="font-display text-xl font-semibold text-ink">Popular right now</h2>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each ['Cappuccino', 'Cold brew', 'Matcha', 'Croissant', 'Latte art', 'Riverside', 'Vegan', 'Beans'] as term}
					<button
						type="button"
						onclick={() => {
							q = term;
							submitted = true;
						}}
						class="min-h-12 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink hover:border-coffee"
					>
						{term}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</section>
