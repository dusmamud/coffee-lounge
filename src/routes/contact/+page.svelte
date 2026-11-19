<script lang="ts">
	import { Clock, Mail, MapPin, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let sent = $state(false);

	const submit = (e: Event) => {
		e.preventDefault();
		if (name.trim() && email.includes('@') && message.trim()) sent = true;
	};
</script>

<svelte:head>
	<title>Contact — {site.name} | Maple City, CA</title>
	<meta
		name="description"
		content="Contact The Coffee Lounge: 123 Brew Street, Maple City, CA. Call +1 (415) 987-6543 or write to hello@thecoffeelounge.com."
	/>
	<link rel="canonical" href="{site.url}/contact" />
</svelte:head>

<PageHero
	eyebrow="CONTACT"
	title="Say Hello — We Love Hearing From You"
	subtitle="Questions, catering, private events or just a kind word about the cappuccino — write to us, we reply within one business day."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-8 lg:grid-cols-2">
		<div class="space-y-4">
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="flex items-center gap-2 font-display text-lg font-semibold text-ink">
					<MapPin size={20} class="text-gold-dark" aria-hidden="true" /> Visit the Flagship
				</h2>
				<p class="mt-2 text-muted">{site.address}</p>
				<p class="mt-1 text-muted">{site.hours}</p>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="flex items-center gap-2 font-display text-lg font-semibold text-ink">
					<Phone size={20} class="text-gold-dark" aria-hidden="true" /> Call Us
				</h2>
				<p class="mt-2"><a href={site.phoneHref} class="font-semibold text-coffee hover:text-gold-dark">{site.phoneDisplay}</a></p>
				<p class="mt-1 text-muted">Daily during café hours.</p>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="flex items-center gap-2 font-display text-lg font-semibold text-ink">
					<Mail size={20} class="text-gold-dark" aria-hidden="true" /> Email Us
				</h2>
				<p class="mt-2"><a href="mailto:{site.email}" class="font-semibold break-all text-coffee hover:text-gold-dark">{site.email}</a></p>
				<p class="mt-1 flex items-center gap-1.5 text-muted"><Clock size={15} aria-hidden="true" /> Replies within one business day.</p>
			</div>
			<iframe
				title="Map of The Coffee Lounge flagship café"
				src={site.mapEmbed}
				loading="lazy"
				class="aspect-[16/10] w-full rounded-3xl border border-line"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>

		<div class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			{#if sent}
				<div role="status" class="py-10 text-center">
					<p class="font-display text-2xl font-medium text-ink">Thanks, {name.split(' ')[0]}!</p>
					<p class="mt-2 leading-relaxed text-muted">
						Your message is on its way (demo form — nothing was sent). In the real site this reaches our team inbox.
					</p>
					<button
						type="button"
						onclick={() => { sent = false; name = ''; email = ''; message = ''; }}
						class="mt-6 inline-flex min-h-12 items-center rounded-full bg-coffee px-6 text-sm font-semibold text-white hover:bg-coffee-dark"
					>
						Send Another Message
					</button>
				</div>
			{:else}
				<h2 class="font-display text-xl font-semibold text-ink">Send us a message</h2>
				<form onsubmit={submit} class="mt-5 space-y-4">
					<div>
						<label class="block text-sm font-semibold text-ink" for="contact-name">Your name</label>
						<input id="contact-name" type="text" bind:value={name} required autocomplete="name" placeholder="Alex Morgan" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
					<div>
						<label class="block text-sm font-semibold text-ink" for="contact-email">Email</label>
						<input id="contact-email" type="email" bind:value={email} required autocomplete="email" placeholder="alex@example.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
					</div>
					<div>
						<label class="block text-sm font-semibold text-ink" for="contact-message">Message</label>
						<textarea id="contact-message" bind:value={message} required rows="5" placeholder="Tell us what is on your mind…" class="mt-2 w-full rounded-3xl border border-line bg-cream px-4 py-3 text-base placeholder:text-muted"></textarea>
					</div>
					<button type="submit" class="flex min-h-12 w-full items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark">
						Send Message
					</button>
					<p class="text-center text-xs text-muted">Demo form — your message is not sent anywhere.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
