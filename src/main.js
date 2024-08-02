// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import axios from 'axios'

import App from './App.vue'
import router from './router'

// Configuración de Vuetify con temas
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#ede8e6',/**/
          surface: '#FFFFFF',
          headerBackground: '#ffffff', /**/
          headerText: '#333333',
          primary: '#007acc',
          secondary: '#4CAF50',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          textPrimary: '#333333',
          textSecondary: '#555555',
          border: '#d1d1d1',
          shadow: '#000000',
          hover: '#add8e6',
          onHover: '#ffffff'
        }
      },
      dark: {
        colors: {
          background: '#11100e',
          surface: '#1E1E1E',
          barraLateral: '#212121',
          headerBackground: '#1e1e1e',
          primary: '#1E90FF',
          secondary: '#81C784',
          error: '#FF5252',
          headerText: '#ffffff',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          textPrimary: '#FFFFFF',
          textSecondary: '#CCCCCC',
          border: '#333333',
          shadow: '#000000',
          hover: '#333333',
          onHover: '#FFFFFF'
        }
      }
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // Instalar Vuetify para estilos y componentes

app.config.globalProperties.$axios = axios

app.mount('#app')
