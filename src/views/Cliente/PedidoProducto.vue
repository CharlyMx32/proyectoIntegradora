<template>
  <app>
    <v-container fluid class="main-container">
      <!-- Fila superior: Tabla 0 y Tabla 1 -->
      <v-row class="tables-row">
        <!-- Tabla 0 -->
        <v-col cols="12" sm="6" md="6" class="table-col">
          <div class="table-wrapper">
            <TablaCero
              :filterText="filterText"
              :filteredItems="filteredItems4"
              :selectedItem="selectedItem4"
              @selectItem="selectItem4"
              @openDetalleLog="openDetalleLog"
            />
          </div>
        </v-col>

        <!-- Tabla 1 -->
        <v-col cols="12" sm="6" md="6" class="table-col">
          <div class="table-wrapper">
            <TablaUno
              :filterText="filterText"
              :filteredItems="filteredItems1"
              :selectedItem="selectedItem1"
              @selectItem="selectItem1"
              @openDetalleLog="openDetalleLog"
            />
          </div>
        </v-col>
      </v-row>

      <!-- Fila inferior: Tabla 2 y Tabla 3 -->
      <v-row class="tables-row bottom-row">
        <!-- Tabla 2 -->
        <v-col cols="12" sm="6" md="6" class="table-col">
          <div class="table-wrapper">
            <TablaDos
              :filterText="filterText"
              :filteredItems="filteredItems2"
              :selectedItem="selectedItem2"
              @selectItem="selectItem2"
              @openDetalleLog="openDetalleLog"
            />
          </div>
        </v-col>

        <!-- Tabla 3 -->
        <v-col cols="12" sm="6" md="6" class="table-col">
          <div class="table-wrapper">
            <TablaTres
              :filterText="filterText"
              :filteredItems="filteredItems3"
              :selectedItem="selectedItem3"
              @selectItem="selectItem3"
              @openSeguimientoLog="openSeguimientoLog"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Diálogo de Detalles -->
    <v-dialog v-model="showDetalleLog" max-width="800px">
      <!-- Agrega aquí el contenido del diálogo -->
    </v-dialog>

    <v-dialog v-model="showSeguimientoLog" max-width="800px">
      <!-- Agrega aquí el contenido del diálogo -->
    </v-dialog>
  </app>
  <FooterComponent />
</template>

<script setup>
import { ref } from 'vue'
import TablaCero from '@/components/CompCliente/TablaCero.vue'
import TablaUno from '@/components/CompCliente/TablaUno.vue'
import TablaDos from '@/components/CompCliente/TablaDos.vue'
import TablaTres from '@/components/CompCliente/TablaTres.vue'
import FooterComponent from '@/components/Generales/FooterComponent.vue'

const filterText = ref('')
const filteredItems1 = ref([])
const filteredItems2 = ref([])
const filteredItems3 = ref([])
const selectedItem4 = ref(null)
const selectedItem1 = ref(null)
const selectedItem2 = ref(null)
const selectedItem3 = ref(null)
const showDetalleLog = ref(false)
const showSeguimientoLog = ref(false)

// Métodos para manejar selección de items
const selectItem4 = (item) => {
  selectedItem4.value = item
}

const selectItem1 = (item) => {
  selectedItem1.value = item
}

const selectItem2 = (item) => {
  selectedItem2.value = item
}

const selectItem3 = (item) => {
  selectedItem3.value = item
}

const openDetalleLog = () => {
  showDetalleLog.value = true
}

const openSeguimientoLog = () => {
  showSeguimientoLog.value = true
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0;
}

.tables-row {
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0; /* Elimina todo el padding de las filas */
}

.table-col {
  padding: 0; /* Elimina todo el padding de las columnas */
}

.table-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
  margin-bottom: 8px; /* Reduce el espacio entre tablas */
}

.bottom-row {
  margin-top: -80px; /* Reduce aún más el espacio entre la fila superior e inferior */
}

@media (max-width: 1024px) {
  .table-wrapper {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .table-wrapper {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .table-wrapper {
    height: 150px;
  }
}
</style>
