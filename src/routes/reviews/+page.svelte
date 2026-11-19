<script lang="ts">
	import { Star } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { site, testimonials } from '#lib/data/site.ts';

	let name = $state('');
	let review = $state('');
	let stars = $state(5);
	let submitted = $state(false);

	const submit = (e: Event) => {
		e.preventDefault();
		if (name.trim() && review.trim()) submitted = true;
	};
</script>

<svelte:head>
	<title>Reviews — {site.name} | What Our Guests Say</title>
	<meta name="description" content="Guest reviews of The Coffee Lounge in Maple City — coffee, pastries, workspace and the team, rated by the people who actually come here." />
	<link rel="canonical" href="{site.url}/reviews" />
</svelte:head>

<PageHero
	eyebrow="GUEST REVIEWS"
	title="What Our Guests Say"
	subtitle="4.9 out of 5 from 2,400+ guests — in their words, not ours. Every review below is from a real regular (mock data for design review)."
/>

<section class="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 sm:grid-cols-3">
		{#each [['4.9', 'Average rating', 'from 2,400+ guest reviews'], ['96%', 'Would recommend us', 'to a friend, in our 2026 survey'], ['3', 'Cafés, one promise', 'same beans, same welcome']] as s}
			<div class="rounded-3xl bg-white p-6 text-center ring-1 ring-line">
				<p class="font-display text-3xl font-semibold text-coffee">{s[0]}</p>
				<p class="mt-1 font-semibold text-ink">{s[1]}</p>
				<p class="mt-0.5 text-sm text-muted">{s[2]}</p>
			</div>
		{/each}
	</div>

	<div class="mt-8 grid gap-6 md:grid-cols-2">
		{#each testimonials as t}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
				<div class="flex items-center gap-3">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-coffee font-display text-lg font-semibold text-white" aria-hidden="true">{t.name.charAt(0)}</span>
					<div>
						<p class="font-semibold text-ink">{t.name}</p>
						<p class="text-sm text-muted">{t.role}</p>
					</div>
					<p class="ml-auto flex" aria-label="Rated {t.stars} out of 5">
						{#each Array(t.stars) as _}<Star size={15} class="fill-amber-400 text-amber-400" aria-hidden="true" />{/each}
					</p>
				</div>
				<blockquote class="mt-4 leading-relaxed text-ink">“{t.quote}”</blockquote>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
		{#if submitted}
			<p role="status" class="text-center font-display text-2xl font-medium text-ink">
				Thanks, {name.split(' ')[0]}! Your {stars}-star review is in the queue (mock — nothing was published).
			</p>
		{:else}
			<h2 class="font-display text-2xl font-medium text-ink">Visited us? Leave a review</h2>
			<p class="mt-1 text-muted">We read every one — and the baristas read the good ones out loud.</p>
			<form onsubmit={submit} class="mt-5 space-y-4">
				<div>
					<fieldset>
						<legend class="text-sm font-semibold text-ink">Your rating</legend>
						<div class="mt-2 flex gap-1" role="radiogroup" aria-label="Star rating">
							{#each [1, 2, 3, 4, 5] as n}
								<button
									type="button"
									role="radio"
									aria-checked={stars === n}
									aria-label="{n} star{n === 1 ? '' : 's'}"
									onclick={() => (stars = n)}
									class="flex h-12 w-12 items-center justify-center rounded-full hover:bg-sand"
								>
									<Star size={24} class={stars >= n ? 'fill-amber-400 text-amber-400' : 'text-line'} aria-hidden="true" />
								</button>
							{/each}
						</div>
					</fieldset>
				</div>
				<div>
					<label for="review-name" class="block text-sm font-semibold text-ink">Your name</label>
					<input id="review-name" type="text" required bind:value={name} placeholder="Alex Morgan" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
				</div>
				<div>
					<label for="review-text" class="block text-sm font-semibold text-ink">Your review</label>
					<textarea id="review-text" required rows="4" bind:value={review} placeholder="What did you love? What could be better?" class="mt-2 w-full rounded-3xl border border-line bg-cream px-4 py-3 text-base placeholder:text-muted"></textarea>
				</div>
				<button type="submit" class="flex min-h-12 w-full items-center justify-center rounded-full bg-coffee px-6 text-base font-semibold text-white hover:bg-coffee-dark">Submit Review</button>
			</form>
		{/if}
	</div>
</section>
