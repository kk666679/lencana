const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Badge endpoints
  async getBadges(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/badges?${params}`);
  }

  async getBadge(id) {
    return this.request(`/badges/${id}`);
  }

  async getCategories() {
    return this.request('/badges/meta/categories');
  }

  async getRarities() {
    return this.request('/badges/meta/rarities');
  }

  // User endpoints
  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: userData,
    });
  }

  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  // Progress endpoints
  async getUserProgress(userId) {
    return this.request(`/progress/${userId}`);
  }

  async updateProgress(userId, badgeId, progress, earned = false) {
    return this.request(`/progress/${userId}`, {
      method: 'POST',
      body: { badgeId, progress, earned },
    });
  }

  async getUserStats(userId) {
    return this.request(`/progress/${userId}/stats`);
  }
}

export const apiClient = new ApiClient();