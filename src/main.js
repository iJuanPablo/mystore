// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import firebase from 'firebase'

import Vuex from 'vuex'
import store from './store'

import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(ElementUI)

Vue.config.lang = 'en'

// import enLocale from 'element-ui/lib/locale/lang/en'
// Vue.locale('en', enLocale)

// Initialize Firebase
let app
let config = {
  apiKey: 'AIzaSyCa-ZMY2LI3bTM3KQrklZPkdaNkPy8WT9M',
  authDomain: 'mystore-20d4b.firebaseapp.com',
  databaseURL: 'https://mystore-20d4b.firebaseio.com',
  projectId: 'mystore-20d4b',
  storageBucket: '',
  messagingSenderId: '682964669382'
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
  }
})
