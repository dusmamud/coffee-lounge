<script lang="ts">
	import '@fontsource/playfair-display/400.css';
	import '@fontsource/playfair-display/500.css';
	import '@fontsource/playfair-display/600.css';
	import '@fontsource/playfair-display/700.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { MapPin, Phone, ShoppingBag } from '@lucide/svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { site } from '#lib/data/site.ts';

	let { children } = $props();

	// View Transitions between pages (SvelteKit onNavigate). Skipped when the
	// browser has no View Transitions API or the user prefers reduced motion.
	onNavigate((navigation) => {
		if (!('startViewTransition' in document)) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'CafeOrCoffeeShop',
		name: site.name,
		description:
			'Artisan coffee, fresh bites, and a cozy ambience in Maple City, CA — specialty coffee, fresh food and a work-friendly space.',
		telephone: site.phoneDisplay,
		email: site.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: '123 Brew Street',
			addressLocality: 'Maple City',
			addressRegion: 'CA',
			postalCode: '94110',
			addressCountry: 'US'
		},
		geo: { '@type': 'GeoCoordinates', latitude: 37.7749, longitude: -122.4194 },
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			opens: '07:00',
			closes: '20:00'
		},
		priceRange: '$$',
		servesCuisine: ['Coffee', 'Bakery', 'Cafe'],
		url: site.url,
		sameAs: [site.instagram, site.facebook, site.tiktok]
	};

	// Smooth scroll (Lenis) + GSAP ScrollTrigger, one rAF loop, reduced-motion gated.
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(ScrollTrigger);
		const lenis = new Lenis({
			autoRaf: false,
			lerp: 0.1,
			smoothWheel: true,
			syncTouch: false // native inertia on touch devices
		});
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);
		const progress = document.getElementById('scroll-progress');
		if (progress) {
			gsap.to(progress, {
				scaleX: 1,
				ease: 'none',
				scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
			});
		}
		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);
		return () => {
			window.removeEventListener('load', onLoad);
			lenis.destroy();
		};
	});

	// Reveal-on-scroll: transform + opacity only, 300ms, respects reduced motion via CSS.
	$effect(() => {
		const els = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
			},
			{ threshold: 0.12 }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<svelte:head>
	<title>The Coffee Lounge — Premium Coffee Shop in Maple City, CA</title>
	<meta
		name="description"
		content="More than just coffee. Artisan coffee, fresh bites, and a cozy ambience in Maple City, CA — your perfect place to relax, work, and connect."
	/>
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="The Coffee Lounge" />
	<meta property="og:title" content="The Coffee Lounge — More Than Just Coffee" />
	<meta
		property="og:description"
		content="Artisan coffee, fresh bites, and a cozy ambience — your perfect place to relax, work, and connect."
	/>
	<meta property="og:url" content={site.url} />
	<meta property="og:image" content="{site.url}/images/hero-latte-1200.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="The Coffee Lounge — More Than Just Coffee" />
	<meta
		name="twitter:description"
		content="Artisan coffee, fresh bites, and a cozy ambience in Maple City, CA."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-coffee-dark focus:px-5 focus:py-3 focus:text-white"
>
	Skip to main content
</a>

<!-- Scroll progress (coffee line, transform only) -->
<div
	id="scroll-progress"
	class="fixed top-0 left-0 z-[55] h-[3px] w-full origin-left scale-x-0 bg-coffee"
	aria-hidden="true"
></div>

<Header />
<main id="main">{@render children()}</main>
<Footer />
<CartDrawer />

<!-- Sticky mobile bottom bar: Call / Find a Café / Order -->
<nav
	aria-label="Quick actions"
	class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
>
	<a href={site.phoneHref} class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
		<Phone size={20} class="text-gold-dark" aria-hidden="true" />
		Call
	</a>
	<a href="/locations" class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
		<MapPin size={20} class="text-gold-dark" aria-hidden="true" />
		Find a Café
	</a>
	<button
		type="button"
		onclick={() => (cart.drawerOpen = true)}
		class="relative flex min-h-14 items-center justify-center bg-coffee text-sm font-bold text-white"
	>
		<ShoppingBag size={18} aria-hidden="true" />
		Order{cart.count > 0 ? ` (${cart.count})` : ''}
	</button>
</nav>
<!-- Spacer so the sticky bar never covers footer content on mobile -->
<div class="h-14 lg:hidden" aria-hidden="true"></div>
