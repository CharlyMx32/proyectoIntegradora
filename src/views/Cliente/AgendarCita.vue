<template>
  <v-app class="Fondo">
    <v-container>
      <H1 style="width: 300px; color: white">AGENDAR CITA</H1>
      <br />
      <v-sheet :elevation="6" :height="300" :width="600" border color="#283593" rounded>
        <H2 style="width: 200px"> Tu producto </H2>
        <v-responsive max-width="500" style="background-color: #e8eaf6">
          <v-text-field hide-details="auto" style="color: black"></v-text-field> <br />
        </v-responsive>
        <br />
        <H3 style="width: 200px"> Detalla tu Producto </H3>
        <v-responsive max-width="500" style="background-color: #e8eaf6">
          <v-text-field hide-details="auto" style="color: black"></v-text-field> <br />
        </v-responsive>
      </v-sheet>

      <v-row justify="end" align="start">
        <v-date-picker width="400"></v-date-picker>
      </v-row>
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
