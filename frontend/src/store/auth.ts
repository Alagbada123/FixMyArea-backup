import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// Import our custom types for type safety
import type { User, LoginCredentials, RegisterInfo } from '@/types';

// Import our API service functions. These will be mocked for now.
import { login as apiLogin, register as apiRegister } from '@/services/auth.service';

/**
 * Pinia store for handling all authentication logic.
 */
export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  // --- STATE ---
  // The authenticated user object. Initialized from localStorage to persist session.
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  // The authentication token (e.g., JWT). Initialized from localStorage.
  const token = ref<string | null>(localStorage.getItem('token'));


  // --- GETTERS ---
  // Computed property to easily check if the user is authenticated.
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  // Computed property to safely get the user's role.
  const userRole = computed(() => user.value?.role);


  // --- ACTIONS ---
  /**
   * Logs in the user by calling the API, and on success, updates state and localStorage.
   * @param {LoginCredentials} credentials - The user's email and password.
   */
  async function login(credentials: LoginCredentials) {
    try {
      const response = await apiLogin(credentials);
      // NOTE: Your API should return a user object and a token
      const { user: userData, token: authToken } = response.data;
      
      // Update state
      user.value = userData;
      token.value = authToken;
      
      // Persist state in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', authToken);

      // Redirect to the appropriate dashboard based on user role
      if (userData.role === 'agency') {
        router.push({ name: 'agency-dashboard' });
      } else {
        router.push({ name: 'user-dashboard' });
      }
    } catch (error) {
      console.error("Login failed in auth.store:", error);
      // Re-throw the error so the calling component (e.g., LoginView) can catch it
      // and display an error message to the user.
      throw error;
    }
  }

  /**
   * Registers a new user by calling the API, and on success, redirects to the login page.
   * @param {RegisterInfo} userInfo - The new user's information.
   */
  async function register(userInfo: RegisterInfo) {
     try {
      await apiRegister(userInfo);
      // After successful registration, prompt the user to log in.
      alert('Registration successful! Please log in.');
      router.push({ name: 'login' });
    } catch (error) {
      console.error("Registration failed in auth.store:", error);
      throw error;
    }
  }

  /**
   * Logs out the user by clearing state and localStorage, then redirects to the login page.
   */
  function logout() {
    // Clear state
    user.value = null;
    token.value = null;
    
    // Clear persisted data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Redirect to login page
    router.push({ name: 'login' });
  }

  // Expose state, getters, and actions to the rest of the application
  return {
    user,
    token,
    isAuthenticated,
    userRole,
    login,
    register,
    logout,
  };
});
