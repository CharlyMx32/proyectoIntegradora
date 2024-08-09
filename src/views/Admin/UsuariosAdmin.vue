<template>
  <v-container>
    <!-- Tarjeta principal -->
    <v-card
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl my-card"
    >
      <v-card-title>
        <div class="flex-col space-y-1.5 p-6">
          <h3
            class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight title-text"
          >
            Citas en línea
          </h3>
        </div>
      </v-card-title>

      <v-card-text class="p-6 space-y-6">
        <v-form @submit.prevent="fetchData" class="mb-4 v-form">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="filters.nombre"
                label="Nombre del Usuario"
                placeholder="Ingrese el nombre del usuario"
              />
            </v-col>
          </v-row>
        </v-form>

        <!-- Tabla de datos -->
        <div class="table-container">
          <v-table density="compact">
            <thead>
              <tr>
                <th class="text-left">Nombre Usuario</th>
                <th class="text-left">Correo</th>
                <th class="text-left">Rol</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in filteredOrders"
                :key="item.id"
                :class="{ 'selected-row': selectedOrder && selectedOrder.id === item.id }"
                @click="selectOrder(item)"
              >
                <td>{{ item.nombre }}</td>
                <td>{{ item.correo }}</td>
                <td>{{ item.rol }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <!-- Botones para acciones adicionales -->
        <div v-if="selectedOrder" class="button-container">
          <v-btn @click="showDetailModal = true" style="background-color: #ffad00; color: white">
            Ver Detalles
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Modal de Detalles -->
    <v-dialog v-model="showDetailModal" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Detalles del Usuario</span>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Nombre:</v-list-item-title>
                <v-list-item-subtitle>{{ selectedOrder.nombre }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Correo:</v-list-item-title>
                <v-list-item-subtitle>{{ selectedOrder.correo }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Rol:</v-list-item-title>
                <v-select v-model="selectedOrder.rol" :items="roles" label="Seleccione un rol" />
              </v-list-item-content>
            </v-list-item>

            <!-- Añadir más campos si es necesario -->
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="showDetailModal = false"> Cerrar </v-btn>
          <v-btn color="primary" @click="updateUserRole"> Guardar Cambios </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])
const filters = ref({ nombre: '' })
const selectedOrder = ref(null)
const showDetailModal = ref(false)
const roles = ref(['Admin', 'Cliente', 'Recepcionista', 'Tecnico']) // Los roles disponibles

const fetchData = async () => {
  try {
    const { nombre } = filters.value
    const response = await axios.get('http://hs.com/TU', { params: { nombre } })
    console.log('Data fetched:', response.data)
    orders.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    return order.nombre.toLowerCase().includes(filters.value.nombre.toLowerCase())
  })
})

onMounted(() => {
  fetchData()
})

const selectOrder = (order) => {
  console.log('Order selected:', order)
  selectedOrder.value = order
  showDetailModal.value = true
}

const updateUserRole = async () => {
  try {
    const { id, rol } = selectedOrder.value
    await axios.post('http://hs.com/RolCambio', { id, rol })
    console.log('User role updated:', { id, rol })
    showDetailModal.value = false
    // Puedes actualizar la lista de pedidos si es necesario
  } catch (error) {
    console.error('Error updating user role:', error)
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
  background-color: rgba(0, 38, 255, 0.658);
}

.title-text {
  color: #0800ff;
}
</style>
