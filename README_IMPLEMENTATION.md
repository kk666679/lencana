# Clean Architecture Implementation Guide

## Overview
This implementation provides a clean, scalable architecture that properly connects the frontend and backend for the Lencana Malaysia project.

## Architecture

### Backend (Express.js)
- **Location**: `/backend/`
- **Port**: 3001
- **API Base**: `http://localhost:3001/api`

#### API Endpoints
- `GET /api/badges` - Get all badges with optional filtering
- `GET /api/badges/:id` - Get specific badge
- `GET /api/badges/meta/categories` - Get all categories
- `GET /api/badges/meta/rarities` - Get all rarities
- `POST /api/users` - Create/update user
- `GET /api/users/:id` - Get user by ID
- `GET /api/progress/:userId` - Get user progress
- `POST /api/progress/:userId` - Update user progress
- `GET /api/progress/:userId/stats` - Get user statistics

### Frontend (Vite + React)
- **Location**: `/src/`
- **Port**: 5173
- **API Client**: `/lib/api.js`

#### Key Components
- `BadgeExplorer` - Main application component
- `useBadges` - Hook for badge data management
- `useProgress` - Hook for user progress management

## Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run backend:install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables as needed
```

### 3. Start Development Servers

```bash
# Start both frontend and backend
npm run dev:full

# Or start individually
npm run dev              # Frontend only
npm run backend:dev      # Backend only
```

## Key Features

### Clean API Integration
- Centralized API client with error handling
- React hooks for data management
- Automatic user session management

### Scalable Architecture
- Separation of concerns
- Modular component structure
- Environment-based configuration

### Development Experience
- Hot reload for both frontend and backend
- Unified development script
- Clear error handling and logging

## File Structure

```
/workspaces/lencana/
├── backend/                 # Express.js API server
│   ├── routes/             # API route handlers
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── data/              # Static data files
│   └── main.jsx           # Entry point
├── lib/                    # Shared utilities
│   └── api.js             # API client
├── hooks/                  # React hooks
│   ├── useBadges.js       # Badge data management
│   └── useProgress.js     # Progress management
├── components/             # Main components
│   └── BadgeExplorer.jsx  # Primary app component
└── scripts/                # Development tools
    └── dev.js             # Development server script
```

## Next Steps

1. **Database Integration**: Replace mock data with actual database
2. **Authentication**: Add user authentication system
3. **Real-time Updates**: Implement WebSocket for live progress updates
4. **Internationalization**: Add i18n support for multiple languages
5. **Testing**: Add unit and integration tests
6. **Deployment**: Configure production deployment

## Benefits

- **Clean Separation**: Clear boundaries between frontend and backend
- **Type Safety**: Structured API responses and error handling
- **Scalability**: Easy to add new features and endpoints
- **Maintainability**: Organized code structure with clear responsibilities
- **Developer Experience**: Unified development workflow