import { useState } from 'react';
import { BookOpen, Users, BarChart3, Settings } from 'lucide-react';
import ModuleManager from '../components/ModuleManager';

export default function EducatorDashboard() {
  const [activeTab, setActiveTab] = useState('modules');
  const userId = 'educator-1'; // Replace with actual user ID from auth

  const tabs = [
    { id: 'modules', label: 'Study Modules', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Educator Dashboard</h1>
          <p className="text-gray-600">Manage your study modules and track student progress</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <nav className="w-64 bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>

          <main className="flex-1">
            {activeTab === 'modules' && <ModuleManager userId={userId} />}
            
            {activeTab === 'students' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Student Management</h2>
                <p className="text-gray-600">View and manage your students' progress and engagement.</p>
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Analytics & Insights</h2>
                <p className="text-gray-600">Track module performance, completion rates, and student engagement.</p>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <p className="text-gray-600">Configure your preferences and account settings.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}