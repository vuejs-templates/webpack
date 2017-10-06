<template>
  <div id="app">
    <transition name="slide-down">
      <img src="@/../static/kitty.png" v-rjs="2" width="206" height="110" v-show="isMounted">
    </transition>
    {{#router}}
    <router-view></router-view>
    {{else}}
    <hello></hello>
    {{/router}}
  </div>
</template>

<script>
  {{#unless router}}
  import Hello from './components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

  {{/unless}}
  export default {
    name: 'app'{{#router}}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{else}},
    components: {
      Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{/router}}
    data() {
      return {
        isMounted: false{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
      };
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    mounted() {
      console.log('%cWe Are Kitty', 'background: #111111; color: #FF315D; padding: 5px 20px;'){{#if_eq lintConfig "airbnb"}};{{/if_eq}} // eslint-disable-line
      this.isMounted = true{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Work+Sans");
  @font-face {
    font-family: 'UniNeue-Regular';
    src: url('~./assets/fonts/Fontfabric - UniNeueRegular.otf');
    font-weight: 400;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    background-color: #111;
    color: #fff;
    margin: 0;
    position: relative;
  }

  #app {
    font-family: "Work Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 16pt;
  }
</style>
