<template>
  <v-app class="fondo">
    <v-container fluid>
      <v-row>
        <!-- Barra lateral a la izquierda -->
        <v-col :cols="mini ? 1 : 3">
          <BarraLateral
            :avatarUrl="avatarUrl"
            subtitle="centenoavalosc@gmail.com"
            title="Admin"
            :items="navItems"
            @mouseenter="mini = false"
            @mouseleave="mini = true"
          ></BarraLateral>
        </v-col>

        <!-- Contenido principal a la derecha -->
        <v-col :cols="mini ? 11 : 9">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import BarraLateral from '@/components/Generales/BarraLateralEmpleados.vue'
import { ref } from 'vue'

const avatarUrl =
  'https://lh3.googleusercontent.com/a/ACg8ocL542XKyWRIS5_tWhiUu6EFwv4T6PeTTiRRRRUJdMnyhEWKuMmWVA=s360-c-no'

const navItems = [
  { title: 'Registro Usuarios', to: '/RU' },
  { title: 'Detalle Servicios', to: '/DS' }
]

const mini = ref(false)
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
.fondo {
  background-color: #d1d1d1;
  color: white;
}
</style>
