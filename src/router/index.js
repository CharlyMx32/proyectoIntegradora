// index.js (router)

import { createRouter, createWebHistory } from 'vue-router'
import Global from '@/GlobalHome.vue'
import Login from '@/views/LoginFrom.vue'
import Register from '@/views/RegistroFrom.vue'
import DashBoardAdmin from '@/views/Admin/DashBoardAdmin.vue'
import DashBoardCliente from '@/views/Cliente/DashBoardCliente.vue'
import DashBoardRecepcionista from '@/views/Recepcionista/DashBoardRecepcionista.vue'
import DashBoardTecnico from '@/views/Tecnico/DashBoardTecnico.vue'
import registroUsuarios from '@/views/Admin/registroUsuarios.vue'
import detalleServicios from '@/views/Admin/detalleServicios.vue'
import UsuariosAdmin from '@/views/Admin/UsuariosAdmin.vue'
import statusNegocio from '@/views/Admin/statusNegocio.vue'
import AgendarCita from '@/views/Cliente/AgendarCita.vue'
import PrincipalCliente from '@/views/Cliente/PrincipalCliente.vue'
import MisdetallesFrom from '@/views/Tecnico/MisdetallesFrom.vue'
import TareasFrom from '@/views/Tecnico/TareasFrom.vue'


const routes = [
  { path: '/', redirect: '/Global' },
  { path: '/Global', name: 'Global', component: Global },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/Recepcionista', name: 'Recepcionista', component: DashBoardRecepcionista },
  { path: '/Tecnico', name: 'Tecnico', component: DashBoardTecnico },
  {
    path: '/admin',
    component: DashBoardAdmin,
    children: [
      {
        path: '/RU',
        component: registroUsuarios
      },
      {
        path: '/DS',
        component: detalleServicios
      },
      {
        path: '/UA',
        component: UsuariosAdmin
      },
      {
        path: '/SN',
        component: statusNegocio
      }
    ]
  },
  {
    path: '/Cliente',
    component: DashBoardCliente,
    children: [
      {
        path: '/principal',
        component: PrincipalCliente
      },
      {
        path: '',
        redirect: '/principal'
      },
      {
        path: '/Agendar',
        component: AgendarCita
      }
    ]
  },
  {
    path: '/Tecnico',
    component: DashBoardTecnico,
    children: [
      {
        path: '/TAS',
        component: TareasFrom
      },
      {
        path: '/DES',
        component: MisdetallesFrom
      }

    ]
  }
]

// Crear el enrutador con history mode
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Middleware para verificar la autenticación y roles antes de cada navegación

export default router
