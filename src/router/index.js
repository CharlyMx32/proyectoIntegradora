// Generales lineas
import { createRouter, createWebHistory } from 'vue-router'
import Global from '@/GlobalHome.vue'
import Login from '@/views/LoginFrom.vue'
import Register from '@/views/RegistroFrom.vue'

// Charly lineas
import DashBoardRecepcionista from '@/views/Recepcionista/DashBoardRecepcionista.vue'
import DashBoardAdmin from '@/views/Admin/DashBoardAdmin.vue'
import UsuariosAdmin from '@/views/Admin/UsuariosAdmin.vue'
import statusNegocio from '@/views/Admin/statusNegocio.vue'
import registroUsuarios from '@/views/Admin/registroUsuarios.vue'
import detalleServicios from '@/views/Admin/detalleServiciosLinea.vue'
import detalleServiciosFisicos from '@/views/Admin/detalleServiciosFisicos.vue'

// Tecnico lineas
import DashBoardTecnico from '@/views/Tecnico/DashBoardTecnico.vue'
import Tareas from '@/views/Tecnico/TareasFrom.vue'

// Ochoa lineas
import DashBoardCliente from '@/views/Cliente/DashBoardCliente.vue'
import AgendarCita from '@/views/Cliente/AgendarCita.vue'
import PrincipalCliente from '@/views/Cliente/PrincipalCliente.vue'
import PedidoProducto from '@/views/Cliente/PedidoProducto.vue'

// mar lineas
import paginaPrincipal from '@/views/Recepcionista/PaginaPrincipal.vue'
import agendarCitas from '@/views/Recepcionista/AgendarCitas.vue'
import asignarCita from '@/views/Recepcionista/AsignarCita.vue'
import citasLinea from '@/views/Recepcionista/CitasLinea.vue'
import asistenciaFisico from '@/views/Recepcionista/AsistenciaFisico.vue'
import CitasFisico from '@/views/Recepcionista/CitasFisico.vue'
import asistenciaLinea from '@/views/Recepcionista/AsistenciaLinea.vue'

const routes = [
  { path: '/', redirect: '/Global' },
  { path: '/Global', name: 'Global', component: Global },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/Cliente', name: 'Cliente', component: DashBoardCliente },
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
      },
      {
        path: '/ServiciosFisicos',
        component: detalleServiciosFisicos
      }
    ]
  },
  {
    path: '/Tecnico',
    component: DashBoardTecnico
  },
  {
    path: '/TAS',
    component: Tareas
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
      },
      {
        path: '/Pedir',
        component: PedidoProducto
      }
    ]
  },
  {
    path: '/Recepcionista',
    component: DashBoardRecepcionista,
    children: [
      {
        path: '/PP',
        component: paginaPrincipal
      },
      {
        path: '',
        redirect: '/PP'
      },
      {
        path: '/CPF',
        component: asistenciaFisico
      },
      {
        path: '/CPL',
        component: asistenciaLinea
      },
      {
        path: '/AC',
        component: agendarCitas
      },
      {
        path: '/ASC',
        component: asignarCita
      },
      {
        path: '/CL',
        component: citasLinea
      },
      {
        path: '/CF',
        component: CitasFisico
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
