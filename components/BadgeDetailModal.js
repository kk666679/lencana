'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D model component to avoid SSR issues
const Badge3DModel = dynamic(() => import('./Badge3DModel'), { ssr: false });

export default function BadgeDetailModal({ badge, isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !badge) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          <span>×</span>
        </button>

        {/* Badge Header */}
        <div className="badge-header">
          <div className="badge-image-large">
            {badge.image ? (
              <img 
                src={badge.image} 
                alt={badge.name}
                className="badge-image-display"
              />
            ) : (
              <div className="image-placeholder-large">
                <span className="badge-icon-large">🏅</span>
              </div>
            )}
            {/* 3D Model Display */}
            {badge.modelPath && (
              <div className="badge-3d-model">
                <Badge3DModel modelPath={badge.modelPath} />
              </div>
            )}
          </div>
          
          <div className="badge-title-section">
            <h1 className="badge-title">{badge.name}</h1>
            <p className="badge-category-large">{badge.category}</p>
            {badge.rarity && (
              <div className={`badge-rarity rarity-${badge.rarity.toLowerCase()}`}>
                {badge.rarity} Rarity
              </div>
            )}
            <div className={`badge-difficulty-large difficulty-${badge.difficulty.toLowerCase().replace(' ', '-')}`}>
              {badge.difficulty} Level
            </div>
          </div>
        </div>

        {/* Badge Details */}
        <div className="badge-details">
          <div className="detail-section">
            <h3>Description</h3>
            <p>{badge.description}</p>
          </div>

          <div className="detail-section">
            <h3>Award Criteria</h3>
            <p>{badge.criteria}</p>
          </div>

          <div className="detail-section">
            <h3>Historical Context</h3>
            <p>{badge.historicalContext}</p>
          </div>

          {badge.notableRecipients && badge.notableRecipients.length > 0 && (
            <div className="detail-section">
              <h3>Notable Recipients</h3>
              <ul className="recipients-list">
                {badge.notableRecipients.map((recipient, index) => (
                  <li key={index}>{recipient}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="detail-section">
            <h3>Learning Objectives</h3>
            <ul className="objectives-list">
              {badge.learningObjectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h3>Associated Subjects</h3>
            <div className="subjects-grid">
              {badge.subjects.map((subject, index) => (
                <span key={index} className="subject-chip">
                  {subject}
                </span>
              ))}
            </div>
          </div>

          <div className="points-section">
            <div className="points-badge">
              <span className="points-label">Points Value</span>
              <span className="points-value">{badge.points} Merdeka Points</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="primary-button">
            Start Learning Module
          </button>
          <button className="secondary-button">
            Take Quiz
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          backdrop-filter: blur(5px);
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 28px;
          color: #64748b;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .close-button:hover {
          background: #f1f5f9;
          color: #374151;
        }

        .badge-header {
          display: flex;
          align-items: center;
          padding: 40px 40px 20px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .badge-image-large {
          margin-right: 30px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .badge-image-display {
          width: 100px;
          height: 100px;
          object-fit: contain;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px;
        }

        .image-placeholder-large {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .badge-3d-model {
          width: 100px;
          height: 100px;
          position: absolute;
          top: 0;
          left: 0;
        }

        .badge-icon-large {
          font-size: 48px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }

        .badge-title-section {
          flex: 1;
        }

        .badge-title {
          font-size: 28px;
          font-weight: 800;
          margin: 0 0 8px 0;
          line-height: 1.2;
        }

        .badge-category-large {
          font-size: 16px;
          margin: 0 0 12px 0;
          opacity: 0.9;
        }

        .badge-rarity {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
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

        .badge-difficulty-large {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .difficulty-very-high {
          background: rgba(254, 215, 215, 0.2);
          color: #fed7d7;
        }

        .difficulty-high {
          background: rgba(254, 235, 203, 0.2);
          color: #feebcb;
        }

        .difficulty-medium {
          background: rgba(198, 246, 213, 0.2);
          color: #c6f6d5;
        }

        .badge-details {
          padding: 30px 40px;
        }

        .detail-section {
          margin-bottom: 25px;
        }

        .detail-section h3 {
          font-size: 18px;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 12px 0;
        }

        .detail-section p {
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }

        .recipients-list,
        .objectives-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .recipients-list li,
        .objectives-list li {
          padding: 8px 0;
          color: #4a5568;
          position: relative;
          padding-left: 20px;
        }

        .recipients-list li::before {
          content: '👤';
          position: absolute;
          left: 0;
        }

        .objectives-list li::before {
          content: '🎯';
          position: absolute;
          left: 0;
        }

        .subjects-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .subject-chip {
          background: #e6fffa;
          color: #234e52;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
        }

        .points-section {
          text-align: center;
          margin: 30px 0;
        }

        .points-badge {
          display: inline-block;
          background: linear-gradient(135deg, #805ad5, #d53f8c);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 700;
        }

        .points-label {
          display: block;
          font-size: 12px;
          opacity: 0.9;
          margin-bottom: 4px;
        }

        .points-value {
          font-size: 20px;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          padding: 0 40px 40px 40px;
        }

        .primary-button,
        .secondary-button {
          flex: 1;
          padding: 16px 24px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .primary-button {
          background: #805ad5;
          color: white;
        }

        .primary-button:hover {
          background: #6b46c1;
          transform: translateY(-2px);
        }

        .secondary-button {
          background: #e2e8f0;
          color: #4a5568;
        }

        .secondary-button:hover {
          background: #cbd5e0;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .modal-overlay {
            padding: 10px;
          }
          
          .badge-header {
            flex-direction: column;
            text-align: center;
            padding: 30px 20px 20px 20px;
          }
          
          .badge-image-large {
            margin-right: 0;
            margin-bottom: 20px;
          }
          
          .badge-details {
            padding: 20px;
          }
          
          .action-buttons {
            flex-direction: column;
            padding: 0 20px 20px 20px;
          }
        }

        @media (max-width: 480px) {
          .badge-title {
            font-size: 22px;
          }
          
          .image-placeholder-large {
            width: 80px;
            height: 80px;
          }
          
          .badge-icon-large {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
}
