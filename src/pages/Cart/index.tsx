import React, { useContext, useState, FocusEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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

type OrderFormData = {
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  uf: string
  paymentMethod: 'credit' | 'debit' | 'cash'
}

const ensureArray = (possibleArray: any) => {
  return Array.isArray(possibleArray) ? possibleArray : []
}

export function Cart() {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQuantity, decrementQuantity, checkout } =
    useContext(CartContext)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  const orderFormSchema = z.object({
    cep: z
      .string()
      .nonempty('O CEP é obrigatório')
      .regex(/^\d{5}-?\d{3}$/, 'CEP inválido (formato: 12345-678)'),
    rua: z.string().nonempty('A rua é obrigatória'),
    numero: z.string().nonempty('O número é obrigatório'),
    complemento: z.string().optional(),
    bairro: z.string().nonempty('O bairro é obrigatório'),
    cidade: z.string().nonempty('A cidade é obrigatória'),
    uf: z
      .string()
      .nonempty('UF é obrigatória')
      .length(2, 'UF deve ter 2 letras'),
    paymentMethod: z.enum(['credit', 'debit', 'cash'], {
      errorMap: () => ({ message: 'Selecione uma forma de pagamento' })
    })
  })
  type OrderFormData = z.infer<typeof orderFormSchema>

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      paymentMethod: 'credit'
    }
  })
  const paymentMethod = watch('paymentMethod')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const itemsArray = ensureArray(items)

  const coffeesInCart = itemsArray
    .map(item => {
      const coffeeInfo = coffees.find(coffee => coffee.id === item.id)

      if (!coffeeInfo) {
        console.error('Café não encontrado:', item.id)
        return null // Retornar null permite filtrar depois
      }

      return {
        ...coffeeInfo,
        quantity: item.quantity
      }
    })
    .filter(Boolean)

  const totalItemsPrice = coffeesInCart.reduce((previousValue, currentItem) => {
    return (previousValue += currentItem.price * currentItem.quantity)
  }, 0)

  function handleItemRemove(itemId: string) {
    removeFromCart(itemId)
  }

  function handleIncrementQuantity(id: string, currentQuantity: number) {
    updateQuantity(id, currentQuantity + 1)
  }

  function handleDecrementItemQuantity(id: string) {
    decrementQuantity(id)
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    setFocusedInput(event.target.name)
  }

  function handleBlur() {
    setFocusedInput(null)
  }

  async function onSubmit(data: OrderFormData) {
    if (coffeesInCart.length === 0) {
      alert('Adicione pelo menos um item ao carrinho')
      return
    }

    setIsSubmitting(true)

    try {
      // Simular um delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Chamar a função de checkout para finalizar o pedido
      checkout(data)

      // Redirecionar para a página de sucesso
      navigate('/success')
    } catch (error) {
      console.error('Erro ao processar o pedido:', error)
      alert('Ocorreu um erro ao processar seu pedido. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container-cart">
      <div className="info-container-cart">
        <h2>Complete seu pedido</h2>

        <form id="order" onSubmit={handleSubmit(onSubmit)}>
          <div className="address-container-cart">
            <header className="address-heading-cart">
              <MapPin size={22} />

              <div>
                <span>Endereço de Entrega</span>

                <p>Informe o endereço onde deseja receber o seu pedido</p>
              </div>
            </header>

            <div className="address-form-cart">
              <div className="address-form-cart-box-form grid-area-cep">
                <label
                  htmlFor="cep"
                  className="address-form-cart-box-label"
                  data-state={focusedInput === 'cep' ? 'focused' : 'blurred'}
                >
                  <input
                    type="text"
                    placeholder="CEP"
                    onFocus={handleFocus}
                    {...register('cep', {
                      onBlur: () => handleBlur()
                    })}
                  />
                </label>
              </div>
              <div className="address-form-cart-box-form grid-area-rua">
                <label
                  htmlFor="rua"
                  className="address-form-cart-box-label"
                  data-state={focusedInput === 'rua' ? 'focused' : 'blurred'}
                >
                  <input
                    type="text"
                    placeholder="Rua"
                    onFocus={handleFocus}
                    {...register('rua', {
                      onBlur: () => handleBlur()
                    })}
                  />
                </label>
              </div>

              <div className="address-form-cart-box-form grid-area-numero">
                <label
                  htmlFor="numero"
                  className="address-form-cart-box-label"
                  data-state={focusedInput === 'numero' ? 'focused' : 'blurred'}
                >
                  <input
                    type="text"
                    placeholder="Número"
                    onFocus={handleFocus}
                    {...register('numero', {
                      onBlur: () => handleBlur()
                    })}
                  />
                </label>
              </div>
              <div className="address-form-cart-box-form grid-area-complemento">
                <label
                  htmlFor="complemento"
                  className="address-form-cart-box-label"
                  data-state={
                    focusedInput === 'complemento' ? 'focused' : 'blurred'
                  }
                >
                  <input
                    type="text"
                    placeholder="Complemento"
                    onFocus={handleFocus}
                    {...register('complemento', {
                      onBlur: () => handleBlur()
                    })}
                  />
                  <span>Opcional</span>
                </label>
              </div>
              <div className="address-form-cart-box-form grid-area-bairro">
                <label
                  htmlFor="bairro"
                  className="address-form-cart-box-label"
                  data-state={focusedInput === 'bairro' ? 'focused' : 'blurred'}
                >
                  <input
                    type="text"
                    placeholder="Bairro"
                    onFocus={handleFocus}
                    {...register('bairro', {
                      onBlur: () => handleBlur()
                    })}
                  />
                </label>
              </div>
              <div className="address-form-cart-box-form grid-area-cidade">
                <label
                  htmlFor="cidade"
                  className="address-form-cart-box-label"
                  data-state={focusedInput === 'cidade' ? 'focused' : 'blurred'}
                >
                  <input
                    type="text"
                    placeholder="Cidade"
                    onFocus={handleFocus}
                    {...register('cidade', {
                      onBlur: () => handleBlur()
                    })}
                  />
                </label>
              </div>
              <div className="address-form-cart-box-form grid-area-uf">
                <label
                  htmlFor="uf"
                  className="address-form-cart-box-label"
                  data-state={focusedInput === 'uf' ? 'focused' : 'blurred'}
                >
                  <input
                    type="text"
                    placeholder="UF"
                    onFocus={handleFocus}
                    {...register('uf', {
                      onBlur: () => handleBlur()
                    })}
                  />
                </label>
              </div>
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
                <label
                  className={`payment-option-cart ${paymentMethod === 'credit' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    value="credit"
                    {...register('paymentMethod')}
                  />
                  <CreditCard size={16} />
                  <span>Cartão de crédito</span>
                </label>

                {/* Opção de cartão de débito */}
                <label
                  className={`payment-option-cart ${paymentMethod === 'debit' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    value="debit"
                    {...register('paymentMethod')}
                  />
                  <Bank size={16} />
                  <span>Cartão de débito</span>
                </label>

                {/* Opção de dinheiro */}
                <label
                  className={`payment-option-cart ${paymentMethod === 'cash' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    value="cash"
                    {...register('paymentMethod')}
                  />
                  <Money size={16} />
                  <span>Dinheiro</span>
                </label>
              </div>

              {errors.paymentMethod ? (
                <div className="payment-error-message-cart" role="alert">
                  {errors.paymentMethod.message}
                </div>
              ) : null}
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
                        decrementQuantity={() => {
                          handleDecrementItemQuantity(coffee.id)
                          console.log('disparando', coffee.id)
                        }}
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

        <button
          type="submit"
          form="order"
          className="checkout-button-cart"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Confirmar pedido'}
        </button>
      </div>
    </main>
  )
}
