<template>
  <div class="main-container">
    <v-card class="rounded-lg card-size" elevation="10" flat>
      <h1 class="text-center efecto-titulo">¡REGISTRAR CITA!</h1>
      <v-row no-gutters>
        <v-col cols="12" md="12" class="pa-4">
          <v-col cols="12" class="pa-4">
            <v-form>
              <template v-if="!showAgendarCita">
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
                  <v-col cols="12" class="pa-1">
                    <v-text-field
                      id="telefono"
                      label="Teléfono"
                      v-model="form.telefono"
                      outlined
                      dense
                      class="minimalista"
                    />
                  </v-col>
                </v-row>
                <v-btn @click="showAgendarCita = true" class="mt-4 custom-btn">SIGUIENTE</v-btn>
              </template>

              <template v-else>
                <v-row>
                  <v-col cols="12" class="pa-4 efecto-titulo">
                    <h1>¿Cuál es el producto?</h1>
                    <v-select
                      v-model="selectedProduct"
                      :items="products"
                      label="Selecciona un producto"
                      full-width
                    ></v-select>
                    <h1>Detalle sobre su artículo</h1>
                    <v-container fluid>
                      <v-textarea
                        id="articulo"
                        label="Detalle del Artículo"
                        v-model="form.articulo"
                        outlined
                        dense
                        class="minimalista"
                      />
                    </v-container>
                  </v-col>
                </v-row>
                <v-card-actions class="flex items-center p-6">
                  <v-btn
                    class="custom-btn"
                    @click="submitForm"
                    :disabled="isSubmitting"
                  >
                    AGENDAR
                  </v-btn>
                  <v-btn
                    class="custom-btn"
                    @click="showAgendarCita = false"
                    :disabled="isSubmitting"
                  >
                    REGRESAR
                  </v-btn>
                </v-card-actions>
              </template>
            </v-form>
          </v-col>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const products = [
  'Laptop',
  'Celular',
  'Tablet',
  'Impresora',
  'Televisor',
  'Otros'
]
const form = ref({
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  telefono: '',
  producto: '',
  articulo: ''
})

const showAgendarCita = ref(false)
const isSubmitting = ref(false)

const submitForm = () => {
  isSubmitting.value = true
  // Aquí puedes agregar la lógica para enviar el formulario
  setTimeout(() => {
    isSubmitting.value = false
    showAgendarCita.value = false // Regresar a la página principal después de enviar el formulario
  }, 2000)
}
</script>

<style scoped>
.main-container {
  margin-top: 20px; /* Espacio superior para no pegarse a la barra de navegación */
}

.card-size {
  max-width: 800px;
  width: 100%;
  margin: 20px auto; /* Centrar horizontalmente y agregar margen superior/inferior */
  background-color: #ffffff; /*color azul #072b4d*/ 
}

.efecto-titulo {
  color: #0800ff;
  font-family: 'Calibre', sans-serif;
}

.white-card {
  background-color: white;
}

.minimalista {
  background-color: #f9f9f9;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  color: #333333;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-btn {
  background-color: #FFAD00;
  color: #ffffff;
  margin-left: 8px;
  border-radius: 4px;
  transition: background-color 0.5s ease;
}

.custom-btn:hover {
  background-color: #e69700;
}
</style>
