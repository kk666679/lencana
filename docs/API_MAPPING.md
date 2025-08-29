# Lencana Malaysia LMS - Complete API Mapping

## Base URL
- **Development**: `http://localhost:3001/api`
- **Production**: `https://lencana.vercel.app/api`

## Security
- **Authentication**: JWT Bearer tokens
- **CSRF Protection**: Required for state-changing operations
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend domain

---

## 🔐 Authentication Routes (`/api/auth`)

### POST `/api/auth/login`
**Purpose**: User authentication
**Auth**: None
**Body**:
```json
{
  "email": "user@example.com",
  "password": "password"
}
```
**Response**:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "student|educator|admin"
  }
}
```

### POST `/api/auth/register`
**Purpose**: User registration
**Auth**: None
**Body**:
```json
{
  "email": "user@example.com",
  "name": "User Name",
  "password": "password"
}
```
**Response**: Same as login

---

## 🏆 Badges Routes (`/api/badges`)

### GET `/api/badges`
**Purpose**: Get all badges with filtering
**Auth**: None
**Query Params**:
- `category`: Filter by badge category
- `rarity`: Filter by badge rarity
**Response**: Array of badge objects

### GET `/api/badges/:id`
**Purpose**: Get specific badge details
**Auth**: None
**Response**: Single badge object with full details

### GET `/api/badges/meta/categories`
**Purpose**: Get all available badge categories
**Auth**: None
**Response**: Array of category strings

### GET `/api/badges/meta/rarities`
**Purpose**: Get all available badge rarities
**Auth**: None
**Response**: Array of rarity strings

### GET `/api/badges/user/:userId`
**Purpose**: Get badges earned by specific user
**Auth**: None
**Response**: Array of earned badges with timestamps

### POST `/api/badges/:id/award`
**Purpose**: Award badge to user
**Auth**: Required (educator/admin)
**Body**:
```json
{
  "userId": "user-id"
}
```

---

## 👥 Users Routes (`/api/users`)

### GET `/api/users/:id`
**Purpose**: Get user profile
**Auth**: None
**Response**: User profile object

### PUT `/api/users/:id`
**Purpose**: Update user profile
**Auth**: Required (own profile)
**Body**:
```json
{
  "name": "Updated Name",
  "email": "new@example.com",
  "avatar": "avatar_url"
}
```

### GET `/api/users/:id/settings`
**Purpose**: Get user settings
**Auth**: Required (own profile)
**Response**: User settings object

### PUT `/api/users/:id/settings`
**Purpose**: Update user settings
**Auth**: Required (own profile)
**Body**: Settings object

### GET `/api/users/:id/dashboard`
**Purpose**: Get dashboard data for user
**Auth**: None
**Response**: Dashboard statistics and activity

---

## 📚 Modules Routes (`/api/modules`)

### GET `/api/modules`
**Purpose**: Get all modules with filtering
**Auth**: None
**Query Params**:
- `creatorId`: Filter by creator
- `subject`: Filter by subject
- `gradeLevel`: Filter by grade level
- `published`: Filter by published status
**Response**: Array of module objects

### GET `/api/modules/:id`
**Purpose**: Get specific module
**Auth**: None
**Response**: Module object with creator info

### POST `/api/modules`
**Purpose**: Create new module
**Auth**: Required (educator/admin)
**Body**:
```json
{
  "title": "Module Title",
  "description": "Module description",
  "content": "Module content",
  "subject": "Mathematics",
  "gradeLevel": "Primary",
  "difficulty": "beginner",
  "tags": ["math", "basic"],
  "creatorId": "educator-id",
  "published": false
}
```

### PUT `/api/modules/:id`
**Purpose**: Update module
**Auth**: Required (educator/admin)
**Body**: Same as POST

### DELETE `/api/modules/:id`
**Purpose**: Delete module
**Auth**: Required (educator/admin)

---

## 📊 Analytics Routes (`/api/analytics`)

### GET `/api/analytics/modules/:id`
**Purpose**: Get module analytics
**Auth**: None
**Response**:
```json
{
  "summary": {
    "total_views": 150,
    "completions": 45,
    "avg_time_spent": 1800,
    "avg_score": 85.5
  },
  "recentActivity": []
}
```

### GET `/api/analytics/users/:id/progress`
**Purpose**: Get user progress analytics
**Auth**: None
**Response**:
```json
{
  "progress": [],
  "badges": [],
  "totalBadges": 8
}
```

### POST `/api/analytics/track`
**Purpose**: Track module access/completion
**Auth**: None
**Body**:
```json
{
  "moduleId": "module-id",
  "userId": "user-id",
  "timeSpent": 300,
  "completed": true,
  "score": 85
}
```

### GET `/api/analytics/overview`
**Purpose**: Get platform overview statistics
**Auth**: None
**Response**: Platform-wide statistics

---

## 📖 Curriculum Routes (`/api/curriculum`)

### GET `/api/curriculum/badges`
**Purpose**: Get curriculum-aligned badges
**Auth**: None
**Query Params**:
- `subject`: Filter by subject
- `level`: Filter by education level
- `category`: Filter by category
**Response**: Array of curriculum badges with learning outcomes

### GET `/api/curriculum/badges/:id`
**Purpose**: Get specific curriculum badge
**Auth**: None
**Response**: Detailed curriculum badge with activities

### GET `/api/curriculum/subjects`
**Purpose**: Get all curriculum subjects
**Auth**: None
**Response**: Array of subject names

### GET `/api/curriculum/levels`
**Purpose**: Get education levels
**Auth**: None
**Response**: Array of education levels

### POST `/api/curriculum/assessment`
**Purpose**: Submit assessment for badge activity
**Auth**: None
**Body**:
```json
{
  "userId": "user-id",
  "badgeId": "badge-id",
  "activityId": "activity-id",
  "submission": "submission_data",
  "score": 85
}
```

### GET `/api/curriculum/analytics`
**Purpose**: Get curriculum analytics
**Auth**: None
**Response**: Curriculum coverage statistics

---

## 📁 Upload Routes (`/api/upload`)

### POST `/api/upload/file`
**Purpose**: Upload single file
**Auth**: Required
**Content-Type**: `multipart/form-data`
**Body**: FormData with `file` and optional `folder`
**Response**:
```json
{
  "url": "blob_url",
  "filename": "original_name.ext",
  "size": 1024,
  "type": "image/jpeg"
}
```

### POST `/api/upload/files`
**Purpose**: Upload multiple files
**Auth**: Required
**Content-Type**: `multipart/form-data`
**Body**: FormData with `files[]` and optional `folder`
**Response**: Array of file objects

### POST `/api/upload/badge`
**Purpose**: Upload GLB badge file
**Auth**: Required
**Content-Type**: `multipart/form-data`
**Body**: FormData with `badge` (GLB file only)
**Response**: Badge file object

---

## 📈 Progress Routes (`/api/progress`)

### GET `/api/progress/:userId`
**Purpose**: Get user progress
**Auth**: None
**Response**: User progress object

### POST `/api/progress/:userId`
**Purpose**: Update user progress
**Auth**: None
**Body**:
```json
{
  "badgeId": "badge-id",
  "progress": 75,
  "earned": false
}
```

### GET `/api/progress/:userId/stats`
**Purpose**: Get user statistics
**Auth**: None
**Response**:
```json
{
  "earnedBadges": 5,
  "totalBadges": 10,
  "completionRate": 50,
  "totalPoints": 1250
}
```

---

## 🔧 System Routes

### GET `/api/health`
**Purpose**: Health check endpoint
**Auth**: None
**Response**:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "2.0.0",
  "environment": "development"
}
```

---

## 🔒 Authentication Headers

For protected routes, include JWT token:
```
Authorization: Bearer <jwt_token>
```

## 🛡️ CSRF Protection

For state-changing requests, include CSRF token:
```
X-CSRF-Token: <csrf_token>
```

## 📝 Error Responses

All endpoints return errors in this format:
```json
{
  "error": "Error message description"
}
```

**HTTP Status Codes**:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🚀 Usage Examples

### Frontend API Client Integration
```javascript
import api from './lib/api';

// Get badges
const badges = await api.getBadges({ category: 'Achievement' });

// Create module (authenticated)
const module = await api.createModule({
  title: 'New Module',
  content: 'Module content...'
});

// Upload file (authenticated)
const file = await api.uploadFile(fileObject, 'modules');
```

This API mapping provides complete coverage of all available endpoints in the Lencana Malaysia LMS platform with authentication, security, and usage details.