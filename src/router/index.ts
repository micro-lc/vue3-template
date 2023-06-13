import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getBasePath } from '@/basePath'

const createVueRouter = () => {
  const paths = getBasePath()
  const history = createWebHistory(paths.documentBase)
  console.log({paths})
  const router = createRouter({
    history,
    routes: [
      {
        path: paths.parcelBase,
        name: 'home',
        component: HomeView
      },
      {
        path: `${paths.parcelBase}about`,
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
