<template>
  <v-navigation-drawer expand-on-hover rail :mini-variant="mini" class="nav">
    <v-list>
      <v-list-item class="list-item-header">
        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.to" class="nav-item">
        {{ item.title }}
      </v-list-item>
    </v-list>

    <!-- Agregar ítem de Cerrar Sesión -->
    <v-list density="compact" nav class="logout-section">
      <v-list-item class="nav-item logout-item" @click="logout">Cerrar Sesión</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  avatarUrl: String,
  subtitle: String,
  title: String,
  items: Array
})

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
/* Estilos para personalizar la apariencia de la barra lateral */
.nav {
  background-color: #333; /* Fondo oscuro para diferenciar del fondo de la página */
  color: #fff; /* Color de texto blanco */
  border-right: 1px solid #444; /* Borde de color más claro */
  width: 250px; /* Ancho de la barra lateral */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Sombra suave */
  transition: background-color 0.3s ease; /* Transición suave para cambios de fondo */
}

.list-item-header {
  border-bottom: 1px solid #444; /* Separador debajo del encabezado */
  margin-bottom: 10px;
  padding: 10px;
  background-color: #444; /* Fondo del encabezado */
  color: #fff; /* Color de texto del encabezado */
}

.nav-item {
  color: #fff; /* Color de texto blanco */
  padding: 10px 15px;
  border-radius: 4px; /* Bordes redondeados para los ítems */
  transition:
    background-color 0.3s ease,
    color 0.3s ease; /* Transiciones suaves */
}

.nav-item:hover {
  background-color: #555; /* Fondo en hover más claro */
  color: #fff; /* Texto en hover blanco */
}

.logout-item {
  font-weight: bold;
  color: red; /* Ajusta el color según tu diseño */
  cursor: pointer;
  margin-bottom: auto; /* Empuja el ítem hacia abajo */
}

.logout-section {
  margin-top: auto;
}
</style>
