import { getCurrentUser, loginUser, registerUser } from '../services/api.js';

class AuthStore {
  constructor() {
    this.user = null;
    this.loading = false;
    this.error = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return this.user;
    this.loading = true;
    this.error = null;

    try {
      const token = localStorage.getItem('chaty-token');
      if (!token) {
        this.user = null;
        this.initialized = true;
        return null;
      }

      const data = await getCurrentUser();
      this.user = data.user;
      this.initialized = true;
      return this.user;
    } catch (error) {
      localStorage.removeItem('chaty-token');
      this.error = error.message;
      this.user = null;
      this.initialized = true;
      return null;
    } finally {
      this.loading = false;
    }
  }

  async login(payload) {
    this.loading = true;
    this.error = null;

    try {
      const data = await loginUser(payload);
      localStorage.setItem('chaty-token', data.token);
      this.user = data.user;
      return data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async register(payload) {
    this.loading = true;
    this.error = null;

    try {
      const data = await registerUser(payload);
      localStorage.setItem('chaty-token', data.token);
      this.user = data.user;
      return data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  logout() {
    localStorage.removeItem('chaty-token');
    this.user = null;
    this.error = null;
  }
}

export const authStore = new AuthStore();
