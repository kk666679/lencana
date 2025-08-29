import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { AuthProvider } from './hooks/useAuth.jsx';
import Homepage from './pages/Homepage';
import BadgeHero3D from './components/BadgeHero3D';
import BadgeExplorer from './components/BadgeExplorer';
import CurriculumDashboard from './components/CurriculumDashboard';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Signup from './pages/Signup';
import QuizCenter from './pages/QuizCenter';
import EducatorDashboard from './pages/EducatorDashboard';
import ModuleViewer from './components/ModuleViewer';
import BadgeStudio from './pages/BadgeStudio';
import UserDashboard from './pages/UserDashboard';
import UserSettings from './pages/UserSettings';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BadgeHero3D />
          </motion.div>
        } />
        <Route path="/home" element={
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Homepage />
          </motion.div>
        } />
        <Route path="/badges" element={
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <BadgeExplorer />
          </motion.div>
        } />
        <Route path="/curriculum" element={
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CurriculumDashboard />
          </motion.div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quiz" element={<QuizCenter />} />
        <Route path="/educator" element={<EducatorDashboard />} />
        <Route path="/modules/:id" element={<ModuleViewer />} />
        <Route path="/studio" element={<BadgeStudio />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <motion.div 
          className="min-h-screen flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </motion.div>
      </BrowserRouter>
    </AuthProvider>
  );
}