import HomePage from "@/pages/HomePage"
import ProductsPage from "@/pages/ProductsPage"
import ProductDetailPage from "@/pages/ProductDetailPage"
import CartPage from "@/pages/CartPage"
import CheckoutPage from "@/pages/CheckoutPage"
import { Route, Routes } from "react-router"

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/products" element={<ProductsPage />} />
		<Route path="/products/:id" element={<ProductDetailPage />} />
		<Route path="/cart" element={<CartPage />} />
		<Route path="/checkout" element={<CheckoutPage />} />
	</Routes>
)

export default AppRoutes