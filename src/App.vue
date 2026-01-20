<script setup>
import DarkModeToggle from './components/Theme/DarkModeToggle.vue'
import VisualSummary from './components/VisualSummary/index.vue'
import RequestsList from './components/Requests/RequestLists.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div class="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            Support Queue Dashboard
          </h1>
        </div>
        
        <DarkModeToggle />
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-8 py-8">
            <VisualSummary />

      <RequestsList />
    </main>
  </div>
</template>