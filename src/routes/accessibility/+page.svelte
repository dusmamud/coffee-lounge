<script lang="ts">
	import { Accessibility, Ear, Eye, Hand, MapPin, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { locations, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Accessibility — {site.name} | Step-Free Access, Assistance & More</title>
	<meta name="description" content="The Coffee Lounge is step-free at all three cafés, with accessible washrooms, large-print menus, hearing-loop seating and staff trained to help." />
	<link rel="canonical" href="{site.url}/accessibility" />
</svelte:head>

<PageHero
	eyebrow="ACCESSIBILITY"
	title="Everyone Is Welcome Here"
	subtitle="Step-free entry at all three cafés, accessible washrooms, large-print and screen-reader-friendly menus, and staff who are glad to help."
/>

<section class="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-2">
		{#each [
			{ icon: Accessibility, title: 'Step-free everywhere', body: 'All three cafés have level entrances with no steps, wide doorways (36 in+), and step-free routes to the counter, seating and washrooms. Brew Street and Riverside have automatic doors; Maple Square has a push-button door.' },
			{ icon: Eye, title: 'Seeing the menu', body: 'Large-print menus are at every counter — just ask. This website works with screen readers, supports keyboard navigation throughout, and meets WCAG 2.2 AA contrast. Tell us your order and we will read the board aloud, happily.' },
			{ icon: Ear, title: 'Hearing assistance', body: 'Brew Street and Riverside have a hearing loop at the counter and in the events corner. Our baristas are trained to face you, speak clearly and write your order down if that helps. Live music nights keep the volume low by design.' },
			{ icon: Hand, title: 'Service animals & assistance', body: 'Service animals are welcome in all seating areas, with water bowls at the counter on request. If you need a hand carrying a tray to your table, flag any team member — it is the best part of the job.' }
		] as f}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-coffee"><f.icon size={22} aria-hidden="true" /></span>
				<h2 class="mt-4 font-display text-xl font-semibold text-ink">{f.title}</h2>
				<p class="mt-2 leading-relaxed text-muted">{f.body}</p>
			</article>
		{/each}
	</div>

	<div class="mt-8 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
		<h2 class="font-display text-xl font-semibold text-ink">By location</h2>
		<ul class="mt-4 space-y-3">
			{#each locations as l}
				<li class="flex flex-wrap items-start justify-between gap-2 border-b border-line/60 pb-3 last:border-0 last:pb-0">
					<span class="flex items-start gap-2 text-[0.95rem] text-ink"><MapPin size={16} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" /><span><strong>{l.name}</strong><span class="block text-muted">{l.address}</span></span></span>
					<span class="text-sm text-muted">{l.seating}</span>
				</li>
			{/each}
		</ul>
		<p class="mt-5 text-[0.95rem] leading-relaxed text-muted">
			Accessible parking is available on Brew Street (2 bays, 30 ft from the door) and at Riverside
			(3 bays). Maple Square uses the public garage across the square, which has an elevator to
			street level.
		</p>
	</div>

	<div class="mt-8 rounded-3xl bg-coffee-dark p-6 text-center text-cream sm:p-8">
		<h2 class="font-display text-2xl font-medium">Something we can do better?</h2>
		<p class="mx-auto mt-2 max-w-lg text-cream/75">
			If anything about our cafés or this website is hard to use, tell us — we fix access issues
			first, before anything else on the list.
		</p>
		<a href="tel:+14159876543" class="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-cream px-6 text-base font-semibold text-coffee-dark hover:bg-white">
			<Phone size={17} aria-hidden="true" /> {site.phoneDisplay}
		</a>
	</div>
</section>
