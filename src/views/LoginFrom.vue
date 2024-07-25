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
html,
body {
  height: 100%;
  margin: 0;
  overflow-y: hidden; /* Oculta el scroll vertical */
}

.fill-height {
  height: 100%;
  overflow: hidden; /* Oculta el scroll vertical y horizontal si hay desbordamiento */
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
}

.gradient-background {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    135deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(1, 1, 94, 1) 48%,
    rgba(0, 142, 171, 1) 100%
  );
}

.card-size {
  width: 80%; /* Ajusta el ancho según sea necesario */
  max-width: 900px; /* Ajusta el ancho máximo según sea necesario */
  margin: 0 auto;
  padding: 0;
}

.white-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-text-field,
.custom-input-container {
  width: 100%; /* Asegúrate de que los campos de texto ocupen todo el ancho disponible */
}

.minimalista {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: none;
}

.v-btn {
  width: 100%; /* Asegúrate de que el botón ocupe todo el ancho disponible */
}
</style>
