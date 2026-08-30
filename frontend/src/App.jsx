import AppRoutes from './routes/AppRoutes'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import CartDrawer from '@/components/common/CartDrawer'
import { CartProvider } from '@/context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-[60vh]">
        <AppRoutes />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}

export default App