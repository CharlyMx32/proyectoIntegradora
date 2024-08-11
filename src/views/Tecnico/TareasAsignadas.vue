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
              <th class="text-left">Cliente</th>
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
      <v-btn @click="openDetailDialog" color="primary"> Detallar </v-btn>
    </v-card-actions>

    <!-- Modal para Detalles -->
    <v-dialog v-model="showDetailDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Detalles del Item</span>
        </v-card-title>
        <v-card-subtitle>
          <v-text-field v-model="nuevosDatos.diagnostico" label="Diagnóstico Línea"></v-text-field>
          <v-text-field v-model="nuevosDatos.cambios" label="Cambios"></v-text-field>
          <v-text-field v-model="nuevosDatos.costo_chequeo" label="Costo de Chequeo"></v-text-field>
          <v-text-field
            v-model="nuevosDatos.costo_reparacion"
            label="Costo de Reparación"
          ></v-text-field>
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
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" top timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-card>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from '@/axiosconf'
import { useAuthStore } from '@/stores/authStore'

const store = useAuthStore()

const filterText = ref('')
const selectedItem = ref(null)
const showDetailDialog = ref(false)
const snackbar = ref({
  visible: false,
  message: '',
  color: 'success'
})

const nuevosDatos = ref({
  diagnostico: '',
  cambios: '',
  costo_chequeo: '',
  costo_reparacion: ''
})

const tareasAsignadas = ref([])

const cargarTareasAsignadas = async () => {
  try {
    const response = await apiClient.get('tareas_asignadas', {
      headers: {
        Authorization: `Bearer ${store.token}`
      }
    })

    if (response.data && response.data.status === 200) {
      tareasAsignadas.value = response.data.data
    } else {
      tareasAsignadas.value = []
    }
  } catch (error) {
    tareasAsignadas.value = []
    showSnackbar('Error al cargar las tareas asignadas', 'error')
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
      diagnostico: '',
      cambios: '',
      costo_chequeo: '',
      costo_reparacion: ''
    }
  } else {
    showSnackbar('Por favor, seleccione una tarea para detallar.', 'warning')
  }
}

const closeDetailDialog = () => {
  showDetailDialog.value = false
}

const saveDetails = async () => {
  if (selectedItem.value) {
    try {
      const response = await apiClient.post(
        'tecOrden',
        {
          id_asignacion_linea: selectedItem.value.id_asignacion_linea,
          diagnostico: nuevosDatos.value.diagnostico,
          cambios: nuevosDatos.value.cambios,
          costo_chequeo: nuevosDatos.value.costo_chequeo,
          costo_reparacion: nuevosDatos.value.costo_reparacion
        },
        {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        }
      )

      if (response.data.msg === 'success') {
        showSnackbar('Datos guardados exitosamente.', 'success')
        const index = tareasAsignadas.value.findIndex(
          (item) => item.id_asignacion_linea === selectedItem.value.id_asignacion_linea
        )
        if (index !== -1) {
          tareasAsignadas.value.splice(index, 1)
        }
        closeDetailDialog()
      } else {
        showSnackbar('Hubo un problema al guardar los detalles: ' + response.data.msg, 'error')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        showSnackbar(
          'Hubo un problema al guardar los detalles: ' + error.response.data.msg,
          'error'
        )
      } else {
        showSnackbar('Hubo un problema al guardar los detalles.', 'error')
      }
    }
  }
}

const showSnackbar = (message, color = 'success') => {
  snackbar.value.message = message
  snackbar.value.color = color
  snackbar.value.visible = true
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

.custom-btn {
  font-size: 16px;
  font-weight: bold;
}
</style>
