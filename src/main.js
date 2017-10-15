import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

import { store } from './store'
import * as firebase from 'firebase'
import * as firebaseConfig from './utils/firebaseConfig'

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
    var url = document.URL.split('/')[2]
    if (url.indexOf('dev') !== -1 || url.indexOf('localhost') !== -1) {
      firebase.initializeApp(firebaseConfig.configDev)
    } else if (url.indexOf('staging') !== -1) {
      firebase.initializeApp(firebaseConfig.configStaging)
    } else {
      firebase.initializeApp(firebaseConfig.configProd)
    }
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
