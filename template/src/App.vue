<template>
  <div id="app">
    <h1>
      {{#if_eq typefor "mobile"}}
      mobile App
      {{/if_eq}}
      {{#if_eq typefor "pc"}}
      pc App
      {{/if_eq}}
    </h1>
    {{#router}}
    <router-view/>
    {{else}}
    <Index/>
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import Index from 'components/index/index'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{/unless}}
export default {
  name: 'app'{{#router}}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{else}},
  components: {
    Index{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{/router}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>
{{#stylus}}
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
{{else}}
<style lang="stylus" scoped>
@import "~common/stylus/variable"

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color $color-text-l
  margin-top 60px
</style>
{{/stylus}}
