<!-- HeaderComponent.vue -->
<template>
  <v-container class="py-0 fill-height" fluid>
    <v-row align="center" no-gutters class="navbar">
      <!-- Título a la izquierda -->
      <v-col>
        <div class="navbar-title">{{ title }}</div>
      </v-col>
      <!-- Espacio a la derecha con el ícono de bolita rojiza y texto alternativo -->
      <v-col cols="auto" class="d-flex justify-end">
        <div class="d-flex align-center">
          <v-avatar class="red-ball" size="40" @click="toggleText">
            <v-icon>mdi-menu</v-icon>
          </v-avatar>
          <ul class="text-list">
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              :class="{ hidden: !showText }"
              @click="handleMenuItemClick(item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import anime from 'animejs'

// Props para el componente
const props = defineProps({
  title: {
    type: String,
    default: 'Default Title'
  },
  menuItems: {
    type: Array,
    default: () => []
  }
})

// Estado para mostrar/ocultar el texto
const showText = ref(false)

// Router para redireccionar
const router = useRouter()

// Alternar la visibilidad del texto
const toggleText = () => {
  showText.value = !showText.value
  animateBall()
}

// Manejo de clic en los ítems del menú
const handleMenuItemClick = (item) => {
  if (item.route) {
    router.push(item.route)
  }
  showText.value = false // Ocultar texto después de hacer clic
}

// Animación de la bolita (opcional)
const animateBall = () => {
  anime({
    targets: '.red-ball',
    scale: [
      { value: 0.001, duration: 100 },
      { value: 1.5, duration: 100 },
      { value: 0.005, duration: 100 },
      { value: 1, duration: 100 }
    ],
    easing: 'easeInOutSine',
    loop: false
  })
}
</script>

<style scoped>
.navbar {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--v-divider); /* Línea divisoria */
}

.navbar-title {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: var(--v-text-base); /* Color del texto dependiendo del tema */
}

/* Estilos para la bolita roja */
.red-ball {
  background-color: rgb(8, 0, 255);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

/* Estilos para la lista de texto */
.text-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;
}

.text-list li {
  margin-left: 10px;
  padding: 10px;
  cursor: pointer;
  color: var(--v-text-base);
  transition: opacity 0.3s ease;
}

/* Clase para ocultar el texto */
.hidden {
  display: none;
}
</style>
