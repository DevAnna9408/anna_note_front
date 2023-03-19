<template>
  <div id="user-login">
    <div
      class="user__login__container"
    >
      <div class="form-wrapper">
          <Form @submit="_login">
            <div class="form-item">
              <input-text
                v-model="user.userId"
                name="userId"
                label="아이디"
                :type="'text'"
                :rules="{
              required: true,
              regex: /^[a-zA-Z0-9]*$/
              }"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                v-model="user.password"
                name="password"
                label="비밀번호"
                :type="'password'"
                :rules="{
              required: true,
              max: 16,
              regex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/
            }"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
                  class="basic__button"
                  type="submit"
                >로그인
                </button>
              </div>
            </div>
          </Form>
        <div class="form-footer">
          <p>
            <a
              @click="_signUp"
            >회원가입</a></p>
          <p><a
            @click="_resetPassword"
          >비밀번호를 모를 때 & <br /> 계정 잠금 해제시 클릭 :)</a></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'pinia'
import { usersStore } from '@/store/users'
export default {
  name: 'user-login',
  data: () => ({
    user: {
      userId: '',
      password: ''
    },
    userQuestion: {
      question: '',
      answer: ''
    }
  }),
  methods: {
    ...mapActions(usersStore, ['login']),
    _resetPassword () {
      this.$router.push({ name: 'reset-password' })
    },
    _signUp () {
      this.$router.push({ name: 'register' })
    },
    _login () {
      this.login({
        userId: this.user.userId,
        password: this.user.password
      })
        .then(() => {
          this.$router.push({ name: 'user-today-dinner' })
        }).catch(() => {
          this.$router.push({ name: 'user-login' })
        })
    }
  }
}
</script>

<style scoped>
.btn__horizontal__wrapper {
  margin: 5px;
}
.form-item {
  margin-bottom: 0.75em;
}
</style>
