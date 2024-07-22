<template>
  <v-container>
    <v-card
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl my-card"
    >
      <v-card-title>
        <v-flex class="flex-col space-y-1.5 p-6">
          <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Citas en linea
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
                prepend-icon="mdi-calendar"
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
        <v-data-table
          :headers="headers"
          :items="filteredOrders"
          item-key="id_persona"
          dense
          class="elevation-1 v-data-table"
          style="width: 100%; max-width: 100%; overflow-x: auto"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.fecha_cita }}</td>
              <td>{{ item.fecha_hora }}</td>
              <td>{{ item.producto }}</td>
              <td>{{ item.problema }}</td>
              <td>{{ item.nombre_cliente }}</td>
              <td>{{ item.nombre_tecnico }}</td>
              <td>{{ item.estatus_cita }}</td>
              <td>{{ item.fecha_registro }}</td>
            </tr>
          </template>

          <template v-slot:column="{ column }">
            <th>{{ column.text }}</th>
          </template>

          <template v-slot:footer>
            <div class="d-flex justify-end">
              <v-pagination
                v-model:page="page"
                :length="numberOfPages"
                :total-visible="7"
                @input="loadItems"
              ></v-pagination>
            </div>
            <div class="mt-2 text-center">
              Mostrando {{ startItem }}-{{ endItem }} de {{ totalItems }} elementos.
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
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

const headers = [
  { text: 'Fecha Cita', value: 'fecha_cita' },
  { text: 'Fecha Hora', value: 'fecha_hora' },
  { text: 'Producto', value: 'producto' },
  { text: 'Problema', value: 'problema' },
  { text: 'Nombre Cliente', value: 'nombre_cliente' },
  { text: 'Nombre Técnico', value: 'nombre_tecnico' },
  { text: 'Estatus Cita', value: 'estatus_cita' },
  { text: 'fecha_registro', value: 'fecha_registro' }
]

const fetchData = async () => {
  try {
    const { date, clientName, technicianName } = filters.value
    const response = await axios.get('http://hs.com/Models/detalleServicioadmin.php', {
      params: {
        date,
        client_name: clientName,
        technician_name: technicianName
      }
    })

    console.log('API response:', response.data) // Verifica el formato de la respuesta
    orders.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

onMounted(fetchData)

const filteredOrders = computed(() => {
  if (!Array.isArray(orders.value)) {
    console.error('orders.value is not an array:', orders.value)
    return []
  }

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
</script>

<style scoped>
.my-input-class {
  background-color: #f9f9f9; /* Gris claro para los inputs */
  border: 1px solid #d1d1d1; /* Borde gris medio */
  border-radius: 4px;
  color: #333333; /* Texto gris oscuro */
}

.my-card {
  background-color: #f7f7f7; /* Gris muy claro */
  border: 1px solid #d1d1d1; /* Borde gris medio */
}

.v-data-table {
  width: 100%;
}

.v-data-table th,
.v-data-table td {
  text-align: left;
  padding: 8px;
}

.v-data-table th {
  background-color: #e0e0e0; /* Gris claro para los encabezados */
}
/* Oculta el texto "Items per page" y el selector de número de items por página */
.v-data-table .v-data-table__pagination .v-select__selections {
  display: none;
}

/* Opción alternativa: Ocultar sólo el texto y mantener el selector visible */
.v-data-table .v-data-table__pagination .v-select__selections::before {
  content: ' ';
  display: none;
}
</style>
