<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link :to="{ name: 'register' }" class="font-medium text-indigo-600 hover:text-indigo-500">
            register for a new account
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <!-- API Error Message Display -->
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="form.email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="form-input rounded-t-md"
              placeholder="Email address"
            />
            <p v-if="v$.email.$error" class="text-red-500 text-xs mt-1 px-1">{{ v$.email.$errors[0].$message }}</p>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="form.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="form-input rounded-b-md"
              placeholder="Password"
            />
             <p v-if="v$.password.$error" class="text-red-500 text-xs mt-1 px-1">{{ v$.password.$errors[0].$message }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </div>
      </form>
       <div class="text-center text-sm text-gray-500 border-t pt-4">
        <p class="font-semibold">Demo Credentials:</p>
        <p>User: `user@example.com` / `password123`</p>
        <p>Agency: `agency@example.com` / `password123`</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

// For type safety with our form
interface LoginFormState {
  email: string;
  password: string;
}

export default defineComponent({
  name: 'LoginView',
  setup() {
    // Reactive form object to hold user input
    const form = reactive<LoginFormState>({
      email: '',
      password: '',
    });

    // Validation rules for the form
    const rules = {
      email: { required, email },
      password: { required },
    };

    // Vuelidate instance
    const v$ = useVuelidate(rules, form);

    const authStore = useAuthStore();
    const isLoading = ref(false);
    const errorMessage = ref('');

    /**
     * Handles the form submission process.
     */
    const handleLogin = async () => {
      errorMessage.value = ''; // Clear previous errors
      const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) return; // Stop if form is invalid

      isLoading.value = true;
      try {
        await authStore.login(form);
        // On success, the authStore will handle redirection to the correct dashboard
      } catch (error: any) {
        // Display the error message from the API (or a generic one)
        errorMessage.value = error.response?.data?.message || 'An unexpected error occurred.';
      } finally {
        isLoading.value = false; // Ensure loading state is always reset
      }
    };

    // Expose all necessary data and methods to the template
    return {
      form,
      v$,
      isLoading,
      errorMessage,
      handleLogin,
    };
  },
});
</script>

<style scoped>
/* Scoped styles allow us to create reusable utility-like classes for this component */
.form-input {
  @apply appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm;
}
</style>
