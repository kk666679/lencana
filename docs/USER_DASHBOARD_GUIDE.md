# User Dashboard & Settings Guide

## Overview

The Lencana platform includes a comprehensive user dashboard and settings system that provides personalized account management and preference controls.

## User Dashboard Features

### 📊 Overview Section
- **Profile Display**: User avatar, name, email, and join date
- **Quick Stats**: Modules completed, badges earned, total points, learning streak
- **Visual Metrics**: Color-coded statistics with icons for easy recognition

### 📈 Statistics Section
- **Learning Progress**: Real-time tracking of educational achievements
- **Badge Collection**: Display of recently earned badges
- **Subject Progress**: Progress bars showing completion rates by subject
- **Activity Streak**: Gamified daily learning streak counter

### ⚡ Quick Actions
- **Browse Modules**: Direct access to learning content
- **View Badges**: Navigate to badge collection
- **Settings Access**: Quick link to user preferences
- **Recent Activity**: Timeline of user interactions

### 🎯 Personalization
- **Responsive Layout**: Mobile-first design for all devices
- **Real-time Updates**: Dynamic content based on user progress
- **Customizable Widgets**: Rearrangeable dashboard sections

## User Settings Features

### 👤 Account Settings
- **Profile Management**: Update name, email, and profile picture
- **Avatar Upload**: Integrated with Vercel Blob storage
- **Account Information**: Manage basic account details

### 🔒 Privacy Settings
- **Profile Visibility**: Public, private, or friends-only options
- **Two-Factor Authentication**: Enhanced security toggle
- **Content Filters**: Manage blocked users and content

### 🔔 Notification Settings
- **Email Notifications**: Toggle email alerts on/off
- **Push Notifications**: Browser notification preferences
- **Weekly Digest**: Summary email frequency settings
- **Granular Controls**: Individual notification type management

### 🎨 Appearance Settings
- **Theme Selection**: Light and dark mode options
- **Language Preferences**: Multi-language support (EN, MS, ZH)
- **Layout Customization**: Dashboard arrangement preferences

### 🔐 Security Settings
- **Password Management**: Secure password change functionality
- **Session Management**: Active session monitoring
- **Security Alerts**: Notification of security events

### 🔗 Connected Accounts
- **Social Integration**: Google and Facebook account linking
- **Third-party Apps**: Manage external service connections
- **API Access**: Developer integration settings

## Technical Implementation

### Frontend Components
```jsx
// User Dashboard
<UserDashboard />

// Settings Page
<UserSettings />

// Notification Center
<NotificationCenter />

// Authentication Hook
const { user, login, logout, updateProfile } = useAuth();
```

### Backend API Endpoints
```
GET    /api/users/:id              - Get user profile
PUT    /api/users/:id              - Update user profile
GET    /api/users/:id/settings     - Get user settings
PUT    /api/users/:id/settings     - Update user settings
GET    /api/users/:id/dashboard    - Get dashboard data
```

### Authentication System
- **Context Provider**: React context for global auth state
- **Local Storage**: Persistent session management
- **Mock Authentication**: Development-ready auth system
- **Profile Updates**: Real-time profile synchronization

## Usage Instructions

### Accessing Dashboard
1. Navigate to `/dashboard` after login
2. View personalized statistics and progress
3. Use quick actions for common tasks
4. Monitor recent activity and notifications

### Managing Settings
1. Navigate to `/settings` from dashboard or header
2. Use tabbed interface to access different setting categories
3. Toggle switches for boolean preferences
4. Save changes with confirmation feedback

### Notification Management
1. Click bell icon in header to view notifications
2. Mark individual notifications as read
3. Use "Mark all read" for bulk actions
4. Configure notification preferences in settings

## Security Features

### Data Protection
- **Secure Storage**: Encrypted user preferences
- **Input Validation**: Form data sanitization
- **CSRF Protection**: Cross-site request forgery prevention
- **Session Security**: Secure session management

### Privacy Controls
- **Granular Permissions**: Fine-tuned privacy settings
- **Data Export**: User data portability options
- **Account Deletion**: Complete data removal capability

## Integration Points

### Badge System
- Dashboard displays earned badges
- Real-time badge notifications
- Progress tracking toward new badges

### Module System
- Learning progress visualization
- Module completion statistics
- Recommended content based on progress

### Analytics Integration
- User behavior tracking
- Performance metrics
- Engagement analytics

## Mobile Responsiveness

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Touch-friendly**: Large touch targets and gestures
- **Adaptive Layout**: Flexible grid system
- **Performance**: Optimized for mobile networks

### Progressive Web App Features
- **Offline Support**: Basic functionality without internet
- **Push Notifications**: Native mobile notifications
- **App-like Experience**: Full-screen mobile interface