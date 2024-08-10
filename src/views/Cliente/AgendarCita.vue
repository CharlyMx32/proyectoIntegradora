<template>
  <v-app class="fondo">
    <v-container class="d-flex justify-center align-center fill-height">
      <v-card-text>
        <h3 class="title-header" style="color: rgb(8, 0, 255)">Agenda tu cita</h3>
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
                    :disabled="isTimeSlotDisabledFn"
                  >
                    <template v-slot:item="{ item }">
                      <div :class="{ ocupado: busyHours.includes(item) }">{{ item }}</div>
                    </template>
                  </v-select>
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
              <svg
                fill="#000000"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                id="facebook"
                data-name="Flat Color"
                xmlns="http://www.w3.org/2000/svg"
                class="icon flat-color"
              >
                <path
                  d="M14,6h3a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H14A5,5,0,0,0,9,7v3H7a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1H9v7a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V14h2.22a1,1,0,0,0,1-.76l.5-2a1,1,0,0,0-1-1.24H13V7A1,1,0,0,1,14,6Z"
                  style="fill: rgb(0, 0, 0)"
                ></path>
              </svg>
            </v-btn>
            <v-btn icon href="https://instagram.com" target="_blank" class="social-icon-btn">
              <!-- Icono de Instagram -->
              <svg
                fill="#000000"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
              >
                <path
                  d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"
                />
              </svg>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import apiClient from '@/axiosconf'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

// Lista de productos disponibles
const products = ['Laptop', 'Celular', 'Tablet', 'Impresora', 'Televisor', 'Otros']

// Variables reactivas para los datos seleccionados en el formulario
const selectedDate = ref(null)
const selectedTime = ref(null)
const selectedProduct = ref(null)
const problemDetails = ref('')
const busyHours = ref([]) // Asegúrate de que esto esté inicializado

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

  const allSlots = []

  let slot = morningStart
  while (slot.isBefore(morningEnd)) {
    allSlots.push(slot.format('HH:mm'))
    slot = slot.add(30, 'minute')
  }

  slot = afternoonStart
  while (slot.isBefore(afternoonEnd)) {
    allSlots.push(slot.format('HH:mm'))
    slot = slot.add(30, 'minute')
  }

  // Filtrar horas ocupadas
  timeSlots.value = allSlots.filter((slot) => !busyHours.value.includes(slot))

  console.log('allSlots:', allSlots)
  console.log('busyHours:', busyHours.value)
  console.log('timeSlots:', timeSlots.value)
}

const onDateChange = async (date) => {
  selectedDate.value = date // Asigna directamente la fecha seleccionada
  selectedTime.value = null
  console.log('Fecha seleccionada:', selectedDate.value)
  await updateAvailableTimes(selectedDate.value)
  generateTimeSlots() // Llama a generateTimeSlots después de actualizar las horas ocupadas
}

// Computed para filtrar las horas disponibles, excluyendo las horas ocupadas
async function updateAvailableTimes(selectedDate) {
  busyHours.value = await fetchHorasOcupadas(selectedDate)
}

// Obtener horas ocupadas desde el backend
// Obtener horas ocupadas desde el backend
async function fetchHorasOcupadas(fechaCita) {
  try {
    const response = await apiClient.post('obtener_horas_ocupadas', {
      fecha: fechaCita
    })
    if (response.status === 200) {
      return response.data.occupiedHours || [] // Asegúrate de devolver un array
    } else {
      console.error('Error al obtener horas ocupadas:', response.data.msg)
      return [] // Devuelve un array vacío en caso de error
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    return [] // Devuelve un array vacío en caso de error
  }
}

// Función para agendar una cita
const agendarCita = async () => {
  if (selectedDate.value && selectedTime.value && selectedProduct.value && problemDetails.value) {
    try {
      const data = {
        producto: selectedProduct.value,
        problema: problemDetails.value,
        fecha_cita: dayjs(selectedDate.value).format('YYYY-MM-DD'),
        hora_cita: selectedTime.value
      }

      // Obtener el token de autenticación
      const token = localStorage.getItem('authToken')

      const response = await apiClient.post('agendar', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200 && response.data.success) {
        // Manejo de éxito
        // Mostrar un mensaje de éxito (puedes reemplazarlo por Snackbar)
        alert('Cita agendada exitosamente')

        // Añadir la hora agendada a la lista de horas ocupadas
        busyHours.value.push(selectedTime.value)

        // Regenerar los slots de tiempo para la fecha actual
        generateTimeSlots()

        // Limpiar los campos del formulario
        selectedDate.value = null
        selectedTime.value = null
        selectedProduct.value = null
        problemDetails.value = ''
      } else {
        alert('Error al agendar la cita: ' + response.data.message)
      }
    } catch (error) {
      alert('Error al agendar la cita: ' + error.message)
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
.ocupado {
  color: #ccc;
  text-decoration: line-through;
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
