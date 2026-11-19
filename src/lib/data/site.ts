// ─── The Coffee Lounge — MOCK DATA ────────────────────────────────────────
// Frontend-only site. All content below is mock/placeholder data so the
// design can be approved first. Real data replaces this file later.
// Images: only the base name is stored here; Picture.svelte builds the
// AVIF → WebP → JPG → PNG fallback chain from static/images/<name>/.
// Prices in USD ($), US business, times in America/Los_Angeles (PT).
// Note: no src/env.ts in this project — SvelteKit reserves that filename
// for its explicit env variables file, so the URL lives here.

export const site = {
	name: 'The Coffee Lounge',
	tagline: 'More Than Just Coffee',
	phoneDisplay: '+1 (415) 987-6543',
	phoneHref: 'tel:+14159876543',
	email: 'hello@thecoffeelounge.com',
	address: '123 Brew Street, Maple City, CA 94110',
	addressShort: '123 Brew Street, Maple City, CA',
	hours: 'Mon – Fri: 7:00 AM – 8:00 PM · Sat – Sun: 8:00 AM – 9:00 PM',
	hoursShort: 'Daily: 7:00 AM – 8:00 PM',
	url: 'https://coffee-lounge.pages.dev',
	mapEmbed:
		'https://maps.google.com/maps?q=123%20Brew%20Street%2C%20Maple%20City%2C%20CA&t=&z=15&ie=UTF8&iwloc=&output=embed',
	instagram: 'https://www.instagram.com/',
	facebook: 'https://www.facebook.com/',
	tiktok: 'https://www.tiktok.com/'
} as const;

export const nav = [
	{ label: 'Home', href: '/' },
	{ label: 'Menu', href: '/menu' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Locations', href: '/locations' },
	{ label: 'Events', href: '/events' },
	{ label: 'Contact', href: '/contact' }
] as const;

export const money = (n: number) => `$${n.toFixed(2)}`;

// ─── Menu ─────────────────────────────────────────────────────────────────
export type MenuItem = {
	slug: string;
	name: string;
	price: number;
	category: 'Coffee' | 'Tea & Matcha' | 'Food & Bakery';
	temp: 'Hot' | 'Cold' | 'Food';
	veg: boolean;
	bestseller?: boolean;
	signature?: boolean;
	calories: number;
	image: string;
	imageAlt: string;
	short: string;
	long: string;
	ingredients: string[];
	options: string[];
};

export const menuItems: MenuItem[] = [
	{
		slug: 'classic-cappuccino',
		name: 'Classic Cappuccino',
		price: 4.5,
		category: 'Coffee',
		temp: 'Hot',
		veg: true,
		signature: true,
		bestseller: true,
		calories: 120,
		image: 'cappuccino',
		imageAlt: 'Classic cappuccino with rosetta latte art in a white ceramic cup',
		short: 'Double espresso, steamed milk and a cloud of velvet foam.',
		long: 'Our house classic, pulled as a double shot of our Maple Roast espresso and finished with silky steamed milk and a thick cap of micro-foam. A dusting of cocoa, a rosetta on top, and the same recipe we have served since day one. Best enjoyed slowly, at the window seat.',
		ingredients: ['Double espresso', 'Steamed whole milk', 'Micro-foam', 'Cocoa dust'],
		options: ['Oat, almond or soy milk', 'Extra shot +$1.00', 'Decaf available']
	},
	{
		slug: 'caramel-macchiato',
		name: 'Caramel Macchiato',
		price: 5.25,
		category: 'Coffee',
		temp: 'Hot',
		veg: true,
		signature: true,
		calories: 240,
		image: 'caramel-macchiato',
		imageAlt: 'Tall glass of iced caramel macchiato with caramel drizzle',
		short: 'Vanilla milk, espresso and a golden caramel drizzle.',
		long: 'Vanilla-kissed steamed milk marked with two shots of espresso and finished with our house caramel drizzle. Sweet, smooth and endlessly photographable — the drink that regulars order before they even sit down.',
		ingredients: ['Espresso', 'Vanilla syrup', 'Steamed milk', 'House caramel'],
		options: ['Iced or hot', 'Sugar-free vanilla', 'Extra caramel +$0.50']
	},
	{
		slug: 'matcha-latte',
		name: 'Matcha Latte',
		price: 5.5,
		category: 'Tea & Matcha',
		temp: 'Hot',
		veg: true,
		signature: true,
		calories: 180,
		image: 'matcha-latte',
		imageAlt: 'Green matcha latte with latte art in a sage ceramic mug',
		short: 'Ceremonial-grade matcha whisked to order with steamed milk.',
		long: 'Ceremonial-grade matcha from Uji, whisked to order — never from a powder mix — and folded into steamed milk with a touch of honey. Earthy, creamy and calm in a cup, with a gentle lift instead of a jolt.',
		ingredients: ['Ceremonial matcha', 'Steamed milk', 'Honey'],
		options: ['Iced or hot', 'Oat milk (recommended)', 'Unsweetened']
	},
	{
		slug: 'mocha-delight',
		name: 'Mocha Delight',
		price: 5.75,
		category: 'Coffee',
		temp: 'Cold',
		veg: true,
		signature: true,
		calories: 320,
		image: 'mocha-delight',
		imageAlt: 'Iced mocha topped with whipped cream and chocolate drizzle',
		short: 'Espresso, Belgian chocolate and whipped cream over ice.',
		long: 'For the days that call for dessert and coffee at once. Double espresso and Belgian chocolate sauce shaken over ice, crowned with whipped cream and chocolate shavings. Rich, cold and unapologetically indulgent.',
		ingredients: ['Double espresso', 'Belgian chocolate sauce', 'Cold milk', 'Whipped cream'],
		options: ['Hot version available', 'Dark chocolate only', 'No whipped cream']
	},
	{
		slug: 'cold-brew',
		name: 'Cold Brew',
		price: 4.75,
		category: 'Coffee',
		temp: 'Cold',
		veg: true,
		signature: true,
		calories: 15,
		image: 'cold-brew',
		imageAlt: 'Tall glass of cold brew coffee over ice with an orange slice',
		short: 'Slow-steeped 18 hours — smooth, chocolatey, never bitter.',
		long: 'Our Maple Roast beans steeped in cold filtered water for 18 hours, then double-filtered. The result is naturally sweet and chocolatey, with none of the bitterness hot brewing can bring. Served over ice with an orange twist.',
		ingredients: ['Maple Roast beans', 'Filtered water', 'Orange twist'],
		options: ['Sweet cream cold foam +$1.00', 'Nitro on tap +$0.75', 'Large +$1.00']
	},
	{
		slug: 'butter-croissant',
		name: 'Butter Croissant',
		price: 3.75,
		category: 'Food & Bakery',
		temp: 'Food',
		veg: true,
		bestseller: true,
		calories: 280,
		image: 'butter-croissant',
		imageAlt: 'Golden flaky butter croissant on a ceramic plate',
		short: 'Baked in-house every morning — shattering layers, soft heart.',
		long: 'Laminated overnight, baked in-house at 6 AM and gone by noon most days. Twenty-seven layers of French butter pastry with a shattering crust and a soft, honeyed middle. Warm it up and add a pat of salted butter — trust us.',
		ingredients: ['French butter', 'Flour', 'Yeast', 'Sea salt'],
		options: ['Warmed to order', 'Almond filling +$1.25', 'Chocolate filling +$1.25']
	},
	{
		slug: 'chocolate-cake',
		name: 'Chocolate Cake',
		price: 6.5,
		category: 'Food & Bakery',
		temp: 'Food',
		veg: true,
		bestseller: true,
		calories: 420,
		image: 'chocolate-cake',
		imageAlt: 'Slice of rich chocolate layer cake with ganache and a strawberry',
		short: 'Three layers of dark chocolate, glossy ganache, one strawberry.',
		long: 'Three layers of dark chocolate sponge, espresso-soaked and stacked with silky ganache, finished with a single strawberry. Baked by our in-house pastry team every morning — the slice that sells out first, every single day.',
		ingredients: ['Dark chocolate', 'Espresso', 'Butter', 'Cream', 'Strawberry'],
		options: ['Gluten-free slice (ask)', 'Add vanilla gelato +$2.50', 'Whole cake to order']
	},
	{
		slug: 'grilled-veg-sandwich',
		name: 'Grilled Veg Sandwich',
		price: 8.95,
		category: 'Food & Bakery',
		temp: 'Food',
		veg: true,
		bestseller: true,
		calories: 380,
		image: 'veg-sandwich',
		imageAlt: 'Grilled vegetable sandwich with peppers and melted cheese on a wooden board',
		short: 'Char-grilled peppers, pesto and melted cheese on sourdough.',
		long: 'Char-grilled peppers, zucchini and tomato with basil pesto and melted provolone, pressed on toasted sourdough until the edges go crisp. Our most-ordered lunch — pairs perfectly with a cold brew.',
		ingredients: ['Sourdough', 'Grilled peppers & zucchini', 'Basil pesto', 'Provolone'],
		options: ['Add avocado +$1.50', 'Gluten-free bread', 'Vegan cheese swap']
	},
	{
		slug: 'honey-lavender-latte',
		name: 'Honey Lavender Latte',
		price: 5.5,
		category: 'Coffee',
		temp: 'Hot',
		veg: true,
		calories: 190,
		image: 'hero-latte',
		imageAlt: 'Honey lavender latte with leaf latte art and cookies on a wooden table',
		short: 'Espresso, honey and a whisper of lavender — our spring signature.',
		long: 'A double shot softened with local honey and house-made lavender syrup, under a rosetta of steamed milk. Floral without being soapy, sweet without being sticky — the latte our baristas drink on their breaks.',
		ingredients: ['Double espresso', 'Local honey', 'Lavender syrup', 'Steamed milk'],
		options: ['Iced or hot', 'Oat milk (recommended)', 'Extra lavender +$0.50']
	},
	{
		slug: 'baristas-pour-over',
		name: "Barista's Pour-Over",
		price: 5.95,
		category: 'Coffee',
		temp: 'Hot',
		veg: true,
		calories: 10,
		image: 'barista',
		imageAlt: 'Barista in a brown apron pouring latte art at the espresso machine',
		short: 'Single-origin of the week, brewed by hand at the slow bar.',
		long: 'Every week our head barista picks one single-origin lot and brews it by hand at the slow bar — V60, 94°C water, three careful pours. Ask what is on this week: it might be a floral Ethiopian or a syrupy Colombian. Black coffee, at its best.',
		ingredients: ['Single-origin beans (rotating)', 'Filtered water'],
		options: ['Choose your origin', 'Brewed to take home (12 oz bag $16)']
	}
];

export const menuCategories = ['All', 'Coffee', 'Tea & Matcha', 'Food & Bakery'] as const;
export const menuTemps = ['All', 'Hot', 'Cold', 'Food'] as const;

// ─── Locations ────────────────────────────────────────────────────────────
export type Location = {
	id: string;
	name: string;
	address: string;
	phone: string;
	hours: string;
	features: string[];
	mapEmbed: string;
};

export const locations: Location[] = [
	{
		id: 'brew-street',
		name: 'Brew Street — Flagship',
		address: '123 Brew Street, Maple City, CA 94110',
		phone: '+1 (415) 987-6543',
		hours: 'Mon – Fri: 7:00 AM – 8:00 PM · Sat – Sun: 8:00 AM – 9:00 PM',
		features: ['Work-friendly tables', 'Free Wi-Fi', 'Outdoor patio', 'Pour-over slow bar'],
		mapEmbed:
			'https://maps.google.com/maps?q=123%20Brew%20Street%2C%20Maple%20City%2C%20CA&t=&z=15&ie=UTF8&iwloc=&output=embed'
	},
	{
		id: 'maple-square',
		name: 'Maple Square',
		address: '48 Maple Square, Maple City, CA 94111',
		phone: '+1 (415) 987-6544',
		hours: 'Mon – Fri: 7:00 AM – 7:00 PM · Sat – Sun: 8:00 AM – 6:00 PM',
		features: ['Grab-and-go counter', 'Free Wi-Fi', 'Seasonal patio seating'],
		mapEmbed:
			'https://maps.google.com/maps?q=Maple%20Square%2C%20Maple%20City%2C%20CA&t=&z=15&ie=UTF8&iwloc=&output=embed'
	},
	{
		id: 'riverside',
		name: 'Riverside Roastery',
		address: '9 Riverside Walk, Maple City, CA 94112',
		phone: '+1 (415) 987-6545',
		hours: 'Mon – Sat: 8:00 AM – 6:00 PM · Sun: 9:00 AM – 5:00 PM',
		features: ['Roastery tours Saturdays', 'Bean retail wall', 'Cupping events', 'Free Wi-Fi'],
		mapEmbed:
			'https://maps.google.com/maps?q=Riverside%20Walk%2C%20Maple%20City%2C%20CA&t=&z=15&ie=UTF8&iwloc=&output=embed'
	}
];

// ─── Events ───────────────────────────────────────────────────────────────
export type EventItem = {
	id: string;
	title: string;
	date: string;
	time: string;
	location: string;
	price: string;
	description: string;
};

export const events: EventItem[] = [
	{
		id: 'latte-art-workshop',
		title: 'Latte Art Workshop',
		date: 'Saturday, November 28, 2026',
		time: '10:00 AM – 12:00 PM',
		location: 'Brew Street — Flagship',
		price: '$35 per person',
		description:
			'Two hours with our head barista: milk texturing, pitcher control and your first rosetta. All equipment provided, and you take home your best pour (and a bag of beans).'
	},
	{
		id: 'acoustic-friday',
		title: 'Live Acoustic Fridays',
		date: 'Every Friday',
		time: '6:00 PM – 8:00 PM',
		location: 'Brew Street — Flagship',
		price: 'Free entry',
		description:
			'Local singer-songwriters, low lights and the espresso machine humming along. No cover, no tickets — just come early, the window seats go fast.'
	},
	{
		id: 'coffee-tasting-flight',
		title: 'Coffee Tasting Flight',
		date: 'Sunday, December 6, 2026',
		time: '11:00 AM – 12:30 PM',
		location: 'Riverside Roastery',
		price: '$25 per person',
		description:
			'Taste four single origins side by side — Ethiopia, Colombia, Kenya and Sumatra — and learn to name what you are tasting. Includes a tasting card and 10% off beans that day.'
	},
	{
		id: 'book-club-morning',
		title: 'Book Club Morning',
		date: 'First Saturday of the month',
		time: '9:00 AM – 10:30 AM',
		location: 'Maple Square',
		price: 'Free · coffee at happy-hour prices',
		description:
			'One book a month, chosen by the group, discussed over bottomless filter coffee. New members always welcome — the December pick is announced at the counter.'
	}
];

// ─── Blog ─────────────────────────────────────────────────────────────────
export type BlogPost = {
	slug: string;
	title: string;
	category: string;
	date: string;
	readTime: string;
	image: string;
	alt: string;
	excerpt: string;
	body: string[];
};

export const blogPosts: BlogPost[] = [
	{
		slug: 'how-we-roast',
		title: 'How We Roast: From Green Bean to Your Cup',
		category: 'Behind the Beans',
		date: 'November 12, 2026',
		readTime: '5 min read',
		image: 'coffee-beans',
		alt: 'Freshly roasted coffee beans spilling from a burlap sack',
		excerpt:
			'Roasting is where coffee stops being agriculture and starts being craft. Here is what happens inside our Riverside roastery every Tuesday.',
		body: [
			'Every Tuesday at 7 AM, the Riverside roastery smells like toasted hazelnut and caramel. That is roast day — the one morning a week when we turn green coffee, which smells faintly of grass and hay, into the beans that fill every cup across our three cafés.',
			'It starts with the lot. We buy from six small farms we have worked with for years, and every sack is cupped before it is approved. A good lot is sweet even before roasting: dried cherry, brown sugar, a clean finish. If a sample tastes flat or papery, it never makes it into the drum.',
			'The roast itself is a twelve-minute conversation between heat and time. We charge the drum at 200°C, watch the beans turn from green to yellow to cinnamon, and listen for first crack — the soft popcorn sound that tells us the sugars are caramelising. Our Maple Roast drops just after first crack ends, which keeps the chocolate notes forward and the acidity gentle.',
			'After the roast comes the rest. Beans need 24 to 48 hours to degas before they brew their best, which is why Tuesday’s roast is Friday’s espresso. It is a small delay that makes a real difference — and it is the reason our regulars say the weekend coffee tastes better.',
			'If you want to see it up close, our Saturday roastery tours run at 10 AM at Riverside. You will leave smelling faintly of smoke and carrying a bag of whatever came out of the drum that morning.'
		]
	},
	{
		slug: 'latte-art-at-home',
		title: 'Latte Art at Home: The 5 Mistakes Everyone Makes',
		category: 'Brew Guides',
		date: 'November 4, 2026',
		readTime: '4 min read',
		image: 'hero-latte',
		alt: 'Latte with leaf latte art and cookies on a wooden café table',
		excerpt:
			'You do not need a $2,000 machine to pour a heart. You need to stop making these five mistakes first.',
		body: [
			'Latte art looks like magic and behaves like plumbing: it is mostly about milk texture and pour height. Get those two right and a heart is genuinely within reach on a home machine.',
			'Mistake one is milk that is too hot. Above 65°C the proteins tighten and the foam goes stiff — great for a cappuccino cap, useless for pouring. Aim for 60°C, about the temperature where the pitcher is just too hot to hold comfortably.',
			'Mistake two is a pitcher that is too full. Fill it only to just below the spout. Any more and you cannot get the whirlpool going that folds air in evenly.',
			'Mistake three is pouring from too high for too long. Start high and slow to mix the milk under the crema, then drop the spout close to the surface and speed up — that is when the white appears.',
			'Mistake four is rushing the wiggle. A rosetta is a slow side-to-side sway while you move the pitcher backwards. Go slow enough to count it.',
			'And mistake five is practicing on expensive beans. Use water with a drop of dish soap in a jug to practice the pour motion for free, then switch to milk. Or just come to our Latte Art Workshop on November 28 — we provide the milk, the mess and the encouragement.'
		]
	},
	{
		slug: 'cafe-as-third-place',
		title: 'The Café as a Third Place: Why We Built the Lounge',
		category: 'Our Story',
		date: 'October 22, 2026',
		readTime: '6 min read',
		image: 'cafe-interior',
		alt: 'Modern café interior with armchairs, wooden ceiling and warm pendant lights',
		excerpt:
			'Home is the first place, work is the second. We wanted to build the third — somewhere you belong without having to buy belonging.',
		body: [
			'The sociologist Ray Oldenburg called cafés, pubs and barbershops “third places” — the spots between home and work where community actually happens. When we opened The Coffee Lounge in 2019, that idea was taped to the wall of our empty shop: build a third place, and the coffee will take care of itself.',
			'So we made choices that look odd on a spreadsheet. Tables are spaced for conversation, not capacity. The Wi-Fi password is on the wall, not behind a purchase. Nobody is ever asked to leave for lingering, and the same corner table has been “Mara’s table” since 2020 because she writes there every morning.',
			'It worked the way third places are supposed to work. The book club started itself. Two regulars got engaged at table seven. A startup was founded at the long communal table — they still meet there on Fridays, and they still order the same thing.',
			'None of that is in the menu, and all of it is the point. A café is not a coffee vending machine with chairs. It is a room a neighbourhood shares, and the coffee is just the excuse to be in it together.',
			'If you have never stayed past your second cup, try it sometime. The best part of the Lounge happens after the coffee is gone.'
		]
	}
];

// ─── Testimonials ─────────────────────────────────────────────────────────
export const testimonials = [
	{
		name: 'Emily Carter',
		role: 'Regular since 2021',
		stars: 5,
		quote:
			'Amazing coffee, cozy vibe, and friendly staff! My go-to place for work and hangouts.'
	},
	{
		name: 'Marcus Bell',
		role: 'Cold brew loyalist',
		stars: 5,
		quote:
			'The cold brew here ruined every other cold brew for me. Smooth, chocolatey, never bitter — and the Riverside roastery tour is a must.'
	},
	{
		name: 'Priya Nair',
		role: 'Weekend regular',
		stars: 5,
		quote:
			'I bring my laptop on Saturdays and my book club on the first Saturday of the month. It feels less like a café and more like a living room.'
	}
] as const;

// ─── FAQ ──────────────────────────────────────────────────────────────────
export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
	{
		q: 'Do you offer dairy-free milk options?',
		a: 'Yes — oat, almond and soy milk are available in every drink at no extra charge. Oat is our baristas’ pick for lattes and matcha.'
	},
	{
		q: 'Can I order ahead for pickup?',
		a: 'Yes. Order through the Order page, choose pickup and your café, and we will have it ready in about 15 minutes. You will get an order reference to show at the counter.'
	},
	{
		q: 'Do you deliver?',
		a: 'Yes, within 5 miles of each café. Delivery is $2.99 and free on orders of $25 or more. Delivery hours match café hours.'
	},
	{
		q: 'Is there Wi-Fi and space to work?',
		a: 'Free Wi-Fi at all three locations, plus outlets at most tables at Brew Street and Riverside. We never rush anyone out — stay as long as you like.'
	},
	{
		q: 'Do you sell beans to take home?',
		a: 'Yes. Whole-bean bags of our Maple Roast and the single origin of the week are sold at every counter and at the Riverside roastery, ground to order if you ask.'
	},
	{
		q: 'How do Coffee Loop points work?',
		a: 'Every $1 earns 1 point. At 100 points you reach Roast tier (free pastry on your birthday and 10% off beans), and at 250 points you reach Reserve tier (a free drink every month and early access to events). Points never expire.'
	}
] as const;

// ─── Gift cards & loyalty ─────────────────────────────────────────────────
export const giftCards = [
	{ amount: 25, note: 'A week of morning coffees' },
	{ amount: 50, note: 'The classic gift — coffee + cake' },
	{ amount: 75, note: 'For the serious regular' },
	{ amount: 100, note: 'The full Lounge treatment' }
] as const;

export const loyaltyTiers = [
	{
		name: 'Bean',
		points: '0+ points',
		perks: ['1 point per $1', 'Birthday treat', 'Member-only offers']
	},
	{
		name: 'Roast',
		points: '100+ points',
		perks: ['Everything in Bean', 'Free pastry on your birthday', '10% off retail beans']
	},
	{
		name: 'Reserve',
		points: '250+ points',
		perks: ['Everything in Roast', 'One free drink every month', 'Early access to events']
	}
] as const;

// ─── Order ────────────────────────────────────────────────────────────────
export const TAX_RATE = 0.085;
export const DELIVERY_FEE = 2.99;
export const FREE_DELIVERY_MIN = 25;
