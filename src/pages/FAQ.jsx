import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function FAQ() {
  const faqs = [
    {
      question: "What is Lencana Malaysia?",
      answer: "Lencana Malaysia is a Cross-Curricular 3D Badges Learning Management System that transforms Malaysian national honours education into engaging, interactive learning experiences aligned with KSSR and KSSM curricula."
    },
    {
      question: "How do I earn badges?",
      answer: "You can earn badges by completing interactive quizzes, participating in cross-curricular activities, and demonstrating understanding of Malaysian heritage and values. Each badge has specific criteria that must be met."
    },
    {
      question: "What are Merdeka Points?",
      answer: "Merdeka Points are our gamified point system. You earn points by viewing badges, completing quizzes, maintaining daily login streaks, and achieving various milestones throughout your learning journey."
    },
    {
      question: "Which subjects are covered?",
      answer: "Our platform covers 14 subjects including Bahasa Malaysia, English, Sejarah, Pendidikan Sivik, Science, Mathematics, ICT, Design Technology, Visual Arts, Music, and more - all integrated with Malaysian curriculum standards."
    },
    {
      question: "Is the platform suitable for all education levels?",
      answer: "Yes! Our content is aligned with both KSSR (primary) and KSSM (secondary) curricula, with activities and assessments appropriate for different age groups and learning levels."
    },
    {
      question: "How does the level system work?",
      answer: "Students progress from 'Rookie' to 'History Scholar' by earning XP through various activities. Each level unlocks new content and achievements, encouraging continuous learning and engagement."
    },
    {
      question: "Can teachers track student progress?",
      answer: "Yes, our Curriculum Dashboard provides teachers with comprehensive tracking tools to monitor student progress, badge completion rates, and curriculum alignment across all subjects."
    },
    {
      question: "Is the platform available offline?",
      answer: "We're developing PWA (Progressive Web App) functionality to support offline learning, especially important for students in rural areas with limited internet connectivity."
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about the Lencana Malaysia platform
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Still have questions?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Contact our support team for personalized assistance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/contact" className="text-primary hover:underline font-medium">
                Contact Support →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}