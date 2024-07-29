<template>
  <div>
    <template v-if="!showAgendarCita">
      <!-- Página Principal -->
        <v-card class="rounded-lg card-size" elevation="10" flat>
          <v-row no-gutters>
            <v-col cols="12" md="5" class="d-flex flex-column align-center justify-center pa-4">
              <v-typography variant="h5" class="text-center">¡REGISTRAR CITA!</v-typography>
            </v-col>
            <v-col cols="12" md="7" class="pa-4">
              <v-card class="white-card" elevation="5" flat>
                <v-col cols="12" class="pa-4">
                  <v-form>
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
                      <v-text-field
                        id="telefono"
                        label="Teléfono"
                        v-model="form.telefono"
                        outlined
                        dense
                        class="minimalista"
                      />
                    </v-row>
                    <v-btn color="primary" @click="showAgendarCita = true" class="mt-4">REGISTRAR</v-btn>
                  </v-form>
                </v-col>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
    </template>

    <template v-else>
      <!-- Formulario de Agendar Citas -->
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card-title class="display-1 font-weight-bold color-titulo">¡AGENDA UNA CITA!</v-card-title>
            <h1>¿Cual es el producto?</h1>
            <p>PRODUCTO</p>
            <v-container fluid>
              <v-textarea autocomplete="producto" label="PRODUCTO"></v-textarea>
            </v-container>
            <p>DETALLE SOBRE SU ARTICULO</p>
            <v-container fluid>
              <v-textarea autocomplete="Articulo" label="DETALLE DEL ARTICULO"></v-textarea>
            </v-container>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="mx-auto" max-width="328" rounded="lg" border>
              <v-confirm-edit v-model="date">
                <template v-slot:default="{ model: proxyModel, actions }">
                  <v-date-picker v-model="proxyModel.value">
                    <template v-slot:actions>
                      <component :is="actions"></component>
                    </template>
                  </v-date-picker>
                </template>
              </v-confirm-edit>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div class="container">
        <v-card-actions class="flex items-center p-6">
          <v-btn
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2"
            variant="contained"
            @click="submitForm"
            :disabled="isSubmitting"
          >
            AGENDAR
          </v-btn>
          <v-btn color="secondary" @click="showAgendarCita = false" class="mt-4 ml-4">REGRESAR</v-btn>
        </v-card-actions>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'

const form = ref({
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  telefono: ''
})

const showAgendarCita = ref(false)
const isSubmitting = ref(false)
const date = shallowRef(null)

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
