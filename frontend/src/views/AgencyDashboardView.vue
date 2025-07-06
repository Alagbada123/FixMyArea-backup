<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header Section -->
    <div class="mb-8 pb-4 border-b border-gray-200">
      <h1 class="text-3xl font-bold text-gray-800">
        <!-- Safely display the agency's name -->
        Issues for {{ authStore.user?.name }}
      </h1>
      <p class="text-gray-600 mt-2">Here are the issues currently assigned to your department that need attention.</p>
    </div>
    
    <!-- Loading State -->
    <div v-if="issueStore.isLoading" class="text-center py-12 text-gray-500">
      <p>Loading assigned issues...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="issueStore.allIssues.length === 0" class="text-center bg-white p-12 rounded-lg shadow-md">
      <h3 class="text-xl font-medium text-gray-700">No pending issues. Great job!</h3>
      <p class="text-gray-500 mt-2">The issue queue for your department is clear.</p>
    </div>

    <!-- Issues Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- In a real app, you might have extra agency-specific actions on the card -->
      <IssueForm 
        v-for="issue in issueStore.allIssues" 
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
  name: 'AgencyDashboardView',
  components: {
    IssueForm,
  },
  setup() {
    const issueStore = useIssueStore();
    const authStore = useAuthStore();

    // When the component mounts, fetch all issues that are assigned
    // to this specific agency.
    onMounted(() => {
      if (authStore.user) {
        issueStore.fetchAgencyIssues(authStore.user.id);
      }
    });

    // Expose both stores to the template. `issueStore` for the data,
    // and `authStore` to display the agency's name.
    return {
      issueStore,
      authStore,
    };
  },
});
</script>

<style scoped>
/* No specific styles needed. */
</style>
