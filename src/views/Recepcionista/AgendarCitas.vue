<template>
  <div class="main-container">
    <v-card class="rounded-lg card-size" elevation="10" flat>
      <h1 class="text-center efecto-titulo">¡REGISTRAR CITA!</h1>
      <v-row no-gutters>
        <v-col cols="12" md="12" class="pa-4">
          <v-col cols="12" class="pa-4">
            <v-form v-model="isFormValid">
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
                      :rules="[rules.required]"
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
                      :rules="[rules.required]"
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
                      :rules="[rules.required]"
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
                      :rules="[rules.required, rules.phone]"
                      maxlength="10"
                    />
                  </v-col>
                </v-row>
                <v-btn 
                  @click="showAgendarCita = true" 
                  class="mt-4 custom-btn"
                  :disabled="!isFormValid">
                  SIGUIENTE
                </v-btn>
              </template>

              <template v-else>
                <v-row>
                  <v-col cols="12" class="pa-4 efecto-titulo">
                    <h1>¿Cuál es el producto?</h1>
                    <v-select
                      v-model="form.producto"
                      :items="products"
                      label="Selecciona un producto"
                      full-width
                      :rules="[rules.required]"
                    />
                    <h1>Detalle sobre su artículo</h1>
                    <v-container fluid>
                      <v-textarea
                        id="articulo"
                        label="Detalle del Artículo"
                        v-model="form.problema"
                        outlined
                        dense
                        class="minimalista"
                        :rules="[rules.required]"
                      />
                    </v-container>
                  </v-col>
                </v-row>
                <v-card-actions class="flex items-center p-6">
                  <v-btn class="custom-btn" @click="submitForm" :disabled="isSubmitting">
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
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" top right>
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import apiClient from '@/axiosconf'

const products = ['Laptop', 'Celular', 'Tablet', 'Impresora', 'Televisor', 'Otros']

const form = ref({
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  contacto: '',
  producto: '',
  problema: ''
})

const isFormValid = ref(false)
const snackbar = ref({ show: false, message: '', color: '' })
const showAgendarCita = ref(false)
const isSubmitting = ref(false)

const rules = {
  required: value => !!value || 'Este campo es obligatorio',
  phone: value => {
    const isNumeric = /^\d+$/.test(value);
    return (isNumeric && value.length === 10) || 'El teléfono debe tener 10 dígitos y solo debe contener números';
  }
}


const submitForm = async () => {
  if (!isFormValid.value) {
    return
  }

  isSubmitting.value = true

  try {

    const payload = {
      nombre: form.value.nombre,
      apellido_paterno: form.value.apellidoPaterno,
      apellido_materno: form.value.apellidoMaterno,
      contacto: form.value.telefono,
      producto: form.value.producto,
      problema: form.value.problema
    }


    const response = await apiClient.post('citasfisicas', payload)
    console.log(response);
    snackbar.value = {
      show: true,
      message: 'Se agendó la cita correctamente.',
      color: 'green'
    }

    form.value = {
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      contacto: '',
      producto: '',
      problema: ''
    }
    showAgendarCita.value = false
  } catch (error) {
    snackbar.value = {
      show: true,
      message: 'Hubo un error al agendar la cita. Por favor, intenta nuevamente.',
      color: 'red'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.main-container {
  margin-top: 20px;
}

.card-size {
  max-width: 800px;
  width: 100%;
  margin: 20px auto;
  background-color: #ffffff;

}

.efecto-titulo {
  color: #0800ff;
  font-family: 'Calibre', sans-serif;
}

.minimalista {
  background-color: #f9f9f9;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  color: #333333;
}

.custom-btn {
  background-color: #ffad00;
  color: #ffffff;
  margin-left: 8px;
  border-radius: 4px;
  transition: background-color 0.5s ease;
}

.custom-btn:hover {
  background-color: #e69700;
}
</style>
