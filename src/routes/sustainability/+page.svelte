<script lang="ts">
	import { Check, Leaf, Recycle, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Sustainability — {site.name} | Sourcing, Compostables & Community</title>
	<meta name="description" content="How The Coffee Lounge sources coffee: named farms and co-ops, fair prices, compostable cups, oat milk by default, and beans roasted two blocks from the café." />
</svelte:head>

<PageHero
	eyebrow="SUSTAINABILITY"
	title="Good Coffee Shouldn't Cost the Earth"
	subtitle="We buy from six small farms we have worked with for years, roast two blocks from the café, and serve it in cups that compost — not landfill."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="overflow-hidden rounded-3xl ring-1 ring-line">
		<Picture name="coffee-beans" alt="Freshly roasted coffee beans spilling from a burlap sack" width={1600} height={800} sizes="(max-width: 1024px) 90vw, 1152px" imgClass="aspect-[2/1] h-auto w-full object-cover" pictureClass="block" />
	</div>
	<div class="mt-8 grid gap-6 md:grid-cols-3">
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
			<Leaf size={24} class="text-coffee" aria-hidden="true" />
			<h2 class="mt-3 font-display text-xl font-semibold text-ink">Sourcing ethics</h2>
			<ul class="mt-3 space-y-2 text-[0.95rem] text-muted">
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Named farms and co-operatives for every lot — see the origin story on each <a href="/shop" class="font-semibold text-coffee underline underline-offset-2">bean page</a>.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Prices above fair-trade minimums, paid on multi-year agreements, not spot auctions.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Every lot cupped before approval — if it tastes flat, it never makes it into the drum.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Spent grounds go to community gardens, not landfill.</li>
			</ul>
		</article>
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
			<Recycle size={24} class="text-coffee" aria-hidden="true" />
			<h2 class="mt-3 font-display text-xl font-semibold text-ink">Compostables & cups</h2>
			<ul class="mt-3 space-y-2 text-[0.95rem] text-muted">
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Compostable cups, lids and straws at all three cafés.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Oat milk is our default recommendation — and dairy-free milk is always free.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Bring your own cup: 25¢ off every drink, every day.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Beans roasted two blocks from Brew Street — the delivery is a hand cart, not a truck.</li>
			</ul>
		</article>
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
			<Users size={24} class="text-coffee" aria-hidden="true" />
			<h2 class="mt-3 font-display text-xl font-semibold text-ink">Community</h2>
			<ul class="mt-3 space-y-2 text-[0.95rem] text-muted">
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Day-old pastries go to the Maple City food bank, every evening.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Free meeting space for neighbourhood groups on weekday mornings.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> 1% of bean sales funds barista training for young people in the neighbourhood.</li>
				<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> Staff are paid above the city living wage, with SCA training paid for.</li>
			</ul>
		</article>
	</div>
	<div class="mt-8 rounded-3xl bg-coffee-dark p-6 text-cream sm:p-8">
		<h2 class="font-display text-2xl font-medium">Our 2027 goals</h2>
		<ul class="mt-3 space-y-2 leading-relaxed text-cream/80">
			<li>· 100% of single origins traceable to a named farm (currently 4 of 6 lots).</li>
			<li>· Zero single-use plastic in the cafés by June 2027.</li>
			<li>· 50% of takeaway drinks in reusable cups.</li>
		</ul>
		<p class="mt-4 text-sm text-cream/60">Mock goals for design review — real progress is reported here as it happens. Questions? Write to {site.email}.</p>
	</div>
</section>
