<template>
  <v-app>
    <Welcome :userName="userName" v-if="showWelcome" />
    <v-container fluid v-show="!showWelcome"> </v-container>
    <header>
      <HeaderComponent :title="'HardwareSolutions'" :menuItems="menuItems" />
    </header>
    <v-app>
      <v-content>
        <router-view />
      </v-content>
    </v-app>
  </v-app>
</template>

<script setup>
import Welcome from '@/components/Generales/bienvenidaUsuarios.vue'
import HeaderComponent from '@/components/Generales/navBlancoo.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore' // Usa el store de autenticación en lugar del de usuario

const authStore = useAuthStore()
const showWelcome = ref(true)

const userName = computed(() => authStore.user?.nombre || 'Admin')

// Manejo de clic en los botones de navegación
const menuItems = [
  { name: 'Agendar', route: '/Agendar' },
  { name: 'Segimiento', route: '/Pedir' }
]
</script>

<style scoped></style>
