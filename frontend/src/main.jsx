import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router"
import { Toaster } from 'react-hot-toast'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import CartContextProvider from '@/context/cart/CartContextProvider'
import AuthContextProvider from './context/auth/AuthContextProvider'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
      <CartContextProvider>
    <Toaster/>
      <App />
      </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
