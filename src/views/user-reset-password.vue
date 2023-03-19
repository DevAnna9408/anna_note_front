<template>
  <div id="user-login">
    <div
      class="user__login__container"
    >
      <div class="form-wrapper">
          <Form @submit="_findPassword">
            <div class="form-item">
              <input-text
                :readonly="userStep.firstAnswer"
                v-model="user.userId"
                name="아이디"
                :label="'아이디'"
                :type="'text'"
                :rules="{
              required: true
              }"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                :readonly="userStep.firstAnswer"
                v-model="user.email"
                name="email"
                :label="'이메일'"
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
                >이메일 확인
                </button>
              </div>
            </div>
          </Form>
          <Form
            v-if="userStep.firstAnswer"
            @submit="_answerPassword">
            <div class="form-item">
              <input-text
                v-model="userQuestion.question"
                name="비밀번호 찾기 질문"
                :label="'비밀번호 찾기 질문'"
                :type="'text'"
                readonly="true"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                :readonly="userStep.secondAnswer"
                v-model="userQuestion.answer"
                name="답변"
                :label="'답변'"
                :type="'text'"
                :rules="{
              required: true
              }"
              ></input-text>
            </div>
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
                  class="basic__button"
                  type="submit"
                >답변 확인
                </button>
              </div>
            </div>
          </Form>
          <Form
            v-if="userStep.secondAnswer"
            @submit="_changePassword">
            <div class="form-item">
              <input-text
                v-model="user.password"
                name="password"
                :label="'새로운 비밀번호'"
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
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
                  class="basic__button"
                  type="submit"
                >비밀번호 변경
                </button>
              </div>
            </div>
          </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import sweetAlert from '@/wrapper/sweet-alert'
import { ajaxWithoutLoading } from '@/wrapper/ajax'
export default {
  name: 'reset-password',
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
    },
    userStep: {
      firstAnswer: false,
      secondAnswer: false
    }
  }),
  methods: {
    ...mapActions({
      login: 'users/login',
      register: 'users/register'
    }),
    _signUp () {
      if (this.user.password !== this.user.confirmPassword) {
        sweetAlert.noIcon('비밀번호가 일치하지 않습니다.', '확인')
      } else if (this.userQuestion.question.trim() === '' || this.userQuestion.answer.trim() === '') {
        sweetAlert.noIcon('본인 확인 질문과 답변을 작성 해 주세요.', '확인')
      } else {
        this.register({
          email: this.user.email,
          password: this.user.password,
          question: this.userQuestion.question,
          answer: this.userQuestion.answer
        }).then(() => {
          sweetAlert.noIcon('회원가입 완료되었습니다.', '확인')
          this.$router.push({ name: 'user-login' })
        })
      }
    },
    _findPassword () {
      ajaxWithoutLoading('GET', '/api/find-password', null, null, {
        email: this.user.email,
        userId: this.user.userId
      }).then(_res => {
        if (_res !== '') {
          this.userStep.firstAnswer = true
          this.userQuestion.question = _res
        } else {
          sweetAlert.noIcon('아이디와 이메일이 일치하는 회원이 존재하지 않습니다.', '확인')
        }
      })
    },
    _answerPassword () {
      ajaxWithoutLoading('POST', '/api/answer-password', null, null, {
        userId: this.user.userId,
        email: this.user.email,
        answer: this.userQuestion.answer
      }).then(_res => {
        if (_res) this.userStep.secondAnswer = true
        else sweetAlert.noIcon('본인 확인 질문에 대한 답변이 일치하지 않습니다.', '확인')
      })
    },
    _changePassword () {
      if (this.user.password !== this.user.confirmPassword) {
        sweetAlert.noIcon('비밀번호가 일치하지 않습니다.', '확인')
      } else {
        ajaxWithoutLoading('PUT', `/api/change-password/${this.user.userId}`, {
          newPassword: this.user.password
        }).then(() => {
          sweetAlert.noIcon('새로운 비밀번호로 변경되었습니다.', '확인')
          this.$router.push({ name: 'user-login' })
        })
      }
    }
  }
}
</script>
