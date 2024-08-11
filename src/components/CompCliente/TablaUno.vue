<template>
  <v-card class="mb-6 custom-card" outlined>
    <v-card-title>
      <v-row justify="space-between" align="center" class="w-100">
        <v-col>
          <h3 class="title">Por pagar</h3>
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
              <th class="text-left">Problema</th>
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
              <td>{{ item.problema }}</td>
            </tr>
            <tr v-if="!filteredItems.length">
              <td colspan="2" class="text-center py-4">No tienes pagos pendientes.</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="openDialog" color="#ffffff" class="custom-btn">Ir a pagar</v-btn>
    </v-card-actions>
  </v-card>

  <!-- Dialog for item details -->
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Detalles</span>
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="itemDetails.cambios" label="Cambios" readonly></v-text-field>
            <v-text-field
              v-model="itemDetails.costoChequeo"
              label="Costo de Chequeo"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="itemDetails.costoReparacion"
              label="Costo de Reparación"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="itemDetails.diagnostico"
              label="Diagnóstico"
              readonly
            ></v-text-field>
            <!-- Añade más campos de detalle aquí si es necesario -->
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn text @click="closeDialog">Pagar</v-btn>
        <v-btn text @click="closeDialog">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import apiCliente from '@/axiosconf'

const localFilterText = ref('')
const filteredItems = ref([])
const selectedItem = ref(null)
const dialog = ref(false)
const itemDetails = ref({
  producto: '',
  problema: '',
  costoChequeo: '',
  costoReparacion: '',
  diagnostico: ''
})

const fetchItems = async () => {
  try {
    const token = localStorage.getItem('token') // Obtén el token almacenado
    const response = await apiCliente.post(
      `ClienteCitas`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    filteredItems.value = response.data.data.citas // Asigna los datos a `filteredItems`
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

onMounted(fetchItems) // Llama a fetchItems cuando el componente se monta

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
      diagnostico: selectedItem.value.diagnostico
    }
    dialog.value = true
  } else {
    console.warn('No item selected')
  }
}

const closeDialog = () => {
  dialog.value = false
}
</script>

<style scoped>
.custom-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  color: rgb(8, 0, 255);
  font-size: 24px;
  font-weight: bold;
}

.table-container {
  max-height: 400px; /* Ajusta la altura según tus necesidades */
  overflow-y: auto; /* Agrega scroll vertical si el contenido excede la altura */
  overflow-x: hidden; /* Opcional: Oculta el scroll horizontal si no es necesario */
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table thead {
  background-color: #f5f5f5;
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
  background-color: #2196f3;
  color: #ffffff;
}

.custom-btn:hover {
  background-color: #1976d2;
}

.v-dialog .v-card {
  padding: 16px;
}
</style>
