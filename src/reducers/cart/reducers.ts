import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface CartItemInterface {
  id: string
  quantity: number
}

export interface OrderInfo {
  cep: string
  rua: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  paymentMethod: 'credit' | 'debit' | 'cash'
}

export interface CartState {
  items: CartItemInterface[]
  order: OrderInfo | null
}

const initialState: CartState = {
  items: [],
  order: null
}

export function CartReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.ADD_ITEM: {
        const itemIndex = draft.items.findIndex(
          existingItem => existingItem.id === action.payload.id
        )

        if (itemIndex >= 0) {
          draft.items[itemIndex].quantity += action.payload.quantity
        } else {
          draft.items.push(action.payload)
        }
        break
      }

      case ActionTypes.REMOVE_ITEM: {
        const itemIndex = draft.items.findIndex(
          item => item.id === action.payload
        )
        if (itemIndex >= 0) {
          draft.items.splice(itemIndex, 1)
        }
        break
      }

      case ActionTypes.UPDATE_QUANTITY_ITEM: {
        const { id, quantity } = action.payload

        if (quantity < 1) return

        const itemIndex = draft.items.findIndex(item => item.id === id)
        if (itemIndex >= 0) {
          draft.items[itemIndex].quantity = quantity
        }
        break
      }

      case ActionTypes.DECREMENT_QUANTITY_ITEM: {
        const id = action.payload
        const itemIndex = draft.items.findIndex(item => item.id === id)

        if (itemIndex >= 0 && draft.items[itemIndex].quantity > 1) {
          draft.items[itemIndex].quantity -= 1
        }
        break
      }

      case ActionTypes.CHECKOUT_SUCCESS: {
        draft.order = action.payload
        draft.items = []
        break
      }
    }
  })
}
