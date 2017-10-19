import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from './auth-guard'

import Home from '@/components/Home'

import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Profile from '@/components/User/Profile'

import Dashboard from '@/components/Dashboard/Dashboard'

import Stores from '@/components/Store/Stores'
import Store from '@/components/Store/Store'

import Products from '@/components/Product/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/stores',
      name: 'Stores',
      component: Stores,
      beforeEnter: AuthGuard
    },
    {
      path: '/store/:id',
      name: 'Store',
      component: Store,
      beforeEnter: AuthGuard,
      props: true
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
