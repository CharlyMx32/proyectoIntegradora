<template>
  <v-app id="inspire" :class="{ 'dark-theme': isDarkMode }" class="app-container">
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
                <p class="info-text">
                  <strong>CONÓCENOS</strong><br />
                  En HardwareSolutions, ofrecemos un servicio integral para la reparación de <strong>teléfonos móviles</strong>, <strong>computadoras y laptops</strong>, <strong>electrodomésticos</strong>, y <strong>televisores</strong>. Diagnósticos rápidos y soluciones efectivas para problemas como pantallas rotas, baterías defectuosas, fallos de hardware y software, y más.<br />
                  <strong>Servicio Rápido y Eficiente:</strong> Garantizamos tiempos de reparación cortos para que vuelvas a utilizar tus dispositivos sin demoras.<br />
                  <strong>Soporte Técnico:</strong> Brindamos asesoramiento y asistencia técnica para resolver cualquier duda que puedas tener.
                </p>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="6">
              <!-- Mapa -->
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.655566511074!2d-103.41784522489935!3d25.51653121869297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868fdb87c9af3bab%3A0x48699817edaff153!2sLa%20Fuente!5e0!3m2!1ses-419!2smx!4v1722614399479!5m2!1ses-419!2smx"
                width="100%"
                height="280"
                style="border: 0; margin-top: 20px;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </main>

    <!-- Pie de página -->
    <footer>
      <v-container>
        <v-row>
          <!-- Información de Contacto -->
          <v-col cols="12" md="4" class="footer-info">
            <h4 class="footer-title">Contactos</h4>
            <p>Correo: MundoElectronicoTRC@gmail.com</p>
            <p>Teléfono: 8715265042</p>
          </v-col>

          <!-- Enlaces de Navegación -->
          <v-col cols="12" md="4" class="footer-links">
            <h4 class="footer-title">Desarrolladores</h4>
            <p>Edwin Lopez, Carlos Centeno</p>
            <p>Diana Ochoa, Marbella Perez</p>
          </v-col>

          <!-- Iconos Sociales -->
          <v-col cols="12" md="4" class="social-icons">
            <v-btn icon href="https://www.facebook.com/profile.php?id=100054380206513" target="_blank" class="social-icon-btn">
              <!-- Icono de Facebook -->
              <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" id="facebook" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color">
                <path d="M14,6h3a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H14A5,5,0,0,0,9,7v3H7a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1H9v7a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V14h2.22a1,1,0,0,0,1-.76l.5-2a1,1,0,0,0-1-1.24H13V7A1,1,0,0,1,14,6Z" style="fill: rgb(0, 0, 0);"></path>
              </svg>
            </v-btn>
            <v-btn icon href="https://instagram.com" target="_blank" class="social-icon-btn">
              <!-- Icono de Instagram -->
              <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"/>
              </svg>
            </v-btn>
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
  animation: fadeInUp 1s ease-out;
}

/* Animación del eslogan */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
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

