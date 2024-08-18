<template>
  <v-app class="fondo">
    <v-container class="d-flex justify-center align-center fill-height">
      <v-card-text>
        <h3 class="title-header" style="color: #34495e; margin-top: -80px">Agenda tu cita</h3>

        <v-form @submit.prevent="agendarCita">
          <v-row>
            <!-- Columna 1 -->
            <v-col cols="12" md="6">
              <v-card class="nested-card mb-4" :elevation="2">
                <v-card-title class="title-card">Selecciona tu tipo de Producto</v-card-title>
                <v-card-text>
                  <v-select
                    v-model="selectedProduct"
                    :items="products"
                    label="Selecciona un producto"
                    full-width
                  ></v-select>
                </v-card-text>
              </v-card>
              <v-card class="nested-card mb-4" :elevation="2">
                <v-card-title class="title-card">Detallanos tu Problema</v-card-title>
                <v-card-text>
                  <v-textarea
                    v-model="problemDetails"
                    label="Describe el problema"
                    rows="4"
                    full-width
                  ></v-textarea>
                </v-card-text>
              </v-card>
              <v-card v-if="selectedDate" class="nested-card mb-4" :elevation="16">
                <v-card-title class="title-card">Selecciona una Hora</v-card-title>
                <v-card-text>
                  <v-select
                    v-model="selectedTime"
                    :items="timeSlots"
                    label="Selecciona una hora"
                    item-value="value"
                    item-text="value"
                  />
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Columna 2 -->
            <v-col cols="12" md="6">
              <v-card class="nested-card mb-4" :elevation="2">
                <v-card-title class="title-card">Selecciona una Fecha</v-card-title>
                <v-card-text>
                  <v-date-picker
                    v-model="selectedDate"
                    :allowed-dates="allowedDates"
                    @input="onDateChange"
                    locale="es"
                    style="max-height: 445px; overflow: hidden"
                    full-width
                  ></v-date-picker>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <div class="submit-container">
            <v-btn type="submit" color="#ffad00" style="width: 300px">Agendar Cita</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-container>
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
    <FooterComponent />
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import apiClient from '@/axiosconf'
import FooterComponent from '@/components/Generales/FooterComponent.vue'

const products = ['Laptop', 'Celular', 'Tablet', 'Impresora', 'Televisor', 'Otros']

const selectedDate = ref(null)
const selectedTime = ref(null)
const selectedProduct = ref(null)
const problemDetails = ref('')
const busyHours = ref([])
const snackbar = ref({
  visible: false,
  message: '',
  color: 'success'
})

const allowedDates = (date) => {
  const hoy = dayjs().startOf('day')
  const maxDate = hoy.add(7, 'day')
  return !esDomingo(date) && !dayjs(date).isBefore(hoy) && !dayjs(date).isAfter(maxDate)
}

const esDomingo = (fecha) => dayjs(fecha).day() === 0

// Generar slots de tiempo
const timeSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '15:00',
  '15:30',
  '16:00'
]

const agendarCita = async () => {
  if (selectedDate.value && selectedTime.value && selectedProduct.value) {
    const problemDetailsTrimmed = problemDetails.value.trim()

    // Validar que la descripción tenga más de 8 palabras
    const wordCount = problemDetailsTrimmed.split(/\s+/).filter((word) => word.length > 0).length
    if (wordCount < 3) {
      showSnackbar('La descripción debe tener al menos 3 palabras.', 'error')
      return
    }

    try {
      const data = {
        fecha_cita: dayjs(selectedDate.value).format('YYYY-MM-DD'),
        fecha_hora: selectedTime.value,
        producto: selectedProduct.value,
        problema: problemDetailsTrimmed
      }

      const response = await apiClient.post('agendar', data)

      if (
        response.status === 200 &&
        response.data.status === 200 &&
        response.data.msg === 'success'
      ) {
        showSnackbar('Cita agendada exitosamente', 'success')

        selectedDate.value = null
        selectedTime.value = null
        selectedProduct.value = null
        problemDetails.value = ''
        busyHours.value = []
      } else {
        showSnackbar(
          'Error al agendar la cita: ' + (response.data.message || 'Desconocido'),
          'error'
        )
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
      showSnackbar('Error inesperado al agendar la cita', 'error')
    }
  } else {
    showSnackbar('Faltan datos', 'error')
  }
}

// Función para mostrar mensajes en el snackbar
const showSnackbar = (message, color = 'success') => {
  snackbar.value = {
    visible: true,
    message,
    color
  }
}

// Evento que se ejecuta al cambiar la fecha
const onDateChange = async (date) => {
  selectedDate.value = dayjs(date).format('YYYY-MM-DD')
}
</script>

<style scoped>
.v-snackbar {
  font-size: 16px;
}
.title-header {
  color: rgb(8, 0, 255);
  text-align: center;
  font-size: 50px;
}
.submit-container {
  text-align: center;
  margin-top: 20px;
}
.nested-card {
  margin-bottom: 10px;
}
.title-card {
  font-size: 14px;
  font-weight: 600;
}
</style>
