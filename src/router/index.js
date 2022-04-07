import { createRouter, createWebHistory } from 'vue-router'
// import LoginView from '../views/auth/LoginView.vue'
// import SingUpView from '../views/auth/SignUpView.vue'
// import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'

import nhost from '@/nhost'
console.log("route, isAuthenticated",nhost.auth.isAuthenticated())
//console.log("route, isLoading",nhost.auth.isLoading())

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('../views/TimelineView.vue')
      // component: AboutView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
      // component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/LoginView.vue')
      // component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (signup.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/SignUpView.vue')
      // component: SingUpView
    },
  ]
})

router.beforeEach(async (to, from) => {

  // const isAuthenticated = await nhost.auth.isAuthenticatedAsync()
  // console.log("eeeeeeeeeeeeeee" , isAuthenticated)
  // // make sure the user is authenticated
  // // ❗️ Avoid an infinite redirect

  // if (!isAuthenticated && to.name === 'signup') {
  //   // redirect the user to the login page
  //   // return { name: 'signup' }
  //   return 
  // }

  // if (!isAuthenticated && to.name !== 'login') {
  //   // redirect the user to the login page
  //   return { name: 'login' }
  // }

})

export default router
