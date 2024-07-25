<template>
  <v-app id="app">
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <div class="d-flex align-items-center justify-space-between mb-8">
              <h3 class="mb-0">Listado de Tareas</h3>
              <v-text-field
                v-model="filterText"
                label="Filtrar"
                outlined
                dense
                hide-details
                style="max-width: 300px;"
              ></v-text-field>
            </div>

            <div class="table-container">
              <v-simple-table dense class="custom-table">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Nombre Cliente</th>
                      <th class="text-left">Producto</th>
                      <th class="text-left">Problema</th>
                      <th class="text-left">Tipo de Orden</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in filteredItems" :key="idx">
                      <td>{{ item.nombre_cliente }}</td>
                      <td>{{ item.producto }}</td>
                      <td>{{ item.problema }}</td>
                      <td>{{ item.tipo_orden }}</td>
                    </tr>
                    <tr v-if="filteredItems.length === 0">
                      <td colspan="4" class="text-center py-4">No se encontraron tareas que coincidan con el filtro.</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const tables = ref([
  {
    name: 'Listado de Tareas',
    items: []
  },
  {
    name: 'Tareas en proceso',
    items: [
      { nombre_cliente: 'Cliente A', producto: 'Producto X', problema: 'Problema 1', tipo_orden: 'orden_fisica' },
      { nombre_cliente: 'Cliente B', producto: 'Producto Y', problema: 'Problema 2', tipo_orden: 'orden_linea' },
    ]
  },
  {
    name: 'Tareas Completadas',
    items: [
      { nombre_cliente: 'Cliente C', producto: 'Producto Z', problema: 'Problema 3', tipo_orden: 'orden_fisica' },
      { nombre_cliente: 'Cliente D', producto: 'Producto W', problema: 'Problema 4', tipo_orden: 'orden_linea' },
    ]
  },
]);

const filterText = ref('');

const filteredItems = computed(() => {
  const filter = filterText.value.toLowerCase();
  return tables.value[0].items.filter(item =>
    item.nombre_cliente.toLowerCase().includes(filter) ||
    item.producto.toLowerCase().includes(filter) ||
    item.problema.toLowerCase().includes(filter) ||
    item.tipo_orden.toLowerCase().includes(filter)
  );
});

const mostrarOrden = () => {
  fetch('http://hs.com/orden')
    .then(response => response.json())
    .then(json => {
      if (json.status === 200) {
        tables.value[0].items = json.data; 
      }
    })
    .catch(error => {
      console.error('Error al obtener órdenes:', error);
    });
};

onMounted(() => {
  mostrarOrden();
});
</script>

<style scoped>
.text-left {
  text-align: left;
}

.custom-table {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-table th,
.custom-table td {
  padding: 12px 16px;
}

.custom-table thead {
  background-color: #f5f5f5;
  font-weight: bold;
}

.table-container {
  max-height: 400px;
  overflow-y: auto;
}

.table-container::-webkit-scrollbar {
  width: 6px;
}

.table-container::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 6px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 6px;
}

@media (max-width: 600px) {
  .v-col {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}

@media (max-width: 400px) {
  .v-text-field {
    max-width: 180px;
  }
}

.text-center {
  text-align: center;
  color: #777;
}
</style>

