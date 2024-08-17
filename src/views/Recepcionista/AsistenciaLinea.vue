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
            ASISTENCIA CITA
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
          <v-table density="compact">
            <thead>
              <tr>
                <th class="text-left">Nombre Cliente</th>
                <th class="text-left">Fecha</th>
                <th class="text-left">Hora</th>
                <th class="text-left">Producto</th>
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
                <td>{{ item.Fecha }}</td>
                <td>{{ item.Hora }}</td>
                <td>{{ item.Producto }}</td>
              </tr>
            </tbody>
          </v-table>
          <div>
            <v-btn @click="markAsAttended">ASISTIÓ</v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      top
      right
    >
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.visible = false"
        >
          Cerrar
        </v-btn>
      </template>
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

const snackbar = ref({
  visible: false,
  message: '',
  color: '',
});

const fetchData = async () => {
  try {
    const { clientName } = filters.value
    const response = await apiClient.get('AsistenciaCitas', {
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

const filteredOrders = computed(() => {
  return orders.value.filter((order) =>
    order.Nombre_Cliente.toLowerCase().includes(filters.value.clientName.toLowerCase())
  )
})

const selectOrder = (order) => {
  selectedOrder.value = order
}

const markAsAttended = async () => {
  if (!selectedOrder.value) {
    snackbar.value = {
      visible: true,
      message: 'Por favor seleccione una orden de cita.',
      color: 'red',
    };
    return;

  }

  try {
    await apiClient.post('asistencia', {
      id_orden_cita: selectedOrder.value.id_orden_cita
    });
    snackbar.value = {
      visible: true,
      message: `El cliente ${selectedOrder.value.Nombre_Cliente} ha asistido a la cita.`,
      color: 'green',
    };
    fetchData(); // Refresca la lista de órdenes después de marcar la asistencia
  } catch (error) {
    console.error('Error marcando la asistencia:', error);
    snackbar.value = {
      visible: true,
      message: 'Error al marcar la asistencia. Por favor, inténtelo de nuevo.',
      color: 'red',
    };
  }
};

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
  max-height: 400px; 
  overflow-y: auto;
}

.v-table th,
.v-table td {
  text-align: left;
  padding: 8px;
}

.v-table th {
  background-color: #BDC3C7;
  color: #fff;
}

.selected-row {
  background-color: rgba(46, 61, 151, 0.2); 
}

.additional-component-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #ffffff; 
  border-radius: 4px;
  border: 1px solid #d1d1d1;
}

.v-btn {
  background-color: #34495E;
  color: #ffffff;
  margin-left: 8px;
  border-radius: 4px;
  transition: background-color 0.5s ease;
}

.v-btn:hover {
  background-color: #e69700;
}
</style>
