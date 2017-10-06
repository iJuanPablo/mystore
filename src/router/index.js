import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/public/Home'
import Features from '@/components/public/Features'
import Pricing from '@/components/public/Pricing'
import Auth from '@/components/authentication/Auth'

import Dashboard from '@/components/dashboard/Dashboard'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/features',
      name: 'Features',
      component: Features
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: Pricing
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('auth')
  else if (!requiresAuth && currentUser) next('dashboard')
  else next()
})

export default router
