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
                <th class="text-left">Estado</th>
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
                <td>{{ item.estado }}</td>
              </tr>
              <tr v-if="!filteredItems.length">
                <td colspan="2" class="text-center py-4">No tienes pagos pendientes.</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn @click="openDialog" color="#ffffff" class="custom-btn">Pagar</v-btn>
      </v-card-actions>
    </v-card>
  
    <!-- Dialog for item details -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Detalles</span>
        </v-card-title>
        <v-card-subtitle>
          <v-text-field
            v-model="itemDetails.cambios"
            label="Cambios"
            readonly
          ></v-text-field>
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
          <v-text-field
            v-model="itemDetails.diagnostico"
            label="Diagnóstico"
            readonly
          ></v-text-field>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn text @click="closeDialog">Pagar</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn text @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import axios from 'axios';
  
  const props = defineProps({
    filterText: String,
    filteredItems: Array,
    selectedItem: Object,
    selectItem: Function,
  });
  
  const emit = defineEmits(['update:filterText']);
  
  const localFilterText = ref(props.filterText);
  
  watch(localFilterText, (newVal) => {
    emit('update:filterText', newVal);
  });
  
  const dialog = ref(false);
  const itemDetails = ref({
    cambios: '',
    costoChequeo: '',
    costoReparacion: '',
    diagnostico: ''
  });
  
  const selectItem = (item) => {
    props.selectItem(item);
  };
  
  const openDialog = async () => {
    if (props.selectedItem) {
      try {
        const response = await axios.get(`/api/items/${props.selectedItem.id}`);
        itemDetails.value = response.data;
        dialog.value = true;
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    } else {
      console.warn('No item selected');
    }
  };
  
  const closeDialog = () => {
    dialog.value = false;
  };
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
    background-color: #ffad00;
    color: #ffffff;
  }
   
  .v-dialog .v-card {
    padding: 16px;
  }
  </style>
  