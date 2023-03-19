<template>
  <div id="home-main" class="admin-container">
    <img
      @click="_tokenCheck"
      alt="logo"
      src="@/assets/img/logo.jpg">
    <div
      style="text-align: center;
             margin-top: 20px;
             color: #000000;
             font-size: 15px;">
      로고를 클릭!
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { usersStore } from '@/store/users'

export default {
  name: 'home-main',
  computed: {
    ...mapState(usersStore, ['userCustomInfo'])
  },
  methods: {
    ...mapActions(usersStore, ['logout']),
    _tokenCheck () {
      if (this.userCustomInfo === undefined) this.$router.push({ name: 'user-login' })
      else this.$router.push({ name: 'user-today-dinner' })
    }
  }
}
</script>
