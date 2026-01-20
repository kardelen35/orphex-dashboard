<script setup>
import { ref, computed, watch } from 'vue' 
import { useRequestsStore } from '@/stores/requests'  

const store = useRequestsStore()

const props = defineProps({
  requestId: {
    type: String,
  }
})

const emit = defineEmits(['close'])


const request = computed(() => {
  return props.requestId ? store.getRequestById(props.requestId) : null
})

const selectedStatus = ref('')
const selectedPriority = ref('')
const commentText = ref('')

watch(request, (newRequest) => {
  if (newRequest) {
    selectedStatus.value = newRequest.status
    selectedPriority.value = newRequest.priority
  }
}, { immediate: true })

const statuses = ['New', 'In Progress', 'Waiting on Customer', 'Done']
const priorities = ['Low', 'Medium', 'High']

const handleClose = () => {
  emit('close')
}

const handleSave = () => {
  if (!request.value) return

  const updates = {}
  
  if (selectedStatus.value !== request.value.status) {
    updates.status = selectedStatus.value
  }
  
  if (selectedPriority.value !== request.value.priority) {
    updates.priority = selectedPriority.value
  }

  if (Object.keys(updates).length > 0) {
    store.updateRequest(request.value.id, updates)
  }

  handleClose()
}

const handleAddComment = () => {
  if (!commentText.value.trim()) return

  console.log('Comment added:', commentText.value)
  
  commentText.value = ''
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div 
    v-if="request"
    @click="handleClose"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div 
      @click.stop
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Request Details
        </h2>
        <button 
          @click="handleClose"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6 space-y-6">
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Request ID</label>
            <p class="text-base text-gray-900 dark:text-white font-mono">{{ request.id }}</p>
          </div>
          
          <div>
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Title</label>
            <p class="text-base text-gray-900 dark:text-white">{{ request.title }}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Customer</label>
            <p class="text-base text-gray-900 dark:text-white">{{ request.customer }}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Created</label>
            <p class="text-base text-gray-900 dark:text-white">{{ formatDate(request.createdAt) }}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Tags</label>
            <div class="flex gap-2 flex-wrap mt-1">
              <span 
                v-for="tag in request.tags" 
                :key="tag"
                class="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700"></div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            v-model="selectedStatus"
            class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priority
          </label>
          <select
            v-model="selectedPriority"
            class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option v-for="priority in priorities" :key="priority" :value="priority">
              {{ priority }}
            </option>
          </select>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700"></div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Internal Comment
          </label>
          <textarea
            v-model="commentText"
            rows="4"
            placeholder="Add an internal note..."
            class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          ></textarea>
          <button
            @click="handleAddComment"
            :disabled="!commentText.trim()"
            class="mt-2 px-4 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Add Comment
          </button>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <button 
          @click="handleClose"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          @click="handleSave"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>