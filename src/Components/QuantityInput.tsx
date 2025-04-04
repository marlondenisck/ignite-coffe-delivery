import { Minus, Plus } from '@phosphor-icons/react'

type QuantityInputProps = {
  quantity: number
  incrementQuantity: () => void
  decrementQuantity: () => void
}

export function QuantityInput({
  quantity,
  incrementQuantity,
  decrementQuantity
}: QuantityInputProps) {
  return (
    <div className="quantity-input-container">
      <button
        // Desabilitamos apenas a diminuição se for 1 ou se já estiver no carrinho
        // disabled={quantity <= 1 || isItemAdded}
        onClick={decrementQuantity}
      >
        <Minus size={14} />
      </button>
      <span>{quantity}</span>
      <button
        // disabled={isItemAdded}
        onClick={incrementQuantity}
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
