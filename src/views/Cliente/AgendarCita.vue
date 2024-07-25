<template>
  <v-app class="Fondo fill-height">
    <v-container class="d-flex justify-center align-center fill-height">
      <v-card class="white-card" :elevation="6" max-width="900" color="#283593" rounded>
        <v-card-title>
          <H1 style="width: 100%; color: white">AGENDAR CITA</H1>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="nested-card" :elevation="2">
                <v-card-title>
                  <H2>Tu producto</H2>
                </v-card-title>
                <v-card-text>
                  <v-select
                    :items="productos"
                    label="Selecciona un producto"
                    hide-details="auto"
                    style="color: black"
                  ></v-select>
                </v-card-text>
              </v-card>
              <v-card class="nested-card mt-4" :elevation="2">
                <v-card-title>
                  <H3>Detalla tu Producto</H3>
                </v-card-title>
                <v-card-text>
                  <v-textarea
                    label="Descripción del producto"
                    hide-details="auto"
                    style="color: black"
                  ></v-textarea>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column align-center">
              <v-card class="nested-card" :elevation="2" width="100%">
                <v-card-title>
                  <H3>Fecha de la Cita</H3>
                </v-card-title>
                <v-card-text>
                  <v-date-picker width="100%"></v-date-picker>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const productos = ref([
  'Laptop',
  'Tablet',
  'Teléfono móvil',
  'Televisión',
  'Consola de videojuegos',
  'Otros'
])
</script>

<style scoped>
.Fondo {
  background: url('../../assets/iii.svg') no-repeat center center fixed;
  background-size: cover;
  height: 100%;
}

html,
body {
  height: 100%;
  margin: 0;
  overflow-y: hidden; /* Oculta el scroll vertical */
}

.fill-height {
  height: 100%;
  overflow: hidden; /* Oculta el scroll vertical y horizontal si hay desbordamiento */
}

.white-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Asegura que el contenido no se desborde */
}

.nested-card {
  background: #e8eaf6;
  padding: 20px;
  width: 350px;
  border-radius: 8px;
  max-height: 200px; /* Ajusta según el espacio que necesitas */
  overflow-y: auto; /* Permite el desplazamiento interno si el contenido es demasiado grande */
}
</style>
