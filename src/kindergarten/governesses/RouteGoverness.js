import { HeadGoverness } from 'vue-kindergarten'
import { usersStore } from '@/store/users'

export default class RouteGoverness extends HeadGoverness {
  guard (action, { next }) {
    const isUser = usersStore().isUser
    this.isAllowed(action)
      ? next()
      : next({
        name: isUser ? 'home-main' : 'user-login'
      })
  }
}
