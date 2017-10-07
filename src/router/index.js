import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/public/Home'
import Features from '@/components/public/Features'
import Pricing from '@/components/public/Pricing'

import Auth from '@/components/authentication/Auth'
import Settings from '@/components/authentication/Settings'

import Dashboard from '@/components/dashboard/Dashboard'
import Stores from '@/components/stores/Stores'
import Products from '@/components/products/Products'

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
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stores',
      name: 'Stores',
      component: Stores,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
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
