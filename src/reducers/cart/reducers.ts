import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface CartItemInterface {
  id: string
  quantity: number
}

export function cyclesReducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.ADD_ITEM: {
        const itemIndex = draft.findIndex(
          existingItem => existingItem.id === action.payload.id
        )

        if (itemIndex >= 0) {
          // Com Immer, podemos mutar o draft diretamente
          draft[itemIndex].quantity += action.payload.quantity
        } else {
          // Podemos simplesmente dar push em um novo item
          draft.push(action.payload)
        }
        break // Com Immer, não precisamos retornar nada
      }

      case ActionTypes.REMOVE_ITEM: {
        const itemIndex = draft.findIndex(item => item.id === action.payload)
        if (itemIndex >= 0) {
          draft.splice(itemIndex, 1)
        }
        break
      }

      case ActionTypes.UPDATE_QUANTITY_ITEM: {
        const { id, quantity } = action.payload

        // Se a quantidade for menor que 1, não fazemos nada
        if (quantity < 1) return

        const itemIndex = draft.findIndex(item => item.id === id)
        if (itemIndex >= 0) {
          draft[itemIndex].quantity = quantity
        }
        break
      }

      case ActionTypes.DECREMENT_QUANTITY_ITEM: {
        const id = action.payload
        const itemIndex = draft.findIndex(item => item.id === id)

        // Só decrementa se o item existir e a quantidade for > 1
        if (itemIndex >= 0 && draft[itemIndex].quantity > 1) {
          draft[itemIndex].quantity -= 1
        }
        break
      }

      // Não precisamos de um default com Immer
    }
  })
}
