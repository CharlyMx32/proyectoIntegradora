<template>
  <v-main>
    <v-sheet :elevation="24" :height="500" :width="1700" border rounded>
      <v-img :src="imagen" :height="500" :width="1500" cover />
      <v-container fluid fill-height style="position: absolute; top: 0; left: 0; padding: 100px">
        <v-row justify="center" align="center">
          <v-col cols="12" md="6" class="text-center">
            <p class="white-text">Tu reparación, nuestra misión. ¡Bienvenido!</p>
            <br /><br />
            <v-btn color="#ffad00" style="width: 200px" @click="clickAgenda"> Agendar Cita </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <br /><br />
    <p class="subtitulo">Nosotros</p>
    <p class="text">
      En HardwareSolutions, somos tu solución integral <br />para la reparación de todos tus
      electrodomésticos y dispositivos electrónicos. <br />Con un equipo de expertos altamente
      capacitados, <br />ofrecemos servicios de reparación confiable y rápido para una amplia gama
      <br />
      de productos, desde teléfonos móviles hasta televisores y electrodomésticos <br />de gran
      tamaño.
    </p>
  </v-main>

  <!-- Pie de página -->
  <FooterComponent />
</template>

<script setup>
import FooterComponent from '@/components/Generales/FooterComponent.vue'
import { useRouter } from 'vue-router'
import imagen from '@/assets/imgfondo.jpg'

const router = useRouter()

const clickAgenda = () => {
  router.push('/Agendar')
}
</script>

<style scoped>
.v-application {
  background: #ede8e6;
}

.social-icons .v-btn {
  background-color: white;
  transition: background-color 0.3s ease;
}

.social-icons .v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.text {
  color: #000000;
  text-align: center;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
}

.white-text {
  color: #fff;
  font-size: 40px;
  font-family: 'Roboto', sans-serif;
}

.subtitulo {
  color: #000;
  font-size: 40px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

footer {
  background-color: #11100e;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  margin: 0px;
}

.footer-info,
.footer-links,
.social-icons {
  margin-bottom: 10px;
}

.footer-title {
  color: #ffad00;
}

.social-icon-btn {
  margin-right: 10px; /* Espacio entre los iconos */
}

.social-icon-btn:last-child {
  margin-right: 0; /* Elimina el margen del último ícono */
}
</style>
