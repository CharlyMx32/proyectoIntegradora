import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://hs.com/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

// Puedes agregar un interceptor para incluir el token en todas las solicitudes
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

export default apiClient
