<template>
  <v-container>
    <v-card
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl my-card"
    >
      <v-card-title>
        <v-flex class="flex-col space-y-1.5 p-6">
          <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight title-text">
            Citas en línea
          </h3>
        </v-flex>
      </v-card-title>
      <v-card-text class="p-6 space-y-6">
        <v-form @submit.prevent="fetchData" class="mb-4 v-form">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="filters.clientName"
                label="Nombre del Cliente"
                placeholder="Ingrese el nombre del cliente"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="filters.technicianName"
                label="Nombre del Técnico"
                placeholder="Ingrese el nombre del técnico"
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
                <th class="text-left">Problema</th>
                <th class="text-left">Fecha Cita</th>
                <th class="text-left">Nombre Técnico</th>
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
                <td>{{ item.nombre_cliente }}</td>
                <td>{{ item.producto }}</td>
                <td>{{ item.problema }}</td>
                <td>{{ item.diaHora }}</td>
                <td>{{ item.nombre_tecnico }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <!-- Botones para asignar técnico y ver detalles -->
        <div v-if="selectedOrder" class="button-container">
          <v-btn
            v-if="selectedOrder.nombre_tecnico === 'Sin Asignar'"
            @click="showTechnicianTable = true"
            class="mr-2"
            style="background-color: #FFAD00; color: white;"
          >
            Asignar Técnico
          </v-btn>
          <v-btn
            v-if="selectedOrder.nombre_tecnico === 'Sin Asignar'"
            @click="showDetailModal = true"
            style="background-color: #FFAD00; color: white;"
          >
            Ver Detalles
          </v-btn>
          <v-btn
            v-else
            @click="showDetailModal = true"
            style="background-color: #FFAD00; color: white;"
          >
            Ver Detalles
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Componente adicional solo se muestra si el técnico está "Sin asignar" -->
    <v-card
      v-if="showTechnicianTable"
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl my-card mt-4"
    >
      <v-card-title>
        <h4 class="text-h5 title-text">Técnicos</h4>
      </v-card-title>
      <v-card-text>
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">Técnico</th>
              <th class="text-left">Tipo de Técnico</th>
              <th class="text-left">Cantidad de citas</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in technicianDetails"
              :key="item.id_tecnico"
              :class="{
                'selected-row':
                  selectedTechnician && selectedTechnician.id_tecnico === item.id_tecnico
              }"
              @click="selectTechnician(item)"
            >
              <td>{{ item.Tecnico }}</td>
              <td>{{ item.tipo_tecnico }}</td>
              <td>{{ item.cantidad_citas_asignada }}</td>
            </tr>
          </tbody>
        </v-table>
        <div v-if="selectedTechnician" class="mt-4">
          <v-btn
            @click="assignTechnician"
            style="background-color: #FFAD00; color: white;"
          >
            Asignar
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Modal para mostrar más detalles de la cita -->
    <v-dialog v-model="showDetailModal" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5 title-text">Detalles de la Cita</span>
        </v-card-title>
        <v-card-text>
          <!-- Aquí puedes agregar más detalles de la cita -->
          <div v-if="selectedOrder">
            <p><strong>Nombre Cliente:</strong> {{ selectedOrder.nombre_cliente }}</p>
            <p><strong>Producto:</strong> {{ selectedOrder.producto }}</p>
            <p><strong>Problema:</strong> {{ selectedOrder.problema }}</p>
            <p><strong>Fecha Cita:</strong> {{ selectedOrder.diaHora }}</p>
            <p><strong>Nombre Técnico:</strong> {{ selectedOrder.nombre_tecnico }}</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="showDetailModal = false"
            style="background-color: #FFAD00; color: white;"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])
const filters = ref({
  clientName: '',
  technicianName: ''
})
const selectedOrder = ref(null)
const selectedTechnician = ref(null) // Técnico seleccionado
const technicianDetails = ref([])
const showTechnicianTable = ref(false)
const showDetailModal = ref(false)

const fetchData = async () => {
  try {
    const { clientName, technicianName } = filters.value
    const response = await axios.get('http://hs.com/DSA', {
      params: {
        client_name: clientName,
        technician_name: technicianName
      }
    })
    orders.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

const fetchTechnicianDetails = async () => {
  try {
    const response = await axios.get('http://hs.com/citasTecnico')
    technicianDetails.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error fetching technician details:', error)
  }
}

onMounted(() => {
  fetchData()
  fetchTechnicianDetails()
})

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

// Función para seleccionar una orden
const selectOrder = (order) => {
  selectedOrder.value = order
  showTechnicianTable.value = false
  showDetailModal.value = false
}

// Función para seleccionar un técnico
const selectTechnician = (technician) => {
  selectedTechnician.value = technician
}

// Función para asignar un técnico a una orden
const assignTechnician = async () => {
  try {
    const orderId = selectedOrder.value?.id_orden_cita
    const technicianId = selectedTechnician.value?.id_tecnico

    if (!orderId || !technicianId) {
      console.error('Missing orderId or technicianId:', { orderId, technicianId })
      return
    }

    console.log('Assigning technician:', { orderId, technicianId })

    const response = await axios.post('http://hs.com/ATL', {
      orderId,
      technicianId
    })

    console.log('Server response:', response.data)

    if (response.data.status === 'success') {
      console.log('Technician assigned successfully')
      await fetchData()
      showTechnicianTable.value = false
      selectedOrder.value = null
      selectedTechnician.value = null
    } else {
      console.error('Error:', response.data.message)
    }
  } catch (error) {
    console.error('Error assigning technician:', error)
  }
}
</script>

<style scoped>
.my-card {
  background-color: #f7f7f7;
  border: 1px solid #d1d1d1;
}

.table-container {
  max-height: 200px;
  overflow-y: auto;
  padding-top: 0px;
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
  background-color: rgba(46, 61, 151, 0.2);
}

.additional-component-container {
  margin-top: 10px;
  padding: 10px;
  background-color: #f7f7f7;
  border: 1px solid #c8e6c9;
  border-radius: 4px;
}

.button-container {
  display: flex;
  align-items: center;
  padding-top: 15px;
}

.mt-4 {
  margin-top: 16px;
}

.v-dialog .v-card {
  border-radius: 8px;
}

.title-text {
  color: #0800FF;
}
</style>
