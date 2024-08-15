<template>
  <!-- Tabla de citas -->
  <v-card class="mb-6 custom-card" outlined>
    <v-card-title>
      <v-row justify="space-between" align="center" class="w-100">
        <v-col>
          <h3 class="title">En Proceso</h3>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-text-field
            v-model="localFilterText"
            label="Buscar"
            outlined
            dense
            hide-details
            class="filter-field"
            prepend-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <div class="table-container">
        <v-simple-table dense class="custom-table">
          <thead>
            <tr>
              <th class="text-left">Producto</th>
              <th class="text-left">Seguimiento</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in filteredItems"
              :key="'asignadas_' + idx"
              :class="{ 'selected-row': selectedItem === item }"
              @click="selectItem(item)"
            >
              <td>{{ item.producto }}</td>
              <td>{{ item.seguimiento }}</td>
            </tr>
            <tr v-if="!filteredItems.length">
              <td colspan="2" class="text-center py-4">No tienes citas en proceso.</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="openDialog" color="#ffffff" class="custom-btn">Ver Detalles</v-btn>
    </v-card-actions>
  </v-card>

  <!-- Dialogo para ver detalles -->
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline title">Detalles de la Cita</span>
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <div class="detail-item"><strong>Producto:</strong> {{ itemDetails.producto }}</div>
            <div class="detail-item"><strong>Problema:</strong> {{ itemDetails.problema }}</div>
            <div class="detail-item">
              <strong>Costo de Chequeo:</strong> {{ itemDetails.costoChequeo }}
            </div>
            <div class="detail-item">
              <strong>Costo de Reparación:</strong> {{ itemDetails.costoReparacion }}
            </div>
            <div class="detail-item"><strong>Total:</strong> {{ itemDetails.total }}</div>
            <div class="detail-item">
              <strong>Tiempo Garantía:</strong> {{ itemDetails.tiempoGarantia }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="detail-item">
              <strong>Diagnóstico:</strong> {{ itemDetails.diagnostico }}
            </div>
            <div class="detail-item">
              <strong>Uso Garantía:</strong> {{ itemDetails.usoGarantia }}
            </div>
            <div class="detail-item">
              <strong>Estado del Pago:</strong> {{ itemDetails.estadoDelPago }}
            </div>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn text @click="closeDialog">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Snackbar -->
  <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="3000">
    {{ snackbar.message }}
    <v-btn text @click="snackbar.visible = false">Cerrar</v-btn>
  </v-snackbar>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import apiCliente from '@/axiosconf'

const localFilterText = ref('')
const items = ref([]) // Almacena las citas
const selectedItem = ref(null) // Almacena la cita seleccionada
const snackbar = ref({ visible: false, message: '', color: 'error' })
const dialog = ref(false)
const itemDetails = ref({
  producto: '',
  problema: '',
  costoChequeo: '',
  costoReparacion: '',
  total: '',
  tiempoGarantia: '',
  diagnostico: '',
  usoGarantia: '',
  estadoDelPago: ''
})

const fetchItems = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiCliente.post(
      `ClienteCitasProceso`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    items.value = response.data.data.citas // Asigna correctamente las citas obtenidas
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

const filteredItems = computed(() => {
  return items.value.filter(
    (item) =>
      item.producto.toLowerCase().includes(localFilterText.value.toLowerCase()) ||
      item.seguimiento.toLowerCase().includes(localFilterText.value.toLowerCase())
  )
})

const selectItem = (item) => {
  selectedItem.value = item
}

const openDialog = () => {
  if (selectedItem.value) {
    itemDetails.value = {
      producto: selectedItem.value.producto,
      problema: selectedItem.value.problema,
      costoChequeo: selectedItem.value.costo_chequeo,
      costoReparacion: selectedItem.value.costo_reparacion,
      total: selectedItem.value.total,
      tiempoGarantia: selectedItem.value.tiempo_garantia,
      diagnostico: selectedItem.value.diagnostico_linea,
      usoGarantia: selectedItem.value.uso_garantia,
      estadoDelPago: selectedItem.value.estado_del_pago
    }
    dialog.value = true
  } else {
    snackbar.value = { visible: true, message: 'Primero selecciona una cita.', color: 'error' }
  }
}

const closeDialog = () => {
  dialog.value = false
}

onMounted(fetchItems) // Llama a fetchItems cuando el componente se monta
</script>

<style scoped>
.custom-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  color: #FFC30B;
  font-size: 24px;
  font-weight: bold;
}

.table-container {
  max-height: 400px; /* Ajusta esta altura según tus necesidades */
  overflow-y: auto; /* Agrega scroll vertical si el contenido excede la altura */
  overflow-x: hidden; /* Evita el scroll horizontal */
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table thead {
  background-color: #E8E8E8;
}

.custom-table th,
.custom-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.custom-table tbody tr:hover {
  background-color: #f0f0f0;
}

.selected-row {
  background-color: #e3f2fd;
}

.filter-field {
  max-width: 300px;
}

.custom-btn {
  background-color:  #ffad00;
  color: #ffffff;
}

.custom-btn:hover {
  background-color: #1976d2;
}

.detail-item {
  margin-bottom: 10px;
}
</style>
