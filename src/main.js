// Importar estilos globales
import './assets/main.css'
import 'vuetify/dist/vuetify.min.css'

// Importar Vue y plugins necesarios
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Asegúrate de importar estilos de Vuetify aquí
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as icons from 'vuetify/iconsets/mdi-svg'
import axios from 'axios' // Importar Axios

// Importar componente raíz y router
import App from './App.vue'
import router from './router'

// Crear la aplicación Vue
const app = createApp(App)

// Configurar Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons,
  theme: {
    themes: {
      light: {
        primary: '#000000',
        secondary: '#121212',
        accent: '#1E1E1E',
        info: '#2E2E2E',
        warning: '#3E3E3E',
        error: '#4E4E4E',
        success: '#5E5E5E'
      },
      dark: {
        primary: '#000000',
        secondary: '#121212',
        accent: '#1E1E1E',
        info: '#2E2E2E',
        warning: '#3E3E3E',
        error: '#4E4E4E',
        success: '#5E5E5E'
      }
    }
  }
})

// Usar plugins y configuraciones
app.use(createPinia()) // Instalar Pinia para manejo de estado global
app.use(router) // Instalar el enrutador
app.use(vuetify) // Instalar Vuetify para estilos y componentes

// Configurar Axios con Vue-Axios
app.config.globalProperties.$axios = axios

// Montar la aplicación en el DOM
app.mount('#app')
