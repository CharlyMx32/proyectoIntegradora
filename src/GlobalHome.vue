<template>
  <v-app id="inspire" :class="{ 'dark-theme': isDarkMode }" style="height: 100vh; width: 100vw;">
    <!-- Encabezado -->
    <header>
      <HeaderComponent :title="'HardwareSolutions'" :menuItems="menuItems" />
    </header>

    <main>
      <v-main :class="{ 'transition-effect': isTransitioning }">
        <v-container class="main-container">
          <v-row align="center" no-gutters>
            <v-col cols="12" md="6" class="slogan-col">
              <div class="slogan-container">
                <h1 class="slogan-text">
                  Más que reparaciones,<br />
                  <span class="underline">soluciones</span>
                </h1>
              </div>
            </v-col>

            <!-- Columna derecha para el texto de información del negocio -->
            <v-col cols="12" md="6">
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
        </v-container>
      </v-main>
    </main>

    <!-- Pie de página -->
    <footer>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="6" class="footer-text">
            <p>&copy; 2024 HardwareSolutions. Todos los derechos reservados.</p>
                       
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
@keyframes in-circle-swoop {
  from {
    clip-path: var(--circle-top-right-out);
  }
  to {
    clip-path: var(--circle-bottom-right-in);
  }
}

#inspire {
  position: relative;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la ventana */
}

main {
  flex: 1; /* Permite que el contenido principal crezca para llenar el espacio disponible */
}

header {
  margin-top: 15px;
}

.v-main {
  background-color: var(--v-background-base); /* Aplicar color de fondo del tema aquí */
}

/* Estilo del contenido principal */
.main-container {
  padding: 20px;
}

.texto {
  text-align: justify;
  padding: 20px;
}

.slogan-col {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.slogan-container {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--v-text-base); /* Color del texto dependiendo del tema */
}

.slogan-text {
  font-size: 3rem; /* Tamaño de fuente grande */
  font-weight: bold; /* Negritas */
  line-height: 1.2;
  transform: translateZ(0);
}

.info-box {
  padding: 20px;
  background-color: var(--v-background-base); /* Color de fondo del recuadro */
  border-radius: 8px; /* Bordes redondeados */
  color: var(--v-text-base); /* Color del texto dependiendo del tema */
  text-align: center; /* Centra el texto dentro del recuadro */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px; /* Ajusta la altura mínima según el diseño */
}

.info-text {
  text-align: center; /* Centra el texto dentro del contenedor */
}

.slogan-text {
  font-family: 'Calibre', Sans-serif; /* Fuente Calibre */
  font-size: 90.733px; /* Tamaño de fuente grande */
  font-weight: bold; /* Negritas */
  line-height: 1.2;
  position: relative; /* Necesario para el posicionamiento del pseudo-elemento */
  padding: 0; /* Elimina el padding para un ajuste preciso */
}

.slogan-text::after {
  content: '';
  position: absolute;
  left: 64px; /* Alinea la línea con el inicio del texto */
  bottom: -2px; /* Ajusta la distancia de la línea desde la base del texto. Reduce este valor para subir la línea */
  width: 79%; /* Ajusta el ancho de la línea al 100% del contenedor del texto */
  height: 8px; /* Grosor de la línea */
  background-color: rgb(8, 0, 255); /* Color de la línea */
  z-index: -1; /* Asegura que la línea esté detrás del texto */
}

/* Estilos para el pie de página */
footer {
  background-color: #11100e;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  flex-shrink: 0; /* Asegura que el pie de página no se reduzca */
}

.footer-text a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}

.footer-text a:hover {
  text-decoration: underline;
}

/* Media Queries */
@media (max-width: 600px) {
  .slogan-text {
    font-size: 2rem;
  }

  .info-box {
    padding: 10px;
  }
}
</style>
