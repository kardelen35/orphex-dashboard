<script setup>
import { ref } from 'vue'
import SearchFilterBar from '../Search/index.vue'
import RequestsTable from './RequestsTable.vue'
import RequestDetailsModal from './RequestDetailModal.vue'
import { useRequestsStore } from '@/stores/requests'  

const store = useRequestsStore()


const selectedRequestId = ref(null)

const openDetails = (id) => {
  selectedRequestId.value = id
}

const closeModal = () => {
  selectedRequestId.value = null
}
</script>

<template>
  <div class="w-full">
    <SearchFilterBar />

    <div 
      v-if="store.isLoading" 
      class="flex flex-col items-center justify-center py-16 px-5 text-gray-600 dark:text-gray-400"
    >
      <div class="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p>Loading requests...</p>
    </div>

    <div 
      v-else-if="store.error" 
      class="flex flex-col items-center justify-center py-16 px-5 text-center"
    >
      <p class="text-red-500 dark:text-red-400 mb-4 text-base">{{ store.error }}</p>
      <button 
        @click="store.resetData"
        class="px-6 py-2.5 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
      >
        Retry
      </button>
    </div>

    <!-- Empty State -->
    <div 
      v-else-if="store.filteredRequests.length === 0" 
      class="flex flex-col items-center justify-center py-16 px-5 text-center text-gray-600 dark:text-gray-400"
    >
      <svg class="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path 
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
      <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No requests found</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
    </div>

    <!-- Requests Table -->
    <RequestsTable
      v-else
      :requests="store.filteredRequests"
      @rowClick="openDetails"
    />

    <!-- Modal -->
    <RequestDetailsModal
      :requestId="selectedRequestId"
      @close="closeModal"
    />
  </div>
</template>