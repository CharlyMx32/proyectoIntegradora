<template>
  <v-container>
    <v-form @submit.prevent="register">
      <v-text-field v-model="email" label="Email" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn type="submit">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  // Aquí debes añadir la lógica para registrar al usuario en tu backend
  router.push({ name: 'Login' })
}
</script>
