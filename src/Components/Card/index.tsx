import { useEffect, useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { useNavigate } from 'react-router-dom'
import { QuantityInput } from '../QuantityInput'
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
  const navigate = useNavigate()
  const [tempQuantity, setTempQuantity] = useState(1)
  const [isItemAdded, setIsItemAdded] = useState(false)
  const { items, addToCart, updateQuantity, decrementQuantity } =
    useContext(CartContext)

  // Busca o item no carrinho, se existir
  const coffeeInCart = items.find(item => item.id === coffee.id)
  // A quantidade a ser exibida é a do carrinho se o item estiver lá, ou a temporária se não
  const quantity =
    isItemAdded && coffeeInCart ? coffeeInCart.quantity : tempQuantity

  function handleIncrementQuantity() {
    if (isItemAdded) {
      // Se o item já está no carrinho, usa a função do contexto
      updateQuantity(coffee.id, quantity + 1)
    } else {
      // Se o item não está no carrinho, atualiza apenas o estado local
      setTempQuantity(state => state + 1)
    }
  }

  function handleDecrementQuantity() {
    if (isItemAdded) {
      // Se o item já está no carrinho, usa a função do contexto apenas se quantidade > 1
      if (coffeeInCart && coffeeInCart.quantity > 1) {
        decrementQuantity(coffee.id)
      }
    } else {
      // Se o item não está no carrinho, atualiza apenas o estado local
      if (tempQuantity > 1) {
        setTempQuantity(state => state - 1)
      }
    }
  }

  useEffect(() => {
    if (coffeeInCart) {
      setIsItemAdded(true)
    } else {
      setIsItemAdded(false)
      setTempQuantity(1)
    }
  }, [coffeeInCart])

  function handleAddItem() {
    if (isItemAdded) {
      // Se o item já está no carrinho, navegamos para a página do carrinho
      navigate('/cart')
    } else {
      addToCart({ id: coffee.id, quantity: tempQuantity })
      setIsItemAdded(true)
    }
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
          <QuantityInput
            quantity={quantity}
            incrementQuantity={handleIncrementQuantity}
            decrementQuantity={handleDecrementQuantity}
          />

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
