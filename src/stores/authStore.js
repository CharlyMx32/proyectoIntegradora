// src/stores/auth.js

import { defineStore } from 'pinia'

// Define y exporta tu store de autenticación
export const useAuthStore = defineStore({
  id: 'auth', // Identificador único para tu store
  state: () => ({
    isAuthenticated: false,
    userRole: null
  }),
  actions: {
    login(user, role) {
      this.isAuthenticated = true
      this.userRole = role
      // Aquí podrías guardar el usuario y el rol en el localStorage o sessionStorage si es necesario
    },
    logout() {
      this.isAuthenticated = false
      this.userRole = null
      // Aquí podrías limpiar el localStorage o sessionStorage si es necesario
    }
  }
})
