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
              <th class="text-left">Cliente</th>
              <th class="text-left">Producto</th>
              <th class="text-left">Problema</th>
              <th class="text-left">Seguimiento</th>
              <th class="text-left">Fecha</th>
            </tr>
          </thead>
         
          <tbody>
            <tr
              v-for="(item, idx) in filteredItems"
              :key="'completadas_' + idx"
              @click="selectItem(item)"
              :class="{ 'selected-row': selectedItem === item }"
            >
              <td>{{ item.Cliente }}</td>
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
 

    <!-- Modal para Detalles de Tareas Completadas -->
   
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import apiClient from '@/axiosconf'

const filterText = ref('')
const selectedItem = ref(null)




// Inicializar tareasCompletadas como un arreglo vacío
const tareasCompletadas = ref([])

apiClient
  .post('Completados')
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


</script>

<style scoped>
/* estilos específicos para este componente */
.selected-row {
  background-color: #f0f0f0;
}
custom-table tr {
  border-bottom: 1px solid #e0e0e0;
}
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
