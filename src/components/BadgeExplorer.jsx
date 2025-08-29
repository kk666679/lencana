import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBadges } from '../hooks/useBadges';
import { useProgress } from '../hooks/useProgress';
import { useAchievements } from '../hooks/useAchievements';
import BadgeDetailModal from './BadgeDetailModal';
import QuizModal from './QuizModal';
import AchievementNotification from './AchievementNotification';
import AnimatedCard from './AnimatedCard';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Users, Award, BookOpen } from 'lucide-react';

export default function BadgeExplorer() {
  const [filters, setFilters] = useState({ category: 'All', rarity: 'All', search: '' });
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizBadge, setQuizBadge] = useState(null);
  
  const { badges, loading: badgesLoading } = useBadges(filters);
  
  // Apply search filter on frontend
  const filteredBadges = badges.filter(badge => {
    if (filters.search) {
      return badge.name.toLowerCase().includes(filters.search.toLowerCase()) ||
             badge.description.toLowerCase().includes(filters.search.toLowerCase());
    }
    return true;
  });
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
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Lencana Malaysia" className="h-12 w-12" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Badge Explorer</h1>
                <p className="text-muted-foreground mt-1">Discover and earn Malaysian heritage badges through interactive learning</p>
              </div>
            </div>
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
        
        {/* Comprehensive Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-card border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-primary mb-1">{stats.earnedBadges || 0}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-merdeka-600 mb-1">{stats.totalPoints || 0}</div>
            <div className="text-sm text-muted-foreground">Merdeka Points</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.completionRate || 0}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.quizzesCompleted || 0}</div>
            <div className="text-sm text-muted-foreground">Quizzes Done</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-gray-600 mb-1">{badges.length}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
        </div>
        
        {/* Badge Rarity Distribution */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Badge Rarity Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Common', 'Rare', 'Epic', 'Legendary'].map(rarity => {
              const count = filteredBadges.filter(badge => badge.rarity === rarity).length;
              const percentage = filteredBadges.length > 0 ? Math.round((count / filteredBadges.length) * 100) : 0;
              return (
                <div key={rarity} className="text-center">
                  <div className={`text-xl font-bold mb-1 ${
                    rarity === 'Common' ? 'text-gray-600' :
                    rarity === 'Rare' ? 'text-blue-600' :
                    rarity === 'Epic' ? 'text-purple-600' :
                    'text-yellow-600'
                  }`}>{count}</div>
                  <div className="text-sm text-muted-foreground">{rarity}</div>
                  <div className="text-xs text-muted-foreground">({percentage}%)</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Smart Filtering System */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search badges by name..."
              value={filters.search || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full"
            />
          </div>
          <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="National Identity">National Identity</SelectItem>
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
        
        {/* Filter Summary */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Showing {filteredBadges.length} badges</span>
          {(filters.search || filters.category !== 'All' || filters.rarity !== 'All') && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setFilters({ category: 'All', rarity: 'All', search: '' })}
              className="h-6 px-2"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence>
        {filteredBadges.map((badge, index) => {
          const badgeProgress = progress[badge.id];
          const isEarned = badgeProgress?.earned || false;
          
          return (
            <AnimatedCard 
              key={badge.id}
              delay={index * 0.1}
              className={`group relative bg-card border rounded-lg p-6 cursor-pointer ${
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
            </AnimatedCard>
          );
        })}
        </AnimatePresence>
      </motion.div>
      
      {/* Educational Impact Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Educational Impact & Malaysian Values</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our platform aligns with core Malaysian educational values, fostering holistic development through interactive badge-based learning that emphasizes collaboration, innovation, and lifelong learning.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Collaboration</h3>
            <p className="text-sm text-muted-foreground">
              Encouraging teamwork and peer learning through group projects and collaborative badge earning activities.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-merdeka-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-merdeka-600" />
            </div>
            <h3 className="font-semibold mb-2">Innovation</h3>
            <p className="text-sm text-muted-foreground">
              Promoting creative thinking and problem-solving skills through interactive 3D badge exploration and gamified learning.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Lifelong Learning</h3>
            <p className="text-sm text-muted-foreground">
              Instilling continuous learning habits through progressive badge systems and cross-curricular educational content.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/50 rounded-full px-4 py-2">
            <span className="text-sm font-medium">🇲🇾 Aligned with KSSR & KSSM Curricula</span>
          </div>
        </div>
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