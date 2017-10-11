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
    color #ffffff
    font-size 20px
</style>
{{else}}
<style scoped>
  .hello{
    color: #ffffff;
    font-size: 20px;
  }
</style>
{{/stylus}}
