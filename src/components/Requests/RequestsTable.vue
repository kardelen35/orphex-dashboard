<script setup>
const props = defineProps({
  requests: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['rowClick'])

const handleRowClick = (id) => {
  emit('rowClick', id)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Title</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Customer</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Priority</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Created</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Tags</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr 
            v-for="request in requests" 
            :key="request.id"
            @click="handleRowClick(request.id)"
            class="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
              {{ request.id }}
            </td>
            
            <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">
              {{ request.title }}
            </td>
            
            <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
              {{ request.customer }}
            </td>
            
            <td class="px-6 py-4">
              <span :class="[
                'inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap',
                request.status === 'New' && 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
                request.status === 'In Progress' && 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
                request.status === 'Waiting on Customer' && 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300',
                request.status === 'Done' && 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
              ]">
                {{ request.status }}
              </span>
            </td>
            
            <td class="px-6 py-4">
              <span :class="[
                'inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap',
                request.priority === 'High' && 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
                request.priority === 'Medium' && 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
                request.priority === 'Low' && 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
              ]">
                {{ request.priority }}
              </span>
            </td>
            
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              {{ new Date(request.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) }}
            </td>
            
            <td class="px-6 py-4">
              <div class="flex gap-1 flex-wrap">
                <span 
                  v-for="tag in request.tags.slice(0, 2)" 
                  :key="tag"
                  class="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium whitespace-nowrap"
                >
                  {{ tag }}
                </span>
                <span 
                  v-if="request.tags.length > 2" 
                  class="inline-block px-2 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded text-xs font-semibold"
                >
                  +{{ request.tags.length - 2 }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>