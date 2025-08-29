# Vercel Blob Integration

## Setup

1. **Environment Variable**
   ```bash
   # Add to .env.local
   BLOB_READ_WRITE_TOKEN=your-blob-token
   ```

2. **Get Token**
   ```bash
   vercel env add BLOB_READ_WRITE_TOKEN
   ```

## Usage Examples

```javascript
import { put } from "@vercel/blob";

// Upload file
const { url } = await put('articles/blob.txt', 'Hello World!', { 
  access: 'public' 
});

// Upload badge image
const { url } = await put(`badges/${badgeId}.jpg`, imageFile, {
  access: 'public'
});
```

## Components Created

- `src/lib/blob.js` - Blob utilities
- `src/components/FileUpload.jsx` - Upload component  
- `src/hooks/useBlob.js` - React hook

## Deploy with Blob

```bash
npm run deploy
```