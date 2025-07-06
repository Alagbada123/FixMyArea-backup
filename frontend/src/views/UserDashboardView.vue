<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header Section with Title and Action Button -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
      <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
        My Reported Issues
      </h1>
      <router-link
        :to="{ name: 'submit-issue' }"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        Report a New Issue
      </router-link>
    </div>
    
    <!-- Loading State -->
    <div v-if="issueStore.isLoading" class="text-center py-12 text-gray-500">
      <p>Loading your issues...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="issueStore.userIssues.length === 0" class="text-center bg-white p-12 rounded-lg shadow-md">
      <h3 class="text-xl font-medium text-gray-700">You haven't reported any issues yet.</h3>
      <p class="text-gray-500 mt-2">When you see something that needs fixing, click the button above to get started!</p>
    </div>

    <!-- Issues Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <IssueForm 
        v-for="issue in issueStore.userIssues" 
        :key="issue.id" 
        :issue="issue" 
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useIssueStore } from '@/store/issues';
import { useAuthStore } from '@/store/auth';
import IssueForm from '@/components/dashboard/IssueForm.vue';

export default defineComponent({
  name: 'UserDashboardView',
  components: {
    IssueForm,
  },
  setup() {
    const issueStore = useIssueStore();
    const authStore = useAuthStore();

    // When the component is first mounted to the page, fetch the issues
    // specific to the currently logged-in user.
    onMounted(() => {
      if (authStore.user) {
        issueStore.fetchUserIssues(authStore.user.id);
      }
    });

    // Expose the store to the template so we can access its state (isLoading, userIssues)
    return {
      issueStore,
    };
  },
});
</script>

<style scoped>
/* No specific styles needed here as Tailwind handles it all. */
</style>
