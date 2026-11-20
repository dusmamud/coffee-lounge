<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { firstVisitSteps, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Your First Visit — {site.name} | What to Expect</title>
	<meta name="description" content="First time at The Coffee Lounge? No booking needed, order at the counter or ahead, pick your spot and stay as long as you like. Here is how it works." />
</svelte:head>

<PageHero
	eyebrow="FIRST VISIT"
	title="New Here? Start Here"
	subtitle="No booking, no dress code, no coffee knowledge required. Six small steps, and the Lounge is yours."
/>

<section class="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
	<ol class="space-y-4">
		{#each firstVisitSteps as step, i}
			<li class="flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coffee font-display text-lg font-semibold text-white" aria-hidden="true">{i + 1}</span>
				<div>
					<h2 class="font-display text-xl font-medium text-ink">{step.title}</h2>
					<p class="mt-1.5 leading-relaxed text-muted">{step.body}</p>
				</div>
			</li>
		{/each}
	</ol>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a href="/menu" class="inline-flex min-h-12 items-center gap-1 rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark">
			See the Menu <ArrowRight size={17} aria-hidden="true" />
		</a>
		<a href="/locations" class="inline-flex min-h-12 items-center rounded-full border border-coffee px-6 text-base font-semibold text-coffee hover:bg-sand">Find a Café</a>
	</div>
</section>
