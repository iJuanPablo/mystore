
export default {
  state: {
    loading: false,
    loadingImage: false,
    errorAlert: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setLoadingImage (state, payload) {
      state.loadingImage = payload
    },
    setError (state, payload) {
      state.errorAlert = payload
      console.log(state.errorAlert)
    },
    clearError (state) {
      state.errorAlert = null
    }
  },
  actions: {
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadingState (state) {
      return state.loading
    },
    loadingImageState (state) {
      return state.loadingImage
    },
    errorAlert (state) {
      return state.errorAlert
    }
  }
}
