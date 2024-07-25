<template>
  <v-container>
      <v-card-title>
        <v-flex class="flex-col space-y-1.5 p-6">
          <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            CUENTA CLIENTE
          </h3>
    </v-flex>
      </v-card-title>
      <v-card-text class="p-6 space-y-6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="nombreusuario"
                label="Nombre"
                placeholder="Nombre del usuario"
                outlined
                class="my-input-class"
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="apellidoPaterno"
                label="Apellido Paterno"
                placeholder="Apellido paterno"
                outlined
                class="my-input-class"
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="apellidoMaterno"
                label="Apellido Materno"
                placeholder="Apellido materno"
                outlined
                class="my-input-class"
                dense
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="telefono"
            label="Telefono"
            placeholder="Telefono usuario"
            outlined
            class="my-input-class"
            dense
            :rules="[rules.required, rules.telefono]"
          />

          <v-text-field
            v-model="email"
            label="Correo Electrónico"
            placeholder="Ingrese su correo electrónico"
            outlined
            class="my-input-class"
            dense
            :rules="[rules.required, rules.email]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="flex items-center p-6">
        <v-btn
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full"
          variant="contained"
          @click="submitForm"
          :disabled="isSubmitting"
        >
          Dar de alta
        </v-btn>
      </v-card-actions>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const form = ref(null)
const valid = ref(false)

const nombreusuario = ref('')
const apellidoPaterno = ref('')
const apellidoMaterno = ref('')
const telefono = ref('')
const email = ref('')

const rules = {
  required: (value) => !!value || 'Este campo es obligatorio.',
  telefono: (value) => /^\d{10}$/.test(value) || 'Ingrese un teléfono válido de 10 dígitos.',
  email: (value) => /.+@.+\..+/.test(value) || 'Ingrese un correo electrónico válido.'
}


const submitForm = () => {
  if (form.value.validate()) {
    // Lógica para enviar la información del formulario
    const formData = {
      nombreusuario: nombreusuario.value,
      apellidoPaterno: apellidoPaterno.value,
      apellidoMaterno: apellidoMaterno.value,
      telefono: telefono.value,
      email: email.value,
    }
    console.log('Datos del formulario:', formData)
    // Aquí puedes agregar la lógica para enviar los datos a tu servidor o API
  }
}
</script>

<style scoped>
.my-input-class {
  margin-bottom: 1em;
  background-color: #f9f9f9; /* Gris claro para los inputs */
  border: 1px solid #d1d1d1; /* Borde gris medio */
  border-radius: 4px;
  color: #333333; /* Texto gris oscuro */
}

.my-select-class {
  margin-top: 1em;
  background-color: #f9f9f9; /* Gris claro para el select */
  border: 1px solid #d1d1d1; /* Borde gris medio */
  border-radius: 4px;
  color: #333333; /* Texto gris oscuro */
  margin-top: 5px;
  margin-bottom: 15px;
}

.v-btn {
  background-color: #ff0def; /* Verde pastel */
  color: #ffffff; /* Texto blanco */
  margin-left: 8px;
}

.v-btn:hover {
  background-color: #ba0afa; /* Verde claro */
}

.my-card {
  background-color: #f7f7f7; /* Gris muy claro */
  border: 1px solid #d1d1d1; /* Borde gris medio */
}
</style>
