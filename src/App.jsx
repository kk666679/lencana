import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Lazy load Router for better performance
const Router = lazy(() => import('./Router'));

// App loading fallback
function AppSkeleton() {
  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="animate-pulse">
        <div className="h-16 bg-gray-200 mb-4"></div>
        <div className="container mx-auto px-6">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function App() {
  return (
    <Suspense fallback={<AppSkeleton />}>
      <Router />
    </Suspense>
  );
}

export default App;

