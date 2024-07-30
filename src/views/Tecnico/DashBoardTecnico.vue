<template>
  <v-container fluid class="full-height d-flex align-center justify-center">
    <v-card class="pa-4 text-center" max-width="400" outlined>
      <v-img class="custom-img mb-4" height="200px" contain></v-img>
      <v-card-title>
        <h1 class="display-1 font-weight-bold">Bienvenido</h1>
      </v-card-title>
      <v-card-subtitle>
        <p class="mb-4">Organiza tus tareas de manera eficiente.</p>
      </v-card-subtitle>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="Tareas('')" large>Ir a Mis Tareas</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const Tareas = () => {
  router.push('/TAS')
}
</script>

<style scoped>
body {
  background-image: url('../../assets/iii.svg'); /* Ruta de la imagen */
  background-size: cover; /* Ajusta el tamaño de la imagen para cubrir toda la página */
  background-position: center; /* Centra la imagen en la página */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  margin: 0; /* Elimina el margen predeterminado */
  font-family: 'Arial', sans-serif; /* Fuente de la página */
}
/* Estilos para el Contenido Principal */
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.full-height {
  height: 100%;
}

.v-card {
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-img {
  border-radius: 8px;
  background-image: url('/src/assets/lolo.png');
  background-size: cover;
  background-position: center;
  height: 200px; /* Ajusta la altura según sea necesario */
}

.v-card-title {
  margin-top: 16px;
}

.v-card-subtitle {
  margin-bottom: 16px;
}

.v-btn {
  background-image: linear-gradient(to right, #ffffff 0%, #26d0ce 51%, #1a2980 100%);
  color: #ffffff; /* Texto blanco */
  margin-left: 8px;
  border-radius: 4px;
  transition: background-position 0.5s ease;
  background-size: 200% auto;
}

.v-btn:hover {
  background-position: right center; /* Cambia el fondo al hacer hover */
  color: #ffffff; /* Texto blanco */
}

.v-container {
  background: rgb(237, 232, 230);
}
</style>
