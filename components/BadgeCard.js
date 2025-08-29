'use client';

import dynamic from 'next/dynamic';

// Dynamically import the 3D preview component to avoid SSR issues
const Badge3DPreview = dynamic(() => import('./Badge3DPreview'), { ssr: false });

export default function BadgeCard({ badge, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(badge);
    }
  };

  return (
    <div className="badge-card" onClick={handleClick}>
      {/* Badge Image Placeholder */}
      <div className="badge-image">
        {badge.modelPath ? (
          <Badge3DPreview modelPath={badge.modelPath} />
        ) : (
          <div className="image-placeholder">
            <span className="badge-icon">🏅</span>
          </div>
        )}
        <div className="badge-overlay">
          <span className="view-details">View Details</span>
        </div>
      </div>

      {/* Badge Information */}
      <div className="badge-info">
        <h3 className="badge-name">{badge.name}</h3>
        <p className="badge-description">{badge.description}</p>
        
        {/* Category, Difficulty, and Rarity */}
        <div className="badge-meta">
          <span className="badge-category">{badge.category}</span>
          <span className={`badge-difficulty difficulty-${badge.difficulty.toLowerCase().replace(' ', '-')}`}>
            {badge.difficulty}
          </span>
          {badge.rarity ? (
            <span className={`badge-rarity rarity-${badge.rarity.toLowerCase()}`}>
              {badge.rarity}
            </span>
          ) : (
            <span className="badge-rarity rarity-common">
              Common
            </span>
          )}
        </div>

        {/* Associated Subjects */}
        <div className="badge-subjects">
          {badge.subjects.slice(0, 3).map((subject, index) => (
            <span key={index} className="subject-tag">
              {subject}
            </span>
          ))}
          {badge.subjects.length > 3 && (
            <span className="subject-tag more-tag">
              +{badge.subjects.length - 3} more
            </span>
          )}
        </div>

        {/* Points Value */}
        <div className="badge-points">
          <span className="points-value">{badge.points} points</span>
        </div>
      </div>

      <style jsx>{`
        .badge-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #e2e8f0;
        }

        .badge-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #4299e1;
        }

        .badge-image {
          position: relative;
          height: 180px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .image-placeholder {
          text-align: center;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .badge-icon {
          font-size: 64px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }

        .badge-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .badge-card:hover .badge-overlay {
          opacity: 1;
        }

        .view-details {
          color: white;
          font-weight: 600;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-info {
          padding: 20px;
        }

        .badge-name {
          font-size: 18px;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 12px 0;
          line-height: 1.3;
        }

        .badge-description {
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
          margin: 0 0 16px 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .badge-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .badge-category {
          font-size: 12px;
          color: #718096;
          background: #f7fafc;
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: 500;
        }

        .badge-difficulty {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .difficulty-very-high {
          background: #fed7d7;
          color: #c53030;
        }

        .difficulty-high {
          background: #feebcb;
          color: #d69e2e;
        }

        .difficulty-medium {
          background: #c6f6d5;
          color: #38a169;
        }

        .difficulty-low {
          background: #bee3f8;
          color: #3182ce;
        }

        .badge-rarity {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .rarity-legendary {
          background: rgba(255, 215, 0, 0.2);
          color: #ffd700;
          border: 1px solid #ffd700;
        }

        .rarity-rare {
          background: rgba(138, 43, 226, 0.2);
          color: #9370db;
          border: 1px solid #9370db;
        }

        .rarity-uncommon {
          background: rgba(0, 191, 255, 0.2);
          color: #87ceeb;
          border: 1px solid #87ceeb;
        }

        .rarity-common {
          background: rgba(156, 163, 175, 0.2);
          color: #6b7280;
          border: 1px solid #9ca3af;
        }

        .badge-subjects {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .subject-tag {
          font-size: 11px;
          background: #e6fffa;
          color: #234e52;
          padding: 3px 8px;
          border-radius: 10px;
          font-weight: 500;
        }

        .more-tag {
          background: #edf2f7;
          color: #4a5568;
        }

        .badge-points {
          text-align: right;
        }

        .points-value {
          font-size: 14px;
          font-weight: 700;
          color: #805ad5;
          background: #faf5ff;
          padding: 6px 12px;
          border-radius: 16px;
        }

        @media (max-width: 480px) {
          .badge-image {
            height: 150px;
          }
          
          .badge-icon {
            font-size: 48px;
          }
          
          .badge-info {
            padding: 16px;
          }
          
          .badge-name {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
