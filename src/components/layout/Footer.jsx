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
              <li><a href="/badges" className="hover:text-foreground transition-colors">Badge Explorer</a></li>
              <li><a href="/curriculum" className="hover:text-foreground transition-colors">Curriculum</a></li>
              <li><a href="/achievements" className="hover:text-foreground transition-colors">Achievements</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/faq" className="hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="/help" className="hover:text-foreground transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="/about" className="hover:text-foreground transition-colors">About Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Lencana Malaysia. Built with ❤️ for Malaysian Education.</p>
        </div>
      </div>
    </footer>
  );
}