<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    :mini-variant="mini"
    class="nav"
    @mouseenter="mini = false"
    @mouseleave="mini = true"
  >
    <v-list>
      <v-list-item class="list-item-header">
        <v-list-item-avatar>
          <v-img :src="avatarUrl" v-if="avatarUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.to" class="nav-item">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="!mini">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav class="logout-section">
      <v-list-item class="nav-item logout-item" @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="!mini">
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const mini = ref(true)

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
.nav {
  background-color: #34495e;
  color: white;
  border-right: 1px solid #444;
  width: 250px;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.list-item-header {
  border-bottom: 1px solid #444;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #bdc3c7;
  color: black;
}

.nav-item:hover {
  background-color: #bdc3c7;
  color: #fff;
}

.logout-item {
  font-weight: bold;
  color: #ffad00;
  cursor: pointer;
}

.logout-section {
  margin-top: auto;
}
</style>
