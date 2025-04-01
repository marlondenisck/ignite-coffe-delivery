import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

import { Link } from 'react-router-dom'
import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import './styles.css'

export function Header() {
  const { items } = useContext(CartContext)
  return (
    <header className="header-container">
      <Link to="/">
        <img src="/logo.svg" alt="Coffe Delivery" />
      </Link>
      <aside className="header-actions">
        <div>
          <MapPin size={22} weight="fill" />
          <span>Porto Alegre, RS</span>
        </div>
        <Link to={`/cart`} aria-disabled={items.length === 0}>
          <ShoppingCart size={22} weight="fill" />
          {items.length > 0 ? <span>{items.length}</span> : null}
        </Link>
      </aside>
    </header>
  )
}
