<script lang="ts">
	import { Check, Coffee, Truck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';

	let business = $state('');
	let email = $state('');
	let volume = $state('5–10 kg / week');
	let sent = $state(false);

	const enquire = (e: Event) => {
		e.preventDefault();
		if (business.trim() && email.includes('@')) sent = true;
	};
</script>

<svelte:head>
	<title>Wholesale Coffee — {site.name} | Beans for Cafés, Offices & Restaurants</title>
	<meta name="description" content="Wholesale Maple Roast and single-origin beans for cafés, offices and restaurants in Maple City. From 5 kg a week, roasted Tuesdays, delivered fresh." />
</svelte:head>

<PageHero
	eyebrow="WHOLESALE"
	title="Serve Our Coffee at Your Place"
	subtitle="Maple Roast and rotating single origins for cafés, offices, bakeries and restaurants — roasted Tuesdays, delivered fresh, with training included."
/>

<section class="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-3">
		{#each [
			{ icon: Coffee, title: 'Roasted to order', body: 'Every wholesale order is roasted on Tuesday and shipped or delivered the same week — never warehoused for months.' },
			{ icon: Truck, title: 'Free local delivery', body: 'Free delivery within Maple City on orders over 10 kg a week. US-wide shipping from $8, roasted to order.' },
			{ icon: Check, title: 'Training included', body: 'We dial in your grinder and train your team on the house recipe — free with any standing order over 5 kg a week.' }
		] as f}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-coffee"><f.icon size={22} aria-hidden="true" /></span>
				<h2 class="mt-4 font-display text-xl font-semibold text-ink">{f.title}</h2>
				<p class="mt-2 leading-relaxed text-muted">{f.body}</p>
			</article>
		{/each}
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-2">
		<div class="overflow-hidden rounded-3xl ring-1 ring-line">
			<Picture
				name="coffee-beans"
				alt="Freshly roasted coffee beans spilling from a burlap sack"
				width={1200}
				height={800}
				sizes="(max-width: 1024px) 90vw, 560px"
				imgClass="aspect-[3/2] h-full w-full object-cover"
				pictureClass="block h-full"
			/>
		</div>
		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Wholesale price guide (mock)</h2>
			<ul class="mt-4 space-y-3 text-[0.95rem]">
				{#each [['Maple Roast (house blend)', '$11.50 / lb · 11 lb bags (5 kg)'], ['Single origin of the week', '$13.50 / lb · 11 lb bags (5 kg)'], ['Cold brew concentrate, 5 L', '$42 / box'], ['Decaf Maple Roast', '$12.00 / lb · 11 lb bags (5 kg)']] as row}
					<li class="flex justify-between gap-3 border-b border-line/60 pb-3 last:border-0 last:pb-0"><span class="font-semibold text-ink">{row[0]}</span><span class="text-right text-muted">{row[1]}</span></li>
				{/each}
			</ul>
			<p class="mt-4 text-sm text-muted">Standing orders over 10 kg a week get 10% off list. Prices are mock, for design review.</p>
		</div>
	</div>

	<div class="mx-auto mt-8 max-w-2xl rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
		{#if sent}
			<p role="status" class="text-center font-display text-2xl font-medium text-ink">Thanks, {business}! We will email {email} with samples and a quote within 2 business days (mock).</p>
		{:else}
			<h2 class="font-display text-2xl font-medium text-ink">Start a wholesale account</h2>
			<form onsubmit={enquire} class="mt-5 space-y-4">
				<div>
					<label for="ws-business" class="block text-sm font-semibold text-ink">Business name</label>
					<input id="ws-business" type="text" required bind:value={business} placeholder="Your café, office or restaurant" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
				</div>
				<div>
					<label for="ws-email" class="block text-sm font-semibold text-ink">Email</label>
					<input id="ws-email" type="email" required bind:value={email} placeholder="you@business.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
				</div>
				<div>
					<label for="ws-volume" class="block text-sm font-semibold text-ink">Weekly volume</label>
					<select id="ws-volume" bind:value={volume} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base">
						{#each ['Under 5 kg / week', '5–10 kg / week', '10–25 kg / week', '25+ kg / week'] as v}<option value={v}>{v}</option>{/each}
					</select>
				</div>
				<button type="submit" class="flex min-h-12 w-full items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark">Request Samples & Quote</button>
				<p class="text-center text-xs text-muted">Demo form — nothing is sent. We include a free 250 g sample with every first quote.</p>
			</form>
		{/if}
	</div>
</section>
