<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{#router}}
    <router-view></router-view>
    {{else}}
    <hello></hello>
    {{/router}}
  </div>
</template>
{{#typescript}}
<!-- For *.vue files, <script>'s  need to have a lang="ts" -->
{{/typescript}}
<script {{#typescript}}lang="ts"{{/typescript}}>
{{#typescript}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Component from 'vue-class-component'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/typescript}}
{{#unless router}}
import Hello from './components/Hello{{#typescript}}.vue{{/typescript}}'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{/unless}}
{{#typescript}}
@Component{{#unless router}}({
  components: {
    'hello': Hello
  }
}){{/unless}}
export default class App extends Vue{{else}}
export default{{/typescript}} {
  name{{#typescript}} ={{else}}:{{/typescript}} 'app'{{#router}}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{else}}{{#unless typescript}}
  components: {
    Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{/unless}}{{/router}}
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
