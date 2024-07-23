<template>
  <v-app id="app">
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <!-- Iteración de las tablas -->
            <div v-for="(table, index) in tables" :key="index" class="mb-8">
              <!-- Encabezado de la tabla -->
              <div class="d-flex align-center justify-space-between mb-4">
                <h3 class="mb-0">{{ table.name }}</h3>
                <!-- Filtro -->
                <v-text-field
                  v-model="filters[index]"
                  label="Filtrar"
                  outlined
                  dense
                  hide-details
                  class="ml-4"
                  style="width: 160px;"
                ></v-text-field>
              </div>

              <!-- Tabla con scroll -->
              <div class="table-container">
                <v-simple-table dense class="elevation-1 mb-4">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">ID</th>
                        <th class="text-left">Nombre</th>
                        <th class="text-left">Producto</th>
                        <th class="text-left">Problema</th>
                        <th class="text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, idx) in filteredItems(index)" :key="idx">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.problema }}</td>
                        <td>{{ item.status }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>

              <!-- Botón debajo de la tabla -->
              <v-row justify="end">
                <v-btn v-if="index < 2" @click="handleButtonClick(index)" color="primary">
                  Botón {{ index + 1 }}
                </v-btn>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const tables = ref([
      {
        name: 'Tareas Asignadas',
        items: [
          { id: 1, name: 'Message 1 (Today)', producto: 'Producto A', problema: 'Problema 1', status: 'Pendiente' },
          { id: 2, name: 'Message 2 (Today)', producto: 'Producto B', problema: 'Problema 2', status: 'En proceso' },
        ]
      },
      {
        name: 'Tareas en proceso',
        items: [
          { id: 3, name: 'Message 1 (Yesterday)', producto: 'Producto C', problema: 'Problema 3', status: 'Completado' },
          { id: 4, name: 'Message 2 (Yesterday)', producto: 'Producto D', problema: 'Problema 4', status: 'Pendiente' },
        ]
      },
      {
        name: 'Tareas Completadas',
        items: [
          { id: 5, name: 'Message 1 (Inbox)', producto: 'Producto E', problema: 'Problema 5', status: 'Completado' },
          { id: 6, name: 'Message 2 (Inbox)', producto: 'Producto F', problema: 'Problema 6', status: 'Completado' },
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
        item.status.toLowerCase().includes(filterText)
      );
    }

    function handleButtonClick(index) {
      alert(`Botón ${index + 1} presionado.`);
    }

    return {
      tables,
      filters,
      filteredItems,
      handleButtonClick
    };
  }
};
</script>

<style scoped>
.text-left {
  text-align: left;
}

.v-simple-table {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.v-simple-table th,
.v-simple-table td {
  padding: 12px 16px;
}

.v-simple-table thead {
  background-color: #f5f5f5;
}

.table-container {
  max-height: 300px;
  overflow-y: auto;
}

.v-btn {
  min-width: 120px;
}
</style>
