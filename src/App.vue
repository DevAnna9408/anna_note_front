<template>
  <div id="app">
    <LoadingFullsize v-if="isLoading" />
    <div>
      <router-view name="header" class="site-navigation" />
    </div>
    <router-view />
  </div>
</template>
<script>
import { loadingStore } from '@/store/loading'
import LoadingFullsize from '@/components/loading-fullsize.vue'

export default {
  setup () {
    const loading = loadingStore()
    return {
      loading
    }
  },
  computed: {
    isLoading () {
      return this.loading.loading
    }
  },
  components: { LoadingFullsize }
}
</script>
