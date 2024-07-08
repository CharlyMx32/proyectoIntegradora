<!-- src/components/Navbar.vue -->
<template>
  <v-app-bar app>
    <v-toolbar-title>Mi Aplicación</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
/* Estilos específicos para la barra de navegación */
</style>
