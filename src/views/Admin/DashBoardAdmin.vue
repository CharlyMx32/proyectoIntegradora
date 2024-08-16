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
import '@mdi/font/css/materialdesignicons.css'
import BarraLateral from '@/components/Generales/BarraLateralEmpleados.vue'
import Welcome from '@/components/Generales/bienvenidaUsuarios.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const navItems = [
  { title: 'Registro Usuarios', to: '/RU', icon: 'mdi-account' },
  { title: 'Servicios Línea', to: '/DS', icon: 'mdi-laptop' },
  { title: 'Servicios Físicos', to: '/ServiciosFisicos', icon: 'mdi-store' },
  { title: 'Usuarios Admin', to: '/UA', icon: 'mdi-shield-account' },
  { title: 'Ganancias', to: '/ES', icon: 'mdi-chart-bar' }
]

const mini = ref(true)
const authStore = useAuthStore()
const showWelcome = ref(true)

setTimeout(() => {
  showWelcome.value = false
}, 1500)

const userName = computed(() => authStore.user?.nombre || 'Admin')
const userEmail = computed(() => authStore.user?.correo || 'correo@example.com')
</script>

<style scoped>
.sidebar {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}

.content {
  height: 100vh;
  overflow-y: auto;
  background-color: #f5f5f5;
}
</style>
