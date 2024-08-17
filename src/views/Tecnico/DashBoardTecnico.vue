<template>
  <v-container fluid class="full-height d-flex align-center justify-center">
    <Welcome :userName="userName" v-if="showWelcome" />
    <TareasFrom></TareasFrom>
  </v-container>
</template>

<script setup>
import Welcome from '@/components/Generales/bienvenidaUsuarios.vue'
import TareasFrom from './TareasFrom.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const showWelcome = ref(true)

setTimeout(() => {
  showWelcome.value = false
}, 1500) 

const userName = computed(() => authStore.user?.nombre)
</script>

<style scoped>
body {
  background-image: url('../../assets/iii.svg');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
  margin: 0;
  font-family: 'Arial', sans-serif; 
}

html,
body,
#app {
  height: 100%;
  margin: 0;
}

.full-height {
  height: 100%;
}

.v-card {
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-img {
  border-radius: 8px;
  background-image: url('/src/assets/lolo.png');
  background-size: cover;
  background-position: center;
  height: 200px; 
}

.v-card-title {
  margin-top: 16px;
}

.v-card-subtitle {
  margin-bottom: 16px;
}

.v-btn {
  background-image: linear-gradient(to right, #ffffff 0%, #26d0ce 51%, #1a2980 100%);
  color: #ffffff; 
  margin-left: 8px;
  border-radius: 4px;
  transition: background-position 0.5s ease;
  background-size: 200% auto;
}

.v-btn:hover {
  background-position: right center; 
  color: #ffffff; 
}

.v-container {
  background: rgb(237, 232, 230);
}
</style>
