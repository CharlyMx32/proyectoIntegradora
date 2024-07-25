<template>
  <v-app class="fondo">
    <v-container fluid>
      <v-row>
        <v-col :cols="mini ? 1 : 3">
          <BarraLateral
            :avatarUrl="avatarUrl"
            subtitle="centenoavalosc@gmail.com"
            title="Admin"
            :items="navItems"
            @mouseenter="mini = false"
            @mouseleave="mini = true"
            class="sidebar"
          ></BarraLateral>
        </v-col>

        <v-col :cols="mini ? 11 : 9" class="content">
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
  { title: 'Detalle Servicios', to: '/DS' },
  { title: 'Usuarios Admin', to: '/UA' },
  { title: 'Status', to: '/SN' }
]

const mini = ref(false)
</script>

<style scoped>
.fondo {
  background: url('../../assets/fondo.svg') no-repeat center center fixed;
  background-size: cover;
}
.sidebar {
  height: 100vh; /* Altura completa de la ventana */
  position: fixed; /* Fijar la barra lateral */
  top: 0;
  left: 0;
  overflow-y: auto; /* Permitir desplazamiento si la barra lateral tiene mucho contenido */
}

.content {
  height: 100vh; /* Altura completa de la ventana */
  overflow-y: auto; /* Permitir desplazamiento en el área de contenido */
}
</style>
