<template>
  <v-app class="fondo">
    <v-row justify="center" class="py-4">
      <v-col cols="14" md="10">
        
        <!-- tabla 1 -->
        <v-card class="mb-6 custom-card" outlined>
          <v-card-title>
            <v-row justify="space-between" align="center" class="w-100">
              <v-col>
                <h3 style="color:rgb(8, 0, 255);">Por pagar</h3>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-text-field
                  v-model="filterText1"
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
            <div class="table-container custom-table-container">
              <v-simple-table dense class="custom-table">
                <thead>
                  <tr>
                    <th class="text-left">Producto</th>
                    <th class="text-left">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, idx) in filteredItems1"
                    :key="'asignadas_' + idx"
                    :class="{ 'selected-row': selectedItem === item }"
                    @click="selectItem(item)"
                  >
                    <td>{{ item.producto }}</td>
                    <td>{{ item.estado }}</td>
                  </tr>
                  <tr v-if="!filteredItems1.length">
                    <td colspan="2" class="text-center py-4">No tienes pagos pendientes.</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="openDetailDialog" color="#ffffff" class="custom-btn">Pagar</v-btn>
          </v-card-actions>
        </v-card>

        <!-- tabla 2 -->
        <v-card class="mb-6 custom-card" outlined>
          <v-card-title>
            <v-row justify="space-between" align="center" class="w-100">
              <v-col>
                <h3 style="color:rgb(8, 0, 255);">En Proceso</h3>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-text-field
                  v-model="filterText2"
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
            <div class="table-container custom-table-container">
              <v-simple-table dense class="custom-table">
                <thead>
                  <tr>
                    <th class="text-left">Producto</th>
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
                    <td>{{ item.producto }}</td>
                    <td>{{ item.estado }}</td>
                  </tr>
                  <tr v-if="!filteredItems2.length">
                    <td colspan="2" class="text-center py-4">No tienes ningun producto pendiente.</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </div>
          </v-card-text>
        </v-card>

        <!-- tabla 3-->
        <v-card class="mb-6 custom-card" outlined>
          <v-card-title>
            <v-row justify="space-between" align="center" class="w-100">
              <v-col>
                <h3 style="color:rgb(8, 0, 255);">Completadas</h3>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-text-field
                  v-model="filterText3"
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
            <div class="table-container custom-table-container">
              <v-simple-table dense class="custom-table">
                <thead>
                  <tr>
                    <th class="text-left">Nombre Cliente</th>
                    <th class="text-left">Producto</th>
                    <th class="text-left">Problema</th>
                    <th class="text-left">Estado</th>
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
                    <td>{{ item.estado }}</td>
                  </tr>
                  <tr v-if="!filteredItems3.length">
                    <td colspan="4" class="text-center py-4">No hay productos.</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="openSeguimientoDialog" color="white" class="custom-btn">Detalle</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Detalle del producto - Por pagar -->
        <v-dialog v-model="showDetailDialog" max-width="800px" class="dialog-custom">
          <v-card>
            <v-card-title class="dialog-title">
              <span class="headline">Detalles del Cliente</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-form>
                    <v-text-field v-model="selectedItem.producto" label="Producto" readonly />
                    <v-text-field v-model="selectedItem.diagnostico" label="Diagnóstico en Línea" readonly />
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
              <v-btn @click="closeDetailDialog" color="secondary">
                <v-icon left>mdi-close</v-icon>
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Detalle del producto - Completadas -->
        <v-dialog v-model="showSeguimientoDialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Mi Estado</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-form>
                    <v-text-field v-model="selectedItem.nombre_cliente" label="Nombre del Cliente" readonly />
                    <v-text-field v-model="selectedItem.producto" label="Producto" readonly />
                    <v-text-field v-model="selectedItem.problema" label="Problema" readonly />
                    <v-text-field v-model="selectedItem.estado" label="Estado" readonly />
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="closeSeguimientoDialog" color="secondary">
                <v-icon left>mdi-close</v-icon>
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <footer>
      <v-container>
        <v-row>
          <!-- Información de Contacto -->
          <v-col cols="12" md="4" class="footer-info">
            <h4 class="footer-title">Contactos</h4>
            <p>MundoElectronicoTRC@gmail.com</p>
            <p>Teléfono: 8715265042</p>
          </v-col>
  
          <!-- Enlaces de Navegación -->
          <v-col cols="12" md="4" class="footer-links">
            <h4 class="footer-title">Desarrolladores</h4>
            <p>Edwin Lopez, Carlos Centeno</p>
            <p>Diana Ochoa, Marbella Perez</p>
          </v-col>
  
          <!-- Iconos Sociales -->
          <v-col cols="12" md="4" class="social-icons">
            <v-btn icon href="https://www.facebook.com/profile.php?id=100054380206513" target="_blank" class="social-icon-btn">
              <!-- Icono de Facebook -->
              <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" id="facebook" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color">
                <path d="M14,6h3a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H14A5,5,0,0,0,9,7v3H7a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1H9v7a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V14h2.22a1,1,0,0,0,1-.76l.5-2a1,1,0,0,0-1-1.24H13V7A1,1,0,0,1,14,6Z" style="fill: rgb(0, 0, 0);"></path>
              </svg>
            </v-btn>
            <v-btn icon href="https://instagram.com" target="_blank" class="social-icon-btn">
              <!-- Icono de Instagram -->
              <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"/>
              </svg>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </v-app>
</template>

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

const tareasAsignadas = ref([]);
const tareasEnProceso = ref([]);
const tareasCompletadas = ref([]);

const filteredItems1 = computed(() => {
  const filter = filterText1.value.toLowerCase();
  return tareasAsignadas.value.filter(item =>
    item.producto.toLowerCase().includes(filter) ||
    item.estado.toLowerCase().includes(filter)
  );
});

const filteredItems2 = computed(() => {
  const filter = filterText2.value.toLowerCase();
  return tareasEnProceso.value.filter(item =>
    item.producto.toLowerCase().includes(filter) ||
    item.estado.toLowerCase().includes(filter)
  );
});

const filteredItems3 = computed(() => {
  const filter = filterText3.value.toLowerCase();
  return tareasCompletadas.value.filter(item =>
    item.nombre_cliente.toLowerCase().includes(filter) ||
    item.producto.toLowerCase().includes(filter) ||
    item.problema.toLowerCase().includes(filter) ||
    item.estado.toLowerCase().includes(filter)
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
  } else {
    console.log('No se ha seleccionado ningún item.');
  }
};

const closeSeguimientoDialog = () => {
  showSeguimientoDialog.value = false;
};

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

<style scoped>
.fondo {
  background-color: #ede8e6; 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  margin: 0; 
  font-family: 'Arial', sans-serif;
}

.table-container {
  max-height: 100px; 
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
  background-color: #ffad00; 
  margin-left: 8px;
  border-radius: 4px;
  transition: background-position 0.5s ease;
  background-size: 200% auto;
}

.custom-btn:hover {
  background-position: right center; 
  color: #ffffff; 
}


/*-----------------------------------------------------------------------------------------*/


.custom-table {
  font-size: 0.875rem; /* Tamaño de fuente más pequeño */
}

.custom-table th,
.custom-table td {
  padding: 4px 8px; /* Reducir el padding */
}

.selected-row {
  background-color: #f5f5f5;
}

.custom-card {
  max-width: 600px; /* Reduce el tamaño máximo del card */
  margin: 0;        /* Alinea el card a la izquierda */
  font-size: 0.875rem; /* Tamaño de fuente más pequeño para el contenido del card */
}

.custom-table-container {
  max-width: 100%;  /* Asegura que la tabla se ajuste al tamaño del card */
  padding: 12px;     /* Reduce el padding alrededor de la tabla */
}

.custom-table {
  font-size: 0.875rem; /* Tamaño de fuente más pequeño */
}

.custom-table th,
.custom-table td {
  padding: 4px 8px; /* Reducir el padding de las celdas */
}

.custom-btn {
  font-size: 0.875rem; /* Tamaño de fuente más pequeño para el botón */
}

.text-center {
  text-align: center;
}

.py-4 {
  padding-top: 4px;
  padding-bottom: 4px;
}

/*--------PIE DE PAGINA---------*/

/* Estilo del pie de página */
footer {
  background-color: #11100e;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}

/* Estilos de los elementos del pie de página */
.footer-info, .footer-links, .social-icons {
  margin-bottom: 10px;
}

/* Estilo de los títulos del pie de página */
.footer-title {
  color: #FFAD00;
}

/* Estilo de los botones de iconos sociales */
.social-icon-btn {
  margin-right: 10px; /* Espacio entre los iconos */
}

.social-icon-btn:last-child {
  margin-right: 0; /* Elimina el margen del último ícono */
}

</style>
