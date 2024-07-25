<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
          :mini-variant="mini"
        :width="drawerWidth"
        v-model="drawer"
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              subtitle="alejandracamacho@hs.com"
              title="Recepcionista"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
          <v-list-item
            v-for="link in links"
            :key="link"
            :title="link.title"
            @click="goToPage(link.route)"
          ></v-list-item>
        </v-list>
        </v-navigation-drawer>
  
        <v-main style="height: 700px"></v-main>
      </v-layout>
    </v-card>
  </template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const links = ref([
  { title: 'Pantalla Principal', route: '/Recepcionista' },
  { title: 'Registrar Cliente', route: '/RC' },
  { title: 'Agendar Citas', route: '/AC' },
  { title: 'Citas', route: '/C' },
  { title: 'Asignar Citas', route: '/AS' },
  { title: 'Citas Pendientes', route: '/CP' }
])

const router = useRouter()

const goToPage = (route) => {
  router.push(route)
}

const drawer = ref(true)
const drawerWidth = ref(200)
const mini = ref(false)

const toggleDrawer = () => {
  mini.value = !mini.value
  drawerWidth.value = mini.value ? 64 : 200
}

</script>