<template>
  <v-container
    class="d-flex justify-center align-center fill-height gradient-background pa-0"
    fluid
  >
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
                        id="apellidoPaterno"
                        label="Apellido Paterno"
                        v-model="form.apellidoPaterno"
                        outlined
                        dense
                        class="minimalista"
                      />
                    </v-col>
                    <v-col cols="12" class="pa-1">
                      <v-text-field
                        id="apellidoMaterno"
                        label="Apellido Materno"
                        v-model="form.apellidoMaterno"
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
                    label="correo"
                    v-model="form.correo"
                    outlined
                    dense
                    class="minimalista mb-3"
                  />
                  <v-text-field
                    id="telefono"
                    label="Teléfono"
                    v-model="form.telefono"
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
                  <v-alert
                    v-if="errorMessage"
                    type="error"
                    dismissible
                    v-model="errorMessage"
                    class="mb-3"
                  >
                    {{ errorMessage }}
                  </v-alert>
                  <v-btn color="primary" @click="registrarse" class="mt-4">Registrarse</v-btn>
                </template>
              </v-form>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from '../axiosconf' // Ajusta la ruta según tu estructura de carpetas

const step = ref(1)

const form = ref({
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  correo: '',
  telefono: '',
  contraseña: '',
  confirmarContraseña: ''
})

const errorMessage = ref('')

function nextStep() {
  step.value = 2
}

function validarFormulario() {
  if (!form.value.correo) {
    errorMessage.value = 'El campo correo es obligatorio.'
    return false
  }
  if (form.value.contraseña !== form.value.confirmarContraseña) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    return false
  }
  return true
}

function registrarse() {
  if (!validarFormulario()) return

  axios
    .post('http://hs.com/registro', form.value)
    .then((response) => {
      console.log('Registro exitoso:', response.data)
      // Redireccionar o manejar el éxito
    })
    .catch((error) => {
      console.error('Error al registrar:', error.response.data.msg)
      errorMessage.value = error.response.data.msg || 'Error al registrar'
    })
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
