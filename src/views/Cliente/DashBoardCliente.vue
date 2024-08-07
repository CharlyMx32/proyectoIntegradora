<template>
  <v-app>
    <Welcome :userName="userName" v-if="showWelcome" />
    <v-container fluid v-show="!showWelcome">
      <header>
        <HeaderComponent
          :title="'HardwareSolutions'"
          :menuItems="menuItems"
          :showLogout="showLogout"
          @logout="logout"
        />
      </header>
      <v-content>
        <router-view />
      </v-content>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'
import Welcome from '@/components/Generales/bienvenidaUsuarios.vue'
import HeaderComponent from '@/components/Generales/navBlancoo.vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const showWelcome = ref(true)

// Obtener el nombre del usuario desde el store
const userName = computed(() => authStore.user?.nombre || 'Admin')

// Manejo de clic en los botones de navegación
const menuItems = ref([])

// Propiedad para controlar la visibilidad del botón de Cerrar Sesión
const showLogout = ref(false)

// Función para actualizar el menú según la ruta actual
const updateMenuItems = () => {
  const currentRoute = route.path
  switch (currentRoute) {
    case '/principal':
      menuItems.value = [
        { name: 'Agendar', route: '/Agendar' },
        { name: 'Segimiento', route: '/Pedir' }
      ]
      showLogout.value = true
      break
    case '/Agendar':
      menuItems.value = [
        { name: 'Home', route: '/principal' },
        { name: 'Segimiento', route: '/Pedir' }
      ]
      showLogout.value = false
      break
    case '/Pedir':
      menuItems.value = [
        { name: 'Home', route: '/principal' },
        { name: 'Agendar', route: '/Agendar' }
      ]
      showLogout.value = false
      break
    default:
      menuItems.value = []
      showLogout.value = false
  }
}

// Función para manejar el cierre de sesión
const logout = () => {
  authStore.logout()
  router.push('/')
}

// Verificar si la bienvenida ya se ha mostrado antes
onMounted(() => {
  const welcomeShown = localStorage.getItem('welcomeShown')
  if (welcomeShown) {
    showWelcome.value = false
  } else {
    showWelcome.value = true
    localStorage.setItem('welcomeShown', 'true')
  }

  // Actualizar el menú al montar el componente
  updateMenuItems()
})

// Observar cambios en la ruta para actualizar el menú y la visibilidad del botón
watch(route, () => {
  updateMenuItems()
})
</script>

<style scoped></style>
