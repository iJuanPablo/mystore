// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

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
      template: '<App/>',
      components: { App }
    })
  }
})
