<template>
  <v-app class="Fondo">
    <v-content>
      <v-container>
      <br>
        <v-row justify="center" align="center">
          <v-col cols="12" md="6">
            <v-sheet :elevation="24" height="402" width="598" border rounded>
              
              <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background>
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                  <v-sheet :color="colors[i]" height="100%">
                    <div class="d-flex fill-height justify-center align-center">
                      <div class="text-h2">{{ slide }} Slide</div>
                    </div>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6" class="text-center" style="padding-left: 100px;">
            <p class="white-text">NOSOTROS</p>
            <p class="white-text">
              El Mundo Tecnologico, somos tu solución integral para la reparación de todos tus
              electrodomésticos y dispositivos electrónicos. Con un equipo de expertos altamente
              capacitados, ofrecemos servicios de reparación confiable y rápido para una amplia gama
              de productos, desde teléfonos móviles hasta televisores y electrodomésticos de gran
              tamaño.
            </p> <br>
            <v-btn   color="#1E88E5" style="width: 200px" @click="clickAgenda">Agendar Cita</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <br>
      <v-divider class="border-opacity-100" color="#E8EAF6"></v-divider>
      <br>
      <v-main>
        <!-- Contenido principal de la página -->
      </v-main>
  
      
        <v-row align="center" justify="start">
          <v-col cols="12" md="8" class="text-center">
            <p class="white--text">Conéctate con nosotros en las redes sociales</p>
            <br>
            <v-row justify="center" class="social-icons">
              <v-btn icon class="mx-2" href="https://facebook.com" target="_blank">
                <v-icon size="30" class="white--text">mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon class="mx-2" href="https://whatsapp.com" target="_blank">

                <v-icon> size="30" class="white--text">mi-whatsapp</v-icon>
              </v-btn>
              <v-btn icon class="mx-2" href="https://instagram.com" target="_blank">
                <v-icon size="30" class="white--text">mdi-instagram</v-icon>
              </v-btn>
            </v-row>
            <h5 class="my-4 white--text">
            <b> Diag.Las Fuentes 1463,Local 6</b> <br>
            <b> Esq.Saltillo 400 (En la gasolinera)</b>
            </h5>
          </v-col>
        </v-row>
     


    </v-content>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const clickAgenda = () => {
  router.push('/Agendar')
}

const colors = ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4']
const slides = ['First', 'Second', 'Third', 'Fourth', 'Fifth']
const items = [
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
  }
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




.social-icons .v-btn {
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.social-icons .v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>

<script>
export default {
  name: 'AppFooter'
}
</script>
