<template>
  <v-container>
    <!-- Componente Table1 -->
    <TablaUno
      :filterText="filterText"
      :filteredItems="filteredItems1"
      :selectedItem="selectedItem1"
      @selectItem="selectItem1"
      @openDetalleLog="openDetalleLog"
    />

    <!-- Componente Table2 -->
    <TablaDos
      :filterText="filterText"
      :filteredItems="filteredItems2"
      :selectedItem="selectedItem2"
      @selectItem="selectItem2"
    />

    <!-- Componente Table3 -->
    <TablaTres
      :filterText="filterText"
      :filteredItems="filteredItems3"
      :selectedItem="selectedItem3"
      @selectItem="selectItem3"
      @openSeguimientoLog="openSeguimientoLog"
    />

    <!-- Diálogo de Detalles -->
    
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import TablaUno from '@/components/CompCliente/TablaUno.vue';
import TablaDos from '@/components/CompCliente/TablaDos.vue';
import TablaTres from '@/components/CompCliente/TablaTres.vue';


// Definir las variables reactivas
const filterText = ref('');
const filteredItems1 = ref([]);
const filteredItems2 = ref([]);
const filteredItems3 = ref([]);
const selectedItem1 = ref(null);
const selectedItem2 = ref(null);
const selectedItem3 = ref(null);
const showDetalleLog = ref(false);
const showSeguimientoLog = ref(false);


// Métodos para manejar selección de items
const selectItem1 = (item) => {
  selectedItem1.value = item;
};

const selectItem2 = (item) => {
  selectedItem2.value = item;
};

const selectItem3 = (item) => {
  selectedItem3.value = item;
};

// Métodos para manejar la apertura de diálogos
const openDetalleLog = () => {
  showDetalleLog.value = true;
};

const openSeguimientoLog = () => {
  showSeguimientoLog.value = true;
};
</script>
