// apiClient.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://3.137.166.242/',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Error response data:', error.response.data)
      console.error('Error response status:', error.response.status)
      console.error('Error response headers:', error.response.headers)
    } else if (error.request) {
      console.error('Error request data:', error.request)
    } else {
      console.error('Error message:', error.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient
