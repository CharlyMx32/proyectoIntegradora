<template>
  <v-card class="mb-6" outlined>
    <!-- Título y barra de búsqueda -->
    <v-card-title>
      <v-row justify="space-between" align="center" class="w-100">
        <v-col>
          <h3 class="mb-0" style="color: #0800ff">Tareas Asignadas</h3>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-text-field
            v-model="filterText"
            label="Buscar Tareas Asignadas"
            outlined
            dense
            hide-details
            class="filter-field"
            prepend-icon="mdi-magnify"
            @input="filterText = filterText.replace(/[^a-zA-Z\s]/g, '')"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>

    <!-- Tabla de tareas asignadas -->
    <v-card-text>
      <div class="table-container">
        <v-simple-table dense class="custom-table">
          <thead>
            <tr>
              <th class="text-left">Nombre Cliente</th>
              <th class="text-left">Producto</th>
              <th class="text-left">Problema</th>
              <th class="text-left">Tipo de Orden</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in filteredItems"
              :key="'asignadas_' + idx"
              :class="{ 'selected-row': selectedItem === item }"
              @click="selectItem(item)"
            >
              <td>{{ item.nombre_cliente }}</td>
              <td>{{ item.producto }}</td>
              <td>{{ item.problema }}</td>
              <td>{{ item.tipo_orden }}</td>
            </tr>
            <tr v-if="!filteredItems.length">
              <td colspan="4" class="text-center py-4">
                No se encontraron tareas que coincidan con el filtro.
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-card-text>

    <!-- Botón de acciones -->
    <v-card-actions class="justify-end">
      <v-btn @click="openDetailDialog" color="white" class="custom-btn">Detallar</v-btn>
    </v-card-actions>

    <!-- Modal para Detalles -->
    <v-dialog v-model="showDetailDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Detalles del Item</span>
        </v-card-title>
        <v-card-subtitle>
          <v-text-field v-model="nuevosDatos.cambios" label="Cambios"></v-text-field>
          <v-text-field v-model="nuevosDatos.costoChequeo" label="Costo de Chequeo"></v-text-field>
          <v-text-field
            v-model="nuevosDatos.costoReparacion"
            label="Costo de Reparación"
          ></v-text-field>
          <v-text-field v-model="nuevosDatos.diagnostico" label="Diagnóstico"></v-text-field>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn @click="saveDetails" color="primary">
            <v-icon left>mdi-content-save</v-icon>
            Guardar Datos
          </v-btn>
          <v-btn @click="closeDetailDialog" color="secondary">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore' // Importar la store

const store = useAuthStore() // Acceder a la store

const filterText = ref('')
const selectedItem = ref(null)
const showDetailDialog = ref(false)
const nuevosDatos = ref({
  cambios: '',
  costoChequeo: '',
  costoReparacion: '',
  diagnostico: ''
})
const tareasAsignadas = ref([]) // Inicializar como array vacío

// Cargar las tareas asignadas al técnico en el montaje del componente
const cargarTareasAsignadas = async () => {
  try {
    const response = await axios.get('/tareas_asignadas', {
      headers: {
        Authorization: `Bearer ${store.token}`
      }
    })
    // Verifica si la respuesta es un array antes de asignarla
    if (Array.isArray(response.data)) {
      tareasAsignadas.value = response.data
    } else {
      console.error('La respuesta no es un array:', response.data)
      tareasAsignadas.value = [] // O manejar el error de forma apropiada
    }
  } catch (error) {
    console.error('Error al cargar las tareas asignadas:', error)
    tareasAsignadas.value = [] // Asignar un array vacío en caso de error
  }
}

onMounted(() => {
  cargarTareasAsignadas()
})

const filteredItems = computed(() => {
  const filter = filterText.value.toLowerCase()
  return tareasAsignadas.value.filter(
    (item) =>
      item.nombre_cliente.toLowerCase().includes(filter) ||
      item.producto.toLowerCase().includes(filter) ||
      item.problema.toLowerCase().includes(filter) ||
      item.tipo_orden.toLowerCase().includes(filter)
  )
})

const selectItem = (item) => {
  selectedItem.value = item
}

const openDetailDialog = () => {
  if (selectedItem.value) {
    showDetailDialog.value = true
    nuevosDatos.value = {
      cambios: '',
      costoChequeo: '',
      costoReparacion: '',
      diagnostico: ''
    }
  }
}

const closeDetailDialog = () => {
  showDetailDialog.value = false
}

const saveDetails = async () => {
  if (selectedItem.value) {
    try {
      await axios.post('/TECorden', {
        item: selectedItem.value,
        datos: nuevosDatos.value
      })
      alert('Datos guardados exitosamente.')
      closeDetailDialog()
    } catch (error) {
      console.error('Error al guardar los detalles:', error)
      alert('Hubo un problema al guardar los detalles.')
    }
  }
}
</script>

<style scoped>
.table-container {
  max-height: 400px;
  overflow-y: auto;
}

.custom-table th,
.custom-table td {
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.custom-table th {
  background-color: #f5f5f5;
  color: #333;
}

.custom-table tr.selected-row {
  background-color: #d0e8ff;
}

.custom-table tbody tr:hover {
  background-color: #f0faff;
  cursor: pointer;
}

.text-left {
  text-align: left;
}
</style>
