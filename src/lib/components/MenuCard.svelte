<script lang="ts">
	import { ArrowRight, Leaf, Plus } from '@lucide/svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { money, type MenuItem } from '#lib/data/site.ts';
	import Picture from './Picture.svelte';

	let { item }: { item: MenuItem } = $props();
</script>

<article class="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-lg">
	<a href="/menu/{item.slug}" class="block overflow-hidden" aria-label="View {item.name}">
		<Picture
			name={item.image}
			alt={item.imageAlt}
			width={800}
			height={800}
			sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
			imgClass="aspect-square h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
			pictureClass="block"
		/>
	</a>
	<div class="flex flex-1 flex-col p-4 sm:p-5">
		<div class="flex items-start justify-between gap-2">
			<h3 class="font-display text-lg leading-snug font-semibold text-ink">
				<a href="/menu/{item.slug}" class="hover:text-gold-dark">{item.name}</a>
			</h3>
			<p class="shrink-0 font-display text-lg font-semibold text-coffee">{money(item.price)}</p>
		</div>
		<p class="mt-1.5 flex-1 text-[0.95rem] leading-relaxed text-muted">{item.short}</p>
		<p class="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
			<span class="rounded-full bg-sand px-2.5 py-1 text-coffee">{item.temp}</span>
			<span class="rounded-full bg-sand px-2.5 py-1 text-coffee">{item.category}</span>
			{#if item.veg}
				<span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-green-800">
					<Leaf size={12} aria-hidden="true" /> Veg
				</span>
			{/if}
		</p>
		<div class="mt-4 flex gap-2">
			<a
				href="/menu/{item.slug}"
				class="inline-flex min-h-12 flex-1 items-center justify-center gap-1 rounded-full border border-coffee px-4 text-sm font-semibold text-coffee transition-colors duration-150 hover:bg-sand"
			>
				View <ArrowRight size={15} aria-hidden="true" />
			</a>
			<button
				type="button"
				onclick={() => cart.add(item.slug)}
				aria-label="Add {item.name} to cart"
				class="inline-flex min-h-12 flex-1 items-center justify-center gap-1 rounded-full bg-coffee px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-coffee-dark"
			>
				<Plus size={16} aria-hidden="true" /> Add
			</button>
		</div>
	</div>
</article>
