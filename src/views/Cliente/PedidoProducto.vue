<template>
  <app>
    <v-container fluid class="main-container">
      <!-- Fila superior: Tabla 0 y Tabla 1 -->
      <v-row>
        <!-- Tabla 0 -->
        <v-col cols="12" sm="6" md="6">
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
        <v-col cols="12" sm="6" md="6">
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
      <v-row>
        <!-- Tabla 2 -->
        <v-col cols="12" sm="6" md="6">
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
        <v-col cols="12" sm="6" md="6">
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
.table-wrapper {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 16px;
}

.table-container {
  max-height: 400px;
  overflow-y: auto;
}

.footer-info,
.footer-links,
.social-icons {
  margin-bottom: 20px;
}

.footer-title {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-icon-btn {
  color: #fff;
}

.social-icon-btn:hover {
  color: #2c3e50;
}

html,
body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
}

footer {
  margin-top: auto;
}

@media (max-width: 1024px) {
  .table-wrapper {
    min-height: 250px;
  }
}

@media (max-width: 768px) {
  .table-wrapper {
    min-height: 200px;
  }

  .footer-info,
  .footer-links,
  .social-icons {
    margin-bottom: 10px;
  }

  .footer-title {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .table-wrapper {
    min-height: 150px;
  }

  .footer-title {
    font-size: 14px;
  }
}
</style>
