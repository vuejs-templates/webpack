<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{#router}}
    <router-view/>
    {{else}}
    <HelloWorld/>
    {{/router}}
  </div>
</template>

<script{{#typescript}} lang="ts"{{/typescript}}>
{{#typescript}}import Vue from 'vue'{{/typescript}}
{{#unless router}}
import HelloWorld from './components/HelloWorld{{#typescript}}.vue{{/typescript}}'

{{/unless}}
export default {{#typescript}}Vue.extend({{/typescript}}{
  name: 'app'{{#router}}{{else}},
  components: {
    HelloWorld
  }{{/router}}
}{{#typescript}}){{/typescript}}
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
