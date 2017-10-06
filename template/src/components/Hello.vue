<template>
  <transition name="slide-up">
    <div class="hello" v-show="isMounted">
      <h1>\{{ msg }}</h1>
      <h2>Essential Links</h2>
      <ul>
        <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
        <br>
        <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
        <li><a href="https://vuejs.org/v2/style-guide/" target="_blank">Vue.js Style Guide</a></li>
      </ul>
      <h2>Ecosystem</h2>
      <ul>
        <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
        <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
        <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
      </ul>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'hello',
    data{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
      return {
        msg: 'Welcome to Your Vue.js App'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
        isMounted: false{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
      }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    mounted{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
      this.isMounted = true{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    line-height: 21pt;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  @keyframes kitty-gradient {
      0% { background-position: 0% 50% }
      100% { background-position: 100% 50% }
  }

  a {
    color: #FF315D;
    font-family: "UniNeue-Bold", sans-serif;
    text-decoration: none;
  }

  a:hover {
    background: linear-gradient(to right, #FF035B, #FF5930, #FF035B);
    background-size: 400% 100%;
    animation: kitty-gradient 1s linear infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
