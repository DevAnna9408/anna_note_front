import { defineRule, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import AllRules from '@vee-validate/rules'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ko from '@vee-validate/i18n/dist/locale/ko.json'
import { i18n } from '@/plugins/i18n'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

const customValidate = require.context(
  '@/assets/lang/veeValidate',
  true,
  /[A-Za-z0-9-_,\s]+\.json$/i
)
const customLocalize = {}
customValidate.keys().forEach((key) => {
  const matched = key.match(/([A-Za-z0-9-_]+)\./i)
  if (matched && matched.length > 1) {
    const locale = matched[1]
    const tmpMessages = customLocalize[locale] || {}
    customLocalize[locale] = Object.assign(tmpMessages, customValidate(key))
  }
})
localize(i18n.global.locale.value)

configure({
  validateOnInput: true,
  generateMessage: localize({
    ko: Object.assign(ko, customLocalize.ko),
    en: Object.assign(en, customLocalize.en)
  })
})
