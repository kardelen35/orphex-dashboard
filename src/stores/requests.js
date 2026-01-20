import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { requestsData } from '@/data/requests'

const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc'
}

const STATUS_ALL = 'All'
const DAYS_TO_MS = 24 * 60 * 60 * 1000

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([...requestsData])
  const searchQuery = ref('')
  const statusFilter = ref(STATUS_ALL)
  const sortOrder = ref(SORT_ORDER.DESC)
  const showNeedsAttention = ref(false)
  const isLoading = ref(false)
  const error = ref(null)

  const matchesSearchQuery = (request, query) => {
    const searchTerm = query.toLowerCase()
    return (
      request.title.toLowerCase().includes(searchTerm) ||
      request.customer.toLowerCase().includes(searchTerm)
    )
  }

  const filterByStatus = (reqs, status) => {
    return status === STATUS_ALL 
      ? reqs 
      : reqs.filter(req => req.status === status)
  }

  const sortByDate = (reqs, order) => {
    return [...reqs].sort((a, b) => { // protecting original data with spread operator for mutation
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return order === SORT_ORDER.DESC ? dateB - dateA : dateA - dateB
    })
  }

  const getDaysDifference = (date) => {
    const now = new Date()
    const targetDate = new Date(date)
    return Math.floor((now - targetDate) / DAYS_TO_MS)
  }

  const getLastActivityDate = (request) => {
    const updatedAt = new Date(request.updatedAt)
    const lastCommentAt = request.lastCommentAt ? new Date(request.lastCommentAt) : null
    return lastCommentAt && lastCommentAt > updatedAt ? lastCommentAt : updatedAt
  }

  const needsAttention = (request) => {
    if (request.status === 'Done') return false

    const daysSinceCreated = getDaysDifference(request.createdAt)
    const isHighPriority = request.priority === 'High'
    const isAging = daysSinceCreated >= 7

    if (!isHighPriority && !isAging) return false

    const lastActivity = getLastActivityDate(request)
    const daysSinceActivity = getDaysDifference(lastActivity)
    
    return daysSinceActivity >= 3
  }

  const getAttentionReasons = (request) => {
    const reasons = []
    const daysSinceCreated = getDaysDifference(request.createdAt)
    const lastActivity = getLastActivityDate(request)
    const daysSinceActivity = getDaysDifference(lastActivity)

    if (request.priority === 'High') {
      reasons.push('High priority')
    }

    if (daysSinceCreated >= 7) {
      reasons.push('Aging request')
    }

    if (daysSinceActivity >= 3) {
      reasons.push('No recent activity')
    }

    return reasons
  }

  const filteredRequests = computed(() => {
    let result = requests.value

    if (showNeedsAttention.value) {
      result = result.filter(req => needsAttention(req))
    }

    if (searchQuery.value.trim()) {
      result = result.filter(req => matchesSearchQuery(req, searchQuery.value))
    }

    result = filterByStatus(result, statusFilter.value)
    result = sortByDate(result, sortOrder.value)

    return result
  })

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setStatusFilter = (status) => {
    statusFilter.value = status
  }

  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === SORT_ORDER.DESC 
      ? SORT_ORDER.ASC 
      : SORT_ORDER.DESC
  }

  const setShowNeedsAttention = (value) => {
    showNeedsAttention.value = value
  }

  const getRequestById = (id) => {
    return requests.value.find(req => req.id === id)
  }

  const updateRequest = (id, updates) => {
    const index = requests.value.findIndex(req => req.id === id)
    
    if (index === -1) return

    requests.value[index] = {
      ...requests.value[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
  }

  const resetData = () => {
    isLoading.value = true
    error.value = null

    setTimeout(() => {
      requests.value = [...requestsData]
      isLoading.value = false
    }, 1000)
  }

  return {
    requests,
    filteredRequests,
    searchQuery,
    statusFilter,
    sortOrder,
    showNeedsAttention,
    isLoading,
    error,

    setSearchQuery,
    setStatusFilter,
    toggleSortOrder,
    setShowNeedsAttention,
    getRequestById,
    updateRequest,
    resetData,
    getAttentionReasons
  }
}, {
  persist: {
    key: 'orphex-requests',
    paths: ['requests']
  }
})