<template>
  <v-container
    class="d-flex justify-center align-center fill-height gradient-background pa-0"
    fluid
  >
    <v-card class="rounded-lg" max-width="50%" elevation="5" flat max-height="80%">
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
          <v-form>
            <v-row>
              <v-col cols="12" md="6" class="pa-1">
                <CustomInput id="nombre" label="Nombre" v-model="form.nombre" />
              </v-col>
              <v-col cols="12" md="6" class="pa-1">
                <CustomInput id="apellidos" label="Apellidos" v-model="form.apellidos" />
              </v-col>
            </v-row>
            <CustomInput id="correo" label="Correo" v-model="form.correo" class="mb-3" />
            <CustomInput id="telefono" label="Teléfono" v-model="form.telefono" class="mb-3" />
            <CustomInput
              id="contraseña"
              label="Contraseña"
              type="password"
              v-model="form.contraseña"
              class="mb-3"
            />
            <CustomInput
              id="confirmarContraseña"
              label="Confirmar Contraseña"
              type="password"
              v-model="form.confirmarContraseña"
              class="mb-3"
            />
            <v-btn color="primary" @click="registrarse" class="mt-4">Registrarse</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import CustomInput from '@/components/Generales/CustomInput.vue' // Asegúrate de ajustar la ruta si es necesario

const form = ref({
  nombre: '',
  apellidos: '',
  correo: '',
  telefono: '',
  contraseña: '',
  confirmarContraseña: ''
})

function registrarse() {
  // Lógica para registrar al usuario
  console.log(form.value)
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

.v-container {
  width: 100%;
  padding: 0;
}

.v-card {
  width: 100%;
  max-width: 50%; /* Reducir el ancho máximo del card */
  margin: 0 auto;
  padding: 0;
}

.v-row {
  margin: 0;
}

.v-col {
  padding: 0;
}

img,
.v-img {
  max-width: 100%;
  height: auto;
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
