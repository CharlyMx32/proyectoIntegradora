<template>
  <v-app>
    <v-container>
      <!-- Componente Table1 -->
      <v-col cols="5" md="5">
        <TablaUno
          :filterText="filterText"
          :filteredItems="filteredItems1"
          :selectedItem="selectedItem1"
          @selectItem="selectItem1"
          @openDetalleLog="openDetalleLog"
        />
      </v-col>

      <!-- Componente Table2 -->
      <v-col cols="5" md="5">
        <TablaDos
          :filterText="filterText"
          :filteredItems="filteredItems2"
          :selectedItem="selectedItem2"
          @selectItem="selectItem2"
        />
      </v-col>

      <!-- Componente Table3 -->
      <v-col cols="5" md="5">
        <TablaTres
          :filterText="filterText"
          :filteredItems="filteredItems3"
          :selectedItem="selectedItem3"
          @selectItem="selectItem3"
          @openSeguimientoLog="openSeguimientoLog"
        />
      </v-col>

      <!-- Resto del código -->
    </v-container>

    <!-- Diálogo de Detalles -->
    <br />
    <br />
    <br />
    <!-- Pie de Página -->
    <footer>
      <v-container>
        <v-row>
          <!-- Información de Contacto -->
          <v-col cols="12" md="4">
            <div class="footer-info">
              <h4 class="footer-title">Contactos</h4>
              <p>MundoElectronicoTRC@gmail.com</p>
              <p>Teléfono: 8715265042</p>
            </div>
          </v-col>

          <!-- Enlaces de Navegación -->
          <v-col cols="12" md="4">
            <div class="footer-links">
              <h4 class="footer-title">Desarrolladores</h4>
              <p>Edwin Lopez, Carlos Centeno</p>
              <p>Diana Ochoa, Marbella Perez</p>
            </div>
          </v-col>

          <!-- Iconos Sociales -->
          <v-col cols="12" md="4">
            <div class="social-icons">
              <v-btn
                icon
                href="https://www.facebook.com/profile.php?id=100054380206513"
                target="_blank"
                class="social-icon-btn"
              >
                <!-- Icono de Facebook -->
                <svg
                  fill="#000000"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  id="facebook"
                  data-name="Flat Color"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon flat-color"
                >
                  <path
                    d="M14,6h3a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H14A5,5,0,0,0,9,7v3H7a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1H9v7a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V14h2.22a1,1,0,0,0,1-.76l.5-2a1,1,0,0,0-1-1.24H13V7A1,1,0,0,1,14,6Z"
                    style="fill: rgb(0, 0, 0)"
                  ></path>
                </svg>
              </v-btn>
              <v-btn icon href="https://instagram.com" target="_blank" class="social-icon-btn">
                <!-- Icono de Instagram -->
                <svg
                  fill="#000000"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                >
                  <path
                    d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"
                  />
                </svg>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import TablaUno from '@/components/CompCliente/TablaUno.vue'
import TablaDos from '@/components/CompCliente/TablaDos.vue'
import TablaTres from '@/components/CompCliente/TablaTres.vue'

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
  margin: 0; /* Alinea el card a la izquierda */
  font-size: 0.875rem; /* Tamaño de fuente más pequeño para el contenido del card */
}

.custom-table-container {
  max-width: 100%; /* Asegura que la tabla se ajuste al tamaño del card */
  padding: 12px; /* Reduce el padding alrededor de la tabla */
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
  background-color: #11100e; /* Color de fondo */
  color: #fff; /* Color del texto */
  padding: 20px 0; /* Espaciado superior e inferior */
  text-align: center; /* Centrar el texto */
}

/* Contenedor del pie de página */
footer .v-container {
  max-width: 1200px; /* Ancho máximo del contenedor */
  margin: 0 auto; /* Centrar el contenedor horizontalmente */
}

/* Estilo de las columnas en el pie de página */
.footer-info,
.footer-links,
.social-icons {
  margin-bottom: 20px; /* Espacio inferior */
}

/* Estilo de los títulos en el pie de página */
.footer-title {
  color: #ffad00; /* Color del título */
  margin-bottom: 10px; /* Espacio inferior del título */
  font-size: 18px; /* Tamaño de fuente del título */
  font-weight: bold; /* Negrita para el título */
}

/* Estilo de los íconos sociales */
.social-icons {
  display: flex; /* Usar flexbox para alinear los íconos */
  justify-content: center; /* Centrar los íconos horizontalmente */
  gap: 10px; /* Espacio entre íconos */
}

/* Estilo de los botones de íconos sociales */
.social-icon-btn {
  color: #fff; /* Color del ícono */
  transition: color 0.3s; /* Transición de color */
}

/* Cambio de color al pasar el ratón sobre los íconos */
.social-icon-btn:hover {
  color: #ffad00; /* Color del ícono al pasar el ratón */
}

/* Tamaño de los íconos */
.social-icon-btn svg {
  width: 24px; /* Ancho del ícono */
  height: 24px; /* Alto del ícono */
}
</style>
