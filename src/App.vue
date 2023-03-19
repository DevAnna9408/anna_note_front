<template>
  <div id="app">
    <error-toast></error-toast>
    <div>
      <router-view name="header" class="site-navigation"></router-view>/>
    </div>
    <!-- <div id="sidebar" class="sidebar-navigation">
      <router-view name="sidebar" />
    </div> -->
    <router-view />
    <router-view name="footer" />
  </div>
</template>

<style lang="scss">

</style>
