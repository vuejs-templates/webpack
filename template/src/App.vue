<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Hello></Hello>
  </div>
</template>

<script>
import Hello = require("./components/Hello");

export default {
  name: "app",
  components: {
    Hello,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
