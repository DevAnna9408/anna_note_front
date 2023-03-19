import { HeadGoverness } from 'vue-kindergarten'
import { usersStore } from '@/store/users'
export default class RoutePramGoverness extends HeadGoverness {
  guard (action, { to, next }) {
    next()
    const isUser = usersStore().isUser
    this.isAllowed(action, to.params.creId)
      ? next()
      : next({
        name: isUser ? 'home-main' : 'user-login'
      })
  }
}
