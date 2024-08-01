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

    // Después de la autenticación, redirige basado en el rol del usuario
    const userRole = authStore.user?.id_rol
    console.log('Rol del usuario:', userRole)

    switch (userRole) {
      case 1:
        router.push({ path: '/admin' })
        break
      case 2:
        router.push({ path: '/Cliente' })
        break
      case 3:
        router.push({ path: '/Recepcionista' })
        break
      case 4:
        router.push({ path: '/Tecnico' })
        break
      default:
        router.push({ path: '/login' })
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error)
    showErrorSnackbar.value = true
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  overflow-y: hidden;
  background-color: var(--v-theme-background);
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
  color: var(--v-theme-text-primary);
  width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: var(--v-theme-surface);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--v-theme-shadow);
  z-index: 1;
}

.v-text-field,
.custom-input-container {
  width: 100%;
}

.minimalista {
  border: 1px solid var(--v-theme-border);
  border-radius: 8px;
  background-color: var(--v-theme-background);
  box-shadow: 0 2px 4px var(--v-theme-shadow);
}

.v-btn {
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--v-theme-shadow);
  text-transform: uppercase;
  background-color: var(--v-theme-primary);
  color: var(--v-theme-on-primary);
}

.v-btn:hover {
  background-color: var(--v-theme-primary-dark);
  transition: background-color 0.3s;
}

.v-text-field:focus {
  box-shadow: 0 0 0 2px var(--v-theme-primary);
}
</style>
