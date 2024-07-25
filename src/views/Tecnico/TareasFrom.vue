<template>
  <v-app id="app">
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <!-- Tareas Asignadas -->
            <div class="mb-8">
              <div class="d-flex align-items-center justify-space-between mb-4">
                <h3 class="mb-0">Tareas Asignadas</h3>
                <v-text-field
                  v-model="filterText1"
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
                    <thead class="sticky-header">
                      <tr>
                        <th class="text-left">Nombre Cliente</th>
                        <th class="text-left">Producto</th>
                        <th class="text-left">Problema</th>
                        <th class="text-left">Tipo de Orden</th>
                      </tr>
                    </thead>
                    <tbody v-if="filteredItems1.length">
                      <tr v-for="(item, idx) in filteredItems1" :key="'asignadas_' + idx">
                        <td>{{ item.nombre_cliente }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.problema }}</td>
                        <td>{{ item.tipo_orden }}</td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4" class="text-center py-4">No se encontraron tareas que coincidan con el filtro.</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
              <div class="mt-4 text-right">
                <v-btn @click="mostrarDetalle" color="primary" small>Detalle</v-btn>
              </div>
            </div>

            <!-- Tareas en Proceso -->
            <div class="mb-8">
              <div class="d-flex align-items-center justify-space-between mb-4">
                <h3 class="mb-0">Tareas en Proceso</h3>
                <v-text-field
                  v-model="filterText2"
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
                    <thead class="sticky-header">
                      <tr>
                        <th class="text-left">Nombre Cliente</th>
                        <th class="text-left">Producto</th>
                        <th class="text-left">Problema</th>
                        <th class="text-left">Tipo de Orden</th>
                        <th class="text-left">Estado</th>
                      </tr>
                    </thead>
                    <tbody v-if="filteredItems2.length">
                      <tr v-for="(item, idx) in filteredItems2" :key="'proceso_' + idx">
                        <td>{{ item.nombre_cliente }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.problema }}</td>
                        <td>{{ item.tipo_orden }}</td>
                        <td>{{ item.estado }}</td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="5" class="text-center py-4">No hay elementos disponibles.</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
              <div class="mt-4 text-right">
                <v-btn @click="seguimientoTareasEnProceso" color="primary" small>Seguimiento</v-btn>
              </div>
            </div>

            <!-- Tareas Completadas -->
            <div>
              <div class="d-flex align-items-center justify-space-between mb-4">
                <h3 class="mb-0">Tareas Completadas</h3>
                <v-text-field
                  v-model="filterText3"
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
                    <thead class="sticky-header">
                      <tr>
                        <th class="text-left">Nombre Cliente</th>
                        <th class="text-left">Producto</th>
                        <th class="text-left">Problema</th>
                        <th class="text-left">Tipo de Orden</th>
                      </tr>
                    </thead>
                    <tbody v-if="thirdItems.length">
                      <tr v-for="(item, idx) in thirdItems" :key="'completadas_' + idx">
                        <td>{{ item.nombre_cliente }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.problema }}</td>
                        <td>{{ item.tipo_orden }}</td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4" class="text-center py-4">No hay datos disponibles.</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Datos
const tareasAsignadas = ref([]);
const tareasEnProceso = ref([]);
const tareasCompletadas = ref([]);

// Filtros
const filterText1 = ref('');
const filterText2 = ref('');
const filterText3 = ref('');

// Filtrados
const filteredItems1 = computed(() => {
  const filter = filterText1.value.toLowerCase();
  return tareasAsignadas.value.filter(item =>
    item.nombre_cliente.toLowerCase().includes(filter) ||
    item.producto.toLowerCase().includes(filter) ||
    item.problema.toLowerCase().includes(filter) ||
    item.tipo_orden.toLowerCase().includes(filter)
  );
});

const filteredItems2 = computed(() => {
  const filter = filterText2.value.toLowerCase();
  return tareasEnProceso.value.filter(item =>
    item.nombre_cliente.toLowerCase().includes(filter) ||
    item.producto.toLowerCase().includes(filter) ||
    item.problema.toLowerCase().includes(filter) ||
    item.tipo_orden.toLowerCase().includes(filter) ||
    item.estado.toLowerCase().includes(filter)
  );
});

const thirdItems = computed(() => {
  const filter = filterText3.value.toLowerCase();
  return tareasCompletadas.value.filter(item =>
    item.nombre_cliente.toLowerCase().includes(filter) ||
    item.producto.toLowerCase().includes(filter) ||
    item.problema.toLowerCase().includes(filter) ||
    item.tipo_orden.toLowerCase().includes(filter)
  );
});

// Métodos
const refreshTareasAsignadas = () => {
  console.log('Actualizar tareas asignadas');
};

const seguimientoTareasEnProceso = () => {
  console.log('Seguimiento de tareas en proceso');
};

const mostrarDetalle = () => {
  console.log('Mostrar detalle de tareas asignadas');
};

const mostrarOrden = () => {
  fetch('http://hs.com/orden')
    .then(response => response.json())
    .then(json => {
      if (json.status === 200) {
        tareasAsignadas.value = json.data; 
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

.sticky-header th {
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
  z-index: 1; /* Ensure the header stays above the table content */
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

.mt-4 {
  margin-top: 16px;
}
</style>
