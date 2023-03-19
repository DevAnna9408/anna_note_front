import { useCookies } from 'vue3-cookies'
import { defineStore } from 'pinia'
const { cookies } = useCookies()

export const i18nStore = defineStore('i18n', {
  state: () => ({
    locale: cookies.get('locale') || process.env.VUE_APP_I18N_LOCALE
  }),
  getters: {
    currentLocale () { return this.locale }
  },
  actions: {
    setlocale (_lang) {
      cookies.set('locale', _lang)
      this.locale = _lang
    }
  }
})
