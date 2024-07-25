<template>
    <v-app class="Fondo">
        <v-content>
        <br>
          <v-carousel hide-delimiters 
          height="400"
          show-arrows="hover"
          cycle
          hide-delimiter-background >
         
          
          <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          cover
          >
        </v-carousel-item>
        </v-carousel>
        <br>
          <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <p class="white-text">NOSOTROS</p> <br>
              <p class="white-text">El Mundo Tecnologico, somos tu solucion integralpara la reparacion <br>
                  de todos tus electrodomesticos y dispocitivos electronicos y <br>
                  dispositivos electronicos. Con un equipo de expertos altamente <br> capacitados,
                 ofrecemos servicios de reparaion confiable y rapido <br> para una amplia gama de productos, desde telefonos moviles hasta <br>televisores 
                 y electrodomesticos de gran tamaño.</p></v-col>
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
  
  const items = [
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
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
