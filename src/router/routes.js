function loadView (view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ '@/views/' + view + '.vue')
}

function loadLayout (layout) {
  return () =>
    import('@/components/layout/' + layout + '.vue')
}

// function loadViewHeaderFooterSide (view) {
//   return {
//     default: loadView(view),
//     sidebar: loadLayout('main-sidebar'),
//     footer: loadLayout('main-footer'),
//     header: loadLayout('main-navbar')
//   }
// }

function homeMain (view) {
  return {
    default: loadView(view)
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
    components: homeMain('home-main'),
    meta: {
      title: '다정한 노트'
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
        path: 'add-post',
        name: 'user-add-post',
        component: loadView('user-add-post'),
        meta: {
          title: '걱정 메모'
        }
      },
      {
        path: 'worry-board',
        name: 'user-worry-board',
        component: loadView('user-worry-board'),
        meta: {
          title: '걱정 노트'
        }
      },
      {
        path: 'dream-board',
        name: 'user-dream-board',
        component: loadView('user-dream-board'),
        meta: {
          title: '다짐 노트'
        }
      },
      {
        path: 'graph',
        name: 'user-graph',
        component: loadView('user-graph'),
        meta: {
          title: '통계'
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
