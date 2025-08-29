'use client';

import { useState } from 'react';
import BadgeCard from './BadgeCard';

export default function BadgeGrid({ badges, onBadgeSelect }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedRarity, setSelectedRarity] = useState('All'); // New state for rarity
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Federal Honors', 'Military Awards', 'Service Medals', 'State Awards', 'Academic Excellence', 'Cultural Heritage', 'Environmental Stewardship', 'Community Service', 'Leadership', 'Innovation', 'Mentorship'];
  const subjects = ['All', 'History', 'Science', 'Mathematics', 'Language Arts', 'Moral Education', 'Visual Arts', 'Technology', 'Islamic Studies'];
  const rarities = ['All', 'Legendary', 'Rare', 'Uncommon']; // New rarity options

  const filteredBadges = badges.filter(badge => {
    const matchesCategory = selectedCategory === 'All' || badge.category === selectedCategory;
    const matchesSubject = selectedSubject === 'All' || badge.subjects.includes(selectedSubject);
    const matchesRarity = selectedRarity === 'All' || badge.rarity === selectedRarity; // Rarity filter
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSubject && matchesRarity && matchesSearch; // Include rarity in the filter
  });

  return (
    <div className="badge-grid-container">
      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search badges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="filter-select"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          {/* New Rarity Filter */}
          <select 
            value={selectedRarity} 
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="filter-select"
          >
            {rarities.map(rarity => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        <p>Showing {filteredBadges.length} of {badges.length} badges</p>
      </div>

      {/* Badge Grid */}
      <div className="badge-grid">
        {filteredBadges.map(badge => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            onClick={() => onBadgeSelect(badge)}
          />
        ))}
      </div>

      {filteredBadges.length === 0 && (
        <div className="no-results">
          <p>No badges found matching your criteria. Try adjusting your filters.</p>
        </div>
      )}

      <style jsx>{`
        .badge-grid-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .filters-section {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
          align-items: center;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
        }

        .search-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #4299e1;
        }

        .filter-controls {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .filter-select {
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          min-width: 150px;
        }

        .results-info {
          margin-bottom: 20px;
          color: #64748b;
          font-size: 14px;
        }

        .badge-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #64748b;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filter-controls {
            justify-content: center;
          }
          
          .badge-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .badge-grid {
            grid-template-columns: 1fr;
          }
          
          .filter-controls {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
