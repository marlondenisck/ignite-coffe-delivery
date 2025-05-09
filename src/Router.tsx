import { ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { Success } from './pages/Success'

const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    {children}
  </>
)

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <DefaultLayout>
              <Cart />
            </DefaultLayout>
          }
        />
        <Route
          path="/success"
          element={
            <DefaultLayout>
              <Success />
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
