import * as firebase from 'firebase'

export default {
  state: {
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredStores: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registerdStores: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registerdStores: []
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().refs('/users/' + getters.user.id + '/stores/').once('value')
        .then(
          data => {
            const dataPairs = data.val()
            let stores = []
            let swappedPairs = {}
            for (let key in dataPairs) {
              stores.push(dataPairs[key])
              swappedPairs[dataPairs[key]] = key
            }
            const updatedUser = {
              id: getters.user.id,
              stores: stores,
              storesFbKeys: swappedPairs
            }
            commit('setLoading', false)
            commit('setUser', updatedUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            console.log(error)
          }
        )
    },
    logout ({commit}) {
      firebase.auth().logout
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
