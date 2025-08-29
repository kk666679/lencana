import { useState } from 'react';
import { uploadFile } from '../lib/blob';

export default function ModuleEditor({ module, onSave }) {
  const [formData, setFormData] = useState({
    title: module?.title || '',
    description: module?.description || '',
    content: module?.content || '',
    subject: module?.subject || '',
    gradeLevel: module?.gradeLevel || '',
    difficulty: module?.difficulty || 'beginner',
    tags: module?.tags?.join(', ') || '',
    published: module?.published || false
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    setUploading(true);
    
    try {
      const uploadPromises = selectedFiles.map(file => 
        uploadFile(`modules/${Date.now()}-${file.name}`, file)
      );
      const urls = await Promise.all(uploadPromises);
      setFiles(prev => [...prev, ...urls]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moduleData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      fileUrls: files
    };
    await onSave(moduleData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Module Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="p-3 border rounded-lg"
          required
        />
        <select
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          className="p-3 border rounded-lg"
          required
        >
          <option value="">Select Subject</option>
          <option value="mathematics">Mathematics</option>
          <option value="science">Science</option>
          <option value="english">English</option>
          <option value="history">History</option>
        </select>
      </div>

      <textarea
        placeholder="Module Description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        className="w-full p-3 border rounded-lg h-24"
      />

      <textarea
        placeholder="Module Content (Markdown supported)"
        value={formData.content}
        onChange={(e) => setFormData({...formData, content: e.target.value})}
        className="w-full p-3 border rounded-lg h-48"
        required
      />

      <div className="grid grid-cols-3 gap-4">
        <select
          value={formData.gradeLevel}
          onChange={(e) => setFormData({...formData, gradeLevel: e.target.value})}
          className="p-3 border rounded-lg"
        >
          <option value="">Grade Level</option>
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
        </select>
        
        <select
          value={formData.difficulty}
          onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
          className="p-3 border rounded-lg"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={(e) => setFormData({...formData, tags: e.target.value})}
          className="p-3 border rounded-lg"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Upload Files</label>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="w-full p-2 border rounded-lg"
          disabled={uploading}
        />
        {uploading && <p className="text-sm text-blue-600">Uploading files...</p>}
        {files.length > 0 && (
          <div className="text-sm text-green-600">
            {files.length} file(s) uploaded
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({...formData, published: e.target.checked})}
          />
          Publish Module
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {module ? 'Update Module' : 'Create Module'}
      </button>
    </form>
  );
}