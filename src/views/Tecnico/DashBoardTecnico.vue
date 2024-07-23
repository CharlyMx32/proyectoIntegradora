<template>
     <v-app class="fondo">
    <v-container fluid>
      <v-row>
        <v-col :cols="mini ? 1 : 3">
          <BarraLateral
            :avatarUrl="avatarUrl"
            subtitle="edwinjoselopezgallegos@gmail.com"
            title="Tecnico"
            :items="navItems"
            @mouseenter="mini = false"
            @mouseleave="mini = true"
          ></BarraLateral>
        </v-col>

        <v-col :cols="mini ? 11 : 9">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import BarraLateral from '@/components/Generales/BarraLateralEmpleados.vue';
import { ref } from 'vue'

const avatarUrl =
  'll'

const navItems = [
  { title: 'Tareas', to: '/TAS' },
  { title: 'Mis Detalles', to: '/DES' },

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