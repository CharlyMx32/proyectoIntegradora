<template>
  <v-app class="Fondo">
    <v-content>
      <v-container>
        <v-card> </v-card>
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
          <v-col cols="12" md="6" class="text-right">
            <p class="white-text">NOSOTROS</p>
            <p class="white-text">
              El Mundo Tecnologico, somos tu solución integral para la reparación de todos tus
              electrodomésticos y dispositivos electrónicos. Con un equipo de expertos altamente
              capacitados, ofrecemos servicios de reparación confiable y rápido para una amplia gama
              de productos, desde teléfonos móviles hasta televisores y electrodomésticos de gran
              tamaño.
            </p>
            <v-btn color="#1E88E5" style="width: 300px" @click="clickAgenda">Agendar Cita</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="border-opacity-100" color="#E8EAF6"></v-divider>
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
