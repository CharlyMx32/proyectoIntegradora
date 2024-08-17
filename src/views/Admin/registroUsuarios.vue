<template>
  <v-container>
    <v-card class="rounded-lg my-card">
      <v-card-title>
        <v-flex class="flex-col p-6">
          <h3 class="card-title">Registrar Usuarios</h3>
          <p class="card-subtitle">Ingresa los datos del usuario</p>
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

          <v-text-field
            v-model="contraseña"
            label="Contraseña"
            type="password"
            placeholder="Ingrese la contraseña"
            outlined
            class="my-input-class"
            dense
            :rules="[rules.required]"
          />

          <v-select
            v-model="role"
            :items="roles"
            item-value="id"
            item-text="name"
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
          </v-row>

          <v-row v-if="role && role !== 'Cliente'">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="calle"
                label="Calle"
                placeholder="Ingrese su calle"
                outlined
                class="my-input-class"
                dense
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="colonia"
                label="Colonia"
                placeholder="Ingrese su colonia"
                outlined
                class="my-input-class"
                dense
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="codigoPostal"
                label="Código Postal"
                placeholder="Ingrese su código postal"
                outlined
                class="my-input-class"
                dense
              />
            </v-col>
          </v-row>

          <v-row v-if="role && role !== 'Cliente'">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="telefono"
                label="Teléfono"
                placeholder="Ingrese su teléfono"
                outlined
                class="my-input-class"
                dense
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="flex items-center p-6">
        <v-btn class="custom-btn" @click="submitForm" :disabled="isSubmitting">Registrar</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar.visible" :timeout="3000" color="success">
      {{ snackbar.message }}
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.visible = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import apiClient from '@/axiosconf'

const form = ref(null)
const valid = ref(false)

const username = ref('')
const contraseña = ref('')
const apellidoPaterno = ref('')
const apellidoMaterno = ref('')
const email = ref('')
const role = ref('')
const nss = ref('')
const curp = ref('')
const rfc = ref('')
const codigoPostal = ref('')
const calle = ref('')
const colonia = ref('')
const telefono = ref('')
const roles = ['Cliente', 'Recepcionista', 'Admin', 'Técnico']

const rules = {
  required: (value) => !!value || 'Este campo es obligatorio.',
  email: (value) => /.+@.+\..+/.test(value) || 'Ingrese un correo electrónico válido.'
}

const snackbar = ref({
  visible: false,
  message: ''
})

const onRoleChange = () => {
  nss.value = ''
  curp.value = ''
  rfc.value = ''
}

const submitForm = async () => {
  if (form.value.validate()) {
    const formData = {
      nombre: username.value,
      apellido_paterno: apellidoPaterno.value,
      apellido_materno: apellidoMaterno.value,
      correo: email.value,
      contraseña: contraseña.value,
      id_rol: getRoleId(role.value),
      codigo_postal: role.value !== 'Cliente' ? codigoPostal.value : null,
      telefono: role.value !== 'Cliente' ? telefono.value : null,
      colonia: role.value !== 'Cliente' ? colonia.value : null,
      calle: role.value !== 'Cliente' ? calle.value : null,
      rfc: role.value !== 'Cliente' ? rfc.value : null,
      curp: role.value !== 'Cliente' ? curp.value : null,
      nss: role.value !== 'Cliente' ? nss.value : null
    }

    try {
      await apiClient.post('AR', formData)
      snackbar.value = {
        visible: true,
        message: 'Registro exitoso'
      }
      resetForm()
    } catch (error) {
      console.error('Error en el registro:', error.response?.data?.message || error.message)
      snackbar.value = {
        visible: true,
        message: 'Error al registrar'
      }
    }
  }
}

const resetForm = () => {
  username.value = ''
  apellidoPaterno.value = ''
  apellidoMaterno.value = ''
  email.value = ''
  role.value = ''
  nss.value = ''
  curp.value = ''
  rfc.value = ''
  contraseña.value
  codigoPostal.value = ''
  calle.value = ''
  colonia.value = ''
  telefono.value = ''
  form.value?.reset()
}

const getRoleId = (roleName) => {
  const roleMap = {
    Admin: 1,
    Cliente: 2,
    Recepcionista: 3,
    Técnico: 4
  }
  return roleMap[roleName] || 2
}
</script>

<style scoped>
.my-card {
  background-color: #e0e0e0;
  border: 1px solid #d1d1d1;
  max-width: 640px;
  margin: auto;
  width: 100%;
}

.card-title {
  color: #34495e;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
}

.card-subtitle {
  color: #757575;
  font-size: 0.875rem;
}

.my-input-class,
.my-select-class {
  margin-bottom: 1em;
  background-color: #f9f9f9;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  color: #333333;
}

/* Unificar el estilo de todos los botones */
.custom-btn,
.v-btn {
  color: #ffffff;
  background-color: #2196f3;
  border-radius: 4px;
  font-weight: bold;
  padding: 10px 20px;
}
</style>
