<script lang="ts">
	import { Minus, Plus, ShoppingBag, Trash2, X } from '@lucide/svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import Picture from '#lib/components/Picture.svelte';
	import { DELIVERY_FEE, FREE_DELIVERY_MIN, money } from '#lib/data/site.ts';

	const freeDeliveryProgress = $derived(
		Math.min(100, (cart.subtotal / FREE_DELIVERY_MIN) * 100)
	);
	const remaining = $derived(Math.max(0, FREE_DELIVERY_MIN - cart.subtotal));
</script>

{#if cart.drawerOpen}
	<div
		class="fixed inset-0 z-[70] bg-coffee-dark/50"
		role="presentation"
		onclick={() => (cart.drawerOpen = false)}
		aria-hidden="true"
	></div>
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Your cart"
		class="fixed top-0 right-0 z-[71] flex h-dvh w-full max-w-md flex-col bg-cream shadow-2xl"
	>
		<div class="flex min-h-16 items-center justify-between border-b border-line px-5">
			<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink">
				<ShoppingBag size={20} aria-hidden="true" /> Your Order
			</h2>
			<button
				type="button"
				aria-label="Close cart"
				onclick={() => (cart.drawerOpen = false)}
				class="flex h-12 w-12 items-center justify-center rounded-full text-ink hover:text-gold-dark"
			>
				<X size={22} aria-hidden="true" />
			</button>
		</div>

		{#if cart.detailed.length === 0}
			<div class="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
				<ShoppingBag size={40} class="text-muted" aria-hidden="true" />
				<p class="font-display text-xl font-semibold text-ink">Your cart is empty</p>
				<p class="text-[0.95rem] text-muted">Add a cappuccino, a croissant — or both. You know you want to.</p>
				<a
					href="/menu"
					onclick={() => (cart.drawerOpen = false)}
					class="mt-2 inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark"
				>
					Browse the Menu
				</a>
			</div>
		{:else}
			<div class="border-b border-line px-5 py-4">
				{#if remaining > 0}
					<p class="text-sm text-muted">
						Add <strong class="text-ink">{money(remaining)}</strong> more for free delivery
					</p>
				{:else}
					<p class="text-sm font-semibold text-coffee">You have unlocked free delivery!</p>
				{/if}
				<div class="mt-2 h-2 overflow-hidden rounded-full bg-sand-deep" role="progressbar" aria-valuenow={Math.round(freeDeliveryProgress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to free delivery">
					<div class="h-full rounded-full bg-coffee transition-[width] duration-300" style="width: {freeDeliveryProgress}%"></div>
				</div>
				<p class="mt-1.5 text-xs text-muted">Free delivery on orders of {money(FREE_DELIVERY_MIN)}+ · Delivery fee {money(DELIVERY_FEE)} otherwise</p>
			</div>

			<ul class="flex-1 divide-y divide-line overflow-y-auto px-5">
				{#each cart.detailed as line (line.id)}
					<li class="flex items-center gap-3 py-4">
						<Picture
							name={line.image}
							alt=""
							width={480}
							height={480}
							sizes="64px"
							imgClass="h-16 w-16 shrink-0 rounded-2xl object-cover"
							pictureClass="shrink-0"
						/>
						<div class="min-w-0 flex-1">
							<p class="truncate font-semibold text-ink">{line.name}</p>
							{#if line.optionsLabel}
								<p class="truncate text-xs text-muted">{line.optionsLabel}</p>
							{/if}
							<p class="text-sm text-muted">{money(line.price)} each</p>
							<div class="mt-1.5 flex items-center gap-2">
								<button
									type="button"
									aria-label="Decrease quantity of {line.name}"
									onclick={() => cart.setQty(line.id, line.qty - 1)}
									class="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink hover:border-coffee"
								>
									<Minus size={16} aria-hidden="true" />
								</button>
								<span class="min-w-6 text-center font-semibold" aria-label="Quantity {line.qty}">{line.qty}</span>
								<button
									type="button"
									aria-label="Increase quantity of {line.name}"
									onclick={() => cart.setQty(line.id, line.qty + 1)}
									class="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink hover:border-coffee"
								>
									<Plus size={16} aria-hidden="true" />
								</button>
							</div>
						</div>
						<div class="flex flex-col items-end gap-2">
							<p class="font-semibold text-ink">{money(line.price * line.qty)}</p>
							<button
								type="button"
								aria-label="Remove {line.name} from cart"
								onclick={() => cart.remove(line.id)}
								class="flex h-12 w-12 items-center justify-center rounded-full text-muted hover:text-red-700"
							>
								<Trash2 size={17} aria-hidden="true" />
							</button>
						</div>
					</li>
				{/each}
			</ul>

			<div class="border-t border-line px-5 py-4">
				<p class="flex justify-between text-[0.95rem] text-muted">
					<span>Subtotal</span><span class="font-semibold text-ink">{money(cart.subtotal)}</span>
				</p>
				<p class="mt-1 text-xs text-muted">Taxes and delivery calculated at checkout.</p>
				<a
					href="/order"
					onclick={() => (cart.drawerOpen = false)}
					class="mt-4 flex min-h-12 items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark"
				>
					Checkout · {money(cart.subtotal)}
				</a>
			</div>
		{/if}
	</div>
{/if}
