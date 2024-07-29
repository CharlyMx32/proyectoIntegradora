<template>
  <v-app class="fondo">
    <v-row justify="center" class="py-4">
      <v-col cols="12" md="10">
        
         <!-- eESTA ES LA TABLA DE LAS TAREAS ASIGNADAS -->
        <v-card class="mb-6" outlined >
          <v-card-title>
            <v-row justify="space-between" align="center" class="w-100">
              <v-col>
                <h3 class="mb-0">Tareas Asignadas</h3>
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

        <!-- ESTA ES LA TABLA DE LAS TAREAS EN PROCESO LOL -->
        <v-card class="mb-6" outlined>
          <v-card-title>
            <v-row justify="space-between" align="center" class="w-100">
              <v-col>
                <h3 class="mb-0">Tareas en Proceso</h3>
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
                    <th class="text-left">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, idx) in filteredItems2"
                    :key="'proceso_' + idx"
                    :class="{ 'selected-row': selectedItem === item }"
                    @click="selectItem(item)"
                  >
                    <td>{{ item.nombre_cliente }}</td>
                    <td>{{ item.producto }}</td>
                    <td>{{ item.problema }}</td>
                    <td>{{ item.tipo_orden }}</td>
                    <td>{{ item.estado }}</td>
                  </tr>
                  <tr v-if="!filteredItems2.length">
                    <td colspan="5" class="text-center py-4">No se encontraron tareas que coincidan con el filtro.</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="openSeguimientoDialog" color="white" class="custom-btn">Seguimiento</v-btn>
          </v-card-actions>
        </v-card>

        <!-- ESTA ES LA TABLA DE TAREAS COMPLETADAS xd -->
        <v-card outlined>
          <v-card-title>
            <v-row justify="space-between" align="center" class="w-100">
              <v-col>
                <h3 class="mb-0">Tareas Completadas</h3>
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

        <!-- ESTE ES EL CUADRITO QUE SALE DESPUES DE DARLE AL BOTON DE DETALLAR  -->
   <v-dialog v-model="showDetailDialog" max-width="800px" class="dialog-custom">
  <v-card>
    <v-card-title class="dialog-title">
      <span class="headline">Detalles del Cliente</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-form>
            <v-text-field v-model="selectedItem.nombre_cliente" label="Nombre del Cliente" readonly />
            <v-text-field v-model="selectedItem.producto" label="Producto" readonly />
            <v-text-field v-model="selectedItem.problema" label="Problema" readonly />
            <v-text-field v-model="selectedItem.tipo_orden" label="Tipo de Orden" readonly />
          </v-form>
        </v-col>
        <v-col cols="12" md="6">
          <v-form>
            <v-textarea v-model="nuevosDatos.cambios" label="Cambios" placeholder="Ingrese los cambios aquí" />
            <v-text-field v-model="nuevosDatos.costoChequeo" label="Costo de Chequeo" placeholder="Ingrese el costo de chequeo aquí" />
            <v-text-field v-model="nuevosDatos.costoReparacion" label="Costo de Reparación" placeholder="Ingrese el costo de reparación aquí" />
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="guardarDatos" color="primary">
        <v-icon left>mdi-content-save</v-icon>
        Guardar Datos
      </v-btn>
      <v-btn @click="closeDetailDialog" color="secondary" >
        <v-icon left>mdi-close</v-icon>
        Cerrar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


        <!-- ESTE ES OTRO CUADRITO PERO PARA EL BOTON DE SEGUIMIENTO xd -->
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

<!-- POR MI SALUD MENTAL YA NO LE MUEVAN A MI SCRIPT -->
<script setup>
import { ref, computed, onMounted } from 'vue';

const filterText1 = ref('');
const filterText2 = ref('');
const filterText3 = ref('');
const selectedItem = ref(null);
const showDetailDialog = ref(false);
const showSeguimientoDialog = ref(false);
const nuevosDatos = ref({
  cambios: '',
  costoChequeo: '',
  costoReparacion: ''
});
const selectedStatus = ref('');
const statusOptions = ['Asignado a un técnico', 'En reparación', 'Con retraso', 'Completado'];

const tareasAsignadas = ref([]);
const tareasEnProceso = ref([]);
const tareasCompletadas = ref([]);

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
      costoReparacion: ''
    };
  } else {
    console.log('No se ha seleccionado ningún item.');
  }
};

const closeDetailDialog = () => {
  showDetailDialog.value = false;
};

const guardarDatos = () => {
  console.log('Datos guardados:', nuevosDatos.value);
  closeDetailDialog();
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

// SON LAS APIS CHAVALES, NO LES MUEVAN POR QUE ME TARDE UN MONTON  (T-T) //
const fetchData = async () => {
  try {
    const [asignadasRes, enProcesoRes, completadasRes] = await Promise.all([
      fetch('http://hs.com/orden'),
      fetch('http://hs.com/TCorden'),
      fetch('http://hs.com/TERorden')
    ]);
    const [asignadasJson, enProcesoJson, completadasJson] = await Promise.all([
      asignadasRes.json(),
      enProcesoRes.json(),
      completadasRes.json()
    ]);

    if (asignadasJson.status === 200) {
      tareasAsignadas.value = asignadasJson.data;
    }
    if (enProcesoJson.status === 200) {
      tareasEnProceso.value = enProcesoJson.data;
    }
    if (completadasJson.status === 200) {
      tareasCompletadas.value = completadasJson.data;
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<!-- PS AQUI EMPIEZA EL ESTILO, es muy obvio la vdd, 
casi ni le muevo pq Ochoa dice que no tengo OJO de diseñador -->

<style scoped>
.fondo {
  background-image: url('../../assets/iii.svg'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  margin: 0; 
  font-family: 'Arial', sans-serif;
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

.text-center {
  text-align: center;
  color: #777;
}

.mt-4 {
  margin-top: 20px;
}

.custom-btn {
  background-image: linear-gradient(to right, #1a2980 0%, #26d0ce 51%, #1a2980 100%);
  color: #ffffff; 
  margin-left: 8px;
  border-radius: 4px;
  transition: background-position 0.5s ease;
  background-size: 200% auto;
}

.custom-btn:hover {
  background-position: right center; 
  color: #ffffff; 
}
</style>
