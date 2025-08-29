import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, BookOpen, TrendingUp, Settings } from 'lucide-react';
import { useUserBadges, useProgress } from '../hooks/useDatabase';
import AnimatedCard from '../components/AnimatedCard';

export default function UserDashboard() {
  const { t } = useTranslation();
  const userId = 'user-1'; // Replace with actual user ID from auth
  const { badges, loading: badgesLoading } = useUserBadges(userId);
  const { progress, loading: progressLoading } = useProgress(userId);
  
  const [user] = useState({
    id: userId,
    name: 'Ahmad Rahman',
    email: 'ahmad@example.com',
    avatar: '/default-avatar.png',
    joinDate: '2024-01-15',
    role: 'student'
  });

  const [stats] = useState({
    modulesCompleted: 12,
    badgesEarned: 8,
    totalPoints: 1250,
    streak: 7
  });

  const [recentActivity] = useState([
    { id: 1, type: 'badge', title: 'Earned Innovator Badge', time: '2 hours ago' },
    { id: 2, type: 'module', title: 'Completed Mathematics Module', time: '1 day ago' },
    { id: 3, type: 'quiz', title: 'Scored 95% in Science Quiz', time: '2 days ago' }
  ]);

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header 
        className="bg-white shadow-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('nav.dashboard')}
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t('dashboard.welcome')}, {user.name}!
          </motion.p>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Profile Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full bg-gray-200"
                />
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Joined {user.joinDate}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{stats.modulesCompleted}</div>
                  <div className="text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{stats.badgesEarned}</div>
                  <div className="text-sm text-gray-600">Badges</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{stats.totalPoints}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Browse Modules</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>View Badges</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Recent Badges */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Badges</h3>
              {badgesLoading ? (
                <div className="text-center text-gray-500">Loading badges...</div>
              ) : (
                <div className="space-y-3">
                  {badges.slice(0, 3).map(badge => (
                    <div key={badge.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{badge.name}</p>
                        <p className="text-xs text-gray-500">{badge.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Progress Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Subject Progress</h3>
              {progressLoading ? (
                <div className="text-center text-gray-500">Loading progress...</div>
              ) : (
                <div className="space-y-3">
                  {progress.slice(0, 4).map(item => (
                    <div key={`${item.subject}-${item.topic}`}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.subject}</span>
                        <span>{Math.round((item.score / item.maxScore) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
