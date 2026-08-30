/**
 * Mock catalog for the "instaNeeds" UI prototype.
 *
 * Shapes intentionally mirror the backend MongoDB Product model
 * (backend/src/models/product.model.js) so swapping the service layer
 * to the live API is a one-line change — see src/services/productService.js
 */

export const categories = [
	{ slug: "fruits-veg", name: "Fruits & Veg", emoji: "🥦", blurb: "Fresh from the farm" },
	{ slug: "dairy", name: "Dairy & Eggs", emoji: "🥛", blurb: "Chilled & fresh" },
	{ slug: "snacks", name: "Snacks & Biscuits", emoji: "🍿", blurb: "Binge-ready bites" },
	{ slug: "cold-drinks", name: "Cold Drinks", emoji: "🧃", blurb: "Always chilled" },
	{ slug: "personal-care", name: "Personal Care", emoji: "🧴", blurb: "Stay fresh daily" },
	{ slug: "others", name: "Household", emoji: "🏠", blurb: "Everyday must-haves" },
]

export const categoryCount = (slug) => products.filter((p) => p.category === slug).length

/**
 * @typedef {Object} Product
 * @property {string} _id
 * @property {string} title
 * @property {string} description
 * @property {string} imageURL
 * @property {string} emoji         — fallback artwork when image fails
 * @property {string} category      — enum mirrors backend
 * @property {number} price
 * @property {number} stock
 * @property {string} unit          — display unit e.g. "1 kg"
 * @property {number} [rating]
 * @property {number} [offer]       — discount percent badge
 * @property {boolean} [featured]
 */

export const products = [
	// ── Fruits & Veg ────────────────────────────────────────────────
	{
		_id: "p1", title: "Bananas — Robusta", description: "Naturally ripened, sweet and creamy. A daily source of potassium.",
		imageURL: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=70",
		emoji: "🍌", category: "fruits-veg", price: 6, stock: 120, unit: "1 piece", rating: 4.6, featured: true,
	},
	{
		_id: "p2", title: "Apples — Shimla", description: "Crisp, juicy and lightly sweet. Handpicked and graded daily.",
		imageURL: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=70",
		emoji: "🍎", category: "fruits-veg", price: 199, stock: 60, unit: "1 kg", rating: 4.7, offer: 10, featured: true,
	},
	{
		_id: "p3", title: "Fresh Tomatoes", description: "Firm, vine-ripened and full of flavour. Perfect for curries and salads.",
		imageURL: "https://images.unsplash.com/photo-1592924357228-91a4daadcfe0?w=600&q=70",
		emoji: "🍅", category: "fruits-veg", price: 49, stock: 90, unit: "1 kg", rating: 4.5,
	},
	{
		_id: "p4", title: "Onions — Red", description: "Pungent and crisp, the base of every good home-cooked meal.",
		imageURL: "", emoji: "🧅", category: "fruits-veg", price: 45, stock: 100, unit: "1 kg", rating: 4.4,
	},
	{
		_id: "p5", title: "Potatoes — Fresh", description: "Clean, unblemished and starchy — great boiled, fried or roasted.",
		imageURL: "", emoji: "🥔", category: "fruits-veg", price: 40, stock: 110, unit: "1 kg", rating: 4.4,
	},
	{
		_id: "p6", title: "Green Spinach (Palak)", description: "Tender leaves, washed and ready to cook. Rich in iron.",
		imageURL: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=70",
		emoji: "🥬", category: "fruits-veg", price: 25, stock: 40, unit: "1 bunch", rating: 4.3,
	},
	{
		_id: "p7", title: "Mixed Vegetables", description: "A weekly assortment of seasonal veg — soup-to-sabzi covered.",
		imageURL: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=70",
		emoji: "🥦", category: "fruits-veg", price: 39, stock: 75, unit: "500 g", rating: 4.6,
	},
	{
		_id: "p8", title: "Cabbage", description: "Tight, heavy heads with crisp leaves. Great for salad or stir-fries.",
		imageURL: "", emoji: "🥬", category: "fruits-veg", price: 30, stock: 30, unit: "1 piece", rating: 4.2,
	},

	// ── Dairy & Eggs ────────────────────────────────────────────────
	{
		_id: "p9", title: "Amul Taaza Milk", description: "Double-toned, pasteurised and freshly packed every morning.",
		imageURL: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=70",
		emoji: "🥛", category: "dairy", price: 27, stock: 200, unit: "500 ml", rating: 4.8, offer: 5, featured: true,
	},
	{
		_id: "p10", title: "Amul Butter", description: "Creamy, salted table butter from the Amul dairy family.",
		imageURL: "", emoji: "🧈", category: "dairy", price: 58, stock: 80, unit: "100 g", rating: 4.7,
	},
	{
		_id: "p11", title: "Fresh Curd", description: "Thick, set curd made from full-cream milk. No preservatives.",
		imageURL: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=70",
		emoji: "🥣", category: "dairy", price: 35, stock: 65, unit: "400 g", rating: 4.6,
	},
	{
		_id: "p12", title: "Cheese Slices", description: "Individually wrapped processed cheese — melts beautifully.",
		imageURL: "https://images.unsplash.com/photo-1486297671442-f8361e7e40a7?w=600&q=70",
		emoji: "🧀", category: "dairy", price: 95, stock: 50, unit: "200 g", rating: 4.5, offer: 15, featured: true,
	},
	{
		_id: "p13", title: "Farm Fresh Eggs", description: "Protein-rich brown eggs, graded and cleaned. Pack of 6.",
		imageURL: "", emoji: "🥚", category: "dairy", price: 48, stock: 150, unit: "6 pcs", rating: 4.6,
	},

	// ── Snacks & Biscuits ───────────────────────────────────────────
	{
		_id: "p14", title: "Masala Potato Chips", description: "Thin-cut, crunchy and dusted with tangy masala.",
		imageURL: "", emoji: "🍟", category: "snacks", price: 20, stock: 300, unit: "52 g", rating: 4.3, offer: 10, featured: true,
	},
	{
		_id: "p15", title: "Digestive Biscuits", description: "Whole-wheat biscuits with a light honey touch. Tea-time classic.",
		imageURL: "", emoji: "🍪", category: "snacks", price: 35, stock: 140, unit: "200 g", rating: 4.4,
	},
	{
		_id: "p16", title: "Roasted Peanuts", description: "Salted and roasted in small batches. Crunchy snack staple.",
		imageURL: "", emoji: "🥜", category: "snacks", price: 45, stock: 90, unit: "200 g", rating: 4.2,
	},
	{
		_id: "p17", title: "Chocolate Cookies", description: "Soft-baked cookies loaded with chocolate chips.",
		imageURL: "", emoji: "🍫", category: "snacks", price: 75, stock: 70, unit: "300 g", rating: 4.5,
	},
	{
		_id: "p18", title: "Mixed Nuts", description: "Almonds, cashews, walnuts and raisins — lightly salted.",
		imageURL: "", emoji: "🌰", category: "snacks", price: 199, stock: 45, unit: "150 g", rating: 4.7, featured: true,
	},

	// ── Cold Drinks ─────────────────────────────────────────────────
	{
		_id: "p19", title: "Coca-Cola", description: "Ice-cold original taste, chilled to 2°C in our darkrooms.",
		imageURL: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=70",
		emoji: "🥤", category: "cold-drinks", price: 45, stock: 120, unit: "750 ml", rating: 4.5, offer: 20, featured: true,
	},
	{
		_id: "p20", title: "Mixed Fruit Juice", description: "Real juice with no added sugar — mango, apple & orange.",
		imageURL: "", emoji: "🧃", category: "cold-drinks", price: 110, stock: 55, unit: "1 L", rating: 4.4,
	},
	{
		_id: "p21", title: "Mineral Water", description: "Purified drinking water in a sturdy 1 L bottle.",
		imageURL: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=70",
		emoji: "💧", category: "cold-drinks", price: 20, stock: 400, unit: "1 L", rating: 4.3,
	},
	{
		_id: "p22", title: "Cold Coffee", description: "Brewed cold coffee, ready to drink. Bonus morning energy.",
		imageURL: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=70",
		emoji: "☕", category: "cold-drinks", price: 30, stock: 85, unit: "200 ml", rating: 4.6,
	},

	// ── Personal Care ───────────────────────────────────────────────
	{
		_id: "p23", title: "Herbal Toothpaste", description: "Neem & clove formula for cavity protection with fresh breath.",
		imageURL: "", emoji: "🪥", category: "personal-care", price: 85, stock: 95, unit: "150 g", rating: 4.4, featured: true,
	},
	{
		_id: "p24", title: "Bathing Soap — 4 Pack", description: "Gentle, moisturising soaps with a mild fragrance. Family pack.",
		imageURL: "", emoji: "🧼", category: "personal-care", price: 120, stock: 60, unit: "4 × 100 g", rating: 4.3,
	},
	{
		_id: "p25", title: "Anti-Dandruff Shampoo", description: "Clinically tested to control dandruff while keeping hair soft.",
		imageURL: "", emoji: "🧴", category: "personal-care", price: 160, stock: 40, unit: "200 ml", rating: 4.2,
	},
	{
		_id: "p26", title: "Hand Sanitizer", description: "70% alcohol, kills 99.9% germs. Pocket-friendly 100 ml.",
		imageURL: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=70",
		emoji: "🧴", category: "personal-care", price: 45, stock: 130, unit: "100 ml", rating: 4.5,
	},

	// ── Household ───────────────────────────────────────────────────
	{
		_id: "p27", title: "Dishwash Liquid", description: "Cutting grease instantly. Lemon fresh fragrance.",
		imageURL: "", emoji: "🧽", category: "others", price: 110, stock: 70, unit: "500 ml", rating: 4.3,
	},
	{
		_id: "p28", title: "Detergent Powder", description: "Deep-clean formula for tough stains. 1 kg carton.",
		imageURL: "", emoji: "🧺", category: "others", price: 95, stock: 65, unit: "1 kg", rating: 4.2,
	},
	{
		_id: "p29", title: "LED Bulb — 9W", description: "Bright, energy-saving, lasts 25,000 hours. B22 base.",
		imageURL: "", emoji: "💡", category: "others", price: 70, stock: 50, unit: "1 piece", rating: 4.4,
	},
]

export const formatPrice = (n) => "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 })