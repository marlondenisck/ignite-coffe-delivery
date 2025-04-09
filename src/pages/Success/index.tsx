import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/CartContext'
import './styles.css'

export function Success() {
  const { order } = useContext(CartContext)
  const navigate = useNavigate()

  // Redirecionar se não tiver dados do pedido
  useEffect(() => {
    if (!order) {
      navigate('/')
    }
  }, [order, navigate])

  // Se não houver pedido, não renderizar nada
  if (!order) {
    return null
  }

  const paymentMethods = {
    credit: 'Cartão de crédito',
    debit: 'Cartão de débito',
    cash: 'Dinheiro'
  }

  return (
    <div className="container-success">
      <div className="success-order">
        <header className="success-header">
          <h2>Uhu! Pedido confirmado</h2>
          <span>Agora é só aguardar que logo o café chegará até você</span>
        </header>

        <div className="success-info">
          <div className="success-info-content">
            <div>
              <MapPin
                color={`var(--white)`}
                style={{ backgroundColor: `var(--purple)` }}
                size={32}
              />
              <div>
                <span>
                  Entrega em{' '}
                  <strong>
                    {order.rua}, {order.numero}
                  </strong>
                </span>
                <span>
                  {order.bairro} - {order.cidade}, {order.uf}
                </span>
              </div>
            </div>

            <div>
              <Timer
                color={`var(--white)`}
                style={{ backgroundColor: `var(--yellow)` }}
                size={32}
              />
              <div>
                <span>Previsão de entrega</span>
                <strong>20 min - 30 min</strong>
              </div>
            </div>

            <div>
              <CurrencyDollar
                color={`var(--white)`}
                style={{ backgroundColor: `var(--yellow-dark)` }}
                size={32}
              />
              <div>
                <span>Pagamento na entrega</span>
                <strong>{paymentMethods[order.paymentMethod]}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="/images/delivery.svg" alt="Pedido concluído" />
    </div>
  )
}
