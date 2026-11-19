import { error } from '@sveltejs/kit';
import { locations } from '#lib/data/site.ts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function entries() {
	return locations.map((l) => ({ id: l.id }));
}

export const load: PageServerLoad = ({ params }) => {
	const location = locations.find((l) => l.id === params.id);
	if (!location) error(404, 'Location not found');
	return { location };
};
