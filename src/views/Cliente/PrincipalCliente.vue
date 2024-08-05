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
    </v-content>
      <v-main>
        <!-- Contenido principal de la página -->
      </v-main>
      <footer style="max-height: 750px; overflow: hidden;">
        <div class="container">
          <v-row align="center" justify="start">
            <v-col cols="12" md="8" class="text-center">
              <br />
              <v-row
                style="position: absolute; top: 1230px; left: 40px; color: aliceblue"
                class="social-icons">
                <v-btn
                  icon
                  class="mx-2"
                  href="https://www.facebook.com/profile.php?id=100054380206513"
                  target="_blank"
                >
                  <font-awesome-icon :icon="['fab', 'facebook']" />
                  <v-img class="icon" :src="logo" contain></v-img>
                </v-btn>
                <v-btn icon class="mx-2" href="https://whatsapp.com" target="_blank">
                  <v-icon size="30" class="white--text">mi-whatsapp></v-icon>
                </v-btn>
                <v-btn icon class="mx-2" href="https://instagram.com" target="_blank">
                  <v-icon size="30" class="white--text">mdi-instagram</v-icon>
                </v-btn>
              </v-row>
  
              <h5 class="my-4 white--text">
                <h3
                  style="position: absolute; top: 780px; left: 100px; color: #ffad00; font-size: 110px;">
                  Hardware
                  <br/>Solutions
                </h3>
                <!---MAPA-->
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.655566511074!2d-103.41784522489935!3d25.51653121869297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868fdb87c9af3bab%3A0x48699817edaff153!2sLa%20Fuente!5e0!3m2!1ses-419!2smx!4v1722614399479!5m2!1ses-419!2smx"
                  width="600"
                  height="270"
                  style="border: 0; position: absolute; top: 800px; right: 90px"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
                <v-divider
    color="#E8EAF6"
    style="
      width: 170vw;
      position: relative;
      left: 50%;
      transform: translateX(-50%) translateY(60px); /* Agregué un desplazamiento vertical de 20px */
    "
  ></v-divider>
  
  
                <v-btn
                  style="position: absolute; top: 1297px; left: 400px; color: #ffad00"
                  class="transparent-btn"
                >
                  Inicio
                </v-btn>
  
                <v-btn
                  style="position: absolute; top: 1297px; left: 640px; color: #ffad00"
                  class="transparent-btn"
                  >Login</v-btn
                >
  
                <v-btn
                  style="position: absolute; top: 1297px; left: 800px; color: #ffad00"
                  class="transparent-btn"
                  >Iniciar Secion</v-btn
                >
                <h3 style="position: absolute; top: 1297px; left: 40px; color: aliceblue">
                  Telefono:8715265042
                </h3>
                <br />
                <br />
                <h3 style="position: absolute; top:  1320px; left: 40px; color: aliceblue">
                  MundoElectronicoTRC@gmail.com
                </h3>
                <br />
                <v-row style="position: absolute; top:  1297px; left: 1020px; color: #ffad00">
                  <v-col cols="auto">
                    <h3 style="color: #ffad00">Desarrolladores</h3>
                  </v-col>
                </v-row>
                <v-row
                  style="
                    position: absolute;
                    top: 1297px;
                    left: 1020px;
                    color: #ffad00;
                    font-size: 14px;
                  "
                >
                  <v-col cols="auto">
                    <h3 style="color: aliceblue">Carlos Centeno</h3>
                  </v-col>
                </v-row>
                <v-row style="position: absolute; top: 1320px; left: 1020px; color: #ffad00">
                  <v-col cols="auto">
                    <h3 style="color: aliceblue">Diana Ochoa</h3>
                  </v-col>
                </v-row>
                <v-row style="position: absolute; top: 1340px; left: 1020px; color: #ffad00">
                  <v-col cols="auto">
                    <h3 style="color: aliceblue">Marbella Perez</h3>
                  </v-col>
                </v-row>
                <v-row style="position: absolute; top: 1360px; left: 1020px; color: #ffad00">
                  <v-col cols="auto">
                    <h3 style="color: aliceblue">Edwin Lopez</h3>
                  </v-col>
                </v-row>
              </h5>
              <v-row style="position: absolute; top: 1297px; left: 1290px; color: #ffad00">
                <v-col cols="auto">
                  <h4 style="color: #ffad00">Direccion</h4>
                </v-col>
              </v-row>
              <v-row style="position: absolute; top: 1300px; left: 1190px; color: #ffad00">
                <v-col cols="auto">
                  <h4 style="color: aliceblue">
                    Calle dia de la fuente No.1463 6 campestre la rosita , Torreón, Mexico
                  </h4>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </footer>
     
    
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #11100e;
  margin: 20px;
  padding: 20px;
}

.footer-container {
  margin: 0px;
  padding: 0%;
}

.text {
  color: #fff;
  font-family: sans-serif;
  text-align: center;
  font-size: 30.0606px;
  font-family: 'Calibri', sans-serif;
}
.white-text {
  color: #000000;
}
.transparent-btn {
  background-color: transparent;
  color: currentColor; /* O puedes especificar un color aquí */
  box-shadow: none; /* Elimina cualquier sombra que pueda tener el botón */
  border: none; /* Elimina cualquier borde */
}
</style>

<script>
export default {
  name: 'DevelopersList'
}
</script>
