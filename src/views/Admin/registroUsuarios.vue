<template>
  <v-container>
    <v-card
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl my-card"
    >
      <v-card-title>
        <v-flex class="flex-col space-y-1.5 p-6">
          <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight" style="color: #0800ff;">
            Registrar Usuarios
          </h3>
          <p class="text-sm text-muted-foreground">Ingresa los datos del usuario</p>
        </v-flex>
      </v-card-title>
      <v-card-text class="p-6 space-y-6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="username"
                label="Nombre de Usuario"
                placeholder="Ingrese su nombre de usuario"
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
                placeholder="Ingrese su apellido paterno"
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
                placeholder="Ingrese su apellido materno"
                outlined
                class="my-input-class"
                dense
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="email"
            label="Correo Electrónico"
            placeholder="Ingrese su correo electrónico"
            outlined
            class="my-input-class"
            dense
            :rules="[rules.required, rules.email]"
          />

          <v-select
            v-model="role"
            :items="roles"
            label="Selecciona un rol"
            class="my-select-class"
            outlined
            dense
            @change="onRoleChange"
            :rules="[rules.required]"
          />

          <v-row v-if="role && role !== 'Cliente'">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="nss"
                label="NSS"
                placeholder="Ingrese su NSS"
                outlined
                class="my-input-class"
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="curp"
                label="CURP"
                placeholder="Ingrese su CURP"
                outlined
                class="my-input-class"
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="rfc"
                label="RFC"
                placeholder="Ingrese su RFC"
                outlined
                class="my-input-class"
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-if="role === 'Técnico'"
                v-model="especialidad"
                :items="especialidades"
                label="Especialidad"
                class="my-select-class"
                outlined
                dense
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="flex items-center p-6">
        <v-btn class="btn-grad" @click="submitForm" :disabled="isSubmitting"> Registrar </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const form = ref(null)
const valid = ref(false)

const username = ref('')
const apellidoPaterno = ref('')
const apellidoMaterno = ref('')
const email = ref('')
const role = ref('')
const nss = ref('')
const curp = ref('')
const rfc = ref('')
const especialidad = ref('')
const roles = ['Cliente', 'Recepcionista', 'Admin', 'Técnico']
const especialidades = ['Especialidad 1', 'Especialidad 2', 'Especialidad 3']

const rules = {
  required: (value) => !!value || 'Este campo es obligatorio.',
  email: (value) => /.+@.+\..+/.test(value) || 'Ingrese un correo electrónico válido.'
}

const onRoleChange = () => {
  nss.value = ''
  curp.value = ''
  rfc.value = ''
  especialidad.value = ''
}

const submitForm = () => {
  if (form.value.validate()) {
    // Lógica para enviar la información del formulario
    const formData = {
      username: username.value,
      apellidoPaterno: apellidoPaterno.value,
      apellidoMaterno: apellidoMaterno.value,
      email: email.value,
      role: role.value,
      nss: nss.value,
      curp: curp.value,
      rfc: rfc.value,
      especialidad: especialidad.value
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

/* Estilo unificado para todos los botones */
.v-btn, .custom-btn {
  background-color: #FFAD00; /* Color de fondo */
  color: #ffffff; /* Color del texto */
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.v-btn:hover, .custom-btn:hover {
  background-color: #e0a800; /* Color de fondo en hover */
  color: #ffffff; /* Color del texto en hover */
}


.my-card {
  background-color: #f7f7f7; /* Gris muy claro */
  border: 1px solid #d1d1d1; /* Borde gris medio */
}
</style>
