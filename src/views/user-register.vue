<template>
  <div id="user-login">
    <div
      class="user__login__container"
    >
      <div class="form-wrapper">
          <Form @submit="_signUp">
            <div class="form-item">
              <input-text
                v-model="user.email"
                name="email"
                :label="'이메일'"
                input-type="text"
                :rules="{
              required: true,
              regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
              }"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                v-model="user.userId"
                name="userId"
                :label="'아이디'"
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
                :label="'비밀번호'"
                :type="'password'"
                :rules="{
              required: true,
              max: 16,
              regex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/
            }"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                v-model="user.confirmPassword"
                name="비밀번호 확인"
                :label="'비밀번호 확인'"
                :type="'password'"
                :rules="{
              required: true,
              max: 16,
              regex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/
            }"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                v-model="userQuestion.question"
                name="비밀번호 찾기 질문"
                :label="'비밀번호 찾기 질문'"
                :type="'text'"
                :rules="{
              required: true
              }"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                v-model="userQuestion.answer"
                name="비밀번호 찾기 답변"
                :label="'비밀번호 찾기 답변'"
                :type="'text'"
                :rules="{
              required: true
              }"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
                  class="basic__button"
                  type="submit"
                >회원가입
                </button>
              </div>
            </div>
          </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'pinia'
import sweetAlert from '@/wrapper/sweet-alert'
import { usersStore } from '@/store/users'
export default {
  name: 'user-register',
  data: () => ({
    user: {
      email: '',
      userId: '',
      password: '',
      confirmPassword: ''
    },
    userQuestion: {
      question: '',
      answer: ''
    }
  }),
  methods: {
    ...mapActions(usersStore, ['register']),
    _signUp () {
      if (this.user.password !== this.user.confirmPassword) {
        sweetAlert.noIcon('비밀번호가 일치하지 않습니다.', '확인')
      } else {
        this.register({
          userId: this.user.userId,
          password: this.user.password,
          email: this.user.email,
          question: this.userQuestion.question,
          answer: this.userQuestion.answer
        }).then(() => {
          sweetAlert.noIcon('회원가입 완료되었습니다', '확인')
          this.$router.push({ name: 'user-login' })
        })
      }
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
