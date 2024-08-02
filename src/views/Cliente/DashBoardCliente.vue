<template>
  <v-app>
    <header>
      <HeaderComponent :title="'HardwareSolutions'" :menuItems="menuItems" />
    </header>
    <v-app>
      <v-content>
        <router-view />
      </v-content>
    </v-app>
  </v-app>
</template>

<script setup>
import HeaderComponent from '@/components/Generales/navBlancoo.vue'

// Manejo de clic en los botones de navegación
const menuItems = [
  { name: 'Agendar', route: '/Agendar' },
  { name: 'Segimiento', route: '/Pedir' }
]
</script>

<style scoped></style>
