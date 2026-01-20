export function useCsvExport() {
  const exportToCsv = (data, filename = 'support-requests.csv') => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    const headers = ['ID', 'Title', 'Customer', 'Status', 'Priority', 'Created', 'Updated', 'Tags']
    
    const rows = data.map(request => [
      request.id,
      `"${request.title}"`,  
      `"${request.customer}"`,
      request.status,
      request.priority,
      new Date(request.createdAt).toLocaleDateString('en-US'),
      new Date(request.updatedAt).toLocaleDateString('en-US'),
      `"${request.tags.join(', ')}"` 
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    exportToCsv
  }
}