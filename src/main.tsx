import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from './Router'
import { CartProvider } from './contexts/CartContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Router />
    </CartProvider>
  </StrictMode>
)
