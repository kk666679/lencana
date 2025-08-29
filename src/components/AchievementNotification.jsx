import { useEffect, useState } from 'react';

export default function AchievementNotification({ achievements, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (achievements.length > 0) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // Wait for animation
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [achievements, onClose]);

  if (achievements.length === 0) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      {achievements.map((achievement, idx) => (
        <div
          key={achievement.id}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg mb-2 min-w-[300px]"
          style={{ animationDelay: `${idx * 200}ms` }}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">{achievement.icon}</div>
            <div>
              <div className="font-bold">Achievement Unlocked!</div>
              <div className="text-sm">{achievement.name}</div>
              <div className="text-xs opacity-90">{achievement.description}</div>
              <div className="text-xs font-medium">+{achievement.points} Merdeka Points</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}