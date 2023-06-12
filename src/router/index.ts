import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const createVueRouter = (base: string) => {
  const history = createWebHistory()
  const router = createRouter({
    history,
    routes: [
      {
        path: base,
        name: 'home',
        component: HomeView
      },
      {
        path: `${base}about`,
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue')
      }
    ]
  })
  return {
    router,
    cleanup: () => history.destroy()
  }
}

export default createVueRouter
