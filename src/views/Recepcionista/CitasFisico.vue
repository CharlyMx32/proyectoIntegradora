<template>
  <v-container>
    <v-card
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl my-card"
    >
      <v-card-title>
        <v-flex class="flex-col space-y-1.5 p-6">
          <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Citas Fisico
          </h3>
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
          <v-table density="compact">
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
                :key="item.id_orden_cita"
                :class="{
                  'selected-row':
                    selectedOrder && selectedOrder.id_orden_cita === item.id_orden_cita
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
      <!-- Aquí colocas el contenido del componente adicional -->
      <p>Detalles de la cita seleccionada:</p>
      <p>Nombre Cliente: {{ selectedOrder.Nombre_Cliente }}</p>
      <p>Contacto Cliente: {{ selectedOrder.Contacto }}</p>
      <p>Producto: {{ selectedOrder.Producto }}</p>
      <p>Costo Chequeo: {{ selectedOrder.CostoChequeo }}</p>
      <p>Costo Reparacion: {{ selectedOrder.CostoReparacion }}</p>
      <p>Costo Total: {{ selectedOrder.CostoTotal }}</p>
      <p>Pago: {{ selectedOrder.Pago }}</p>
      <p>Garantia: {{ selectedOrder.Uso_Garantia }}</p>
      <v-btn @click="usarGarantia" color="primary">USAR GARANTÍA</v-btn>
      <v-btn @click="realizarPago" color="secondary">PAGO</v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])
const filters = ref({
  clientName: '',
})
const selectedOrder = ref(null)

const fetchData = async () => {
  try {
    const { clientName } = filters.value
    const response = await axios.get('http://hs.com/CitasFisico', {
      params: {
        client_name: clientName,
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
  return orders.value.filter(order =>
    order.Nombre_Cliente.toLowerCase().includes(filters.value.clientName.toLowerCase())
  )
})

const selectOrder = (order) => {
  selectedOrder.value = order
}

const usarGarantia = () => {
  alert(`Uso la garantia el cliente ${selectedOrder.value.Nombre_Cliente}.`)
  // Aquí puedes agregar la lógica para usar la garantía
}

const realizarPago = () => {
  alert(`Se realizo el pago del cliente ${selectedOrder.value.Nombre_Cliente}.`)
  // Aquí puedes agregar la lógica para realizar el pago
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
  background-color: #f7f7f7;
  border: 1px solid #d1d1d1;
}

.table-container {
  max-height: 200px; /* Ajuste de altura para el contenedor de la tabla */
  overflow-y: auto;
}

.v-table th,
.v-table td {
  text-align: left;
  padding: 8px;
}

.v-table th {
  background-color: #49a3f8;
}

.selected-row {
  background-color: rgba(46, 61, 151, 0.2); /* Verde claro y semi-transparente */
}

.additional-component-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #3961da; /* Fondo verde claro para el contenedor del componente adicional */
  border: 1px solid #c8e6c9;
  border-radius: 4px;
}
.v-btn {
  background-image: linear-gradient(to right, #1a2980 0%, #26d0ce 51%, #1a2980 100%);
  color: #ffffff; /* Texto blanco */
  margin-left: 8px;
  border-radius: 4px;
  transition: background-position 0.5s ease;
  background-size: 200% auto;
}

.v-btn:hover {
  background-position: right center; /* Cambia el fondo al hacer hover */
  color: #ffffff; /* Texto blanco */
}
</style>
