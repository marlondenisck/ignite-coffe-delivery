import { useEffect, useState } from 'react'

import { CheckFat, ShoppingCart } from '@phosphor-icons/react'
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
          <div className="quantityInput">-1+</div>

          <button type="button">
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
