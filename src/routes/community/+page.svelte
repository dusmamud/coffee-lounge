<script lang="ts">
	import { Camera, Heart } from '@lucide/svelte';
	import SocialIcon from '#lib/components/SocialIcon.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { galleryItems, site } from '#lib/data/site.ts';

	const feed = galleryItems.slice(0, 9);
</script>

<svelte:head>
	<title>Community — {site.name} | From Our Neighbourhood</title>
	<meta name="description" content="The Coffee Lounge community: our cafés, our regulars and our neighbourhood, in photos. Follow @thecoffeelounge and tag us to be featured." />
</svelte:head>

<PageHero
	eyebrow="COMMUNITY"
	title="From Our Neighbourhood"
	subtitle="Our cafés, our regulars and our roastery — in photos from the floor. Follow @thecoffeelounge and tag your cup to be featured here."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="flex flex-wrap items-center justify-between gap-3">
		<p class="flex items-center gap-2 text-[0.95rem] font-semibold text-ink"><span class="text-gold-dark"><SocialIcon name="instagram" size={18} /></span> @thecoffeelounge · updated weekly</p>
		<a href={site.instagram} target="_blank" rel="noopener" class="inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark">Follow on Instagram</a>
	</div>
	<div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
		{#each feed as item, i}
			<figure class="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
				<Picture name={item.image} alt={item.caption} width={800} height={800} sizes="(max-width: 768px) 45vw, 380px" imgClass="aspect-square h-auto w-full object-cover" pictureClass="block" />
				<figcaption class="flex items-start justify-between gap-2 p-4">
					<span class="text-sm leading-snug text-muted">{item.caption}</span>
					<span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-coffee"><Heart size={15} class="fill-red-500 text-red-500" aria-hidden="true" /> {120 + i * 37}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
	<div class="mt-8 grid gap-6 md:grid-cols-2">
		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
			<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink"><Camera size={20} class="text-gold-dark" aria-hidden="true" /> Get featured</h2>
			<p class="mt-2 leading-relaxed text-muted">Tag @thecoffeelounge and #coffeelounge on Instagram — our favourite photo each week wins a free drink, and the best of the month goes on the wall at Brew Street.</p>
		</div>
		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
			<h2 class="font-display text-xl font-semibold text-ink">Neighbourhood board</h2>
			<ul class="mt-3 space-y-2 text-[0.95rem] text-muted">
				<li>· Book Club Morning — first Saturday of the month, Maple Square.</li>
				<li>· Live Acoustic Fridays — every Friday, 6–8 PM, Brew Street. Free entry.</li>
				<li>· Roastery tours — Saturdays, 10 AM, Riverside. Book at the counter.</li>
			</ul>
			<a href="/events" class="mt-4 inline-flex min-h-12 items-center font-semibold text-coffee underline underline-offset-2">See All Events →</a>
		</div>
	</div>
</section>
