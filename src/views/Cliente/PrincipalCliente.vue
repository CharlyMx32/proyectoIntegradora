<template>
    <v-app>
        <v-content>
          <v-carousel :show-arrows="false">
          <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          cover >
          </v-carousel-item>
        </v-carousel><br>
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
        <v-defaults-provider
    :defaults="{'VBtn':{'color':'#FF1493','size':'large','variant':'tonal'}}">
    <v-btn @click="clickAgenda">Agendar Cita</v-btn>
  </v-defaults-provider><br>
  
        <div>
          <v-progress-linear
            color="#FF1493"
            model-value="100"
            rounded
          ></v-progress-linear>
          </div>
          <br>
     
      
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
  
    </v-app>
    </template>

<script setup>
    import router from '@/router';

const clickAgenda = () => {
 
    router.push('/Agendar')
  }

  const items = [
    {
      src: ' https://www.phonefixationusa.com/wp-content/uploads/2022/12/repairman-fixing-smartphone-camera.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
  ]


 </script>

<style scoped>
.v-application {
  background-color:black;
}
.white-text {
  color: rgb(248, 248, 248);
}

</style>