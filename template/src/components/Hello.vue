<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
    return {
      msg: 'Hello Vue!'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
