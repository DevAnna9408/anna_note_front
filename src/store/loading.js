import {
  defineStore
} from 'pinia'

export const loadingStore = defineStore('loading', {
  state: () => ({
    loading: false
  }),
  actions: {
    setLoading (payload) {
      this.loading = payload
    }
  }
})
