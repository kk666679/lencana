'use client';

import { useEffect, useState } from 'react';
import { badges, getRarityLevels } from '../data/badges';

export default function StatisticsDashboard() {
  const [totalBadges, setTotalBadges] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [categories, setCategories] = useState([]);
  const [rarityLevels, setRarityLevels] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState({});
  const [totalSubjects, setTotalSubjects] = useState(0);

  useEffect(() => {
    setTotalBadges(badges.length);
    setTotalPoints(badges.reduce((acc, badge) => acc + badge.points, 0));
    setCategories([...new Set(badges.map(badge => badge.category))]);
    setRarityLevels(getRarityLevels());
    
    // Calculate difficulty distribution
    const difficultyCounts = badges.reduce((acc, badge) => {
      acc[badge.difficulty] = (acc[badge.difficulty] || 0) + 1;
      return acc;
    }, {});
    setDifficultyLevels(difficultyCounts);
    
    // Calculate total unique subjects
    setTotalSubjects(new Set(badges.flatMap(badge => badge.subjects)).size);
  }, []);

  return (
    <div className="statistics-dashboard">
      <h2>Statistics Overview</h2>
      <div className="stats">
        <div className="stat">
          <h3>Total Badges</h3>
          <p>{totalBadges}</p>
        </div>
        <div className="stat">
          <h3>Total Points</h3>
          <p>{totalPoints} Merdeka Points</p>
        </div>
        <div className="stat">
          <h3>Categories</h3>
          <p>{categories.length}</p>
        </div>
        <div className="stat">
          <h3>Subjects</h3>
          <p>{totalSubjects}</p>
        </div>
        <div className="stat">
          <h3>Rarity Levels</h3>
          <p>{rarityLevels.length}</p>
        </div>
        <div className="stat">
          <h3>Difficulty Levels</h3>
          <p>{Object.keys(difficultyLevels).length}</p>
        </div>
      </div>

      <style jsx>{`
        .statistics-dashboard {
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin: 20px 0;
        }

        .stats {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .stat {
          flex: 1;
          min-width: 200px;
          padding: 20px;
          background: #f7fafc;
          border-radius: 8px;
          text-align: center;
        }

        .stat h3 {
          margin-bottom: 10px;
          color: #2d3748;
        }

        .stat p {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1a365d;
        }
      `}</style>
    </div>
  );
}
