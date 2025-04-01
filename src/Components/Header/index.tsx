import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import './styles.css'

export function Header() {
  return (
    <header className="header-container">
      <a href="#">
        <img src="/logo.svg" alt="Coffe Delivery" />
      </a>
      <aside className="header-actions">
        <div>
          <MapPin size={22} weight="fill" />
          <span>Porto Alegre, RS</span>
        </div>
        <a
          href={`/cart`}
          // aria-disabled={cart.length === 0}
        >
          <ShoppingCart size={22} weight="fill" />
          {/* {cart.length > 0 ? <span>{cart.length}</span> : null} */}
        </a>
      </aside>
    </header>
  )
}
