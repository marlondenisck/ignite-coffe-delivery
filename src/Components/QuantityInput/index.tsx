import { Minus, Plus } from '@phosphor-icons/react'
import './styles.css'

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
      <button disabled={quantity <= 1} onClick={decrementQuantity}>
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
