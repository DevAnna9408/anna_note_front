import { Perimeter } from 'vue-kindergarten'
import typeUtil from '@/utils/type'
export default class BasePerimeter extends Perimeter {
  isLogin () {
    return !typeUtil.isNullOrUndefined(this.child.roles)
  }

  isTargetRole (_targetRole) {
    return typeUtil.isNullOrUndefined(this.child.roles)
      ? false
      : this.child.roles.some((role) => {
        return role.type === _targetRole
      })
  }

  isAdminRole () {
    return this.isTargetRole('ROLE_SYS_ADMIN')
  }

  isUserRole () {
    return this.isTargetRole('ROLE_USER')
  }

  isCreator (creId) {
    return this.child.userId === creId
  }
}
