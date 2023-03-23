<template>
  <div id="home-main" class="admin-container">
    <div
      style="text-align: center;
             margin-top: 100px;
             margin-bottom: 20px;
             color: #000000;
             font-size: 15px;">
      로고를 클릭해서 시작!
    </div>
    <img
      @click="_tokenCheck"
      alt="logo"
      src="@/assets/img/logo.jpg">
    <div
      style="text-align: center;
             margin-top: 20px;
             margin-bottom: 20px;
             color: #000000;
             font-size: 15px;">
      걱정의 40%는
      <br />
      절대 현실로 일어나지 않는다.
      <br />
      <br />
      걱정의 30%는
      <br />
      이미 일어난 일에 대한 것이다.
      <br />
      <br />
      걱정의 22%는
      <br />
      사소한 고민들이다.
      <br />
      <br />
      걱정의 4%는
      <br />
      우리 힘으로 어쩔 도리가 없는 일에 대한 것이다.
      <br />
      <br />
      나머지 4%만이 우리가 대처할 수 있는 진짜 사건이다.
      <br />
      <br />
      - 어니 젤린스키 -
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
      else this.$router.push({ name: 'user-worry-board' })
    }
  }
}
</script>
