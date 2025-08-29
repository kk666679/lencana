import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X, Moon, Sun, Trophy } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Lencana Malaysia" className="h-8 w-8" />
          <span className="text-xl font-bold">Lencana Malaysia</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/badges" className="text-sm font-medium hover:text-primary transition-colors">Badges</Link>
          <Link to="/curriculum" className="text-sm font-medium hover:text-primary transition-colors">Curriculum</Link>
          <Link to="/achievements" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            Achievements
          </Link>
          <Link to="/quiz" className="text-sm font-medium hover:text-primary transition-colors">Quizzes</Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <Link to="/faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="p-2"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link to="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-3">
            <Link to="/" className="block text-sm font-medium hover:text-primary">Home</Link>
            <Link to="/badges" className="block text-sm font-medium hover:text-primary">Badges</Link>
            <Link to="/curriculum" className="block text-sm font-medium hover:text-primary">Curriculum</Link>
            <Link to="/achievements" className="block text-sm font-medium hover:text-primary flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Achievements
            </Link>
            <Link to="/quiz" className="block text-sm font-medium hover:text-primary">Quizzes</Link>
            <Link to="/about" className="block text-sm font-medium hover:text-primary">About</Link>
            <Link to="/faq" className="block text-sm font-medium hover:text-primary">FAQ</Link>
            <Link to="/contact" className="block text-sm font-medium hover:text-primary">Contact</Link>
            <div className="pt-3 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDark(!isDark)}
                className="w-full flex items-center gap-2"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="w-full">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}