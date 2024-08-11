<template>
  <v-app>
    <main>
      
    <v-container fluid class="main-container">
      <v-row>
        <!-- Componente Table1 -->
        <v-col cols="12" md="4">
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

        <!-- Componente Table2 -->
        <v-col cols="12" md="4">
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

        <!-- Componente Table3 -->
        <v-col cols="12" md="4">
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

  </main>
  
    <FooterComponent />
  </v-app>
  
</template>

<script setup>
import { ref } from 'vue'
import TablaUno from '@/components/CompCliente/TablaUno.vue'
import TablaDos from '@/components/CompCliente/TablaDos.vue'
import TablaTres from '@/components/CompCliente/TablaTres.vue'
import FooterComponent from '@/components/Generales/FooterComponent.vue'

// Definir las variables reactivas
const filterText = ref('')
const filteredItems1 = ref([])
const filteredItems2 = ref([])
const filteredItems3 = ref([])
const selectedItem1 = ref(null)
const selectedItem2 = ref(null)
const selectedItem3 = ref(null)
const showDetalleLog = ref(false)
const showSeguimientoLog = ref(false)

// Métodos para manejar selección de items
const selectItem1 = (item) => {
  selectedItem1.value = item
}

const selectItem2 = (item) => {
  selectedItem2.value = item
}

const selectItem3 = (item) => {
  selectedItem3.value = item
}

// Métodos para manejar la apertura de diálogos
const openDetalleLog = () => {
  showDetalleLog.value = true
}

const openSeguimientoLog = () => {
  showSeguimientoLog.value = true
}
</script>

<style scoped>
.table-wrapper {
  min-height: 300px; /* Establece una altura mínima */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra el contenido verticalmente */
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
  color: #ffad00;
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
  color: #ffad00;
}

footer {
  background-color: #11100e;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}
</style>
