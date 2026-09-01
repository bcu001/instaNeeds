import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router"
import { Toaster } from 'react-hot-toast'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { CartProviderV2 } from '@/context/cart/CartContextProvider'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CartProviderV2>
    <Toaster/>
      <App />
      </CartProviderV2>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
