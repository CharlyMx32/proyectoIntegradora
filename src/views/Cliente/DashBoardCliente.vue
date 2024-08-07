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
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore' // Usa el store de autenticación en lugar del de usuario
import Welcome from '@/components/Generales/bienvenidaUsuarios.vue'
import HeaderComponent from '@/components/Generales/navBlancoo.vue'

const authStore = useAuthStore()
const showWelcome = ref(true)

// Obtener el nombre del usuario desde el store
const userName = computed(() => authStore.user?.nombre || 'Admin')

// Manejo de clic en los botones de navegación
const menuItems = [
  { name: 'Agendar', route: '/Agendar' },
  { name: 'Segimiento', route: '/Pedir' },
  { name: 'Cerrar Sesion', route: '/' }
]

// Verificar si la bienvenida ya se ha mostrado antes
onMounted(() => {
  const welcomeShown = localStorage.getItem('welcomeShown')
  if (welcomeShown) {
    showWelcome.value = false
  } else {
    // Mostrar la bienvenida y marcarla como mostrada en localStorage
    showWelcome.value = true
    localStorage.setItem('welcomeShown', 'true')
  }
})
</script>

<style scoped></style>
