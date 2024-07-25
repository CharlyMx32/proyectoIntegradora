<template>
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
          ></BarraLateral>
        </v-col>

      <!-- Contenido principal a la derecha -->
      <v-col cols="10" class="text-center fill-height">

        <router-view></router-view>

      </v-col>
    </v-row>

  </v-container>
</template>



<script setup>
import BarraLateral from '@/components/Generales/BarraLateralEmpleados.vue'
import { ref } from 'vue'

const navItems = [
  { title: 'Pagina Principal', to: '/Recepcionista' },
  { title: 'Cuenta Cliente', to: '/CC' },
  { title: 'Agendar Citas', to: '/AC' },
  { title: 'Asignar Citas', to: '/ASC' },
  { title: 'Citas Pendientes', to: '/CP' }
]

const mini = ref(false)
</script>
