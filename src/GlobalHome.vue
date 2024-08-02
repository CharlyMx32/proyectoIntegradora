<template>
  <v-app id="inspire" :class="{ 'dark-theme': isDarkMode }">
    <!-- Encabezado -->
    <header>
      <v-container class="py-0 fill-height" fluid>
        <v-row align="center" no-gutters>
          <!-- Título a la izquierda -->
          <v-col>
            <div class="navbar-title">HardwareSolutions</div>
          </v-col>
          <!-- Espacio a la derecha con el ícono de bolita rojiza -->
          <v-col cols="auto" class="d-flex justify-end">
            <v-menu offset-y>
              <template #activator="{ props }">
                <v-avatar
                  v-bind="props"
                  class="red-ball"
                  size="40"
                  @mouseenter="animateBall"
                  @mouseleave="resetBall"
                >
                  <v-icon>mdi-menu</v-icon>
                </v-avatar>
              </template>
              <v-list>
                <v-list-item @click="handleButtonClick(0)">
                  <v-list-item-title>Login</v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleButtonClick(1)">
                  <v-list-item-title>Registrarme</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </header>

    <!-- Contenido principal -->
    <main>
      <v-main :class="{ 'transition-effect': isTransitioning }">
        <v-container class="main-container">
          <v-row align="center">
            <!-- Columna izquierda para el eslogan con efecto de paralaje -->
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
    <footer>
      <v-footer app class="footer">
        <v-container fluid>
          <v-row>
            <v-col class="text-center">
              <p>© 2024 Hardware Solutions. Todos los derechos reservados.</p>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </footer>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import anime from 'animejs'

// Estado y referencia a las rutas
const isDarkMode = ref(false) // Estado para el tema oscuro
const isTransitioning = ref(false) // Estado para controlar la animación
const router = useRouter()

// Manejo de clic en los botones de navegación
const handleButtonClick = (index) => {
  if (index === 0) {
    router.push('/Login')
  } else if (index === 1) {
    router.push('/register')
  }
}

// Animación de la bolita
const animateBall = () => {
  anime({
    targets: '.red-ball',
    scale: [
      { value: 0.001, duration: 100 }, // Se reduce más
      { value: 1.5, duration: 100 }, // Se agranda más
      { value: 0.005, duration: 100 }, // Se reduce un poco
      { value: 1, duration: 100 } // Vuelve al tamaño original
    ],
    easing: 'easeInOutSine',
    loop: false
  })
}

const resetBall = () => {
  // Puedes añadir aquí cualquier animación que desees al salir del hover
}

// Ejecutar animación al montar el componente
onMounted(() => {
  // Aquí puedes añadir cualquier animación al montar el componente si es necesario
})
</script>

<style scoped>
:root {
  --circle-top-right-out: polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0);
  --circle-bottom-right-in: polygon(50% 50%, 100% 100%, 0 100%, 0 0, 100% 0);
}

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
  font-family: 'Roboto', sans-serif; /* Fuente global */
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que el contenido llene la altura completa de la ventana */
}

/* Estilos para la barra de navegación */
.navbar {
  box-shadow: none !important; /* Asegura que no haya sombra */
  background-color: transparent !important; /* Asegura que el fondo sea transparente */
  border-bottom: none !important; /* Elimina el borde inferior */
  border-top: none !important; /* Elimina el borde superior si es necesario */
}

/* Estilos para el título de la barra de navegación */
.navbar-title {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: var(--v-text-base); /* Color del texto dependiendo del tema */
}

header {
  margin-top: 20px;
}

.v-main {
  background-color: var(--v-background-base); /* Aplicar color de fondo del tema aquí */
}

.main-container {
  padding: 20px; /* Padding agregado al contenido principal */
  flex: 1; /* Permite que el contenedor principal crezca */
}

.texto {
  text-align: justify;
  padding: 20px;
}

/* Estilos para la bolita roja */
.red-ball {
  background-color: rgb(8, 0, 255);
  border-radius: 50%; /* Forma circular */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease; /* Mantener transición suave si se usa también con anime.js */
}

/* Estilos para el pie de página */
.footer {
  background-color: var(--v-footer-background); /* Color de fondo del pie de página */
  color: var(--v-footer-text); /* Color del texto del pie de página */
  padding: 10px 0;
}

.main-container {
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
  /* Efecto de paralaje */
  transform: translateZ(0);
}

.info-box {
  padding: 20px;
  background-color: var(--v-background-base); /* Color de fondo del recuadro */
  border-radius: 8px; /* Bordes redondeados */
  color: var(--v-text-base); /* Color del texto dependiendo del tema */
  text-align: justify;
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
  text-align: center;
  color: var(--v-text-base); /* Color del texto dependiendo del tema */
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
</style>