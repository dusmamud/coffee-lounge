<script lang="ts">
	import { ArrowRight, Coffee, Heart, Users, Wheat } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>About Us — Our Story | {site.name}</title>
	<meta
		name="description"
		content="The Coffee Lounge story: a neighbourhood third place in Maple City since 2019 — premium beans, expert baristas and a room the neighbourhood shares."
	/>
</svelte:head>

<PageHero
	eyebrow="OUR STORY"
	title="A Modern Café for Coffee Lovers"
	subtitle="Blending premium coffee, delicious food, and a warm, stylish space for every coffee moment — since 2019."
/>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid items-center gap-10 lg:grid-cols-2">
		<div class="overflow-hidden rounded-[2rem]">
			<Picture
				name="barista"
				alt="Barista in a brown apron pouring latte art at the espresso machine"
				width={1200}
				height={800}
				sizes="(max-width: 1024px) 90vw, 620px"
				eager
				imgClass="aspect-[3/2] h-auto w-full object-cover"
				pictureClass="block"
			/>
		</div>
		<div>
			<h2 class="font-display text-[clamp(1.7rem,4vw,2.4rem)] leading-tight font-medium text-ink">
				It started with one roaster and a borrowed espresso machine.
			</h2>
			<div class="mt-5 space-y-4 leading-relaxed text-muted">
				<p>
					In 2019 we opened a twelve-seat shop on Brew Street with a simple idea: a café should be a
					third place — not home, not work, but the room in between where a neighbourhood actually happens.
					So we spaced the tables for conversation, put the Wi-Fi password on the wall, and promised never
					to rush anyone out.
				</p>
				<p>
					The coffee had to earn that room. We roast our own beans at the Riverside Roastery every Tuesday,
					buy from six small farms we have worked with for years, and train every barista for eight weeks
					before they touch the machine alone. The croissants are laminated overnight and baked at 6 AM.
					The cake sells out most days by two.
				</p>
				<p>
					Seven years later there are three cafés, a book club that started itself, and a corner table that
					has belonged to the same writer since 2020. The coffee is the excuse. The room is the point.
				</p>
			</div>
			<a
				href="/menu"
				class="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-coffee px-6 text-base font-semibold text-white transition-colors duration-200 hover:bg-coffee-dark"
			>
				Taste the Story <ArrowRight size={17} aria-hidden="true" />
			</a>
		</div>
	</div>

	<div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each [
			{ icon: Wheat, title: 'Premium Beans', text: 'Six small farms, roasted in-house every Tuesday at our Riverside Roastery.' },
			{ icon: Coffee, title: 'Expert Baristas', text: 'Eight weeks of training before any barista works the machine alone.' },
			{ icon: Heart, title: 'Fresh & Quality', text: 'Croissants baked at 6 AM, cake made daily, ingredients from local suppliers.' },
			{ icon: Users, title: 'A Space to Relax', text: 'Free Wi-Fi, outlets at most tables, and nobody is ever asked to leave.' }
		] as v}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<v.icon size={26} class="text-gold-dark" aria-hidden="true" />
				<h3 class="mt-3 font-display text-lg font-semibold text-ink">{v.title}</h3>
				<p class="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{v.text}</p>
			</article>
		{/each}
	</div>

	<div class="mt-14 overflow-hidden rounded-[2rem]">
		<Picture
			name="coffee-beans"
			alt="Freshly roasted coffee beans spilling from a burlap sack beside a cup of black coffee"
			width={1600}
			height={800}
			sizes="(max-width: 1024px) 90vw, 1200px"
			imgClass="aspect-[2/1] h-auto w-full object-cover"
			pictureClass="block"
		/>
	</div>
	<p class="mt-4 text-center text-sm text-muted">Our Maple Roast, roasted in-house every Tuesday — chocolatey, gentle, and made for slow mornings.</p>
</section>
