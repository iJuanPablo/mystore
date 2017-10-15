import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from './auth-guard'

import Home from '@/components/Home'
import Stores from '@/components/Store/Stores'
import CreateStore from '@/components/Store/CreateStore'
import Store from '@/components/Store/Store'
import Products from '@/components/Product/Products'
import CreateProduct from '@/components/Product/CreateProduct'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'

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
      path: '/stores',
      name: 'Stores',
      component: Stores,
      beforeEnter: AuthGuard
    },
    {
      path: '/store/new',
      name: 'CreateStore',
      component: CreateStore,
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
    },
    {
      path: '/product/new',
      name: 'CreateProduct',
      component: CreateProduct,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
