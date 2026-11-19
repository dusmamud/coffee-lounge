// Shared cart state (client-side only, module scope is fine: no SSR data).
// Persisted to localStorage, guarded for SSR/prerender.
import { menuItems } from '#lib/data/site.ts';

export type CartLine = { slug: string; qty: number };

class Cart {
	lines = $state<CartLine[]>([]);
	drawerOpen = $state(false);

	constructor() {
		if (typeof window !== 'undefined') {
			try {
				const raw = window.localStorage.getItem('coffee-lounge-cart');
				if (raw) this.lines = JSON.parse(raw) as CartLine[];
			} catch {
				this.lines = [];
			}
		}
	}

	private save() {
		if (typeof window !== 'undefined') {
			try {
				window.localStorage.setItem('coffee-lounge-cart', JSON.stringify(this.lines));
			} catch {
				/* storage unavailable — cart still works in memory */
			}
		}
	}

	add(slug: string) {
		const line = this.lines.find((l) => l.slug === slug);
		if (line) line.qty += 1;
		else this.lines.push({ slug, qty: 1 });
		this.save();
		this.drawerOpen = true;
	}

	remove(slug: string) {
		this.lines = this.lines.filter((l) => l.slug !== slug);
		this.save();
	}

	setQty(slug: string, qty: number) {
		if (qty <= 0) return this.remove(slug);
		const line = this.lines.find((l) => l.slug === slug);
		if (line) line.qty = qty;
		this.save();
	}

	clear() {
		this.lines = [];
		this.save();
	}

	count = $derived(this.lines.reduce((n, l) => n + l.qty, 0));

	detailed = $derived(
		this.lines
			.map((l) => ({ item: menuItems.find((m) => m.slug === l.slug), qty: l.qty }))
			.filter((d): d is { item: (typeof menuItems)[number]; qty: number } => Boolean(d.item))
	);

	subtotal = $derived(
		this.detailed.reduce((n, d) => n + d.item.price * d.qty, 0)
	);
}

export const cart = new Cart();
