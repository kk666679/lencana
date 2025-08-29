import { useState } from 'react';
import { uploadFile } from '../lib/blob';

export default function FileUpload({ onUpload, accept = "*/*", folder = "uploads" }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const filename = `${folder}/${Date.now()}-${file.name}`;
      const url = await uploadFile(filename, file);
      onUpload?.(url, file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept={accept}
        onChange={handleUpload}
        disabled={uploading}
        className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
    </div>
  );
}