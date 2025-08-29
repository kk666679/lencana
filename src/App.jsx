import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { badges } from './data/badges';
import { getUserProgress, saveUserProgress, getUserStats } from './data/userProgress';
import BadgeCard from './components/BadgeCard';
import BadgeModal from './components/BadgeModal';
import FilterBar from './components/FilterBar';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Award, Users, BookOpen, Target, Sparkles, Trophy } from 'lucide-react';

function App() {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [userProgress, setUserProgress] = useState({});

  // Initialize user progress on component mount
  useEffect(() => {
    const progress = getUserProgress();
    setUserProgress(progress);
  }, []);

  // Save user progress whenever it changes
  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  // Filter badges based on search and filters
  const filteredBadges = useMemo(() => {
    return badges.filter(badge => {
      const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           badge.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || badge.category === selectedCategory;
      const matchesRarity = selectedRarity === 'All' || badge.rarity === selectedRarity;
      
      return matchesSearch && matchesCategory && matchesRarity;
    });
  }, [searchTerm, selectedCategory, selectedRarity]);

  const handleViewDetails = (badge) => {
    setSelectedBadge(badge);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBadge(null);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedRarity('All');
  };

  // Update badge progress
  const updateProgress = (badgeId, progress, earned = false) => {
    setUserProgress(prev => {
      const updated = { ...prev };
      if (updated[badgeId]) {
        updated[badgeId] = {
          ...updated[badgeId],
          progress: Math.min(100, Math.max(0, progress)),
          earned: earned || updated[badgeId].earned,
          earnedDate: earned ? new Date().toISOString() : updated[badgeId].earnedDate
        };
      }
      return updated;
    });
  };

  // Mark badge as earned
  const earnBadge = (badgeId) => {
    updateProgress(badgeId, 100, true);
  };

  // Get user statistics
  const userStats = useMemo(() => {
    return getUserStats(userProgress);
  }, [userProgress]);

  // Statistics
  const stats = {
    total: badges.length,
    categories: [...new Set(badges.map(b => b.category))].length,
    totalPoints: badges.reduce((sum, badge) => sum + badge.points, 0),
    rarities: [...new Set(badges.map(b => b.rarity))].length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Malaysian Educational Badges Explorer
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover and explore interactive 3D badges that celebrate academic excellence, 
              character development, and Malaysian educational values. Each badge represents 
              a milestone in holistic education and national identity building.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="w-4 h-4" />
                Total Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categories}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4" />
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPoints.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Rarity Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rarities}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Earned Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.earnedBadges}</div>
              <div className="text-xs mt-1 opacity-80">{userStats.completionRate}% completion</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedRarity={selectedRarity}
          onRarityChange={setSelectedRarity}
          onClearFilters={handleClearFilters}
        />

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBadges.length} of {badges.length} badges
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedRarity !== 'All' && ` with ${selectedRarity} rarity`}
          </p>
        </div>

        {/* Badges Grid */}
        {filteredBadges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                onViewDetails={handleViewDetails}
                userProgress={userProgress[badge.id] || { earned: false, progress: 0 }}
                onEarnBadge={earnBadge}
                onUpdateProgress={updateProgress}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Award className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No badges found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find more badges.
            </p>
            <Button onClick={handleClearFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}

        {/* Educational Impact Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Educational Impact & Values</h2>
            <p className="text-lg text-blue-100 max-w-4xl mx-auto mb-8">
              These badges are designed to align with Malaysia's national curriculum (KSSR & KSSM) 
              and promote cross-curricular learning, character development, and national identity. 
              Each badge represents a commitment to holistic education and future-ready skills.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Users className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                <p className="text-blue-100">Foster collaboration and social responsibility</p>
              </div>
              <div>
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
                <p className="text-blue-100">Encourage continuous learning and achievement</p>
              </div>
              <div>
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                <h3 className="text-xl font-semibold mb-2">Innovation & Creativity</h3>
                <p className="text-blue-100">Inspire creative thinking and problem-solving</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Malaysian Educational Badges Explorer. Supporting holistic education and national identity.
          </p>
        </div>
      </footer>

      {/* Badge Modal */}
      <BadgeModal
        badge={selectedBadge}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userProgress={selectedBadge ? userProgress[selectedBadge.id] || { earned: false, progress: 0 } : {}}
        onEarnBadge={earnBadge}
        onUpdateProgress={updateProgress}
      />
    </div>
  );
}

