const express = require('express');
const multer = require('multer');
const { put } = require('@vercel/blob');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Upload single file
router.post('/file', authenticateUser, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { folder = 'uploads' } = req.body;
    const filename = `${folder}/${Date.now()}-${req.file.originalname}`;
    
    const blob = await put(filename, req.file.buffer, {
      access: 'public',
      contentType: req.file.mimetype
    });

    res.json({ 
      url: blob.url,
      filename: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload multiple files
router.post('/files', authenticateUser, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const { folder = 'uploads' } = req.body;
    const uploadPromises = req.files.map(file => {
      const filename = `${folder}/${Date.now()}-${file.originalname}`;
      return put(filename, file.buffer, {
        access: 'public',
        contentType: file.mimetype
      });
    });

    const results = await Promise.all(uploadPromises);
    
    res.json({
      files: results.map((blob, index) => ({
        url: blob.url,
        filename: req.files[index].originalname,
        size: req.files[index].size,
        type: req.files[index].mimetype
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload GLB badge
router.post('/badge', authenticateUser, upload.single('badge'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No badge file uploaded' });
    }

    if (!req.file.originalname.endsWith('.glb')) {
      return res.status(400).json({ error: 'Only GLB files are allowed' });
    }

    const filename = `badges/${Date.now()}-${req.file.originalname}`;
    
    const blob = await put(filename, req.file.buffer, {
      access: 'public',
      contentType: 'model/gltf-binary'
    });

    res.json({ 
      url: blob.url,
      filename: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;