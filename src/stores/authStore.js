import apiClient from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    clienteId: null // Agregar clienteId aquí
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
          this.clienteId = data.data.clienteId // Guardar clienteId aquí
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('clienteId', data.data.clienteId) // También guardarlo en localStorage si es necesario
        } else {
          console.error('Usuario o token no encontrado en la respuesta:', data.data.message)
        }
      } catch (error) {
        console.error('Error en el inicio de sesión:', error)
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.clienteId = null // Limpiar clienteId al cerrar sesión
      localStorage.removeItem('Token')
      localStorage.removeItem('clienteId') // También eliminar clienteId de localStorage
    },
    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await apiClient.get('http://hs.com/auth', {
            headers: { Authorization: `Bearer ${token}` }
          })
          const data = response.data
          if (data.status === 200 && data.data.success && data.data.usuario) {
            this.user = data.data.usuario
            this.token = token
            this.clienteId = localStorage.getItem('clienteId') // Recuperar clienteId desde localStorage
          } else {
            this.logout()
          }
        } catch (error) {
          this.logout()
        }
      } else {
        this.logout()
      }
    }
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
