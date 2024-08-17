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
              <h2 class="text-h4 font-weight-bold">MX$250.00</h2>
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
              <v-text-field label="Correo" v-model="email" outlined></v-text-field>
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
                  <v-btn block color="secondary" :disabled="!isFormComplete" @click="handlePayment">
                    Pagar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Cuadro de texto que muestra el mensaje -->
    <v-dialog v-model="paymentSuccessDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Éxito</v-card-title>
        <v-card-text>El pago fue realizado con éxito.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="redirectToPedir"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiCliente from '@/axiosconf'

const router = useRouter()

const email = ref('')
const cardNumber = ref('')
const expiryDate = ref('')
const cvc = ref('')
const cardholderName = ref('')
const paymentSuccessDialog = ref(false)
const selectedItem = ref(null)

const isFormComplete = computed(() => {
  return email.value && cardholderName.value && cardNumber.value && expiryDate.value && cvc.value
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
  window.location.href = '/Pedir'
}

onMounted(() => {
  const item = router.currentRoute.value.query.item
  if (item) {
    selectedItem.value = JSON.parse(item)
  } else {
    console.log('no se pudo seleccionar un item mamahuevo')
  }
})

const handlePayment = async () => {
  if (selectedItem.value && selectedItem.value.id_detalle_linea) {
    try {
      const response = await apiCliente.post('lineaaceptado', {
        id_detalle_linea: selectedItem.value.id_detalle_linea
      })

      console.log('Respuesta del servidor:', response)

      if (response.status === 200 && response.data && response.data.success) {
        paymentSuccessDialog.value = false
      } else {
        console.error('Error: ', response.data.message)
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error)
    }
  } else {
    console.error('Error: selectedItem o id_detalle_linea no está definido')
  }
}

watch(paymentSuccessDialog, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      redirectToPedir()
    }, 3500)
  }
})

const redirectToPedir = () => {
  console.log('Redirigiendo a /Pedir')
  router.push({ path: '/Pedir' })
}
</script>
