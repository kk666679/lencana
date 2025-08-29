import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Lencana Malaysia" className="h-6 w-6" />
              <span className="font-bold">Lencana Malaysia</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Cross-Curricular 3D Badges LMS Platform inspiring Malaysian national identity through interactive learning.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/badges" className="hover:text-foreground transition-colors">Badge Explorer</Link></li>
              <li><Link to="/curriculum" className="hover:text-foreground transition-colors">Curriculum</Link></li>
              <li><Link to="/achievements" className="hover:text-foreground transition-colors">Achievements</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Lencana Malaysia. Built with ❤️ for Malaysian Education.</p>
        </div>
      </div>
    </footer>
  );
}