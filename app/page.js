'use client';

import { useState } from 'react';
import BadgeGrid from '../components/BadgeGrid';
import BadgeDetailModal from '../components/BadgeDetailModal';
import StatisticsDashboard from '../components/StatisticsDashboard';
import { badges } from '../data/badges';

export default function Home() {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBadgeSelect = (badge) => {
    setSelectedBadge(badge);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBadge(null);
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="title">
            🇲🇾 Malaysian Educational Badges Explorer
          </h1>
          <p className="subtitle">
            Discover, Learn, and Earn National Honors through Cross-Curricular Learning
          </p>
          
          <div className="stats">
            <div className="stat">
              <span className="stat-number">{badges.length}</span>
              <span className="stat-label">Badges</span>
            </div>
            <div className="stat">
              <span className="stat-number">{new Set(badges.flatMap(badge => badge.subjects)).size}</span>
              <span className="stat-label">Subjects</span>
            </div>
            <div className="stat">
              <span className="stat-number">{badges.reduce((acc, badge) => acc + badge.points, 0)}</span>
              <span className="stat-label">Learning Points</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="intro-section">
          <h2>Explore Malaysian National Honors</h2>
          <p>
            Embark on an educational journey through Malaysia's rich heritage of national honors and awards. 
            Each badge represents a unique learning opportunity across multiple subjects, connecting history, 
            values, and modern education.
          </p>
        </div>

        {/* Statistics Dashboard */}
        <StatisticsDashboard />

        {/* Educational Impact Section */}
        <section className="educational-impact">
          <h2>Educational Impact</h2>
          <p>
            The Malaysian Educational Badges Explorer is designed to align with the national curriculum and 
            promote key educational values. By earning badges, students develop a deeper understanding of 
            Malaysian history, culture, and civic responsibility while building essential 21st-century skills.
          </p>
          <div className="impact-grid">
            <div className="impact-item">
              <h3>📚 Cross-Curricular Learning</h3>
              <p>Connect multiple subjects through meaningful badge-based activities and projects.</p>
            </div>
            <div className="impact-item">
              <h3>🌟 Character Development</h3>
              <p>Build values like integrity, responsibility, and community service through badge achievements.</p>
            </div>
            <div className="impact-item">
              <h3>🌍 National Identity</h3>
              <p>Strengthen appreciation for Malaysian heritage, diversity, and national unity.</p>
            </div>
            <div className="impact-item">
              <h3>🚀 Innovation & Creativity</h3>
              <p>Encourage creative problem-solving and innovation through specialized badges.</p>
            </div>
          </div>
        </section>

        {/* Badge Grid */}
        <BadgeGrid badges={badges} onBadgeSelect={handleBadgeSelect} />

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Learn with Badges?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🎓</div>
              <h3>Cross-Curricular Learning</h3>
              <p>Connect multiple subjects through meaningful badge-based activities and projects.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🏆</div>
              <h3>Gamified Education</h3>
              <p>Earn points, level up, and collect badges while learning about national heritage.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🌐</div>
              <h3>National Identity</h3>
              <p>Build appreciation for Malaysian values, history, and cultural diversity.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Modern Technology</h3>
              <p>Experience interactive 3D badges and digital learning tools.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Malaysian Educational Badges Explorer. Part of the National Digital Learning Initiative.</p>
      </footer>

      {/* Modal */}
      <BadgeDetailModal
        badge={selectedBadge}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .header {
          background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .header-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .title {
          font-size: 3rem;
          font-weight: 800;
          margin: 0 0 16px 0;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 0 0 40px 0;
          line-height: 1.6;
        }

        .stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #4299e1;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .intro-section {
          text-align: center;
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .intro-section h2 {
          font-size: 2.2rem;
          color: #2d3748;
          margin: 0 0 20px 0;
        }

        .intro-section p {
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.7;
        }

        .educational-impact {
          margin: 60px 0;
          padding: 40px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .educational-impact h2 {
          text-align: center;
          font-size: 2rem;
          color: #2d3748;
          margin: 0 0 30px 0;
        }

        .educational-impact p {
          text-align: center;
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .impact-item {
          text-align: center;
        }

        .impact-item h3 {
          font-size: 1.3rem;
          color: #2d3748;
          margin: 0 0 12px 0;
        }

        .impact-item p {
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .features-section {
          margin-top: 80px;
          padding: 60px 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .features-section h2 {
          text-align: center;
          font-size: 2rem;
          color: #2d3748;
          margin: 0 0 50px 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .feature {
          text-align: center;
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .feature h3 {
          font-size: 1.3rem;
          color: #2d3748;
          margin: 0 0 12px 0;
        }

        .feature p {
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .footer {
          background: #2d3748;
          color: white;
          text-align: center;
          padding: 30px 20px;
          margin-top: 80px;
        }

        .footer p {
          margin: 0;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.2rem;
          }
          
          .subtitle {
            font-size: 1.1rem;
          }
          
          .stats {
            gap: 30px;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .feature-icon {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 40px 20px;
          }
          
          .title {
            font-size: 1.8rem;
          }
          
          .stats {
            gap: 20px;
          }
          
          .stat {
            min-width: 80px;
          }
          
          .stat-number {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
