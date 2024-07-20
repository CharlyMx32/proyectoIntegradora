<template>
  <v-container fluid>
    <v-row>
      <!-- Barra lateral a la izquierda -->
      <v-col cols="2">
        <BarraRecepcionista />
      </v-col>

      <!-- Contenido principal a la derecha -->
      <v-col cols="10" class="text-center fill-height">
          <v-card-title class="display-1 font-weight-bold">¡BIENVENIDO/A RECEPCIONISTA!</v-card-title>
          <p></p>
        <p class="text-uppercase  color-subtitulo">NOMBRE</p>
        <p> </p>
        <p>Alejandra Camacho</p>
        <p> </p>
        <p class="text-uppercase color-subtitulo">TELEFONO</p>
        <p> </p>
        <p>871 158 9654</p>
        <p class="text-uppercase color-subtitulo">CORREO</p>
        <p> </p>
        <p>alejandracam@hs.com</p>
        <p> </p>
        <p class="text-uppercase color-subtitulo">AREA</p>
        <p> </p>
        <p>Recepcionista</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-uppercase {
  text-transform: uppercase;
}
.display-1 {
  font-size: 2rem; /* Ajusta este tamaño según tus necesidades */
}
.fill-height {
  height: 100vh; /* Hace que el contenedor ocupe toda la altura de la ventana */
}
.color-subtitulo{
  color:rgb(218, 211, 211);
}
</style>
<script setup>
import BarraRecepcionista from '@/components/CompRecepcionista/BarraRecepcionista.vue'
</script>
