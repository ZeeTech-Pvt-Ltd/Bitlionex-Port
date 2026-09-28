import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// The prerendered HTML in dist/ is already the finished page. createRoot
// hydrates it rather than replacing it, which is what keeps the first paint
// identical to what the crawler was served.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
