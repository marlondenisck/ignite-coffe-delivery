import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { coffees } from '../../../data.json'
import './styles.css'
export function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <div>
            <div className="heading">
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>

              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </span>
            </div>

            <div className="info">
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={`var(--background)`}
                  style={{ backgroundColor: `var(--yellow-dark)` }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={`var(--background)`}
                  style={{ backgroundColor: `var(--base-text)` }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={`var(--background)`}
                  style={{ backgroundColor: `var(--yellow)` }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={`var(--background)`}
                  style={{ backgroundColor: `var(--purple)` }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </div>
          </div>
          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </div>

        <div className="coffee-list">
          <h2>Nossos cafés</h2>

          <div>
            {coffees.map(coffee => (
              <div key={coffee.id}>
                <p>{coffee.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
