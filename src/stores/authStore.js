import apiClient from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async login(email, password) {
      try {
        const credentials = { correo: email, contraseña: password }

        const response = await apiClient.post('http://hs.com/login', credentials, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const data = response.data
        console.log('Datos de la respuesta:', data)

        if (data.status === 200 && data.data.success && data.data.token && data.data.usuario) {
          this.user = data.data.usuario
          this.token = data.data.token
          localStorage.setItem('token', data.data.token)
        } else {
          console.error('Usuario o token no encontrado en la respuesta:', data.data.message)
        }
      } catch (error) {
        console.error('Error en el inicio de sesión:', error)
      }
    }
  }
})
