import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'itemsView',
      component: () => import('../views/ItemsView.vue')
    },
    {
      path: '/itemDetail/:id',
      name: 'itemDetail',
      component: () => import('../views/ItemDetail.vue')
    }
  ]
})

export default router
