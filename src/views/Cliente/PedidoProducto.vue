<template>
  <v-container>
    <!-- Componente Table1 -->
    <TablaUno
    :filterText="filterText"
    :filteredItems="filteredItems1"
    :selectedItem="selectedItem1"
    @selectItem="selectItem1"
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

