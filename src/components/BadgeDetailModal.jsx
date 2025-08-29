import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function BadgeDetailModal({ badge, isOpen, onClose, onStartQuiz, isEarned }) {
  if (!badge) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{badge.name}</h2>
              <Badge className={`${
                badge.rarity === 'Common' ? 'bg-gray-500' :
                badge.rarity === 'Rare' ? 'bg-blue-500' :
                badge.rarity === 'Epic' ? 'bg-purple-500' :
                'bg-yellow-500'
              } text-white`}>
                {badge.rarity} • {badge.points} Merdeka Points
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{badge.longDescription || badge.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Earning Criteria</h3>
            <ul className="space-y-2">
              {badge.criteria?.map((criterion, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-sm">{criterion}</span>
                </li>
              ))}
            </ul>
          </div>

          {badge.curriculum && (
            <div>
              <h3 className="font-semibold mb-2">Curriculum Alignment</h3>
              <div className="bg-blue-50 p-3 rounded-lg text-sm">
                <div><strong>Subjects:</strong> {badge.curriculum.subjects?.join(', ')}</div>
                <div><strong>KSSR:</strong> {badge.curriculum.kssr_alignment}</div>
                <div><strong>KSSM:</strong> {badge.curriculum.kssm_alignment}</div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {!isEarned ? (
              <Button onClick={() => onStartQuiz(badge)} className="flex-1">
                Take Quiz to Earn Badge
              </Button>
            ) : (
              <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <span className="text-green-600 font-medium">✓ Badge Earned!</span>
              </div>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}