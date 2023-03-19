import { globalCookiesConfig } from 'vue3-cookies'
const domain = process.env.VUE_APP_FRONT_DOMAIN
globalCookiesConfig({
  expireTimes: '30d',
  domain
})
