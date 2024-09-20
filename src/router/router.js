import { createRouter, createWebHashHistory } from 'vue-router';
import DashboardComponent from '../popup/DashboardComponent.vue'
import TabHistoryComponent from '../popup/TabHistoryComponent.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: '/tab-history',
    name: 'TabHistory',
    component: TabHistoryComponent
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})




export default router
