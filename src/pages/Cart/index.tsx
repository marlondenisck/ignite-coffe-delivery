import React, { useContext } from 'react'
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPin,
  Money,
  Trash
} from '@phosphor-icons/react'

import { coffees } from '../../../data.json'
import { CartContext } from '../../contexts/CartContext'

import './styles.css'
import { QuantityInput } from '../../components/QuantityInput'

const entrega = 3.5

export function Cart() {
  const { items, removeFromCart, updateQuantity } = useContext(CartContext)

  const coffeesInCart = items.map(item => {
    const coffeeInfo = coffees.find(coffee => coffee.id === item.id)

    if (!coffeeInfo) {
      throw new Error('Invalid coffee.')
    }

    return {
      ...coffeeInfo,
      quantity: item.quantity
    }
  })

  const totalItemsPrice = coffeesInCart.reduce((previousValue, currentItem) => {
    return (previousValue += currentItem.price * currentItem.quantity)
  }, 0)

  function handleItemRemove(itemId: string) {
    removeFromCart(itemId)
  }

  function handleIncrementQuantity(id: string, currentQuantity: number) {
    updateQuantity(id, currentQuantity + 1)
  }

  function handleDecrementQuantity(id: string, currentQuantity: number) {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1)
    }
  }

  return (
    <main className="container-cart">
      <div className="info-container-cart">
        <h2>Complete seu pedido</h2>

        <form id="order">
          <div className="address-container-cart">
            <header className="address-heading-cart">
              <MapPin size={22} />

              <div>
                <span>Endereço de Entrega</span>

                <p>Informe o endereço onde deseja receber o seu pedido</p>
              </div>
            </header>

            <div className="address-form-cart">
              <input type="text" name="cep" placeholder="CEP" />
              <input type="text" name="rua" placeholder="Rua" />
              <input type="text" name="numero" placeholder="Número" />
              <input type="text" name="complemento" placeholder="Complemento" />
              <input type="text" name="bairro" placeholder="Bairro" />
              <input type="text" name="cidade" placeholder="Cidade" />
              <input type="text" name="uf" placeholder="UF" />
            </div>
          </div>

          <aside className="payment-container-cart">
            <header className="payment-heading-cart">
              <CurrencyDollar size={22} />

              <div className="card-cart">
                <span>Pagamento</span>

                <p>
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </p>
              </div>
            </header>
            <div className="payment-options-cart">
              <div>
                {/* Opção de cartão de crédito */}
                <label className="payment-option-cart">
                  <input type="radio" name="paymentMethod" value="credit" />
                  <CreditCard size={16} />
                  <span>Cartão de crédito</span>
                </label>

                {/* Opção de cartão de débito */}
                <label className="payment-option-cart">
                  <input type="radio" name="paymentMethod" value="debit" />
                  <Bank size={16} />
                  <span>Cartão de débito</span>
                </label>

                {/* Opção de dinheiro */}
                <label className="payment-option-cart">
                  <input type="radio" name="paymentMethod" value="cash" />
                  <Money size={16} />
                  <span>Dinheiro</span>
                </label>
              </div>

              {/* {errors.paymentMethod ? ( */}
              <div className="payment-error-message-cart" role="alert">
                {/* {errors.paymentMethod.message} */}
                erro
              </div>
              {/* ) : null} */}
            </div>
          </aside>
        </form>
      </div>

      <div className="info-container-cart">
        <h2>Cafés selecionados</h2>
        <div className="cart-total-cart">
          {coffeesInCart.map(coffee => (
            <React.Fragment key={coffee.id}>
              <div className="coffee-cart">
                <div>
                  <img src={coffee.image} alt={coffee.title} />
                  <div>
                    <span>{coffee.title}</span>
                    <div className="coffee-info-cart">
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() =>
                          handleIncrementQuantity(coffee.id, coffee.quantity)
                        }
                        decrementQuantity={() =>
                          handleDecrementQuantity(coffee.id, coffee.quantity)
                        }
                      />

                      <button onClick={() => handleItemRemove(coffee.id)}>
                        <Trash />
                        <span>Remover</span>
                      </button>
                    </div>
                  </div>
                </div>
                <aside>R$ {coffee.price?.toFixed(2)}</aside>
              </div>
              <hr />
            </React.Fragment>
          ))}

          <div className="cart-total-info-cart">
            <div>
              <span>Total de itens</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency'
                }).format(totalItemsPrice)}
              </span>
            </div>

            <div>
              <span>Entrega</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency'
                }).format(entrega)}
              </span>
            </div>

            <div>
              <span>Total</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency'
                }).format(totalItemsPrice + entrega)}
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="checkout-button-cart">
          Confirmar pedido
        </button>
      </div>
    </main>
  )
}
