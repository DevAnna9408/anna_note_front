import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from '@/plugins/i18n'
import VueKindergerten from 'vue-kindergarten'
import child from '@/kindergarten/child'
import mixins from '@/mixins/global'
import component from '@/components/global'
import { Form } from 'vee-validate'
import { usersStore } from '@/store/users'
import directives from '@/plugins/vue-directive'
import '@/plugins'
require('@/assets/css/style.scss')

const app = createApp(App)
  .use(router)
  .use(i18n)
  .use(createPinia())
  .use(VueKindergerten, {
    child: () => {
      return child(usersStore())
    }
  })

Object.values(directives).forEach((directive) => {
  app.directive(directive.name, directive.value)
})

Object.values(mixins).forEach((value) => {
  app.mixin(value)
})

app.component('Form', Form)
Object.values(component).forEach((value) => {
  app.component(value.name, value)
})

app.mount('#app')
