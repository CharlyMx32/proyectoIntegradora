<template>
  <v-app>
    <v-container fluid>
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
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'
<<<<<<< Updated upstream
import Welcome from '@/components/Generales/bienvenidaUsuarios.vue'
=======

>>>>>>> Stashed changes
import HeaderComponent from '@/components/Generales/navBlancoo.vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const showWelcome = ref(true)

const menuItems = ref([])

const showLogout = ref(false)

const updateMenuItems = () => {
  const currentRoute = route.path
  switch (currentRoute) {
    case '/principal':
      menuItems.value = [
        { name: 'Agendar', route: '/Agendar' },
        { name: 'Seguimiento', route: '/Pedir' }
      ]
      showLogout.value = true
      break
    case '/Agendar':
      menuItems.value = [
        { name: 'Home', route: '/principal' },
        { name: 'Seguimiento', route: '/Pedir' }
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

const logout = () => {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  const welcomeShown = localStorage.getItem('welcomeShown')
  if (welcomeShown) {
    showWelcome.value = false
  } else {
    showWelcome.value = true
    localStorage.setItem('welcomeShown', 'true')
  }

  updateMenuItems()
})

watch(route, () => {
  updateMenuItems()
})
</script>

<style scoped></style>
