import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, BarChart3 } from 'lucide-react';
import ModuleEditor from './ModuleEditor';

export default function ModuleManager({ userId }) {
  const [modules, setModules] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchModules();
  }, [userId]);

  const fetchModules = async () => {
    try {
      const response = await fetch(`/api/modules?creatorId=${userId}`);
      const data = await response.json();
      setModules(data);
    } catch (error) {
      console.error('Failed to fetch modules:', error);
    }
  };

  const handleSaveModule = async (moduleData) => {
    try {
      const url = editingModule ? `/api/modules/${editingModule.id}` : '/api/modules';
      const method = editingModule ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...moduleData, creatorId: userId })
      });
      
      fetchModules();
      setShowEditor(false);
      setEditingModule(null);
    } catch (error) {
      console.error('Failed to save module:', error);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (confirm('Delete this module?')) {
      try {
        await fetch(`/api/modules/${moduleId}`, { method: 'DELETE' });
        fetchModules();
      } catch (error) {
        console.error('Failed to delete module:', error);
      }
    }
  };

  const filteredModules = modules.filter(module => {
    if (filter === 'published') return module.published;
    if (filter === 'draft') return !module.published;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Study Modules</h2>
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Create Module
        </button>
      </div>

      <div className="flex gap-2">
        {['all', 'published', 'draft'].map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === filterType 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>

      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editingModule ? 'Edit Module' : 'Create New Module'}
              </h3>
              <button
                onClick={() => {
                  setShowEditor(false);
                  setEditingModule(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <ModuleEditor module={editingModule} onSave={handleSaveModule} />
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {filteredModules.map(module => (
          <div key={module.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{module.title}</h3>
                <p className="text-gray-600 text-sm">{module.description}</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {module.subject}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    {module.gradeLevel}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    module.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {module.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(`/modules/${module.id}`, '_blank')}
                  className="p-2 text-gray-600 hover:text-blue-600"
                  title="Preview"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => window.open(`/analytics/${module.id}`, '_blank')}
                  className="p-2 text-gray-600 hover:text-green-600"
                  title="Analytics"
                >
                  <BarChart3 size={16} />
                </button>
                <button
                  onClick={() => {
                    setEditingModule(module);
                    setShowEditor(true);
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteModule(module.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}