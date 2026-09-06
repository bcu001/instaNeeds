import HomePage from "@/pages/HomePage"
import ProductsPage from "@/pages/ProductsPage"
import ProductDetailPage from "@/pages/ProductDetailPage"
import CartPage from "@/pages/CartPage"
import CheckoutPage from "@/pages/CheckoutPage"
import { Route, Routes } from "react-router"
import SignInPage from "@/pages/SignInPage"
import SignOutPage from "@/pages/SignUpPage"
import ProtectedRoutes from "@/lib/ProtectedRoutes"
import PageNotFound from "@/components/common/PageNotFound"
import Layout_1 from "@/layout/Layout"

const AppRoutes = () => (
	<Routes>
		<Route element={<ProtectedRoutes><Layout_1/></ProtectedRoutes>}>
			<Route path="/checkout" element={<CheckoutPage />} />
			<Route path="/cart" element={<CartPage />} />
		</Route>
		<Route element={<Layout_1/>}>
			<Route path="/" element={<HomePage />} />
			<Route path="/products" element={<ProductsPage />} />
			<Route path="/products/:id" element={<ProductDetailPage />} />
		</Route>
		<Route path="/signin" element={<SignInPage/>}/>
		<Route path="/signup" element={<SignOutPage/>}/>
		<Route path="/*" element={<PageNotFound/>}/>
	</Routes>
)

export default AppRoutes