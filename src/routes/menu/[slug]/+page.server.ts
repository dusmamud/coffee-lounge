import { error } from '@sveltejs/kit';
import { menuItems } from '#lib/data/site.ts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function entries() {
	return menuItems.map((m) => ({ slug: m.slug }));
}

export const load: PageServerLoad = ({ params }) => {
	const item = menuItems.find((m) => m.slug === params.slug);
	if (!item) error(404, 'Menu item not found');
	return { item };
};
