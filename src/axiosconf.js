import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://HS.com/', // La base URL debe coincidir con tu configuración del enrutador
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
})

export default apiClient
