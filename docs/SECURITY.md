# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.1.x   | :white_check_mark: |
| 2.0.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Security Updates in v2.1.0

### Critical Fixes Applied

1. **Authentication & Authorization**
   - Added mandatory authentication to all protected routes
   - Implemented role-based access control (RBAC)
   - Enhanced JWT token validation and expiration handling

2. **CSRF Protection**
   - Implemented CSRF tokens for all state-changing operations
   - Added secure cookie configuration
   - Enhanced request validation middleware

3. **Input Validation & Sanitization**
   - Added comprehensive input validation using express-validator
   - Implemented prototype pollution protection
   - Enhanced log injection prevention

4. **Security Headers & Middleware**
   - Configured Helmet.js for security headers
   - Implemented rate limiting to prevent abuse
   - Enhanced CORS configuration with strict origin policies

## Security Best Practices

### Environment Configuration

```bash
# Use strong, unique secrets (minimum 32 characters)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
CSRF_SECRET="your-csrf-secret-key-min-32-chars"
SESSION_SECRET="your-session-secret-key-min-32-chars"

# Configure secure CORS
CORS_ORIGIN="https://yourdomain.com"

# Set appropriate rate limits
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # requests per window
```

### Database Security

1. **Connection Security**
   - Always use SSL/TLS for database connections
   - Use connection pooling with appropriate limits
   - Implement database user with minimal required permissions

2. **Data Protection**
   - Encrypt sensitive data at rest
   - Use parameterized queries (Prisma handles this)
   - Implement proper backup encryption

### API Security

1. **Authentication**
   ```javascript
   // All protected routes require authentication
   router.get('/protected', authenticateUser, (req, res) => {
     // Route handler
   });
   ```

2. **Authorization**
   ```javascript
   // Role-based access control
   router.post('/admin', authenticateUser, authorizeRole(['admin']), (req, res) => {
     // Admin-only route
   });
   ```

3. **Input Validation**
   ```javascript
   // Validate all inputs
   const { body, validationResult } = require('express-validator');
   
   router.post('/data', [
     body('email').isEmail().normalizeEmail(),
     body('name').trim().escape(),
   ], (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     // Process validated data
   });
   ```

### Frontend Security

1. **Content Security Policy**
   - Implemented via Helmet.js
   - Restricts resource loading to trusted sources
   - Prevents XSS attacks

2. **Secure Storage**
   ```javascript
   // Use secure storage for sensitive data
   const secureStorage = {
     setItem: (key, value) => {
       localStorage.setItem(key, btoa(value)); // Basic encoding
     },
     getItem: (key) => {
       const value = localStorage.getItem(key);
       return value ? atob(value) : null;
     }
   };
   ```

## Reporting Security Vulnerabilities

### How to Report

If you discover a security vulnerability, please follow these steps:

1. **DO NOT** create a public GitHub issue
2. Email security concerns to: [security@lencana-malaysia.com]
3. Include detailed information about the vulnerability
4. Provide steps to reproduce if possible

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact assessment
- Suggested fix (if known)
- Your contact information

### Response Timeline

- **Initial Response**: Within 24 hours
- **Vulnerability Assessment**: Within 72 hours
- **Fix Development**: Within 1-2 weeks (depending on severity)
- **Public Disclosure**: After fix is deployed and tested

## Security Checklist for Deployment

### Pre-Deployment

- [ ] All environment variables are properly configured
- [ ] Database connections use SSL/TLS
- [ ] JWT secrets are strong and unique
- [ ] CORS origins are properly restricted
- [ ] Rate limiting is configured appropriately
- [ ] Security headers are enabled
- [ ] Input validation is implemented on all endpoints
- [ ] Authentication is required on protected routes
- [ ] CSRF protection is enabled for state-changing operations

### Post-Deployment

- [ ] Security headers are properly set (check with security scanners)
- [ ] Rate limiting is working correctly
- [ ] Authentication flows are functioning
- [ ] CSRF tokens are being generated and validated
- [ ] Logs are being monitored for security events
- [ ] Database access is properly restricted
- [ ] File upload restrictions are enforced

## Security Monitoring

### Recommended Tools

1. **OWASP ZAP** - Web application security scanner
2. **Snyk** - Dependency vulnerability scanning
3. **ESLint Security Plugin** - Static code analysis
4. **Helmet.js** - Security headers middleware
5. **Express Rate Limit** - Rate limiting middleware

### Log Monitoring

Monitor these security-related events:

- Failed authentication attempts
- Rate limit violations
- CSRF token validation failures
- Unusual API access patterns
- Database connection errors
- File upload attempts

## Compliance

This application implements security measures aligned with:

- **OWASP Top 10** security risks mitigation
- **NIST Cybersecurity Framework** guidelines
- **ISO 27001** security management principles
- **Malaysian Personal Data Protection Act (PDPA)** requirements

## Contact

For security-related questions or concerns:
- Email: security@lencana-malaysia.com
- Security Team: Lencana Malaysia Development Team

---

**Last Updated**: December 19, 2024
**Version**: 2.1.0