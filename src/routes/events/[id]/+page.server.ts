import { error } from '@sveltejs/kit';
import { events } from '#lib/data/site.ts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function entries() {
	return events.map((e) => ({ id: e.id }));
}

export const load: PageServerLoad = ({ params }) => {
	const event = events.find((e) => e.id === params.id);
	if (!event) error(404, 'Event not found');
	return { event };
};
