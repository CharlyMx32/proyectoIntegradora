<template>
  <div>
    <v-toolbar class="barra">
      <v-toolbar-title class="clickable-title" @click="home"> HardwareSolutions </v-toolbar-title>
      <v-spacer>
        <v-row justify="end" style="margin-right: 50px">
          <v-btn color="#0800ff" @click="ClickBarra">Cita</v-btn>
          <v-btn color="white" @click="ClickPedido">Periodo</v-btn>
          <v-btn color="white" @click="handleThirdButtonClick">{{ thirdButtonText }}</v-btn>

        </v-row>
      </v-spacer>
    </v-toolbar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const ClickBarra = () => {
  router.push('/Agendar')
}
const ClickPedido = () => {
  router.push('/Pedir')
}
const home = () => {
  router.push('/principal')
}


const thirdButtonText = computed(() => {
  return route.path === '/principal' ? 'Cerrar Sesión' : 'Inicio'
})

const handleThirdButtonClick = () => {
  if (route.path === '/principal') {
    console.log('Cerrar sesión')
    router.push('/login')
  } else {
    home()
  }
}
</script>

<style scoped>
.barra {
  background:#FFAD00

}

.clickable-title {
  cursor: pointer;
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: bold;
  user-select: none;
}
</style>
