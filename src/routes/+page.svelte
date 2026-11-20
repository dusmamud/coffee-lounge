<script lang="ts">
	import {
		ArrowRight,
		Coffee,
		Cookie,
		Laptop,
		Mail,
		MapPin,
		Star,
		Users,
		Wheat
	} from '@lucide/svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import type { EmblaCarouselType } from 'embla-carousel';
	import type { PageData } from './$types';
	import MenuCard from '#lib/components/MenuCard.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { cart } from '#lib/cart.svelte.ts';

	let { data }: { data: PageData } = $props();

	const signature = $derived(data.menuItems.filter((m) => m.signature));
	const bestsellers = $derived(data.menuItems.filter((m) => m.bestseller).slice(0, 3));

	// Testimonials: Embla swipe carousel, autoplay 6s, pauses on hover/focus
	// and when the user interacts; no autoplay at all for reduced motion.
	let tIndex = $state(0);
	const tCount = $derived(data.testimonials.length);
	let emblaApi: EmblaCarouselType | undefined = $state(undefined);
	const reducedMotion =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const autoplay = reducedMotion
		? []
		: [Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })];
	const onEmblaInit = (e: CustomEvent<EmblaCarouselType>) => {
		emblaApi = e.detail;
		emblaApi.on('select', () => (tIndex = emblaApi?.selectedScrollSnap() ?? 0));
	};
	const nextT = () => emblaApi?.scrollNext();
	const prevT = () => emblaApi?.scrollPrev();

	let email = $state('');
	let subscribed = $state(false);
	const subscribe = (e: Event) => {
		e.preventDefault();
		if (email.includes('@')) subscribed = true;
	};
</script>

<!-- ─── Hero ─── -->
<section class="overflow-hidden bg-cream">
	<div class="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-14">
		<div class="reveal is-visible">
			<p class="text-xs font-bold tracking-[0.3em] text-gold-dark">PREMIUM COFFEE EXPERIENCE</p>
			<h1 class="mt-4 font-display text-[clamp(2.6rem,7vw,4.4rem)] leading-[1.05] font-medium text-ink">
				More Than<br />Just <em class="text-coffee italic">Coffee</em>
			</h1>
			<p class="mt-5 max-w-md text-lg leading-relaxed text-muted">
				Artisan coffee, fresh bites, and a cozy ambience — your perfect place to relax, work, and connect.
			</p>
			<div class="mt-7 flex flex-wrap gap-3">
				<a
					href="/order"
					class="inline-flex min-h-12 items-center gap-2 rounded-full bg-coffee px-6 text-base font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark"
				>
					Order Online <ArrowRight size={17} aria-hidden="true" />
				</a>
				<a
					href="/locations"
					class="inline-flex min-h-12 items-center gap-2 rounded-full border border-coffee px-6 text-base font-semibold text-coffee transition-colors duration-150 hover:bg-sand"
				>
					<MapPin size={17} aria-hidden="true" /> Find a Café
				</a>
			</div>
			<ul class="mt-9 grid max-w-md grid-cols-2 gap-4 sm:grid-cols-4">
				{#each [{ icon: Coffee, label: 'Specialty Coffee' }, { icon: Cookie, label: 'Fresh Food' }, { icon: Laptop, label: 'Work Friendly' }, { icon: Users, label: 'Cozy Ambience' }] as f}
					<li class="flex flex-col items-center gap-1.5 text-center">
						<span class="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-coffee">
							<f.icon size={22} aria-hidden="true" />
						</span>
						<span class="text-xs leading-tight font-semibold text-ink">{f.label}</span>
					</li>
				{/each}
			</ul>
		</div>
		<div class="relative">
			<Picture
				name="hero-latte"
				alt="Latte with leaf latte art and chocolate-chip cookies on a wooden table in a warm café"
				width={1200}
				height={900}
				sizes="(max-width: 1024px) 90vw, 620px"
				eager
				imgClass="aspect-[4/3] h-auto w-full rounded-[2rem] object-cover shadow-xl"
				pictureClass="block"
			/>
			<div class="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-line sm:left-6">
				<span class="flex" aria-label="Rated 4.9 out of 5">
					{#each Array(5) as _}<Star size={15} class="fill-amber-600 text-amber-600" aria-hidden="true" />{/each}
				</span>
				<p class="text-sm leading-tight"><strong class="text-ink">4.9 / 5</strong><br /><span class="text-muted">from 2,400+ guests</span></p>
			</div>
		</div>
	</div>
</section>

<!-- ─── Signature Drinks ─── -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="flex flex-wrap items-end justify-between gap-3">
		<h2 class="reveal font-display text-[clamp(1.7rem,4vw,2.4rem)] font-medium text-ink">
			Our Signature Drinks <span class="text-gold" aria-hidden="true">—</span>
		</h2>
		<a href="/menu" class="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-coffee hover:text-gold-dark">
			View Full Menu <ArrowRight size={16} aria-hidden="true" />
		</a>
	</div>
	<div class="mt-7 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-5">
		{#each signature as item}
			<MenuCard {item} />
		{/each}
	</div>
</section>

<!-- ─── About strip ─── -->
<section class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
	<div class="grid items-center gap-8 lg:grid-cols-2">
		<div class="overflow-hidden rounded-[2rem]">
			<Picture
				name="cafe-interior"
				alt="Modern Coffee Lounge interior with armchairs, wooden ceiling and warm pendant lights"
				width={1200}
				height={800}
				sizes="(max-width: 1024px) 90vw, 620px"
				imgClass="aspect-[3/2] h-auto w-full object-cover"
				pictureClass="block"
			/>
		</div>
		<div class="reveal">
			<p class="text-xs font-bold tracking-[0.3em] text-gold-dark">THE COFFEE LOUNGE</p>
			<h2 class="mt-3 font-display text-[clamp(1.9rem,4.5vw,2.8rem)] leading-tight font-medium text-ink">
				A Modern Café<br />for Coffee Lovers
			</h2>
			<p class="mt-4 max-w-lg leading-relaxed text-muted">
				Blending premium coffee, delicious food, and a warm, stylish space for every coffee moment.
				Three cafés across Maple City, one promise: a great cup, a comfortable chair, and time that is yours.
			</p>
			<a
				href="/about"
				class="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-coffee px-6 text-base font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark"
			>
				Our Story <ArrowRight size={17} aria-hidden="true" />
			</a>
		</div>
	</div>

	<!-- Dark brown strip -->
	<div class="mt-10 grid grid-cols-2 gap-6 rounded-[2rem] bg-coffee-dark px-6 py-8 text-center text-cream sm:px-10 lg:grid-cols-4">
		{#each [{ icon: Wheat, title: 'Premium Beans', sub: 'Sourced Globally' }, { icon: Coffee, title: 'Expert Baristas', sub: 'Trained & Certified' }, { icon: Cookie, title: 'Fresh & Quality', sub: 'Ingredients Daily' }, { icon: Users, title: 'A Space to Relax', sub: '& Connect' }] as f}
			<div class="flex flex-col items-center gap-2">
				<f.icon size={26} class="text-gold-light" aria-hidden="true" />
				<p class="text-sm leading-snug font-semibold">{f.title}<br /><span class="font-normal text-cream/70">{f.sub}</span></p>
			</div>
		{/each}
	</div>
</section>

<!-- ─── Bestsellers + Testimonials ─── -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-2">
		<div class="min-w-0">
			<div class="flex flex-wrap items-end justify-between gap-3">
				<h2 class="font-display text-[clamp(1.7rem,4vw,2.2rem)] font-medium text-ink">
					Bestsellers <span class="text-gold" aria-hidden="true">—</span>
				</h2>
				<a href="/menu" class="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-coffee hover:text-gold-dark">
					View All <ArrowRight size={16} aria-hidden="true" />
				</a>
			</div>
			<div class="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
				{#each bestsellers as item}
					<article class="group overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-lg">
						<a href="/menu/{item.slug}" class="block overflow-hidden" aria-label="View {item.name}">
							<Picture
								name={item.image}
								alt={item.imageAlt}
								width={800}
								height={600}
								sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 300px"
								imgClass="aspect-[4/3] h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
								pictureClass="block"
							/>
						</a>
						<div class="flex items-center justify-between gap-2 p-4">
							<div class="min-w-0">
								<h3 class="font-display text-base leading-snug font-semibold text-ink">
									<a href="/menu/{item.slug}" class="hover:text-gold-dark">{item.name}</a>
								</h3>
								<p class="text-sm font-semibold text-coffee">${item.price.toFixed(2)}</p>
							</div>
							<button
								type="button"
								onclick={() => cart.add(item.slug)}
								aria-label="Add {item.name} to cart"
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coffee text-white transition-colors duration-150 hover:bg-coffee-dark"
							>
								<span class="text-xl leading-none" aria-hidden="true">+</span>
							</button>
						</div>
					</article>
				{/each}
			</div>
		</div>

		<div class="min-w-0">
			<h2 class="font-display text-[clamp(1.7rem,4vw,2.2rem)] font-medium text-ink">
				What Our Guests Say <span class="text-gold" aria-hidden="true">—</span>
			</h2>
			<div class="mt-6 min-w-0 overflow-hidden rounded-3xl bg-white ring-1 ring-line">
				<div
					class="min-w-0 overflow-hidden"
					use:emblaCarouselSvelte={{ options: { loop: true }, plugins: autoplay }}
					onemblaInit={onEmblaInit}
				>
					<div class="flex">
						{#each data.testimonials as t}
							<div class="min-w-0 flex-[0_0_100%] p-6 sm:p-8" aria-roledescription="slide">
								<div class="flex items-start gap-4">
									<div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-coffee font-display text-xl font-semibold text-white" aria-hidden="true">
										{t.name.charAt(0)}
									</div>
									<div class="min-w-0">
										<p class="flex" aria-label="Rated {t.stars} out of 5">
											{#each Array(t.stars) as _}<Star size={16} class="fill-amber-600 text-amber-600" aria-hidden="true" />{/each}
										</p>
										<blockquote class="mt-2 leading-relaxed text-ink">“{t.quote}”</blockquote>
										<p class="mt-3 text-sm font-semibold text-ink">
											{t.name}
											<span class="block font-normal text-muted">{t.role}</span>
										</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="flex items-center justify-between border-t border-line px-6 py-4 sm:px-8">
					<div class="flex gap-2" role="tablist" aria-label="Choose testimonial">
						{#each data.testimonials as _, i}
							<button
								type="button"
								role="tab"
								aria-selected={tIndex === i}
								aria-label="Testimonial {i + 1} of {tCount}"
								onclick={() => emblaApi?.scrollTo(i)}
								class="flex h-12 w-12 items-center justify-center"
								><span class="block h-3 rounded-full transition-[width] duration-200 {tIndex === i ? 'w-8 bg-coffee' : 'w-3 bg-line hover:bg-gold'}" aria-hidden="true"></span>
							></button>
						{/each}
					</div>
					<div class="flex gap-2">
						<button type="button" onclick={prevT} aria-label="Previous testimonial" class="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink hover:border-coffee">←</button>
						<button type="button" onclick={nextT} aria-label="Next testimonial" class="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink hover:border-coffee">→</button>
					</div>
				</div>
			</div>
			<p class="mt-4 text-center text-sm">
				<a href="/reviews" class="font-semibold text-coffee underline underline-offset-2">Read all {tCount} guest reviews →</a>
			</p>
			<div class="mt-6 grid grid-cols-3 gap-4 text-center">
				{#each [['3', 'Cafés in Maple City'], ['18 hrs', 'Slow-steeped cold brew'], ['2019', 'Pouring since']] as s}
					<div class="rounded-3xl bg-sand px-3 py-5">
						<p class="font-display text-2xl font-semibold text-coffee">{s[0]}</p>
						<p class="mt-1 text-xs leading-snug text-muted">{s[1]}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ─── Shop strip ─── -->
<section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
	<div class="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-sand p-6 sm:p-10 lg:grid-cols-[1fr_320px]">
		<div class="reveal">
			<p class="text-xs font-bold tracking-[0.3em] text-gold-dark">THE LOUNGE SHOP</p>
			<h2 class="mt-3 font-display text-[clamp(1.7rem,4vw,2.4rem)] leading-tight font-medium text-ink">
				Take the Lounge Home
			</h2>
			<p class="mt-3 max-w-lg leading-relaxed text-muted">
				Maple Roast and single-origin beans, coffee subscriptions from $16 a month, and the mug
				your mornings deserve — roasted Tuesdays at Riverside, shipped or ready for pickup.
			</p>
			<div class="mt-6 flex flex-wrap gap-3">
				<a href="/shop" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-coffee px-6 text-base font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark">
					Shop Beans & Merch <ArrowRight size={17} aria-hidden="true" />
				</a>
				<a href="/brew-guides" class="inline-flex min-h-12 items-center rounded-full border border-coffee px-6 text-base font-semibold text-coffee hover:bg-white">
					Brew Guides
				</a>
			</div>
		</div>
		<a href="/shop" class="block overflow-hidden rounded-3xl" aria-label="Shop coffee subscriptions">
			<Picture
				name="subscription-box"
				alt="Open coffee subscription box with bean bags and a tasting card"
				width={800}
				height={600}
				sizes="(max-width: 1024px) 90vw, 320px"
				imgClass="aspect-[4/3] h-auto w-full object-cover transition-transform duration-300 ease-out hover:scale-105"
				pictureClass="block"
			/>
		</a>
	</div>
</section>

<!-- ─── Newsletter ─── -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="overflow-hidden rounded-[2rem] bg-coffee-dark">
		<div class="grid items-center gap-6 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:py-12">
			<div class="min-w-0">
				<h2 class="font-display text-[clamp(1.7rem,4vw,2.4rem)] font-medium text-cream">Stay in the Coffee Loop!</h2>
				<p class="mt-2 max-w-md text-cream/70">Subscribe for special offers, new menu launches, and café events.</p>
			</div>
			{#if subscribed}
				<p class="rounded-2xl bg-cream/10 px-6 py-4 font-semibold text-cream" role="status">
					You are in the Loop — welcome! Your first offer is on its way to {email}.
				</p>
			{:else}
				<form onsubmit={subscribe} class="flex w-full min-w-0 max-w-md gap-2">
					<label for="newsletter-email" class="sr-only">Email address</label>
					<input
						id="newsletter-email"
						type="email"
						required
						bind:value={email}
						placeholder="Enter your email address"
						class="min-h-12 min-w-0 flex-1 rounded-full bg-white px-5 text-base text-ink placeholder:text-muted focus:outline-none"
					/>
					<button
						type="submit"
						aria-label="Subscribe"
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-dark text-white transition-colors duration-150 hover:bg-coffee-dark"
					>
						<Mail size={20} aria-hidden="true" />
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>
