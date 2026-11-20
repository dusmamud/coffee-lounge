import { error } from '@sveltejs/kit';
import { shopProducts } from '#lib/data/site.ts';
import type { PageServerLoad } from './$types';

export function entries() {
	return shopProducts.map((p) => ({ slug: p.id }));
}

export const load: PageServerLoad = ({ params }) => {
	const product = shopProducts.find((p) => p.id === params.slug);
	if (!product) error(404, 'Product not found');
	return { product, related: shopProducts.filter((p) => p.id !== product.id).slice(0, 3) };
};
