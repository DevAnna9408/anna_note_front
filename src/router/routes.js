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
    path: '/login',
    name: 'user-login',
    component: loadView('user-login'),
    meta: {
      title: '로그인'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: loadView('user-register'),
    meta: {
      title: '회원가입'
    }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: loadView('user-reset-password'),
    meta: {
      title: '비밀번호 찾기 및 변경'
    }
  },
  {
    path: '/user',
    name: 'user',
    components: parent('user'),
    children: [
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
