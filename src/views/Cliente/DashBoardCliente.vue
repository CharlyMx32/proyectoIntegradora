<template>
  <div>
    <barra-cliente />
    <v-app>
      <v-content>
        <!-- Incluye el componente AgendarCita -->
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<script setup>
import BarraCliente from '@/components/CompCliente/BarraCliente.vue'
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para el DashBoardCliente */
</style>
