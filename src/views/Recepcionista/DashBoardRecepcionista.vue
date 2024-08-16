<template>
  <v-app class="fondo">
    <Welcome :userName="userName" v-if="showWelcome" />

    <v-container fluid>
      <v-row>
        <v-col :cols="mini ? 1 : 3">
          <BarraLateral
            :avatarUrl="avatarUrl"
            :subtitle="userEmail"
            :title="userName"
            :items="navItems"
            @mouseenter="mini = false"
            @mouseleave="mini = true"
            class="sidebar"
          ></BarraLateral>
        </v-col>

        <!-- Contenido principal a la derecha -->
        <v-col :cols="mini ? 11 : 9" class="content">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.fondo {
  background: #F5F5F5;
  background-size: cover;
}
</style>

<script setup>
import BarraLateral from '@/components/Generales/BarraLateralEmpleados.vue'
import Welcome from '@/components/Generales/bienvenidaUsuarios.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const navItems = [
  { title: 'Agendar Citas', to: '/AGC', icon: 'mdi-calendar-plus' },
  { title: 'Asistencia Linea', to: '/AL', icon: 'mdi-heart-pulse' },
  { title: 'Asignar Cita', to: '/AC', icon: 'mdi-calendar-check' },
  { title: 'Asignar Cita Fisico', to: '/ACF', icon: 'mdi-calendar-edit' },
  { title: 'Citas Linea', to: '/CL', icon: 'mdi-calendar-month' },
  { title: 'Citas Fisico', to: '/CF', icon: 'mdi-calendar-week' }
]

const mini = ref(true)
const authStore = useAuthStore()
const showWelcome = ref(true)

setTimeout(() => {
  showWelcome.value = false
}, 1500) // Duración de la animación en milisegundos

const userName = computed(() => authStore.user?.nombre || 'Recepcionista')
const userEmail = computed(() => authStore.user?.correo || 'correo@example.com')
</script>
