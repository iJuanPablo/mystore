import * as firebase from 'firebase'

export default {
  state: {
    stores: []
  },
  mutations: {
    setStores (state, payload) {
      state.stores = payload
    },
    createStore (state, payload) {
      state.stores.push(payload)
    },
    updateStore (state, payload) {
      const store = state.stores.find(
        store => {
          return store.id === payload.id
        }
      )
      if (payload.title) {
        store.title = payload.title
      }
      if (payload.description) {
        store.description = payload.description
      }
      if (payload.imageUrl) {
        store.imageUrl = payload.imageUrl
      }
    }
  },
  actions: {
    loadStores ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('stores').once('value')
        .then(
          (data) => {
            const stores = []
            const obj = data.val()
            for (let key in obj) {
              stores.push({
                id: key,
                title: obj[key].title,
                description: obj[key].description,
                imageUrl: obj[key].imageUrl,
                creatorId: obj[key].creatorId
              })
            }
            commit('setStores', stores)
            commit('setLoading', false)
          }
        )
        .catch(
          (error) => {
            commit('setError', error)
            commit('setLoading', false)
          }
        )
    },
    createStore ({commit, getters}, payload) {
      commit('setLoading', true)
      const store = {
        title: payload.title,
        description: payload.description,
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('stores').push(store)
        .then(
          data => {
            key = data.key
            return key
          }
        )
        .then(
          key => {
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref('stores/' + key + '.' + ext).put(payload.image)
          }
        )
        .then(
          fileData => {
            imageUrl = fileData.metadata.downloadURLs[0]
            return firebase.database().ref('stores').child(key).update({
              imageUrl: imageUrl
            })
          }
        )
        .then(
          () => {
            commit('setLoading', false)
            commit('createStore', {
              ...store,
              imageUrl: imageUrl,
              id: key
            })
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    updateStoreData ({commit, dispatch}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      firebase.database().ref('stores').child(payload.id).update(updateObj)
        .then(
          () => {
            if (payload.image) {
              dispatch('uploadImage', payload)
            } else {
              commit('setLoading', false)
            }
            commit('updateStore', payload)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    uploadImage ({commit}, payload) {
      commit('setLoading', true)
      const filename = payload.image.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      let imageUrl
      firebase.storage().ref('stores/' + payload.id + '.' + ext).put(payload.image)
        .then(
          fileData => {
            imageUrl = fileData.metadata.downloadURLs[0]
            return firebase.database().ref('stores').child(payload.id).update({
              imageUrl: imageUrl
            })
          }
        )
        .then(
          () => {
            commit('setLoading', false)
            commit('updateStore', {
              id: payload.id,
              imageUrl: imageUrl
            })
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    }
  },
  getters: {
    stores (state) {
      return state.stores.sort((storeA, storeB) => {
        return storeA.id > storeB.id
      })
    },
    storeById (state) {
      return (storeId) => {
        return state.stores.find((store) => {
          return store.id === storeId
        })
      }
    }
  }
}
