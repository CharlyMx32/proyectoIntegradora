// Importar estilos globales
import './assets/main.css'
import 'vuetify/dist/vuetify.min.css'

// Importar Vue y plugins necesarios
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as icons from 'vuetify/iconsets/mdi-svg'
import axios from 'axios'

import App from './App.vue'
import router from './router'

// Configurar Vuetify con temas
const vuetify = createVuetify({
  components,
  directives,
  icons
})

const app = createApp(App)

// Usar plugins y configuraciones
app.use(createPinia()) // Instalar Pinia para manejo de estado global
app.use(router) // Instalar el enrutador
app.use(vuetify) // Instalar Vuetify para estilos y componentes

// Configurar Axios con Vue-Axios
app.config.globalProperties.$axios = axios

// Montar la aplicación en el DOM
app.mount('#app')
