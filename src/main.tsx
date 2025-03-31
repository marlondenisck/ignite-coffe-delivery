import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from './Router'
import './index.css'
// import './components/Header/styles.css'
// import './components/Card/styles.css'
// import './pages/Home/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
