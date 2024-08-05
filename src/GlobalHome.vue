<template>
  <v-app id="inspire" :class="{ 'dark-theme': isDarkMode }" style="height: 202vh; width: 100vw;">
    <!-- Encabezado -->
    <header>
      <HeaderComponent :title="'HardwareSolutions'" :menuItems="menuItems" />
    </header>

    <main>
      <v-main :class="{ 'transition-effect': isTransitioning }">
        <v-container class="main-container">
          <!-- Contenedor para el eslogan -->
          <v-row align="center" no-gutters>
            <v-col cols="12" class="slogan-col">
              <div class="slogan-container">
                <h1 class="slogan-text">
                  Más que reparaciones,<br />
                  <span class="underline">soluciones</span>
                </h1>
              </div>
            </v-col>
          </v-row>

          <!-- Información del negocio y Mapa -->
          <v-row>
            <v-col cols="12" md="6" class="info-col">
              <!-- Información del negocio -->
              <v-sheet class="info-box" elevation="2">
                <p>
  <strong>CONÓCENOS</strong><br />
  En HardwareSolutions, ofrecemos un servicio integral para la reparación de <strong>teléfonos móviles</strong>, <strong>computadoras y laptops</strong>, <strong>electrodomésticos</strong>, y <strong>televisores</strong>. Diagnósticos rápidos y soluciones efectivas para problemas como pantallas rotas, baterías defectuosas, fallos de hardware y software, y más.<br />
  <strong>Servicio Rápido y Eficiente:</strong> Garantizamos tiempos de reparación cortos para que vuelvas a utilizar tus dispositivos sin demoras.<br />
  <strong>Soporte Técnico:</strong> Brindamos asesoramiento y asistencia técnica para resolver cualquier duda que puedas tener.
</p>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </main>
    <!-- Pie de página -->
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
                width="100%"
                height="280"
                style="border: 0; margin-top: 20px;"
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
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import HeaderComponent from './components/Generales/navBlancoo.vue'
import { ref } from 'vue'

const isDarkMode = ref(false) // Estado para el tema oscuro
const isTransitioning = ref(false) // Estado para controlar la animación

const menuItems = [
  { name: 'Login', route: '/Login' },
  { name: 'Registrarme', route: '/register' }
]
</script>

<style scoped>
/* Asegura que html y body ocupen toda la altura del viewport */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* Estilo principal para el contenedor del app */
#inspire {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

/* Estilo para el contenido principal */
main {
  flex: 1;
}

/* Estilo del pie de página */
footer {
  background-color: #11100e;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  flex-shrink: 0;
}

/* Estilos de los elementos del pie de página */
.footer-info, .footer-links, .social-icons {
  margin-bottom: 10px;
}

/* Estilo de los títulos del pie de página */
.footer-title {
  color: #FFAD00;
}

/* Estilo de los botones de iconos sociales */
.social-icon-btn {
  margin-right: 10px; /* Espacio entre los iconos */
}

.social-icon-btn:last-child {
  margin-right: 0; /* Elimina el margen del último ícono */
}

/* Estilo del contenido principal */
.main-container {
  padding: 20px;
}

/* Estilo para la columna del eslogan */
.slogan-col {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px; /* Añadir espacio debajo del eslogan */
}

/* Estilo del contenedor del eslogan */
.slogan-container {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--v-text-base);
}

.slogan-text {
  font-family: 'Calibre', Sans-serif;
  font-size: 90.733px;
  font-weight: bold;
  line-height: 1.2;
  position: relative;
  padding: 0;
}

.underline {
  position: relative;
  display: inline-block;
}

.underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 8px;
  background-color: rgb(8, 0, 255);
}

/* Estilo del contenedor de la información */
.info-box {
  padding: 20px;
  background-color: var(--v-background-base);
  border-radius: 8px;
  color: var(--v-text-base);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  margin-top: 20px; /* Espacio superior para separar del eslogan */
}

/* Estilo del texto de información */
.info-text {
  text-align: center;
}

/* Columna de la información y mapa */
.info-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Media Queries */
@media (max-width: 600px) {
  .slogan-text {
    font-size: 2rem;
  }

  .info-box {
    padding: 10px;
    margin-top: 15px; /* Ajustar el margen superior para pantallas pequeñas */
  }

  iframe {
    height: 200px; /* Ajustar la altura del iframe para pantallas pequeñas */
  }
}
</style>
