<template>
  <div>
    <v-toolbar
    color="#212121">
      <v-toolbar-title>
        HardwareSolutions</v-toolbar-title>
      <v-spacer><v-btn color="#FF1493" @click="ClickBarra">Cita</v-btn>
      <v-btn   color="#FF1493">
        Periodo
      </v-btn>
      <v-btn  color="#FF1493">
       Cerrar Sesion
      </v-btn>
    </v-spacer>
    </v-toolbar>
  </div>
</template>

<script setup>
import router from '@/router';
const ClickBarra = () => {

    router.push('/register')
  }
</script>