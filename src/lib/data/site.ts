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
	instagram: 'https://www.instagram.com/thecoffeelounge',
	facebook: 'https://www.facebook.com/thecoffeelounge',
	tiktok: 'https://www.tiktok.com/@thecoffeelounge'
} as const;

export const nav = [
	{ label: 'Home', href: '/' },
	{ label: 'Menu', href: '/menu' },
	{ label: 'Shop', href: '/shop' },
	{ label: 'Locations', href: '/locations' },
	{ label: 'Events', href: '/events' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Contact', href: '/contact' }
] as const;

export const moreNav = [
	{ label: 'Search', href: '/search' },
	{ label: 'Track Your Order', href: '/track-order' },
	{ label: 'Coffee Loop Rewards', href: '/loyalty' },
	{ label: 'Brew Guides', href: '/brew-guides' },
	{ label: 'Reviews', href: '/reviews' },
	{ label: 'Catering & Private Events', href: '/catering' },
	{ label: 'Gift Cards', href: '/gift-cards' },
	{ label: 'First Visit', href: '/first-visit' },
	{ label: 'Nutrition & Allergens', href: '/nutrition' },
	{ label: 'Careers', href: '/careers' },
	{ label: 'Wholesale', href: '/wholesale' },
{ label: 'Reservations', href: '/reservations' },
	{ label: 'My Account', href: '/account' },
	{ label: 'Delivery', href: '/delivery' },
	{ label: 'Classes & Workshops', href: '/classes' },
	{ label: 'Private Hire', href: '/private-hire' },
	{ label: 'Seasonal Menu', href: '/seasonal' },
	{ label: 'Our Team', href: '/team' },
	{ label: 'Sustainability', href: '/sustainability' },
	{ label: 'Press', href: '/press' },
	{ label: 'Corporate Gifting', href: '/corporate-gifting' },
	{ label: 'Community', href: '/community' },
	{ label: 'Gift Card Balance', href: '/gift-cards/balance' },
	{ label: 'Sitemap', href: '/sitemap' },
	{ label: 'Accessibility', href: '/accessibility' },
	{ label: 'Gallery', href: '/gallery' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'FAQ', href: '/faq' }
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
	vegan: boolean;
	glutenFree: boolean;
	nutFree: boolean;
	dairyFree: boolean;
	bestseller?: boolean;
	signature?: boolean;
	calories: number;
	allergens: string[];
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
		vegan: false,
		glutenFree: true,
		nutFree: true,
		dairyFree: false,
		signature: true,
		bestseller: true,
		calories: 120,
		allergens: ['Milk'],
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
		vegan: false,
		glutenFree: true,
		nutFree: true,
		dairyFree: false,
		signature: true,
		calories: 240,
		allergens: ['Milk'],
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
		vegan: false,
		glutenFree: true,
		nutFree: true,
		dairyFree: false,
		signature: true,
		calories: 180,
		allergens: ['Milk'],
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
		vegan: false,
		glutenFree: true,
		nutFree: true,
		dairyFree: false,
		signature: true,
		calories: 320,
		allergens: ['Milk'],
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
		vegan: true,
		glutenFree: true,
		nutFree: true,
		dairyFree: true,
		signature: true,
		calories: 15,
		allergens: [],
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
		vegan: false,
		glutenFree: false,
		nutFree: true,
		dairyFree: false,
		bestseller: true,
		calories: 280,
		allergens: ['Milk', 'Wheat', 'Egg'],
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
		vegan: false,
		glutenFree: false,
		nutFree: true,
		dairyFree: false,
		bestseller: true,
		calories: 420,
		allergens: ['Milk', 'Wheat', 'Egg'],
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
		vegan: false,
		glutenFree: false,
		nutFree: false,
		dairyFree: false,
		bestseller: true,
		calories: 380,
		allergens: ['Wheat', 'Milk', 'Tree nuts (pesto)'],
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
		vegan: false,
		glutenFree: true,
		nutFree: true,
		dairyFree: false,
		calories: 190,
		allergens: ['Milk'],
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
		vegan: true,
		glutenFree: true,
		nutFree: true,
		dairyFree: true,
		calories: 10,
		allergens: [],
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
	long: string;
	seating: string;
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
			'https://maps.google.com/maps?q=123%20Brew%20Street%2C%20Maple%20City%2C%20CA&t=&z=15&ie=UTF8&iwloc=&output=embed',
		long: 'Our first café and still our heart: a 60-seat room with a slow bar, a window counter for laptop work and a sunlit patio. The roastery is two blocks away, so the beans never travel far.',
		seating: '60 seats · window counter · 24-seat patio'
	},
	{
		id: 'maple-square',
		name: 'Maple Square',
		address: '48 Maple Square, Maple City, CA 94111',
		phone: '+1 (415) 987-6544',
		hours: 'Mon – Fri: 7:00 AM – 7:00 PM · Sat – Sun: 8:00 AM – 6:00 PM',
		features: ['Grab-and-go counter', 'Free Wi-Fi', 'Seasonal patio seating'],
		mapEmbed:
			'https://maps.google.com/maps?q=Maple%20Square%2C%20Maple%20City%2C%20CA&t=&z=15&ie=UTF8&iwloc=&output=embed',
		long: 'The quick one. A bright grab-and-go counter in the square for the morning rush, with a small patio for sunny days and the same Maple Roast on bar.',
		seating: '18 seats · seasonal patio'
	},
	{
		id: 'riverside',
		name: 'Riverside Roastery',
		address: '9 Riverside Walk, Maple City, CA 94112',
		phone: '+1 (415) 987-6545',
		hours: 'Mon – Sat: 8:00 AM – 6:00 PM · Sun: 9:00 AM – 5:00 PM',
		features: ['Roastery tours Saturdays', 'Bean retail wall', 'Cupping events', 'Free Wi-Fi'],
		mapEmbed:
			'https://maps.google.com/maps?q=Riverside%20Walk%2C%20Maple%20City%2C%20CA&t=&z=15&ie=UTF8&iwloc=&output=embed',
		long: 'Where the coffee is made. Our roastery and tasting room on the river walk — watch the Tuesday roast, cup the origins of the week at the slow bar, and take beans home from the retail wall.',
		seating: '40 seats · roastery viewing window · cupping table'
	}
];

// ─── Events ───────────────────────────────────────────────────────────────
export type EventItem = {
	id: string;
	title: string;
	date: string;
	startDate: string;
	time: string;
	spotsLeft: number;
	free: boolean;
	walkIn: boolean;
	location: string;
	price: string;
	description: string;
	long: string;
	spots: string;
	host: string;
	includes: string[];
};

export const events: EventItem[] = [
	{
		id: 'latte-art-workshop',
		title: 'Latte Art Workshop',
		date: 'Saturday, November 28, 2026',

		startDate: '2026-11-28T10:00:00-08:00',
		spotsLeft: 2,
		free: false,
		walkIn: false,		time: '10:00 AM – 12:00 PM',
		location: 'Brew Street — Flagship',
		price: '$35 per person',
		description:
			'Two hours with our head barista: milk texturing, pitcher control and your first rosetta. All equipment provided, and you take home your best pour (and a bag of beans).',
		long: 'You will start with the science of milk — temperature, texture, why 60°C matters — then pour heart after heart until the muscle memory lands. Small groups of eight, two baristas, unlimited milk. Everyone leaves with their best pour photographed, a bag of Maple Roast, and a pitcher of their own.',
		spots: '8 spots · 2 left',
		host: 'Maya Chen, Head Barista',
		includes: ['All equipment + milk', 'Your own pouring pitcher', 'Bag of Maple Roast beans', 'Printed pour guide']
	},
	{
		id: 'acoustic-friday',
		title: 'Live Acoustic Fridays',
		date: 'Every Friday',

		startDate: '2026-11-27T18:00:00-08:00',
		spotsLeft: 40,
		free: true,
		walkIn: true,		time: '6:00 PM – 8:00 PM',
		location: 'Brew Street — Flagship',
		price: 'Free entry',
		description:
			'Local singer-songwriters, low lights and the espresso machine humming along. No cover, no tickets — just come early, the window seats go fast.',
		long: 'Every Friday the lights go low and a local singer-songwriter takes the corner by the window. Sets run 6–8 PM with a break at 7; the espresso machine keeps humming along. No cover and no tickets — come early, the window seats go fast and the regulars claim them by 5:30.',
		spots: 'Walk-in · no booking needed',
		host: 'Rotating local artists',
		includes: ['Free entry', 'Happy-hour pastries from 5 PM', 'Request wall — pick the last song']
	},
	{
		id: 'coffee-tasting-flight',
		title: 'Coffee Tasting Flight',
		date: 'Sunday, December 6, 2026',

		startDate: '2026-12-06T11:00:00-08:00',
		spotsLeft: 12,
		free: false,
		walkIn: false,		time: '11:00 AM – 12:30 PM',
		location: 'Riverside Roastery',
		price: '$25 per person',
		description:
			'Taste four single origins side by side — Ethiopia, Colombia, Kenya and Sumatra — and learn to name what you are tasting. Includes a tasting card and 10% off beans that day.',
		long: 'Four origins, four cups, one long table. We brew Ethiopia, Colombia, Kenya and Sumatra side by side and teach you to name what you are tasting — acidity, sweetness, body — without any wine-snob vocabulary. You keep the tasting card, and beans are 10% off that day.',
		spots: '12 spots',
		host: 'Jonas Park, Roastmaster',
		includes: ['Four guided tastings', 'Printed tasting card', '10% off beans that day', 'Filter coffee refills']
	},
	{
		id: 'book-club-morning',
		title: 'Book Club Morning',
		date: 'First Saturday of the month',

		startDate: '2026-12-05T09:00:00-08:00',
		spotsLeft: 30,
		free: true,
		walkIn: true,		time: '9:00 AM – 10:30 AM',
		location: 'Maple Square',
		price: 'Free · coffee at happy-hour prices',
		description:
			'One book a month, chosen by the group, discussed over bottomless filter coffee. New members always welcome — the December pick is announced at the counter.',
		long: 'One book a month, chosen by the group, discussed over bottomless filter coffee. The December pick is announced at the counter in November. New members are always welcome — you do not need to have finished the book, only to have started it.',
		spots: 'Drop in · free',
		host: 'The Maple Square regulars',
		includes: ['Bottomless filter coffee', 'Happy-hour coffee prices', 'Next month\'s pick reveal']
	}
];

// ─── Blog ─────────────────────────────────────────────────────────────────
export type BlogPost = {
	slug: string;
	title: string;
	author: string;
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

		author: 'Jonas Park, Roastmaster',		category: 'Behind the Beans',
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

		author: 'Maya Chen, Head Barista',		category: 'Brew Guides',
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

		author: 'Alex Morgan, Founder',		category: 'Our Story',
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
	},
	{
		name: 'Daniel Okafor',
		role: 'Latte art workshop graduate',
		stars: 5,
		quote:
			'I took the latte art workshop in November and poured my first rosetta on the third try. Maya is a patient teacher and the milk is endless.'
	},
	{
		name: 'Sofia Marino',
		role: 'Maple Square regular',
		stars: 5,
		quote:
			'The Maple Square counter is my morning ritual — in and out in four minutes, and they start my macchiato when they see me crossing the square.'
	},
	{
		name: 'Tom Whitfield',
		role: 'Catering client',
		stars: 5,
		quote:
			'They catered our office launch for 60 people — coffee urn, pastries, sandwiches — and it arrived hot, on time, and beautifully set up.'
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

// ─── Shop: beans, subscriptions & merch ───────────────────────────────────
export type ShopProduct = {
	id: string;
	name: string;
	price: number;
	kind: 'Beans' | 'Merch';
	image: string;
	imageAlt: string;
	short: string;
	badge?: string;
	origin?: string;
	farm?: string;
	altitude?: string;
	varietal?: string;
	process?: string;
	tastingNotes?: string[];
	roastLevel?: string;
};

export const shopProducts: ShopProduct[] = [
	{
		id: 'maple-roast-beans',
		name: 'Maple Roast — Whole Bean, 12 oz',
		price: 16,
		kind: 'Beans',
		image: 'coffee-beans',
		imageAlt: 'Bag of Maple Roast whole coffee beans beside roasted beans',
		short: 'Our house espresso blend: chocolate, brown sugar, gentle acidity. Roasted Tuesdays at Riverside.',		origin: 'Maple City blend — Brazil & Colombia',
		farm: 'Smallholder co-ops, Cerrado (Brazil) & Huila (Colombia)',
		altitude: '1,100–1,700 m',
		varietal: 'Yellow Catuaí & Castillo',
		process: 'Washed & natural, blended after roast',
		tastingNotes: ['Dark chocolate', 'brown sugar', 'toasted hazelnut'],
		roastLevel: 'Medium-dark',

		badge: 'Bestseller'
	},
	{
		id: 'ethiopia-single-origin',
		name: 'Ethiopia Yirgacheffe — Single Origin, 12 oz',
		price: 19,
		kind: 'Beans',
		image: 'coffee-beans',
		imageAlt: 'Single-origin Ethiopian coffee beans in a kraft bag',
		short: 'Floral, bergamot and stone fruit. The single origin of the week, brewed at the slow bar.',		origin: 'Yirgacheffe, Ethiopia',
		farm: 'Kochere co-operative, Yirgacheffe',
		altitude: '1,900–2,200 m',
		varietal: 'Heirloom',
		process: 'Washed, sun-dried on raised beds',
		tastingNotes: ['Bergamot', 'jasmine', 'stone fruit'],
		roastLevel: 'Light-medium',

		badge: 'Limited lot'
	},
	{
		id: 'colombia-single-origin',
		name: 'Colombia Huila — Single Origin, 12 oz',
		price: 18,
		kind: 'Beans',
		image: 'coffee-beans',
		imageAlt: 'Single-origin Colombian coffee beans in a kraft bag',
		short: 'Syrupy and sweet: panela, red apple and cocoa. Great as filter or espresso.',		origin: 'Huila, Colombia',
		farm: 'La Palma co-operative, Huila',
		altitude: '1,600–1,850 m',
		varietal: 'Castillo & Caturra',
		process: 'Washed, 18-hour fermentation',
		tastingNotes: ['Panela', 'red apple', 'cocoa'],
		roastLevel: 'Medium',

		badge: 'New lot'
	},
	{
		id: 'cold-brew-kit',
		name: 'Cold Brew Kit — Beans + Filter Bags',
		price: 24,
		kind: 'Beans',
		image: 'cold-brew',
		imageAlt: 'Cold brew coffee kit with beans and filter bags',
		short: 'Everything for 18-hour cold brew at home: 12 oz Maple Roast, 6 filter bags and our recipe card.',
		origin: 'Maple Roast, Brazil & Colombia',
		farm: 'Smallholder co-ops, Cerrado (Brazil) & Huila (Colombia)',
		altitude: '1,100–1,700 m',
		varietal: 'Yellow Catuaí & Castillo',
		process: 'Washed & natural',
		tastingNotes: ['Dark chocolate', 'brown sugar', 'orange'],
		roastLevel: 'Medium-dark',

	},
	{
		id: 'lounge-mug',
		name: 'The Lounge Mug — 12 oz Ceramic',
		price: 22,
		kind: 'Merch',
		image: 'hero-latte',
		imageAlt: 'Cream ceramic Lounge mug with latte art',
		short: 'The same weighty ceramic mug we serve in — cream glaze, brown logo, dishwasher-safe.'
	},
	{
		id: 'lounge-tote',
		name: 'Coffee Loop Tote Bag',
		price: 18,
		kind: 'Merch',
		image: 'cafe-interior',
		imageAlt: 'Canvas tote bag with The Coffee Lounge logo',
		short: 'Heavy canvas, fits a laptop and a book. Free with any Reserve-tier signup (mock).'
	}
];

export type SubscriptionPlan = {
	id: string;
	name: string;
	price: number;
	per: string;
	blurb: string;
	perks: string[];
	highlight?: boolean;
};

export const subscriptions: SubscriptionPlan[] = [
	{
		id: 'taster',
		name: 'The Taster',
		price: 16,
		per: 'per month · 1 bag',
		blurb: 'One 12 oz bag a month — our Maple Roast, or the single origin of the week.',
		perks: ['12 oz whole bean (or ground)', 'Pause or skip anytime', 'Free pickup at any café']
	},
	{
		id: 'regular',
		name: 'The Regular',
		price: 29,
		per: 'per month · 2 bags',
		blurb: 'Two bags a month, always one house roast and one rotating single origin.',
		perks: ['Everything in Taster', 'Free shipping, US-wide', 'Tasting notes + brew card each month', '10% off café drinks'],
		highlight: true
	},
	{
		id: 'reserve',
		name: 'The Reserve',
		price: 49,
		per: 'per month · 3 bags',
		blurb: 'Three bags, including a limited micro-lot you cannot buy at the counter.',
		perks: ['Everything in Regular', 'One limited micro-lot monthly', 'First access to event tickets', 'Free drink every month in-café']
	}
];

// ─── Brew guides ──────────────────────────────────────────────────────────
export type BrewGuide = {
	id: string;
	title: string;
	method: string;
	time: string;
	difficulty: string;
	image: string;
	imageAlt: string;
	intro: string;
	steps: string[];
	tip: string;
};

export const brewGuides: BrewGuide[] = [
	{
		id: 'pour-over',
		title: 'The Perfect Pour-Over',
		method: 'V60 · 1 cup',
		time: '4 minutes',
		difficulty: 'Intermediate',
		image: 'pour-over-brew',
		imageAlt: 'Barista pouring hot water over a V60 pour-over dripper',
		intro:
			'Our slow-bar method, step by step. You need a V60, a filter, 15 g of coffee and 250 g of water at 94°C.',
		steps: [
			'Rinse the paper filter with hot water and discard — this removes paper taste and warms the cup.',
			'Add 15 g of medium-fine coffee (like coarse sand) and level the bed.',
			'Bloom: pour 50 g of water, wait 45 seconds while the coffee degasses and bubbles.',
			'Pour in slow circles to 150 g, pause, then to 250 g. Total pour time about 2 minutes.',
			'Let it draw down, swirl the carafe once, and serve. Target finish: 3–3.5 minutes.'
		],
		tip: 'If it tastes sour, grind finer. If it tastes bitter, grind coarser. Change one variable at a time.'
	},
	{
		id: 'cold-brew',
		title: '18-Hour Cold Brew at Home',
		method: 'Immersion · 1 litre',
		time: '18 hours (5 min hands-on)',
		difficulty: 'Easy',
		image: 'cold-brew',
		imageAlt: 'Tall glass of cold brew coffee over ice',
		intro:
			'The smoothest coffee you will ever make, with almost no effort. Coarse coffee, cold water, time.',
		steps: [
			'Combine 100 g of coarse-ground Maple Roast with 1 litre of cold filtered water in a jar.',
			'Stir gently, cover, and leave on the counter for 18 hours — not the fridge.',
			'Strain through a paper filter into a clean bottle. It keeps 7 days refrigerated.',
			'Serve 1 part concentrate to 1 part cold water or milk, over ice.'
		],
		tip: 'Too weak? Steep 20 hours next time. Too strong? Add water, never less coffee — the ratio is the recipe.'
	},
	{
		id: 'french-press',
		title: 'French Press, Done Right',
		method: 'Press · 2 cups',
		time: '5 minutes',
		difficulty: 'Easy',
		image: 'barista',
		imageAlt: 'Barista preparing coffee at the espresso machine',
		intro:
			'Full-bodied and forgiving. The trick is a coarse grind and a clean break of the crust.',
		steps: [
			'Add 30 g of coarse coffee to the press and 500 g of water just off the boil.',
			'Stir after 1 minute, then let it sit — do not plunge yet.',
			'At 4 minutes, break the crust with a spoon and skim off the foam and grounds.',
			'Plunge slowly, pour immediately, and never let it sit in the press.'
		],
		tip: 'Pour all of it out. Coffee left sitting on the grounds keeps extracting and turns bitter.'
	},
	{
		id: 'espresso-at-home',
		title: 'Better Espresso at Home',
		method: 'Espresso machine',
		time: '3 minutes',
		difficulty: 'Advanced',
		image: 'hero-latte',
		imageAlt: 'Espresso with latte art in a ceramic cup',
		intro:
			'No $2,000 machine required — but the same three variables matter: dose, grind, and time.',
		steps: [
			'Dose 18 g of fresh beans, ground fine like table salt.',
			'Distribute and tamp level, with even pressure — no need to crush it.',
			'Aim for 36 g of liquid espresso in 25–30 seconds.',
			'Too fast? Grind finer. Too slow? Grind coarser. Taste, adjust, repeat.'
		],
		tip: 'Weigh your output. A $15 kitchen scale improves home espresso more than any new tamper.'
	}
];

// ─── Catering & private events ────────────────────────────────────────────
export type CateringPackage = {
	id: string;
	name: string;
	price: string;
	serves: string;
	blurb: string;
	includes: string[];
};

export const cateringPackages: CateringPackage[] = [
	{
		id: 'coffee-break',
		name: 'The Coffee Break',
		price: 'From $8 per person',
		serves: '10–30 people',
		blurb: 'For meetings that need to actually wake up. Coffee urn, pastries, done.',
		includes: ['Coffee urn (regular + decaf)', 'Assorted pastries + fruit', 'Oat & whole milk, sugar, cups', 'Setup + pickup, 30 min before']
	},
	{
		id: 'brunch-table',
		name: 'The Brunch Table',
		price: 'From $18 per person',
		serves: '20–60 people',
		blurb: 'Our full café morning, brought to your office or venue.',
		includes: ['Coffee + cold brew bar', 'Croissants, sandwiches & cake', 'Seasonal fruit platter', 'A barista on site for 2 hours']
	},
	{
		id: 'evening-soiree',
		name: 'The Evening Soirée',
		price: 'From $28 per person',
		serves: '30–80 people',
		blurb: 'Sunday-evening private hire at Brew Street: the whole room, the whole menu.',
		includes: ['Private hire of Brew Street, 5–9 PM', 'Espresso bar + signature drinks', 'Passed pastries & sandwiches', 'Dedicated events host']
	}
];

// ─── Careers ──────────────────────────────────────────────────────────────
export type CareerRole = {
	id: string;
	title: string;
	location: string;
	type: string;
	pay: string;
	blurb: string;
	perks: string[];
};

export const careers: CareerRole[] = [
	{
		id: 'head-barista',
		title: 'Head Barista',
		location: 'Brew Street — Flagship',
		type: 'Full-time',
		pay: '$24–$27 / hour + tips',
		blurb:
			'Lead the bar at our flagship: dial in the espresso, train the team, run the slow bar and keep the regulars happy.',
		perks: ['Free coffee, always', 'SCA training paid for', 'Health + dental after 90 days']
	},
	{
		id: 'barista-part-time',
		title: 'Barista (Weekends)',
		location: 'Maple Square',
		type: 'Part-time · Sat–Sun',
		pay: '$19–$21 / hour + tips',
		blurb:
			'Weekend shifts at our grab-and-go counter. No experience needed — we train you, and you keep the tips.',
		perks: ['Free coffee on shift', 'Flexible student-friendly hours', 'Coffee Loop membership']
	},
	{
		id: 'pastry-chef',
		title: 'Pastry Chef',
		location: 'Riverside Roastery',
		type: 'Full-time',
		pay: '$26–$29 / hour',
		blurb:
			'Bake the morning spread for all three cafés: croissants, cakes and the seasonal specials our regulars plan around.',
		perks: ['4 AM start, 12 PM finish', 'Creative control of the seasonal menu', 'Free beans to take home']
	},
	{
		id: 'events-host',
		title: 'Events & Private Hire Host',
		location: 'Brew Street — Flagship',
		type: 'Part-time · Evenings',
		pay: '$21–$23 / hour + tips',
		blurb:
			'Run our Sunday-evening private hires and weekend workshops: setup, hosting, and making sure every guest feels looked after.',
		perks: ['Evening + weekend shifts', 'Free entry to all workshops', 'Tips from private events']
	}
];

// ─── Loyalty rewards catalogue ────────────────────────────────────────────
export const loyaltyRewards = [
	{ id: 'free-pastry', name: 'Free Pastry', cost: 60, blurb: 'Any pastry, any café, on us.' },
	{ id: 'free-drink', name: 'Free Drink', cost: 120, blurb: 'Any size, any drink — including the Reserve specials.' },
	{ id: 'bean-bag', name: 'Free 12 oz Bean Bag', cost: 150, blurb: 'Maple Roast or the single origin of the week.' },
	{ id: 'workshop-seat', name: 'Latte Art Workshop Seat', cost: 200, blurb: 'A $35 workshop seat, free, at Brew Street.' }
] as const;

// ─── Track your order (mock) ─────────────────────────────────────────────
export type DemoOrder = {
	ref: string;
	status: 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered';
	placedAt: string;
	items: string;
	total: string;
	eta: string;
};

export const demoOrders: DemoOrder[] = [
	{
		ref: 'CL-2026-1042',
		status: 'ready',
		placedAt: 'Today, 8:42 AM · Pickup · Brew Street',
		items: '2 × Classic Cappuccino, 1 × Butter Croissant',
		total: '$12.75',
		eta: 'Ready now — show this reference at the counter.'
	},
	{
		ref: 'CL-2026-1038',
		status: 'delivered',
		placedAt: 'Yesterday, 5:15 PM · Delivery',
		items: '1 × Cold Brew, 1 × Grilled Veg Sandwich',
		total: '$13.70',
		eta: 'Delivered at 5:48 PM. Enjoy!'
	}
];

export const orderStatusSteps = ['Order confirmed', 'Preparing', 'Ready / Out for delivery', 'Delivered / Picked up'] as const;

// ─── Gallery ──────────────────────────────────────────────────────────────
export const galleryItems = [
	{ image: 'hero-latte', caption: 'Honey lavender latte, Brew Street', category: 'Coffee' },
	{ image: 'cafe-interior', caption: 'The Lounge room, Brew Street', category: 'Interior' },
	{ image: 'cappuccino', caption: 'Classic cappuccino, rosetta pour', category: 'Coffee' },
	{ image: 'butter-croissant', caption: 'Morning croissants, fresh from the oven', category: 'Food' },
	{ image: 'pour-over-brew', caption: 'Slow bar pour-over, Riverside', category: 'Coffee' },
	{ image: 'coffee-beans', caption: 'Tuesday roast day, Riverside Roastery', category: 'Origin' },
	{ image: 'chocolate-cake', caption: 'Chocolate cake, baked in-house', category: 'Food' },
	{ image: 'team-baristas', caption: 'The bar team, Brew Street', category: 'Interior' },
	{ image: 'catering-table', caption: 'A brunch table, catered', category: 'Food' },
	{ image: 'cold-brew', caption: '18-hour cold brew, over ice', category: 'Coffee' },
	{ image: 'subscription-box', caption: 'The Regular subscription box', category: 'Origin' },
	{ image: 'veg-sandwich', caption: 'Grilled veg sandwich, sourdough', category: 'Food' }
] as const;

// ─── First visit ──────────────────────────────────────────────────────────
export const firstVisitSteps = [
	{
		title: 'Walk in, no booking needed',
		body: 'Every café is walk-in. Order at the counter or ahead on this site — there is no waitlist, no reservation, no pressure.'
	},
	{
		title: 'Order at the counter (or ahead)',
		body: 'Tell us what you like and we will translate it: “something smooth, not too sweet” becomes a honey lavender latte. Dairy-free milk is always free.'
	},
	{
		title: 'Pick your spot',
		body: 'Window counter for laptop work, armchairs for long conversations, the long communal table if you like meeting people. Wi-Fi password is on the wall.'
	},
	{
		title: 'Stay as long as you like',
		body: 'Nobody is ever asked to leave for lingering. Refills on filter coffee are $1, and the second cup is the one that tastes best.'
	},
	{
		title: 'Join the Coffee Loop',
		body: 'One email at the counter and your points start counting — 1 point per $1, a free pastry on your birthday, and a free drink at 120 points.'
	},
	{
		title: 'Take a bag home',
		body: 'Beans are sold at every counter, ground to order. Ask the barista what they are drinking this week — it is usually the right answer.'
	}
] as const;

// ─── Gift-card balance (mock demo codes) ────────────────────────────────
export const giftCardBalances: Record<string, { balance: number; issued: string }> = {
	'CL-GIFT-1001': { balance: 42.5, issued: 'November 2026' },
	'CL-GIFT-2026': { balance: 100, issued: 'November 2026' },
	'CL-GIFT-500': { balance: 25, issued: 'October 2026' }
};

// ─── Classes & workshops ────────────────────────────────────────────────
export type CoffeeClass = {
	id: string; title: string; date: string; time: string; location: string;
	price: number; capacity: number; booked: number; level: string; blurb: string; includes: string[];
};
export const coffeeClasses: CoffeeClass[] = [
	{ id: 'latte-art-basics', title: 'Latte Art Basics', date: 'Saturday, December 5, 2026', time: '10:00 AM – 12:00 PM', location: 'Brew Street — Flagship', price: 35, capacity: 8, booked: 6, level: 'Beginner', blurb: 'Milk texturing, pitcher control and your first rosetta — all equipment provided.', includes: ['Your own pouring pitcher', 'Bag of Maple Roast beans', 'Printed pour guide'] },
	{ id: 'pour-over-masterclass', title: 'Pour-Over Masterclass', date: 'Sunday, December 13, 2026', time: '11:00 AM – 1:00 PM', location: 'Riverside Roastery', price: 30, capacity: 10, booked: 4, level: 'Intermediate', blurb: 'Dial in a V60 like our slow bar: grind, ratio, pours and tasting, side by side.', includes: ['Taste four origins', 'Brew recipe card', '10% off beans that day'] },
	{ id: 'home-brewing-101', title: 'Home Brewing 101', date: 'Saturday, December 19, 2026', time: '9:30 AM – 11:00 AM', location: 'Maple Square', price: 20, capacity: 12, booked: 9, level: 'Beginner', blurb: 'French press, AeroPress and cold brew at home — the gear, the ratios, the routine.', includes: ['Tasting of three methods', 'Home brew starter guide', 'Filter coffee refills'] },
	{ id: 'espresso-at-home', title: 'Espresso at Home', date: 'Saturday, January 9, 2027', time: '10:00 AM – 12:30 PM', location: 'Brew Street — Flagship', price: 45, capacity: 6, booked: 2, level: 'Advanced', blurb: 'Dose, grind, tamp and time — bring your own machine questions, leave with a recipe.', includes: ['One-on-one machine time', 'Dial-in worksheet', 'Bag of Maple Roast beans'] }
];

// ─── Team ───────────────────────────────────────────────────────────────
export const teamMembers = [
	{ name: 'Maya Chen', role: 'Head Barista · Brew Street', image: 'barista', blurb: 'Maya has poured at the Lounge since 2019 and teaches every latte art workshop. Her rosetta has its own fan club — ask her about the latte art throwdown she won with a swan.', years: 'With us since 2019' },
	{ name: 'Jonas Park', role: 'Roastmaster · Riverside Roastery', image: 'coffee-beans', blurb: 'Jonas roasts every Tuesday at Riverside and cups every lot before it is approved. He can tell you the altitude of any bean on the wall — and will, happily, at length.', years: 'With us since 2020' },
	{ name: 'Alex Morgan', role: 'Founder', image: 'cafe-interior', blurb: 'Alex opened the first Lounge in 2019 with one espresso machine and a borrowed grinder. Still on the floor most mornings, still convinced the second cup tastes best.', years: 'Founder, 2019' },
	{ name: 'Sofia Reyes', role: 'Pastry Chef · Riverside', image: 'butter-croissant', blurb: 'Sofia bakes the morning spread for all three cafés — croissants at 6 AM, the seasonal specials regulars plan their weeks around. Her chocolate cake sells out by noon, most days.', years: 'With us since 2021' },
	{ name: 'Daniel Okafor', role: 'Barista & Events Host · Brew Street', image: 'team-baristas', blurb: 'Daniel runs the Sunday-evening private hires and the acoustic Fridays. If the room feels looked after, it is usually Daniel.', years: 'With us since 2022' },
	{ name: 'Priya Nair', role: 'Café Lead · Maple Square', image: 'pour-over-brew', blurb: 'Priya runs the fastest counter in Maple City — in and out in four minutes at the morning rush, and she starts your macchiato when she sees you crossing the square.', years: 'With us since 2021' }
] as const;

// ─── Press ──────────────────────────────────────────────────────────────
export const pressItems = [
	{ outlet: 'Maple City Eats', title: '“The café that made Maple City slow down”', date: 'October 2026', blurb: 'Our third place, our slow bar and the room the neighbourhood shares.' },
	{ outlet: 'The Daily Grind', title: '“Best cold brew in the city — and it is not close”', date: 'September 2026', blurb: 'The 18-hour steep, the orange twist, and why the regulars queue for it.' },
	{ outlet: 'Bay Area Coffee Journal', title: '“A roastery tour worth the Saturday morning”', date: 'August 2026', blurb: 'Riverside, roast day, and the cupping table where origins are decided.' },
	{ outlet: 'Maple City Magazine', title: '“Five cafés to work from — number one is the Lounge”', date: 'July 2026', blurb: 'Wi-Fi on the wall, outlets at most tables, and nobody ever asked to leave.' }
] as const;

// ─── Seasonal ───────────────────────────────────────────────────────────
export const seasonalItems = [
	{ name: 'Spiced Maple Latte', price: 5.95, blurb: 'Espresso, maple syrup, cinnamon and a pinch of nutmeg — the winter regular.', tag: 'Limited · until Jan 31' },
	{ name: 'Peppermint Mocha', price: 6.25, blurb: 'Belgian chocolate, espresso and cool peppermint, finished with whipped cream.', tag: 'Limited · until Jan 31' },
	{ name: 'Gingerbread Cold Brew', price: 5.5, blurb: 'Our 18-hour cold brew with gingerbread syrup and sweet-cream cold foam.', tag: 'New this week' },
	{ name: 'Cranberry Orange Scone', price: 4.25, blurb: 'Baked in-house every morning — cranberry, orange zest, buttery crumb.', tag: 'Bakery · while it lasts' }
] as const;

// ─── Delivery zones ─────────────────────────────────────────────────────
export const deliveryZones = [
	{ zip: '94110', area: 'Brew Street & the Mission', fee: 2.99, note: 'Free over $25' },
	{ zip: '94111', area: 'Maple Square & Downtown', fee: 2.99, note: 'Free over $25' },
	{ zip: '94112', area: 'Riverside & the River Walk', fee: 2.99, note: 'Free over $25' },
	{ zip: '94114', area: 'The Hills (extended zone)', fee: 4.99, note: 'Free over $40' }
] as const;

// ─── Private hire ───────────────────────────────────────────────────────
export const privateHireOptions = [
	{ name: 'Hourly Rental', price: 'From $120 / hour', blurb: 'Brew Street after hours for small gatherings — the room, the counter, the coffee.', includes: ['Up to 30 guests', 'Espresso bar staffed', '2-hour minimum'] },
	{ name: 'Minimum Spend', price: 'From $600 evening', blurb: 'Sunday evenings, 5–9 PM: the whole room for your group, food and drink against the minimum.', includes: ['Up to 60 guests', 'Passed pastries & sandwiches', 'Dedicated events host'] },
	{ name: 'Full Buyout', price: 'From $1,500', blurb: 'The entire café, exclusively yours — weddings, launches, wrap parties.', includes: ['Up to 80 guests', 'Full menu + signature drinks', 'Barista team on site'] }
] as const;

// ─── Past events ────────────────────────────────────────────────────────
export const pastEvents = [
	{ title: 'Autumn Roast Day Open House', date: 'Saturday, October 24, 2026', location: 'Riverside Roastery', blurb: 'Roast day, open to the public — the drum, the cupping table and the first crack, up close.' },
	{ title: 'Pumpkin Spice, Our Way', date: 'Saturday, October 10, 2026', location: 'Brew Street — Flagship', blurb: 'A one-day tasting of our house pumpkin spice — real squash, real spice, no syrup shortcuts.' },
	{ title: 'Summer Cold Brew Social', date: 'Saturday, August 15, 2026', location: 'Maple Square', blurb: 'Cold brew three ways, iced lattes and the patio at golden hour.' }
] as const;
