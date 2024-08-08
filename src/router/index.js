import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore' // Asegúrate de que la ruta sea correcta

// Importa tus componentes
import Global from '@/GlobalHome.vue'
import Login from '@/views/LoginFrom.vue'
import Register from '@/views/RegistroFrom.vue'

// Charly lineas
import DashBoardRecepcionista from '@/views/Recepcionista/DashBoardRecepcionista.vue'
import DashBoardAdmin from '@/views/Admin/DashBoardAdmin.vue'
import UsuariosAdmin from '@/views/Admin/UsuariosAdmin.vue'
import registroUsuarios from '@/views/Admin/registroUsuarios.vue'
import detalleServicios from '@/views/Admin/detalleServiciosLinea.vue'
import detalleServiciosFisicos from '@/views/Admin/detalleServiciosFisicos.vue'

// Cheche lineas
import DashBoardTecnico from '@/views/Tecnico/DashBoardTecnico.vue'
import Tareas from '@/views/Tecnico/TareasFrom.vue'

// Ochoa lineas
import DashBoardCliente from '@/views/Cliente/DashBoardCliente.vue'
import AgendarCita from '@/views/Cliente/AgendarCita.vue'
import PrincipalCliente from '@/views/Cliente/PrincipalCliente.vue'
import PedidoProducto from '@/views/Cliente/PedidoProducto.vue'

// mar lineas
import agendarCitas from '@/views/Recepcionista/AgendarCitas.vue'
import asignarCita from '@/views/Recepcionista/AsignarCita.vue'
import asignarCitaFisica from '@/views/Recepcionista/Asignar Cita Fisico.vue'
import citasLinea from '@/views/Recepcionista/CitasLinea.vue'
import CitasFisico from '@/views/Recepcionista/CitasFisico.vue'
import asistenciaLinea from '@/views/Recepcionista/AsistenciaLinea.vue'

const routes = [
  { path: '/', redirect: '/Global' },
  { path: '/Global', name: 'Global', component: Global },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/TAS', name: 'tareas', component: Tareas },

  // Rutas para Cliente
  {
    path: '/Cliente',
    component: DashBoardCliente,
    meta: { requiresAuth: true, role: 2 },
    children: [
      { path: '/principal', component: PrincipalCliente },
      { path: '', redirect: '/principal' },
      { path: '/Agendar', component: AgendarCita },
      { path: '/Pedir', component: PedidoProducto }
    ]
  },

  // Rutas para Recepcionista
  {
    path: '/Recepcionista',
    component: DashBoardRecepcionista,
    meta: { requiresAuth: true, role: 3 },
    children: [
      { path: '/AL', component: asistenciaLinea },
      { path: '/AGC', component: agendarCitas },
      { path: '', redirect: 'AGC' },
      { path: '/AC', component: asignarCita },
      { path: '/ACf', component: asignarCitaFisica },
      { path: '/CL', component: citasLinea },
      { path: '/CF', component: CitasFisico }
    ]
  },

  // Rutas para Técnico
  {
    path: '/Tecnico',
    component: DashBoardTecnico,
    meta: { requiresAuth: true, role: 4 }
  },

  // Rutas para Admin
  {
    path: '/admin',
    component: DashBoardAdmin,
    meta: { requiresAuth: true, role: 1 },
    children: [
      { path: '/RU', component: registroUsuarios },
      { path: '', redirect: '/RU' },
      { path: '/DS', component: detalleServicios },
      { path: '/UA', component: UsuariosAdmin },
      { path: '/ServiciosFisicos', component: detalleServiciosFisicos }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Middleware para verificar la autenticación y roles antes de cada navegación
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.checkAuth() // Verifica el token y carga el estado del usuario

  const isAuthenticated = !!authStore.token
  const userRole = authStore.user?.id_rol

  console.log('Token:', authStore.token)
  console.log('User Role:', userRole)

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.role && to.meta.role !== userRole) {
    next('/login') // O redirige a otra página adecuada
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (to.meta.requiresAuth) {
    history.pushState(null, null, location.href)
  }
})

export default router
