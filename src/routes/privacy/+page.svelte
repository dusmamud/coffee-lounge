<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Privacy Policy — {site.name}</title>
	<meta name="description" content="Privacy Policy for The Coffee Lounge website (mock). How we handle the information you share with us." />
</svelte:head>

<PageHero eyebrow="LEGAL" title="Privacy Policy" subtitle="Last updated: November 2026. This is a mock policy for a demo website." />

<section class="mx-auto max-w-3xl space-y-5 px-4 pb-16 text-[1.02rem] leading-relaxed text-ink/85 sm:px-6">
	<p>
		The Coffee Lounge (“we”, “us”) operates this website as a demonstration. This policy explains what
		information we collect when you use the site, and what we do with it.
	</p>
	<h2 class="pt-3 font-display text-xl font-semibold text-ink">Information we collect</h2>
	<p>
		When you use the demo forms on this site — newsletter signup, contact, gift cards, loyalty signup or
		checkout — you may enter a name, email address, phone number or delivery address. In this demo, that
		information stays in your browser and is never sent to our servers, sold, or shared with anyone.
	</p>
	<h2 class="pt-3 font-display text-xl font-semibold text-ink">Cookies and analytics</h2>
	<p>
		This demo site does not use tracking cookies or third-party analytics. The map embeds on the Locations and
		Contact pages are served by Google Maps and are subject to Google’s privacy policy.
	</p>
	<h2 class="pt-3 font-display text-xl font-semibold text-ink">Your choices</h2>
	<p>
		Because this is a demo, there is no account to delete and no data held about you. In the live site, you will
		be able to ask us to correct or delete your personal information at any time by writing to
		<a href="mailto:{site.email}" class="font-semibold break-all text-coffee underline underline-offset-2">{site.email}</a>.
	</p>
	<h2 class="pt-3 font-display text-xl font-semibold text-ink">Contact</h2>
	<p>
		Questions about this policy? Write to {site.email} or visit us at {site.address}.
	</p>
</section>
