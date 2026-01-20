<script setup>
import { useRequestsStore } from '@/stores/requests'
import { useCsvExport } from '@/composable/useCsvExport' 

const store = useRequestsStore() 
const { exportToCsv } = useCsvExport()  

const statuses = ['All', 'New', 'In Progress', 'Waiting on Customer', 'Done']

const handleExport = () => {  
  const timestamp = new Date().toISOString().split('T')[0]  
  exportToCsv(store.filteredRequests, `support-requests-${timestamp}.csv`) 
}
</script>

<template>
  <div class="mb-6">
    <div class="flex flex-wrap items-center gap-4 mb-4">
      <div class="relative flex-1 min-w-[300px]">
        <svg 
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          :value="store.searchQuery"
          @input="store.setSearchQuery($event.target.value)"
          placeholder="Search by title or customer"
          class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>

      <select
        :value="store.statusFilter"
        @change="store.setStatusFilter($event.target.value)"
        class="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px] transition-colors"
      >
        <option v-for="status in statuses" :key="status" :value="status">
          {{ status }}
        </option>
      </select>

     <label class="flex items-center gap-2 cursor-pointer px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
  <input
    type="checkbox"
    :checked="store.showNeedsAttention"
    @change="store.setShowNeedsAttention($event.target.checked)"
    class="sr-only peer"
  />
  <!-- Toggle Background -->
  <div 
    :class="[
      'relative w-11 h-6 rounded-full transition-colors',
      store.showNeedsAttention 
        ? 'bg-blue-500' 
        : 'bg-gray-200 dark:bg-gray-700'
    ]"
  >
    <!-- Toggle Circle -->
    <div 
      :class="[
        'absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200',
        store.showNeedsAttention 
          ? 'left-[22px]'  
          : 'left-0.5'
      ]"
    ></div>
  </div>
  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
    Needs Attention
  </span>
</label>

      <button
        @click="handleExport"
        class="flex items-center gap-2 px-4 py-2.5 bg-green-500 dark:bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Export CSV
      </button>

      <button
        @click="store.toggleSortOrder"
        class="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            :d="store.sortOrder === 'desc' 
              ? 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' 
              : 'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'"
          />
        </svg>
        {{ store.sortOrder === 'desc' ? 'Newest First' : 'Oldest First' }}
      </button>
    </div>

    <div class="text-sm text-gray-600 dark:text-gray-400">
      <span class="font-semibold text-gray-900 dark:text-gray-100">
        {{ store.filteredRequests.length }}
      </span>
      {{ store.filteredRequests.length === 1 ? 'request' : 'requests' }} found
      <span v-if="store.showNeedsAttention" class="text-orange-600 dark:text-orange-400 font-medium">
        (showing needs attention only)
      </span>
    </div>
  </div>
</template>