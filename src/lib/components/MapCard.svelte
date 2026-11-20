<script lang="ts">
	// Google Maps embed with a real fallback: the styled address/hours card
	// sits underneath the iframe, and if the iframe has not loaded within
	// 6 seconds (blocked, slow or failed) it is hidden so the visitor
	// never sees a blank white box. The "Open in Google Maps" link is
	// always visible below the map.
	import { Clock, MapPin } from '@lucide/svelte';
	import { site } from '#lib/data/site.ts';

	let {
		embed,
		name,
		address,
		hours
	}: { embed: string; name: string; address: string; hours: string } = $props();

	let loaded = $state(false);
	let failed = $state(false);

	$effect(() => {
		const t = window.setTimeout(() => {
			if (!loaded) failed = true;
		}, 6000);
		return () => window.clearTimeout(t);
	});

	const mapsUrl = $derived(
		`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
	);
</script>

<div class="overflow-hidden rounded-3xl ring-1 ring-line">
	<div class="relative aspect-[16/10] w-full bg-sand">
		{#if !failed}
			<iframe
				title="Map of {name}"
				src={embed}
				loading="lazy"
				onload={() => (loaded = true)}
				class="absolute inset-0 h-full w-full border-0"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		{/if}
		{#if failed || !loaded}
			<div
				class="absolute inset-0 flex flex-col items-start justify-center gap-2 bg-sand p-6"
				role="note"
			>
				<p class="flex items-start gap-2 font-semibold text-ink">
					<MapPin size={18} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
					{name} — {address}
				</p>
				<p class="flex items-start gap-2 text-sm text-muted">
					<Clock size={16} class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
					{hours}
				</p>
				{#if failed}
					<p class="text-sm text-muted">The live map could not load here — the details above are current.</p>
				{/if}
			</div>
		{/if}
	</div>
	<div class="flex flex-wrap items-center justify-between gap-3 bg-white p-4">
		<p class="text-sm text-muted">{address}</p>
		<a
			href={mapsUrl}
			target="_blank"
			rel="noopener"
			class="inline-flex min-h-12 items-center rounded-full bg-coffee px-5 text-sm font-semibold text-white hover:bg-coffee-dark"
		>
			Open in Google Maps
		</a>
	</div>
</div>
