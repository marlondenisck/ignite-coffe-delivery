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

  // Função modificada para receber um objeto CartItem completo
  function addToCart(item: CartItem) {
    const itemIndex = items.findIndex(
      existingItem => existingItem.id === item.id
    )

    if (itemIndex >= 0) {
      // Se o item já existir, cria uma cópia da lista e atualiza o item específico
      const newItems = [...items]
      newItems[itemIndex].quantity += item.quantity
      setItems(newItems)
    } else {
      // Se o item não existir, adiciona-o à lista (como um objeto do tipo CartItem)
      setItems(prevItems => [...prevItems, item])
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
