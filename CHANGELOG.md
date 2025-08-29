# Changelog

All notable changes to the Lencana Malaysia project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2024-12-19

### 🔒 Security
- **CRITICAL**: Added authentication middleware to all protected backend routes
- **CRITICAL**: Implemented CSRF protection for state-changing endpoints
- **HIGH**: Fixed prototype pollution vulnerability in progress tracking
- **HIGH**: Added input sanitization to prevent log injection attacks
- **MEDIUM**: Enhanced rate limiting and security headers with Helmet.js

### ✨ Added
- Modern error boundary component with retry functionality and better UX
- Performance monitoring hook for tracking component render times and web vitals
- Enhanced translation hook with fallback support for missing translations
- Comprehensive test setup with Vitest and React Testing Library
- Prettier configuration for consistent code formatting
- Extended internationalization support with new translation keys
- Security middleware stack (Helmet, CORS, Rate Limiting)
- Input validation and sanitization utilities
- Development performance logging and monitoring

### 🛠️ Changed
- Updated all backend routes to require proper authentication
- Enhanced CORS configuration with specific allowed headers and methods
- Improved error handling across all API endpoints
- Modernized development toolchain with latest dependencies
- Enhanced environment configuration with security and feature flags
- Updated ESLint configuration for better code quality
- Improved build process with better chunk splitting

### 📦 Dependencies
- Added `express-validator@^7.2.0` for input validation
- Added `bcryptjs@^2.4.3` for password hashing
- Added `@testing-library/react@^16.1.0` for modern React testing
- Added `vitest@^2.1.8` for fast unit testing
- Added `prettier@^3.4.2` for code formatting
- Added `i18next-browser-languagedetector@^8.0.2` for automatic language detection
- Added `react-hook-form@^7.54.2` for better form handling
- Added `zod@^3.24.1` for schema validation
- Updated all existing dependencies to latest stable versions

### 🐛 Fixed
- **Security**: Missing authorization checks on sensitive routes
- **Security**: CSRF vulnerabilities in POST/PUT/DELETE endpoints
- **Security**: Prototype pollution in user progress tracking
- **Security**: Log injection in development scripts
- **Performance**: Lazy module loading issues in backend routes
- **i18n**: Missing internationalization across JSX components
- **Build**: Improved error handling in development scripts
- **Types**: Enhanced type safety with better TypeScript configuration

### 🧪 Testing
- Added comprehensive test setup with Vitest
- Created test utilities and mocks for React components
- Added performance testing capabilities
- Implemented error boundary testing

### 📚 Documentation
- Updated README with new features and security improvements
- Added comprehensive API documentation
- Created deployment and security guides
- Enhanced code comments and JSDoc annotations

### 🚀 Performance
- Optimized bundle splitting for better loading times
- Added performance monitoring and web vitals tracking
- Improved lazy loading implementation
- Enhanced caching strategies

### 🔧 Development Experience
- Added pre-commit hooks for code quality
- Improved development server configuration
- Enhanced debugging capabilities
- Better error reporting in development mode

## [2.0.0] - 2024-01-15

### ✨ Added
- Initial release of Lencana Malaysia LMS Platform
- 3D Interactive Badges system with Malaysian national honours
- Cross-curricular learning integration across 14 subjects
- Neon PostgreSQL database integration with Prisma ORM
- Vercel Blob storage for file uploads
- Responsive design with mobile-first approach
- React 19 with Vite build system
- Three.js integration for 3D badge visualization
- Internationalization support (English/Malay)
- User authentication and authorization system
- Progress tracking and analytics
- Quiz and assessment system
- Educator dashboard for content management

### 🛠️ Technical Stack
- Frontend: React 19, Vite, Three.js, Tailwind CSS
- Backend: Node.js, Express.js, Prisma ORM
- Database: Neon PostgreSQL
- Storage: Vercel Blob
- Deployment: Vercel
- Authentication: JWT-based system

---

## Security Notice

This version addresses several critical security vulnerabilities. Please update immediately and review your environment configuration to ensure all security settings are properly configured.

For security-related questions, please contact the development team.