<template>
  <v-app>
    <v-navigation-drawer
      right
      app
      v-model="drawer"
      :width="drawerWidth"
      v-model:mini-variant="mini"
      class="custom-drawer"
    >
      <v-btn icon @click="toggleDrawer" class="toggle-btn">
        <v-icon>{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </v-btn>
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="menu-title">Admin</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-for="link in links" :key="link" @click="goToPage(link)" class="menu-item">
            <v-list-item-content>
              <v-list-item-title>{{ link }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const links = ref(['Registrar Usuarios', 'Detalle Servicios', 'Usuarios', 'Status Negocio'])

const router = useRouter()

const goToPage = (link) => {
  switch (link) {
    case 'Registrar Usuarios':
      router.push('/RU')
      break
    case 'Detalle Servicios':
      router.push('/DS')
      break
    case 'Usuarios':
      router.push('/Recepcionista')
      break
    case 'Status Negocio':
      router.push('/Tecnico')
      break
    default:
      break
  }
}

const drawer = ref(true)
const drawerWidth = ref(200)
const mini = ref(false)

const toggleDrawer = () => {
  mini.value = !mini.value
  drawerWidth.value = mini.value ? 64 : 200
}
</script>

<style scoped>
.toggle-btn {
  position: absolute;
  top: 16px;
  right: 8px;
  z-index: 100;
}

.custom-drawer {
  background-color: #f5f5f5; /* Color de fondo del drawer */
}

.menu-title {
  font-size: 18px; /* Tamaño de fuente del título */
  font-weight: bold; /* Negrita para el título */
  color: #333; /* Color de texto del título */
}

.menu-item {
  cursor: pointer; /* Cambia el cursor al pasar sobre los ítems del menú */
  transition: background-color 0.3s ease; /* Transición suave para el cambio de color de fondo */
}

.menu-item:hover {
  background-color: #ddd; /* Color de fondo al pasar el mouse */
}
</style>
