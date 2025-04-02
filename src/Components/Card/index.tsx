import { useEffect, useState, useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const [isItemAdded, setIsItemAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { items, addToCart } = useContext(CartContext)

  // Verifica se o café está no carrinho e atualiza a quantidade
  useEffect(() => {
    // Busca no array de items se existe um com o mesmo id do café atual
    const coffeeInCart = items.find(item => item.id === coffee.id)

    // Se encontrou o café no carrinho
    if (coffeeInCart) {
      setIsItemAdded(true)
      // Atualiza a quantidade com o valor do carrinho
      setQuantity(coffeeInCart.quantity)
    } else {
      setIsItemAdded(false)
      // Volta para o valor padrão (1) quando o café não está no carrinho
      setQuantity(1)
    }
  }, [items, coffee.id])

  function incrementQuantity() {
    setQuantity(state => state + 1)
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity(state => state - 1)
    }
  }

  function handleAddItem() {
    if (isItemAdded) {
      // Se o item já está no carrinho, navegamos para a página do carrinho
      navigate('/cart')
    } else {
      addToCart({ id: coffee.id, quantity })
      setIsItemAdded(true)
    }
  }

  const QuantityInput = () => {
    return (
      <div className="quantity-input-container">
        <button
          // Desabilitamos apenas a diminuição se for 1 ou se já estiver no carrinho
          disabled={quantity <= 1 || isItemAdded}
          onClick={() => decrementQuantity()}
        >
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

          <button
            type="button"
            style={isItemAdded ? { backgroundColor: 'var(--yellow)' } : {}}
            onClick={handleAddItem}
          >
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
