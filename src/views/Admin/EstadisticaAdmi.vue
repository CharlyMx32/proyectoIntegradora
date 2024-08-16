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
  
  <script>
  import axios from 'axios';
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from 'chart.js';
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  );
  
  export default {
    components: {
      LineChart: Line,
    },
    data() {
      return {
        checkupOnlineData: this.initChartData('Costo de Chequeo en Línea'),
        repairOnlineData: this.initChartData('Costo de Reparación en Línea'),
        totalOnlineData: this.initChartData('Costo Total en Línea'),
        checkupPhysicalData: this.initChartData('Costo de Chequeo Físico'),
        repairPhysicalData: this.initChartData('Costo de Reparación Físico'),
        totalPhysicalData: this.initChartData('Costo Total Físico'),
        chartOptions: this.initChartOptions(),
        isLoading: true,
      };
    },
    methods: {
      initChartData(label) {
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
              tension: 0.4,
            },
          ],
        };
      },
      initChartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#673AB7',
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `Monto: $${tooltipItem.formattedValue}`;
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#673AB7',
              },
            },
            y: {
              ticks: {
                color: '#673AB7',
                callback: (value) => `$${value}`,
              },
            },
          },
        };
      },
      fetchOnlineData() {
        axios.get('/ChequeoLinea')
          .then(response => {
            console.log('Datos de Chequeo Línea:', response.data  && response.data.status === 200);
            this.processData(response.data, 'online', 'checkup');
          })
          .catch(error => {
            console.error('Error al obtener datos de chequeo en línea:', error);
          });
  
        axios.get('/ChequeoReparacionLinea')
          .then(response => {
            console.log('Datos de Reparación Línea:', response.data  && response.data.status === 200);
            this.processData(response.data, 'online', 'repair');
          })
          .catch(error => {
            console.error('Error al obtener datos de reparación en línea:', error);
          });
  
        axios.get('/ChequeoTotalLinea')
          .then(response => {
            console.log('Datos Totales Línea:', response.data  && response.data.status === 200);
            this.processData(response.data, 'online', 'total');
          })
          .catch(error => {
            console.error('Error al obtener datos totales en línea:', error);
          });
      },
      fetchPhysicalData() {
        axios.get('/ChequeoFisico')
          .then(response => {
            console.log('Datos de Chequeo Físico:', response.data && response.data.status === 200);
            this.processData(response.data, 'physical', 'checkup');
          })
          .catch(error => {
            console.error('Error al obtener datos de chequeo físico:', error);
          });
  
        axios.get('/ChequeoReparacionFisico')
          .then(response => {
            console.log('Datos de Reparación Físico:', response.data  && response.data.status === 200);
            this.processData(response.data, 'physical', 'repair');
          })
          .catch(error => {
            console.error('Error al obtener datos de reparación físico:', error);
          });
  
        axios.get('/ChequeoTotalFisico')
          .then(response => {
            console.log('Datos Totales Físico:', response.data  && response.data.status === 200);
            this.processData(response.data, 'physical', 'total');
          })
          .catch(error => {
            console.error('Error al obtener datos totales físicos:', error);
          });
      },
      processData(data, type, category) {
        if (!Array.isArray(data)) {
          console.error('Data no es un array:', data);
          return;
        }
  
        const labels = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
  
        const costs = Array(12).fill(0);
  
        data.forEach(entry => {
          const month = new Date(entry.date).getMonth();
          costs[month] += entry.amount;
        });
  
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
              tension: 0.4,
            },
          ],
        };
  
        if (type === 'online') {
          if (category === 'checkup') this.checkupOnlineData = chartData;
          if (category === 'repair') this.repairOnlineData = chartData;
          if (category === 'total') this.totalOnlineData = chartData;
        } else {
          if (category === 'checkup') this.checkupPhysicalData = chartData;
          if (category === 'repair') this.repairPhysicalData = chartData;
          if (category === 'total') this.totalPhysicalData = chartData;
        }
  
        this.isLoading = false;
      },
    },
    mounted() {
      this.fetchOnlineData();
      this.fetchPhysicalData();
    },
  };
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
  