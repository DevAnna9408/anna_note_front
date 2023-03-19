import { i18nStore } from '@/store/i18n'
import { createI18n } from 'vue-i18n'
import { localize } from '@vee-validate/i18n'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

function loadLocaleMessages () {
  const locales = require.context(
    '@/assets/lang/general',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )
  const messages = {}
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      const tmpMessages = messages[locale] || {}
      messages[locale] = Object.assign(tmpMessages, locales(key))
    }
  })
  return messages
}
export const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: cookies.get('locale') || process.env.VUE_APP_I18N_LOCALE, // set locale
  fallbackLocale: 'ko', // set fallback locale
  globalInjection: true,
  messages: loadLocaleMessages() // set locale messages
})

export const setLocale = (lang, meta) => {
  i18n.global.locale.value = lang
  localize(lang) // validation
  i18nStore().setlocale(lang)// vuex &cookies
  const { t } = i18n.global
  document.title = meta ? t(meta.title) : 'Anna'
}
