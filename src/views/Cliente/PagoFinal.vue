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
                label="Correo"
                v-model="email"
                outlined
              ></v-text-field>
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
              <v-text-field
                label="Concepto"
                v-model="cardholderName"
                outlined
              ></v-text-field>
              <v-row class="pt-4">
                <v-col cols="6">
                  <v-btn block color="primary" @click="cancelPayment">
                    Cancelar
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    block
                    color="secondary"
                    :disabled="!isFormComplete"
                    @click="handlePayment"
                  >
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
    <v-snackbar
      v-model="snackbarVisible"
      :timeout="3000"
      color="success"
      top
      right
    >
      {{ snackbarMessage }}
      <v-btn
        color="white"
        text
        @click="snackbarVisible = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiCliente from '@/axiosconf' // Asegúrate de que este sea el camino correcto para tu configuración de Axios

const router = useRouter()

const email = ref('')
const cardNumber = ref('')
const expiryDate = ref('')
const cvc = ref('')
const cardholderName = ref('')
const selectedItem = ref(null)
const totalAmount = ref('') // Variable para el monto total

// Variables para el snackbar
const snackbarVisible = ref(false)
const snackbarMessage = ref('')

// Computed para verificar si el formulario está completo
const isFormComplete = computed(() => {
  return email.value && cardholderName.value && cardNumber.value && expiryDate.value && cvc.value
})

const formatCardNumber = () => {
  cardNumber.value = cardNumber.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim()

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
  router.push({ path: '/Pedir' }) // Redirigir usando Vue Router
}


  onMounted(async () => {
  const item = router.currentRoute.value.query.item;

  if (item) {
    selectedItem.value = JSON.parse(item)
  } else {
    console.error("No se pudo seleccionar un item");
  }

  try {
    const response = await apiCliente.get('ClientePagoFinal');
    console.log('Respuesta completa del servidor:', response);

    // Verifica el formato y existencia de datos antes de acceder a ellos
    if (response.status === 200 && response.data && response.data.data && Array.isArray(response.data.data.citas)) {
      const citas = response.data.data.citas;

      if (citas.length > 0) {
        const pagoTotal = parseFloat(citas[0].pago_total);
        if (!isNaN(pagoTotal)) {
          totalAmount.value = `MX$${pagoTotal.toFixed(2)}`;
        } else {
          console.error('El valor de pago_total no es un número válido:', citas[0].pago_total);
          totalAmount.value = 'Error al obtener el monto total';
        }
      } else {
        console.error('No se encontraron citas en la respuesta:', response.data.data);
        totalAmount.value = 'Error al obtener el monto total';
      }
    } else {
      console.error('La respuesta no contiene los datos esperados:', response.data);
      totalAmount.value = 'Error al obtener el monto total';
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    totalAmount.value = 'Error al procesar la solicitud';

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
        snackbarMessage.value = 'El pago fue realizado con éxito.'
        snackbarVisible.value = true
        setTimeout(() => {
          router.push({ path: '/Pedir' }); // Redirigir después de 3 segundos
        }, 3000)
        console.log("Pago exitoso"); // Asegúrate de que este mensaje aparezca en la consola

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
</script>
