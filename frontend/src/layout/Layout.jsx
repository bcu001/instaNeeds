import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"
import CartDrawer from "@/components/cart/CartDrawer"
import { Outlet } from "react-router"

const Layout_1 = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">
        <Outlet/>
      </main>
      <Footer />
      <CartDrawer />
      </>
  )
}

export default Layout_1
