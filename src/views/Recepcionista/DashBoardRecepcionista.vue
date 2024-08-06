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
  background: rgb(237, 232, 230);
  background-size: cover;
}
</style>

<script setup>
import BarraLateral from '@/components/Generales/BarraLateralEmpleados.vue'
import Welcome from '@/components/Generales/bienvenidaUsuarios.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore' // Usa el store de autenticación en lugar del de usuario

const navItems = [
  { title: 'Pagina Principal', to: '/PP' },
  { title: 'Agendar Citas', to: '/AGC' },
  { title: 'Asistencia Linea', to: '/AL' },
  { title: 'Asignar Cita', to: '/AC' },
  { title: 'Asignar Cita Fisico', to: '/ACF' },
  { title: 'Citas Linea', to: '/CL' },
  { title: 'Citas Fisico', to: '/CF' }
]

const mini = ref(false)
const authStore = useAuthStore()
const showWelcome = ref(true)

setTimeout(() => {
  showWelcome.value = false
}, 1500) // Duración de la animación en milisegundos

const userName = computed(() => authStore.user?.nombre || 'Admin')
const userEmail = computed(() => authStore.user?.correo || 'correo@example.com')
</script>
