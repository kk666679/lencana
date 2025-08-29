import { useState } from 'react';
import GLBManager from '../components/GLBManager';
import BadgeHero3D from '../components/BadgeHero3D';

export default function BadgeStudio() {
  const [activeTab, setActiveTab] = useState('manager');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">3D Badge Studio</h1>
          <p className="text-gray-600">Analyze, update, and preview GLB badge files</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('manager')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'manager' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            GLB Manager
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'preview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            3D Preview
          </button>
        </div>

        {activeTab === 'manager' && <GLBManager />}
        {activeTab === 'preview' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-96">
              <BadgeHero3D />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}