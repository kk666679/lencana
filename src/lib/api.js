const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Badges API
  async getBadges(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/badges?${params}`);
  }

  async getBadge(id) {
    return this.request(`/badges/${id}`);
  }

  async createBadge(badgeData) {
    return this.request('/badges', {
      method: 'POST',
      body: JSON.stringify(badgeData),
    });
  }

  async awardBadge(badgeId, userId) {
    return this.request(`/badges/${badgeId}/award`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async getUserBadges(userId) {
    return this.request(`/badges/user/${userId}`);
  }

  // Modules API
  async getModules(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/modules?${params}`);
  }

  async getModule(id) {
    return this.request(`/modules/${id}`);
  }

  async createModule(moduleData) {
    return this.request('/modules', {
      method: 'POST',
      body: JSON.stringify(moduleData),
    });
  }

  async updateModule(id, moduleData) {
    return this.request(`/modules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(moduleData),
    });
  }

  async deleteModule(id) {
    return this.request(`/modules/${id}`, {
      method: 'DELETE',
    });
  }

  // Upload API
  async uploadFile(file, folder = 'uploads') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return this.request('/upload/file', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  async uploadFiles(files, folder = 'uploads') {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('folder', folder);

    return this.request('/upload/files', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  async uploadBadge(file) {
    const formData = new FormData();
    formData.append('badge', file);

    return this.request('/upload/badge', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  // Analytics API
  async getModuleAnalytics(moduleId) {
    return this.request(`/analytics/modules/${moduleId}`);
  }

  async getUserProgress(userId) {
    return this.request(`/analytics/users/${userId}/progress`);
  }

  async trackModuleAccess(data) {
    return this.request('/analytics/track', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPlatformOverview() {
    return this.request('/analytics/overview');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const api = new ApiClient();
export default api;