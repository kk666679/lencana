import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Homepage from './pages/Homepage';
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

export default function Router() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}