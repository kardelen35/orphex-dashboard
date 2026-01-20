import { computed } from 'vue'
import { useRequests } from './useRequests'

const DAYS_TO_MS = 24 * 60 * 60 * 1000

export function useNeedsAttention() {
  const { requests } = useRequests()

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

  const needsAttentionRequests = computed(() => {
    return requests.value
      .filter(request => {
        if (request.status === 'Done') return false

        const daysSinceCreated = getDaysDifference(request.createdAt)
        const isHighPriority = request.priority === 'High'
        const isAging = daysSinceCreated >= 7

        if (!isHighPriority && !isAging) return false

        const lastActivity = getLastActivityDate(request)
        const daysSinceActivity = getDaysDifference(lastActivity)
        
        return daysSinceActivity >= 3
      })
      .map(request => ({
        ...request,
        reasons: getAttentionReasons(request),
        needsAttention: true
      }))
  })

  return {
    needsAttentionRequests,
    getAttentionReasons
  }
}