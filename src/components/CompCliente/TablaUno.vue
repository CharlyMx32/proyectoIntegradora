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
              <th class="text-left">Diagnóstico Línea</th>
              <th class="text-left">Cambios</th>
              <th class="text-left">Costo Chequeo</th>
              <th class="text-left">Costo Reparación</th>
              <th class="text-left">Costo Total</th>
              <th class="text-left">Seguimiento</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in filteredItems"
              :key="'Pagadas' + idx"
              :class="{ 'selected-row': selectedItem === item }"
              @click="selectItem(item)"
            >
              <td>{{ item.producto }}</td>
              <td>{{ item.diagnostico_linea}}</td>
              <td>{{ item.cambios }}</td>
              <td>{{ item.costo_chequeo }}</td>
              <td>{{ item.costo_reparacion }}</td>
              <td>{{ item.total_costo}}</td>
              <td>{{ item.seguimiento }}</td>
            </tr>
            <tr v-if="!filteredItems.length">
              <td colspan="7" class="text-center py-4">No tienes pagos pendientes.</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore'; // Asegúrate de que esta ruta sea correcta

const store = useAuthStore(); // Accede a la store de autenticación

const localFilterText = ref('');
const selectedItem = ref(null);

 
const TablaUno = ref([]); // Inicializar como array vacío

// Función para cargar las tareas asignadas desde la API
const cargarPagos = async () => {
  try {
    const response = await axios.get('/Pago', {
      headers: {
        Authorization: `Bearer ${store.token}` // Enviar el token de autenticación
      }
    });
    console.log('Datos recibidos:', response.data); // Verifica el contenido de los datos
    if (Array.isArray(response.data)) {
      TablaUno.value = response.data;
    } else {
      console.error('La respuesta no es un array:', response.data);
      TablaUno.value = [];
    }
  } catch (error) {
    console.error('Error al cargar las tareas asignadas:', error);
    TablaUno.value = [];
  }
};


// Cargar las tareas asignadas cuando el componente se monta
onMounted(() => {
  cargarPagos();
});

// Filtrar los elementos basados en el texto de búsqueda
const filteredItems = computed(() => {
  console.log('Texto de búsqueda:', localFilterText.value); // Imprime el texto de búsqueda
  const filter = localFilterText.value.toLowerCase();
  const filtered = TablaUno .value.filter(
    (item) =>
      item.producto.toLowerCase().includes(filter) ||
      item.diagnostico_linea.toLowerCase().includes(filter) ||
      item.cambios.toLowerCase().includes(filter) ||
      item.costo_chequeo.toString().toLowerCase().includes(filter) ||
      item.costo_reparacion.toString().toLowerCase().includes(filter) ||
      item.total_costo.toString().toLowerCase().includes(filter) ||
      item.seguimiento.toLowerCase().includes(filter)
  );
  console.log('Items filtrados:', filtered); // Imprime los elementos filtrados
  return filtered;
});

// Función para seleccionar un ítem
const selectItem = (item) => {
  selectedItem.value = item;
};

// Función para abrir el diálogo de detalles

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
