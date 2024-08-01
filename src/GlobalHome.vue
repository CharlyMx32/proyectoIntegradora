<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32">HS</v-avatar>
        <v-spacer></v-spacer>
        <v-btn v-for="(link, index) in links" :key="link" text @click="handleButtonClick(index)">
          {{ link }}
        </v-btn>
        <v-switch
          v-model="theme"
          :label="theme ? 'Modo Claro' : 'Modo Oscuro'"
          @change="toggleDarkMode"
        ></v-switch>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="main-container">
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              
              
            </v-sheet>
          </v-col>

          <v-col cols>
            <v-sheet ref="textoRef" min-height="70vh" rounded="lg" class="texto">
              <p>
                hola
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
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const links = ref(['Login', 'Registrarme'])
const theme = useTheme()

const router = useRouter()


const handleButtonClick = (index) => {
  if (index === 0) {
    router.push('/Login')
  } else if (index === 1) {
    router.push('/register')
  }
}

const toggleDarkMode = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<style scoped>
#inspire {
  position: relative;
  overflow: hidden;
}

.main-container {
  background-color: var(--v-background-base);
  min-height: 100vh;
  padding: 20px;
}

.animated-sphere {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.texto {
  text-align: justify;
  padding: 20px;
}

/* Ajusta los colores de fondo según el tema */
.v-application--is-ltr .v-application--dark .main-container {
  background-color: #11100e; /* Modo oscuro */
}

.v-application--is-ltr .v-application--light .main-container {
  background-color: #ede8e6; /* Modo claro */
}
</style>

