<template>
  <v-app>
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card class="elevation-10 w-25 rounded-xl card">
        <v-card-title class="headline text-center">Login</v-card-title>
        <v-divider class="my-2"></v-divider>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field v-model="email" label="Email" required> </v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required>
            </v-text-field>
            <v-btn type="submit" color="red darken-2" dark block>Ingresar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  // Aquí debes añadir la lógica para autenticar al usuario con tu backend
  const user = { email: email.value }
  const role = 'client' // Obtener el rol del usuario desde el backend
  authStore.login(user, role)

  if (role === 'admin') router.push({ name: 'AdminDashboard' })
  else if (role === 'technician') router.push({ name: 'TechnicianDashboard' })
  else if (role === 'receptionist') router.push({ name: 'ReceptionistDashboard' })
  else router.push({ name: 'ClientDashboard' })
}
</script>

<style scoped>
.fill-height {
  height: 100%;
}
.align-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}

.card {
  padding: 0%;
  margin: 0%;
}
</style>
