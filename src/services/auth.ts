import apiFetch from './api';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

class AuthService {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    const data = res as AuthResponse;
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  }

  // Register user
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    const data = res as AuthResponse;
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  }

  // Get current user profile
  async getProfile(): Promise<User> {
    const data = await apiFetch('/me', { method: 'GET' });
    const user = data as User;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiFetch('/logout', { method: 'POST' });
    } catch (_) {
      // Ignorar errores de red/API al cerrar sesión
    }
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get current user from localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if user is admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}

export const authService = new AuthService();
