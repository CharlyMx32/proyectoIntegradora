import { createRouter, createWebHistory } from 'vue-router'
import LoginFrom from '@/views/LoginFrom.vue'
import DashboardCliente from '@/views/Cliente/DashBoardCliente.vue'
import DashboardTecnico from '@/views/Tecnico/DashBoardTecnico.vue'
import DashboardRecepcionista from '@/views/Recepcionista/DashBoardRecepcionista.vue'
import DashboardAdmin from '@/views/Admin/DashBoardAdmin.vue'

const routes = [
  // { path: '/', redirect: '/cliente/dashboard' }, // Redirige a la vista de cliente por defecto
  { path: '/login', component: LoginFrom },
  { path: '/cliente/dashboard', component: DashboardCliente },
  { path: '/tecnico/dashboard', component: DashboardTecnico },
  { path: '/recepcionista/dashboard', component: DashboardRecepcionista },
  { path: '/admin/dashboard', component: DashboardAdmin }
  // Agrega más rutas según sea necesario
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
