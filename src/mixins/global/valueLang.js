import { i18nStore } from '@/store/i18n'
import { mapState } from 'pinia'
export default {
  computed: {
    ...mapState(i18nStore, ['currentLocale']),
    valueByCurrentLang () {
      return (korName, enName) => {
        return this.currentLocale === 'ko' ? korName : enName
      }
    },
    arrayValueByCurrentLang () {
      return (array) => {
        return this.currentLocale === 'ko' ? array[0] : array[1]
      }
    }
  }
}
