<template>
  <v-app id="inspire" :class="{ 'dark-theme': isDarkMode }">
    <!-- Encabezado -->
    <header>
      <HeaderComponent :title="'HardwareSolutions'" :menuItems="menuItems" />
    </header>

    <main>
      <v-main :class="{ 'transition-effect': isTransitioning }">
        <v-container class="main-container">
          <v-row align="center">
            <v-col cols="12" md="6" class="slogan-col">
              <div class="slogan-container">
                <h1 class="slogan-text">
                  Más que reparaciones,<br />
                  <span class="underline">soluciones</span>
                </h1>
              </div>
            </v-col>

          <v-col cols>
            <v-sheet ref="textoRef" min-height="70vh" rounded="lg" class="texto">
              <p style="margin: 0 10px">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas minus eos amet
                voluptatem labore, provident sint itaque, ut, rerum tenetur in. A veritatis
                explicabo quo accusantium porro quae mollitia suscipit. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Dolore non eos dolorum eveniet, facilis quis facere
                pariatur suscipit aliquid? Dicta qui tempore ratione asperiores, provident
                temporibus eaque explicabo eveniet dignissimos. Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Beatae, amet earum voluptatem, totam, dolorem ea iusto
                ad non debitis praesentium numquam! Saepe, beatae fugit? Quasi ipsa laudantium
                repellendus repudiandae amet. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Error quis, odio excepturi eaque rem voluptates nulla facilis veritatis
                inventore et at. Reprehenderit nemo voluptatum possimus illo quos repellat velit
                accusantium.
              </p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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

.main-container {
  padding: 20px; /* Ajusta según sea necesario */
  flex: 1;
}

/* Asegúrate de que los estilos globales no afecten el espacio superior */
html,
body {
  margin: 0;
  padding: 0;
}

main {
  flex: 1; /* Permite que el contenido principal crezca para llenar el espacio disponible */
}

header {
  margin-top: 15px;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #11100e;
  padding: 20px;
  flex-shrink: 0; /* Evita que el footer se reduzca en tamaño */
}

.v-main {
  background-color: var(--v-background-base); /* Aplicar color de fondo del tema aquí */
}

/* Estilo del contenido principal */
.main-container {
  padding: 20px;
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

/* Pie de pagina */

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #11100e;
  padding: 20px;
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
