<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-avatar>
              <v-icon>mdi-cart</v-icon>
            </v-avatar>
            <h1>HardwareSolutions</h1>
          </v-card-title>
          <v-card-text>
            <div>
              <h2>Total a pagar</h2>
              <h2 class="text-h4 font-weight-bold">{{ totalAmount }}</h2>
              <p>UN BUEN NEGOCIO</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Pago con tarjeta</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Número de Tarjeta"
                v-model="cardNumber"
                outlined
                placeholder="1234 1234 1234 1234"
                @input="formatCardNumber"
                maxlength="19"
              ></v-text-field>
              <v-text-field
                label="MM / YY"
                v-model="expiryDate"
                outlined
                placeholder="MM / YY"
                @input="formatExpiryDate"
                maxlength="5"
              ></v-text-field>
              <v-text-field
                label="CVC"
                v-model="cvc"
                outlined
                @input="formatCvc"
                maxlength="4"
              ></v-text-field>
              <v-text-field label="Concepto" v-model="cardholderName" outlined></v-text-field>
              <v-row class="pt-4">
                <v-col cols="6">
                  <v-btn block color="primary" @click="cancelPayment"> Cancelar </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn block color="secondary" :disabled="!isFormComplete" @click="handleSubmit">
                    Pagar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Snackbar para el mensaje de éxito -->
    <v-snackbar v-model="snackbarVisible" :timeout="3000" color="success" top right>
      {{ snackbarMessage }}
      <v-btn color="white" text @click="snackbarVisible = false"> Cerrar </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiCliente from '@/axiosconf'

const router = useRouter()
const route = useRoute()

const cardNumber = ref('')
const expiryDate = ref('')
const cvc = ref('')
const cardholderName = ref('')
const totalAmount = ref('') // Variable para el monto total

const snackbarVisible = ref(false)
const snackbarMessage = ref('')

const isFormComplete = computed(() => {
  return cardholderName.value && cardNumber.value && expiryDate.value && cvc.value
})

const formatCardNumber = () => {
  cardNumber.value = cardNumber.value
    .replace(/\D/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()
}

const formatExpiryDate = () => {
  expiryDate.value = expiryDate.value.replace(/\D/g, '')
  if (expiryDate.value.length > 4) {
    expiryDate.value = expiryDate.value.slice(0, 4)
  }
  if (expiryDate.value.length > 2) {
    expiryDate.value = expiryDate.value.slice(0, 2) + '/' + expiryDate.value.slice(2)
  }
}

const formatCvc = () => {
  cvc.value = cvc.value.replace(/\D/g, '')
}

const cancelPayment = () => {
  router.push({ path: '/Pedir' })
}

onMounted(async () => {
  try {
    const id_detalle_linea = route.query.id_detalle_linea
    console.log('ID Detalle Línea en onMounted:', id_detalle_linea)

    const response = await apiCliente.get('ClientePagoFinal', {
      params: { id_detalle_linea }
    })

    console.log('Respuesta completa del servidor:', response)

    if (
      response.status === 200 &&
      response.data &&
      response.data.citas &&
      Array.isArray(response.data.citas) &&
      response.data.citas.length > 0
    ) {
      const pagoTotal = parseFloat(response.data.citas[0].pago_total)
      if (!isNaN(pagoTotal)) {
        totalAmount.value = `MX$${pagoTotal.toFixed(2)}`
      } else {
        console.error(
          'El valor de pago_total no es un número válido:',
          response.data.citas[0].pago_total
        )
        totalAmount.value = 'Error al obtener el monto total'
      }
    } else {
      console.error('No se encontraron citas en la respuesta:', response.data)
      totalAmount.value = 'Error al obtener el monto total'
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    totalAmount.value = 'Error al procesar la solicitud'
  }
})

const handleSubmit = async () => {
  if (isFormComplete.value) {
    try {
      const id_detalle_linea = route.query.id_detalle_linea
      console.log('ID Detalle Línea en handleSubmit:', id_detalle_linea) // Añadido

      await apiCliente.post('lineaaceptado', {
        id_detalle_linea,
        cardNumber: cardNumber.value,
        expiryDate: expiryDate.value,
        cvc: cvc.value,
        cardholderName: cardholderName.value,
        totalAmount: totalAmount.value
      })

      // Muestra mensaje de éxito y redirige después de un breve retraso
      snackbarMessage.value = 'Pago realizado exitosamente'
      snackbarVisible.value = true

      // Temporizador para redirigir después de mostrar el Snackbar
      setTimeout(() => {
        router.push({ path: '/Pedir' }) // Cambia la ruta según sea necesario
      }, 2000) // 3000 ms para coincidir con el tiempo del Snackbar
    } catch (error) {
      console.error('Error al realizar el pago:', error)
      snackbarMessage.value = 'Error al realizar el pago'
      snackbarVisible.value = true
    }
  } else {
    snackbarMessage.value = 'Por favor, completa todos los campos.'
    snackbarVisible.value = true
  }
}
</script>
