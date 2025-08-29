import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';

export default function QuizModuleModal({ module, isOpen, onClose, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!module) return null;

  const questions = module.questions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleAnswer = () => {
    let isCorrect = false;
    
    if (currentQ.type === 'multiple-choice' || currentQ.type === 'scenario') {
      isCorrect = selectedAnswer === currentQ.correct;
    } else if (currentQ.type === 'true-false') {
      isCorrect = selectedAnswer === currentQ.correct;
    } else if (currentQ.type === 'short-answer') {
      // For short answer, we'll give credit if they provide any reasonable answer
      isCorrect = textAnswer.trim().length > 5;
    }

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTextAnswer('');
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;
    
    onComplete({
      moduleId: module.id,
      score,
      total: questions.length,
      percentage,
      passed,
      points: passed ? 100 : 50
    });
    
    // Reset quiz state
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTextAnswer('');
    setScore(0);
    setShowResult(false);
    setShowExplanation(false);
    onClose();
  };

  const renderQuestion = () => {
    switch (currentQ.type) {
      case 'multiple-choice':
      case 'scenario':
        return (
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(idx)}
                disabled={showExplanation}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  selectedAnswer === idx 
                    ? showExplanation
                      ? idx === currentQ.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : showExplanation && idx === currentQ.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      
      case 'true-false':
        return (
          <div className="space-y-3">
            {[true, false].map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(option)}
                disabled={showExplanation}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  selectedAnswer === option 
                    ? showExplanation
                      ? option === currentQ.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : showExplanation && option === currentQ.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option ? 'True' : 'False'}
              </button>
            ))}
          </div>
        );
      
      case 'short-answer':
        return (
          <div className="space-y-3">
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              disabled={showExplanation}
              placeholder="Type your answer here..."
              className="w-full p-3 border rounded-lg min-h-[100px] resize-none"
            />
            {showExplanation && currentQ.sampleAnswer && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-1">Sample Answer:</div>
                <div className="text-sm text-blue-700">{currentQ.sampleAnswer}</div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{module.title}</DialogTitle>
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

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">{currentQ.question}</h3>
                {renderQuestion()}
                
                {showExplanation && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium mb-2">Explanation:</div>
                    <div className="text-sm text-gray-700">{currentQ.explanation}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-3">
              {!showExplanation ? (
                <Button 
                  onClick={handleAnswer} 
                  disabled={
                    (currentQ.type === 'short-answer' && textAnswer.trim().length === 0) ||
                    (currentQ.type !== 'short-answer' && selectedAnswer === null)
                  }
                  className="flex-1"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1">
                  {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
                </Button>
              )}
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
              {score >= Math.ceil(questions.length * 0.7) ? 'Excellent Work!' : 'Keep Learning!'}
            </h3>
            <p>You scored {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium">
                {score >= Math.ceil(questions.length * 0.7) 
                  ? '+100 Merdeka Points earned!'
                  : '+50 Merdeka Points for effort!'
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