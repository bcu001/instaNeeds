import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react"
import toast from "react-hot-toast"

const CartContext = createContext(null)
const STORAGE_KEY = "instaneeds.cart"
const MAX_QTY = 25

const loadCart = () => {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
	} catch {
		return []
	}
}

export const CartProvider = ({ children }) => {
	const [items, setItems] = useState(loadCart)
	const [isDrawerOpen, setDrawerOpen] = useState(false)

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
		} catch {
			/* private mode etc. — cart just won't persist */
		}
	}, [items])

	const addItem = useCallback((product, qty = 1) => {
		setItems((prev) => {
			const existing = prev.find((i) => i._id === product._id)
			if (existing) {
				return prev.map((i) =>
					i._id === product._id ? { ...i, qty: Math.min(i.qty + qty, MAX_QTY) } : i,
				)
			}
			return [
				...prev,
				{
					_id: product._id,
					title: product.title,
					price: product.price,
					unit: product.unit,
					imageURL: product.imageURL,
					emoji: product.emoji,
					stock: product.stock,
					qty,
				},
			]
		})
		toast.success(`${product.title} added to cart`)
	}, [])

	const updateQty = useCallback((id, delta) => {
		setItems((prev) =>
			prev
				.map((i) => (i._id === id ? { ...i, qty: Math.min(Math.max(i.qty + delta, 0), MAX_QTY) } : i))
				.filter((i) => i.qty > 0),
		)
	}, [])

	const setQty = useCallback((id, qty) => {
		setItems((prev) =>
			prev
				.map((i) => (i._id === id ? { ...i, qty: Math.min(Math.max(qty, 0), MAX_QTY) } : i))
				.filter((i) => i.qty > 0),
		)
	}, [])

	const removeItem = useCallback((id) => {
		setItems((prev) => prev.filter((i) => i._id !== id))
	}, [])

	const clearCart = useCallback(() => {
		setItems([])
	}, [])

	const getQty = useCallback((id) => items.find((i) => i._id === id)?.qty ?? 0, [items])
	const isInCart = useCallback((id) => items.some((i) => i._id === id), [items])

	const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])
	const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

	const openDrawer = useCallback(() => setDrawerOpen(true), [])
	const closeDrawer = useCallback(() => setDrawerOpen(false), [])

	const value = useMemo(
		() => ({
			items,
			addItem,
			updateQty,
			setQty,
			removeItem,
			clearCart,
			getQty,
			isInCart,
			subtotal,
			itemCount,
			isDrawerOpen,
			openDrawer,
			closeDrawer,
		}),
		[
			items, addItem, updateQty, setQty, removeItem, clearCart,
			getQty, isInCart, subtotal, itemCount, isDrawerOpen, openDrawer, closeDrawer,
		],
	)

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
	const ctx = useContext(CartContext)
	if (!ctx) throw new Error("useCart must be used within <CartProvider>")
	return ctx
}