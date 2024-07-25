<template>
  <v-container>
    <v-card
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl my-card"
    >
      <v-card-title>
        <v-flex class="flex-col space-y-1.5 p-6">
          <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Citas en línea
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
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="filters.technicianName"
                label="Nombre del Técnico"
                placeholder="Ingrese el nombre del técnico"
                outlined
                class="my-input-class"
                dense
                full-width
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="filters.date"
                label="Fecha"
                placeholder="Ingrese la fecha"
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
          <v-data-table :headers="headers" :items="filteredOrders" item-key="id_orden_cita">
            <template v-slot:item="{ item }">
              <tr
                :class="{
                  'selected-row':
                    selectedOrder && selectedOrder.id_orden_cita === item.id_orden_cita
                }"
                @click="selectOrder(item)"
              >
                <td>{{ item.diaHora }}</td>
                <td>{{ item.producto }}</td>
                <td>{{ item.problema }}</td>
                <td>{{ item.nombre_cliente }}</td>
                <td>{{ item.nombre_tecnico }}</td>
                <td>{{ item.estatus_cita }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>

    <!-- Componente adicional -->
    <div v-if="selectedOrder" class="additional-component-container">
      <!-- Aquí colocas el contenido del componente adicional -->
      <p>Detalles de la cita seleccionada:</p>
      <p>ID: {{ selectedOrder.id_orden_cita }}</p>
      <p>Fecha Cita: {{ selectedOrder.fecha_cita }}</p>
      <!-- Agrega más detalles según sea necesario -->
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])
const filters = ref({
  date: '',
  clientName: '',
  technicianName: ''
})
const selectedOrder = ref(null)

const headers = [
  { text: 'Fecha Cita', value: 'diaHora' },
  { text: 'Producto', value: 'producto' },
  { text: 'Problema', value: 'problema' },
  { text: 'Nombre Cliente', value: 'nombre_cliente' },
  { text: 'Nombre Técnico', value: 'nombre_tecnico' },
  { text: 'Estatus Cita', value: 'estatus_cita' }
]

const fetchData = async () => {
  try {
    const { date, clientName, technicianName } = filters.value
    const response = await axios.get('http://hs.com/DSA', {
      params: {
        date,
        client_name: clientName,
        technician_name: technicianName
      }
    })

    orders.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

onMounted(fetchData)

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesClient = order.nombre_cliente
      .toLowerCase()
      .includes(filters.value.clientName.toLowerCase())
    const matchesTechnician = order.nombre_tecnico
      .toLowerCase()
      .includes(filters.value.technicianName.toLowerCase())
    const matchesDate = !filters.value.date || order.fecha_cita === filters.value.date
    return matchesClient && matchesTechnician && matchesDate
  })
})

const selectOrder = (order) => {
  selectedOrder.value = order
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
  max-height: 200px; /* Ajuste de altura para el v-data-table */
  overflow-y: auto;
}

.v-data-table th,
.v-data-table td {
  text-align: left;
  padding: 8px;
}

.v-data-table th {
  background-color: #e0e0e0;
}

.selected-row {
  background-color: rgba(0, 179, 136, 0.2); /* Verde claro y semi-transparente */
}

.additional-component-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #e8f5e9; /* Fondo verde claro para el contenedor del componente adicional */
  border: 1px solid #c8e6c9;
  border-radius: 4px;
}
</style>
