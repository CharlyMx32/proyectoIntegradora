<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-form @submit.prevent="submitForm">
      <v-card-title class="headline text-center">Registrar Usuarios</v-card-title>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.nombre"
            label="Nombre"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.apellidos"
            label="Apellidos"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="formData.direccion"
            label="Dirección"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.correo"
            label="Correo"
            type="email"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.telefono"
            label="Teléfono"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="selectedRole"
            :items="roles"
            label="Rol"
            variant="solo-filled"
            required
          ></v-select>
        </v-col>
        <!-- Mostrar campos adicionales según el rol seleccionado -->
        <v-col v-if="showFields.value" cols="12">
          <v-text-field v-model="formData.nss" label="NSS" variant="underlined"></v-text-field>
        </v-col>
        <v-col v-if="showFields.value" cols="12">
          <v-text-field v-model="formData.curp" label="CURP" variant="underlined"></v-text-field>
        </v-col>
        <v-col v-if="showFields.value" cols="12">
          <v-text-field v-model="formData.rfc" label="RFC" variant="underlined"></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit" color="primary">Registrar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'

const formData = ref({
  nombre: '',
  apellidos: '',
  direccion: '',
  correo: '',
  telefono: '',
  nss: '',
  curp: '',
  rfc: ''
})

const roles = ['Cliente', 'Recepcionista', 'Técnico', 'Admin']
const selectedRole = ref('Selecciona Rol')
const showFields = ref(false)

watch(selectedRole, (newValue) => {
  showFields.value = newValue === 'Técnico' || newValue === 'Admin' || newValue === 'Recepcionista'
})

const submitForm = () => {
  // Aquí puedes manejar el envío de datos, por ejemplo, enviar formData a tu backend
  console.log(formData.value)
}
</script>

<style scoped>
.fill-height {
  height: 100%;
}
.align-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}

.card {
  padding: 20px;
  margin: 0%;
}

.my-custom-class {
  border-radius: 8px;
  background-color: #f0f0f0;
  color: #333;
}

.v-text-field {
  margin-bottom: 16px;
}
</style>
