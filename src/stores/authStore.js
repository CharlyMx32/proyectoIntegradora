// stores/authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    errorMessage: ''
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://HS.com/login', {
          correo: email,
          contraseña: password
        })
        // Maneja la respuesta del servidor
        this.user = response.data.user // Asegúrate de que esta propiedad existe en la respuesta
        localStorage.setItem('token', response.data.token)
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Error desconocido'
        console.error('Error en el inicio de sesión:', error)
      }
    }
  }
})
