import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Trophy, Users, BookOpen, Award } from 'lucide-react';

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover Malaysian Heritage Through
                <span className="text-primary"> Interactive Badges</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Cross-Curricular 3D Badges LMS Platform that transforms Malaysian national honours education into engaging, multi-subject learning experiences.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg">Start Learning</Button>
              <Button variant="outline" size="lg">Explore Badges</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Platform Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Comprehensive learning tools designed for Malaysian curriculum alignment
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <Trophy className="h-8 w-8 text-merdeka-600" />
                  <div>
                    <h3 className="text-xl font-bold">6 Unique Badges</h3>
                    <p className="text-muted-foreground">Interactive 3D badges with Malaysian heritage themes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold">Cross-Curricular Learning</h3>
                    <p className="text-muted-foreground">14 subjects integrated with KSSR & KSSM alignment</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="text-xl font-bold">Interactive Quizzes</h3>
                    <p className="text-muted-foreground">Earn Merdeka Points through engaging assessments</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img src="/logo.png" alt="Platform Preview" className="h-64 w-64 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Unique Badges</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-merdeka-600">14</div>
              <div className="text-sm text-muted-foreground">Subjects Covered</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-muted-foreground">KSSR/KSSM Aligned</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">3D</div>
              <div className="text-sm text-muted-foreground">Interactive Models</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Start Learning?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of students exploring Malaysian heritage through interactive badge-based learning.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg">Get Started Free</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}