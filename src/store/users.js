import ajax from '@/wrapper/ajax'
import { useCookies } from 'vue3-cookies'
import { defineStore } from 'pinia'
const { cookies } = useCookies()

export const usersStore = defineStore('users', {
  state: () => ({
    accessToken: cookies.get('accessToken') || '',
    user: cookies.get('user') ? cookies.get('user') : {}
  }),
  getters: {
    authStatus: (_state) => _state.status,
    isUser: (_state) => Boolean(_state.accessToken) && Boolean(_state.user),
    isGuest: (_state) => !_state.accessToken,
    isAuthenticated: (_state) => Boolean(_state.accessToken),
    loggedInUser: (_state) => _state.user,
    loggedInAccessToken: (_state) => _state.accessToken,
    loggedInUserRoleType () { return this.user.roles },
    userId () {
      return this.user.userId
    }
  },
  actions: {
    setloginUser (accessToken, user) {
      this.$patch((state) => {
        state.accessToken = accessToken
        cookies.set('accessToken', accessToken)
        cookies.set('user', user)
        state.user = user
      })
    },
    login (_user) {
      return new Promise((resolve, reject) => {
        ajax('POST', '/api/sign-in', _user)
          .then((_data) => {
            const accessToken = _data.accessToken
            const _user = {}
            _user.userId = _data.userId
            _user.roles = _data.roles
            this.setloginUser(accessToken, _user)
            resolve(_data)
          })
          .catch((_err) => {
          // 쿠키 기한때문에 처리필요
            reject(_err)
          })
      })
    },
    register (_user) {
      return new Promise((resolve, reject) => {
        ajax('POST', '/api/sign-up', _user)
          .then(_data => {
            const accessToken = _data.accessToken
            const _user = {}
            _user.userId = _data.userId
            _user.role = _data.role
            this.setloginUser(accessToken, _user)
            resolve(_data)
          }).catch(_err => {
            reject(_err)
          })
      })
    },
    logout () {
      this.$patch((state) => {
        state.accessToken = null
        state.user = {}
      })
    }
  }

})
