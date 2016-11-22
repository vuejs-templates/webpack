<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{#vueRouter}}<router-view></router-view>{{/vueRouter}}{{#if_eq vueRouter false}}<hello></hello>{{/if_eq}}
  </div>
</template>

<script>
{{#if_eq vueRouter false}}import Hello from './components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{/if_eq}}export default {
  name: 'app'{{#if_eq vueRouter false}},
  components: {
    Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{/if_eq}}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
