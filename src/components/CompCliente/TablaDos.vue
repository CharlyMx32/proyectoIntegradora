<template>
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
                <td>{{ item.estado }}</td>
              </tr>
              <tr v-if="!filteredItems.length">
                <td colspan="2" class="text-center py-4">No tienes pagos pendientes.</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits } from 'vue';
  
  const props = defineProps({
    filterText: String,
    filteredItems: Array,
    selectedItem: Object,
    selectItem: Function,
    openDetailDialog: Function
  });
  
  const emit = defineEmits(['update:filterText']);
  
  const localFilterText = ref(props.filterText);
  
  watch(localFilterText, (newVal) => {
    emit('update:filterText', newVal);
  });
  
  const selectItem = props.selectItem;
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
    max-height: 400px;
    overflow-y: auto;
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
  </style>
  