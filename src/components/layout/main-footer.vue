<template>
  <footer id="main-footer">
    <div class="container">
      <div class="footer-logo">
        <router-link :to="{ name: 'home-main' }">
        <img
          src="@/assets/img/logo.jpg"
        >
      </router-link>
      </div>
      <div class="footer-address">
        &copy; {{ year }}, made by
        <a
          href="https://devanna9408.github.io/"
          target="_blank"
        >Anna</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'main-footer',
  components: {},
  props: {
    backgroundColor: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style scoped lang="scss">

</style>
