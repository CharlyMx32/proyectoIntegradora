<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height class="pa-0 ma-0">
        <!-- Fondo de la Página -->
        <v-sheet
          :elevation="24"
          class="position-relative d-flex align-center justify-center sheet-background"
          height="500"
          style="overflow: hidden;"
        >
          <v-img
            :src="imagen"
            height="100%"
            width="100%"
            class="object-fit-cover"
          />
          <div class="overlay-content text-center">
            <p class="white-text">Bienvenido a <br> HardwareSolutions</p>
            <v-btn color="#ffad00" class="mt-4" @click="clickAgenda">Agendar Cita</v-btn>
          </div>
        </v-sheet>
        
        <!-- Sección Nosotros -->
        <v-container class="text-center my-4">
          <p class="subtitulo">Nosotros</p>
          <p class="text">
            El HardwareSolutions, somos tu solución integral <br>
            para la reparación de todos tus electrodomésticos y dispositivos electrónicos. <br>
            Con un equipo de expertos altamente capacitados, <br>
            ofrecemos servicios de reparación confiable y rápido para una amplia gama <br>
            de productos, desde teléfonos móviles hasta televisores y electrodomésticos <br>
            de gran tamaño.
          </p>
        </v-container>
      </v-container>

      <!-- Footer -->
      <footer>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <h4 class="footer-title">Contactos</h4>
              <p>MundoElectronicoTRC@gmail.com</p>
              <p>Teléfono: 8715265042</p>
            </v-col>
            <v-col cols="12" md="4">
              <h4 class="footer-title">Desarrolladores</h4>
              <p>Edwin Lopez, Carlos Centeno</p>
              <p>Diana Ochoa, Marbella Perez</p>
            </v-col>
            <v-col cols="12" md="4">
              <div class="d-flex justify-center">
                <v-btn icon href="https://www.facebook.com/profile.php?id=100054380206513" target="_blank" class="social-icon-btn">
                  <svg fill="#ffffff" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14,6h3a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H14A5,5,0,0,0,9,7v3H7a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1H9v7a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V14h2.22a1,1,0,0,0,1-.76l.5-2a1,1,0,0,0-1-1.24H13V7A1,1,0,0,1,14,6Z"/>
                  </svg>
                </v-btn>
                <v-btn icon href="https://instagram.com" target="_blank" class="social-icon-btn">
                  <svg fill="#ffffff" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"/>
                  </svg>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </footer>
    </v-main>
  </v-app>
</template>

<script setup>
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

.white-text {
  color: #fff;
  font-size: 40px;
  font-family: 'Roboto', sans-serif;
}

.subtitulo {
  color: #000;
  font-size: 40px;
  font-family: 'Roboto', sans-serif;
}

.text {
  color: #000;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
}

footer {
  background-color: #11100e;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}

.footer-info, .footer-links, .social-icons {
  margin-bottom: 10px;
}

.footer-title {
  color: #FFAD00;
}

.social-icon-btn {
  margin-right: 10px;
}

.social-icon-btn:last-child {
  margin-right: 0;
}

.social-icons svg {
  fill: #ffffff; /* Color de los íconos */
}

.v-btn {
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-sheet {
  width: 100%;
  max-width: 1700px;
  position: relative;
}

.v-img {
  object-fit: cover;
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.sheet-background {
  background-color: #000000; /* Color de fondo del contenedor de la imagen */
}

@media (max-width: 600px) {
  .white-text {
    font-size: 30px;
  }

  .subtitulo {
    font-size: 30px;
  }
}
</style>
