<template>
  <v-container>
    <v-card
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl my-card"
    >
      <v-card-title>
        <v-flex class="flex-col space-y-1.5 p-6">
          <h1
            class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight efecto-titulo"
          >
            CITAS CLIENTE FÍSICO
          </h1>
        </v-flex>
      </v-card-title>
      <v-card-text class="p-6 space-y-6">
        <v-form @submit.prevent="fetchData" class="mb-4">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="filters.clientName"
                label="Nombre del Cliente"
                placeholder="Ingrese el nombre del cliente"
                outlined
                class="my-input-class"
                dense
                full-width
              />
            </v-col>
          </v-row>
        </v-form>

        <!-- Tabla de datos -->
        <div class="table-container">
          <v-table density="compact" class="custom-table">
            <thead>
              <tr>
                <th class="text-left">Nombre Cliente</th>
                <th class="text-left">Producto</th>
                <th class="text-left">Pago</th>
                <th class="text-left">Garantia</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in filteredOrders"
                :key="item.id_detalle_fisico"
                :class="{
                  'selected-row':
                    selectedOrder && selectedOrder.id_detalle_fisico === item.id_detalle_fisico
                }"
                @click="selectOrder(item)"
              >
                <td>{{ item.Nombre_Cliente }}</td>
                <td>{{ item.Producto }}</td>
                <td>{{ item.Pago }}</td>
                <td>{{ item.Uso_Garantia }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-card-text>
    </v-card>

    <!-- Componente adicional -->
    <div v-if="selectedOrder" class="additional-component-container">
      <h2
        class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight efecto-titulo"
      >
        Detalles de la cita:
      </h2>

      <p>Nombre Cliente: {{ selectedOrder.Nombre_Cliente }}</p>
      <p>Contacto Cliente: {{ selectedOrder.Contacto }}</p>
      <p>Producto: {{ selectedOrder.Producto }}</p>
      <p>Costo Chequeo: {{ selectedOrder.CostoChequeo }}</p>
      <p>Costo Reparacion: {{ selectedOrder.CostoReparacion }}</p>
      <p>Costo Total: {{ selectedOrder.CostoTotal }}</p>
      <p>Seguimiento: {{ selectedOrder.Seguimiento}}</p>
      <p>Entregado: {{ selectedOrder.Entregado}}</p>
      <p>Pago: {{ selectedOrder.Pago }}</p>
      <p>Garantia: {{ selectedOrder.Uso_Garantia }}</p>
      <v-btn
        v-if="
          selectedOrder &&
          selectedOrder.Uso_Garantia !== 'expirada' &&
          selectedOrder.Uso_Garantia !== 'usada' &&
          selectedOrder.Garantia !== 'Pendiente de entrega'
        "
        @click="usarGarantia"
        class="custom-btn"
      >
        USAR GARANTÍA
      </v-btn>
      <v-btn
  v-if="
    !selectedOrder || 
    (selectedOrder && 
      selectedOrder.Pago !== 'Efectivo' && 
      selectedOrder.Pago !== 'Tarjeta'
    )
  "
  @click="realizarPago"
  class="custom-btn"
>
  PAGO
</v-btn>

<v-btn
        v-if="selectedOrder &&  selectedOrder.Entregado === 'No'"
        @click="marcarEntregado"
        class="custom-btn"
        >ENTREGADO</v-btn
      >
    </div>

    <!-- Snackbar para mensajes de éxito -->
    <v-snackbar v-model="successSnackbar" :timeout="3000" color="green" top>
      {{ successMessage }}
    </v-snackbar>

    <!-- Snackbar para mensajes de error -->
    <v-snackbar v-model="errorSnackbar" :timeout="3000" color="red" top>
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from '@/axiosconf'

const orders = ref([])
const filters = ref({
  clientName: ''
})
const selectedOrder = ref(null)
const successSnackbar = ref(false)
const errorSnackbar = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const fetchData = async () => {
  try {
    const { clientName } = filters.value
    const response = await apiClient.get('CitasFisico', {
      params: {
        client_name: clientName
      }
    })

    console.log('Response data:', response.data)
    orders.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

onMounted(fetchData)

const filteredOrders = computed(() => {
  return orders.value.filter((order) =>
    order.Nombre_Cliente.toLowerCase().includes(filters.value.clientName.toLowerCase())
  )
})

const selectOrder = (order) => {
  selectedOrder.value = order
}

const usarGarantia = async () => {
  try {
    const response = await apiClient.post('garantiafisico', {
      id_detalle_fisico: selectedOrder.value.id_detalle_fisico,
      cliente: selectedOrder.value.Nombre_Cliente
    })
    successMessage.value =
      'Garantía usada exitosamente para el cliente ${selectedOrder.value.Nombre_Cliente}.'
    successSnackbar.value = true
    console.log('Response data:', response.data)
  } catch (error) {
    errorMessage.value =
      'Error usando la garantía: ' + (error.response?.data?.message || error.message)
    errorSnackbar.value = true
    console.error('Error usando la garantía:', error)
  }
}

const realizarPago = async () => {
  try {
    const response = await apiClient.post('pagofisico', {
      id_detalle_fisico: selectedOrder.value.id_detalle_fisico,
      cliente: selectedOrder.value.Nombre_Cliente
    })
    successMessage.value =
      'Pago realizado exitosamente para el cliente ${selectedOrder.value.Nombre_Cliente}.'
    successSnackbar.value = true
    console.log('Response data:', response.data)
  } catch (error) {
    errorMessage.value =
      'Error realizando el pago: ' + (error.response?.data?.message || error.message)
    errorSnackbar.value = true
    console.error('Error realizando el pago:', error)
  }
}

const marcarEntregado = async () => {
  try {
    const response = await apiClient.post('entregafisico', {
      id_detalle_fisico: selectedOrder.value.id_detalle_fisico,
      cliente: selectedOrder.value.Nombre_Cliente
    })
    successMessage.value =
      'Orden marcada como entregada para el cliente ${selectedOrder.value.Nombre_Cliente}.'
    successSnackbar.value = true
    console.log('Response data:', response.data)
  } catch (error) {
    errorMessage.value =
      'Error marcando como entregado: ' + (error.response?.data?.message || error.message)
    errorSnackbar.value = true
    console.error('Error marcando como entregado:', error)
  }
}
</script>

<style scoped>
.my-input-class {
  background-color: #f9f9f9;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  color: #333333;
}

.my-card {
  background-color: #E0E0E0;
  border: 1px solid #d1d1d1;
}

.efecto-titulo {
  color: #34495E;
  font-family: 'Calibre', sans-serif;
}

.table-container {
  max-height: 200px; /* Ajuste de altura para el contenedor de la tabla */
  overflow-y: auto;
}

.custom-table th,
.custom-table td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd; /* Añade bordes a las celdas */
}

.custom-table th {
  background-color: #BDC3C7; /* Color de fondo para el encabezado */
  color: #fff; /* Color de texto para el encabezado */
}

.selected-row {
  background-color: rgba(206, 200, 200, 0.258);
}

.additional-component-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #ffffff; /* Fondo blanco para el contenedor del componente adicional */
  border-radius: 4px;
  border: 1px solid #d1d1d1;
}

.custom-btn {
  background-color: #ffad00;
  color: #ffffff;
  margin-left: 8px;
  border-radius: 4px;
  transition: background-color 0.5s ease;
}

.custom-btn:hover {
  background-color: #e69700;
}
</style>
