import { useState, useMemo } from 'react';
import { Search, Filter, Trophy, Lock, Clock, Star } from 'lucide-react';
import '../styles/achievements.css';

const mockAchievements = [
  {
    id: 1,
    title: 'Malaysian Heritage Explorer',
    description: 'Complete 5 lessons about Malaysian culture',
    category: 'Culture',
    status: 'unlocked',
    progress: 100,
    icon: '🏛️',
    points: 150,
    unlockedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Science Pioneer',
    description: 'Master 10 science experiments',
    category: 'Science',
    status: 'in-progress',
    progress: 70,
    icon: '🔬',
    points: 200,
    currentCount: 7,
    totalCount: 10
  },
  {
    id: 3,
    title: 'Math Wizard',
    description: 'Solve 100 mathematical problems',
    category: 'Mathematics',
    status: 'locked',
    progress: 0,
    icon: '🧮',
    points: 300,
    requirement: 'Complete Algebra Basics'
  },
  {
    id: 4,
    title: 'Language Master',
    description: 'Learn 3 Malaysian languages',
    category: 'Language',
    status: 'in-progress',
    progress: 33,
    icon: '🗣️',
    points: 250,
    currentCount: 1,
    totalCount: 3
  },
  {
    id: 5,
    title: 'History Scholar',
    description: 'Complete Malaysian independence timeline',
    category: 'History',
    status: 'unlocked',
    progress: 100,
    icon: '📚',
    points: 180,
    unlockedAt: '2024-01-20'
  },
  {
    id: 6,
    title: 'Geography Expert',
    description: 'Identify all 13 Malaysian states',
    category: 'Geography',
    status: 'locked',
    progress: 0,
    icon: '🗺️',
    points: 120,
    requirement: 'Complete Basic Geography'
  }
];

const categories = ['All', 'Culture', 'Science', 'Mathematics', 'Language', 'History', 'Geography'];
const statusFilters = ['All', 'Unlocked', 'In Progress', 'Locked'];

export default function Achievements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredAchievements = useMemo(() => {
    return mockAchievements.filter(achievement => {
      const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || achievement.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || 
                           (selectedStatus === 'Unlocked' && achievement.status === 'unlocked') ||
                           (selectedStatus === 'In Progress' && achievement.status === 'in-progress') ||
                           (selectedStatus === 'Locked' && achievement.status === 'locked');
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  const stats = useMemo(() => {
    const unlocked = mockAchievements.filter(a => a.status === 'unlocked').length;
    const inProgress = mockAchievements.filter(a => a.status === 'in-progress').length;
    const totalPoints = mockAchievements
      .filter(a => a.status === 'unlocked')
      .reduce((sum, a) => sum + a.points, 0);
    
    return { unlocked, inProgress, total: mockAchievements.length, totalPoints };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Achievements
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your learning progress and unlock new badges
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Unlocked</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.unlocked}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">In Progress</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Points</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPoints}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search achievements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {statusFilters.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No achievements found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AchievementCard({ achievement }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'unlocked': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'in-progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'locked': return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'unlocked': return <Trophy className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'locked': return <Lock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className={`achievement-card bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${
      achievement.status === 'locked' ? 'opacity-60' : ''
    }`}>
      <div className="p-6">
        {/* Icon and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{achievement.icon}</div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(achievement.status)}`}>
            {getStatusIcon(achievement.status)}
            <span className="capitalize">{achievement.status.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {achievement.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {achievement.description}
        </p>

        {/* Progress Bar */}
        {achievement.status !== 'locked' && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{achievement.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`progress-bar h-2 rounded-full transition-all duration-300 ${
                  achievement.status === 'unlocked' ? 'completed' : ''
                }`}
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
            {achievement.currentCount && achievement.totalCount && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {achievement.currentCount} of {achievement.totalCount} completed
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
              {achievement.category}
            </span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">{achievement.points}</span>
          </div>
        </div>

        {/* Additional Info */}
        {achievement.status === 'unlocked' && achievement.unlockedAt && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
          </p>
        )}
        {achievement.status === 'locked' && achievement.requirement && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Requirement: {achievement.requirement}
          </p>
        )}
      </div>
    </div>
  );
}