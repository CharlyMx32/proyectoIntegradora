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

    <footer>
      <v-container>
        <v-row>
          <!-- Información de Contacto -->
          <v-col cols="12" md="4" class="footer-info">
            <h4 class="footer-title">Contactos</h4>
            <p>MundoElectronicoTRC@gmail.com</p>
            <p>Teléfono: 8715265042</p>
          </v-col>

          <!-- Enlaces de Navegación -->
          <v-col cols="12" md="4" class="footer-links">
            <h4 class="footer-title">Desarrolladores</h4>
            <p>Edwin Lopez, Carlos Centeno</p>
            <p>Diana Ochoa, Marbella Perez</p>
          </v-col>

          <!-- Iconos Sociales -->
          <v-col cols="12" md="4" class="social-icons">
            <v-btn
              icon
              href="https://www.facebook.com/profile.php?id=100054380206513"
              target="_blank"
              class="social-icon-btn"
            >
              <!-- Icono de Facebook -->
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

// Lista de productos disponibles
const products = ['Laptop', 'Celular', 'Tablet', 'Impresora', 'Televisor', 'Otros']

// Variables reactivas para los datos seleccionados en el formulario
const selectedDate = ref(null)
const selectedTime = ref(null)
const selectedProduct = ref(null)
const problemDetails = ref('')
const busyHours = ref([]) // Horas ocupadas

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
async function fetchHorasOcupadas(fechaCita) {
  try {
    const response = await axios.post('http://hs.com/obtener_horas_ocupadas', {
      fecha_cita: fechaCita
    })
    if (response.status === 200) {
      return response.data // Ajusta esto según la estructura de tu respuesta
    } else {
      console.error('Error al obtener horas ocupadas:', response.data.msg)
      return []
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    return []
  }
}

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
const agendarCita = async () => {
  if (selectedDate.value && selectedTime.value && selectedProduct.value && problemDetails.value) {
    try {
      const data = {
        fecha_cita: dayjs(selectedDate.value).format('YYYY-MM-DD'),
        fecha_hora: selectedTime.value,
        producto: selectedProduct.value,
        problema: problemDetails.value
      }

      const response = await axios.post('http://hs.com/agendar', data)

      if (
        response.status === 200 &&
        response.data.status === 200 &&
        response.data.msg === 'success'
      ) {
        alert('Cita agendada exitosamente')

        // Limpiar los campos del formulario
        selectedDate.value = null
        selectedTime.value = null
        selectedProduct.value = null
        problemDetails.value = ''
        busyHours.value = [] // Limpiar las horas ocupadas
        generateTimeSlots() // Regenerar los slots para la fecha actual
      } else {
        alert('Error al agendar la cita')
      }
    } catch (error) {
      alert('Error al agendar la cita')
    }
  } else {
    alert('Faltan datos')
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
/* Estilo del pie de página */
footer {
  background-color: #11100e;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}

/* Estilos de los elementos del pie de página */
.footer-info,
.footer-links,
.social-icons {
  margin-bottom: 10px;
}

/* Estilo de los títulos del pie de página */
.footer-title {
  color: #ffad00;
}

/* Estilo de los botones de iconos sociales */
.social-icon-btn {
  margin-right: 10px; /* Espacio entre los iconos */
}

.social-icon-btn:last-child {
  margin-right: 0; /* Elimina el margen del último ícono */
}
</style>
