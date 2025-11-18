import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TelaLogin } from './TelaLogin'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TelaLogin />
  </StrictMode>
)
