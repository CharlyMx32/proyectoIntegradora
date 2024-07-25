<template>
  <v-app class="Fondo">
    <v-container class="d-flex justify-center align-center fill-height pa-0" fluid>
      <v-card class="rounded-lg card-size" elevation="10" flat>
        <v-row no-gutters>
          <!-- Sección del formulario -->
          <v-col cols="12" md="6" class="pa-4">
            <v-card class="white-card" elevation="5" flat>
              <v-col cols="12" class="pa-4">
                <v-text-field outlined dense class="minimalista" />
                <v-text-field outlined dense class="minimalista" />
              </v-col>
            </v-card>
          </v-col>
          <!-- Sección del calendario -->
          <v-col cols="12" md="6" class="pa-4">
            <v-card class="white-card" elevation="5" flat>
              <v-col cols="12" class="pa-4">
                <v-date-picker width="400"></v-date-picker>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
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
}

.card-size {
  width: 80%; /* Ajusta el ancho según sea necesario */
  max-width: 900px; /* Ajusta el ancho máximo según sea necesario */
  margin: 0 auto;
  padding: 0;
}
</style>
