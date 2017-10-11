<template>
  <div class="hello">
    Hello World
  </div>
</template>

<script>
export default {

}
</script>

{{#stylus}}
<style lang="stylus" scoped>
  .hello
    color #2c3e50
    font-size 20px
</style>
{{else}}
<style scoped>
  .hello{
    color: #2c3e50;
    font-size: 20px;
  }
</style>
{{/stylus}}
