<template>
  <v-app id="inspire" :class="{ 'dark-theme': isDarkMode }" style="height: 100vh; width: 100vw;">
    <!-- Encabezado -->
    <header>
      <HeaderComponent :title="'HardwareSolutions'" :menuItems="menuItems" />
    </header>

    <main>
      <v-main :class="{ 'transition-effect': isTransitioning }">
        <v-container class="main-container">
          <!-- Contenedor para el eslogan y la información -->
          <v-row align="center" no-gutters>
            <v-col cols="12" md="6" class="slogan-col">
              <div class="slogan-container">
                <h1 class="slogan-text">
                  Más que reparaciones,<br />
                  <span class="underline">soluciones</span>
                </h1>
              </div>
            </v-col>
            <v-col cols="12" md="6">
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
          </v-row>

          <!-- Mapa -->
          <v-row>
            <v-col cols="12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.655566511074!2d-103.41784522489935!3d25.51653121869297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868fdb87c9af3bab%3A0x48699817edaff153!2sLa%20Fuente!5e0!3m2!1ses-419!2smx!4v1722614399479!5m2!1ses-419!2smx"
                width="100%"
                height="300"
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
            <h4>Contactos</h4>
            <p>MundoElectronicoTRC@gmail.com</p>
            <p>Teléfono: 8715265042</p>
          </v-col>

          <!-- Enlaces de Navegación -->
          <v-col cols="12" md="4" class="footer-links">
            <h4>Desarrolladores</h4>
            <p>Edwin Lopez, Carlos Centeno</p>
            <p>Diana Ochoa, Marbella Perez</p>
          </v-col>

          <!-- Iconos Sociales -->
          <v-col cols="12" md="4" class="social-icons">
            <v-btn icon href="https://www.facebook.com/profile.php?id=100054380206513" target="_blank" class="social-icon-btn">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </v-btn>
            <v-btn icon href="https://wa.me/+1234567890" target="_blank" class="social-icon-btn">
              <font-awesome-icon :icon="['fab', 'whatsapp']" />
            </v-btn>
            <v-btn icon href="https://instagram.com" target="_blank" class="social-icon-btn">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import HeaderComponent from './components/Generales/navBlancoo.vue'

// Estado y referencia a las rutas
const isDarkMode = ref(false) // Estado para el tema oscuro
const isTransitioning = ref(false) // Estado para controlar la animación

// Manejo de clic en los botones de navegación
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

/* Añadir la subrayado al eslogan */
.slogan-text::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -2px;
  transform: translateX(-50%);
  width: 79%;
  height: 8px;
  background-color: rgb(8, 0, 255);
  z-index: -1;
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
