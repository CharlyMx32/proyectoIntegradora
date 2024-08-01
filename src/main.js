import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#ede8e6',
          surface: '#FFFFFF',
          headerBackground: '#ffffff',
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
        },
        typography: {
          fontFamily: 'Roboto, sans-serif', // Fuente global
          fontFamilyTitle: 'Montserrat, sans-serif' // Fuente para títulos
        }
      },
      dark: {
        colors: {
          background: '#11100e',
          surface: '#1E1E1E',
          headerBackground: '#1e1e1e',
          headerText: '#ffffff',
          primary: '#1E90FF',
          secondary: '#81C784',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          textPrimary: '#FFFFFF',
          textSecondary: '#CCCCCC',
          border: '#333333',
          shadow: '#000000',
          hover: '#333333',
          onHover: '#FFFFFF'
        },
        typography: {
          fontFamily: 'Roboto, sans-serif', // Fuente global
          fontFamilyTitle: 'Montserrat, sans-serif' // Fuente para títulos
        }
      }
    }
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
