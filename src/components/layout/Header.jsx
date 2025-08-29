import { useState } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Lencana Malaysia" className="h-8 w-8" />
          <span className="text-xl font-bold">Lencana Malaysia</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
          <a href="/badges" className="text-sm font-medium hover:text-primary transition-colors">Badges</a>
          <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          <a href="/faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
          <a href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Log In</Button>
          <Button size="sm">Sign Up</Button>
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
            <a href="/" className="block text-sm font-medium hover:text-primary">Home</a>
            <a href="/badges" className="block text-sm font-medium hover:text-primary">Badges</a>
            <a href="/about" className="block text-sm font-medium hover:text-primary">About</a>
            <a href="/faq" className="block text-sm font-medium hover:text-primary">FAQ</a>
            <a href="/contact" className="block text-sm font-medium hover:text-primary">Contact</a>
            <div className="pt-3 space-y-2">
              <Button variant="ghost" size="sm" className="w-full">Log In</Button>
              <Button size="sm" className="w-full">Sign Up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}