import { createContext, useState, ReactNode } from 'react'

// Tipo para um item no carrinho
type CartItem = {
  id: string
  quantity: number
}

// Tipo para o contexto do carrinho
type CartContextType = {
  items: CartItem[]
  addToCart: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState([])

  function addToCart(id: string, quantity: number) {
    const itemIndex = items.findIndex(item => item.id === id)

    if (itemIndex >= 0) {
      const newItems = [...items]
      newItems[itemIndex].quantity += quantity
      setItems(newItems)
    } else {
      setItems([...items, { id, quantity }])
    }
  }
  function removeFromCart(id: string) {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
