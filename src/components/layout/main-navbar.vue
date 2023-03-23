<template>
  <div class="header-container">

    <div id="nav__menu" class="side__nav">
      <a class="close__btn" @click="_closeNav()">
        {{ userId }}
        &times;
      </a>
      <router-link
        :to="{ name: 'user-add-post' }"
        style="margin-top: 55px;"
        @click="_closeNav">
        걱정 메모
      </router-link>
      <router-link
        :to="{ name: 'user-worry-board' }"
        @click="_closeNav">
        걱정 노트
      </router-link>
      <router-link
        :to="{ name: 'user-dream-board' }"
        @click="_closeNav">
        다짐 노트
      </router-link>
      <router-link
        :to="{ name: 'user-graph' }"
        @click="_closeNav">
        통계
      </router-link>
      <a
        @click="_logout">로그아웃</a>
      <a @click="_deleteUser">회원탈퇴</a>
    </div>
    <div
      class="nav__title"
      @click="_openNav()">
      <span class="nav__title__inside">
        <i class="fa-solid fa-bars"
           style="margin-right: 10px;"
        />{{ $route.meta.title }}
      </span>
    </div>
  </div>
</template>

<script>
import { usersStore } from '@/store/users'
import { mapState, mapActions } from 'pinia'
import sweetAlert from '@/wrapper/sweet-alert'
import ajax from '@/wrapper/ajax'
// import ajax from '@/wrapper/ajax'
export default {
  name: 'main-navbar',
  data () {
    return {
      userId: ''
    }
  },
  computed: {
    ...mapState(usersStore, ['isUser', 'userCustomInfo'])
  },
  methods: {
    ...mapActions(usersStore, ['logout']),
    _openNav () {
      document.getElementById('nav__menu').style.height = '100%'
    },
    _closeNav () {
      document.getElementById('nav__menu').style.height = '0'
      window.scrollTo(0, 0)
    },
    _logout () {
      sweetAlert.question(null, '로그아웃 할까요?', '로그아웃', '아니오').then(con => {
        if (con.value) {
          this.logout()
          this.$router.push({ name: 'user-login' })
        }
      })
    },
    _deleteUser () {
      sweetAlert.question(null, '회원 탈퇴 하시겠어요? 데이터가 모두 삭제됩니다.', '탈퇴하기', '아니오').then(con => {
        if (con.value) {
          sweetAlert.question(null, '한번만 더 생각 해 보세요. 정말 회원탈퇴 하시겠어요?', '탈퇴하기', '아니오').then(con => {
            if (con.value) {
              ajax('DELETE', '/api/users', null, null, {
                userOid: this.userCustomInfo.userOid
              }).then(() => {
                this.logout()
                this.$router.push({ name: 'user-login' })
                sweetAlert.noIcon('모든 데이터가 삭제되었습니다. 그 동안 이용 해 주셔서 감사합니다 :)', '확인')
              })
            }
          })
        }
      })
    }
  },
  mounted () {
    // 이렇게 해야 렌더링 할 때 콘솔창에 에러가 나지 않음.
    this.userId = this.userCustomInfo.userId
  }
}
</script>
