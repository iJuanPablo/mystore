import * as firebase from 'firebase'

export default {
  state: {
    stores: [
      {
        imageUrl: 'http://99only.t324.com/wp-content/uploads/2014/05/store-807x615.jpg',
        id: 'idStore1',
        title: 'Store 1',
        description: 'Description store 1'
      },
      {
        imageUrl: 'http://www.placesnearmenow.com/wp-content/uploads/2017/02/dollar-stores-near-me-591x400.jpg',
        id: 'idStore2',
        title: 'Store 2',
        description: 'Description store 2'
      }
    ]
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
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createStore ({commit, getters}, payload) {
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
            commit('createStore', {
              ...store,
              imageUrl: imageUrl,
              id: key
            })
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    updateStoreData ({commit}, payload) {
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
            commit('setLoading', false)
            commit('updateStore', payload)
          }
        )
        .catch(
          error => {
            console.log(error)
            commit('setLoading', false)
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
    store (state) {
      return (storeId) => {
        return state.stores.find((store) => {
          return store.id === storeId
        })
      }
    }
  }
}
