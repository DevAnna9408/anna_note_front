function loadView (view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ '@/views/' + view + '.vue')
}

function loadLayout (layout) {
  return () =>
    import('@/components/layout/' + layout + '.vue')
}

function loadViewHeaderFooterSide (view) {
  return {
    default: loadView(view),
    sidebar: loadLayout('main-sidebar'),
    footer: loadLayout('main-footer'),
    header: loadLayout('main-navbar')
  }
}

const parent = (parentName) => {
  return {
    default: {
      name: parentName,
      template: '<router-view></router-view>'
    },
    header: loadLayout('main-navbar'),
    footer: loadLayout('main-footer')
  }
}

// 라우트 대상 정의 (url추가시 여기에)
const routes = [
  {
    path: '/',
    name: 'home-main',
    components: loadViewHeaderFooterSide('home-main'),
    meta: {
      title: 'title.home'
    }
  },
  {
    path: '/user',
    name: 'user',
    components: parent('user'),
    children: [
      {
        path: 'login',
        name: 'user-login',
        component: loadView('user-login'),
        meta: {
          title: 'title.user.title'
        }
      },
      {
        path: 'register',
        name: 'user-register',
        component: loadView('user-register'),
        meta: {
          title: 'title.user.register'
        }
      },
      {
        path: 'agree',
        name: 'user-agree',
        component: loadView('user-agree'),
        meta: {
          title: 'title.user.register'
        }
      }
    ]
  }
]

routes.push({
  path: '/:catchAll(.*)',
  redirect: {
    name: 'home-main'
  }
})

export default routes
