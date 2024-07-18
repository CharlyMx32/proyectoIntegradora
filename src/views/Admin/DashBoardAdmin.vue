<template>
  <v-container fluid>
    <v-row>
      <!-- Barra lateral a la izquierda -->
      <v-col cols="2">
        <BarraLateral
          :avatarUrl="avatarUrl"
          subtitle="centenoavalosc@gmail.com"
          title="Admin"
          :items="navItems"
        ></BarraLateral>
      </v-col>

      <!-- Contenido principal a la derecha -->
      <v-col cols="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import BarraLateral from '@/components/Generales/BarraLateralEmpleados.vue'
import {} from 'vue'
import { useRouter } from 'vue-router'

const avatarUrl =
  'https://lh3.googleusercontent.com/a/ACg8ocL542XKyWRIS5_tWhiUu6EFwv4T6PeTTiRRRRUJdMnyhEWKuMmWVA=s360-c-no'

const navItems = [
  { title: 'Registro Usuarios', to: '/RU' },
  { title: 'Detalle Servicios', to: '/DS' }
]

// Esto te permite navegar entre las vistas usando Vue Router
const router = useRouter()
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
