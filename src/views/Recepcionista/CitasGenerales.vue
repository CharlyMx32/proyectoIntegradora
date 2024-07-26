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
          </v-row>
        </v-form>

        <!-- Tabla de datos - Asignación Física -->
        <h4>Asignación Física</h4>
        <div class="table-container">
          <v-data-table :headers="headers" :items="filteredPhysicalOrders" item-key="id_asignacion_fisica">
            <template v-slot:item="{ item }">
              <tr
                :class="{
                  'selected-row': selectedOrder && selectedOrder.id_asignacion_fisica === item.id_asignacion_fisica
                }"
                @click="selectOrder(item)"
              >
                <td>{{ item.Tipo_Asignacion }}</td>
                <td>{{ item.NombreCliente }}</td>
                <td>{{ item.Producto }}</td>
                <td>{{ item.Uso_Garantia }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>

        <!-- Tabla de datos - Asignación en Línea -->
        <h4>Asignación en Línea</h4>
        <div class="table-container">
          <v-data-table :headers="headers" :items="filteredLineOrders" item-key="id_asignacion_linea">
            <template v-slot:item="{ item }">
              <tr
                :class="{
                  'selected-row': selectedOrder && selectedOrder.id_asignacion_linea === item.id_asignacion_linea
                }"
                @click="selectOrder(item)"
              >
                <td>{{ item.Tipo_Asignacion }}</td>
                <td>{{ item.NombreCliente }}</td>
                <td>{{ item.Producto }}</td>
                <td>{{ item.Uso_Garantia }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>

    <!-- Componente adicional -->
    <div v-if="selectedOrder" class="additional-component-container">
     <h1>hola</h1>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])
const filters = ref({
  clientName: ''
})
const selectedOrder = ref(null)

const headers = [
  { text: 'Tipo Cliente', value: 'Tipo_Asignacion' },
  { text: 'Cliente', value: 'NombreCliente' },
  { text: 'Producto', value: 'Producto' },
  { text: 'Garantia', value: 'Uso_Garantia' }
]

const fetchData = async () => {
  try {
    const { clientName } = filters.value
    const response = await axios.get('http://hs.com/AsignacionLinea', {
      params: {
        client_name: clientName
      }
    })

    orders.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}


onMounted(fetchData)

const filteredPhysicalOrders = computed(() => {
  return orders.value.filter((order) => order.id_asignacion_fisica && (!filters.value.clientName || order.NombreCliente.toLowerCase().includes(filters.value.clientName.toLowerCase())));
});

const filteredLineOrders = computed(() => {
  return orders.value.filter((order) => order.id_asignacion_linea && (!filters.value.clientName || order.NombreCliente.toLowerCase().includes(filters.value.clientName.toLowerCase())));
});

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
