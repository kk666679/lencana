import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

const quizQuestions = {
  'datuk-seri-maharaja-lela': [
    {
      question: "What does the Datuk Seri Maharaja Lela represent?",
      options: ["Military service", "National service pinnacle", "Academic achievement", "Sports excellence"],
      correct: 1
    },
    {
      question: "Which principle is emphasized in earning this badge?",
      options: ["Individual success", "Rukun Negara principles", "Technical skills", "Physical fitness"],
      correct: 1
    }
  ],
  'collaborator': [
    {
      question: "What is the main focus of the Collaborator badge?",
      options: ["Individual work", "Teamwork and collaboration", "Leadership only", "Competition"],
      correct: 1
    },
    {
      question: "How many group projects are required?",
      options: ["1 project", "2 projects", "3 projects", "5 projects"],
      correct: 2
    }
  ],
  'innovator': [
    {
      question: "What does the Innovator badge celebrate?",
      options: ["Following rules", "Creative thinking", "Memorization", "Repetition"],
      correct: 1
    }
  ],
  'community-leader': [
    {
      question: "What type of projects do Community Leaders focus on?",
      options: ["Personal projects", "Community service projects", "Academic research", "Individual achievements"],
      correct: 1
    }
  ],
  'mentor': [
    {
      question: "What is the key quality of a Mentor?",
      options: ["Competition", "Helping others succeed", "Individual focus", "Speed"],
      correct: 1
    }
  ],
  'achiever': [
    {
      question: "What does the Achiever badge recognize?",
      options: ["Participation", "Outstanding academic performance", "Attendance", "Creativity only"],
      correct: 1
    }
  ]
};

export default function QuizModal({ badge, isOpen, onClose, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = quizQuestions[badge?.id] || [];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    const passed = score >= Math.ceil(questions.length * 0.7); // 70% to pass
    const points = passed ? badge.points : Math.floor(badge.points * 0.3);
    
    onComplete({
      passed,
      score,
      total: questions.length,
      points,
      badge: badge.id
    });
    
    // Reset quiz state
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    onClose();
  };

  if (!badge || questions.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Quiz: {badge.name}</DialogTitle>
        </DialogHeader>

        {!showResult ? (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{score} correct</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div>
              <h3 className="font-medium mb-4">{questions[currentQuestion].question}</h3>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full p-3 text-left border rounded-lg transition-colors ${
                      selectedAnswer === idx 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleAnswer} 
                disabled={selectedAnswer === null}
                className="flex-1"
              >
                {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">
              {score >= Math.ceil(questions.length * 0.7) ? '🎉' : '📚'}
            </div>
            <h3 className="text-xl font-bold">
              {score >= Math.ceil(questions.length * 0.7) ? 'Congratulations!' : 'Keep Learning!'}
            </h3>
            <p>You scored {score} out of {questions.length}</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium">
                {score >= Math.ceil(questions.length * 0.7) 
                  ? `+${badge.points} Merdeka Points earned!`
                  : `+${Math.floor(badge.points * 0.3)} Merdeka Points for effort!`
                }
              </p>
            </div>
            <Button onClick={handleComplete} className="w-full">
              Continue
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}