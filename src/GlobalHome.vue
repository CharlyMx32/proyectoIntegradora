<template>
  <div class="container">
    <v-main>
      <!-- Contenido principal de la página -->
    </v-main>

    <v-row align="center" justify="start">
      <v-col cols="12" md="8" class="text-center">
        <br />
        <v-row
          style="position: absolute; top: 500px; left: 40px; color: aliceblue"
          class="social-icons"
        >
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
          <h3 style="position: absolute; top: 110px; left: 100px; color:blue; font-size:70.0606px;">
            Hardware
            <br>Solutions
          </h3>
          <!---MAPA-->
          <div id="map" style="width: 800px; height: 600px;"></div>





          <br />
          <v-divider class="border-opacity-200" color="#E8EAF6"  style="width: 200%; display: block; margin: 0 auto;"></v-divider>
          <br />
          
          <v-btn
            style="position: absolute; top: 500px; left: 400px; color: aliceblue"
            @click="clickAgenda"
            class="transparent-btn"
            text
          >
            Agendar Cita
          </v-btn>

          <v-btn
            style="position: absolute; top: 500px; left: 640px; color: aliceblue"
            @click="ClickPedido"
            class="transparent-btn"
            text
            >Periodo</v-btn
          >

          <v-btn
            style="position: absolute; top: 500px; left: 800px; color: aliceblue"
            @click="ClickPedido"
            class="transparent-btn"
            text
            >Cerrar Sesion</v-btn >
          <h3 style="position: absolute; top: 610px; left: 40px; color: aliceblue"
            >Telefono:8715265042</h3>
            <br>
            <br>
          <h3 style="position: absolute; top: 630px; left: 40px; color: aliceblue"
            >MundoElectronicoTRC@gmail.com</h3>
<br>
          <v-row style="position: absolute; top: 503px; left: 1020px; color: aliceblue">
            <v-col cols="auto">
              <h3
                style="color: aliceblue">Desarrolladores
              </h3>
            </v-col>
          </v-row>
          <v-row style="position: absolute; top: 545px; left: 1020px; color: aliceblue;  font-size:14px;">
            <v-col cols="auto">
              <h3 style="color: aliceblue">Carlos Centeno
              </h3>
            </v-col>
          </v-row>
          <v-row style="position: absolute; top: 567px; left: 1020px; color: aliceblue">
            <v-col cols="auto">
              <h3
                style="color: aliceblue">Diana Ochoa
              </h3>
            </v-col>
          </v-row>
          <v-row style="position: absolute; top: 590px; left: 1020px; color: aliceblue">
            <v-col cols="auto">
              <h3
                style="color: aliceblue">Marbella Perez
              </h3>
            </v-col>
          </v-row>
          <v-row style="position: absolute; top: 520px; left: 1020px; color: aliceblue">
            <v-col cols="auto">
              <h3
                 style="color: aliceblue">Edwin Lopez
              </h3>
            </v-col>
          </v-row>
        </h5>
        <v-row style="position: absolute; top: 503px; left: 1290px; color: aliceblue">
          <v-col cols="auto">
            <h4
            style="color: aliceblue">Direccion
            </h4>
          </v-col>
        </v-row>
        <v-row style="position: absolute; top: 520px; left: 1200px; color: aliceblue">
          <v-col cols="auto">
            <h4
               style="color: aliceblue"
                >Calle dia de la fuente No.1463 6 campestre la rosita , Torreón, Mexico
            </h4>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120vh;
  background-color: #000;
}

.text {
  color: #fff;
  font-family: sans-serif;
  text-align: center;
 
  font-size: 30.0606px;
    font-family: 'Calibri', sans-serif;
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


</style>

<script>
export default {
  mounted() {
    const styledMapType = new google.maps.StyledMapType([
      // Aquí puedes agregar tus estilos personalizados
      {
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }]
      }
    ], { name: 'Styled Map' });

    const location = { lat: 34.164900, lng: -118.374825 };

    const map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 17,
      icon: true,
      disableDefaultUI: true,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'atellite', 'hybrid', 'terrain', 'tyled_map']
      }
    });

    const marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }
}
</script>