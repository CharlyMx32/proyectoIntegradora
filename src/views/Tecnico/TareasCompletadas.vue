<template>
  <v-card class="mb-6" outlined>
    <v-card-title>
      <v-row justify="space-between" align="center" class="w-100">
        <v-col>
          <h3 class="mb-0" style="color: #00b300">Tareas Completadas</h3>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-text-field
            v-model="filterText"
            label="Buscar Tareas Completadas"
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
              <th class="text-left">Técnico Asignado</th>
              <th class="text-left">Fecha de Finalización</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in filteredItems"
              :key="'completadas_' + idx"
              @click="selectItem(item)"
              :class="{ 'selected-row': selectedItem === item }"
            >
              <td>{{ item.Nombre_Cliente }}</td>
              <td>{{ item.producto }}</td>
              <td>{{ item.diagnostico_linea }}</td>
              <td>{{ item.cambios }}</td>
              <td>{{ item.costo_chequeo }}</td>
              <td>{{ item.costo_reparacion }}</td>
            </tr>
            <tr v-if="!filteredItems.length">
              <td colspan="5" class="text-center py-4">
                No se encontraron tareas que coincidan con el filtro.
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="openCompleteDialog" color="white" class="custom-btn">Ver Detalles</v-btn>
    </v-card-actions>

    <!-- Modal para Detalles de Tareas Completadas -->
    <v-dialog v-model="showCompleteDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Detalles de la Tarea Completada</span>
        </v-card-title>
        <v-card-subtitle>
          <v-text-field v-model="nuevosDatos.observaciones" label="Observaciones"></v-text-field>
          <v-text-field v-model="nuevosDatos.costoTotal" label="Costo Total"></v-text-field>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn @click="closeCompleteDialog" color="secondary"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const filterText = ref('')
const selectedItem = ref(null)
const showCompleteDialog = ref(false)
const nuevosDatos = ref({
  observaciones: '',
  costoTotal: ''
})

// Inicializar tareasCompletadas como un arreglo vacío
const tareasCompletadas = ref([])

axios
  .post('http://hs.com/Completados')
  .then((response) => {
    if (response && response.data) {
      // Ajustar para acceder a la estructura correcta de datos
      if (response.data.status === 200 && response.data.data && response.data.data.tareas) {
        tareasCompletadas.value = response.data.data.tareas
      } else {
        console.error('La respuesta no tiene la estructura esperada')
        tareasCompletadas.value = [] // Set to an empty array to avoid errors
      }
    } else {
      console.error('No response data')
      tareasCompletadas.value = [] // Set to an empty array to avoid errors
    }
  })
  .catch((error) => {
    console.error('Error al obtener las tareas completadas:', error)
    tareasCompletadas.value = [] // Set to an empty array to avoid errors
  })

const filteredItems = computed(() => {
  const filter = filterText.value.toLowerCase()
  return tareasCompletadas.value.filter(
    (item) =>
      item.Nombre_Cliente.toLowerCase().includes(filter) ||
      item.producto.toLowerCase().includes(filter) ||
      item.diagnostico_linea.toLowerCase().includes(filter) ||
      item.cambios.toLowerCase().includes(filter) // Adjusted field names
  )
})

const selectItem = (item) => {
  selectedItem.value = item
}

const openCompleteDialog = () => {
  if (selectedItem.value) {
    showCompleteDialog.value = true
    nuevosDatos.value = {
      observaciones: selectedItem.value.observaciones || '',
      costoTotal: selectedItem.value.costoTotal || ''
    }
  }
}

const closeCompleteDialog = () => {
  showCompleteDialog.value = false
}
</script>

<style scoped>
/* estilos específicos para este componente */
.selected-row {
  background-color: #f0f0f0;
}
</style>
