import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Users, Target, Award, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-6">About Lencana Malaysia</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A Cross-Curricular 3D Badges Learning Management System Platform to Inspire National Identity and Holistic Education
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To transform Malaysian national honours education into an engaging, multi-subject learning experience that fosters national identity, cross-curricular connections, and values-based education through innovative 3D visualization and gamified learning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-merdeka-600" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be the leading platform that modernizes heritage education in Malaysia, making civic values and national identity accessible and meaningful for every student through cutting-edge technology and curriculum alignment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Objectives */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Key Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Integrate National Identity</h3>
                <p className="text-sm text-muted-foreground">
                  Seamlessly weave Malaysian heritage and values into daily learning across all subjects
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-merdeka-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <BookOpen className="h-4 w-4 text-merdeka-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Foster Cross-Curricular Connections</h3>
                <p className="text-sm text-muted-foreground">
                  Bridge History, Languages, Science, and Moral Education through integrated activities
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Award className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Champion Values-Based Education</h3>
                <p className="text-sm text-muted-foreground">
                  Promote Rukun Negara principles and ethical development through interactive learning
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Modernize Heritage Education</h3>
                <p className="text-sm text-muted-foreground">
                  Use 3D visualization and gamification to make cultural learning engaging and accessible
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Platform Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">6</CardTitle>
                <CardDescription>Unique Interactive Badges</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  From Knowledge Seeker to Community Leader, each badge represents core Malaysian values
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-merdeka-600">14</CardTitle>
                <CardDescription>Subjects Integrated</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive coverage from Bahasa Malaysia to ICT, all aligned with national curriculum
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-purple-600">100%</CardTitle>
                <CardDescription>Curriculum Aligned</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Full alignment with KSSR and KSSM standards for seamless integration
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Built with Modern Technology</CardTitle>
            <CardDescription>
              Leveraging cutting-edge web technologies for optimal performance and accessibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React 19</Badge>
              <Badge variant="secondary">Three.js</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">ShadCN UI</Badge>
              <Badge variant="secondary">Node.js</Badge>
              <Badge variant="secondary">Express.js</Badge>
              <Badge variant="secondary">PWA Ready</Badge>
              <Badge variant="secondary">Mobile First</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Join the Learning Revolution</CardTitle>
              <CardDescription className="text-lg">
                Experience Malaysian heritage education like never before
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Built with ❤️ for Malaysian Education by educators, for educators and students nationwide.
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/badges" className="text-primary hover:underline font-medium">
                    Explore Badges →
                  </Link>
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    Get in Touch →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}