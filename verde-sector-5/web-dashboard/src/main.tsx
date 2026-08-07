import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/hig.css';
import './styles/app.css';
import './styles/density';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
