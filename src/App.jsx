import { useState } from 'react';
import BadgeExplorer from './components/BadgeExplorer';
import CurriculumDashboard from './components/CurriculumDashboard';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('curriculum');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Lencana Malaysia" className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-blue-800">Lencana Malaysia LMS</h1>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveView('curriculum')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeView === 'curriculum' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Curriculum Dashboard
              </button>
              <button 
                onClick={() => setActiveView('explorer')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeView === 'explorer' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Badge Explorer
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {activeView === 'curriculum' ? <CurriculumDashboard /> : <BadgeExplorer />}
    </div>
  );
}

export default App;

