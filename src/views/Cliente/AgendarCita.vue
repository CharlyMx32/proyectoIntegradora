<template>
  <v-app class="fondo">
    <v-container class="d-flex justify-center align-center fill-height">
      <br />
      <br />
      <v-card-text>
        <h3 class="title-header" style="color: rgb(8, 0, 255); margin-top: -80px">
          Agenda tu cita
        </h3>
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
                    :items="filteredTimeSlots"
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
import { ref, computed, watch } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import apiClient from '@/axiosconf'
import FooterComponent from '@/components/Generales/FooterComponent.vue'

// Lista de productos disponibles
const products = ['Laptop', 'Celular', 'Tablet', 'Impresora', 'Televisor', 'Otros']

// Variables reactivas para los datos seleccionados en el formulario
const selectedDate = ref(null)
const selectedTime = ref(null)
const selectedProduct = ref(null)
const problemDetails = ref('')
const busyHours = ref([]) // Horas ocupadas
const snackbar = ref({
  visible: false,
  message: '',
  color: 'success' // Puedes cambiar a 'error' según sea necesario
})

// Validación de fechas permitidas
const allowedDates = (date) => {
  const hoy = dayjs().startOf('day')
  const maxDate = hoy.add(7, 'day')
  return !esDomingo(date) && !dayjs(date).isBefore(hoy) && !dayjs(date).isAfter(maxDate)
}

// Función para verificar si una fecha es domingo
const esDomingo = (fecha) => dayjs(fecha).day() === 0

// Computed para generar los intervalos de tiempo
const timeSlots = ref([])

const generateTimeSlots = () => {
  if (!selectedDate.value) return []

  const date = dayjs(selectedDate.value)
  const morningStart = date.hour(9).minute(0)
  const morningEnd = date.hour(14).minute(0)
  const afternoonStart = date.hour(15).minute(0)
  const afternoonEnd = date.hour(16).minute(0)

  const morningSlots = []
  let slot = morningStart
  while (slot.isBefore(morningEnd)) {
    morningSlots.push(slot.format('HH:mm'))
    slot = slot.add(30, 'minute')
  }

  const afternoonSlots = []
  slot = afternoonStart
  while (slot.isBefore(afternoonEnd)) {
    afternoonSlots.push(slot.format('HH:mm'))
    slot = slot.add(30, 'minute')
  }

  timeSlots.value = [...morningSlots, ...afternoonSlots]
}

// Computed para filtrar las horas disponibles, excluyendo las horas ocupadas
const filteredTimeSlots = computed(() => {
  if (!selectedDate.value) return []

  const availableSlots = timeSlots.value.filter((slot) => !busyHours.value.includes(slot))

  // Filtrar horas pasadas si es el mismo día
  const now = dayjs()
  const selectedDateObj = dayjs(selectedDate.value).startOf('day')
  const isToday = selectedDateObj.isSame(now, 'day')

  if (isToday) {
    const currentTime = now.format('HH:mm')
    return availableSlots.filter((slot) => slot > currentTime)
  }

  return availableSlots
})

// Obtener horas ocupadas desde el backend
// Obtener horas ocupadas desde el backend
async function fetchHorasOcupadas(fechaCita) {
  try {
    const response = await apiClient.post('obtener_horas_ocupadas', {
      fecha_cita: fechaCita
    })
    console.log('Respuesta de obtener horas ocupadas:', response)
    if (response.status === 200) {
      return response.data // Ajusta esto según la estructura de tu respuesta
    } else {
      console.error('Error al obtener horas ocupadas:', response.data.msg)
      return []
    }
  } catch (error) {
    console.error('Error en la solicitud de obtener horas ocupadas:', error)
    return []
  }
}

// Función para agendar una cita

// Actualiza las horas ocupadas y las horas disponibles
async function updateAvailableTimes(selectedDate) {
  busyHours.value = await fetchHorasOcupadas(selectedDate)
}

// Evento que se ejecuta al cambiar la fecha
const onDateChange = async (date) => {
  selectedDate.value = dayjs(date).format('YYYY-MM-DD')
  selectedTime.value = null
  generateTimeSlots()
  await updateAvailableTimes(selectedDate.value)
}

// Función para agendar una cita
// Función para mostrar mensajes en el snackbar
const showSnackbar = (message, color = 'success') => {
  snackbar.value = {
    visible: true,
    message,
    color
  }
}

// Función para agendar una cita
const agendarCita = async () => {
  if (selectedDate.value && selectedTime.value && selectedProduct.value && problemDetails.value) {
    try {
      const data = {
        fecha_cita: dayjs(selectedDate.value).format('YYYY-MM-DD'),
        fecha_hora: selectedTime.value,
        producto: selectedProduct.value,
        problema: problemDetails.value
      }

      const response = await apiClient.post('agendar', data)

      console.log('Respuesta del servidor:', response.data)

      if (
        response.status === 200 &&
        response.data.status === 200 &&
        response.data.msg === 'success'
      ) {
        showSnackbar('Cita agendada exitosamente', 'success')

        // Limpiar los campos del formulario
        selectedDate.value = null
        selectedTime.value = null
        selectedProduct.value = null
        problemDetails.value = ''
        busyHours.value = [] // Limpiar las horas ocupadas
        generateTimeSlots() // Regenerar los slots para la fecha actual
      } else {
        showSnackbar(
          'Error al agendar la cita: ' + (response.data.message || 'Desconocido'),
          'error'
        )
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)

      let errorMessage = 'Error al agendar la cita: Desconocido'

      // Verificar la respuesta del error para determinar el mensaje adecuado
      if (error.response && error.response.data) {
        const errorData = error.response.data
        if (errorData.msg === 'cita_existente') {
          errorMessage = 'Ya existe una cita para esta fecha y hora'
        } else {
          errorMessage = errorData.msg || error.message || 'Desconocido'
        }
      } else {
        errorMessage = error.message || 'Desconocido'
      }

      showSnackbar(errorMessage, 'error')
    }
  } else {
    showSnackbar('Faltan datos', 'error')
  }
}

// Inicializar los slots de tiempo cuando se carga el componente
generateTimeSlots()

// Verificar horas disponibles cuando cambia la fecha
watch(selectedDate, async (newDate) => {
  if (newDate) {
    generateTimeSlots()
    await updateAvailableTimes(newDate)
  }
})
</script>

<style scoped>
.fondo {
  color: #ede8e6;
  background-size: cover;
  height: 100%;
}
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
  font-size: 14px; /* Ajustado para ser más visible */
  font-weight: 600;
}

/*Pie de pagina */
</style>
