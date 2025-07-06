// NOTE: Make sure you have created these types in 'src/types/index.ts'
import type { LoginCredentials, RegisterInfo } from '@/types';

// IMPORTANT: We use "export const" to make these functions available for import elsewhere.

/**
 * Makes a MOCK API call to log in a user.
 * @param credentials The user's email and password.
 */
export const login = (credentials: LoginCredentials) => {
  return new Promise((resolve, reject) => {
    console.log("Mock API: Attempting login with", credentials);
    setTimeout(() => {
      if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
        resolve({
          data: {
            user: { id: 1, name: 'John Doe', email: 'user@example.com', role: 'user' },
            token: 'mock-user-jwt-token'
          }
        });
      } else if (credentials.email === 'agency@example.com' && credentials.password === 'password123') {
        resolve({
          data: {
            user: { id: 101, name: 'City Works Dept', email: 'agency@example.com', role: 'agency' },
            token: 'mock-agency-jwt-token'
          }
        });
      } else {
        reject({ response: { data: { message: 'Invalid credentials. Please try again.' } } });
      }
    }, 500); // Simulate a network delay
  });
};

/**
 * Makes a MOCK API call to register a new user.
 * @param userInfo The new user's information.
 */
export const register = (userInfo: RegisterInfo) => {
   return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock API: Registering user with:', userInfo);
      resolve({ data: { message: 'Registration successful' } });
    }, 500);
  });
};
