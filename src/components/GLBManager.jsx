import { useState } from 'react';
import { GLBAnalyzer } from '../lib/glbAnalyzer';
import { uploadFile } from '../lib/blob';

export default function GLBManager() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [glbFile, setGlbFile] = useState(null);
  const [updates, setUpdates] = useState({
    color: '#FFD700',
    metalness: 0.8,
    roughness: 0.2
  });

  const analyzer = new GLBAnalyzer();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.name.endsWith('.glb')) return;

    setLoading(true);
    try {
      // Upload to Vercel Blob
      const url = await uploadFile(`badges/${Date.now()}-${file.name}`, file);
      
      // Analyze GLB file
      const result = await analyzer.analyzeGLB(url);
      setAnalysis(result.analysis);
      setGlbFile(result.gltf);
    } catch (error) {
      console.error('Failed to analyze GLB:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBadge = () => {
    if (!glbFile) return;
    
    const updatedGLB = analyzer.updateBadgeProperties(glbFile, {
      color: parseInt(updates.color.replace('#', '0x')),
      metalness: parseFloat(updates.metalness),
      roughness: parseFloat(updates.roughness)
    });
    
    console.log('Badge updated:', updatedGLB);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">GLB Badge Manager</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Upload GLB Badge</label>
          <input
            type="file"
            accept=".glb"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded"
          />
        </div>

        {loading && <div className="text-blue-600">Analyzing GLB file...</div>}

        {analysis && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Meshes ({analysis.meshes.length})</h3>
                <ul className="text-sm text-gray-600">
                  {analysis.meshes.map((mesh, i) => (
                    <li key={i}>{mesh.name} - {mesh.vertices} vertices</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold">Materials ({analysis.materials.length})</h3>
                <ul className="text-sm text-gray-600">
                  {analysis.materials.map((mat, i) => (
                    <li key={i}>{mat.name} - {mat.type}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Update Properties</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm">Color</label>
                  <input
                    type="color"
                    value={updates.color}
                    onChange={(e) => setUpdates({...updates, color: e.target.value})}
                    className="w-full h-10 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm">Metalness</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={updates.metalness}
                    onChange={(e) => setUpdates({...updates, metalness: e.target.value})}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500">{updates.metalness}</span>
                </div>
                
                <div>
                  <label className="block text-sm">Roughness</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={updates.roughness}
                    onChange={(e) => setUpdates({...updates, roughness: e.target.value})}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500">{updates.roughness}</span>
                </div>
              </div>
              
              <button
                onClick={handleUpdateBadge}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Badge Properties
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}