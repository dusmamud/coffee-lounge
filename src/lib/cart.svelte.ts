// Shared cart state (client-side only, module scope is fine: no SSR data).
// Persisted to localStorage, guarded for SSR/prerender.
// Lines are generic so menu drinks (with size/milk/extras customisation),
// shop beans and merch all share one cart. `id` is unique per customisation.
import { menuItems } from '#lib/data/site.ts';

export type CartLine = {
	id: string;
	name: string;
	price: number; // unit price after customisation
	image: string; // Picture.svelte base name
	qty: number;
	optionsLabel?: string; // e.g. "Large · Oat milk · Extra shot"
};

const STORAGE_KEY = 'coffee-lounge-cart';

class Cart {
	lines = $state<CartLine[]>([]);
	drawerOpen = $state(false);

	constructor() {
		if (typeof window !== 'undefined') {
			try {
				const raw = window.localStorage.getItem(STORAGE_KEY);
				if (raw) {
					const parsed = JSON.parse(raw) as CartLine[];
					if (Array.isArray(parsed)) this.lines = parsed.filter((l) => l && l.id && l.qty > 0);
				}
			} catch {
				this.lines = [];
			}
		}
	}

	private save() {
		if (typeof window !== 'undefined') {
			try {
				window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lines));
			} catch {
				/* storage unavailable — cart still works in memory */
			}
		}
	}

	/** Add a fully-specified line (menu customisation, shop product). Merges on identical id. */
	addLine(line: Omit<CartLine, 'qty'>, qty = 1) {
		const existing = this.lines.find((l) => l.id === line.id);
		if (existing) existing.qty += qty;
		else this.lines.push({ ...line, qty });
		this.save();
		this.drawerOpen = true;
	}

	/** Plain menu add (base price, no customisation) — used by cards and bestsellers. */
	add(slug: string) {
		const item = menuItems.find((m) => m.slug === slug);
		if (!item) return;
		this.addLine({ id: slug, name: item.name, price: item.price, image: item.image });
	}

	remove(id: string) {
		this.lines = this.lines.filter((l) => l.id !== id);
		this.save();
	}

	setQty(id: string, qty: number) {
		if (qty <= 0) return this.remove(id);
		const line = this.lines.find((l) => l.id === id);
		if (line) line.qty = qty;
		this.save();
	}

	clear() {
		this.lines = [];
		this.save();
	}

	count = $derived(this.lines.reduce((n, l) => n + l.qty, 0));

	/** Back-compat alias: the order page and drawer iterate `detailed`. */
	detailed = $derived(this.lines);

	subtotal = $derived(this.lines.reduce((n, l) => n + l.price * l.qty, 0));
}

export const cart = new Cart();
