<script lang="ts">
	import { Leaf } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { menuItems, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Nutrition & Allergens — {site.name} | Calories & Allergen Guide</title>
	<meta name="description" content="Calories and allergens for every Coffee Lounge drink and dish. Dairy-free milk is always free, and our team takes allergies seriously." />
	<link rel="canonical" href="{site.url}/nutrition" />
</svelte:head>

<PageHero
	eyebrow="NUTRITION & ALLERGENS"
	title="Know What Is in Your Cup"
	subtitle="Calories and the 14 major allergens for everything on the menu. Values are for the regular size with whole milk, unless noted."
/>

<section class="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="overflow-x-auto rounded-3xl bg-white ring-1 ring-line">
		<table class="w-full min-w-[560px] text-left text-[0.95rem]">
			<caption class="sr-only">Calories and allergens for each menu item</caption>
			<thead>
				<tr class="border-b border-line bg-sand/60">
					<th scope="col" class="px-5 py-4 font-display text-base font-semibold text-ink">Item</th>
					<th scope="col" class="px-5 py-4 font-semibold text-ink">Category</th>
					<th scope="col" class="px-5 py-4 font-semibold text-ink">Calories</th>
					<th scope="col" class="px-5 py-4 font-semibold text-ink">Allergens</th>
				</tr>
			</thead>
			<tbody>
				{#each menuItems as m}
					<tr class="border-b border-line/60 last:border-0">
						<th scope="row" class="px-5 py-4">
							<a href="/menu/{m.slug}" class="font-semibold text-ink hover:text-gold-dark">{m.name}</a>
							{#if m.veg}<span class="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-green-800"><Leaf size={13} aria-hidden="true" /> Veg</span>{/if}
						</th>
						<td class="px-5 py-4 text-muted">{m.category}</td>
						<td class="px-5 py-4 font-semibold text-ink">{m.calories} cal</td>
						<td class="px-5 py-4 text-muted">{m.allergens.length > 0 ? m.allergens.join(', ') : 'None'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-8 grid gap-6 md:grid-cols-2">
		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
			<h2 class="font-display text-xl font-semibold text-ink">Dairy-free, always free</h2>
			<p class="mt-2 leading-relaxed text-muted">
				Oat, almond and soy milk cost nothing extra in any drink. Oat is our baristas' pick for
				lattes and matcha — it steams the silkiest. Ask for any milk swap at the counter or in the
				drink customiser on each menu page.
			</p>
		</div>
		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
			<h2 class="font-display text-xl font-semibold text-ink">Allergies? Tell us first</h2>
			<p class="mt-2 leading-relaxed text-muted">
				Our kitchen handles milk, wheat, egg, tree nuts, peanuts and soy, so traces can occur even
				in items that do not list them. Tell the barista about any allergy before ordering and we
				will change gloves, use clean pitchers and flag your cup. If in doubt, ask — we would
				rather remake a drink than risk a reaction.
			</p>
		</div>
	</div>
	<p class="mt-6 text-sm text-muted">
		Nutrition values are mock estimates for design review, calculated for the regular size as served.
		Sweetness, extra shots and syrups change the numbers — ask at the counter for a specific build.
	</p>
</section>
