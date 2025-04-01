import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPin,
  Money,
  Trash
} from '@phosphor-icons/react'

import { coffees } from '../../../data.json'
import './styles.css'

export function Cart() {
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
          <>
            <div className="coffee-cart">
              <div>
                <img src="./coffees/americano.png" />
                <div>
                  <span>cafe</span>
                  <div className="coffee-info-cart">
                    <input type="text" className="quantity-info" />

                    <button type="button">
                      <Trash />
                      <span>Remover</span>
                    </button>
                  </div>
                </div>
              </div>
              <aside>R$ {(11.1)?.toFixed(2)}</aside>
            </div>
            <hr />
          </>

          <div className="cart-total-info-cart">
            <div>
              <span>Total de itens</span>
              <span>
                {/* {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice)} */}
              </span>
            </div>

            <div>
              <span>Entrega</span>
              <span>
                {/* {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(shippingPrice)} */}
              </span>
            </div>

            <div>
              <span>Total</span>
              <span>
                {/* {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice + shippingPrice)} */}
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
