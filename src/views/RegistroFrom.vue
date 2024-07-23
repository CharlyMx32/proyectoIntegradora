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
          class="d-flex flex-column align-center justify-center pa-4"
          style="background-color: #f5f5f5"
        >
          <v-img :src="imgRegister" aspect-ratio="1" contain max-height="150" class="mb-4"></v-img>
          <v-typography variant="h5" class="text-center">¡Bienvenido!</v-typography>
        </v-col>

        <!-- Sección del formulario -->
        <v-col cols="12" md="7" class="pa-4">
          <v-form>
            <v-row>
              <v-col cols="12" md="6" class="pa-1">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre"
                  outlined
                  class="minimalista"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-1">
                <v-text-field
                  v-model="form.apellidos"
                  label="Apellidos"
                  outlined
                  class="minimalista"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="form.correo"
              label="Correo"
              outlined
              class="minimalista mb-3"
            ></v-text-field>
            <v-text-field
              v-model="form.telefono"
              label="Teléfono"
              outlined
              class="minimalista mb-3"
            ></v-text-field>
            <v-text-field
              v-model="form.contraseña"
              label="Contraseña"
              type="password"
              outlined
              class="minimalista mb-3"
            ></v-text-field>
            <v-text-field
              v-model="form.confirmarContraseña"
              label="Confirmar Contraseña"
              type="password"
              outlined
              class="minimalista mb-3"
            ></v-text-field>
            <v-btn color="primary" @click="registrarse" class="mt-4">Registrarse</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import imgRegister from '@/assets/imgregister.jpg' // Importa la imagen desde assets

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

.v-text-field {
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
