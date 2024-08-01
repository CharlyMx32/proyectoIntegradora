<template>
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
              <v-list-item
                v-for="(item, index) in menuItems"
                :key="index"
                @click="handleButtonClick(item.route)"
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import anime from 'animejs'

// Props del componente
const props = defineProps({
  menuItems: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()

// Manejo de clic en los botones de navegación
const handleButtonClick = (route) => {
  router.push(route)
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
</script>

<style scoped>
/* Estilos para la barra de navegación */
.navbar-title {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: var(--v-text-base); /* Color del texto dependiendo del tema */
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
</style>
