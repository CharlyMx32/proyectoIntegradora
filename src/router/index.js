// index.js (router)

import { createRouter, createWebHistory } from 'vue-router'
import Global from '@/GlobalHome.vue'
import Login from '@/views/LoginFrom.vue'
import Register from '@/views/RegistroFrom.vue'
import AdminDashboard from '@/views/Admin/DashBoardAdmin.vue'
import TecnicoDashboard from '@/views/Tecnico/DashBoardTecnico.vue'
import RecepcionistaDashboard from '@/views/Recepcionista/DashBoardRecepcionista.vue'
import ClienteDashboard from '@/views/Cliente/DashBoardCliente.vue'
import { useAuthStore } from '@/stores/auth'

// Definir las rutas de la aplicación
const routes = [
  { path: '/', redirect: 'Global' },
  { path: '/Global', name: '/Global', component: Global }, // Redirigir al login por defecto
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' } // Requiere autenticación y rol de admin
  },
  {
    path: '/technician',
    name: 'TechnicianDashboard',
    component: TecnicoDashboard,
    meta: { requiresAuth: true, role: 'technician' } // Requiere autenticación y rol de técnico
  },
  {
    path: '/receptionist',
    name: 'ReceptionistDashboard',
    component: RecepcionistaDashboard,
    meta: { requiresAuth: true, role: 'receptionist' } // Requiere autenticación y rol de recepcionista
  },
  {
    path: '/client',
    name: 'ClientDashboard',
    component: ClienteDashboard,
    meta: { requiresAuth: true, role: 'client' } // Requiere autenticación y rol de cliente
  }
]

// Crear el enrutador con history mode
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Middleware para verificar la autenticación y roles antes de cada navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.role

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Requiere autenticación
    if (!isAuthenticated) {
      next({ name: 'Login' }) // Redirigir al login si no está autenticado
    } else if (to.meta.role && to.meta.role !== userRole) {
      next({ name: 'Login' }) // Redirigir al login si el rol no coincide
    } else {
      next() // Permitir la navegación si está autenticado y tiene el rol correcto
    }
  } else {
    next() // Permitir la navegación sin autenticación para rutas públicas
  }
})

export default router
