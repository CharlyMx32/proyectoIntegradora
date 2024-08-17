<template>
  <v-container class="py-0 fill-height" fluid>
    <v-row align="center" no-gutters class="navbar">
      <!-- Columna para el Logo -->
      <v-col cols="auto" class="d-flex align-center">
        <v-img src="/img/Hs.png" alt="Logo" width="40" height="40" class="logo"></v-img>
      </v-col>

      <!-- Columna para el Título -->
      <v-col>
        <div class="navbar-title">{{ title }}</div>
      </v-col>

      <!-- Columna para el Menú -->
      <v-col cols="auto" class="d-flex justify-end">
        <div class="d-flex align-center">
          <span :class="{ hidden: showText }" class="menu-text" @click="toggleText">Menú</span>
          <v-avatar class="red-ball" size="40" @click="toggleText">
            <v-icon>mdi-menu</v-icon>
          </v-avatar>
          <ul class="text-list" :class="{ visible: showText }">
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              :class="{ hidden: !showText }"
              @click="handleMenuItemClick(item)"
            >
              {{ item.name }}
            </li>
            <!-- Ítem de Cerrar Sesión en la lista -->
            <li v-if="showLogout && showText" class="logout-item" @click.stop="$emit('logout')">
              Cerrar Sesión
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

const props = defineProps({
  title: {
    type: String,
    default: 'Default Title'
  },
  menuItems: {
    type: Array,
    default: () => []
  },
  showLogout: {
    type: Boolean,
    default: false
  }
})

const showText = ref(false)
const router = useRouter()

const toggleText = () => {
  showText.value = !showText.value
  animateBall()
}

const handleMenuItemClick = (item) => {
  if (item.route) {
    router.push(item.route)
  } else if (item.action) {
    item.action()
  }
  showText.value = false
}

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
  border-bottom: 1px solid var(--v-divider);
}

.navbar-title {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: var(--v-text-base);
}

.logo {
  margin-right: 10px;
  max-height: 40px; /* Asegúrate de que el alto sea suficiente */
}

.red-ball {
  background-color: #34495e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.text-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;
}

.text-list.visible {
  display: flex;
}

.text-list li {
  margin-left: 10px;
  padding: 10px;
  cursor: pointer;
  color: var(--v-text-base);
  transition: opacity 0.3s ease;
}

.hidden {
  display: none;
}

.menu-text {
  margin-right: 10px;
}

.logout-item {
  font-weight: bold;
  color: red;
}
</style>
