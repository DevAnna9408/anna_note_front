<template>
  <div id="app">
    <div>
      <router-view name="header" class="site-navigation" />
    </div>
    <router-view />
    <router-view name="footer" />
  </div>
</template>

<style lang="scss">

</style>
