<template>
  <v-container
    class="d-flex justify-center align-center fill-height gradient-background pa-0"
    fluid
  >
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
          <v-typography variant="h5" class="text-center">¡Bienvenido!</v-typography>
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
                      />
                    </v-col>
                  </v-row>
                  <v-btn color="primary" @click="nextStep" class="mt-4">Continuar</v-btn>
                </template>
                <template v-else>
                  <v-text-field
                    id="correo"
                    label="Correo"
                    v-model="form.correo"
                    outlined
                    dense
                    class="minimalista mb-3"
                  />
                  <v-text-field
                    id="contraseña"
                    label="Contraseña"
                    type="password"
                    v-model="form.contraseña"
                    outlined
                    dense
                    class="minimalista mb-3"
                  />
                  <v-text-field
                    id="confirmarContraseña"
                    label="Confirmar Contraseña"
                    type="password"
                    v-model="form.confirmarContraseña"
                    outlined
                    dense
                    class="minimalista mb-3"
                  />
                  <v-btn color="primary" @click="registrarse" class="mt-4">Registrarse</v-btn>
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
</template>

<script setup>
import { ref } from 'vue'
import axios from '../axiosconf'

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

function validarFormulario() {
  if (!form.value.nombre || !form.value.apellido_paterno || !form.value.apellido_materno) {
    errorMessage.value = 'Todos los campos de nombre y apellidos son obligatorios.'
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
      // Verifica si la respuesta del servidor es exitosa
      if (response.data.status === 200 && response.data.msg === 'success') {
        // Mensaje de éxito si la respuesta es exitosa
        successMessage.value = 'Registro exitoso. Ahora puede iniciar sesión.'
        showSuccessSnackbar.value = true
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else {
        // Mostrar mensaje de error si el mensaje del servidor indica un problema
        errorMessage.value = response.data.msg || 'Error al registrar'
        showErrorSnackbar.value = true
      }
    })
    .catch((error) => {
      // Manejo de errores en caso de fallo de la solicitud
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
