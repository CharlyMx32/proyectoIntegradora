<template>
  <Line :data="checkupOnlineData" :options="chartOptions" />
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

const checkupOnlineData = ref(initChartData('Costo de Chequeo en Línea'))
const chartOptions = ref(initChartOptions())
const isLoading = ref(true)

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
          label: (tooltipItem) => `Monto: $${tooltipItem.formattedValue}`
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

function fetchData(endpoint) {
  return apiClient
    .get(endpoint)
    .then((response) => {
      if (response.data && response.data.status === 200) {
        return response.data.data // Retorna solo la propiedad `data`
      } else {
        console.error(`Error en la respuesta:`, response.data)
        return null
      }
    })
    .catch((error) => {
      console.error(`Error al obtener datos:`, error)
      return null
    })
}

async function fetchOnlineData() {
  try {
    const [
      chequeoLineaData,
      chequeoReparacionLineaData,
      chequeoFisicoData,
      chequeoReparacionFisicoData
    ] = await Promise.all([
      fetchData('ChequeoLinea'),
      fetchData('ChequeoReparacionLinea'),
      fetchData('ChequeoFisico'),
      fetchData('ChequeoReparacionFisico')
    ])

    console.log('Chequeo Línea Data:', chequeoLineaData)
    console.log('Chequeo Reparación Línea Data:', chequeoReparacionLineaData)
    console.log('Chequeo Total Línea Data:', chequeoFisicoData)
    console.log('Chequeo Total Línea Data:', chequeoReparacionFisicoData)

    processData({
      chequeoLineaData,
      chequeoReparacionLineaData,
      chequeoFisicoData,
      chequeoReparacionFisicoData
    })
  } catch (error) {
    console.error(`Error al obtener datos en paralelo:`, error)
  }
}

function processData(data) {
  if (
    !data.chequeoLineaData ||
    !data.chequeoReparacionLineaData ||
    !data.chequeoFisicoData ||
    !data.chequeoReparacionFisicoData
  ) {
    console.error('Datos incompletos:', data)
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

  const dataset = [
    {
      label: 'Chequeo Línea',
      backgroundColor: 'rgba(103, 58, 183, 0.2)',
      borderColor: '#673AB7',
      pointBackgroundColor: '#512DA8',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#512DA8',
      data: Array(12).fill(0),
      fill: true,
      tension: 0.4
    },
    {
      label: 'Chequeo Reparación Línea',
      backgroundColor: 'rgba(0, 188, 212, 0.2)',
      borderColor: '#00BCD4',
      pointBackgroundColor: '#00838F',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00838F',
      data: Array(12).fill(0),
      fill: true,
      tension: 0.4
    },
    {
      label: 'Chequeo Físico',
      backgroundColor: 'rgba(255, 193, 7, 0.2)',
      borderColor: '#FFC107',
      pointBackgroundColor: '#FFA000',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#FFA000',
      data: Array(12).fill(0),
      fill: true,
      tension: 0.4
    },
    {
      label: 'Chequeo Reparación Físico',
      backgroundColor: 'rgba(233, 30, 99, 0.2)',
      borderColor: '#E91E63',
      pointBackgroundColor: '#C2185B',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#C2185B',
      data: Array(12).fill(0),
      fill: true,
      tension: 0.4
    }
  ]

  const processMonthlyData = (dataArray, datasetIndex, key) => {
    if (!Array.isArray(dataArray)) {
      console.error(`Expected an array but got:`, dataArray)
      return
    }

    const monthData = Array(12).fill(0)

    dataArray.forEach((entry) => {
      const monthIndex = new Date().getMonth()
      if (monthIndex >= 0 && monthIndex < 12) {
        monthData[monthIndex] = parseFloat(entry[key])
      }
    })

    dataset[datasetIndex].data = monthData
  }

  processMonthlyData(data.chequeoLineaData, 0, 'total_chequeo_linea')
  processMonthlyData(data.chequeoReparacionLineaData, 1, 'total_reparacion_linea')
  processMonthlyData(data.chequeoFisicoData, 2, 'total_chequeo_Fisico')
  processMonthlyData(data.chequeoReparacionFisicoData, 3, 'total_ganancias_Fisico')

  const chartData = {
    labels: labels,
    datasets: dataset
  }

  checkupOnlineData.value = chartData
  isLoading.value = false
}

onMounted(() => {
  fetchOnlineData()
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
