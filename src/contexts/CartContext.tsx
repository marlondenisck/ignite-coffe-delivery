import { createContext, ReactNode, useEffect, useReducer } from 'react'
import {
  CartItemInterface,
  OrderInfo,
  CartState,
  CartReducer
} from '../reducers/cart/reducers'
import { ActionTypes } from '../reducers/cart/actions'

type CartContextType = {
  items: CartItemInterface[]
  order: OrderInfo | null
  addToCart: (item: CartItemInterface) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  decrementQuantity: (itemId: string) => void
  checkout: (orderData: OrderInfo) => void
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartState, dispatch] = useReducer(CartReducer, {
    items: [],
    order: null
  })

  const { items, order } = cartState

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
    const item = items.find(item => item.id === id)
    if (item && item.quantity > 1) {
      dispatch({ type: ActionTypes.DECREMENT_QUANTITY_ITEM, payload: id })
    }
  }

  function checkout(orderData: OrderInfo) {
    dispatch({
      type: ActionTypes.CHECKOUT_SUCCESS,
      payload: orderData
    })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        order,
        addToCart,
        removeFromCart,
        updateQuantity,
        decrementQuantity,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
