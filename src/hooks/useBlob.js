import { useState } from 'react';
import { uploadFile, deleteFile, listFiles } from '../lib/blob';

export function useBlob() {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const upload = async (filename, data, options) => {
    setUploading(true);
    try {
      const url = await uploadFile(filename, data, options);
      return url;
    } finally {
      setUploading(false);
    }
  };

  const remove = async (url) => {
    setDeleting(true);
    try {
      await deleteFile(url);
    } finally {
      setDeleting(false);
    }
  };

  const list = async (prefix) => {
    return await listFiles(prefix);
  };

  return {
    upload,
    remove,
    list,
    uploading,
    deleting
  };
}