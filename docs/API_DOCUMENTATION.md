# API Documentation

## Base URL
- Development: `http://localhost:3001/api`
- Production: `https://lencana.vercel.app/api`

## Authentication
Currently using basic API without authentication. Future versions will include JWT tokens.

## Endpoints

### Health Check
```
GET /health
```
Returns server status and version information.

### Badges API

#### Get All Badges
```
GET /badges?category={category}&rarity={rarity}
```

#### Get Single Badge
```
GET /badges/:id
```

#### Create Badge
```
POST /badges
Content-Type: application/json

{
  "name": "Badge Name",
  "description": "Badge description",
  "category": "Achievement",
  "rarity": "Rare",
  "points": 100,
  "imageUrl": "https://...",
  "modelUrl": "https://..."
}
```

#### Award Badge
```
POST /badges/:id/award
Content-Type: application/json

{
  "userId": "user-id"
}
```

#### Get User Badges
```
GET /badges/user/:userId
```

### Modules API

#### Get All Modules
```
GET /modules?creatorId={id}&subject={subject}&gradeLevel={level}&published={true/false}
```

#### Get Single Module
```
GET /modules/:id
```

#### Create Module
```
POST /modules
Content-Type: application/json

{
  "title": "Module Title",
  "description": "Module description",
  "content": "Module content in markdown",
  "subject": "Mathematics",
  "gradeLevel": "Primary",
  "difficulty": "beginner",
  "tags": ["math", "algebra"],
  "creatorId": "educator-id",
  "published": false
}
```

#### Update Module
```
PUT /modules/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "published": true
}
```

#### Delete Module
```
DELETE /modules/:id
```

### Upload API

#### Upload Single File
```
POST /upload/file
Content-Type: multipart/form-data

file: [File]
folder: "uploads" (optional)
```

#### Upload Multiple Files
```
POST /upload/files
Content-Type: multipart/form-data

files: [File, File, ...]
folder: "uploads" (optional)
```

#### Upload GLB Badge
```
POST /upload/badge
Content-Type: multipart/form-data

badge: [GLB File]
```

### Analytics API

#### Get Module Analytics
```
GET /analytics/modules/:id
```

#### Get User Progress
```
GET /analytics/users/:id/progress
```

#### Track Module Access
```
POST /analytics/track
Content-Type: application/json

{
  "moduleId": "module-id",
  "userId": "user-id",
  "timeSpent": 300,
  "completed": true,
  "score": 85
}
```

#### Get Platform Overview
```
GET /analytics/overview
```

## Error Responses

All endpoints return errors in the following format:
```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API is rate limited to 100 requests per 15 minutes per IP address.

## File Upload Limits

- Maximum file size: 50MB
- Supported formats: PDF, DOC, PPT, MP4, AVI, MOV, JPG, PNG, GLB
- GLB files are specifically validated for badge uploads