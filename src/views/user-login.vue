<template>
  <div id="user-login" class="single-small-box bg-grey base-height">
    <div class="container">
      <div class="small-box">
        <div class="page-title-and-information">
          <div class="preset"></div>
          <div class="custom">
            <img
              id="circle-logo"
              src="@/assets/img/logo.jpg"
            />
            <h3>User Login</h3>
          </div>
        </div>
        <Form @submit="_login">
          <input-text
            name="userId"
            :rules="{ required: true }"
            v-model="userId"
            label="아이디"
            type="textArea"
          />
          <input-text
            name="password"
            type="password"
            :rules="{
              required: true,
              max: 16,
              regex:
                /(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,})(?=.*[a-z]{1,})(?=.*[A-Z]{1,}).{8,16}$/,
            }"
            v-model="password"
            label="비밀번호"
          />
          <button class="btn btn-primary">{{ t("login_label") }}</button>
        </Form>
        <button @click="goToAgree">
          {{ t("register_btn") }}
        </button>
        <div>
      </div>
      </div>

    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { mapActions } from 'pinia'
import { usersStore } from '@/store/users'
import { useRouter } from 'vue-router'
export default {
  name: 'user-login',
  setup () {
    const { t } = useI18n({})
    const router = useRouter()
    const goToAgree = () => {
      router.push({ name: 'user-agree' })
    }
    return {
      t,
      goToAgree
    }
  },
  data () {
    return {
      userId: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(usersStore, ['login']),
    _login () {
      const userId = this.userId
      const password = this.password
      this.login({ userId, password })
        .then(() => {
          this.$router.push({ name: 'home-main' })
        })
    }
  }
}
</script>
<i18n>
{
  "en": {
    "login_label": "login",
    "register_btn": "sign-up"
  },
  "ko": {
    "login_label": "로그인",
    "register_btn": "회원가입"
  }
}
</i18n>

<style scoped></style>
