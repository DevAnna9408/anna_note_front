import { defineStore } from 'pinia'

export const errorsStore = defineStore('errors', {
  state: () => ({
    globalErrors: null // 전역 처리에러
  }),
  getters: {
    isGlobalError: (state) => Boolean(state.globalErrors)
  },
  actions: {
    setGlobalError (_error) {
      this.$patch((state) => {
        state.globalErrors = {
          ..._error,
          message: 'ERROR ALERT 다시 시도해 주세요 please try again'
        }
      })
    },
    removeGlobalError () {
      this.globalErrors = null
    },
    populateErrors (_error) {
      this.setGlobalError(_error)
      setTimeout(() => this.removeGlobalError(), 4000) // 클릭이벤트시 remove 처리 추가
    }
  }
})
