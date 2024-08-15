<template>
  <v-card class="mb-6" outlined>
    <v-card-title>
      <v-row justify="space-between" align="center" class="w-100">
        <v-col>
          <h3 class="mb-0" style="color: #ff8000">Tareas en Proceso</h3>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-text-field
            v-model="filterText"
            label="Buscar Tareas en Proceso"
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
    <v-card-text>
      <div class="table-container">
        <v-simple-table dense class="custom-table">
          <thead>
            <tr>
              <th class="text-left">Nombre Cliente</th>
              <th class="text-left">Producto</th>
              <th class="text-left">Problema</th>
              <th class="text-left">Fecha de Inicio</th>
              <th class="text-left">Técnico Asignado</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in filteredItems"
              :key="'proceso_' + idx"
              :class="{ 'selected-row': selectedItem === item }"
              @click="selectItem(item)"
            >
              <td class="py-2 px-3">{{ item.Nombre_Cliente }}</td>
              <td class="py-2 px-3">{{ item.producto }}</td>
              <td class="py-2 px-3">{{ item.diagnostico_linea }}</td>
              <td class="py-2 px-3">{{ item.cambios }}</td>
              <td class="py-2 px-3">{{ item.estado_del_pago }}</td>
            </tr>
            <tr v-if="!filteredItems.length">
              <td colspan="5" class="text-center py-4">
                No se encontraron tareas que coincidan con el filtro.
              </td>
            </tr>
          </tbody>
        </v-simple-table>
       
      </div>
      <!-- Mensaje de carga mientras se obtienen los datos -->
      <div v-if="isLoading" class="text-center py-4">Cargando tareas...</div>
      
    </v-card-text>


    <!-- Modal para Actualizar Proceso -->
    <v-dialog v-model="showProcessDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Actualizar Proceso</span>
        </v-card-title>
        <v-card-subtitle>

          <v-combobox
            v-model="nuevosDatos.seguimiento"
            :items="seguimientos"
            label="Seguimiento"
            dense
            outlined
          ></v-combobox>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn @click="saveProcessUpdate" color="primary">
            <v-icon left>mdi-content-save</v-icon>
            Guardar Cambios
          </v-btn>
          <v-btn @click="closeProcessDialog" color="secondary">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar para mostrar mensajes -->
    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color">
      {{ snackbar.message }}
      <v-btn color="white" text @click="snackbar.show = false">Cerrar</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import apiClient from '@/axiosconf'

const filterText = ref('')
const selectedItem = ref(null)
const showProcessDialog = ref(false)
const seguimientos = ref(['En progreso', 'Completado', 'Pendiente']) // Opciones de seguimiento
const nuevosDatos = ref({
  seguimiento: ''
})
const tareasEnProceso = ref([])
const isLoading = ref(true) // Estado de carga

const snackbar = ref({
  show: false,
  message: '',
  color: '',
  timeout: 3000
})

const filteredItems = computed(() => {
  if (Array.isArray(tareasEnProceso.value)) {
    const filter = filterText.value.toLowerCase()
    return tareasEnProceso.value.filter(
      (item) =>
        (item.Nombre_Cliente && item.Nombre_Cliente.toLowerCase().includes(filter)) ||
        (item.producto && item.producto.toLowerCase().includes(filter)) ||
        (item.diagnostico_linea && item.diagnostico_linea.toLowerCase().includes(filter)) ||
        (item.cambios && item.cambios.toLowerCase().includes(filter)) ||
        (item.estado_del_pago && item.estado_del_pago.toLowerCase().includes(filter))
    )
  } else {
    return []
  }
})

const selectItem = (item) => {
  selectedItem.value = item

  nuevosDatos.value.seguimiento = item.seguimiento || ''
  showProcessDialog.value = true
}

const closeProcessDialog = () => {
  showProcessDialog.value = false
}

// Función para obtener las tareas desde el backend
const fetchTareas = async () => {
  try {
    const response = await apiClient.get('obtener_tareas_en_proceso')
    console.log('Respuesta del servidor:', response)
    if (response.data.data && response.data.data.tareas) {
      console.log('Tareas recibidas:', response.data.data.tareas)
      tareasEnProceso.value = response.data.data.tareas
    } else {
      console.error('Error: La respuesta no contiene la clave "tareas"')
      snackbar.value = {
        show: true,
        message: 'Hubo un problema al cargar las tareas.',
        color: 'error'
      }
    }
  } catch (error) {
    console.error('Error al obtener las tareas:', error)
    snackbar.value = {
      show: true,
      message: 'Hubo un problema al cargar las tareas.',
      color: 'error'
    }
  } finally {
    isLoading.value = false
  }
}

// Llamada a fetchTareas cuando se monta el componente
onMounted(() => {
  fetchTareas()
})

const saveProcessUpdate = async () => {
  if (selectedItem.value) {
    try {
      const response = await apiClient.post('actualizar_proceso', {
        idDetalleLinea: selectedItem.value.id_detalle_linea, // Verifica si este nombre es correcto
        seguimiento: nuevosDatos.value.seguimiento
      })


      if (response.status === 200) {
        snackbar.value = {
          show: true,
          message: response.data.message,
          color: 'success'
        }
        closeProcessDialog()
        fetchTareas() // Refrescar la lista de tareas
      } else {
        console.error('Error al actualizar el proceso:', response)
        snackbar.value = {
          show: true,
          message: 'Hubo un problema al actualizar el proceso.',
          color: 'error'
        }
      }
    } catch (error) {
      console.error('Error al actualizar el proceso:', error)
      snackbar.value = {
        show: true,
        message: 'Hubo un problema al actualizar el proceso.',
        color: 'error'
      }
    }
  }
}
</script>

<style scoped>
/* Ajustar el padding para mejorar la visualización de la tabla */
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
