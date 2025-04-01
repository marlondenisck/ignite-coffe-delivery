import { useEffect, useState, useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

import { CheckFat, ShoppingCart, Minus, Plus } from '@phosphor-icons/react'
import './styles.css'

type CardProps = {
  coffee: {
    id: string
    title: string
    description: string
    tags: string[]
    price: number
    image: string
  }
}
export function Card({ coffee }: CardProps) {
  const [isItemAdded, setIsItemAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { items, addToCart } = useContext(CartContext)
  // const isIteminCart = items.some(item => item.id === coffee.id)

  function incrementQuantity() {
    setQuantity(state => state + 1)
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity(state => state - 1)
    }
  }

  function handleAddItem() {
    addToCart({ id: coffee.id, quantity })
    setIsItemAdded(true)
    setQuantity(1)
  }

  const QuantityInput = () => {
    return (
      <div className="quantity-input-container">
        <button disabled={isItemAdded} onClick={() => decrementQuantity()}>
          <Minus size={14} />
        </button>
        <span>{quantity}</span>
        <button disabled={isItemAdded} onClick={() => incrementQuantity()}>
          <Plus size={14} />
        </button>
      </div>
    )
  }

  return (
    <div className="container">
      <img src={coffee?.image} alt={coffee?.title} />

      <div className="tags">
        {coffee.tags?.map(tag => <span key={tag}>{tag}</span>)}
      </div>

      <h3 className="title">{coffee?.title}</h3>
      <span className="description">{coffee?.description}</span>

      <div className="control">
        <div className="price">
          <span>R$</span>
          <span>{coffee?.price.toFixed(2)}</span>
        </div>
        <div className="order">
          <QuantityInput />

          <button type="button" disabled={isItemAdded} onClick={handleAddItem}>
            {isItemAdded ? (
              <CheckFat weight="fill" size={22} color={`var(--base-card)`} />
            ) : (
              <ShoppingCart size={22} color={`var(--base-card)`} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
