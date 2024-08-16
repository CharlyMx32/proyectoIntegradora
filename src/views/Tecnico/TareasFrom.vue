<template>
  <v-app class="fondo">
    <v-row justify="end" class="py-2 px-4">
      <v-btn @click="logout" class="custom-btn logout-btn" style="color: red">
        <v-icon left>mdi-logout</v-icon>
        Cerrar Sesión
      </v-btn>
    </v-row>
    <v-row justify="center" class="py-4">
      <v-col cols="12" md="10">
        <TareasAsignadas />
        <TareasEnProceso />
        <TareasCompletadas />
      </v-col>
    </v-row>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
import TareasAsignadas from '@/views/Tecnico/TareasAsignadas.vue'
import TareasEnProceso from '@/views/Tecnico/TareasEnProceso.vue'
import TareasCompletadas from '@/views/Tecnico/TareasCompletadas.vue'

const router = useRouter()

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.fondo{
  background-color: #D0D0D0;
}
/* estilos globales */
</style>
