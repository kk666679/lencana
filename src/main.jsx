import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import './i18n'
import App from './App.jsx'

// Performance monitoring
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/sw.js')
}

// User session initialization
const userId = localStorage.getItem('lencana-user-id') || 
  (() => {
    const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('lencana-user-id', id);
    return id;
  })();

window.LENCANA_USER_ID = userId;



// Loading component
function AppLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="text-center text-white">
        <div className="text-6xl mb-4 animate-bounce">🇲🇾</div>
        <h1 className="text-2xl font-bold mb-2">Lencana Malaysia</h1>
        <p className="opacity-70">Loading your learning experience...</p>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<AppLoading />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
