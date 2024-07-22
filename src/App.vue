<!-- App.vue -->

<template>
  <v-app class="fondo">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Estilos específicos de tu aplicación si es necesario */
.fondo {
  background-color: #000;
}
</style>
