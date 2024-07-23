// src/axiosConfig.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'HS.com/Models', // Cambia 'POOCRUD' por el nombre de tu carpeta
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

export default instance
