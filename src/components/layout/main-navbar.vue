<template>
  <div class="header-container">
    <div class="nav-brand">
      <router-link :to="{ name: 'home-main' }">
        Home
      </router-link>
    </div>
    <div class="nav-items">
      <ul class="nav-bar-container">
        <li v-if="isUser">
          <a @click="logout()" class="btn btn-primary small">로그아웃</a>
        </li>
        <li v-else>
          <a @click="$router.push({name: 'user-login'}).catch (err => {})">로그인</a>
        </li>
        <li>
        </li >
      </ul>
    </div>
  </div>
</template>

<script>
import { usersStore } from '@/store/users'
import { mapState, mapActions } from 'pinia'
export default {
  name: 'main-navbar',
  computed: {
    ...mapState(usersStore, ['isUser'])
  },
  methods: {
    ...mapActions(usersStore, ['logout'])
  }
}
</script>
