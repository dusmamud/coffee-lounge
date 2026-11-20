<script lang="ts">
	import FaqAccordion from '#lib/components/FaqAccordion.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { faqs, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>FAQ — {site.name} | Frequently Asked Questions</title>
	<meta
		name="description"
		content="Frequently asked questions about The Coffee Lounge: dairy-free options, ordering ahead, delivery, Wi-Fi, beans to take home and Coffee Loop points."
	/>
</svelte:head>

<PageHero
	eyebrow="FAQ"
	title="Frequently Asked Questions"
	subtitle="Everything guests usually ask — milk options, ordering ahead, delivery, Wi-Fi and Coffee Loop points."
/>

<section class="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
	<FaqAccordion items={faqs} />
	<p class="mt-8 rounded-3xl bg-sand p-6 text-center leading-relaxed text-muted">
		Still curious? Call us at
		<a href={site.phoneHref} class="font-semibold text-coffee underline underline-offset-2">{site.phoneDisplay}</a>
		or write to
		<a href="mailto:{site.email}" class="font-semibold break-all text-coffee underline underline-offset-2">{site.email}</a>.
	</p>
</section>
