import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { usersStore } from '@/store/users'
import * as perimeters from '@/kindergarten/perimeters'
import child from '@/kindergarten/child'
import { createSandbox } from 'vue-kindergarten'
import RouteGoverness from '@/kindergarten/governesses/RouteGoverness'
import typeUtil from '@/utils/type'
import { i18n } from '@/plugins/i18n'
const { t } = i18n.global

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to) => {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes
})

// title 설정하기(전체)
router.afterEach((to) => {
  document.title = t(to.meta.title)
})

router.beforeEach((to, from, next) => {
  let perimeter = null
  let Governess = null
  let action = null

  to.matched.some((routeRecord) => {
    if (!typeUtil.isNullOrUndefined(routeRecord.meta.perimeter)) {
      perimeter = perimeters[routeRecord.meta.perimeter]
      Governess = routeRecord.meta.governess || RouteGoverness
      action = routeRecord.meta.perimeterAction || 'read'
    }
  })
  if (perimeter) {
    const sandbox = createSandbox(child(usersStore()), {
      governess: new Governess(),
      perimeters: [perimeter]
    })
    sandbox.guard(action, {
      from,
      to,
      next
    })
  } else {
    next()
  }
})
export default router
