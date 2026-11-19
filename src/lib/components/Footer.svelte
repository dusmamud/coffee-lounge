<script lang="ts">
	import { Mail, MapPin, Phone } from '@lucide/svelte';
	import { nav, site } from '#lib/data/site.ts';
	import Logo from './Logo.svelte';
	import SocialIcon from './SocialIcon.svelte';
</script>

<footer class="bg-coffee-dark text-cream/85">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
		<div>
			<a href="/" class="flex items-center gap-2 text-cream" aria-label="The Coffee Lounge — home">
				<Logo />
				<span class="leading-none">
					<span class="block font-display text-[1.2rem] font-semibold text-cream">The Coffee Lounge</span>
					<span class="block text-[0.58rem] tracking-[0.32em] text-cream/60">PREMIUM COFFEE SHOP</span>
				</span>
			</a>
			<p class="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-cream/70">
				Artisan coffee, fresh bites, and a cozy ambience — your perfect place to relax, work, and connect.
			</p>
			<div class="mt-5 flex gap-3">
				{#each [{ label: 'Instagram', name: 'instagram', href: site.instagram }, { label: 'Facebook', name: 'facebook', href: site.facebook }, { label: 'TikTok', name: 'tiktok', href: site.tiktok }] as s}
					<a
						href={s.href}
						target="_blank"
						rel="noopener"
						aria-label="The Coffee Lounge on {s.label}"
						class="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors duration-150 hover:border-cream hover:text-white"
					>
						<SocialIcon name={s.name as 'instagram' | 'facebook' | 'tiktok'} size={18} />
					</a>
				{/each}
			</div>
		</div>
		<div>
			<h3 class="font-semibold text-cream">Visit Us</h3>
			<p class="mt-3 flex items-start gap-2 text-[0.95rem] leading-relaxed text-cream/70">
				<MapPin size={17} class="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
				{site.address}
			</p>
			<p class="mt-3 text-sm text-cream/70">{site.hours}</p>
			<p class="mt-3">
				<a href="/locations" class="inline-flex min-h-12 items-center text-sm font-semibold text-gold-light underline underline-offset-4">Find a café near you →</a>
			</p>
		</div>
		<div>
			<h3 class="font-semibold text-cream">Explore</h3>
			<nav aria-label="Footer" class="mt-3 flex flex-col gap-1">
				{#each [...nav, { label: 'Gift Cards', href: '/gift-cards' }, { label: 'Coffee Loop Rewards', href: '/loyalty' }, { label: 'Blog', href: '/blog' }, { label: 'Search', href: '/search' }, { label: 'Track Your Order', href: '/track-order' }, { label: 'Brew Guides', href: '/brew-guides' }, { label: 'Reviews', href: '/reviews' }, { label: 'Catering & Private Events', href: '/catering' }, { label: 'First Visit', href: '/first-visit' }] as item}
					<a href={item.href} class="min-h-12 content-center text-[0.95rem] text-cream/70 hover:text-white">
						{item.label}
					</a>
				{/each}
			</nav>
		</div>
		<div>
			<h3 class="font-semibold text-cream">Get in Touch</h3>
			<p class="mt-3 space-y-1 text-[0.95rem] text-cream/70">
				<a href={site.phoneHref} class="flex min-h-12 items-center gap-2 hover:text-white">
					<Phone size={16} class="shrink-0 text-gold-light" aria-hidden="true" />
					{site.phoneDisplay}
				</a>
				<a href="mailto:{site.email}" class="flex min-h-12 items-center gap-2 break-all hover:text-white">
					<Mail size={16} class="shrink-0 text-gold-light" aria-hidden="true" />
					{site.email}
				</a>
			</p>
			<p class="mt-3 text-sm text-cream/70">
				Questions, catering or large orders? Write to us — we reply within one business day.
			</p>
		</div>
	</div>
	<div class="border-t border-cream/15 py-5 text-center text-sm text-cream/60">
		<p class="flex flex-wrap justify-center gap-x-5 gap-y-2 px-4">
			<a href="/faq" class="min-h-12 content-center hover:text-white">FAQ</a>
			<a href="/privacy" class="min-h-12 content-center hover:text-white">Privacy Policy</a>
			<a href="/terms" class="min-h-12 content-center hover:text-white">Terms of Service</a>
			<a href="/sitemap.xml" class="min-h-12 content-center hover:text-white">Sitemap</a>
		</p>
		<p class="mt-2 px-4">© 2026 The Coffee Lounge. All rights reserved. · Mock website — content for design approval.</p>
	</div>
</footer>
