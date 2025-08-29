import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize user session
const userId = localStorage.getItem('lencana-user-id') || 
  (() => {
    const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('lencana-user-id', id);
    return id;
  })();

window.LENCANA_USER_ID = userId;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
