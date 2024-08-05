<template>
  <v-app>
    <Welcome :userName="userName" v-if="showWelcome" />
    <v-container fluid v-show="!showWelcome">
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

        <v-col :cols="mini ? 11 : 9" class="content">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import BarraLateral from '@/components/Generales/BarraLateralEmpleados.vue'
import Welcome from '@/components/Generales/bienvenidaUsuarios.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore' // Usa el store de autenticación en lugar del de usuario

const navItems = [
  { title: 'Registro Usuarios', to: '/RU' },
  { title: 'Servicios Linea', to: '/DS' },
  { title: 'Servicios Fisicos', to: '/ServiciosFisicos' },
  { title: 'Usuarios Admin', to: '/UA' }
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

<style scoped>
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
