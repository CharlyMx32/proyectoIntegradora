<template>
  <v-container fluid>
    <v-row>
      <!-- Sección de Ganancias Mensuales: Costo de Chequeo en Línea -->
      <v-col cols="12" md="4">
        <v-card class="elevation-2 custom-card small-card">
          <v-card-title class="text-h6 deep-purple--text">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Chequeo en Línea
          </v-card-title>
          <v-card-text>
            <div v-if="isLoading" class="loading-overlay">
              <v-progress-circular indeterminate color="primary" />
            </div>
            <div v-else class="chart small-chart">
              <line-chart :data="checkupOnlineData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sección de Ganancias Mensuales: Costo de Reparación en Línea -->
      <v-col cols="12" md="4">
        <v-card class="elevation-2 custom-card small-card">
          <v-card-title class="text-h6 deep-purple--text">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Reparación en Línea
          </v-card-title>
          <v-card-text>
            <div v-if="isLoading" class="loading-overlay">
              <v-progress-circular indeterminate color="primary" />
            </div>
            <div v-else class="chart small-chart">
              <line-chart :data="repairOnlineData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sección de Ganancias Mensuales: Costo Total en Línea -->
      <v-col cols="12" md="4">
        <v-card class="elevation-2 custom-card small-card">
          <v-card-title class="text-h6 deep-purple--text">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Total en Línea
          </v-card-title>
          <v-card-text>
            <div v-if="isLoading" class="loading-overlay">
              <v-progress-circular indeterminate color="primary" />
            </div>
            <div v-else class="chart small-chart">
              <line-chart :data="totalOnlineData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sección de Ganancias Mensuales: Costo de Chequeo Físico -->
      <v-col cols="12" md="4">
        <v-card class="elevation-2 custom-card small-card">
          <v-card-title class="text-h6 deep-purple--text">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Chequeo Físico
          </v-card-title>
          <v-card-text>
            <div v-if="isLoading" class="loading-overlay">
              <v-progress-circular indeterminate color="primary" />
            </div>
            <div v-else class="chart small-chart">
              <line-chart :data="checkupPhysicalData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sección de Ganancias Mensuales: Costo de Reparación Físico -->
      <v-col cols="12" md="4">
        <v-card class="elevation-2 custom-card small-card">
          <v-card-title class="text-h6 deep-purple--text">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Reparación Físico
          </v-card-title>
          <v-card-text>
            <div v-if="isLoading" class="loading-overlay">
              <v-progress-circular indeterminate color="primary" />
            </div>
            <div v-else class="chart small-chart">
              <line-chart :data="repairPhysicalData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sección de Ganancias Mensuales: Costo Total Físico -->
      <v-col cols="12" md="4">
        <v-card class="elevation-2 custom-card small-card">
          <v-card-title class="text-h6 deep-purple--text">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Total Físico
          </v-card-title>
          <v-card-text>
            <div v-if="isLoading" class="loading-overlay">
              <v-progress-circular indeterminate color="primary" />
            </div>
            <div v-else class="chart small-chart">
              <line-chart :data="totalPhysicalData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import apiClient from '@/axiosconf'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

// State variables
const checkupOnlineData = ref(initChartData('Costo de Chequeo en Línea'))
const repairOnlineData = ref(initChartData('Costo de Reparación en Línea'))
const totalOnlineData = ref(initChartData('Costo Total en Línea'))
const checkupPhysicalData = ref(initChartData('Costo de Chequeo Físico'))
const repairPhysicalData = ref(initChartData('Costo de Reparación Físico'))
const totalPhysicalData = ref(initChartData('Costo Total Físico'))
const chartOptions = ref(initChartOptions())
const isLoading = ref(true)

// Helper functions
function initChartData(label) {
  return {
    labels: [],
    datasets: [
      {
        label: label,
        backgroundColor: 'rgba(103, 58, 183, 0.2)',
        borderColor: '#673AB7',
        pointBackgroundColor: '#512DA8',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#512DA8',
        data: [],
        fill: true,
        tension: 0.4
      }
    ]
  }
}

function initChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#673AB7'
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Monto: $${tooltipItem.formattedValue}`
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#673AB7'
        }
      },
      y: {
        ticks: {
          color: '#673AB7',
          callback: (value) => `$${value}`
        }
      }
    }
  }
}

function fetchData(endpoint, type, category) {
  apiClient
    .get(endpoint)
    .then((response) => {
      if (response.data && response.data.status === 200) {
        console.log(`Datos ${category} ${type}:`, response.data)
        processData(response.data, type, category)
      } else {
        console.error(`Error en la respuesta de ${category} ${type}:`, response.data)
      }
    })
    .catch((error) => {
      console.error(`Error al obtener datos ${category} ${type}:`, error)
    })
}

function fetchOnlineData() {
  fetchData('/ChequeoLinea', 'online', 'checkup')
  fetchData('/ChequeoReparacionLinea', 'online', 'repair')
  fetchData('/ChequeoTotalLinea', 'online', 'total')
}

function fetchPhysicalData() {
  fetchData('/ChequeoFisico', 'physical', 'checkup')
  fetchData('/ChequeoReparacionFisico', 'physical', 'repair')
  fetchData('/ChequeoTotalFisico', 'physical', 'total')
}

function processData(data, type, category) {
  if (!Array.isArray(data)) {
    console.error('Data no es un array:', data)
    return
  }

  const labels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  const costs = Array(12).fill(0)

  data.forEach((entry) => {
    const month = new Date(entry.date).getMonth()
    costs[month] += entry.amount
  })

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: type === 'online' ? `Costo de ${category} en Línea` : `Costo de ${category} Físico`,
        backgroundColor: 'rgba(103, 58, 183, 0.2)',
        borderColor: '#673AB7',
        pointBackgroundColor: '#512DA8',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#512DA8',
        data: costs,
        fill: true,
        tension: 0.4
      }
    ]
  }

  if (type === 'online') {
    if (category === 'checkup') checkupOnlineData.value = chartData
    if (category === 'repair') repairOnlineData.value = chartData
    if (category === 'total') totalOnlineData.value = chartData
  } else {
    if (category === 'checkup') checkupPhysicalData.value = chartData
    if (category === 'repair') repairPhysicalData.value = chartData
    if (category === 'total') totalPhysicalData.value = chartData
  }

  isLoading.value = false
}

// Fetch data when component mounts
onMounted(() => {
  fetchOnlineData()
  fetchPhysicalData()
})
</script>

<style scoped>
.custom-card {
  border-radius: 8px;
  overflow: hidden;
}

.small-card {
  max-height: 300px;
}

.chart {
  position: relative;
  height: 200px;
}

.small-chart {
  height: 200px;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
