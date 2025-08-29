import { useState } from 'react';
import { useBadges } from '../hooks/useBadges';
import { useProgress } from '../hooks/useProgress';
import { useAchievements } from '../hooks/useAchievements';
import BadgeDetailModal from './BadgeDetailModal';
import QuizModal from './QuizModal';
import AchievementNotification from './AchievementNotification';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function BadgeExplorer() {
  const [filters, setFilters] = useState({ category: 'All', rarity: 'All' });
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizBadge, setQuizBadge] = useState(null);
  
  const { badges, loading: badgesLoading } = useBadges(filters);
  const { progress, stats, addQuizResult, getLevelProgress, getLevelTitle } = useProgress(window.LENCANA_USER_ID);
  const { newAchievements, clearNewAchievements } = useAchievements(stats);
  
  const levelProgress = getLevelProgress();
  const levelTitle = getLevelTitle();

  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
    setShowDetailModal(true);
  };

  const handleStartQuiz = (badge) => {
    setQuizBadge(badge);
    setShowDetailModal(false);
    setShowQuizModal(true);
  };

  const handleQuizComplete = (result) => {
    addQuizResult(result.badge, result);
    setShowQuizModal(false);
    setQuizBadge(null);
  };

  if (badgesLoading) {
    return <div className="flex justify-center p-8">Loading badges...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <AchievementNotification 
        achievements={newAchievements} 
        onClose={clearNewAchievements} 
      />
      
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Badge Explorer</h1>
            <p className="text-muted-foreground mt-1">Discover and earn Malaysian heritage badges through interactive learning</p>
          </div>
        </div>
        
        {/* Level Progress */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-6 rounded-lg mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {stats.level}
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{levelTitle}</div>
                <div className="text-sm text-muted-foreground">Level {stats.level}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{levelProgress.current}/{levelProgress.required} XP</div>
              <div className="text-xs text-muted-foreground">Next level</div>
            </div>
          </div>
          <Progress value={levelProgress.percentage} className="h-2 bg-blue-100" />
        </div>
        
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-card border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-primary mb-1">{stats.earnedBadges || 0}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-merdeka-600 mb-1">{stats.totalPoints || 0}</div>
            <div className="text-sm text-muted-foreground">Merdeka Points</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.completionRate || 0}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.quizzesCompleted || 0}</div>
            <div className="text-sm text-muted-foreground">Quizzes Done</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-gray-600 mb-1">{badges.length}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Academic Excellence">Academic Excellence</SelectItem>
            <SelectItem value="Teamwork">Teamwork</SelectItem>
            <SelectItem value="Innovation">Innovation</SelectItem>
            <SelectItem value="Leadership">Leadership</SelectItem>
            <SelectItem value="Service">Service</SelectItem>
            <SelectItem value="Achievement">Achievement</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filters.rarity} onValueChange={(value) => setFilters(prev => ({ ...prev, rarity: value }))}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Rarities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Rarities</SelectItem>
            <SelectItem value="Common">Common</SelectItem>
            <SelectItem value="Rare">Rare</SelectItem>
            <SelectItem value="Epic">Epic</SelectItem>
            <SelectItem value="Legendary">Legendary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map(badge => {
          const badgeProgress = progress[badge.id];
          const isEarned = badgeProgress?.earned || false;
          
          return (
            <div 
              key={badge.id} 
              className={`group relative bg-card border rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                isEarned 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm' 
                  : 'hover:border-primary/50 hover:shadow-primary/10'
              }`}
              onClick={() => handleBadgeClick(badge)}
            >
              {isEarned && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  ✓
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {badge.name}
                  </h3>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                    badge.rarity === 'Common' ? 'badge-common' :
                    badge.rarity === 'Rare' ? 'badge-rare' :
                    badge.rarity === 'Epic' ? 'badge-epic' :
                    'badge-legendary'
                  }`}>
                    {badge.rarity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-merdeka-600">{badge.points}</div>
                  <div className="text-xs text-muted-foreground">Merdeka Points</div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 line-clamp-2">{badge.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {badge.category}
                </div>
                <div className="text-xs text-primary font-medium group-hover:text-primary/80">
                  Click to view details →
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <BadgeDetailModal
        badge={selectedBadge}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onStartQuiz={handleStartQuiz}
        isEarned={selectedBadge && progress[selectedBadge.id]?.earned}
      />
      
      <QuizModal
        badge={quizBadge}
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        onComplete={handleQuizComplete}
      />
    </div>
  );
}