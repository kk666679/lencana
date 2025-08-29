import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Privacy() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p className="text-muted-foreground text-sm">
                  We collect information you provide directly, such as when you create an account, complete your profile, or contact us for support. This may include your name, email address, school information, and learning preferences.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Learning Data</h4>
                <p className="text-muted-foreground text-sm">
                  We collect data about your learning activities, including badge progress, quiz results, time spent on activities, and curriculum completion rates to provide personalized learning experiences.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Technical Information</h4>
                <p className="text-muted-foreground text-sm">
                  We automatically collect certain technical information, including IP address, browser type, device information, and usage patterns to improve our platform performance and security.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Provide and maintain the Lencana Malaysia learning platform</li>
                <li>• Personalize your learning experience and track progress</li>
                <li>• Generate reports for teachers and educational administrators</li>
                <li>• Communicate with you about platform updates and educational content</li>
                <li>• Improve our services and develop new educational features</li>
                <li>• Ensure platform security and prevent unauthorized access</li>
                <li>• Comply with legal obligations and educational regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Educational Institutions</h4>
                <p className="text-muted-foreground text-sm">
                  We may share learning progress and achievement data with your school, teachers, or educational administrators as part of the curriculum management system.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Service Providers</h4>
                <p className="text-muted-foreground text-sm">
                  We work with trusted service providers who help us operate the platform, such as hosting services, analytics providers, and customer support tools.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal Requirements</h4>
                <p className="text-muted-foreground text-sm">
                  We may disclose information when required by law, to protect our rights, or to ensure the safety of our users and the platform.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments. However, no method of transmission over the internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Under Malaysian data protection laws, you have certain rights regarding your personal information:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Access and review your personal information</li>
                <li>• Request corrections to inaccurate information</li>
                <li>• Request deletion of your account and associated data</li>
                <li>• Object to certain processing of your information</li>
                <li>• Request data portability where applicable</li>
                <li>• Withdraw consent for optional data processing</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Our platform is designed for educational use and may be used by students under 18. We comply with applicable laws regarding children's privacy and require appropriate consent from parents, guardians, or educational institutions before collecting personal information from minors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <div>Email: privacy@lencana-malaysia.edu.my</div>
                <div>Phone: +60 3-1234 5678</div>
                <div>Address: Ministry of Education Malaysia, Putrajaya</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}