import api from "@/lib/axios"
import { products, categories } from "@/data/mockData"

/**
 * Product service — the ONLY place that knows where data comes from.
 *
 * Set USE_MOCK = false (and tweak API_BASE) to point the whole app at the
 * live backend. Page components keep working unchanged because the shape
 * below mirrors the API response (see backend/src/controllers/product.controller.js).
 */

const USE_MOCK = false
const PAGE_SIZE = 12

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

/** @param {string} q */
async function mockSearch({ q = "", category = "", sort = "relevance", page = 1 } = {}) {
	await wait()

	let list = [...products]

	if (q) {
		const needle = q.toLowerCase()
		list = list.filter(
			(p) =>
				p.title.toLowerCase().includes(needle) ||
				p.description.toLowerCase().includes(needle),
		)
	}
	if (category) list = list.filter((p) => p.category === category)

	switch (sort) {
		case "price-asc":
			list.sort((a, b) => a.price - b.price)
			break
		case "price-desc":
			list.sort((a, b) => b.price - a.price)
			break
		case "name":
			list.sort((a, b) => a.title.localeCompare(b.title))
			break
		default:
			// keep catalog order
			break
	}

	const totalProducts = list.length
	const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))
	const start = (page - 1) * PAGE_SIZE
	const pageProducts = list.slice(start, start + PAGE_SIZE)

	return { products: pageProducts, totalProducts, totalPages, currPage: page }
}

/** @returns {Promise<{products: any[], totalProducts: number, totalPages: number, currPage: number}>} */
export async function getProducts(params = {}) {
	if (USE_MOCK) return mockSearch(params)

	const res = await api.get(`/products`,{
			params:{
			page:params.page,
			q: params.searchQuery || undefined
			}
		});

		return res.data?.data;
}

/** @returns {Promise<any|undefined>} */
export async function getProductById(id) {
	if (USE_MOCK) return products.find((p) => p._id === id)

	const res = await api.get(`/products/${id}`)
	return res.data?.data
}

/** @returns {Promise<typeof categories>} */
export async function getCategories() {
	if (USE_MOCK) return categories
	return categories // categories are static on both sides for now
}

/** @returns {Promise<any[]>} related products from the same category */
export async function getRelatedProducts(product, limit = 4) {
	await wait(120)
	if (product?.category) {
		return products
			.filter((p) => p.category === product.category && p._id !== product._id)
			.slice(0, limit)
	}
	return products.slice(0, limit)
}

/** @returns {Promise<any[]>} featured shot for the homepage */
export async function getFeaturedProducts(limit = 8) {
	await wait(120)
	return products.filter((p) => p.featured).slice(0, limit)
}