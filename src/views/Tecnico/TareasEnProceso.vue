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
              <th class="text-left">Técnico Asignado</th>
              <th class="text-left">Fecha de Inicio</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in filteredItems"
              :key="'proceso_' + idx"
              :class="{ 'selected-row': selectedItem === item }"
              @click="selectItem(item)"
            >
              <td>{{ item.nombre_cliente }}</td>
              <td>{{ item.producto }}</td>
              <td>{{ item.problema }}</td>
              <td>{{ item.tecnico_asignado }}</td>
              <td>{{ item.fecha_inicio }}</td>
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
      <v-btn @click="openProcessDialog" color="white" class="custom-btn">Actualizar Proceso</v-btn>
    </v-card-actions>

    <!-- Modal para Actualizar Proceso -->
    <v-dialog v-model="showProcessDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Actualizar Proceso</span>
        </v-card-title>
        <v-card-subtitle>
          <v-text-field v-model="nuevosDatos.estado" label="Estado"></v-text-field>
          <v-text-field
            v-model="nuevosDatos.fechaEstimada"
            label="Fecha Estimada de Finalización"
          ></v-text-field>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn @click="saveProcessUpdate" color="primary">
            <v-icon left>mdi-content-save</v-icon>
            Guardar Cambios
          </v-btn>
          <v-btn @click="closeProcessDialog" color="secondary"> Cancelar </v-btn>
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
const showProcessDialog = ref(false)
const nuevosDatos = ref({
  estado: '',
  fechaEstimada: ''
})
const tareasEnProceso = ref([])

const filteredItems = computed(() => {
  const filter = filterText.value.toLowerCase()
  return tareasEnProceso.value.filter(
    (item) =>
      item.nombre_cliente.toLowerCase().includes(filter) ||
      item.producto.toLowerCase().includes(filter) ||
      item.problema.toLowerCase().includes(filter) ||
      item.tecnico_asignado.toLowerCase().includes(filter)
  )
})

const selectItem = (item) => {
  selectedItem.value = item
}

const openProcessDialog = () => {
  if (selectedItem.value) {
    showProcessDialog.value = true
    nuevosDatos.value = {
      estado: '',
      fechaEstimada: ''
    }
  }
}

const closeProcessDialog = () => {
  showProcessDialog.value = false
}

const saveProcessUpdate = async () => {
  if (selectedItem.value) {
    try {
      await axios.post('/api/actualizar_proceso', {
        item: selectedItem.value,
        datos: nuevosDatos.value
      })
      alert('Proceso actualizado exitosamente.')
      closeProcessDialog()
    } catch (error) {
      console.error('Error al actualizar el proceso:', error)
      alert('Hubo un problema al actualizar el proceso.')
    }
  }
}
</script>

<style scoped>
/* estilos específicos para este componente */
</style>
