<!-- src/components/SomeOtherComponent.vue -->
<template>
  <div>
    <h1>Formulario de Registro</h1>
    <div class="input-row">
      <CustomVuetifyInput
        v-model="username"
        label="Nombre de Usuario"
        placeholder="Ingrese su nombre de usuario"
        customClass="my-input-class"
        :customStyle="{ borderColor: 'blue' }"
      />
      <CustomVuetifyInput
        v-model="apellidoPaterno"
        label="Apellido Paterno"
        placeholder="Ingrese su apellido paterno"
        customClass="my-input-class"
        :customStyle="{ borderColor: 'blue' }"
      />
      <CustomVuetifyInput
        v-model="apellidoMaterno"
        label="Apellido Materno"
        placeholder="Ingrese su apellido materno"
        customClass="my-input-class"
        :customStyle="{ borderColor: 'blue' }"
      />
    </div>
    <CustomVuetifyInput
      v-model="email"
      label="Correo Electrónico"
      placeholder="Ingrese su correo electrónico"
      customClass="my-input-class"
      :customStyle="{ borderColor: 'green' }"
    />
    <v-select
      v-model="role"
      :items="roles"
      label="Selecciona un rol"
      custom-class="my-select-class"
      @change="onRoleChange"
    />
    <div v-if="role && role !== 'Cliente'">
      <CustomVuetifyInput
        v-model="nss"
        label="NSS"
        placeholder="Ingrese su NSS"
        customClass="my-input-class"
        :customStyle="{ borderColor: 'blue' }"
      />
      <CustomVuetifyInput
        v-model="curp"
        label="CURP"
        placeholder="Ingrese su CURP"
        customClass="my-input-class"
        :customStyle="{ borderColor: 'blue' }"
      />
      <CustomVuetifyInput
        v-model="rfc"
        label="RFC"
        placeholder="Ingrese su RFC"
        customClass="my-input-class"
        :customStyle="{ borderColor: 'blue' }"
      />
      <v-select
        v-if="role === 'Técnico'"
        v-model="especialidad"
        :items="especialidades"
        label="Especialidad"
        custom-class="my-select-class"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomVuetifyInput from '@/components/Generales/inputText.vue'

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

const onRoleChange = () => {
  nss.value = ''
  curp.value = ''
  rfc.value = ''
  especialidad.value = ''
}
</script>

<style scoped>
.input-row {
  display: flex;
  gap: 1em;
}
.my-input-class {
  margin-bottom: 1em;
}
.my-select-class {
  margin-top: 1em;
}
</style>
