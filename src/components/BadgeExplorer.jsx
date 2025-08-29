import { useState } from 'react';
import { useBadges } from './hooks/useBadges';
import { useProgress } from './hooks/useProgress';

export default function BadgeExplorer() {
  const [filters, setFilters] = useState({ category: 'All', rarity: 'All' });
  const { badges, loading: badgesLoading } = useBadges(filters);
  const { progress, stats, updateBadgeProgress } = useProgress(window.LENCANA_USER_ID);

  const handleEarnBadge = async (badgeId) => {
    try {
      await updateBadgeProgress(badgeId, 100, true);
    } catch (error) {
      console.error('Failed to earn badge:', error);
    }
  };

  if (badgesLoading) {
    return <div className="flex justify-center p-8">Loading badges...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Badge Explorer</h1>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.earnedBadges || 0}</div>
              <div className="text-sm text-gray-600">Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.totalPoints || 0}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.completionRate || 0}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{badges.length}</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <select 
          value={filters.category} 
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="All">All Categories</option>
          <option value="Academic Excellence">Academic Excellence</option>
          <option value="Teamwork">Teamwork</option>
          <option value="Innovation">Innovation</option>
          <option value="Leadership">Leadership</option>
        </select>
        
        <select 
          value={filters.rarity} 
          onChange={(e) => setFilters(prev => ({ ...prev, rarity: e.target.value }))}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="All">All Rarities</option>
          <option value="Common">Common</option>
          <option value="Rare">Rare</option>
          <option value="Epic">Epic</option>
          <option value="Legendary">Legendary</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map(badge => {
          const badgeProgress = progress[badge.id];
          const isEarned = badgeProgress?.earned || false;
          
          return (
            <div key={badge.id} className={`border rounded-lg p-6 ${isEarned ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{badge.name}</h3>
                {isEarned && <span className="text-green-600 text-sm font-medium">✓ Earned</span>}
              </div>
              
              <p className="text-gray-600 mb-4">{badge.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded text-sm ${
                  badge.rarity === 'Common' ? 'bg-gray-100 text-gray-800' :
                  badge.rarity === 'Rare' ? 'bg-blue-100 text-blue-800' :
                  badge.rarity === 'Epic' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {badge.rarity}
                </span>
                <span className="text-sm font-medium">{badge.points} pts</span>
              </div>
              
              {!isEarned && (
                <button 
                  onClick={() => handleEarnBadge(badge.id)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Earn Badge
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}