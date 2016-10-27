<template>
  <router-view class="view"></router-view>
</template>

<script>
export default {
  name: 'app'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style lang="scss">
@import '~normalize.css/normalize.css';

html {
  height: 100%;
  width: 100%;
  font-size: 62.5;
}

body {
  height: 100%;
}
</style>
