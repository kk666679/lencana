import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Play, FileText } from 'lucide-react';

export default function ModuleViewer() {
  const { id: moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModule();
  }, [moduleId]);

  const fetchModule = async () => {
    try {
      const response = await fetch(`/api/modules/${moduleId}`);
      const data = await response.json();
      setModule(data);
    } catch (error) {
      console.error('Failed to fetch module:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading module...</div>;
  if (!module) return <div className="p-6">Module not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
        <p className="text-gray-600 mb-4">{module.description}</p>
        
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {module.subject}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
            {module.gradeLevel}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
            {module.difficulty}
          </span>
        </div>

        {module.tags && module.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {module.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose max-w-none mb-8">
        <div className="whitespace-pre-wrap">{module.content}</div>
      </div>

      {module.fileUrls && module.fileUrls.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <div className="grid gap-3">
            {module.fileUrls.map((url, index) => {
              const fileName = url.split('/').pop();
              const fileType = fileName.split('.').pop().toLowerCase();
              
              return (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  {fileType === 'pdf' && <FileText className="text-red-500" size={20} />}
                  {['mp4', 'avi', 'mov'].includes(fileType) && <Play className="text-blue-500" size={20} />}
                  {!['pdf', 'mp4', 'avi', 'mov'].includes(fileType) && <Download className="text-gray-500" size={20} />}
                  
                  <span className="flex-1">{fileName}</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    {fileType === 'pdf' ? 'View' : 'Download'}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {module.quizzes && module.quizzes.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Quizzes</h3>
          <div className="grid gap-3">
            {module.quizzes.map(quiz => (
              <div key={quiz.id} className="p-4 border rounded-lg">
                <h4 className="font-medium">{quiz.title}</h4>
                <p className="text-sm text-gray-600">Points: {quiz.points}</p>
                <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Take Quiz
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}