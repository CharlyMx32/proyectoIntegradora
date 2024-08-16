<template>
  <v-card class="mb-6" outlined>
    <!-- Título y barra de búsqueda -->
    <v-card-title>
      <v-row justify="space-between" align="center" class="w-100">
        <v-col>
          <h3 class="mb-0" style="color: #004080">Tareas Asignadas</h3>
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
          <v-text-field v-model="nuevosDatos.costo_reparacion" label="Costo de Reparación"></v-text-field>
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
import apiClient from '@/axiosconf' // Asegúrate de que apiClient esté correctamente configurado

const filterText = ref('')
const selectedItem = ref(null)
const showProcessDialog = ref(false)
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
const isLoading = ref(true)

const filteredItems = computed(() => {
  if (Array.isArray(tareasAsignadas.value)) {
    const filter = filterText.value.toLowerCase()
    return tareasAsignadas.value.filter(
      (item) =>
        (item.id_asignacion_fisica && item.id_asignacion_fisica.toLowerCase().includes(filter)) ||
        (item.id_asignacion_linea && item.id_asignacion_linea.toLowerCase().includes(filter)) ||
        (item.nombre_cliente && item.nombre_cliente.toLowerCase().includes(filter)) ||
        (item.producto && item.producto.toLowerCase().includes(filter)) ||
        (item.problema && item.problema.toLowerCase().includes(filter)) ||
        (item.tipo_orden && item.tipo_orden.toLowerCase().includes(filter))
    )
  } else {
    return []
  }
})

const selectItem = (item) => {
  selectedItem.value = item;
  console.log('Item seleccionado:', selectedItem.value); // Verifica aquí
  nuevosDatos.value = {
    diagnostico: item.diagnostico || '',
    cambios: item.cambios || '',
    costo_chequeo: item.costo_chequeo || '',
    costo_reparacion: item.costo_reparacion || ''
  };
  showProcessDialog.value = true;
}

const fetchTareas = async () => {
  try {
    const response = await apiClient.get('tareas_asignadas')
    console.log('Respuesta del servidor:', response)
    if (response.data.data && response.data.data.tareas) {
      console.log('Tareas recibidas:', response.data.data.tareas)
      tareasAsignadas.value = response.data.data.tareas
    } else {
      console.error('Error: La respuesta no contiene la clave "tareas"')
      snackbar.value = {
        visible: true,
        message: 'Hubo un problema al cargar las tareas.',
        color: 'error'
      }
    } 
  } catch (error) {
    console.error('Error al obtener las tareas:', error)
    snackbar.value = {
      visible: true,
      message: 'Hubo un problema al cargar las tareas.',
      color: 'error'
    }
  } finally {
    isLoading.value = false
  }
}


const showSnackbar = (message, color) => {
  snackbar.value = {
    visible: true,
    message: message,
    color: color
  }
}

onMounted(() => {
  fetchTareas()
})

const openDetailDialog = () => {
  if (selectedItem.value) {
    showDetailDialog.value = true
    nuevosDatos.value = {
      diagnostico: selectedItem.value.diagnostico || '',
      cambios: selectedItem.value.cambios || '',
      costo_chequeo: selectedItem.value.costo_chequeo || '',
      costo_reparacion: selectedItem.value.costo_reparacion || ''
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
      // Verifica los datos que se van a enviar
      console.log('Datos a enviar:', {
        id_asignacion: selectedItem.value.id_asignacion,
        diagnostico: nuevosDatos.value.diagnostico,
        cambios: nuevosDatos.value.cambios,
        costo_chequeo: nuevosDatos.value.costo_chequeo,
        costo_reparacion: nuevosDatos.value.costo_reparacion
      });

      const response = await apiClient.post('tecOrden', {
        id_asignacion: selectedItem.value.id_asignacion,
        diagnostico: nuevosDatos.value.diagnostico,
        cambios: nuevosDatos.value.cambios,
        costo_chequeo: nuevosDatos.value.costo_chequeo,
        costo_reparacion: nuevosDatos.value.costo_reparacion
      });

      console.log('Respuesta del servidor:', response);

      if (response.data && response.data.message) {
        if (response.data.message === 'Detalles guardados exitosamente') {
          showSnackbar('Datos guardados exitosamente.', 'success');
          const index = tareasAsignadas.value.findIndex(
            (item) =>
              item.id_asignacion_linea === nuevosDatos.value.id_asignacion_linea ||
              item.id_asignacion_fisica === nuevosDatos.value.id_asignacion_fisica
          );
          if (index !== -1) {
            tareasAsignadas.value.splice(index, 1);
          }
          closeDetailDialog();
        } else {
          showSnackbar('Hubo un problema al guardar los detalles: ' + (response.data.message || 'Error desconocido'), 'error');
        }
      } else {
        showSnackbar('La respuesta no tiene la estructura esperada', 'error');
      }
    } catch (error) {
      console.error('Detalles del error:', error);
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? 'Hubo un problema al guardar los detalles: ' + error.response.data.message
        : 'Hubo un problema al guardar los detalles.';
      showSnackbar(errorMessage, 'error');
    }
  } else {
    showSnackbar('No hay un item seleccionado para guardar.', 'warning');
  }
};
</script>

<style scoped>
.table-container {
  max-height: 400px;
  overflow-y: auto;
}

.custom-table {
  border-collapse: collapse;
  width: 100%;
}

.custom-table th, .custom-table td {
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.custom-table th {
  background-color: #BDC3C7;
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

.selected-row {
  background-color: #f5f5f5;
}

.filter-field {
  max-width: 300px;
}
</style>
