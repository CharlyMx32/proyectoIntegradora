<template>
  <v-app class="fondo">
    <v-container class="d-flex justify-center align-center fill-height">
     
        <v-card-text>
          <h1 style="color:#FFFFFF; text-align: center; font-size: 50px;">Agendar una cita</h1> 
          <v-form @submit.prevent="agendarCita">
            <br>
            <v-row>
              <!-- Columna 1 -->
              <v-col cols="12" md="6">
                <v-card class="nested-card mb-4" :elevation="2">
                  <v-card-title class="title-card">Selecciona un Producto</v-card-title>
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
                  <v-card-title class="title-card">Detalles del Problema</v-card-title>
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
                      full-width
                    ></v-select>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Columna 2 -->
              <v-col cols="12" md="6">
                <v-card class="nested-card mb-4" :elevation="2">
                  <v-card-title class="title-card">PRODUCTO</v-card-title>
                  <v-card-text>
                    <v-date-picker
                      v-model="selectedDate"
                      :allowed-dates="allowedDates"
                      @input="onDateChange"
                      locale="es"
                      style="max-height: 445px; overflow: hidden;"
                       full-width
                    ></v-date-picker>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <div style="text-align: center; margin-top: 20px;">
              <v-btn type="submit" color="primary" style="width: 300px;">Agendar Cita</v-btn>
            </div>
          </v-form>
        </v-card-text>
     
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  format,
  isWeekend,
  isSunday,
  isBefore,
  isAfter,
  addDays,
  eachMinuteOfInterval
} from 'date-fns'

// Datos para los productos
const products = [
  'Laptop',
  'Smartphone',
  'Tablet',
  'Impresora',
  'Televisor',
  'Auriculares',
  'Cámara'
]

const selectedDate = ref(null)
const selectedTime = ref(null)
const selectedProduct = ref(null)
const problemDetails = ref('')

const allowedDates = (date) => {
  const today = new Date()
  const maxDate = addDays(today, 7)
  // Solo permitir lunes a sábado y dentro de los próximos 7 días, excluyendo los domingos
  return !isSunday(date) && !isBefore(date, today) && !isAfter(date, maxDate)
}

const timeSlots = computed(() => {
  if (!selectedDate.value) return []
  const date = new Date(selectedDate.value)
  const morningStart = new Date(date.setHours(9, 0, 0))
  const morningEnd = new Date(date.setHours(14, 0, 0))
  const afternoonStart = new Date(date.setHours(15, 0, 0))
  const afternoonEnd = new Date(date.setHours(17, 0, 0))

  const morningSlots = eachMinuteOfInterval(
    { start: morningStart, end: morningEnd },
    { step: 30 }
  ).map((time) => format(time, 'HH:mm'))
  const afternoonSlots = eachMinuteOfInterval(
    { start: afternoonStart, end: afternoonEnd },
    { step: 30 }
  ).map((time) => format(time, 'HH:mm'))

  return [...morningSlots, ...afternoonSlots]
})

const onDateChange = (date) => {
  selectedDate.value = date
  selectedTime.value = null // Limpiar la hora cuando cambie la fecha
}

const agendarCita = () => {
  if (selectedDate.value && selectedTime.value && selectedProduct.value && problemDetails.value) {
    const cita = new Date(`${selectedDate.value}T${selectedTime.value}`)
    if (isAfter(cita, new Date())) {
      alert(`Cita agendada para ${format(cita, 'dd/MM/yyyy HH:mm')}
      \nProducto: ${selectedProduct.value}
      \nProblema: ${problemDetails.value}`)
    } else {
      alert('La fecha y hora deben ser futuras')
    }
  } else {
    alert('Por favor, completa todos los campos.')
  }
}
</script>

<style scoped>
.fondo {
  background: url('../../assets/iii.svg') no-repeat center center fixed;
  background-size: cover;
  height: 100%;
}
.white-card {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.title-card {
  font-size: 10px;
  font-weight: 600;
}
.nested-card {
  margin-bottom: 10px;
}
</style>
