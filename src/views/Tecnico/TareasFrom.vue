<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <!-- Contenedor para Tareas Asignadas -->
      <v-card class="mb-8 card-background" outlined>
        <v-card-text>
          <v-row align="center" justify="space-between">
            <v-col>
              <v-card-title class="mb-0">
                <h2>Tareas Asignadas</h2>
              </v-card-title>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-text-field
                v-model="filterText1"
                label="Buscar"
                outlined
                dense
                hide-details
                class="filter-field"
              ></v-text-field>
              <v-select
                v-model="recentFilter1"
                :items="filterOptions"
                label="Mostrar"
                outlined
                dense
                class="filter-select"
              ></v-select>
            </v-col>
          </v-row>
          <div class="table-wrapper">
            <v-simple-table dense class="custom-table">
              <thead class="sticky-header">
                <tr>
                  <th class="text-left">Nombre Cliente</th>
                  <th class="text-left">Producto</th>
                  <th class="text-left">Problema</th>
                  <th class="text-left">Tipo de Orden</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, idx) in filteredItems1"
                  :key="'asignadas_' + idx"
                  :class="{ 'selected-row': selectedItem1 === item }"
                  @click="selectItem1(item)"
                >
                  <td>{{ item.nombre_cliente }}</td>
                  <td>{{ item.producto }}</td>
                  <td>{{ item.problema }}</td>
                  <td>{{ item.tipo_orden }}</td>
                </tr>
                <tr v-if="!filteredItems1.length">
                  <td colspan="4" class="text-center py-4">No se encontraron tareas que coincidan con el filtro.</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="mostrarDetalle" color="primary" elevation="2" class="custom-btn">Detallar</v-btn>
        </v-card-actions>
      </v-card>

      <!-- Contenedor para Tareas en Proceso -->
      <v-card class="mb-8 card-background" outlined>
        <v-card-text>
          <v-row align="center" justify="space-between">
            <v-col>
              <v-card-title class="mb-0">
                <h2>Tareas en Proceso</h2>
              </v-card-title>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-text-field
                v-model="filterText2"
                label="Buscar"
                outlined
                dense
                hide-details
                class="filter-field"
              ></v-text-field>
              <v-select
                v-model="recentFilter2"
                :items="filterOptions"
                label="Mostrar"
                outlined
                dense
                class="filter-select"
              ></v-select>
            </v-col>
          </v-row>
          <div class="table-wrapper">
            <v-simple-table dense class="custom-table">
              <thead class="sticky-header">
                <tr>
                  <th class="text-left">Nombre Cliente</th>
                  <th class="text-left">Producto</th>
                  <th class="text-left">Problema</th>
                  <th class="text-left">Tipo de Orden</th>
                  <th class="text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, idx) in filteredItems2"
                  :key="'proceso_' + idx"
                  :class="{ 'selected-row': selectedItem2 === item }"
                  @click="selectItem2(item)"
                >
                  <td>{{ item.nombre_cliente }}</td>
                  <td>{{ item.producto }}</td>
                  <td>{{ item.problema }}</td>
                  <td>{{ item.tipo_orden }}</td>
                  <td>{{ item.estado }}</td>
                </tr>
                <tr v-if="!filteredItems2.length">
                  <td colspan="5" class="text-center py-4">No hay elementos disponibles.</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="seguimientoTareasEnProceso" color="secondary" elevation="2" class="custom-btn">Seguimiento</v-btn>
        </v-card-actions>
      </v-card>

      <!-- Contenedor para Tareas Completadas -->
      <v-card class="card-background" outlined>
        <v-card-text>
          <v-row align="center" justify="space-between">
            <v-col>
              <v-card-title class="mb-0">
                <h2>Tareas Completadas</h2>
              </v-card-title>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-text-field
                v-model="filterText3"
                label="Buscar"
                outlined
                dense
                hide-details
                class="filter-field"
              ></v-text-field>
              <v-select
                v-model="recentFilter3"
                :items="filterOptions"
                label="Mostrar"
                outlined
                dense
                class="filter-select"
              ></v-select>
            </v-col>
          </v-row>
          <div class="table-wrapper">
            <v-simple-table dense class="custom-table">
              <thead class="sticky-header">
                <tr>
                  <th class="text-left">Nombre Cliente</th>
                  <th class="text-left">Producto</th>
                  <th class="text-left">Problema</th>
                  <th class="text-left">Tipo de Orden</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, idx) in filteredItems3"
                  :key="'completadas_' + idx"
                  :class="{ 'selected-row': selectedItem3 === item }"
                  @click="selectItem3(item)"
                >
                  <td>{{ item.nombre_cliente }}</td>
                  <td>{{ item.producto }}</td>
                  <td>{{ item.problema }}</td>
                  <td>{{ item.tipo_orden }}</td>
                </tr>
                <tr v-if="!filteredItems3.length">
                  <td colspan="4" class="text-center py-4">No hay datos disponibles.</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  
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

const recentFilter1 = ref('Mostrar Todos');
const recentFilter2 = ref('Mostrar Todos');
const recentFilter3 = ref('Mostrar Todos');

// Opciones de filtro para seleccionar mostrar todos o los 10 más recientes
const filterOptions = ['Mostrar Todos', '10 Más Recientes'];

// Registro seleccionado
const selectedItem1 = ref(null);
const selectedItem2 = ref(null);
const selectedItem3 = ref(null);

// Función para filtrar items
const filterItems = (items, filterText, additionalFields = []) => {
  const filter = filterText.toLowerCase();
  return items.filter(item => {
    const values = [
      item.nombre_cliente,
      item.producto,
      item.problema,
      item.tipo_orden,
      ...additionalFields.map(field => item[field])
    ];
    return values.some(value => value.toLowerCase().includes(filter));
  });
};

// Función para ordenar por fecha de manera descendente
const sortByDateDesc = (items) => {
  return [...items].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
};

// Obtener los items filtrados con opción de mostrar los 10 más recientes
const getFilteredItems = (items, filterText, recentFilter, additionalFields = []) => {
  let filtered = filterItems(items, filterText, additionalFields);
  if (recentFilter === '10 Más Recientes') {
    filtered = sortByDateDesc(filtered).slice(0, 10);
  }
  return filtered;
};

// Datos filtrados
const filteredItems1 = computed(() => getFilteredItems(tareasAsignadas.value, filterText1.value, recentFilter1.value));
const filteredItems2 = computed(() => getFilteredItems(tareasEnProceso.value, filterText2.value, recentFilter2.value));
const filteredItems3 = computed(() => getFilteredItems(tareasCompletadas.value, filterText3.value, recentFilter3.value));

// Métodos
const selectItem1 = (item) => {
  selectedItem1.value = item;
};

const selectItem2 = (item) => {
  selectedItem2.value = item;
};

const selectItem3 = (item) => {
  selectedItem3.value = item;
};

const mostrarDetalle = () => {
  if (selectedItem1.value) {
    console.log('Detalle de tarea asignada:', selectedItem1.value);
    // Redirigir al apartado correspondiente
  } else {
    console.log('No hay ningún registro seleccionado');
  }
};

const seguimientoTareasEnProceso = () => {
  if (selectedItem2.value) {
    console.log('Seguimiento de tarea en proceso:', selectedItem2.value);
    // Redirigir al apartado correspondiente
  } else {
    console.log('No hay ningún registro seleccionado');
  }
};

// Función para obtener datos
const fetchData = async (url, store) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.status === 200) {
      store.value = json.data;
    } else {
      console.error('Error en la respuesta:', json.message || 'Error desconocido');
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};

const fetchTareasAsignadas = () => fetchData('http://hs.com/orden', tareasAsignadas);
const fetchTareasEnProceso = () => fetchData('http://hs.com/TCorden', tareasEnProceso);
const fetchTareasCompletadas = () => fetchData('http://hs.com/TERorden', tareasCompletadas);

// Cargar datos al montar el componente
onMounted(() => {
  fetchTareasAsignadas();
  fetchTareasEnProceso();
  fetchTareasCompletadas();
});
</script>

<style scoped>
.text-left {
  text-align: left;
}

.custom-table {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-table th,
.custom-table td {
  padding: 12px 16px;
}

.custom-table thead {
  background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
  font-weight: bold;
  color: #333;
}

.sticky-header th {
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
  z-index: 1;
}

.table-wrapper {
  max-height: 500px;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
}

.table-wrapper::-webkit-scrollbar {
  width: 12px;
}

.table-wrapper::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  border-radius: 8px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 8px;
}

.filter-field {
  max-width: 320px;
  background-color: #fafafa;
}

.filter-select {
  max-width: 200px;
  margin-left: 8px;
}

.card-background {
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.selected-row {
  background-color: #e0e0e0;
}

@media (max-width: 600px) {
  .v-col {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}

@media (max-width: 400px) {
  .v-text-field,
  .v-select {
    max-width: 200px;
  }
}

.text-center {
  text-align: center;
  color: #777;
}

.mt-4 {
  margin-top: 20px;
}

.custom-btn {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
}
</style>
