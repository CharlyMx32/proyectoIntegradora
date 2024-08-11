<template>
  <v-app>
    <v-main>
      <v-sheet
        :elevation="24"
        class="main-sheet"
        border
        rounded
      >
        <v-img
          :src="imagen"
          class="main-img"
          cover
        />
        <v-container
          fluid
          fill-height
          class="overlay-container"
        >
          <v-row justify="center" align="center">
            <v-col cols="12" md="6" class="text-center">
              <p class="white-text">Tu reparación, nuestra misión. ¡Bienvenido!</p>
              <br><br>
              <v-btn
                color="#ffad00"
                class="schedule-btn"
                @click="clickAgenda"
              >
                Agendar Cita
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>

      <v-container class="info-container">
        <p class="subtitulo">Nosotros</p>
        <p class="text">
          En HardwareSolutions, somos tu solución integral <br>para la reparación de todos tus
          electrodomésticos y dispositivos electrónicos. <br>Con un equipo de expertos altamente
          capacitados, <br>ofrecemos servicios de reparación confiable y rápido para una amplia gama <br>
          de productos, desde teléfonos móviles hasta televisores y electrodomésticos <br>de gran
          tamaño.
        </p>
      </v-container>
    </v-main>

    <!-- Pie de página -->
    <FooterComponent />
  </v-app>
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

.main-sheet {
  height: 500px;
  width: 100%;
  max-width: 1700px;
  position: relative;
  overflow: hidden;
}

.main-img {
  height: 100%;
  width: 100%;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5% 10%;
}

.schedule-btn {
  width: 200px;
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

/* Consultas de medios para hacer el diseño responsivo */
@media (max-width: 768px) {
  .overlay-container {
    padding: 5% 2%;
  }

  .schedule-btn {
    width: 150px;
  }

  .white-text {
    font-size: 30px;
  }

  .subtitulo {
    font-size: 30px;
  }

  .text {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .overlay-container {
    padding: 5% 1%;
  }

  .schedule-btn {
    width: 100%;
  }

  .white-text {
    font-size: 24px;
  }

  .subtitulo {
    font-size: 24px;
  }

  .text {
    font-size: 14px;
  }
}
</style>
