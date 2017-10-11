<template>
  <div class="hello">
    Hello World
  </div>
</template>

<script>
export default {

}
</script>
{{#if_eq styls "css"}}
<style scoped>

</style>
{{/if_eq}}
{{#if_eq styls "less"}}
<style lang="less" scoped>

</style>
{{/if_eq}}
{{#if_eq styls "sass"}}
<style lang="sass" scoped>

</style>
{{/if_eq}}
{{#if_eq styls "stylus"}}
<style lang="stylus" scoped>

</style>
{{/if_eq}}
