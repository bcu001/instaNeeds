import HomePage from "@/pages/HomePage"
import ProductsPage from "@/pages/ProductsPage"
import ProductDetailPage from "@/pages/ProductDetailPage"
import CartPage from "@/pages/CartPage"
import CheckoutPage from "@/pages/CheckoutPage"
import { Route, Routes } from "react-router"
import SignInPage from "@/pages/SignInPage"
import SignOutPage from "@/pages/SignUpPage"
import ProtectedRoutes from "@/lib/ProtectedRoutes"
import Layout_1 from "@/layout/Layout"
import ProfilePage from "@/pages/ProfilePage"
import OrderPage from "@/pages/OrderPage"
import SettingPage from "@/pages/SettingPage"

const AppRoutes = () => (
	<Routes>
		<Route element={<ProtectedRoutes><Layout_1/></ProtectedRoutes>}>
			<Route element={<Layout_1/>}>
				<Route path="/checkout" element={<CheckoutPage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/profile" element={<ProfilePage/>}/>
				<Route path="/order" element={<OrderPage/>}/>
			</Route>
		</Route>
		<Route element={<Layout_1/>}>
			<Route path="/" element={<HomePage />} />
			<Route path="/products" element={<ProductsPage />} />
			<Route path="/products/:id" element={<ProductDetailPage />} />
			<Route path="/settings" element={<SettingPage/>}/>
			<Route path="/*" element={<HomePage/>}/>
		</Route>
		<Route path="/signin" element={<SignInPage/>}/>
		<Route path="/signup" element={<SignOutPage/>}/>
	</Routes>
)

export default AppRoutes