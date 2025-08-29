import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Terms() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                By accessing and using the Lencana Malaysia Cross-Curricular LMS Platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Educational Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Intended Purpose</h4>
                <p className="text-muted-foreground text-sm">
                  This platform is designed exclusively for educational purposes within the Malaysian education system, aligned with KSSR and KSSM curricula. It is intended for use by students, teachers, and educational administrators.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Age Requirements</h4>
                <p className="text-muted-foreground text-sm">
                  Students under 18 must have appropriate consent from parents, guardians, or educational institutions to use this platform. Schools and teachers are responsible for ensuring proper authorization.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold mb-2">Acceptable Use</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use the platform only for legitimate educational purposes</li>
                <li>• Maintain the confidentiality of your account credentials</li>
                <li>• Respect intellectual property rights of all content</li>
                <li>• Follow your school's technology and internet usage policies</li>
                <li>• Report any technical issues or inappropriate content promptly</li>
                <li>• Engage respectfully with other users and educational content</li>
              </ul>
              
              <h4 className="font-semibold mb-2 mt-6">Prohibited Activities</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Sharing account credentials with unauthorized users</li>
                <li>• Attempting to access restricted areas or other users' data</li>
                <li>• Uploading malicious software or harmful content</li>
                <li>• Using the platform for commercial or non-educational purposes</li>
                <li>• Interfering with platform security or functionality</li>
                <li>• Violating any applicable laws or regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Platform Content</h4>
                <p className="text-muted-foreground text-sm">
                  All content, including but not limited to text, graphics, logos, images, 3D models, audio clips, and software, is the property of Lencana Malaysia or its content suppliers and is protected by Malaysian and international copyright laws.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">User-Generated Content</h4>
                <p className="text-muted-foreground text-sm">
                  Users retain ownership of content they create, but grant Lencana Malaysia a license to use, display, and distribute such content within the educational context of the platform.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. By using our platform, you consent to the collection and use of information as outlined in our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Service Availability</h4>
                <p className="text-muted-foreground text-sm">
                  We strive to maintain high availability of our platform but cannot guarantee uninterrupted service. Scheduled maintenance, updates, and unforeseen technical issues may temporarily affect access.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Updates and Changes</h4>
                <p className="text-muted-foreground text-sm">
                  We reserve the right to modify, update, or discontinue features of the platform with reasonable notice to users and educational institutions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Lencana Malaysia shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                These Terms of Service shall be governed by and construed in accordance with the laws of Malaysia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of Malaysian courts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <div>Email: legal@lencana-malaysia.edu.my</div>
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