<template>
  <v-app class="fondo">
    <!-- Botón de Cerrar Sesión -->
    <v-row justify="end" class="py-2 px-4">
      <v-btn @click="logout" class="custom-btn logout-btn">
        <v-icon left>mdi-logout</v-icon>
        Cerrar Sesión
      </v-btn>
    </v-row>
    <v-row justify="center" class="py-4">
      <v-col cols="12" md="10">
        <!-- ESTA ES LA TABLA DE LAS TAREAS ASIGNADAS -->
        <v-card class="mb-6" outlined>
          <v-card-title>
            <v-row justify="space-between" align="center" class="w-100">
              <v-col>
                <h3 class="mb-0" style="color: #0800ff;">Tareas Asignadas</h3>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-text-field
                  v-model="filterText1"
                  label="Buscar Tareas Asignadas"
                  outlined
                  dense
                  hide-details
                  class="filter-field"
                  prepend-icon="mdi-magnify"
                  @input="filterText1 = filterText1.replace(/[^a-zA-Z\s]/g, '')"
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
                    <th class="text-left">Tipo de Orden</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, idx) in filteredItems1"
                    :key="'asignadas_' + idx"
                    :class="{ 'selected-row': selectedItem === item }"
                    @click="selectItem(item)"
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
            <v-btn @click="openDetailDialog" color="white" class="custom-btn">Detallar</v-btn>
          </v-card-actions>
        </v-card>

        <!-- ESTA ES LA TABLA DE LAS TAREAS EN PROCESO -->
        <v-card class="mb-6" outlined>
          <v-card-title>
            <v-row justify="space-between" align="center" class="w-100">
              <v-col>
                <h3 class="mb-0" style="color: #0800ff;">Tareas en Proceso</h3>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-text-field
                  v-model="filterText2"
                  label="Buscar Tareas en Proceso"
                  outlined
                  dense
                  hide-details
                  class="filter-field"
                  prepend-icon="mdi-magnify"
                  @input="filterText2 = filterText2.replace(/[^a-zA-Z\s]/g, '')"
                ></v-text-field>
                <v-select
                  v-model="selectedStateFilter"
                  :items="stateOptions"
                  label="Filtrar por Estado"
                  outlined
                  dense
                  class="ml-4"
                ></v-select>
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
                    <th class="text-left">Tipo de Orden</th>
                    <th class="text-left">Estado</th>
                    <th class="text-left">Seguimiento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, idx) in filteredItems2"
                    :key="'proceso_' + idx"
                    :class="{ 'selected-row': selectedItem === item, 'disabled-row': item.estado === 'Aceptado' }"
                    @click="item.estado !== 'Aceptado' ? selectItem(item) : null"
                  >
                    <td>{{ item.nombre_cliente }}</td>
                    <td>{{ item.producto }}</td>
                    <td>{{ item.problema }}</td>
                    <td>{{ item.tipo_orden }}</td>
                    <td>{{ item.estado }}</td>
                    <td>
                      <v-btn
                        :disabled="item.estado === 'Aceptado'"
                        @click.stop="openSeguimientoDialog"
                        color="primary"
                        class="mr-2"
                      >
                        Seguimiento
                      </v-btn>
                    </td>
                  </tr>
                  <tr v-if="!filteredItems2.length">
                    <td colspan="6" class="text-center py-4">No se encontraron tareas que coincidan con el filtro.</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="openSeguimientoDialog" color="white" class="custom-btn">Seguimiento</v-btn>
          </v-card-actions>
        </v-card>

        <!-- ESTA ES LA TABLA DE TAREAS COMPLETADAS -->
        <v-card outlined>
          <v-card-title>
            <v-row justify="space-between" align="center" class="w-100">
              <v-col>
                <h3 class="mb-0" style="color: #0800ff;">Tareas Completadas</h3>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-text-field
                  v-model="filterText3"
                  label="Buscar Tareas Completadas"
                  outlined
                  dense
                  hide-details
                  class="filter-field"
                  prepend-icon="mdi-magnify"
                  @input="filterText3 = filterText3.replace(/[^a-zA-Z\s]/g, '')"
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
                    <th class="text-left">Tipo de Orden</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, idx) in filteredItems3"
                    :key="'completadas_' + idx"
                    :class="{ 'selected-row': selectedItem === item }"
                    @click="selectItem(item)"
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

        <!-- ESTE ES EL CUADRITO QUE SALE DESPUES DE DARLE AL BOTON DE DETALLAR -->
        <v-dialog v-model="showDetailDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Detalles del Item</span>
      </v-card-title>
      <v-card-subtitle>
        <v-text-field
          v-model="nuevosDatos.cambios"
          label="Cambios"
        ></v-text-field>
        <v-text-field
          v-model="nuevosDatos.costoChequeo"
          label="Costo de Chequeo"
        ></v-text-field>
        <v-text-field
          v-model="nuevosDatos.costoReparacion"
          label="Costo de Reparación"
        ></v-text-field>
        <v-text-field
          v-model="nuevosDatos.diagnostico"
          label="Diagnóstico"
        ></v-text-field>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn @click="saveDetails" color="primary">
          <v-icon left>mdi-content-save</v-icon>
          Guardar Datos
        </v-btn>
        <v-btn @click="closeDetailDialog" color="secondary">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

        <!-- ESTE ES OTRO CUADRITO PERO PARA EL BOTON DE SEGUIMIENTO -->
        <v-dialog v-model="showSeguimientoDialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Seguimiento de Tarea</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-form>
                    <v-text-field v-model="selectedItem.nombre_cliente" label="Nombre del Cliente" readonly />
                    <v-text-field v-model="selectedItem.producto" label="Producto" readonly />
                    <v-text-field v-model="selectedItem.problema" label="Problema" readonly />
                    <v-text-field v-model="selectedItem.tipo_orden" label="Tipo de Orden" readonly />
                    <v-select
                      v-model="selectedStatus"
                      :items="statusOptions"
                      label="Seleccionar Estado"
                      outlined
                      dense
                    ></v-select>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="updateStatus" color="primary" class="mr-2">
                <v-icon left>mdi-check</v-icon>
                Actualizar Estado
              </v-btn>
              <v-btn @click="closeSeguimientoDialog" color="secondary">
                <v-icon left>mdi-close</v-icon>
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-app>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const filterText1 = ref('');
const filterText2 = ref('');
const filterText3 = ref('');
const selectedItem = ref(null);
const showDetailDialog = ref(false);
const showSeguimientoDialog = ref(false);
const nuevosDatos = ref({
  cambios: '',
  costoChequeo: '',
  costoReparacion: '',
  diagnostico: ''
});
const selectedStatus = ref('');
const statusOptions = ['Asignado a un técnico', 'En reparación', 'Con retraso', 'Completado'];
const stateOptions = ['Aceptado', 'Rechazado', 'En Espera'];

const selectedStateFilter = ref('');

const tareasAsignadas = ref([]);
const tareasEnProceso = ref([]);
const tareasCompletadas = ref([]);

const router = useRouter();

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
  const stateFilter = selectedStateFilter.value;
  return tareasEnProceso.value
    .filter(item => 
      item.nombre_cliente.toLowerCase().includes(filter) ||
      item.producto.toLowerCase().includes(filter) ||
      item.problema.toLowerCase().includes(filter) ||
      item.tipo_orden.toLowerCase().includes(filter) ||
      item.estado.toLowerCase().includes(filter)
    )
    .filter(item => stateFilter ? item.estado === stateFilter : true);
});

const filteredItems3 = computed(() => {
  const filter = filterText3.value.toLowerCase();
  return tareasCompletadas.value.filter(item =>
    item.nombre_cliente.toLowerCase().includes(filter) ||
    item.producto.toLowerCase().includes(filter) ||
    item.problema.toLowerCase().includes(filter) ||
    item.tipo_orden.toLowerCase().includes(filter)
  );
});

const selectItem = (item) => {
  selectedItem.value = item;
};

const openDetailDialog = () => {
  if (selectedItem.value) {
    showDetailDialog.value = true;
    nuevosDatos.value = {
      cambios: '',
      costoChequeo: '',
      costoReparacion: '',
      diagnostico: ''
    };
  } else {
    console.log('No se ha seleccionado ningún item.');
  }
};

const closeDetailDialog = () => {
  showDetailDialog.value = false;
};

const saveDetails = async () => {
  if (selectedItem.value) {
    try {
      await axios.post('/api/guardar_detalles', {
        item: selectedItem.value,
        datos: nuevosDatos.value
      });
      alert('Datos guardados exitosamente.');
      closeDetailDialog(); // Cierra el diálogo después de guardar
    } catch (error) {
      console.error('Error al guardar los detalles:', error);
      alert('Hubo un problema al guardar los detalles.');
    }
  } else {
    console.log('No se ha seleccionado ningún item.');
  }
};

const openSeguimientoDialog = () => {
  if (selectedItem.value) {
    showSeguimientoDialog.value = true;
    selectedStatus.value = selectedItem.value.estado;
  } else {
    console.log('No se ha seleccionado ningún item.');
  }
};

const closeSeguimientoDialog = () => {
  showSeguimientoDialog.value = false;
};

const updateStatus = () => {
  if (selectedItem.value) {
    selectedItem.value.estado = selectedStatus.value;
    console.log('Estado actualizado:', selectedItem.value);
    closeSeguimientoDialog();
  } else {
    console.log('No se ha seleccionado ningún item.');
  }
};

const logout = () => {
  router.push('/login');
};

const fetchData = async () => {
  try {
    const [asignadasRes, enProcesoRes, completadasRes] = await Promise.all([
      axios.get('/TERorden'),
      axios.get('/TCorden'),
      axios.get('/orden')
    ]);

    if (asignadasRes.status === 200) {
      tareasAsignadas.value = asignadasRes.data.data;
    }
    if (enProcesoRes.status === 200) {
      tareasEnProceso.value = enProcesoRes.data.data;
    }
    if (completadasRes.status === 200) {
      tareasCompletadas.value = completadasRes.data.data;
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.fondo {
  background: rgb(237, 232, 230);
}

.table-container {
  max-height: 300px; 
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
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
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
  font-weight: bold;
  color: #333;
  z-index: 1;
}

.filter-field {
  max-width: 300px;
}

.filter-field .v-input__prepend-inner {
  color: #1976d2;
}

.selected-row {
  background-color: #e3f2fd;
}

.disabled-row {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.text-center {
  text-align: center;
  color: #777;
}

.mt-4 {
  margin-top: 20px;
}

/* Estilo unificado para todos los botones */
.v-btn, .custom-btn {
  background-color: #FFAD00; /* Color de fondo */
  color: #ffffff; /* Color del texto */
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.v-btn:hover, .custom-btn:hover {
  background-color: #e0a800; /* Color de fondo en hover */
  color: #ffffff; /* Color del texto en hover */
}

.v-btn:disabled, .custom-btn:disabled {
  background-color: #f5f5f5; /* Color de fondo para botones deshabilitados */
  color: #cccccc; /* Color del texto para botones deshabilitados */
  cursor: not-allowed; /* Cursor cuando el botón está deshabilitado */
}

.custom-btn {
  margin-left: 8px;
}

/* Estilo para el botón de cerrar sesión */
.logout-btn {
  background-color: #FFAD00; /* Color de fondo igual a los otros botones */
  color: #ffffff; /* Color del texto */
}

.logout-btn:hover {
  background-color: #e0a800; /* Color de fondo en hover igual a los otros botones */
}
</style>
