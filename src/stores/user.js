import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Admin User' // Inicializa con un valor por defecto o vacío
  }),
  actions: {
    setName(name) {
      this.name = name
    }
  }
})
