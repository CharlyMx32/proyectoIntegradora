<template>
  <v-app>
    <v-container
      class="fill-height d-flex align-center justify-center gradient-background pa-0"
      fluid
    >
      <v-card class="rounded-lg card-size" elevation="10" flat>
        <v-row no-gutters>
          <!-- Sección de imagen -->
          <v-col
            cols="12"
            md="5"
            class="d-flex flex-column align-center justify-center pa-4 fondoimg"
          >
            <!-- Puedes reemplazar 'loginRegister.svg' con la imagen que desees -->
          </v-col>

          <!-- Sección del formulario -->
          <v-col cols="12" md="7" class="pa-4">
            <v-card class="white-card" elevation="5" flat>
              <v-card-title class="headline text-center">Login</v-card-title>
              <v-divider class="my-2"></v-divider>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field v-model="email" label="Email" required></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-btn type="submit" color="red darken-2" dark block>Ingresar</v-btn>
                </v-form>
                <!-- Mensaje de error -->
                <v-snackbar
                  v-if="authStore.errorMessage"
                  v-model="showErrorSnackbar"
                  color="error"
                  timeout="3000"
                  @input="clearErrorMessage"
                >
                  {{ authStore.errorMessage }}
                </v-snackbar>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()
const showErrorSnackbar = ref(false)

const login = async () => {
  try {
    await authStore.login(email.value, password.value)

    const userRole = authStore.user?.role // Ajusta según cómo obtengas el rol del usuario
    if (userRole === 1) router.push({ name: 'AdminDashboard' })
    else if (userRole === 4) router.push({ name: 'TechnicianDashboard' })
    else if (userRole === 3) router.push({ name: 'ReceptionistDashboard' })
    else if (userRole === 2) router.push({ name: 'ClientDashboard' })
    else router.push({ name: 'Login' }) // Redirige a login si el rol no coincide
  } catch (error) {
    console.error('Error en el inicio de sesión:', error)
    showErrorSnackbar.value = true
  }
}

function clearErrorMessage() {
  authStore.errorMessage = ''
  showErrorSnackbar.value = false
}
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  overflow-y: hidden;
}

.fill-height {
  height: 100%;
  overflow: hidden;
  position: relative;
}

#particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.fondoimg {
  background: url('../assets/loginRegister.svg');
  background-size: cover;
  color: #fff;
  width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.gradient-background {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    135deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(1, 1, 94, 1) 48%,
    rgba(0, 142, 171, 1) 100%
  );
  z-index: 1;
}

.card-size {
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
  z-index: 1;
}

.white-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.v-text-field,
.custom-input-container {
  width: 100%;
}

.minimalista {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-btn {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
}

.v-btn:hover {
  background-color: #0056b3;
  transition: background-color 0.3s;
}

.v-text-field:focus {
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}
</style>
