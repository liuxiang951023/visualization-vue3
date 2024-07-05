import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/projectOverview',
    children: [
      {
        path: '',
        name: 'projectOverview',
        component: () => import('../views/projectOverview/index.vue')
      },
      {
        path: 'resource-management',
        name: 'resourceManagement',
        component: () => import('../views/resourceManagement/index.vue')
      },
      {
        path: 'safety-quality',
        name: 'safetyQuality',
        component: () => import('../views/safetyQuality/index.vue')
      },
      {
        path: 'smart-party',
        name: 'smartParty',
        component: () => import('../views/smartParty/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
