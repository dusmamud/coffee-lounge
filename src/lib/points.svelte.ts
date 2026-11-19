// Coffee Loop points (mock, client-side only). 1 point per $1 spent.
// Persisted to localStorage so the loyalty page can show a real balance
// and progress after a mock order is placed.
const STORAGE_KEY = 'coffee-lounge-points';

class Points {
	balance = $state(0);

	constructor() {
		if (typeof window !== 'undefined') {
			try {
				const raw = window.localStorage.getItem(STORAGE_KEY);
				if (raw) this.balance = Math.max(0, Number.parseInt(raw, 10) || 0);
			} catch {
				this.balance = 0;
			}
		}
	}

	private save() {
		if (typeof window !== 'undefined') {
			try {
				window.localStorage.setItem(STORAGE_KEY, String(this.balance));
			} catch {
				/* ignore */
			}
		}
	}

	earn(amountDollars: number) {
		const earned = Math.max(0, Math.floor(amountDollars));
		if (earned > 0) {
			this.balance += earned;
			this.save();
		}
		return earned;
	}

	redeem(cost: number): boolean {
		if (this.balance < cost) return false;
		this.balance -= cost;
		this.save();
		return true;
	}

	tier = $derived(this.balance >= 250 ? 'Reserve' : this.balance >= 100 ? 'Roast' : 'Bean');
	nextTierAt = $derived(this.balance >= 250 ? null : this.balance >= 100 ? 250 : 100);
	progressToNext = $derived(
		this.nextTierAt === null
			? 100
			: this.balance >= 100
				? Math.min(100, ((this.balance - 100) / 150) * 100)
				: Math.min(100, (this.balance / 100) * 100)
	);
}

export const points = new Points();
