import apiClient from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    clienteId: localStorage.getItem('clienteId') || null,
    idTecnico: localStorage.getItem('id_tecnico') || null // Agregar id_tecnico aquí
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
          this.clienteId = data.data.clienteId
          this.idTecnico = data.data.idTecnico // Guardar id_tecnico aquí
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('clienteId', data.data.clienteId)
          localStorage.setItem('id_tecnico', data.data.tecnicoId) // También guardarlo en localStorage
        } else {
          console.error('Usuario o token no encontrado en la respuesta:', data.data.message)
          throw new Error(data.data.message)
        }
      } catch (error) {
        console.error('Error en el inicio de sesión:', error)
        throw error
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.clienteId = null
      this.idTecnico = null // Limpiar id_tecnico al cerrar sesión
      localStorage.removeItem('token')
      localStorage.removeItem('clienteId')
      localStorage.removeItem('id_tecnico') // También eliminar id_tecnico de localStorage
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
            this.clienteId = localStorage.getItem('clienteId')
            this.idTecnico = localStorage.getItem('id_tecnico') // Recuperar id_tecnico desde localStorage
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
