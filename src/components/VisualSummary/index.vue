<script setup>
import { computed } from 'vue'
import { Chart } from 'highcharts-vue'
import { useRequestsStore } from '@/stores/requests'  

const store = useRequestsStore()

const statusData = computed(() => {
  const counts = {
    'New': 0,
    'In Progress': 0,
    'Waiting on Customer': 0,
    'Done': 0
  }

  store.filteredRequests.forEach(req => {  
    counts[req.status]++
  })

  return [
    { name: 'New', count: counts['New'], color: '#5B8DEE' },
    { name: 'In Progress', count: counts['In Progress'], color: '#F97316' },
    { name: 'Waiting on Customer', count: counts['Waiting on Customer'], color: '#FBBF24' },
    { name: 'Done', count: counts['Done'], color: '#22C55E' }
  ]
})

const totalRequests = computed(() => store.filteredRequests.length)  

const chartData = computed(() => {
  return statusData.value.map(item => ({
    name: item.name,
    y: item.count,
    color: item.color
  }))
})

const chartOptions = computed(() => ({
  chart: {
    type: 'pie',
    backgroundColor: 'transparent',
    height: 280,
    spacing: [0, 0, 0, 0]
  },
   title: {
    text: `<span style="font-size: 36px; font-weight: 700; color: var(--text-primary)">${totalRequests.value}</span><br/><span style="font-size: 14px; color: var(--text-secondary)">Total Requests</span>`,
    align: 'center',
    verticalAlign: 'middle',
    useHTML: true,
    y: 10
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    pie: {
      innerSize: '75%',
      dataLabels: {
        enabled: false
      },
      borderWidth: 0,
      states: {
        hover: {
          brightness: 0.05
        }
      }
    }
  },
  series: [{
    name: 'Requests',
    data: chartData.value
  }],
  tooltip: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
    style: {
      color: '#f9fafb'
    },
    pointFormat: '<b>{point.y}</b> requests'
  }
}))
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 mb-6">
    <div class="flex flex-col lg:flex-row items-center gap-8">
      <div class="flex items-center justify-center flex-shrink-0">
        <Chart :options="chartOptions" style="width: 280px; height: 280px;" />
      </div>

      <div class="flex-1 w-full">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="item in statusData" 
            :key="item.name"
            class="flex flex-col gap-1"
          >
            <div class="flex items-center gap-2">
              <div 
                class="w-3 h-3 rounded-full flex-shrink-0" 
                :style="{ backgroundColor: item.color }"
              ></div>
              <span class="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {{ item.name }}
              </span>
            </div>
            
            <span class="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
              {{ item.count }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --text-primary: #111827;
  --text-secondary: #6b7280;
}

.dark {
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
}
</style>
