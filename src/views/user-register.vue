<template>
  <div id="user-register" class="single-small-box bg-grey base-height">
    <div class="container">
      <div class="small-box">
        <h2>User Register</h2>
        <Form @submit="register" v-slot="formMeta">
          <div class="form-elements">
              <div class="row">
                <div class="col col-6">
                  <div class="input-title">
                    {{ $t('attributes.userId') }}
                    <span class="required">{{ $t('user.require') }}</span>
                  </div>
                  <div class="registration-input">
                    <input-text
                      v-model="userId"
                      name="userId"
                      v-model:inputFocus="userIdFocus"
                     :rules="{ required: true, max: 20, regex: /^[a-z0-9+]{5,20}$/ }"
                      error-msg-class="errors-msg"
                    />
                    <h6 class="error-if-exist" v-if="!userIdFocus.isUse">{{ $t("user.using_id") }}</h6>
                  </div>
                </div>
                <div class="col col-6">
                  <div class="input-title">
                    {{ $t('attributes.email') }}
                    <span class="required">{{ $t('user.require') }}</span>
                  </div>
                  <div class="registration-input">
                    <input-text
                      v-model="email"
                      name="email"
                      v-model:inputFocus="emailFocus"
                      rules="required|email|max:100"
                      error-msg-class="errors-msg"
                    />
                    <h6 class="error-if-exist" v-if="!emailFocus.isUse">{{ $t("user.using_email") }}</h6>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col col-6">
                  <div class="input-title">
                    {{ $t('attributes.name') }}
                    <span class="required">{{ $t('user.require') }}</span>
                    <input-text
                      v-model="name"
                      name="name"
                      rules="required|max:20"
                      error-msg-class="errors-msg"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col col-6">
                  <div class="input-title">
                    {{ $t('attributes.password') }}
                    <span class="required">{{ $t('user.require') }}</span>
                  </div>
                  <input-text
                    v-model="password"
                    name="password"
                    error-msg-class="errors-msg pre-line"
                    :rules="{ required: true, max: 16, regex: /(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,})(?=.*[a-z]{1,})(?=.*[A-Z]{1,}).{8,16}$/ }"
                    type="password"
                  ></input-text>
                </div>
                <div class="col col-6">
                  <div class="input-title">
                    {{ $t('attributes.password_confirmation') }}
                    <span class="required">{{ $t('user.require') }}</span>
                  </div>
                  <input-text
                    v-model="passwordConfirm"
                    name="password_confirmation"
                    error-msg-class="errors-msg pre-line"
                    rules="required|confirmed:@password"
                    type="password"
                  ></input-text>
                </div>
              </div>
              <div class="row btn-set">
                <div class="col col-12">
                  <button type="submit" class="btn gradient-btn" :disabled="!formMeta.meta.valid">{{ $t("user.enrollment") }}</button>
                </div>
              </div>
            </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usersStore } from '@/store/users'
import ajax from '@/wrapper/ajax.js'

export default {
  name: 'user-register',
  setup () {
    const router = useRouter()
    const userId = ref(null)
    const password = ref(null)
    const email = ref(null)
    const name = ref(null)
    const users = usersStore()
    const register = () =>
      users.register({
        userId: userId.value,
        password: password.value,
        email: email.value,
        name: name.value,
        role: 'ROLE_USER'
      })
        .then(() => {
          router.push({ name: 'home-main' })
        })
    return {
      userId,
      password,
      register,
      router,
      email,
      name
    }
  },
  watch: {
    async 'userIdFocus.focused' (newVal) {
      if (!newVal && this.userId) {
        this.userIdFocus.isUse = await this._checkDuplicate(
          'userId',
          this.userId
        )
      } else if (newVal) {
        this.userIdFocus.isUse = true
      }
    },
    async 'emailFocus.focused' (newVal) {
      if (!newVal && this.email) {
        this.emailFocus.isUse = await this._checkDuplicate('email', this.email)
      } else if (newVal) {
        this.emailFocus.isUse = true
      }
    }
  },
  data () {
    return {
      passwordConfirm: '',
      userIdFocus: {
        focused: false,
        isUse: true
      },
      emailFocus: {
        focused: false,
        isUse: true
      }
    }
  },
  methods: {
    _checkDuplicate (type, value) {
      return new Promise((resolve, reject) => {
        ajax('GET', '/api/sign-up/check', null, null, { type: type, value: value }).then(
          _data => {
            resolve(_data)
          }
        )
      })
    }
  }
}
</script>
<i18n>
{
  "en": {
    "registerLabel" :"Enter your user information"
  },
  "ko": {
    "registerLabel" :"회원 정보 입력"
  }
}
</i18n>
<style>
</style>
<style scoped>
</style>
<style lang="scss">
</style>
