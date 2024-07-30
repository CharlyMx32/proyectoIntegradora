<template>
  <div>
    <v-card class="rounded-lg card-size" elevation="10" flat>
      <v-row no-gutters>
        <v-col cols="12" md="5" class="d-flex flex-column align-center justify-center pa-4">
          <v-typography variant="h5" class="text-center efecto-titulo">¡REGISTRAR CITA!</v-typography>
        </v-col>
        <v-col cols="12" md="7" class="pa-4">
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
                  <v-btn color="primary" @click="showAgendarCita = true" class="mt-4">SIGUIENTE</v-btn>
                </template>

                <template v-else>
                  <v-row>
                    <v-col cols="12" class="pa-4 efecto-titulo">
                       <h1>¿Cuál es el producto?</h1>
                      <v-container fluid>
                        <v-textarea
                          id="producto"
                          label="Producto"
                          v-model="form.producto"
                          outlined
                          dense
                          class="minimalista"
                        />
                      </v-container>
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
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2"
                      variant="contained"
                      @click="submitForm"
                      :disabled="isSubmitting"
                    >
                      AGENDAR
                    </v-btn>
                    <v-btn class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2"
                      variant="contained"
                      @click="showAgendarCita = false"
                      :disabled="isSubmitting"
                    >REGRESAR</v-btn>
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
import {ref} from 'vue'

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
.card-size {
  max-width: 800px;
  width: 100%;
  margin: auto; /* Centrar horizontalmente */
  background-color: rgb(13, 13, 12);
}
.efecto-titulo{
 color: rgb(247, 79, 77);
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
.v-btn {
  background-image: linear-gradient(to right, #1a2980 0%, #26d0ce 51%, #1a2980 100%);
  color: #ffffff; /* Texto blanco */
  margin-left: 8px;
  border-radius: 4px;
  transition: background-position 0.5s ease;
  background-size: 200% auto;
}

.v-btn:hover {
  background-position: right center; /* Cambia el fondo al hacer hover */
  color: #ffffff; /* Texto blanco */
}
</style>
