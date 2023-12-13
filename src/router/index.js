import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/Default.vue'
import Unauthorize from '../views/401-Unauthorize.vue'
import NotFound from '../views/404-Not-Found.vue'
import { useAuthStore } from '../stores/auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_MY_BASE),
  routes: [
    {
      path: '/',
      name: '',
      component: Layout,
      meta: { //COLOCAR ESTA PROPIEDAD PARA PROTEGER RUTA 
        auth : true
      },
      children : [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home.vue')
        },
        {
          path: 'test',
          name: 'Test',
          component: () => import('../views/Test.vue')
        }
        
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/401-Unauthorize',
      name: '401-Unauthorize',
      component: Unauthorize,
    },
    {
      //MANEJA TODAS LAS PAGINAS QUE NO EXISTEN Y LA REDIRIJE AL 404 NOT FOUND
      path: '/:catchAll(.*)',
      component: NotFound,
    }
  ]
})


router.beforeEach(async (to, from, next) => {

  const auth = useAuthStore()
  const isAuthenticated = localStorage.getItem('nit');
  const protectedRoutes = to.matched.some(route => route.meta.auth)

  if (protectedRoutes) {

      try {

          if (await auth.validateNit(isAuthenticated) ) {

              next()

          } else {

              next('/401')
          }

      } catch (error) {

          console.error('Error al validar el nit:', error)

          next('/401')
      }

  } else {

      next()
  }

})

export default router
