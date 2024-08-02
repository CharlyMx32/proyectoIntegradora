<template>
  <v-app class="Fondo">
    <v-content>
      <v-container>
        <br />
        <!---CARUCEL-->
        <v-row justify="center" align="center">
          <v-col cols="12" md="6">
            <v-sheet :elevation="24" height="402" width="598" border rounded>
              <v-carousel width="600" height="420" show-arrows="hover" cycle hide-delimiter-background>
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
          <v-col cols="12" md="6" class="text-center" style="padding-left: 100px">
            <p class="white-text">NOSOTROS</p>
            <p class="white-text">
              El Mundo Tecnologico, somos tu solución integral para la reparación de todos tus
              electrodomésticos y dispositivos electrónicos. Con un equipo de expertos altamente
              capacitados, ofrecemos servicios de reparación confiable y rápido para una amplia gama
              de productos, desde teléfonos móviles hasta televisores y electrodomésticos de gran
              tamaño.
            </p>
            <br />
            <v-btn color="#0800ff" style="width: 200px" @click="clickAgenda">Agendar Cita</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <br />
      <v-divider color="#E8EAF6"></v-divider>
      <br />
      <v-main>
        <!-- Contenido principal de la página -->
      </v-main>

     
    </v-content>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
import logo from '@/assets/logoFace.png'
const router = useRouter()

const clickAgenda = () => {
  router.push('/Agendar')
}

const colors = ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4']
const slides = ['First', 'Second', 'Third', 'Fourth', 'Fifth']
</script>

<style scoped>
.v-application {
  background: #ede8e6
 
}
.white-text {
  color: rgb(0, 0, 0);
}
.transparent-btn {
  background-color: transparent;
  color: currentColor; /* O puedes especificar un color aquí */
  box-shadow: none; /* Elimina cualquier sombra que pueda tener el botón */
  border: none; /* Elimina cualquier borde */
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
  name: 'DevelopersList'
}
</script>
