<script lang="ts">
	import { Check, Clock, MapPin } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { careers, site } from '#lib/data/site.ts';

	let appliedId = $state('');
	// One form state per role, initialised up front — typing in one form
	// never fills the others, and each input binds to its own object.
	let forms = $state<Record<string, { name: string; email: string }>>(
		Object.fromEntries(careers.map((r) => [r.id, { name: '', email: '' }]))
	);
	const formFor = (id: string) => forms[id];

	const apply = (e: Event, id: string) => {
		e.preventDefault();
		const f = formFor(id);
		if (f.name.trim() && f.email.includes('@')) appliedId = id;
	};
</script>

<svelte:head>
	<title>Careers — {site.name} | Barista, Pastry & Events Jobs in Maple City</title>
	<meta name="description" content="Work at The Coffee Lounge: head barista, weekend barista, pastry chef and events host roles across our three Maple City cafés. Free coffee, always." />
</svelte:head>

<PageHero
	eyebrow="CAREERS"
	title="Come Work Where It Smells Like Coffee"
	subtitle="No experience needed for most roles — we train you, pay you properly, and the coffee is free. Four openings right now."
/>

<section class="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-[1fr_320px]">
		<div class="min-w-0 space-y-6">
			{#each careers as role}
				<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
					<div class="flex flex-wrap items-start justify-between gap-3">
						<div>
							<h2 class="font-display text-2xl font-medium text-ink">{role.title}</h2>
							<p class="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
								<span class="inline-flex items-center gap-1"><MapPin size={14} aria-hidden="true" /> {role.location}</span>
								<span class="inline-flex items-center gap-1"><Clock size={14} aria-hidden="true" /> {role.type}</span>
							</p>
						</div>
						<p class="font-display text-lg font-semibold text-coffee">{role.pay}</p>
					</div>
					<p class="mt-3 leading-relaxed text-muted">{role.blurb}</p>
					<ul class="mt-3 flex flex-wrap gap-2">
						{#each role.perks as perk}
							<li class="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-coffee"><Check size={13} aria-hidden="true" /> {perk}</li>
						{/each}
					</ul>
					{#if appliedId === role.id}
						<p role="status" class="mt-5 rounded-2xl bg-sand p-4 font-semibold text-ink">
							Thanks, {formFor(role.id).name.split(' ')[0]}! Your application for {role.title} is in (mock) — we reply within a week.
						</p>
					{:else}
						<form onsubmit={(e) => apply(e, role.id)} class="mt-5 flex flex-col gap-2 sm:flex-row">
							<label for="apply-name-{role.id}" class="sr-only">Your name</label>
							<input id="apply-name-{role.id}" type="text" required bind:value={forms[role.id].name} placeholder="Your name" class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
							<label for="apply-email-{role.id}" class="sr-only">Email address</label>
							<input id="apply-email-{role.id}" type="email" required bind:value={forms[role.id].email} placeholder="you@email.com" class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-cream px-4 text-base placeholder:text-muted" />
							<button type="submit" class="inline-flex min-h-12 items-center justify-center rounded-full bg-coffee px-6 text-sm font-semibold whitespace-nowrap text-white hover:bg-coffee-dark">Apply Now</button>
						</form>
					{/if}
				</article>
			{/each}
		</div>
		<aside class="h-fit min-w-0 space-y-6">
			<div class="min-w-0 overflow-hidden rounded-3xl ring-1 ring-line">
				<Picture
					name="team-baristas"
					alt="Three baristas in brown aprons smiling behind the espresso counter"
					width={800}
					height={600}
					sizes="(max-width: 1024px) 90vw, 320px"
					imgClass="aspect-[4/3] h-auto w-full object-cover"
					pictureClass="block"
				/>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="font-display text-xl font-semibold text-ink">Why work here</h2>
				<ul class="mt-3 space-y-2 text-[0.95rem] text-muted">
					{#each ['Free coffee on every shift — and beans to take home', 'Paid SCA barista training', 'Tips pooled fairly, paid weekly', 'Health + dental after 90 days (full-time)', 'First pick of event tickets and workshops'] as perk}
						<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-coffee" aria-hidden="true" /> {perk}</li>
					{/each}
				</ul>
			</div>
		</aside>
	</div>
	<p class="mt-6 text-center text-sm text-muted">Do not see your role? Write to {site.email} — we keep good applications on file for 6 months.</p>
</section>
