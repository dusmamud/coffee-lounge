<script lang="ts">
	import { Mail, MapPin, Menu, Phone, Search, ShoppingBag, X } from '@lucide/svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { nav, site } from '#lib/data/site.ts';
	import Logo from './Logo.svelte';
	import SocialIcon from './SocialIcon.svelte';

	let open = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 8;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<!-- Top bar: address · phone · email · socials -->
<div class="hidden bg-coffee-dark text-cream/90 md:block">
	<div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-xs sm:px-6 lg:px-8">
		<p class="flex flex-wrap items-center gap-x-5 gap-y-1">
			<span class="flex items-center gap-1.5"><MapPin size={13} aria-hidden="true" />{site.address}</span>
			<a href={site.phoneHref} class="flex items-center gap-1.5 hover:text-white">
				<Phone size={13} aria-hidden="true" />{site.phoneDisplay}
			</a>
			<a href="mailto:{site.email}" class="flex items-center gap-1.5 hover:text-white">
				<Mail size={13} aria-hidden="true" />{site.email}
			</a>
		</p>
		<p class="flex items-center gap-3">
			<span>Follow Us:</span>
			<a href={site.instagram} target="_blank" rel="noopener" aria-label="The Coffee Lounge on Instagram" class="hover:text-white"><SocialIcon name="instagram" size={14} /></a>
			<a href={site.facebook} target="_blank" rel="noopener" aria-label="The Coffee Lounge on Facebook" class="hover:text-white"><SocialIcon name="facebook" size={14} /></a>
			<a href={site.tiktok} target="_blank" rel="noopener" aria-label="The Coffee Lounge on TikTok" class="hover:text-white"><SocialIcon name="tiktok" size={14} /></a>
		</p>
	</div>
</div>

<header
	class="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur transition-shadow duration-200 {scrolled
		? 'shadow-[0_2px_16px_rgba(59,35,20,0.08)]'
		: ''}"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1 sm:px-6 lg:px-8">
		<a href="/" class="flex min-h-12 items-center gap-2 text-coffee" aria-label="The Coffee Lounge — home">
			<Logo />
			<span class="leading-none">
				<span class="block font-display text-[1.15rem] font-semibold whitespace-nowrap text-ink sm:text-[1.25rem]"><span class="sm:hidden">Coffee Lounge</span><span class="hidden sm:inline">The Coffee Lounge</span></span>
				<span class="mt-0.5 hidden text-[0.58rem] tracking-[0.32em] whitespace-nowrap text-muted min-[400px]:block">PREMIUM COFFEE SHOP</span>
			</span>
		</a>

		<nav aria-label="Primary" class="hidden items-center gap-5 xl:flex">
			{#each nav as item}
				<a
					href={item.href}
					class="min-h-12 content-center text-[0.95rem] font-medium whitespace-nowrap text-ink/80 transition-colors duration-150 hover:text-gold-dark"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-1 sm:gap-2">
			<a
				href="/menu"
				aria-label="Search the menu"
				class="hidden h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:text-gold-dark min-[400px]:flex"
			>
				<Search size={20} aria-hidden="true" />
			</a>
			<button
				type="button"
				aria-label="Open cart, {cart.count} items"
				onclick={() => (cart.drawerOpen = true)}
				class="relative flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:text-gold-dark"
			>
				<ShoppingBag size={20} aria-hidden="true" />
				{#if cart.count > 0}
					<span class="absolute top-1 right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-coffee px-1 text-[0.7rem] font-bold text-white">{cart.count}</span>
				{/if}
			</button>
			<a
				href="/order"
				class="hidden min-h-12 items-center rounded-full bg-coffee px-5 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-200 hover:bg-coffee-dark md:inline-flex"
			>
				Order Online →
			</a>
			<button
				type="button"
				class="flex h-12 w-12 items-center justify-center rounded-full text-ink xl:hidden"
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? 'Close menu' : 'Open menu'}
				onclick={() => (open = !open)}
			>
				{#if open}<X size={24} aria-hidden="true" />{:else}<Menu size={24} aria-hidden="true" />{/if}
			</button>
		</div>
	</div>

	{#if open}
		<nav
			id="mobile-menu"
			aria-label="Mobile"
			data-lenis-prevent
			class="border-t border-line bg-cream px-4 pb-4 pt-2 xl:hidden"
		>
			{#each nav as item}
				<a
					href={item.href}
					class="block min-h-12 content-center border-b border-line/60 py-2 text-base font-medium text-ink"
					onclick={() => (open = false)}
				>
					{item.label}
				</a>
			{/each}
			<div class="mt-4 flex gap-3">
				<a
					href="/order"
					class="flex min-h-12 flex-1 items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white"
					onclick={() => (open = false)}
				>
					Order Online
				</a>
				<a
					href="/locations"
					class="flex min-h-12 flex-1 items-center justify-center rounded-full border border-coffee px-6 text-base font-semibold text-coffee"
					onclick={() => (open = false)}
				>
					Find a Café
				</a>
			</div>
		</nav>
	{/if}
</header>
