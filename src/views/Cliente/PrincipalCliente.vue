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
            <v-btn class="btnAgendar" style="width: 200px" @click="clickAgenda">Agendar Cita</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <br>
      <v-divider class="border-opacity-100" color="#E8EAF6"></v-divider>
      
      <v-sheet
  :elevation="13"
  :height="600"
  :width="1500"
  border
  color="#ffad00"
  rounded>
      
  <v-row align="center" justify="start">
    <v-col cols="12" md="8" class="text-center">
      <br>
      <v-row  style="position: absolute; top: 555px; left: 40px; color:aliceblue" class="social-icons">
        <v-btn icon class="mx-2" href="https://www.facebook.com/profile.php?id=100054380206513" target="_blank"  >
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
          <h3 style="position: absolute; top: 500px; left: 40px; color:aliceblue">
            <b>HardwareSolutions</b>
          </h3>
          <v-btn style="position: absolute; top: 500px; left: 400px; color:aliceblue"
          @click="clickAgenda" 
          class="transparent-btn" 
          text
        >
          Agendar Cita
        </v-btn>
        
        <v-btn style="position: absolute; top: 500px; left: 640px; color:aliceblue" @click="ClickPedido"   class="transparent-btn" 
        text>Periodo</v-btn>
         
        <v-btn style="position: absolute; top: 500px; left: 800px; color:aliceblue" @click="ClickPedido"   class="transparent-btn" 
        text>Cerrar Sesion</v-btn>
          <b style="position: absolute; top: 610px; left: 40px; color:aliceblue">Telefono:8715265042</b>
          <b style="position: absolute; top: 630px; left: 40px; color:aliceblue">MundoElectronicoTRC@gmail.com</b>
          
          <v-row style="position: absolute; top: 503px; left: 1020px; color:aliceblue">
            <v-col cols="auto">
              <h3>
                <b style="color: aliceblue;">Desarrolladores</b>
              </h3>
            </v-col>
          </v-row>
          <v-row style="position: absolute; top: 545px; left: 1020px; color:aliceblue">
            <v-col cols="auto">
              <h3>
                <b style="color: aliceblue;">Carlos Centeno</b>
              </h3>
            </v-col>
          </v-row>
          <v-row style="position: absolute; top: 567px; left: 1020px; color:aliceblue">
            <v-col cols="auto">
              <h3>
                <b style="color: aliceblue;">Diana Ochoa</b>
              </h3>
            </v-col>
          </v-row>
          <v-row style="position: absolute; top: 590px; left: 1020px; color:aliceblue">
            <v-col cols="auto">
              <h3>
                <b style="color: aliceblue;">Marbella Perez</b>
              </h3>
            </v-col>
          </v-row>
          <v-row style="position: absolute; top: 520px; left: 1020px; color:aliceblue">
            <v-col cols="auto">
              <h3>
                <b style="color: aliceblue;">Edwin Lopez</b>
              </h3>
            </v-col>
          </v-row>
        </h5>
      <v-row style="position: absolute; top: 503px; left: 1290px; color:aliceblue">
        <v-col cols="auto">
          <h4>
            <b style="color: aliceblue;">Direccion</b>
          </h4>
        </v-col>
      </v-row>
      <v-row style="position: absolute; top: 520px; left: 1200px; color:aliceblue">
        <v-col cols="auto">
          <h4>
            <b style="color: aliceblue;">Calle dia de la fuente No.1463 6 campestre la rosita , Torreón, Mexico</b>
          </h4>
        </v-col>
      </v-row>
      </v-col>
    </v-row>


</v-sheet>
      
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
  background: #ede8e6
}

.btnAgendar{
  background:#ffad00
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
  name: 'DevelopersList',
};
</script>