import { createContext, ReactNode, useReducer } from 'react'
import { CartItemInterface, cyclesReducer } from '../reducers/cart/reducers'
import { ActionTypes } from '../reducers/cart/actions'

type CartContextType = {
  items: CartItemInterface[]
  addToCart: (item: CartItemInterface) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  decrementQuantity: (itemId: string) => void
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cyclesReducer, [])

  function addToCart(item: CartItemInterface) {
    dispatch({ type: ActionTypes.ADD_ITEM, payload: item })
  }

  function removeFromCart(id: string) {
    dispatch({ type: ActionTypes.REMOVE_ITEM, payload: id })
  }

  function updateQuantity(id: string, quantity: number) {
    dispatch({
      type: ActionTypes.UPDATE_QUANTITY_ITEM,
      payload: { id, quantity }
    })
  }

  function decrementQuantity(id: string) {
    console.log('decrementQuantity', id)
    const item = items.find(item => item.id === id)
    if (item && item.quantity > 1) {
      dispatch({ type: ActionTypes.DECREMENT_QUANTITY_ITEM, payload: id })
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        decrementQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
