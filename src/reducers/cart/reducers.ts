import { ActionTypes } from './actions'

export interface CartItemInterface {
  id: string
  quantity: number
}

export function cyclesReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM: {
      const itemIndex = state.findIndex(
        existingItem => existingItem.id === action.payload.id
      )

      if (itemIndex >= 0) {
        const newItems = [...state]
        newItems[itemIndex].quantity += action.payload.quantity
        return newItems
      } else {
        return [...state, action.payload]
      }
    }

    case ActionTypes.REMOVE_ITEM: {
      return state.filter(item => item.id !== action.payload)
    }

    case ActionTypes.UPDATE_QUANTITY_ITEM: {
      if (action.payload.quantity < 1) return state

      const itemIndex = state.findIndex(item => item.id === action.payload.id)

      if (itemIndex >= 0) {
        const newItems = [...state]
        newItems[itemIndex].quantity = action.payload.quantity
        return newItems
      }
      return state
    }

    case ActionTypes.DECREMENT_QUANTITY_ITEM: {
      const id = action.payload
      const itemIndex = state.findIndex(item => item.id === id)

      if (itemIndex >= 0 && state[itemIndex].quantity > 1) {
        const newItems = [...state]
        newItems[itemIndex].quantity -= 1
        return newItems
      }

      return state
    }

    default:
      return state
  }
}
