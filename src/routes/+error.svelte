<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Page not found — The Coffee Lounge</title>
	<meta name="description" content="That page does not exist. Find your way back to The Coffee Lounge." />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
	<p class="font-display text-7xl font-medium text-gold-dark">404</p>
	<h1 class="mt-4 font-display text-3xl font-medium text-ink">This cup is empty</h1>
	<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
		The page you are looking for ({page.url.pathname}) has moved or never existed. Let us take you somewhere
		warmer.
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a
			href="/"
			class="inline-flex min-h-12 items-center rounded-full bg-coffee px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark"
		>
			Back to home
		</a>
		<a
			href="/menu"
			class="inline-flex min-h-12 items-center rounded-full border border-coffee px-7 text-base font-semibold text-coffee transition-colors duration-200 hover:bg-sand"
		>
			Browse the Menu
		</a>
	</div>
</section>
