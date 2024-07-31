<template>
  <v-app class="fondo">
  <v-container fluid>
    <v-row>
      <v-col :cols="mini ? 1 : 3">
          <BarraLateral
            :avatarUrl="avatarUrl"
            subtitle="marbellaperez@gmail.com"
            title="Recepcionista"
            :items="navItems"
            @mouseenter="mini = false"
            @mouseleave="mini = true"
          ></BarraLateral>
        </v-col>

      <!-- Contenido principal a la derecha -->
      <v-col cols="10" class="text-center fill-height">

        <router-view></router-view>

      </v-col>
    </v-row>

  </v-container>
</v-app>
</template>

<style scoped>
.fondo {
  background:  rgb(237, 232, 230) ;
  background-size: cover;
}
</style>

<script setup>
import BarraLateral from '@/components/Generales/BarraLateralEmpleados.vue'
import { ref } from 'vue'

const navItems = [
  { title: 'Pagina Principal', to: '/PP'},
  { title: 'Agendar Citas', to: '/AC' },
  { title: 'Asistencia Linea', to: '/CPL'},
  { title: 'Asignar Citas', to: '/ASC' },
  { title: 'Citas Linea', to: '/CL' },
  { title: 'Citas Fisico', to: '/CF' }
]

const mini = ref(false)
</script>
