import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
          <Routes>
            <Route path="/" element={<BadgeHero3D />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/badges" element={<BadgeExplorer />} />
            <Route path="/curriculum" element={<CurriculumDashboard />} />
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
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}