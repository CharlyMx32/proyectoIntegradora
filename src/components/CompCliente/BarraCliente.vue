<template>
  <div>
    <v-toolbar class="barra"  >
      <v-toolbar-title  style="color: white"> HardwareSolutions</v-toolbar-title>
      <v-spacer >
        <v-row justify="end" style="margin-right: 50px;">
        <v-btn  color="white" @click="ClickBarra">Cita</v-btn>
        <v-btn color="white" @click="ClickPedido">Periodo</v-btn>
        <v-btn color="white">Inicio</v-btn>
      </v-row>
      </v-spacer>
    </v-toolbar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const ClickBarra = () => {
  router.push('/Agendar')
}
const ClickPedido = () => {
  router.push('/Pedir')
}

</script>

<style scoped>

.barra{
  background: url('../../assets/iii.svg') no-repeat center center fixed;
  background-size: cover;
}

</style>
