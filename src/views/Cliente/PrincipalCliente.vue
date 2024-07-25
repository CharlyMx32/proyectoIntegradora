<template>
  <v-app class="Fondo">
      <v-content>
      <br>
      <br>
      
      <v-sheet :elevation="24" :height="402" :width="598" border rounded style="margin-left: 50px; position: relative;">
        <v-carousel
        height="400"
        show-arrows="hover"
        cycle
        hide-delimiter-background
      >
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
        >
          <v-sheet
            :color="colors[i]"
            height="500%"
          >
            <div class="d-flex fill-height justify-center align-center">
              <div class="text-h2">
                {{ slide }} Slide
              </div>
            </div>
            
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <br>
      </v-sheet>
      <v-row style="margin-right: 70px;">
        <v-col cols="12" md="8" class="text-right">
          <p class="white-text">NOSOTROS</p>
          <br>
          <p class="white-text">
            El Mundo Tecnologico, somos tu solución integral para la reparación 
            de todos tus electrodomésticos <br > y dispositivos electrónicos. Con un equipo de expertos altamente capacitados,
            ofrecemos servicios de reparación confiable y rápido
            para una amplia gama de productos, desde teléfonos móviles hasta televisores
            y electrodomésticos de gran tamaño.
          </p>
        </v-col>
      </v-row>
      
      </v-content><br>
      
      
  <v-row justify="center" align="center">
    <v-btn  color="#1E88E5" style="width: 300px; " @click="clickAgenda">Agendar Cita</v-btn>
  </v-row>
<br>

<v-divider class="border-opacity-100" color="#E8EAF6"></v-divider> <br>
         
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-btn density="comfortable" icon="$vuetify"></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn density="comfortable" icon="$vuetify"></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn density="comfortable" icon="$vuetify"></v-btn>
        </v-col>
        </v-row>
<br>
  </v-app>
  </template>

  <script setup>  
    import router from '@/router';

const clickAgenda = () => {

  router.push('/Agendar')
}

const colors = [
    'indigo',
    'warning',
    'pink darken-2',
    'red lighten-1',
    'deep-purple accent-4',
  ]
  const slides = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
  ]


</script>

<style scoped>

.v-application {
background: url('../../assets/iii.svg') no-repeat center center fixed;
background-size: cover;
}
.white-text {
color: rgb(248, 248, 248);
}


</style>

<script>
export default {
  data () {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
  },
      ]
    }
  }
}
</script>

