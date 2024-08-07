<template>
  <v-app>
    <!-- Encabezado -->
    <header>
      <HeaderComponent :title="'HardwareSolutions'" :menuItems="menuItems" />
    </header>

    <!-- Contenido Principal -->
    <v-main>
      <v-container class="d-flex justify-center align-center fill-height background pa-0">
        <!-- Contenedor para partículas -->
        <div id="particles-container"></div>

        <v-card class="rounded-lg card-size" elevation="10" flat>
          <v-row no-gutters>
            <!-- Sección de bienvenida -->
            <v-col
              cols="12"
              md="5"
              class="d-flex flex-column align-center justify-center pa-4 fondoimg"
            >
              <!-- Puedes agregar contenido de bienvenida aquí -->
            </v-col>

            <!-- Sección del formulario -->
            <v-col cols="12" md="7" class="pa-4">
              <v-card class="white-card" elevation="5" flat>
                <v-col cols="12" class="pa-4">
                  <v-form>
                    <template v-if="step === 1">
                      <v-row>
                        <v-col cols="12" class="pa-1">
                          <v-text-field
                            id="nombre"
                            label="Nombre"
                            v-model="form.nombre"
                            outlined
                            dense
                            class="minimalista"
                            :rules="[
                              v => !!v || 'Nombre es obligatorio',
                              v => /^[a-zA-Z\s]+$/.test(v) || 'El nombre solo debe contener letras y espacios'
                            ]"
                          />
                        </v-col>
                        <v-col cols="12" class="pa-1">
                          <v-text-field
                            id="apellido_paterno"
                            label="Apellido Paterno"
                            v-model="form.apellido_paterno"
                            outlined
                            dense
                            class="minimalista"
                            :rules="[
                              v => !!v || 'Apellido Paterno es obligatorio',
                              v => /^[a-zA-Z\s]+$/.test(v) || 'El apellido debe contener solo letras y espacios'
                            ]"
                          />
                        </v-col>
                        <v-col cols="12" class="pa-1">
                          <v-text-field
                            id="apellido_materno"
                            label="Apellido Materno"
                            v-model="form.apellido_materno"
                            outlined
                            dense
                            class="minimalista"
                            :rules="[
                              v => !!v || 'Apellido Materno es obligatorio',
                              v => /^[a-zA-Z\s]+$/.test(v) || 'El apellido debe contener solo letras y espacios'
                            ]"
                          />
                        </v-col>
                      </v-row>
                      <v-btn color="#FFAD00" @click="nextStep" class="mt-4">Continuar</v-btn>
                    </template>
                    <template v-else>
                      <v-row>
                        <v-col cols="12" class="pa-1">
                          <v-text-field
                            id="correo"
                            label="Correo"
                            v-model="form.correo"
                            outlined
                            dense
                            class="minimalista mb-3"
                            :rules="[
                              v => !!v || 'Correo es obligatorio',
                              v => /.+@.+\..+/.test(v) || 'Correo electrónico no válido'
                            ]"
                          />
                        </v-col>
                        <v-col cols="12" class="pa-1">
                          <v-text-field
                            id="contraseña"
                            label="Contraseña"
                            type="password"
                            v-model="form.contraseña"
                            outlined
                            dense
                            class="minimalista mb-3"
                            :rules="[
                              v => !!v || 'Contraseña es obligatoria',
                              v => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres'
                            ]"
                          />
                        </v-col>
                        <v-col cols="12" class="pa-1">
                          <v-text-field
                            id="confirmarContraseña"
                            label="Confirmar Contraseña"
                            type="password"
                            v-model="form.confirmarContraseña"
                            outlined
                            dense
                            class="minimalista mb-3"
                            :rules="[
                              v => !!v || 'Confirmar Contraseña es obligatoria',
                              v => v === form.contraseña || 'Las contraseñas no coinciden'
                            ]"
                          />
                        </v-col>
                      </v-row>
                      <v-btn color="#FFAD00" @click="prevStep" class="mt-4 mr-2">Regresar</v-btn>
                      <v-btn
                        color="#FFAD00"
                        :disabled="!isFormComplete"
                        @click="registrarse"
                        class="mt-4"
                      >
                        Registrarse
                      </v-btn>
                    </template>
                  </v-form>
                </v-col>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

        <!-- Mensaje de éxito -->
        <v-snackbar
          v-if="successMessage"
          v-model="showSuccessSnackbar"
          color="success"
          timeout="3000"
          @input="clearSuccessMessage"
        >
          {{ successMessage }}
        </v-snackbar>

        <!-- Mensaje de error -->
        <v-snackbar
          v-if="errorMessage"
          v-model="showErrorSnackbar"
          color="error"
          timeout="3000"
          @input="clearErrorMessage"
        >
          {{ errorMessage }}
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from '../axiosconf'
import HeaderComponent from '@/components/Generales/navBlancoo.vue'

const step = ref(1)
const form = ref({
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  correo: '',
  contraseña: '',
  confirmarContraseña: ''
})
const errorMessage = ref('')
const successMessage = ref('')
const showSuccessSnackbar = ref(false)
const showErrorSnackbar = ref(false)

const idRolCliente = 2

function nextStep() {
  step.value = 2
}

function prevStep() {
  step.value = 1
}

const isFormComplete = computed(() => {
  return (
    form.value.nombre &&
    form.value.apellido_paterno &&
    form.value.apellido_materno &&
    form.value.correo &&
    form.value.contraseña &&
    form.value.confirmarContraseña
  )
})

function validarFormulario() {
  // Expresión regular para solo letras
  const soloLetras = /^[a-zA-Z\s]+$/

  if (!form.value.nombre || !form.value.apellido_paterno || !form.value.apellido_materno) {
    errorMessage.value = 'Todos los campos de nombre y apellidos son obligatorios.'
    showErrorSnackbar.value = true
    return false
  }

  if (!soloLetras.test(form.value.nombre) || !soloLetras.test(form.value.apellido_paterno) || !soloLetras.test(form.value.apellido_materno)) {
    errorMessage.value = 'El nombre y los apellidos solo deben contener letras y espacios.'
    showErrorSnackbar.value = true
    return false
  }

  if (!form.value.correo || !form.value.correo.includes('@')) {
    errorMessage.value = 'El correo electrónico es obligatorio y debe contener un "@"'
    showErrorSnackbar.value = true
    return false
  }

  if (form.value.contraseña.length < 8) {
    errorMessage.value = 'La contraseña debe tener al menos 8 caracteres.'
    showErrorSnackbar.value = true
    return false
  }

  if (form.value.contraseña !== form.value.confirmarContraseña) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    showErrorSnackbar.value = true
    return false
  }

  return true
}

function registrarse() {
  if (!validarFormulario()) return

  const datosRegistro = {
    ...form.value,
    id_rol: idRolCliente
  }

  axios
    .post('http://hs.com/registro', datosRegistro)
    .then((response) => {
      if (response.data.status === 200 && response.data.msg === 'success') {
        successMessage.value = 'Registro exitoso. Ahora puede iniciar sesión.'
        showSuccessSnackbar.value = true
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else {
        errorMessage.value = response.data.msg || 'Error al registrar'
        showErrorSnackbar.value = true
      }
    })
    .catch((error) => {
      console.error('Error al registrar:', error)
      errorMessage.value = error.response?.data?.msg || 'Error al registrar'
      showErrorSnackbar.value = true
    })
}

function clearSuccessMessage() {
  successMessage.value = ''
  showSuccessSnackbar.value = false
}

function clearErrorMessage() {
  errorMessage.value = ''
  showErrorSnackbar.value = false
}

const menuItems = [
  { name: 'Home', route: '/Global' },
  { name: 'Login', route: '/login' }
]
</script>

<style scoped>
@keyframes swoop {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(20);
    background-color: var(--v-theme-light-primary);
  }
}

#inspire {
  position: relative;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  margin-top: 20px;
}

html,
body {
  height: 100%;
  margin: 0;
  overflow-y: hidden;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--v-theme-light-background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fill-height {
  height: 100%;
  overflow: hidden;
  position: relative;
  padding-top: 60px;
}

#particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.fondoimg {
  background: url('../assets/blob-scene-haikei.png');
  background-size: cover;
  color: var(--v-theme-light-text-primary);
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
  background: var(--v-theme-light-surface);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--v-theme-light-shadow);
  z-index: 1;
}

.v-text-field,
.custom-input-container {
  width: 100%;
}

.minimalista {
  border: 1px solid var(--v-theme-light-border);
  border-radius: 8px;
  background-color: var(--v-theme-light-background);
  box-shadow: 0 2px 4px var(--v-theme-light-shadow);
}

.v-btn {
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--v-theme-light-shadow);
  text-transform: uppercase;
  background-color: var(--v-theme-light-primary);
  color: var(--v-theme-light-on-primary);
}

.v-btn:hover {
  background-color: var(--v-theme-light-primary-dark);
  transition: background-color 0.3s;
}

.v-text-field:focus {
  box-shadow: 0 0 0 2px var(--v-theme-light-primary);
}

.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--v-theme-light-primary);
}

.red-ball {
  background-color: rgb(8, 0, 255);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.red-ball.animate {
  animation: swoop 5s forwards;
}
</style>
