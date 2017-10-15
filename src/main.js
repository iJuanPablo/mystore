import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

import { store } from './store'
import * as firebase from 'firebase'

import AlertCmp from './components/Shared/Alert.vue'
import EditStoreDetailsDialog from './components/Store/Edit/EditStoreDetailsDialog'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-store-details-dialog', EditStoreDetailsDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCa-ZMY2LI3bTM3KQrklZPkdaNkPy8WT9M',
      authDomain: 'mystore-20d4b.firebaseapp.com',
      databaseURL: 'https://mystore-20d4b.firebaseio.com',
      projectId: 'mystore-20d4b',
      storageBucket: 'gs://mystore-20d4b.appspot.com'
    })
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
        }
      }
    )
    this.$store.dispatch('loadStores')
  }
})
