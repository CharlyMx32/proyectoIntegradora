<template>
  <v-app id="app">
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <!-- Iteración de las tablas -->
            <div v-for="(table, index) in tables" :key="index" class="mb-8">
              <!-- Encabezado de la tabla -->
              <div class="d-flex align-center justify-space-between mb-2">
                <h3 class="mb-0">{{ table.name }}</h3>
                <!-- Filtro -->
                <v-text-field
                  v-model="filters[index]"
                  label="Filtrar"
                  outlined
                  dense
                  hide-details
                  class="ml-2"
                  style="width: 120px;"
                ></v-text-field>
              </div>

              <!-- Tabla con scroll -->
              <div class="table-container">
                <v-simple-table dense class="elevation-1 mb-4">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Nombre</th>
                        <th class="text-left">Producto</th>
                        <th class="text-left">Problema</th>
                        <th class="text-left">Tipo de Orden</th> <!-- Nueva columna -->
                        <!-- Mostrar la columna de Status solo en la segunda tabla -->
                        <th v-if="index === 1" class="text-left">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, idx) in filteredItems(index)" :key="idx">
                        <td>{{ item.name }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.problema }}</td>
                        <td>{{ item.tipo_orden }}</td> <!-- Mostrar el tipo de orden -->
                        <!-- Mostrar el campo de Status solo en la segunda tabla -->
                        <td v-if="index === 1">{{ item.status }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>

              <!-- Botón debajo de la tabla -->
              <v-row justify="end" class="mt-2">
                <v-col cols="auto">
                  <v-btn v-if="index === 1" @click="handleSeguimientoClick(index)" color="green">
                    Seguimiento
                  </v-btn>
                  <v-btn v-else-if="index < 2" @click="handleButtonClick(index)" color="green">
                    Detallar
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const tables = ref([
  {
    name: 'Tareas Asignadas',
    items: [
      { name: 'Message 1 (Today)', producto: 'Producto A', problema: 'Problema 1', tipo_orden: 'orden_fisica' },
      { name: 'Message 2 (Today)', producto: 'Producto B', problema: 'Problema 2', tipo_orden: 'orden_linea' },
    ]
  },
  {
    name: 'Tareas en proceso',
    items: [
      { name: 'Message 1 (Yesterday)', producto: 'Producto C', problema: 'Problema 3', tipo_orden: 'orden_fisica', status: 'En proceso' },
      { name: 'Message 2 (Yesterday)', producto: 'Producto D', problema: 'Problema 4', tipo_orden: 'orden_linea', status: 'En proceso' },
    ]
  },
  {
    name: 'Tareas Completadas',
    items: [
      { name: 'Message 1 (Inbox)', producto: 'Producto E', problema: 'Problema 5', tipo_orden: 'orden_fisica' },
      { name: 'Message 2 (Inbox)', producto: 'Producto F', problema: 'Problema 6', tipo_orden: 'orden_linea' },
    ]
  },
]);

const filters = ref(['', '', '']);

function filteredItems(index) {
  const filterText = filters.value[index].toLowerCase();
  return tables.value[index].items.filter(item =>
    item.name.toLowerCase().includes(filterText) ||
    item.producto.toLowerCase().includes(filterText) ||
    item.problema.toLowerCase().includes(filterText) ||
    (index === 1 && item.status && item.status.toLowerCase().includes(filterText)) ||
    item.tipo_orden.toLowerCase().includes(filterText)
  );
}

function handleButtonClick(index) {
  alert(`Botón Detallar ${index + 1} presionado.`);
}

function handleSeguimientoClick(index) {
  alert(`Botón Seguimiento presionado para la tabla ${index + 1}.`);
}

</script>

<style scoped>
.text-left {
  text-align: left;
}

.v-simple-table {
  border: 1px solid #e0e0e0; /* Color de borde más suave */
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.v-simple-table th,
.v-simple-table td {
  padding: 12px 16px;
}

.v-simple-table thead {
  background-color: #f5f5f5; /* Fondo más claro para el encabezado */
}

.table-container {
  max-height: 300px;
  overflow-y: auto;
}

.v-btn {
  min-width: 120px;
}
</style>

