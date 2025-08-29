import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import QuizModuleModal from '../components/QuizModuleModal';
import { getAllQuizModules } from '../data/quizModules';
import { BookOpen, Trophy, Target, Users } from 'lucide-react';

export default function QuizCenter() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [completedModules, setCompletedModules] = useState([]);
  
  const quizModules = getAllQuizModules();

  const handleStartQuiz = (module) => {
    setSelectedModule(module);
    setShowQuizModal(true);
  };

  const handleQuizComplete = (result) => {
    setCompletedModules(prev => {
      const existing = prev.find(m => m.moduleId === result.moduleId);
      if (existing) {
        return prev.map(m => m.moduleId === result.moduleId ? result : m);
      }
      return [...prev, result];
    });
    setShowQuizModal(false);
  };

  const getModuleIcon = (moduleId) => {
    switch (moduleId) {
      case 'badge-exploration': return <Trophy className="h-6 w-6" />;
      case 'filtering-mastery': return <Target className="h-6 w-6" />;
      case 'impact-understanding': return <BookOpen className="h-6 w-6" />;
      case 'platform-navigation': return <Users className="h-6 w-6" />;
      default: return <BookOpen className="h-6 w-6" />;
    }
  };

  const getModuleResult = (moduleId) => {
    return completedModules.find(m => m.moduleId === moduleId);
  };

  const totalCompleted = completedModules.length;
  const totalModules = quizModules.length;
  const completionRate = totalModules > 0 ? Math.round((totalCompleted / totalModules) * 100) : 0;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Quiz Learning Center</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Master the Lencana Malaysia platform through interactive quiz modules designed to enhance your understanding of badges, features, and educational impact.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Your Learning Progress</h2>
              <p className="text-muted-foreground">Complete all modules to become a platform expert</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{totalCompleted}/{totalModules}</div>
              <div className="text-sm text-muted-foreground">Modules Completed</div>
            </div>
          </div>
          <Progress value={completionRate} className="h-3" />
          <div className="mt-2 text-sm text-muted-foreground">{completionRate}% Complete</div>
        </div>

        {/* Quiz Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {quizModules.map((module) => {
            const result = getModuleResult(module.id);
            const isCompleted = !!result;
            
            return (
              <Card key={module.id} className={`transition-all hover:shadow-lg ${
                isCompleted ? 'bg-green-50 border-green-200' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {getModuleIcon(module.id)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{module.questions.length} Questions</Badge>
                          {isCompleted && (
                            <Badge className="bg-green-500">
                              ✓ {result.percentage}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {isCompleted ? (
                        <span className="text-green-600 font-medium">
                          Completed • +{result.points} Merdeka Points
                        </span>
                      ) : (
                        <span>Earn up to 100 Merdeka Points</span>
                      )}
                    </div>
                    <Button 
                      onClick={() => handleStartQuiz(module)}
                      variant={isCompleted ? "outline" : "default"}
                      size="sm"
                    >
                      {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Learning Tips */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Learning Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Quiz Strategy:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Read questions carefully before selecting answers</li>
                  <li>• Pay attention to explanations after each question</li>
                  <li>• You need 70% to pass and earn full points</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Platform Exploration:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Explore the Badge Explorer before taking quizzes</li>
                  <li>• Try different filtering options to understand features</li>
                  <li>• Review the educational impact section for context</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <QuizModuleModal
          module={selectedModule}
          isOpen={showQuizModal}
          onClose={() => setShowQuizModal(false)}
          onComplete={handleQuizComplete}
        />
      </div>
    </div>
  );
}