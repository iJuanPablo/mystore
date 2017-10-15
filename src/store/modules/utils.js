
export default {
  state: {
    loading: false,
    errorAlert: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
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
    errorAlert (state) {
      return state.errorAlert
    }
  }
}
